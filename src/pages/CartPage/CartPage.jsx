import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Checkbox,
  Typography,
  Button,
  IconButton,
  Divider,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Collapse,
  TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Header from '../Hearder/Header';
import CategoryMenu from '../CategoryMenu/CategoryMenu';

const CartPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [warrantyOption, setWarrantyOption] = useState('');
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const product = {
    name: 'Xiaomi Redmi A3 4GB 128GB Xanh lá',
    color: 'Xanh lá',
    price: 2390000,
    originalPrice: 2990000,
    image: 'https://cdn.tgdd.vn/Products/Images/42/317007/xiaomi-redmi-a3-xanh-1.jpg'
  };

  const total = product.originalPrice;
  const discount = total - product.price;

  const handleConfirmOrder = () => {
    console.log("Order confirmed!");
    console.log("Name:", name);
    console.log("Phone:", phone);
  };

  return (
    <>
      <Header />
      <CategoryMenu />
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <Checkbox defaultChecked />
                  <img src={product.image} alt={product.name} width={80} />
                  <Box ml={2} flex={1}>
                    <Typography fontWeight="bold">{product.name}</Typography>
                    <Typography variant="body2">Màu: {product.color}</Typography>

                    <Box display="flex" alignItems="center" mt={1}>
                      <Typography color="error" fontWeight="bold">
                        {product.price.toLocaleString()} đ
                      </Typography>
                      <Typography variant="body2" ml={1} sx={{ textDecoration: 'line-through', color: 'gray' }}>
                        {product.originalPrice.toLocaleString()} đ
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" mt={1}>
                      <IconButton onClick={() => setQuantity(prev => Math.max(1, prev - 1))}><RemoveIcon /></IconButton>
                      <Typography>{quantity}</Typography>
                      <IconButton onClick={() => setQuantity(prev => prev + 1)}><AddIcon /></IconButton>
                      <IconButton><DeleteIcon /></IconButton>
                    </Box>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography fontWeight="bold">Chọn gói bảo hành</Typography>
                <Box mt={1}>
                  <FormControl fullWidth>
                    <Select
                      value={warrantyOption}
                      displayEmpty
                      onChange={(e) => setWarrantyOption(e.target.value)}
                    >
                      <MenuItem value="">-- Không chọn --</MenuItem>
                      <MenuItem value="full">
                        Đặc quyền bảo hành trọn đời +350.000 đ <s style={{ marginLeft: 8 }}>500.000 đ</s>
                      </MenuItem>
                      <MenuItem value="1year">
                        Đặc quyền bảo hành thêm 1 năm ĐTDD (BT) +150.000 đ <s style={{ marginLeft: 8 }}>300.000 đ</s>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </CardContent>
            </Card>
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
                <Box display="flex" justifyContent="space-between">
                  <Typography>Tổng khuyến mãi</Typography>
                  <Typography>{discount.toLocaleString()} đ</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mt={1}>
                  <Typography fontWeight="bold">Cần thanh toán</Typography>
                  <Typography color="error" fontWeight="bold">
                    {product.price.toLocaleString()} đ
                  </Typography>
                </Box>

                <Box mt={1}>
                  <Typography color="goldenrod" fontSize={14}>+597 điểm thưởng</Typography>
                </Box>

                <Box>
                  <Button size="small" onClick={() => setDetailsOpen(!detailsOpen)}>
                    Xem chi tiết
                  </Button>
                  <Collapse in={detailsOpen}>
                    <Typography variant="body2" color="text.secondary">
                      Giá trước khuyến mãi, ưu đãi gói bảo hành nếu có, v.v.
                    </Typography>
                  </Collapse>
                </Box>

                {/* Hiển thị form nhập tên và số điện thoại khi xác nhận đơn */}
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
                  onClick={() => {
                    setShowInput(true); // Hiển thị form nhập thông tin
                  }}
                >
                  Xác nhận đơn
                </Button>

                {/* Button để xác nhận thông tin và in ra console */}
                {showInput && (
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={handleConfirmOrder}
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
