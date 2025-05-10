import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');  // Điều hướng đến trang chủ
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f6f8',
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: 'white',
        }}
      >
        <Typography
          variant="h4"
          color="error"
          gutterBottom
        >
          403 - Bạn không có quyền truy cập trang này.
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          paragraph
        >
          Xin lỗi, bạn không có quyền truy cập vào trang này. Nếu cần trợ giúp, vui lòng liên hệ quản trị viên.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBackToHome}
          sx={{ marginTop: 2 }}
        >
          Quay lại trang chủ
        </Button>
      </Box>
    </Container>
  );
};

export default Unauthorized;
