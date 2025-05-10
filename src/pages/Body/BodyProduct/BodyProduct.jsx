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

  // const handleClickProduct = async (product) => {
  //   await addViewProductAPI(product); // Gọi API trước
  //   navigate(`/${slugify(product?.category)}/${slugify(product?.name)}`, { state: product }); // Sau đó chuyển trang
  // };
  const handleClickProduct = async (product) => {
    await addViewProductAPI(product);

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
  };

  return (
    <Box sx={{ background: "#ffffff", py: 4, px: 9 }}>
      {/* Khối màu hồng nổi bên trong */}
      <Box
        sx={{
          backgroundImage: 'url("https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/Background_gia_online_D_9b239b2ffc.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '10px',
          px: 1,
          py: 2,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{
            mt: 3,
            mb: 2,
            fontSize: '2rem',
            lineHeight: 1.4,
            letterSpacing: '0.5px',
            textAlign: 'center',
            color: '#d32f2f',
            textTransform: 'uppercase'
          }}
        >
          Giá tốt. Nhanh tay. Số lượng ít!
        </Typography>


        <Swiper
          slidesPerView={5}
          spaceBetween={15}
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
                  image={product.images}
                  alt={product.title}
                  sx={{
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
                  {product.discountPrice && product.discountPrice < product.price ? (
                    <>


                      {/* Giá gốc */}
                      <Typography
                        variant="body2"
                        sx={{
                          textDecoration: "line-through",
                          color: "gray",
                        }}
                      >
                        {Number(product.price).toLocaleString("vi-VN")} đ
                      </Typography>
                      {/* Giá đã giảm */}
                      <Typography
                        variant="h6"
                        sx={{
                          color: "error.main",
                          fontWeight: "bold",
                          fontSize: "1.1rem",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {Number(product.price - product.discountPrice).toLocaleString("vi-VN")} đ
                      </Typography>
                      {/* Phần giảm giá (VD: -2.000.000 đ) */}
                      <Typography
                        variant="body2"
                        color="success.main"
                        sx={{ fontWeight: 500 }}
                      >
                        Giảm {Number(product.discountPrice).toLocaleString("vi-VN")} đ

                      </Typography>
                    </>
                  ) : (
                    // Nếu không giảm giá, chỉ hiển thị giá gốc
                    <Typography
                      variant="h6"
                      sx={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {Number(product.price).toLocaleString("vi-VN")} đ
                    </Typography>
                  )}

                  <Typography variant="body2" color="black" mt={1}>
                    {product.name}
                  </Typography>
                </CardContent>

              </StyledCard>
              <Box display="flex" justifyContent="center" mt={1}>
                {/* <Button
                  variant="contained"
                  size="small"
                  sx={{ background: "#f50057" }}
                  onClick={() => handleCartProduct(product)}
                >
                  Mua ngay
                </Button> */}
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>

  );
};

export default BodyProduct;