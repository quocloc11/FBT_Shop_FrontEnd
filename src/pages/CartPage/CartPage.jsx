import React from "react";
import { Container, Grid, Typography, Box, Button, Card, CardMedia, CardContent, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../Hearder/Header";
import ViewedProducts from "../ViewProduct/ViewProduct";
import Footer from "../Footer/Footer";

const CartPage = () => {
  const cartItems = [
    {
      id: 1,
      name: "Samsung Galaxy S24 FE 5G 128GB",
      price: 13490000,
      oldPrice: 16990000,
      image: "https://cdn2.fptshop.com.vn/unsafe/750x0/filters:quality(100)/samssung_galaxy_s24_fe_den_7f4246d44a.png",
      quantity: 1,
    },
    {
      id: 2,
      name: "iPhone 15 Pro Max 256GB",
      price: 29990000,
      oldPrice: 32990000,
      image: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/iphone_15_pro_max_f589ed5358.png",
      quantity: 1,
    },
  ];

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          {/* Danh sách sản phẩm */}
          <Grid item xs={12} md={8}>
            {cartItems.map((item) => (
              <Card key={item.id} sx={{ display: "flex", mb: 2 }}>
                <CardMedia component="img" image={item.image} alt={item.name} sx={{ width: 120, height: 120 }} />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6" fontWeight="bold">{item.name}</Typography>
                  <Typography variant="body1" color="error" fontWeight="bold">
                    {item.price.toLocaleString()} ₫
                  </Typography>
                  <Typography variant="body2" sx={{ textDecoration: "line-through", color: "text.secondary" }}>
                    {item.oldPrice.toLocaleString()} ₫
                  </Typography>
                  <Typography variant="body2">Số lượng: {item.quantity}</Typography>
                </CardContent>
                <IconButton color="error">
                  <DeleteIcon />
                </IconButton>
              </Card>
            ))}
          </Grid>

          {/* Thông tin đơn hàng */}
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, border: "1px solid #ddd", borderRadius: 2 }}>
              <Typography variant="h6" fontWeight="bold" mb={2}>Thông tin đơn hàng</Typography>
              <Typography variant="body1">Tổng tiền: </Typography>
              <Typography variant="h5" color="error" fontWeight="bold" mb={2}>
                {totalAmount.toLocaleString()} ₫
              </Typography>
              <Button variant="contained" color="primary" fullWidth>
                Tiến hành thanh toán
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <ViewedProducts />
      <Footer />
    </>
  );
};

export default CartPage;
