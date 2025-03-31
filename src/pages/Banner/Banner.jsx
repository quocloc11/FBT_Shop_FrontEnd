import { Box } from "@mui/material";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const banners = [
  "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/desk_header_20_73e6621375.png",
  "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/desk_header_ebb29a244f.png",
  "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/desk_header_daed2bb70c.png",
];

const Banner = () => {
  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        //autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        style={{ width: "100%" }}
      >
        {banners.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Banner ${index + 1}`}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Banner;
