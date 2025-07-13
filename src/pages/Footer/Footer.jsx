import React from "react";
import { Container, Grid, Typography, IconButton } from "@mui/material";
import { Facebook, YouTube } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#111", color: "#fff", padding: "40px 0" }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Typography variant="h6">KẾT NỐI VỚI FPT SHOP</Typography>
            <IconButton color="inherit"><Facebook /></IconButton>
            <IconButton color="inherit"><YouTube /></IconButton>
            <Typography variant="body2" style={{ marginTop: 10 }}>
              <strong>TỔNG ĐÀI MIỄN PHÍ</strong>
            </Typography>
            <Typography variant="body2">Tư vấn mua hàng: <strong>1800.6601</strong> (Nhánh 1)</Typography>
            <Typography variant="body2">Góp ý, khiếu nại: <strong>1800.6616</strong> (8h00 - 22h00)</Typography>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6">VỀ CHÚNG TÔI</Typography>
            <Typography variant="body2">Giới thiệu về công ty</Typography>
            <Typography variant="body2">Quy chế hoạt động</Typography>
            <Typography variant="body2">Dự án Doanh nghiệp</Typography>
            <Typography variant="body2">Tin tức khuyến mại</Typography>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6">CHÍNH SÁCH</Typography>
            <Typography variant="body2">Chính sách bảo hành</Typography>
            <Typography variant="body2">Chính sách đổi trả</Typography>
            <Typography variant="body2">Chính sách bảo mật</Typography>
            <Typography variant="body2">Chính sách trả góp</Typography>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6">HỖ TRỢ THANH TOÁN</Typography>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <img src="https://cdn2.fptshop.com.vn/svg/visa_icon_44fe6e15ed.svg" alt="Visa Payment" style={{ width: "30%", marginBottom: 10 }} />
              <img src="https://cdn2.fptshop.com.vn/svg/zalopay_icon_26d64ea93f.svg" alt="Mastercard Payment" style={{ width: "30%", marginBottom: 10 }} />
              <img src="https://cdn2.fptshop.com.vn/svg/googlepay_icon_afa293cc14.svg" alt="Paypal Payment" style={{ width: "30%", marginBottom: 10 }} />
            </div>

            <Typography variant="h6" style={{ marginTop: 20 }}>CHỨNG NHẬN</Typography>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <img src="https://cdn2.fptshop.com.vn/svg/dmca_icon_8fc6622bd5.svg" alt="DMCA Certification" style={{ width: "30%", marginBottom: 10 }} />
              <img src="https://cdn2.fptshop.com.vn/svg/thuong_hieu_manh_2013_icon_b56f772475.svg" alt="ISO Certification" style={{ width: "30%", marginBottom: 10 }} />
              <img src="https://cdn2.fptshop.com.vn/svg/san_pham_dich_vu_hang_dau_viet_nam_icon_282a9ba4f7.svg" alt="ISO Certification" style={{ width: "30%", marginBottom: 10 }} />
            </div>
          </Grid>

        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;