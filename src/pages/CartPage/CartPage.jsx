import React, { useEffect, useState } from 'react';
import {
  Box, Button, Card, CardContent, Collapse, Divider,
  FormControl, Grid, IconButton, InputLabel, MenuItem,
  Select, TextField, Typography, Checkbox,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Header from '../Hearder/Header';
import CategoryMenu from '../CategoryMenu/CategoryMenu';
//import { deleteCartProductAPI, getCartProductAPI } from '../../apis';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import ViewedProducts from '../ViewProduct/ViewProduct';
import "toastify-js/src/toastify.css"
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { createOrderProductAPI, deleteOrderProductAPI, getOrderProductAPI } from '../../components/redux/order/orderSlice';
import { clearCart, deleteCartProductAPI, getCartProductAPI } from '../../components/redux/cart/cartSlice';
import PaymentIcon from '@mui/icons-material/Payment';
const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [warrantyOption, setWarrantyOption] = useState('');
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');


  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartProductAPI())
      .then(response => {
        console.log('Response from API:', response);  // Kiểm tra response
        if (response.payload && Array.isArray(response.payload.items)) {
          setCartItems(response.payload.items);
        } else {
          console.error('Giỏ hàng trống hoặc không hợp lệ');
        }
      })
      .catch(error => {
        console.error('Lỗi khi lấy giỏ hàng:', error);
      });
  }, [dispatch]);


  const QR_IMAGE_MAP = {
    bank: 'https://api.qrserver.com/v1/create-qr-code/?data=Chuyen%20khoan%20NGAN%20HANG%20ABC%20-%20So%20TK%3A%20123456789&size=200x200',
    momo: 'https://api.qrserver.com/v1/create-qr-code/?data=Thanh%20toan%20MOMO%20-%20SDT%3A%200901234567&size=200x200',
    zalopay: 'https://api.qrserver.com/v1/create-qr-code/?data=ZaloPay%20-%20User%3A%20zalo_user_demo&size=200x200',
  };

  const handleQuantityChange = (index, delta) => {
    setCartItems(prev => {
      const updated = [...prev];
      updated[index].quantity = Math.max(1, (updated[index].quantity || 1) + delta);
      return updated;
    });
  };

  const handleRemoveCart = async (productId) => {
    console.log("Đang xóa productId:", productId); // 👈 kiểm tra id gửi đi
    try {
      await dispatch(deleteCartProductAPI(productId));
      const response = await dispatch(getCartProductAPI());
      console.log("Giỏ hàng sau khi xóa:", response.payload.items);
      setCartItems(response.payload.items);
      console.log('cartItems', cartItems)
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };



  const total = cartItems && Array.isArray(cartItems) && cartItems.length > 0
    ? cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    : 0;
  const totalOriginal = cartItems && Array.isArray(cartItems) && cartItems.length > 0
    ? cartItems.reduce((sum, item) => sum + (item.originalPrice || item.price) * item.quantity, 0)
    : 0;

  const totalDiscount = totalOriginal - total;

  const handleConfirmOrder = async (order) => {
    if (!paymentMethod) {
      toast.error("Vui lòng chọn phương thức thanh toán!");
      return;
    }

    // Bổ sung phương thức thanh toán vào đơn hàng
    const orderWithPayment = { ...order, paymentMethod };

    try {
      // Bắt đầu tạo đơn hàng
      const action = await dispatch(createOrderProductAPI(orderWithPayment));

      if (action.type === 'orders/createOrderProductAPI/fulfilled') {
        const orderId = action.payload._id;

        // Xóa giỏ hàng sau khi đặt hàng thành công
        await Promise.all(cartItems.map(item => dispatch(deleteCartProductAPI(item.productId))));
        dispatch(clearCart());

        // Cập nhật lại đơn hàng mới từ server
        await dispatch(getOrderProductAPI());

        // Hiển thị thông báo thành công
        toast.success("Đơn hàng đã được đặt thành công!");

        // Điều hướng tới trang kết quả đặt hàng thành công
        navigate(`/order-success?order_id=${orderId}`);

      } else {
        // Xử lý khi tạo đơn hàng thất bại
        toast.error("Đặt hàng thất bại!");
      }
    } catch (err) {
      // Xử lý lỗi khi có lỗi trong quá trình tạo đơn hàng
      toast.error("Lỗi khi đặt hàng: " + (err.response?.data?.message || err.message));
    }
  };
  return (
    <>
      <Header />
      <CategoryMenu />
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            {cartItems.length === 0 ? (
              <>
                <Box
                  textAlign="center"
                  py={5}
                  sx={{
                    border: '1px dashed #ccc',
                    borderRadius: 2,
                    backgroundColor: '#fefefe',
                  }}
                >
                  <Typography variant="h6" color="text.secondary">
                    🛒 Không có sản phẩm trong giỏ hàng
                  </Typography>
                </Box>

                {/* Chỉ hiển thị ViewedProducts khi giỏ hàng rỗng */}
                <Box mt={4}>
                  <ViewedProducts />
                </Box>
              </>
            ) : (
              <>
                {cartItems.map((item, index) => (
                  <Card key={item.productId} sx={{ mb: 2 }}>
                    <CardContent>
                      <Box display="flex" alignItems="center">
                        <Checkbox defaultChecked />
                        <Box ml={2} display="flex" alignItems="center" flex={1}>
                          <img

                            src={item?.images || 'https://via.placeholder.com/80'}
                            alt={item.name}
                            style={{
                              width: 80,
                              height: 80,
                              objectFit: 'cover',
                              borderRadius: 8,
                              marginRight: 16,
                            }}
                          />
                          <Box flex={1}>

                            <Typography fontWeight="bold">{item.name}</Typography>

                            {item.originalPrice && item.originalPrice > item.price && (
                              <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                                {Number(item.originalPrice).toLocaleString('vi-VN')} đ
                              </Typography>
                            )}

                            <Typography variant="body1" fontWeight="bold" color="error">
                              {Number(item.price).toLocaleString('vi-VN')} đ
                            </Typography>

                            <Box display="flex" alignItems="center" mt={1}>
                              <IconButton onClick={() => handleQuantityChange(index, -1)}>
                                <RemoveIcon />
                              </IconButton>
                              <Typography>{item.quantity || 1}</Typography>
                              <IconButton onClick={() => handleQuantityChange(index, 1)}>
                                <AddIcon />
                              </IconButton>
                              <IconButton onClick={() => handleRemoveCart(item.productId)}>
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </>
            )}
          </Grid>


          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography fontWeight="bold" gutterBottom>
                  Thông tin đơn hàng
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Box display="flex" justifyContent="space-between">
                  <Typography>Tổng tiền</Typography>
                  <Typography>{totalOriginal.toLocaleString('vi-VN')} đ</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box display="flex" justifyContent="space-between">
                  <Typography>Tổng khuyến mãi</Typography>
                  <Typography>{totalDiscount.toLocaleString('vi-VN')} đ</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box display="flex" justifyContent="space-between">
                  <Typography>Cần thanh toán</Typography>
                  <Typography sx={{ color: 'red', fontWeight: 'bold' }}>
                    {total.toLocaleString('vi-VN')} đ
                  </Typography>

                </Box>

                <Box mt={2}>
                  <Button size="small" onClick={() => setDetailsOpen(!detailsOpen)}>
                    Xem chi tiết
                  </Button>
                  <Collapse in={detailsOpen}>
                    <Typography variant="body2" color="text.secondary">
                      Giá trước khuyến mãi, gói bảo hành nếu có, v.v.
                    </Typography>
                  </Collapse>
                </Box>



                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => setShowInput(true)}
                >
                  Xác nhận đơn
                </Button>

                {showInput && (
                  <Box mt={2}>
                    <TextField
                      fullWidth
                      label="Họ và tên"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Số điện thoại"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      sx={{ mb: 2 }}
                    />

                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <FormLabel>Phương thức thanh toán</FormLabel>
                      <RadioGroup
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      >
                        <FormControlLabel
                          value="cod"
                          control={<Radio />}
                          label={
                            <Box display="flex" alignItems="center">
                              <img
                                src="https://s3-sgn09.fptcloud.com/ict-payment-icon/payment/cod.png"
                                alt="COD"
                                style={{ width: 30, height: 30, marginRight: 8 }}
                              />
                              Thanh toán khi nhận hàng (COD)
                            </Box>
                          }
                        />
                        <FormControlLabel
                          value="bank"
                          control={<Radio />}
                          label={
                            <Box display="flex" alignItems="center">
                              <img
                                src="https://s3-sgn09.fptcloud.com/ict-payment-icon/payment/alepay.png"
                                alt="Chuyển khoản"
                                style={{ width: 30, height: 30, marginRight: 8 }}
                              />
                              Chuyển khoản ngân hàng
                            </Box>
                          }
                        />
                        <FormControlLabel
                          value="zalopay"
                          control={<Radio />}
                          label={
                            <Box display="flex" alignItems="center">
                              <img
                                src="https://s3-sgn09.fptcloud.com/ict-payment-icon/payment/zalopay.png"
                                alt="ZaloPay"
                                style={{ width: 30, height: 30, marginRight: 8 }}
                              />
                              Thanh toán bằng ví ZaloPay
                            </Box>
                          }
                        />
                        <FormControlLabel
                          value="momo"
                          control={<Radio />}
                          label={
                            <Box display="flex" alignItems="center">
                              <img
                                src="https://s3-sgn09.fptcloud.com/ict-payment-icon/payment/momo.png"
                                alt="MOMO"
                                style={{ width: 30, height: 30, marginRight: 8 }}
                              />
                              Ví điện tử MOMO
                            </Box>
                          }
                        />
                      </RadioGroup>
                      {QR_IMAGE_MAP[paymentMethod] && (
                        <Box mt={2} textAlign="center">
                          <Typography variant="subtitle2" gutterBottom>Mã QR thanh toán</Typography>
                          <img
                            src={QR_IMAGE_MAP[paymentMethod]}
                            alt="QR Code"
                            style={{ width: 200, height: 200 }}
                          />
                        </Box>
                      )}

                    </FormControl>


                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      disabled={loadingOrder}
                      onClick={() => {
                        if (!name.trim() || !phone.trim() || !paymentMethod) {
                          toast.error("Vui lòng nhập đầy đủ họ tên, số điện thoại và chọn phương thức thanh toán!");
                          return;
                        }

                        const simplifiedItems = cartItems.map(item => ({
                          productId: item.productId,
                          quantity: item.quantity || 1,
                          name: item.name,
                          price: item.price
                        }));

                        setLoadingOrder(true);

                        handleConfirmOrder({
                          customerName: name,
                          phoneNumber: phone,
                          items: simplifiedItems,
                          total,
                          paymentMethod,
                        }).finally(() => setLoadingOrder(false));
                      }}
                    >
                      Xác nhận thông tin và hoàn tất
                    </Button>
                  </Box>


                )}

              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};


export default CartPage;
