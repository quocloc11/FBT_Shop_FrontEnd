import React from "react";
import { IconButton, Button } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { useNavigate } from "react-router-dom";
import { Box } from "lucide-react";

const CartShopping = ({ cartCount }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }} onClick={() => navigate(`/gio-hang`)}>
      <IconButton sx={{ color: 'white' }}>
        {/* Thêm icon tài khoản hoặc biểu tượng khác nếu cần */}
      </IconButton>
      <Button
        variant="contained"
        sx={{
          backgroundColor: 'black',
          color: 'white',
          ml: 2,
          borderRadius: '30px',
          minHeight: '43px',
          '&:hover': {
            transform: 'scale(1.05)',
          }
        }}
      >
        <ShoppingCartIcon sx={{ mr: 1 }} />
        Giỏ hàng
        {cartCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            backgroundColor: 'red',
            color: 'white',
            borderRadius: '50%',
            padding: '5px 10px',
          }}>
            {cartCount}
          </span>
        )}
      </Button>
    </Box>
  );
};

export default CartShopping;
