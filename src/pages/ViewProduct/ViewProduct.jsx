import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { addViewProductAPI, viewProductAPI } from '../../apis';
import { useEffect, useState } from 'react';
import slugify from 'slugify';
import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

export default function ViewedProducts() {
  const [products, setProducts] = useState(null);
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await viewProductAPI();
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  return (

    <Box sx={{
      maxWidth: '1200px',
      mx: 'auto',
      px: { xs: 1, sm: 2, md: 4 },

      py: 4,
      pb: 4,
      border: '1px solid #e0e0e0',
      borderRadius: '12px',
    }}
    >

      <Typography
        variant="h6"
        fontWeight="bold"
        gutterBottom
        sx={{
          mb: 2,
          fontSize: '2rem',
          lineHeight: 1.4,
          letterSpacing: '0.5px',
          textTransform: 'uppercase'
        }}
      >
        Sản phẩm đã xem
      </Typography>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          0: {
            slidesPerView: 1.3,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          992: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
      >

        {Array.isArray(products) && products.length > 0 ? (
          products.map((item, index) => {
            const product = item?.product;
            if (!product) return null;

            const discountAmount = product?.price - product?.discountPrice;

            return (
              <SwiperSlide key={index}>
                <Box
                  sx={{
                    backgroundColor: 'white',
                    p: 2,
                    borderRadius: 3,
                    border: '1px solid #e0e0e0',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      opacity: 0.9,
                    },
                  }}
                  onClick={() => {
                    const priceAfterDiscount =
                      product.discountPrice && product.discountPrice < product.price
                        ? product.price - product.discountPrice
                        : product.price;

                    navigate(`/${slugify(product?.category)}/${slugify(product?.name)}`, {
                      state: {
                        ...product,
                        priceAfterDiscount,
                      },
                    });
                  }}

                >
                  <Box
                    component="img"
                    src={product?.images}
                    alt={product?.name}
                    loading="lazy"
                    sx={{
                      width: '100%',
                      objectFit: 'contain',
                      height: { xs: '120px', sm: '140px', md: '160px' },
                    }}
                  />

                  <Box mt={2}>
                    <Typography variant="subtitle1" fontWeight="600">
                      {product?.name || 'Không tên'}
                    </Typography>

                    {product?.discountPrice && product?.discountPrice < product?.price ? (
                      <>

                        {/* Giá gốc */}
                        <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'gray' }}>
                          {Number(product.price).toLocaleString("vi-VN")} đ
                        </Typography>
                        {/* Giá đã giảm */}
                        <Typography variant="h6" color="error">
                          {Number(discountAmount).toLocaleString("vi-VN")} đ
                        </Typography>

                        {/* Số tiền giảm */}
                        <Typography variant="body2" color="success.main">
                          Giảm  {Number(product.discountPrice).toLocaleString("vi-VN")} đ

                        </Typography>
                      </>
                    ) : (
                      <Typography variant="h6" color="black">
                        {Number(product.price).toLocaleString("vi-VN")} đ
                      </Typography>
                    )}

                    {product?.discountAmount && (
                      <Typography variant="body2" color="success.main">
                        {product.discountAmount}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </SwiperSlide>
            );
          })
        ) : (
          <Typography>Loading...</Typography>
        )}

      </Swiper>
    </Box>

  );
}
