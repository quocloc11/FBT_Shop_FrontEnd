import React, { useEffect, useState } from 'react';
import {
  Box, Button, Card, CardContent, Collapse, Divider,
  FormControl, Grid, IconButton, InputLabel, MenuItem,
  Select, TextField, Typography, Checkbox
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

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [warrantyOption, setWarrantyOption] = useState('');
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loadingOrder, setLoadingOrder] = useState(false);


  const navigate = useNavigate();
  const dispatch = useDispatch();


  // useEffect(() => {
  //   dispatch(getCartProductAPI())
  //     .then(response => {
  //       console.log('response', response);  // Kiểm tra dữ liệu trả về
  //       setCartItems(response.payload.items);
  //     })
  //     .catch(error => {
  //       console.error('Có lỗi xảy ra khi lấy dữ liệu giỏ hàng', error);
  //     });
  // }, [dispatch]);
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

  console.log('cartItems', cartItems);


  const handleQuantityChange = (index, delta) => {
    setCartItems(prev => {
      const updated = [...prev];
      updated[index].quantity = Math.max(1, (updated[index].quantity || 1) + delta);
      return updated;
    });
  };

  const handleRemoveCart = async (productId) => {
    try {
      await dispatch(deleteCartProductAPI(productId));
      const response = await dispatch(getCartProductAPI());
      console.log('response', response)
      setCartItems(response.payload.items);
    } catch (error) {
      console.error("Có lỗi khi xử lý xóa sản phẩm", error);
    }
  };




  //const total = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  const total = cartItems && Array.isArray(cartItems) && cartItems.length > 0
    ? cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    : 0;
  const handleConfirmOrder = async (order) => {
    try {
      // Bắt đầu tạo đơn hàng
      const action = await dispatch(createOrderProductAPI(order)); // Gọi API tạo đơn hàng và đợi kết quả

      if (action.type === 'orders/createOrderProductAPI/fulfilled') {
        const orderId = action.payload._id;

        // Xóa giỏ hàng
        await Promise.all(cartItems.map(item => dispatch(deleteCartProductAPI(item.productId))));
        dispatch(clearCart());

        // Fetch lại đơn hàng mới nhất từ server
        await dispatch(getOrderProductAPI()); // ✅ Thêm dòng này để cập nhật lại danh sách orders

        toast.success("Đơn hàng đặt thành công!");
        navigate(`/order-success?order_id=${orderId}`);


      } else {
        // Xử lý khi action thất bại
        toast.error("Đặt hàng thất bại!"); // Thông báo thất bại
      }
    } catch (err) {
      // Xử lý lỗi khi có lỗi xảy ra trong quá trình tạo đơn hàng hoặc xóa sản phẩm
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
                            <Typography variant="body2" color="text.secondary">
                              Giá: {item.price.toLocaleString()} đ
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
                <Box display="flex" justifyContent="space-between">
                  <Typography>Tổng tiền</Typography>
                  <Typography>{total.toLocaleString()} đ</Typography>
                </Box>

                <Typography fontWeight="bold" mt={2}>
                  Chọn gói bảo hành
                </Typography>
                <FormControl fullWidth sx={{ mt: 1 }}>
                  <Select
                    value={warrantyOption}
                    onChange={(e) => setWarrantyOption(e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="">-- Không chọn --</MenuItem>
                    <MenuItem value="full">
                      Bảo hành trọn đời +350.000 đ <s style={{ marginLeft: 8 }}>500.000 đ</s>
                    </MenuItem>
                    <MenuItem value="1year">
                      Bảo hành thêm 1 năm +150.000 đ <s style={{ marginLeft: 8 }}>300.000 đ</s>
                    </MenuItem>
                  </Select>
                </FormControl>

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

                {showInput && (
                  <Box mt={2}>
                    <TextField
                      label="Họ và tên"
                      fullWidth
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      label="Số điện thoại"
                      fullWidth
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Box>
                )}

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
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => {
                      if (!name.trim() || !phone.trim()) {
                        toast.error("Vui lòng nhập đầy đủ họ tên và số điện thoại!");
                        return;
                      }
                      const simplifiedItems = cartItems.map(item => ({
                        productId: item.productId, // hoặc item.id nếu bạn lưu bằng key đó
                        quantity: item.quantity || 1,
                      }));

                      setLoadingOrder(true); // bắt đầu loading

                      // Gọi handleConfirmOrder với đúng thông tin
                      handleConfirmOrder({
                        customerName: name,
                        phoneNumber: phone,
                        items: simplifiedItems,
                        total,
                      }).finally(() => setLoadingOrder(false)); // kết thúc loading
                    }}
                  >
                    Xác nhận thông tin và hoàn tất
                  </Button>

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
