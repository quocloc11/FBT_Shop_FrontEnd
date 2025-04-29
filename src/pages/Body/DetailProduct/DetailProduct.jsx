import React, { useEffect, useState } from "react";
import {
  Container, Grid, ListItem, List, ListItemAvatar,
  Typography, Button, Box, Card, CardMedia, Chip, Breadcrumbs,
  TextField, Divider, Rating, ListItemText, Avatar, CardContent
} from "@mui/material";
import Header from "../../Hearder/Header";
import CategoryMenu from "../../CategoryMenu/CategoryMenu";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../Footer/Footer";
import { useLocation } from 'react-router-dom';
import { ShoppingCartIcon } from "lucide-react";
import { addCommentsAPI, getCommentsAPI } from "../../../apis";
import { userSlice } from "../../../components/redux/user/userSlice";
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
  const [reviews, setReviews] = useState(product);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(0);
  const dispatch = useDispatch();
  console.log('product', product)

  const currentUser = useSelector((state) => state.user.currentUser);


  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getCommentsAPI(product._id); // Lấy bình luận từ API bằng product._id
        console.log('comments:', data);
        // Cập nhật lại reviews
        setReviews(Array.isArray(data) ? data : []); // Giả sử data là một mảng bình luận
      } catch (error) {
        console.error('Lỗi khi lấy bình luận:', error);
      }
    };

    if (product._id) {
      fetchComments(); // Gọi API khi có product._id
    }
  }, [product._id]); // Chạy lại khi product._id thay đổi

  const handleSubmit = async () => {
    if (!newReview || newRating === 0) {
      alert("Vui lòng nhập nội dung và đánh giá!");
      return;
    }

    try {
      // Gửi bình luận mới qua API
      const newCommentData = {
        productId: product._id, // Sử dụng ID của sản phẩm
        userId: currentUser.id, // Lấy userId từ Redux store
        username: currentUser.email, // Lấy username từ Redux store
        content: newReview,
        rating: newRating,
      };

      // Gửi bình luận qua API
      const response = await addCommentsAPI(product._id, newCommentData);
      console.log("Bình luận đã gửi:", response);

      // Cập nhật lại danh sách bình luận
      setReviews((prevReviews) => [...prevReviews, response]); // Giả sử response là bình luận mới được trả về từ API

      // Reset lại form nhập bình luận
      setNewReview('');
      setNewRating(0);
    } catch (error) {
      console.error("Lỗi khi gửi bình luận:", error);
    }
  };

  const navigate = useNavigate();

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
  return (
    <>
      <Header />
      <Container maxWidth="lg" >
        <CategoryMenu />
        <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 1 }}>
          <Button
            onClick={() => navigate("/")}
            sx={{ cursor: "pointer", color: "blue", "&:hover": { textDecoration: "underline" } }}
          >
            Trang chủ
          </Button>
          <Button
            onClick={() => navigate("/dien-thoai")}
            sx={{ cursor: "pointer", color: "blue", "&:hover": { textDecoration: "underline" } }}
          >
            Điện thoại
          </Button>
          <Button color="textPrimary">Iphone 16</Button>
        </Breadcrumbs>
        <Grid container spacing={4} sx={{ mt: 1 }}>
          {/* Hình ảnh sản phẩm */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                image={product.images}
                alt="Samsung Galaxy S24 FE"
                sx={{ height: 400 }}
              />
            </Card>
            <Box display="flex" justifyContent="center" mt={2}>
              {[1, 2, 3, 4, 5].map((_, index) => (
                <CardMedia
                  key={index}
                  component="img"
                  image={product.images}
                  alt="Thumbnail"
                  sx={{ width: 60, height: 60, mx: 1, cursor: "pointer" }}
                />
              ))}
            </Box>
          </Grid>

          {/* Thông tin sản phẩm */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" fontWeight="bold">
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" >
              No.00911818 | ⭐ 4.2 | 13 đánh giá | 36 bình luận
            </Typography>

            {/* Giá sản phẩm */}
            <Box mt={3}>
              <Typography variant="h4" color="error" fontWeight="bold">
                {product.price} ₫
              </Typography>
              <Typography variant="body1" sx={{ textDecoration: "line-through", color: "text.secondary" }}>
                {product.price}
              </Typography>
            </Box>

            <Box mt={4} display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="error"
                size="small"
                startIcon={<ShoppingCartIcon />}
                sx={{
                  borderRadius: 2,
                  fontWeight: 'bold',
                  textTransform: 'none',
                  px: 3, // padding ngang
                  py: 1, // padding dọc
                  minWidth: 'auto', // không bị kéo dài không cần thiết
                }}
                onClick={() => handleCartProduct(product)}
              >
                Mua ngay
              </Button>
            </Box>

            <Box mt={4}>
              <Button size="large" >
                Khuyến mãi nổi bật
              </Button>
              <Typography variant="body1" sx={{ textDecoration: "line-through", color: "text.secondary" }}>
                {product.promotion}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Thông số kỹ thuật */}
        <Grid container spacing={2} mt={4}>
          {/* Thông số & Mô tả */}
          <Grid item xs={12} sm={6} md={4}>
            <Box>
              <Typography variant="h6" fontWeight="bold">Thông số nổi bật</Typography>
              <Box mt={2}>
                <Typography variant="body1">{product.specs}</Typography>
              </Box>

            </Box>
          </Grid>

          {/* Video sản phẩm */}
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <Typography variant="h6" sx={{ p: 2 }}>
                Video Sản phẩm
              </Typography>
              <CardMedia
                component="iframe"
                src={product.video}
                height="200"
              />

            </Card>
          </Grid>

          {/* Phần thứ 3 (tuỳ bạn muốn thêm gì ở đây) */}
          <Grid item xs={12} sm={6} md={4}>
            <Box>
              <Typography variant="h6" fontWeight="bold" mt={2}>Mô Tả Sản Phẩm</Typography>
              <Typography variant="body1">{product.description}</Typography>
            </Box>
          </Grid>
        </Grid>


        <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
          <Typography variant="h5">Khách hàng nói về sản phẩm</Typography>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            4.4
          </Typography>
          <Rating value={4.4} readOnly precision={0.1} />
          <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
            {reviews.length} Bình luận
          </Typography>

          <Divider sx={{ margin: '20px 0' }} />

          <TextField
            label="Nhập nội dung bình luận"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Rating
            name="simple-controlled"
            value={newRating}
            onChange={(event, newValue) => {
              setNewRating(newValue);
            }}
          />
          <Button variant="contained" onClick={handleSubmit} sx={{ marginTop: 2 }}>
            Gửi bình luận
          </Button>

          <Divider sx={{ margin: '20px 0' }} />

          <List>
            {Array.isArray(reviews) && reviews.map((review, index) => (
              <ListItem key={index} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar>{review.username.charAt(0)}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <>
                      <Typography variant="subtitle2">{review.username}</Typography>
                      <Rating value={review.rating || 0} readOnly size="small" />
                    </>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" color="text.primary">
                        {review.content}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {moment(review.createdAt).fromNow()} {/* Hiển thị thời gian cách đây */}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>


      </Container>
      <Footer />


    </>
  );
};

export default DetailProduct;