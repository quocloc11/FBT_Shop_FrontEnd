import React from "react";
import { Container, Grid, Typography, IconButton } from "@mui/material";
import { Facebook, YouTube } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#111", color: "#fff", padding: "40px 0" }}>
      <Container>
        <Grid container spacing={4}>
          {/* Kết nối với FPT Shop */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6">KẾT NỐI VỚI FPT SHOP</Typography>
            <IconButton color="inherit"><Facebook /></IconButton>
            <IconButton color="inherit"><YouTube /></IconButton>
            {/* <IconButton color="inherit"><TikTok /></IconButton> */}
            <Typography variant="body2" style={{ marginTop: 10 }}>
              <strong>TỔNG ĐÀI MIỄN PHÍ</strong>
            </Typography>
            <Typography variant="body2">Tư vấn mua hàng: <strong>1800.6601</strong> (Nhánh 1)</Typography>
            <Typography variant="body2">Góp ý, khiếu nại: <strong>1800.6616</strong> (8h00 - 22h00)</Typography>
          </Grid>

          {/* Về chúng tôi */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6">VỀ CHÚNG TÔI</Typography>
            <Typography variant="body2">Giới thiệu về công ty</Typography>
            <Typography variant="body2">Quy chế hoạt động</Typography>
            <Typography variant="body2">Dự án Doanh nghiệp</Typography>
            <Typography variant="body2">Tin tức khuyến mại</Typography>
          </Grid>

          {/* Chính sách */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6">CHÍNH SÁCH</Typography>
            <Typography variant="body2">Chính sách bảo hành</Typography>
            <Typography variant="body2">Chính sách đổi trả</Typography>
            <Typography variant="body2">Chính sách bảo mật</Typography>
            <Typography variant="body2">Chính sách trả góp</Typography>
          </Grid>

          {/* Hỗ trợ thanh toán */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6">HỖ TRỢ THANH TOÁN</Typography>
            <img src="https://via.placeholder.com/150x50" alt="Payment Methods" style={{ width: "100%" }} />
            <Typography variant="h6" style={{ marginTop: 20 }}>CHỨNG NHẬN</Typography>
            <img src="https://via.placeholder.com/150x50" alt="Certifications" style={{ width: "100%" }} />
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;