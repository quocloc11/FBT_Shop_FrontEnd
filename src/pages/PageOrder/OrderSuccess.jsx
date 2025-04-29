// pages/OrderSuccess.jsx
import { Typography, Container, Button } from "@mui/material";
import { useSearchParams, useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const [params] = useSearchParams();
  const orderId = params.get("order_id");
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        🎉 Đặt hàng thành công!
      </Typography>
      <Typography variant="body1">
        Mã đơn hàng của bạn là: <strong>{orderId}</strong>
      </Typography>
      <Typography mt={2}>
        Cảm ơn bạn đã mua hàng tại shop của chúng tôi!
      </Typography>
      <Button
        variant="outlined"
        sx={{ mt: 4 }}
        onClick={() => navigate("/")}
      >
        Về trang chủ
      </Button>
    </Container>
  );
};

export default OrderSuccess;
