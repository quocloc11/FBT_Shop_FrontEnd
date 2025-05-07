
import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, CardMedia, Button, Tabs, Tab
} from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import slugify from 'slugify';
import { toast } from 'react-toastify';

import { getProductAPI, addViewProductAPI } from '../../apis';
import {
  createCartProductAPI, getCartProductAPI
} from '../../components/redux/cart/cartSlice';

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
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
  },
});

const FlashSale = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [now, setNow] = useState(new Date());


  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(6); // số sản phẩm mỗi trang


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProductAPI({ page: currentPage, limit }); // truyền page, limit
        setProducts(res.products);
        setTotalPages(res.totalPages);
      } catch (err) {
        console.error('Lỗi lấy danh sách sản phẩm:', err);
      }
    };
    fetchProducts();
  }, [currentPage, limit]);


  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleTabChange = (e, newValue) => {
    setTabIndex(newValue);
  };

  const handleClickProduct = async (product) => {
    await addViewProductAPI(product);
    navigate(`/${slugify(product.category)}/${slugify(product.name)}`, { state: product });
  };

  const handleAddToCart = (product) => {
    const cartItem = {
      productId: product._id,
      quantity: 1,
      price: product.price,
      name: product.name,
      images: product.images,
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

  const getTimeLeft = (target) => {
    const diff = new Date(target) - now;
    const total = Math.max(diff, 0);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((total / (1000 * 60)) % 60);
    const seconds = Math.floor((total / 1000) % 60);
    return { total, hours, minutes, seconds };
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
    <Box sx={{ py: 4, px: 10, backgroundColor: "#fff" }}>
      <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
        Giờ Vàng Giá Sốc
      </Typography>

      <Typography variant="body2" textAlign="center" mb={2}>
        Thời gian hiện tại: {now.toLocaleString("vi-VN")}
      </Typography>

      <Tabs value={tabIndex} onChange={handleTabChange} centered sx={{ mb: 3 }}>
        <Tab label="Đang diễn ra" />
        <Tab label="Sắp diễn ra" />
        <Tab label="Đã kết thúc" />
      </Tabs>

      <Grid container spacing={3} justifyContent="center">
        {filteredProducts.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Không có sản phẩm nào.
          </Typography>
        ) : (
          filteredProducts.map((product, index) => {
            const start = new Date(product.flashSale.saleStart);
            const end = new Date(product.flashSale.saleEnd);
            const isComing = now < start;
            const isEnded = now > end;
            const isActive = now >= start && now <= end;

            const salePrice = product.price - (product.price * product.flashSale.discountPercent / 100);

            let countdownText = '';
            if (isComing) {
              const { hours, minutes, seconds } = getTimeLeft(start);
              countdownText = `Bắt đầu sau: ${hours}h ${minutes}m ${seconds}s`;
            } else if (isActive) {
              const { hours, minutes, seconds } = getTimeLeft(end);
              countdownText = `Còn lại: ${hours}h ${minutes}m ${seconds}s`;
            } else {
              countdownText = 'Đã kết thúc';
            }

            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <StyledCard>
                  <CountdownBox>{countdownText}</CountdownBox>

                  <CardMedia
                    component="img"
                    height="200"
                    image={product.images}
                    alt={product.name}
                    sx={{ objectFit: "cover", borderRadius: "8px" }}
                    onClick={() => handleClickProduct(product)}
                  />

                  <CardContent>
                    <Typography variant="subtitle2" color="error" fontWeight="bold">
                      {product.flashSale.promotion}
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" sx={{ mt: 1 }}>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'gray' }}>
                      {product.price.toLocaleString("vi-VN")}đ
                    </Typography>
                    <Typography variant="h6" color="error" fontWeight="bold">
                      {salePrice.toLocaleString("vi-VN")}đ
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Còn lại: {product.flashSale.quantity} sản phẩm
                    </Typography>
                  </CardContent>

                  {isActive && (
                    <Box display="flex" justifyContent="center" mt={1}>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ backgroundColor: '#f50057', '&:hover': { backgroundColor: '#d32f2f' } }}
                        onClick={() => handleAddToCart(product)}
                      >
                        Mua ngay
                      </Button>
                    </Box>
                  )}
                </StyledCard>
              </Grid>
            );
          })
        )}
      </Grid>
    </Box>
  );
};

export default FlashSale;

