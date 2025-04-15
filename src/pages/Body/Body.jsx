
import React from "react";
import { Container, Grid, Card, CardMedia, Typography, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom"; // Import hook điều hướng
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
const categories = [
  { name: "Điện thoại", image: "https://cdn2.fptshop.com.vn/unsafe/180x0/filters:quality(100)/phone_cate_c6a412f60a.png" },
  { name: "Laptop", image: "https://cdn2.fptshop.com.vn/unsafe/180x0/filters:quality(100)/laptop_thumb_2_4df0fab60f.png" },
  { name: "Tủ lạnh", image: "https://cdn2.fptshop.com.vn/unsafe/180x0/filters:quality(100)/phu_kien_thum_2_21c419aa09.png" },
  { name: "Máy lạnh - Điều hòa", image: "https://cdn2.fptshop.com.vn/unsafe/180x0/filters:quality(100)/tu_lanh_cate_thumb_77da11d0c4.png" },
  { name: "Phụ kiện", image: "https://cdn2.fptshop.com.vn/unsafe/180x0/filters:quality(100)/sim_fpt_thumb_2_d50e064a42.png" },
  { name: "SIM FPT", image: "https://cdn2.fptshop.com.vn/unsafe/180x0/filters:quality(100)/linh_kien_cate_thumb_4c25ebf717.png" },
  { name: "Điện gia dụng", image: "https://cdn2.fptshop.com.vn/unsafe/180x0/filters:quality(100)/dien_gia_dung_thumb_2_54c5efa451.png" },
  { name: "Quạt điều hòa", image: "https://cdn2.fptshop.com.vn/unsafe/180x0/filters:quality(100)/2024_4_12_638485102973566908_quat-dieu-hoa-hoa-phat-hpcf1-021-3.jpg" },
  // { name: "Điện thoại", image: "https://cdn2.fptshop.com.vn/unsafe/180x0/filters:quality(100)/phone_cate_c6a412f60a.png" },
  // { name: "Laptop", image: "https://cdn2.fptshop.com.vn/unsafe/180x0/filters:quality(100)/laptop_thumb_2_4df0fab60f.png" },
  // { name: "Tủ lạnh", image: "https://cdn2.fptshop.com.vn/unsafe/180x0/filters:quality(100)/phu_kien_thum_2_21c419aa09.png" },
  // { name: "Máy lạnh - Điều hòa", image: "https://cdn2.fptshop.com.vn/unsafe/180x0/filters:quality(100)/tu_lanh_cate_thumb_77da11d0c4.png" },
  // { name: "Phụ kiện", image: "https://cdn2.fptshop.com.vn/unsafe/180x0/filters:quality(100)/sim_fpt_thumb_2_d50e064a42.png" },
  // { name: "SIM FPT", image: "https://cdn2.fptshop.com.vn/unsafe/180x0/filters:quality(100)/linh_kien_cate_thumb_4c25ebf717.png" },
  // { name: "Điện gia dụng", image: "https://cdn2.fptshop.com.vn/unsafe/180x0/filters:quality(100)/dien_gia_dung_thumb_2_54c5efa451.png" },
  // { name: "Quạt điều hòa", image: "https://cdn2.fptshop.com.vn/unsafe/180x0/filters:quality(100)/2024_4_12_638485102973566908_quat-dieu-hoa-hoa-phat-hpcf1-021-3.jpg" },
];

const banners = [
  { image: "https://cdn2.fptshop.com.vn/unsafe/640x0/filters:quality(100)/H2_614x212_64c2dd5928.png", alt: "Máy lạnh" },
  { image: "https://cdn2.fptshop.com.vn/unsafe/640x0/filters:quality(100)/H2_614x212_e97abfb675.png", alt: "Laptop Gaming" },
  { image: "https://cdn2.fptshop.com.vn/unsafe/640x0/filters:quality(100)/H2_614x2124_A_5d5d69aefb.png", alt: "Laptop Gaming" },
  { image: "https://cdn2.fptshop.com.vn/unsafe/640x0/filters:quality(100)/H2_614x212_43ee3d5923.png", alt: "Laptop Gaming" },
  { image: "https://cdn2.fptshop.com.vn/unsafe/640x0/filters:quality(100)/H2_614x212_89847474d4.png", alt: "Laptop Gaming" },
  { image: "https://cdn2.fptshop.com.vn/unsafe/640x0/filters:quality(100)/H2_614x212_02739556d3.png", alt: "Laptop Gaming" },
  { image: "https://cdn2.fptshop.com.vn/unsafe/640x0/filters:quality(100)/H2_614x212_6e61887959.png", alt: "Laptop Gaming" },



];

const slugify = (str) =>
  str
    .replace(/Đ/g, "D")               // xử lý Đ
    .replace(/đ/g, "d")               // xử lý đ
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")  // bỏ dấu
    .toLowerCase()
    .replace(/\s+/g, "-")             // space -> -
    .replace(/[^\w-]+/g, "")          // bỏ ký tự đặc biệt
    .replace(/--+/g, "-")             // bỏ gạch ngang dư
    .replace(/^-+|-+$/g, "");         // bỏ gạch đầu/cuối

const Body = () => {
  const navigate = useNavigate(); // Hook điều hướng
  return (
    <Container maxWidth="lg">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={2}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        style={{ width: "100%" }}
      >
        <Grid container spacing={2} sx={{ my: 2 }}>
          {banners.map((banner, index) => (
            <SwiperSlide key={index}>
              <Grid item xs={12} sm={6} key={index}>
                <Card>
                  <CardMedia component="img"
                    sx={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: 2 }}
                    image={banner.image} alt={banner.alt} />
                </Card>
              </Grid>
            </SwiperSlide>
          ))}
        </Grid>
      </Swiper>


      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView='4'
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        style={{ width: "100%", padding: "10px 0" }}
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index} style={{ width: "150px" }}>
            <Grid item xs={12} sm={4} md={3} key={index}>
              <Card sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                p: 2,
                height: "140px",
                width: "150px",
                borderRadius: 2,
                boxShadow: 1,
                cursor: "pointer",
                '&:hover': {
                  boxShadow: 3,
                }
              }}
                onClick={() => navigate(`/${slugify(category.name)}`)}
              >
                <CardMedia
                  component="img"
                  sx={{ height: 70, width: "auto", objectFit: "contain" }}
                  image={category.image}
                  alt={category.name}
                />
                <Typography variant="body2" sx={{ mt: 1, fontWeight: "bold" }}>
                  {category.name}
                </Typography>
              </Card>
            </Grid>
          </SwiperSlide>
        ))}
      </Swiper>



      {/* Categories Section */}
      {/* <Grid container spacing={3}>
        {categories.map((category, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              p: 2,
              height: "140px",
              borderRadius: 2,
              boxShadow: 1
            }}>
              <CardMedia
                component="img"
                sx={{ height: 110, width: "auto", objectFit: "contain" }}
                image={category.image}
                alt={category.name}
              />
              <Typography variant="body1" sx={{ mt: 1, fontWeight: "bold" }}>{category.name}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid> */}

    </Container>


  );
};

export default Body;