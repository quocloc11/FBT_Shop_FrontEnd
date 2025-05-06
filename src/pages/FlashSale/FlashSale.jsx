
// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardMedia, Typography, Box, Button, Grid as MuiGrid } from "@mui/material";
// import { styled } from "@mui/system";
// import { useNavigate } from "react-router-dom";
// import { getProductAPI } from '../../apis';
// import slugify from "slugify";
// import { addViewProductAPI } from '../../apis';
// import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
// import { createCartProductAPI, getCartProductAPI } from "../../components/redux/cart/cartSlice.js";

// // Styled components
// const CountdownBox = styled(Box)({
//   backgroundColor: '#f44336',
//   color: 'white',
//   padding: '4px 8px',
//   borderRadius: '4px',
//   display: 'inline-block',
//   fontWeight: 'bold',
//   fontSize: '14px',
//   marginTop: '8px',
//   position: 'absolute',
//   top: '10px',
//   left: '10px',
// });

// const StyledCard = styled(Card)({
//   boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//   borderRadius: "10px",
//   textAlign: "center",
//   padding: "10px",
//   position: "relative",
//   "&:hover": {
//     transform: "scale(1.05)",
//     boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
//   },
// });

// const FlashSale = () => {
//   const navigate = useNavigate();
//   const [product, setProduct] = useState([]);
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const dispatch = useDispatch();

//   // Lấy danh sách sản phẩm Flash Sale từ API
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await getProductAPI();
//         setProduct(response);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Cập nhật thời gian hiện tại mỗi giây
//   useEffect(() => {
//     const intervalId = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(intervalId);
//   }, []);

//   // Tính toán thời gian còn lại cho Flash Sale
//   const getTimeRemaining = (endTime) => {
//     const total = new Date(endTime) - currentTime;
//     const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
//     const minutes = Math.floor((total / 1000 / 60) % 60);
//     const seconds = Math.floor((total / 1000) % 60);
//     return { hours, minutes, seconds };
//   };

//   // Chuyển trang khi nhấn vào sản phẩm
//   const handleClickProduct = async (product) => {
//     await addViewProductAPI(product); // Gọi API trước
//     navigate(`/${slugify(product?.category)}/${slugify(product?.name)}`, { state: product }); // Sau đó chuyển trang
//   };

//   // Thêm sản phẩm vào giỏ hàng
//   const handleCartProduct = (product) => {
//     const productData = {
//       productId: product._id,
//       quantity: 1,
//       price: product.price,
//       name: product.name,
//       images: product.images
//     };

//     dispatch(createCartProductAPI(productData))
//       .unwrap()
//       .then(() => {
//         dispatch(getCartProductAPI());
//         toast.success("Sản phẩm đã được thêm vào giỏ hàng!");
//       })
//       .catch((error) => {
//         console.error("Error adding product to cart:", error);
//         toast.error("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.");
//       });
//   };

//   return (
//     <Box sx={{ background: "#ffffff", py: 4, px: 10 }}>
//       {/* Khối màu hồng nổi bên trong */}
//       <Box
//         sx={{
//           borderRadius: "10px",
//           px: 1,
//           py: 2,
//         }}
//       >
//         <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
//           Giờ Vàng Giá Sốc
//         </Typography>

//         <MuiGrid container spacing={3} justifyContent="center">
//           {product
//             ?.filter((p) => p.flashSale?.isActive) // Lọc các sản phẩm Flash Sale đang hoạt động
//             .map((product, index) => {
//               const flashSalePrice = product.price - (product.price * product.flashSale.discountPercent / 100); // Tính giá sau giảm
//               const { hours, minutes, seconds } = getTimeRemaining(product.flashSale.saleEnd);

//               return (
//                 <MuiGrid item xs={12} sm={6} md={4} key={index}>
//                   <StyledCard onClick={() => handleClickProduct(product)}>
//                     <CardMedia
//                       component="img"
//                       height="200"
//                       image={product.images}
//                       alt={product.title}
//                       sx={{
//                         objectFit: "cover",
//                         width: "100%",
//                         borderRadius: "8px",
//                         transition: "transform 0.3s ease-in-out",
//                       }}
//                     />
//                     <CardContent>
//                       <Typography variant="subtitle2" color="error" sx={{ fontWeight: 'bold' }}>
//                         {product.flashSale?.promotion}
//                       </Typography>
//                       <Typography variant="body2" sx={{ textDecoration: "line-through", color: "gray" }}>
//                         {product.price.toLocaleString("vi-VN")}đ
//                       </Typography>
//                       <Typography variant="h6" color="error" fontWeight="bold">
//                         {flashSalePrice.toLocaleString("vi-VN")}đ
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         Còn lại: {product.flashSale.quantity} sản phẩm
//                       </Typography>
//                     </CardContent>
//                     {/* Hiển thị đồng hồ đếm ngược */}
//                     <CountdownBox>
//                       {hours}h {minutes}m {seconds}s
//                     </CountdownBox>
//                   </StyledCard>

//                   <Box display="flex" justifyContent="center" mt={2}>
//                     <Button
//                       variant="contained"
//                       size="small"
//                       sx={{ background: "#f50057", '&:hover': { backgroundColor: '#d32f2f' } }}
//                       onClick={() => handleCartProduct(product)}
//                     >
//                       Mua ngay
//                     </Button>
//                   </Box>
//                 </MuiGrid>
//               );
//             })}
//         </MuiGrid>
//       </Box>
//     </Box>
//   );
// };

