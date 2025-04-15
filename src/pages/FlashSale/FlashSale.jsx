import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid as SwiperGrid, Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Divider
} from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const CountdownBox = styled(Box)({
  backgroundColor: '#f44336',
  color: 'white',
  padding: '4px 8px',
  borderRadius: '4px',
  display: 'inline-block',
  fontWeight: 'bold'
});

const SaleCard = styled(Card)({
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
  }
});

const OriginalPrice = styled(Typography)({
  textDecoration: 'line-through',
  color: '#757575',
  fontSize: '0.9rem'
});

const DiscountChip = styled(Chip)({
  backgroundColor: '#f44336',
  color: 'white',
  fontWeight: 'bold',
  marginLeft: '8px'
});

const FlashSale = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 57,
    seconds: 42
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newSeconds = prev.seconds - 1;
        if (newSeconds < 0) {
          return {
            hours: prev.hours,
            minutes: prev.minutes - 1,
            seconds: 59
          };
        }
        if (prev.minutes < 0) {
          return {
            hours: prev.hours - 1,
            minutes: 59,
            seconds: 59
          };
        }
        return {
          ...prev,
          seconds: newSeconds
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const products = [
    {
      id: 1,
      name: 'Laptop HP 245 G10 (A20TFPT) RS-7530U/16GB/256GB/14"...',
      originalPrice: '15.590.000 ₫',
      salePrice: '11.290.000 ₫',
      discount: '28%',
      status: 'Đã bán 0/Từ suất',
      image: 'https://cdn2.fptshop.com.vn/unsafe/180x0/filters:quality(100)/phone_cate_c6a412f60a.png'
    },
    {
      id: 2,
      name: 'Màn hình LG 24MR400-B/23.8 inch FullHD (1920×1080)/IPS...',
      originalPrice: '2.990.000 ₫',
      salePrice: '2.190.000 ₫',
      discount: '27%',
      status: 'Sắp diễn ra',
      image: 'https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/lg_24mr400_b_1_190c125dec.png'
    },
    {
      id: 3,
      name: 'Laptop Huawei MateBook D15 R7...',
      originalPrice: '10.990.000 ₫',
      salePrice: '8.490.000 ₫',
      discount: '23%',
      status: 'Sắp diễn ra',
      image: 'https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/2023_7_19_638253822594354727_huawei-bom-wfp9i-matebook-d15-r7-5700u-bac-dd.jpg'
    },
    {
      id: 4,
      name: 'Laptop MSI Gaming Katana A15 AI BBVE-402VN R7...',
      originalPrice: '26.990.000 ₫',
      salePrice: '22.990.000 ₫',
      discount: '21%',
      status: 'Sắp diễn ra',
      image: 'https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/msi_cyborg_15_a12u_de61b50a54.png'
    },
    {
      id: 5,
      name: 'Laptop MSI Gaming Katana A15 AI BBVE-402VN R7...',
      originalPrice: '26.990.000 ₫',
      salePrice: '22.990.000 ₫',
      discount: '21%',
      status: 'Sắp diễn ra',
      image: 'https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/msi_cyborg_15_a12u_de61b50a54.png'
    },
    {
      id: 6,
      name: 'Laptop MSI Gaming Katana A15 AI BBVE-402VN R7...',
      originalPrice: '26.990.000 ₫',
      salePrice: '22.990.000 ₫',
      discount: '21%',
      status: 'Sắp diễn ra',
      image: 'https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/msi_cyborg_15_a12u_de61b50a54.png'
    },
    {
      id: 7,
      name: 'Laptop MSI Gaming Katana A15 AI BBVE-402VN R7...',
      originalPrice: '26.990.000 ₫',
      salePrice: '22.990.000 ₫',
      discount: '21%',
      status: 'Sắp diễn ra',
      image: 'https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/msi_cyborg_15_a12u_de61b50a54.png'
    },
  ];

  const upcomingDates = [
    { date: '31/03', status: 'Sắp diễn ra' },
    { date: '01/04', status: 'Sắp diễn ra' },
    { date: '02/04', status: 'Sắp diễn ra' },
    { date: '03/04', status: 'Sắp diễn ra' },
    { date: '04/04', status: 'Sắp diễn ra' },
    { date: '05/04', status: 'Sắp diễn ra' }
  ];
  const StyledCard = styled(Card)({
    boxShadow: "none",
    borderRadius: "10px",
    textAlign: "center",
    padding: "10px",
  });
  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#d32f2f' }}>
        GIỜ VÀNG GIÁ SỐC 12:00 - 17:00
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mr: 2 }}>
          GIẢM SỐC 1 SẢN PHẨM TỐC
        </Typography>
        <Typography variant="body1" sx={{ mr: 2 }}>
          Sắp diễn ra • 31/03
        </Typography>
        <Typography variant="body1" sx={{ mr: 1 }}>
          Bắt đầu trong:
        </Typography>
        <CountdownBox>
          {String(timeLeft.hours).padStart(2, '0')} : {String(timeLeft.minutes).padStart(2, '0')} : {String(timeLeft.seconds).padStart(2, '0')}
        </CountdownBox>
      </Box>

      <Box sx={{ display: 'flex', mb: 4, overflowX: 'auto' }}>
        {upcomingDates.map((item, index) => (
          <Box key={index} sx={{
            textAlign: 'center',
            padding: '8px 16px',
            borderRight: index !== upcomingDates.length - 1 ? '1px solid #e0e0e0' : 'none',
            minWidth: 100
          }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{item.date}</Typography>
            <Typography variant="body2" sx={{ color: '#d32f2f' }}>{item.status}</Typography>
          </Box>
        ))}
      </Box>

      <Grid container spacing={3}>


        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          pagination={{ clickable: true }}
          navigation
          // autoplay={{ delay: 3000 }}
          modules={[SwiperGrid, Pagination, Navigation, Autoplay]}
          className="mySwiper"
          onClick={() => navigate(`/dien-thoai/detail`)}
        >
          {products.map((product, index) => (
            <SwiperSlide key={index}>
              <StyledCard>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent

                >
                  <Typography gutterBottom variant="body1" component="div" sx={{
                    height: 40,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}

                  >
                    {product.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {product.status}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6" sx={{ color: '#d32f2f', fontWeight: 'bold' }}>
                      {product.salePrice}
                    </Typography>
                    <DiscountChip size="small" label={`-${product.discount}`} />
                  </Box>
                  <OriginalPrice variant="body2">
                    {product.originalPrice}
                  </OriginalPrice>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 2,
                      backgroundColor: '#d32f2f',
                      '&:hover': {
                        backgroundColor: '#b71c1c'
                      }
                    }}
                  >
                    MUA NGAY
                  </Button>
                </CardContent>
              </StyledCard>
            </SwiperSlide>
          ))}
        </Swiper>





        {/* {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <SaleCard>
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="body1" component="div" sx={{
                  height: 40,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}>
                  {product.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {product.status}
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6" sx={{ color: '#d32f2f', fontWeight: 'bold' }}>
                    {product.salePrice}
                  </Typography>
                  <DiscountChip size="small" label={`-${product.discount}`} />
                </Box>
                <OriginalPrice variant="body2">
                  {product.originalPrice}
                </OriginalPrice>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 2,
                    backgroundColor: '#d32f2f',
                    '&:hover': {
                      backgroundColor: '#b71c1c'
                    }
                  }}
                >
                  MUA NGAY
                </Button>
              </CardContent>
            </SaleCard>
          </Grid>
        ))} */}
      </Grid>
    </Box>
  );
};

export default FlashSale;