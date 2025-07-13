import React, { useEffect, useState } from "react";
import {
  Container, Grid, ListItem, List, ListItemAvatar,
  Typography, Button, Box, Card, CardMedia, Chip, Breadcrumbs,
  TextField, Divider, Rating, ListItemText, Avatar, CardContent,
  Paper
} from "@mui/material";
import Header from "../../Hearder/Header";
import CategoryMenu from "../../CategoryMenu/CategoryMenu";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../Footer/Footer";
import { useLocation } from 'react-router-dom';
import { ShoppingCartIcon } from "lucide-react";
import { addCommentsAPI, getCommentsAPI } from "../../../apis";
import { selectCurrentUser, userSlice } from "../../../components/redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import { createCartProductAPI, getCartProductAPI } from "../../../components/redux/cart/cartSlice";
import { toast } from "react-toastify";
const DetailProduct = () => {
  const location = useLocation();
  const product = location.state || [];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(0);
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser)
  console.log('currentUser', currentUser)
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getCommentsAPI(product._id);
        setReviews(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Lỗi khi lấy bình luận:', error);
      }
    };

    if (product._id) {
      fetchComments();
    }
  }, [product._id]);
  const handleSubmit = async () => {
    if (!newReview || newRating === 0) {
      alert("Vui lòng nhập nội dung và đánh giá!");
      return;
    }

    try {
      const newCommentData = {
        productId: product._id,
        userId: currentUser.id,
        username: currentUser.email,
        content: newReview,
        rating: newRating,
      };

      const response = await addCommentsAPI(product._id, newCommentData);
      console.log("Bình luận đã gửi:", response);

      setReviews((prevReviews) => [...prevReviews, response]);

      setNewReview('');
      setNewRating(0);
    } catch (error) {
      console.error("Lỗi khi gửi bình luận:", error);
    }
  };

  const navigate = useNavigate();

  const handleCartProduct = (product) => {

    const priceAfterDiscount =
      product.discountPrice && product.discountPrice < product.price
        ? product.price - product.discountPrice
        : product.price;

    const productData = {
      productId: product._id,
      quantity: 1,
      price: priceAfterDiscount,
      name: product.name,
      images: product.images,
      originalPrice: product.price,
      promotion: product.promotion
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

  const reviewComments = reviews.filter(r => r.rating !== undefined && r.rating !== null);
  const avgRating = reviewComments.length > 0
    ? reviewComments.reduce((sum, r) => sum + r.rating, 0) / reviewComments.length
    : 0;
  const totalComments = reviews.length;

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <CategoryMenu />

        {/* Breadcrumbs */}
        <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 2, mb: 3 }}>
          <Button onClick={() => navigate("/")} sx={{ color: "primary.main" }}>Trang chủ</Button>
          <Button onClick={() => navigate("/dien-thoai")} sx={{ color: "primary.main" }}>Điện thoại</Button>
          <Typography color="text.primary">Iphone 16</Typography>
        </Breadcrumbs>

        <Grid container spacing={4}>
          {/* Hình ảnh */}
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3 }}>
              <CardMedia
                component="img"
                image={product.images}
                alt="Samsung Galaxy S24 FE"
                sx={{
                  height: 400,
                  objectFit: "contain",
                  width: "100%",
                  backgroundColor: "#f5f5f5",
                  borderRadius: 2,
                }}
              />

            </Card>
            <Box display="flex" justifyContent="center" mt={2}>
              {[1, 2, 3, 4, 5].map((_, index) => (
                <CardMedia
                  key={index}
                  component="img"
                  image={product.images}
                  alt={`Thumbnail ${index}`}
                  sx={{ width: 60, height: 60, mx: 1, cursor: "pointer", borderRadius: 1, boxShadow: 1 }}
                />
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>{product.name}</Typography>
            <Box display="flex" alignItems="center" gap={1} flexWrap="wrap" mb={1}>
              <Typography variant="body2" color="text.secondary">
                No.00911818
              </Typography>

              <Chip
                icon={<span style={{ fontSize: '1rem' }}>⭐</span>}
                label={`${avgRating.toFixed(1)} điểm`}
                size="small"
                color="primary"
                variant="outlined"
              />

              <Chip
                label={`${reviewComments.length} đánh giá`}
                size="small"
                color="default"
                variant="outlined"
              />

              <Chip
                label={`${totalComments} bình luận`}
                size="small"
                color="default"
                variant="outlined"
              />
            </Box>

            <Box mt={3}>
              <Typography sx={{ textDecoration: "line-through", color: "text.secondary" }}>
                {Number(product.price).toLocaleString("vi-VN")} đ
              </Typography>
              <Typography variant="h4" color="error" fontWeight="bold">
                {Number(product.priceAfterDiscount).toLocaleString("vi-VN")} đ
              </Typography>
            </Box>

            <Box mt={4}>
              <Button
                variant="contained"
                color="error"
                startIcon={<ShoppingCartIcon />}
                sx={{ borderRadius: 2, textTransform: 'none', px: 4, py: 1 }}
                onClick={() => handleCartProduct(product)}
              >
                Mua ngay
              </Button>
            </Box>

            <Box mt={4}>
              <Button variant="outlined" color="primary" size="small">
                Khuyến mãi nổi bật
              </Button>
              <Typography variant="body1" color="text.secondary">
                {product.promotion}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ border: "1px solid", borderColor: "grey.300", borderRadius: 2 }}>

          <Grid container spacing={3} mt={5}>
            <Grid item xs={12} sm={6} md={8}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
                    <Typography variant="h6" fontWeight="bold">Thông số nổi bật</Typography>
                    <Box mt={1}>
                      <Typography variant="body1">{product.specs}</Typography>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
                    <Typography variant="h6" fontWeight="bold">Mô tả sản phẩm</Typography>
                    <Typography variant="body1">{product.description}</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ p: 2, borderRadius: 2, height: '100%' }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>Video Sản phẩm</Typography>
                <CardMedia component="iframe" src={product.video} height="100%" style={{ minHeight: 350 }} />
              </Card>
            </Grid>
          </Grid>

        </Box>
        <Box
          sx={{
            width: "100%",
            maxWidth: "1200px",
            mx: "auto",
            mt: 6,
            p: 3,
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: 2,
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Khách hàng nói gì về sản phẩm
          </Typography>

          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Typography variant="h4" fontWeight="bold" color="primary">
              {avgRating.toFixed(1)}
            </Typography>
            <Rating value={avgRating} readOnly precision={0.1} size="large" />
            <Typography variant="body1" color="text.secondary">
              ({Array.isArray(reviews) ? reviews.length : 0} đánh giá)
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box mb={4}>
            <Typography variant="h6" gutterBottom>
              Viết bình luận của bạn
            </Typography>

            <TextField
              label="Nội dung bình luận"
              multiline
              rows={4}
              fullWidth
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Rating
              name="rating"
              value={newRating}
              onChange={(e, newValue) => setNewRating(newValue || 0)}
              size="large"
            />

            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: 2, px: 4 }}
            >
              Gửi bình luận
            </Button>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={2}>
            {Array.isArray(reviews) &&
              reviews.map((review, index) => (
                <Grid item xs={12} key={index}>
                  <Paper
                    elevation={1}
                    sx={{ p: 2, borderRadius: 2, display: "flex", gap: 2 }}
                  >

                    <Avatar alt={currentUser?.username} src={currentUser?.avatar} />

                    <Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {review.username}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {moment(review.createdAt).fromNow()}
                        </Typography>
                      </Box>

                      <Rating value={review.rating || 0} readOnly size="small" />

                      <Typography variant="body2" mt={1}>
                        {review.content}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Container>

      <Footer />

    </>
  );
};

export default DetailProduct;