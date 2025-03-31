import React from "react";
import { Card, CardContent, CardMedia, Typography, Grid as MuiGrid, Button, Box } from "@mui/material";
import { styled } from "@mui/system";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid as SwiperGrid, Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";

// Dữ liệu sản phẩm
const products = [
  {
    image: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/iphone_15_pro_max_f589ed5358.png",
    title: "iPhone 15 Pro Max 256GB",
    oldPrice: "34.990.000 đ",
    newPrice: "28.490.000 đ",
    discount: "-19%",
    savings: "Giảm 6.500.000 đ",
    badge: "ONLINE SIÊU RẺ",
  },
  {
    image: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/2021_6_17_637595454308041794_quat-dieu-hoa-kangaroo-kg50f62-dd.jpg",
    title: "Quạt điều hoà Kangaroo KG50F62",
    oldPrice: "4.490.000 đ",
    newPrice: "1.890.000 đ",
    discount: "-58%",
    savings: "Giảm 2.600.000 đ",
    badge: "ONLINE SIÊU RẺ",
  },
  {
    image: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/2023_4_20_638176062563873404_quat-thap-xiaomi-smart-tower-fan-dd.jpg",
    title: "Quạt tháp Xiaomi Smart Tower Fan",
    oldPrice: "2.990.000 đ",
    newPrice: "1.590.000 đ",
    discount: "-47%",
    savings: "Giảm 1.400.000 đ",
    badge: "SẮP CHÁY HÀNG",
  },
  {
    image: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/2024_5_6_638506110451616955_midea-msaf6-10cdn8-dd.jpg",
    title: "Máy lạnh Midea Inverter 1 HP MSAF6-10CDN8",
    oldPrice: "8.790.000 đ",
    newPrice: "5.290.000 đ",
    discount: "-40%",
    savings: "Giảm 3.500.000 đ",
    badge: "ONLINE SIÊU RẺ",
  },
  {
    image: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/2024_2_26_638445627527769370_quat-dieu-hoa-sunhouse-shd7744-dd.jpg",
    title: "Quạt điều hoà Sunhouse SHD7744",
    oldPrice: "3.490.000 đ",
    newPrice: "2.390.000 đ",
    discount: "-32%",
    savings: "Giảm 1.100.000 đ",
    badge: "ONLINE SIÊU RẺ",
  },





  {
    image: "https://cdn2.fptshop.com.vn/unsafe/150x0/filters:quality(100)/2022_3_1_637817441331454234_quat-dung-kangaroo-kg726-trang-dd.jpg",
    title: "Quạt điều hoà Sunhouse SHD7744",
    oldPrice: "3.490.000 đ",
    newPrice: "2.390.000 đ",
    discount: "-32%",
    savings: "Giảm 1.100.000 đ",
    badge: "ONLINE SIÊU RẺ",
  },
  {
    image: "https://cdn2.fptshop.com.vn/unsafe/150x0/filters:quality(100)/2023_6_6_638216679240862683_quat-sac-sunhouse-shd7116-dd.jpg",
    title: "Quạt điều hoà Sunhouse SHD7744",
    oldPrice: "3.490.000 đ",
    newPrice: "2.390.000 đ",
    discount: "-32%",
    savings: "Giảm 1.100.000 đ",
    badge: "ONLINE SIÊU RẺ",
  },
  {
    image: "https://cdn2.fptshop.com.vn/unsafe/150x0/filters:quality(100)/00915914_lumias_bulma_pro_45w_5d01c08af3.png",
    title: "Quạt điều hoà Sunhouse SHD7744",
    oldPrice: "3.490.000 đ",
    newPrice: "2.390.000 đ",
    discount: "-32%",
    savings: "Giảm 1.100.000 đ",
    badge: "ONLINE SIÊU RẺ",
  },
  {
    image: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/2024_2_26_638445627527769370_quat-dieu-hoa-sunhouse-shd7744-dd.jpg",
    title: "Quạt điều hoà Sunhouse SHD7744",
    oldPrice: "3.490.000 đ",
    newPrice: "2.390.000 đ",
    discount: "-32%",
    savings: "Giảm 1.100.000 đ",
    badge: "ONLINE SIÊU RẺ",
  },
  {
    image: "https://cdn2.fptshop.com.vn/unsafe/150x0/filters:quality(100)/2024_3_22_638466977546845628_quat-dung-senko-dts1607-dd.jpg",
    title: "Quạt điều hoà Sunhouse SHD7744",
    oldPrice: "3.490.000 đ",
    newPrice: "2.390.000 đ",
    discount: "-32%",
    savings: "Giảm 1.100.000 đ",
    badge: "ONLINE SIÊU RẺ",
  },
];

// Styled Component
const StyledCard = styled(Card)({
  boxShadow: "none",
  borderRadius: "10px",
  textAlign: "center",
  padding: "10px",
});

const BodyProduct = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ background: "#ffe4e6", padding: "20px", borderRadius: "10px", px: 8 }}>
      <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
        Giá tốt. Nhanh tay. Số lượng ít!
      </Typography>

      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        pagination={{ clickable: true }}
        navigation
        // autoplay={{ delay: 3000 }}
        modules={[SwiperGrid, Pagination, Navigation, Autoplay]}
        className="mySwiper"
        onClick={() => {
          navigate(`/dienthoai/detail`);
        }}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <StyledCard>
              <CardMedia component="img" height="140" image={product.image} alt={product.title} />
              <CardContent>
                <Typography variant="subtitle2" color="error">
                  {product.badge}
                </Typography>
                <Typography variant="body2" sx={{ textDecoration: "line-through", color: "gray" }}>
                  {product.oldPrice} {product.discount}
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {product.newPrice}
                </Typography>
                <Typography variant="body2" color="green">
                  {product.savings}
                </Typography>
                <Button variant="contained" size="small" sx={{ mt: 1, background: "#f50057" }}>
                  Mua ngay
                </Button>
              </CardContent>
            </StyledCard>
          </SwiperSlide>
        ))}
      </Swiper>



      {/* <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
        Giá tốt. Nhanh tay. Số lượng ít!
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {products.map((product, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={2}>
            <StyledCard>
              <CardMedia component="img" height="140" image={product.image} alt={product.title} />
              <CardContent>
                <Typography variant="subtitle2" color="error">
                  {product.badge}
                </Typography>
                <Typography variant="body2" sx={{ textDecoration: "line-through", color: "gray" }}>
                  {product.oldPrice} {product.discount}
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {product.newPrice}
                </Typography>
                <Typography variant="body2" color="green">
                  {product.savings}
                </Typography>
                <Button variant="contained" size="small" sx={{ mt: 1, background: "#f50057" }}>
                  Mua ngay
                </Button>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid> */}
    </Box>
  );
};

export default BodyProduct;