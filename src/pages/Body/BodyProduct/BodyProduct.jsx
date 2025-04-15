import React, { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Typography, Grid as MuiGrid, Button, Box } from "@mui/material";
import { styled } from "@mui/system";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid as SwiperGrid, Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";
import { getProductAPI } from "../../../apis";
import slugify from "slugify";
//import { getProductAPI } from "../../../components/redux/product/productSlice";
import { addViewProductAPI } from "../../../apis";

// Styled Component
const StyledCard = styled(Card)({
  boxShadow: "none",
  borderRadius: "10px",
  textAlign: "center",
  padding: "10px",
});

const BodyProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState([])
  // Gọi API để lấy danh sách sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProductAPI();
        // console.log('response', response)
        setProduct(response)
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleClickProduct = async (product) => {
    await addViewProductAPI(product); // Gọi API trước
    navigate(`/${slugify(product?.category)}/${slugify(product?.name)}`, { state: product }); // Sau đó chuyển trang
  };
  console.log('product', product)
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
      // onClick={() => {
      //   navigate(`/dien-thoai/detail`, { state: product });
      // }}

      >
        {product?.map((product, index) => (
          <SwiperSlide key={index}
            onClick={() => handleClickProduct(product)}

          >
            <StyledCard>
              <CardMedia component="img" height="140" image={product.images} alt={product.title} />
              <CardContent>
                <Typography variant="subtitle2" color="error">
                  {product.promotion}
                </Typography>
                <Typography variant="body2" sx={{ textDecoration: "line-through", color: "gray" }}>
                  {product.price}
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {product.quantity}
                </Typography>
                <Typography variant="body2" color="green">
                  {product.name}
                </Typography>
                <Button variant="contained" size="small" sx={{ mt: 1, background: "#f50057" }}>
                  Mua ngay
                </Button>
              </CardContent>
            </StyledCard>
          </SwiperSlide>
        ))}
        {/* {Array.isArray(product) && product.map((item, index) => (

          <SwiperSlide key={index} onClick={() => handleClickProduct(item)}>
            <StyledCard>
              <CardMedia
                component="img"
                height="140"
                image={item?.images?.[0] || "https://via.placeholder.com/150"}
                alt={item?.name || "Sản phẩm"}
              />
              <CardContent>
                <Typography variant="subtitle2" color="error">
                  {item.promotion || "Không có khuyến mãi"}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ textDecoration: "line-through", color: "gray" }}
                >
                  {item.price} đ
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {item.quantity || "Liên hệ"}
                </Typography>
                <Typography variant="body2" color="green">
                  {item.name}
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ mt: 1, background: "#f50057" }}
                >
                  Mua ngay
                </Button>
              </CardContent>
            </StyledCard>
          </SwiperSlide>
        ))} */}


      </Swiper>
    </Box>
  );
};

export default BodyProduct;