// export default FlashSale;

// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardMedia, Typography, Box, Button, Grid as MuiGrid } from "@mui/material";
// import { styled } from "@mui/system";
// import { useNavigate } from "react-router-dom";
// import { getProductAPI, addViewProductAPI } from '../../apis';
// import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
// import { createCartProductAPI, getCartProductAPI } from "../../components/redux/cart/cartSlice.js";
// import slugify from "slugify";

// // Styled components
// const CountdownBox = styled(Box)({
//   backgroundColor: '#f44336',
//   color: 'white',
//   padding: '4px 8px',
//   borderRadius: '4px',
//   display: 'inline-block',
//   fontWeight: 'bold',
//   fontSize: '14px',
//   marginTop: '8px',
//   position: 'absolute',
//   top: '10px',
//   left: '10px',
// });

// const StyledCard = styled(Card)({
//   boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//   borderRadius: "10px",
//   textAlign: "center",
//   padding: "10px",
//   position: "relative",
//   "&:hover": {
//     transform: "scale(1.05)",
//     boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
//   },
// });

// const FlashSale = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [product, setProduct] = useState([]);
//   const [currentTime, setCurrentTime] = useState(new Date());

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await getProductAPI();
//         setProduct(response);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const getTimeRemaining = (endTime) => {
//     const total = new Date(endTime) - currentTime;
//     const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
//     const minutes = Math.floor((total / 1000 / 60) % 60);
//     const seconds = Math.floor((total / 1000) % 60);
//     return { total, hours, minutes, seconds };
//   };

//   const handleClickProduct = async (product) => {
//     await addViewProductAPI(product);
//     navigate(`/${slugify(product?.category)}/${slugify(product?.name)}`, { state: product });
//   };

//   const handleCartProduct = (product) => {
//     const productData = {
//       productId: product._id,
//       quantity: 1,
//       price: product.price,
//       name: product.name,
//       images: product.images
//     };

//     dispatch(createCartProductAPI(productData))
//       .unwrap()
//       .then(() => {
//         dispatch(getCartProductAPI());
//         toast.success("Sản phẩm đã được thêm vào giỏ hàng!");
//       })
//       .catch((error) => {
//         console.error("Error adding product to cart:", error);
//         toast.error("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.");
//       });
//   };

//   return (
//     <Box sx={{ background: "#ffffff", py: 4, px: 10 }}>
//       <Box sx={{ borderRadius: "10px", px: 1, py: 2 }}>
//         <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
//           Giờ Vàng Giá Sốc
//         </Typography>

//         <MuiGrid container spacing={3} justifyContent="center">
//           {product
//             ?.filter(p =>
//               p.flashSale?.isActive &&
//               new Date(p.flashSale.saleEnd) > currentTime
//             )
//             .map((product, index) => {
//               const flashSalePrice = product.price - (product.price * product.flashSale.discountPercent / 100);
//               const { total, hours, minutes, seconds } = getTimeRemaining(product.flashSale.saleEnd);

//               return (
//                 <MuiGrid item xs={12} sm={6} md={4} key={index}>
//                   <StyledCard onClick={() => handleClickProduct(product)}>
//                     <CardMedia
//                       component="img"
//                       height="200"
//                       image={product.images}
//                       alt={product.title}
//                       sx={{
//                         objectFit: "cover",
//                         width: "100%",
//                         borderRadius: "8px",
//                         transition: "transform 0.3s ease-in-out",
//                       }}
//                     />
//                     <CardContent>
//                       <Typography variant="subtitle2" color="error" sx={{ fontWeight: 'bold' }}>
//                         {product.flashSale?.promotion}
//                       </Typography>

//                       <Typography variant="body2" sx={{ textDecoration: "line-through", color: "gray" }}>
//                         {product.price.toLocaleString("vi-VN")}đ
//                       </Typography>

//                       <Typography variant="h6" color="error" fontWeight="bold">
//                         {flashSalePrice.toLocaleString("vi-VN")}đ
//                       </Typography>

//                       <Typography variant="body2" color="text.secondary">
//                         Còn lại: {product.flashSale.quantity} sản phẩm
//                       </Typography>
//                     </CardContent>

//                     {/* Chỉ hiện đồng hồ nếu thời gian vẫn còn */}
//                     {total > 0 && (
//                       <CountdownBox>
//                         {hours}h {minutes}m {seconds}s
//                       </CountdownBox>
//                     )}
//                   </StyledCard>

//                   <Box display="flex" justifyContent="center" mt={2}>
//                     <Button
//                       variant="contained"
//                       size="small"
//                       sx={{ background: "#f50057", '&:hover': { backgroundColor: '#d32f2f' } }}
//                       onClick={() => handleCartProduct(product)}
//                     >
//                       Mua ngay
//                     </Button>
//                   </Box>
//                 </MuiGrid>
//               );
//             })}
//         </MuiGrid>
//       </Box>
//     </Box>
//   );
// };

// export default FlashSale;

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



  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const res = await getProductAPI();
  //       console.log(res);
  //       setProducts(res);
  //     } catch (err) {
  //       console.error('Lỗi lấy danh sách sản phẩm:', err);
  //     }
  //   };
  //   fetchProducts();
  // }, []);

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

