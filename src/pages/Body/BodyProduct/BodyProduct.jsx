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
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createCartProductAPI, getCartProductAPI } from "../../../components/redux/cart/cartSlice";



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
  const dispatch = useDispatch();
  // Gọi API để lấy danh sách sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProductAPI();
        // console.log('response', response)
        setProduct(response.products);
        //setProduct(response)
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


  const handleCartProduct = (product) => {
    // Lọc ra các thuộc tính cần thiết
    const productData = {
      productId: product._id,
      quantity: 1,
      price: product.price,
      name: product.name,
      images: product.images
    };

    dispatch(createCartProductAPI(productData))
      .unwrap()
      .then(() => {
        dispatch(getCartProductAPI());
        toast.success("Sản phẩm đã được thêm vào giỏ hàng!");
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
        toast.error("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.");
      });
  };


  console.log('product', product)
  return (
    <Box sx={{ background: "#ffffff", py: 4, px: 10 }}>
      {/* Khối màu hồng nổi bên trong */}
      <Box
        sx={{
          background: "#ffe4e6",
          borderRadius: "10px",
          px: 1,
          py: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
          Giá tốt. Nhanh tay. Số lượng ít!
        </Typography>

        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          pagination={{ clickable: true }}
          navigation
          modules={[SwiperGrid, Navigation, Autoplay]}
          className="mySwiper"
        >
          {product?.map((product, index) => (
            <SwiperSlide key={index}>
              <StyledCard
                onClick={() => handleClickProduct(product)}
                sx={{ cursor: "pointer" }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={product.images}
                  alt={product.title}
                  sx={{
                    height: 140,
                    objectFit: "cover",
                    width: "100%",
                    borderRadius: "4px",
                    transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                      opacity: 0.9,
                    },
                  }}
                />

                <CardContent>
                  <Typography variant="subtitle2" color="error">
                    {product.promotion}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ textDecoration: "line-through", color: "gray" }}
                  >
                    {product.price}
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {product.quantity}
                  </Typography>
                  <Typography variant="body2" color="green">
                    {product.name}
                  </Typography>
                </CardContent>
              </StyledCard>
              <Box display="flex" justifyContent="center" mt={1}>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ background: "#f50057" }}
                  onClick={() => handleCartProduct(product)}
                >
                  Mua ngay
                </Button>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>

  );
};

export default BodyProduct;