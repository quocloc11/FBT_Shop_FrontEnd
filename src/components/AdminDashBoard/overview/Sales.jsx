import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  TextField,
  FormControlLabel,
  Switch
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { getProductAPI, updatedSaleProductAPI } from "../../../apis";

const Sales = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [salePrice, setSalePrice] = useState('');
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs().add(1, 'hour'));
  const [stockLimit, setStockLimit] = useState(1);
  const [isActive, setIsActive] = useState(true);
  const [showProducts, setShowProducts] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductAPI();
        setProducts(data.products);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", err);
      }
    };

    fetchProducts();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        flashSale: {
          isActive: isActive,
          saleStart: startTime.toISOString(),
          saleEnd: endTime.toISOString(),
          discountPercent: salePrice,
          quantity: stockLimit,
        },
      };

      for (const productId of selectedProducts) {
        await updatedSaleProductAPI(productId, payload);
      }
      const data = await getProductAPI();
      setProducts(data.products);
      setSelectedProducts([]);
      setSalePrice('');
      setStartTime(dayjs());
      setEndTime(dayjs().add(1, 'hour'));
      setStockLimit(1);
      setIsActive(true);
    } catch (error) {
      console.error("Lỗi khi tạo Flash Sale:", error);
      alert("Lỗi khi tạo Flash Sale");
    }
  };


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* FORM TẠO FLASH SALE */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 600,
          mx: "auto",
          mt: 4,
          p: 3,
          border: "1px solid #ccc",
          borderRadius: 2,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h5" mb={2}>
          Tạo Flash Sale
        </Typography>

        <Button
          type="button"
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          onClick={() => setShowProducts(true)}
        >
          Tạo Flash Sale
        </Button>

        {showProducts && (
          <>
            <FormControl fullWidth margin="normal">
              <InputLabel>Chọn sản phẩm</InputLabel>
              <Select
                multiple
                value={selectedProducts}
                onChange={(e) => setSelectedProducts(e.target.value)}
                input={<OutlinedInput label="Chọn sản phẩm" />}
              >
                {products?.map((product) => (
                  <MenuItem key={product._id} value={product._id}>
                    {product.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Giá sale"
              type="number"
              fullWidth
              margin="normal"
              value={salePrice}
              onChange={(e) => setSalePrice(Number(e.target.value))}

            />

            <DateTimePicker
              label="Thời gian bắt đầu"
              value={startTime}
              onChange={(newValue) => setStartTime(newValue)}
              renderInput={(params) => (
                <TextField fullWidth margin="normal" {...params} />
              )}
            />

            <DateTimePicker
              label="Thời gian kết thúc"
              value={endTime}
              onChange={(newValue) => setEndTime(newValue)}
              renderInput={(params) => (
                <TextField fullWidth margin="normal" {...params} />
              )}
            />

            <TextField
              label="Số lượng giới hạn"
              type="number"
              fullWidth
              margin="normal"
              value={stockLimit}
              onChange={(e) => setStockLimit(Number(e.target.value))}
              inputProps={{ min: 1 }}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
              }
              label="Kích hoạt Flash Sale"
              sx={{ mt: 2 }}
            />

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
              Tạo Flash Sale
            </Button>
          </>
        )}
      </Box>

      {/* DANH SÁCH FLASH SALE */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h6" mb={2}>
          Danh sách sản phẩm đang Flash Sale
        </Typography>
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Ảnh
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Tên sản phẩm
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Giá
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Số lượng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Bắt đầu
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Kết thúc
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {products.filter((p) => p.flashSale?.isActive).length > 0 ? (
              products
                .filter((p) => p.flashSale?.isActive)
                .map((product) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4">
                      <img
                        src={product.images}
                        alt={product.name}
                        style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 8 }}
                      />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">{product.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {product.price.toLocaleString()} VND
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {product.flashSale?.quantity}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {new Date(product.flashSale?.saleStart).toLocaleString("vi-VN")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {new Date(product.flashSale?.saleEnd).toLocaleString("vi-VN")}
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-400">
                  Không có sản phẩm đang chạy Flash Sale
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Box>

    </LocalizationProvider>
  );
};

export default Sales;
