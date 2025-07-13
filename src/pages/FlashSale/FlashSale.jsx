import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Card, CardContent, CardMedia,
  Button, Tabs, Tab, Chip
} from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import slugify from 'slugify';
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid as SwiperGrid, Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  getProductAPI,
  addViewProductAPI
} from '../../apis';
import {
  createCartProductAPI,
  getCartProductAPI
} from '../../components/redux/cart/cartSlice';

// Styled Components
const CountdownBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#f44336',
  color: 'white',
  padding: '4px 8px',
  borderRadius: '4px',
  fontWeight: 'bold',
  fontSize: '14px',
  position: 'absolute',
  top: '10px',
  left: '10px',
  zIndex: 1,
}));

const StyledCard = styled(Card)({
  position: 'relative',
  padding: '10px',
  borderRadius: '10px',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
  },
});

const StyledCardMedia = styled(CardMedia)({
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)',
  },
});
const FlashSale = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProductAPI();
        setProducts(res.products);
      } catch (err) {
        console.error('Lỗi lấy danh sách sản phẩm:', err);
      }
    };
    fetchProducts();
  }, []);

  const handleTabChange = (_, newValue) => setTabIndex(newValue);

  const getTimeLeft = (saleEnd) => {
    const end = new Date(saleEnd);
    const diff = end - now;

    if (diff <= 0) return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      total: diff,
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const handleClickProduct = async (product) => {
    await addViewProductAPI(product);

    const discountPercent = product.flashSale?.discountPercent || 0;
    const priceAfterDiscount = product.price * (1 - discountPercent / 100);

    navigate(`/${slugify(product.category)}/${slugify(product.name)}`, {
      state: {
        ...product,
        priceAfterDiscount,
      },
    });
  };

  const handleAddToCart = (product) => {
    const originalPrice = product.price;
    const discountPrice = originalPrice * (1 - product.flashSale.discountPercent / 100);

    const cartItem = {
      productId: product._id,
      quantity: 1,
      price: discountPrice,
      name: product.name,
      images: product.images,
      originalPrice: product.price,
      promotion: product.promotion
    };

    dispatch(createCartProductAPI(cartItem))
      .unwrap()
      .then(() => {
        dispatch(getCartProductAPI());
        toast.success("Đã thêm vào giỏ hàng");
      })
      .catch(() => {
        toast.error("Lỗi khi thêm vào giỏ");
      });
  };

  const filteredProducts = products.filter(p => {
    if (!p.flashSale) return false;
    const start = new Date(p.flashSale.saleStart);
    const end = new Date(p.flashSale.saleEnd);
    if (tabIndex === 0) return now >= start && now <= end;
    if (tabIndex === 1) return now < start;
    if (tabIndex === 2) return now > end;
    return false;
  });

  return (
    <Box
      sx={{
        px: { xs: 1, sm: 2, md: 4 },
        py: { xs: 2, sm: 3 },
        maxWidth: '1200px',
        mx: 'auto',
        borderRadius: '12px',
        backgroundColor: "rgb(251, 211, 179)",
      }}
    >

      <Box sx={{
        textAlign: "center",
        mb: 3,
        width: '100%',
      }}>
        <CardMedia
          component="img"
          image="https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/No_5_Mobile_No_b9c21e2922.png"
          alt="Sản phẩm Flash Sale"
          sx={{
            width: '100%',
            height: 'auto',
            borderRadius: '8px',
          }}
        />
      </Box>

      <Tabs value={tabIndex} onChange={handleTabChange} variant="fullWidth" sx={{ mb: 3 }}>
        <Tab label="Đang diễn ra" />
        <Tab label="Sắp diễn ra" />
        <Tab label="Đã kết thúc" />
      </Tabs>

      <Swiper
        spaceBetween={30}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        modules={[SwiperGrid, Navigation, Autoplay]}
        className="mySwiper"
        breakpoints={{
          0: {
            slidesPerView: 1.2,
            spaceBetween: 12,
          },
          576: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          992: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
      >

        {filteredProducts.map((p, index) => {
          const start = new Date(p.flashSale.saleStart);
          const end = new Date(p.flashSale.saleEnd);

          let saleStatus = 'Đã kết thúc';
          let showBuyButton = true;

          if (now < start) {
            const { days, hours, minutes, seconds } = getTimeLeft(start);
            saleStatus = `Sắp diễn ra: ${days}d ${hours}h ${minutes}m ${seconds}s`;
            showBuyButton = false;
          } else if (now >= start && now <= end) {
            const { days, hours, minutes, seconds } = getTimeLeft(end);
            saleStatus = `Còn lại: ${days}d ${hours}h ${minutes}m ${seconds}s`;
          }

          const originalPrice = p.price;
          const discountPrice = originalPrice * (1 - p.flashSale.discountPercent / 100)

          return (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  border: '2px solid red',
                  borderRadius: '12px',
                  padding: '1px',
                  margin: '1px',
                  minHeight: 420,
                  backgroundColor: '#fff',
                  boxSizing: 'border-box',
                }}
              >
                <StyledCard onClick={() => handleClickProduct(p)}>
                  {p.soldOut && (
                    <Chip
                      label="ĐÃ CHÁY SUẤT"
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        transform: "rotate(-20deg)",
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <StyledCardMedia
                    component="img"
                    image={p.images}
                    alt={p.name}
                    sx={{
                      height: { xs: 120, sm: 140, md: 180 },
                      objectFit: "contain",
                      p: 1,
                    }}
                  />

                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography fontWeight="bold">{p.name}</Typography>

                    <Typography sx={{ textDecoration: "line-through", color: "#888" }}>
                      {originalPrice.toLocaleString("vi-VN")} đ
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }}>
                      <Typography
                        color="error"
                        fontWeight="bold"
                        sx={{ fontSize: '18px', marginRight: 1 }}
                      >
                        {discountPrice.toLocaleString("vi-VN")} đ
                      </Typography>
                      <Typography
                        sx={{
                          backgroundColor: '#FDE65D',
                          color: 'white',
                          fontWeight: 'bold',
                          borderRadius: '4px',
                          padding: '2px 6px',
                          fontSize: '14px'
                        }}
                      >
                        ⚡️ -{p.flashSale.discountPercent}%
                      </Typography>
                    </Box>

                    <Typography sx={{ color: "green", fontWeight: "bold" }}>
                      Còn lại: {p.quantity} sản phẩm
                    </Typography>

                    <CountdownBox>{saleStatus}</CountdownBox>

                    {!showBuyButton && (
                      <Button
                        variant="contained"
                        color={p.soldOut ? "inherit" : "error"}
                        disabled={p.soldOut}
                        fullWidth
                      >
                        <Typography>
                          Sắp Diễn Ra
                        </Typography>
                      </Button>
                    )}

                    {showBuyButton && (
                      <Button
                        variant="contained"
                        color={p.soldOut ? "inherit" : "error"}
                        disabled={p.soldOut}
                        fullWidth
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!p.soldOut) handleAddToCart(p);
                        }}
                        sx={{
                          borderRadius: '20px'
                        }}
                      >
                        {p.soldOut ? "Đã hết suất" : "Mua giá sốc"}
                      </Button>
                    )}
                  </CardContent>
                </StyledCard>
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>

    </Box>
  );
};

export default FlashSale;

