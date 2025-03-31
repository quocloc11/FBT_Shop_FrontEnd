import React, { useEffect, useState } from "react";
import {
  Container, Grid, ListItem, List, ListItemAvatar,
  Typography, Button, Box, Card, CardMedia, Chip, Breadcrumbs,
  TextField, Divider, Rating, ListItemText, Avatar, CardContent
} from "@mui/material";
import Header from "../../Hearder/Header";
import CategoryMenu from "../../CategoryMenu/CategoryMenu";
import { useNavigate } from "react-router-dom";
import Footer from "../../Footer/Footer";
import { useLocation } from 'react-router-dom';
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
const initialReviews = [
  {
    id: 1,
    name: 'Vũ Thị Yến Anh',
    content: 'Mình mới đổi 15pm lên 16pm tạm tính 18.000.000 nhưng vẫn hài lòng.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Nguyễn Văn A',
    content: 'Sản phẩm rất tốt, đáng tiền.',
    rating: 4,
  },
];
const videos = [
  { title: "iPhone 15 Pro Max", url: "https://www.youtube.com/embed/8JnfIa84TnU" },
  { title: "iPhone 15 Series", url: "https://www.youtube.com/embed/JGwWNGJdvx8" },

];
//import { Link } from "react-router-dom";
const DetailProduct = () => {


  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  const [reviews, setReviews] = useState(initialReviews);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(0);

  const handleSubmit = () => {
    if (newReview && newRating) {
      const newReviewObj = {
        id: reviews.length + 1,
        name: 'Bạn mới',
        content: newReview,
        rating: newRating,
      };
      setReviews([...reviews, newReviewObj]);
      setNewReview('');
      setNewRating(0);
    }
  };
  const navigate = useNavigate();
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
            onClick={() => navigate("/dienthoai")}
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
                image="https://cdn2.fptshop.com.vn/unsafe/750x0/filters:quality(100)/samssung_galaxy_s24_fe_den_7f4246d44a.png"
                alt="Samsung Galaxy S24 FE"
                sx={{ height: 400 }}
              />
            </Card>
            <Box display="flex" justifyContent="center" mt={2}>
              {[1, 2, 3, 4, 5].map((_, index) => (
                <CardMedia
                  key={index}
                  component="img"
                  image="https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/iphone_15_pro_max_f589ed5358.png"
                  alt="Thumbnail"
                  sx={{ width: 60, height: 60, mx: 1, cursor: "pointer" }}
                />
              ))}
            </Box>
          </Grid>

          {/* Thông tin sản phẩm */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" fontWeight="bold">
              Samsung Galaxy S24 FE 5G 128GB
            </Typography>
            <Typography variant="body2" color="text.secondary">
              No.00911818 | ⭐ 4.2 | 13 đánh giá | 36 bình luận
            </Typography>

            {/* Dung lượng */}
            <Box mt={2}>
              <Typography variant="body1" fontWeight="bold">
                Dung lượng
              </Typography>
              <Box mt={1} display="flex" gap={1}>
                <Chip label="128 GB" color="primary" variant="outlined" />
                <Chip label="256 GB" variant="outlined" />
                <Chip label="512 GB" variant="outlined" />
              </Box>
            </Box>

            {/* Màu sắc */}
            <Box mt={2}>
              <Typography variant="body1" fontWeight="bold">
                Màu sắc
              </Typography>
              <Box mt={1} display="flex" gap={1}>
                <Chip label="Đen" color="primary" variant="outlined" />
                <Chip label="Xanh biển" variant="outlined" />
                <Chip label="Xám" variant="outlined" />
                <Chip label="Xanh lá" variant="outlined" />
              </Box>
            </Box>

            {/* Giá sản phẩm */}
            <Box mt={3}>
              <Typography variant="h4" color="error" fontWeight="bold">
                13.490.000 ₫
              </Typography>
              <Typography variant="body1" sx={{ textDecoration: "line-through", color: "text.secondary" }}>
                16.990.000 ₫
              </Typography>
              <Chip label="Giảm 3.500.000 ₫" color="success" variant="outlined" sx={{ mt: 1 }} />
            </Box>

            {/* Nút mua hàng */}
            <Box mt={4}>
              <Button variant="contained" color="primary" size="large" fullWidth>
                Mua ngay
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Thông số kỹ thuật */}
        <Box mt={6}>
          <Typography variant="h6" fontWeight="bold">Thông số nổi bật</Typography>
          <Box mt={2}>
            <Typography variant="body1">• Kích thước màn hình: 6.7 inch</Typography>
            <Typography variant="body1">• Camera: 50 MP</Typography>
            <Typography variant="body1">• RAM: 8 GB</Typography>
            <Typography variant="body1">• NFC: Có</Typography>
          </Box>
        </Box>

        {/* Chính sách bảo hành */}
        <Box mt={6}>
          <Typography variant="h6" fontWeight="bold">Chính sách bảo hành</Typography>
          <Typography variant="body1">• Hàng chính hãng - Bảo hành 12 tháng</Typography>
          <Typography variant="body1">• Giao hàng toàn quốc</Typography>
          <Typography variant="body1">• Kỹ thuật viên hỗ trợ trực tuyến</Typography>
        </Box>

        <Grid container spacing={2}>
          {videos.map((video, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="iframe"
                  src={video.url}
                  height="200"
                  title={video.title}
                />
                <Typography variant="h6" sx={{ p: 2 }}>
                  {video.title}
                </Typography>
              </Card>
            </Grid>
          ))}
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
            {reviews.map((review) => (
              <ListItem key={review.id}>
                <ListItemAvatar>
                  <Avatar>{review.name.charAt(0)}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography variant="subtitle1">{review.name}</Typography>}
                  secondary={
                    <>
                      <Rating value={review.rating} readOnly />
                      <Typography variant="body2">{review.content}</Typography>
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