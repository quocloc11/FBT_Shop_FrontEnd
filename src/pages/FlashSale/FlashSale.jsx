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
  // border: '1px solid #ccc', // Viền nhẹ bên trong
  //boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    //transform: 'scale(1.05)',
    //boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
  },
});

const StyledCardMedia = styled(CardMedia)({
  transition: 'transform 0.3s ease-in-out', // Hiệu ứng cho CardMedia
  '&:hover': {
    transform: 'scale(1.1)', // Phóng to hình ảnh khi hover vào Card
  },
});
// Main Component
const FlashSale = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [now, setNow] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch products from API
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

  // const handleClickProduct = async (product) => {
  //   await addViewProductAPI(product);
  //   navigate(`/${slugify(product.category)}/${slugify(product.name)}`, { state: product });
  // };
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
    const originalPrice = product.price;  // Giá gốc
    const discountPrice = originalPrice * (1 - product.flashSale.discountPercent / 100);  // Giá đã giảm

    const cartItem = {
      productId: product._id,
      quantity: 1,
      price: discountPrice,  // Sử dụng giá giảm
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


  // Filter products by flash sale status
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
        p: 1,
        //  backgroundColor: "#f5f5f5",
        border: '1px solid red',
        maxWidth: '1200px',   // hoặc 'lg'
        mx: 'auto',            // căn giữa
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
        slidesPerView={4}
        spaceBetween={30}
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 3000 }}
        modules={[SwiperGrid, Navigation, Autoplay]}
        className="mySwiper"
      >
        {filteredProducts.map((p, index) => {
          const start = new Date(p.flashSale.saleStart);
          const end = new Date(p.flashSale.saleEnd);

          let saleStatus = 'Đã kết thúc';
          let showBuyButton = true; // Biến để kiểm tra khi nào hiển thị nút "Mua giá sốc"

          if (now < start) {
            const { days, hours, minutes, seconds } = getTimeLeft(start);
            saleStatus = `Sắp diễn ra: ${days}d ${hours}h ${minutes}m ${seconds}s`;
            showBuyButton = false; // Không hiển thị nút "Mua giá sốc" khi sản phẩm sắp diễn ra
          } else if (now >= start && now <= end) {
            const { days, hours, minutes, seconds } = getTimeLeft(end);
            saleStatus = `Còn lại: ${days}d ${hours}h ${minutes}m ${seconds}s`;
          }

          // Tính giá sau giảm
          const originalPrice = p.price;  // Giá gốc
          const discountPrice = originalPrice * (1 - p.flashSale.discountPercent / 100);  // Giá đã giảm

          return (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  border: '2px solid red',      // Border đỏ bên ngoài
                  borderRadius: '12px',
                  padding: '1px',
                  margin: '1px',
                  height: '412px',            // Khoảng cách giữa các slide
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
                    sx={{ height: 180, objectFit: "contain", p: 1 }}
                  />
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography fontWeight="bold">{p.name}</Typography>



                    {/* Hiển thị giá gốc với dấu gạch ngang */}
                    <Typography sx={{ textDecoration: "line-through", color: "#888" }}>
                      {originalPrice.toLocaleString("vi-VN")} đ
                    </Typography>
                    {/* <Typography sx={{ color: "orange", mb: 1 }}>{p.flashSale.discountPercent}% giảm</Typography> */}
                    {/* Hiển thị giá sau giảm */}
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

                    {/* 🔥 Thêm dòng này để hiển thị số lượng */}
                    <Typography sx={{ color: "green", fontWeight: "bold" }}>
                      Còn lại: {p.quantity} sản phẩm
                    </Typography>

                    <CountdownBox>{saleStatus}</CountdownBox>

                    {/* Hiển thị thông báo "Sắp diễn ra" thay cho nút "Mua giá sốc" */}
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

                    {/* Hiển thị nút "Mua giá sốc" chỉ khi sản phẩm đang trong thời gian flash sale */}
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

