import React, { useState } from "react";
import { FaShoppingCart, FaBars, FaUser } from "react-icons/fa";
import { Box, Button, TextField, InputAdornment, IconButton, MenuItem, Menu, Container } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Search, ShoppingCart } from "@mui/icons-material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Profiles from "../../components/Profiles/Profiles";
import { useNavigate } from "react-router-dom";
const Header = () => {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  // Hiển thị menu khi di chuột vào
  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeaveMenu = () => {
    setAnchorEl(null); // Đóng menu khi di chuột ra ngoài menu
  };

  return (
    <Box sx={{ backgroundColor: '#cb1c22 ', color: 'white', px: 8, py: 1 }}>

      <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: "pointer", mr: 4 }}
          onClick={() => navigate('/')}
        >
          <img src="https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/small/fptshop_logo_c5ac91ae46.png" alt="FPT Shop" style={{ height: '40px' }} />
        </Box>

        {/* Danh mục và thanh tìm kiếm */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, marginX: '20px', mr: 4 }}>
          <Button
            onMouseEnter={handleMouseEnter}
            variant="contained"
            sx={{
              backgroundColor: "darkred",
              color: "white",
              marginRight: "10px",
              borderRadius: "20px",
              paddingX: "16px",
              minWidth: "130px",
              minHeight: "43px",
              whiteSpace: "nowrap",
            }}
          >
            ☰ Danh mục</Button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            MenuListProps={{
              onMouseEnter: () => clearTimeout(), // Giữ menu mở khi di chuột vào
              onMouseLeave: handleMouseLeaveMenu, // Đóng menu khi di chuột ra ngoài
            }}
          >
            <MenuItem >Điện thoại</MenuItem>
            <MenuItem >Laptop</MenuItem>
            <MenuItem >Điện máy</MenuItem>
            <MenuItem >Phụ kiện</MenuItem>
            <hr />
            <MenuItem >Chuyên trang Apple</MenuItem>
            <MenuItem >Chuyên trang Samsung</MenuItem>
            <MenuItem >Chuyên trang Xiaomi</MenuItem>
          </Menu>


          <TextField
            fullWidth
            placeholder="Nhập tên điện thoại, máy tính, phụ kiện... cần tìm"
            variant="outlined"
            sx={{ backgroundColor: 'white', mr: 4, width: '600px', height: '43px', justifyContent: 'center', borderRadius: '50px', '& fieldset': { border: 'none' } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Tài khoản và giỏ hàng */}
        <Box sx={{ display: 'flex', alignItems: 'center', minHeight: 43 }}>
          <IconButton sx={{ color: 'white', }}>

            <Profiles />
          </IconButton>
          <Button
            onClick={() => navigate(`/gio-hang`)}
            variant="contained"
            sx={{
              cursor: "pointer",
              transition: "0.3s",
              '&:hover': { transform: "scale(1.05)" },
              minHeight: '43px',
              backgroundColor: 'black',
              color: 'white',
              marginLeft: '10px',
              borderRadius: '30px'
            }}
          >
            <ShoppingCart sx={{ marginRight: '5px' }} /> Giỏ hàng
          </Button>
        </Box>
      </Box>

      <div className="pl-80" style={{ marginLeft: "25px" }}>
        <ul className="text-truncate flex w-full items-center gap-x-3 overflow-auto scrollbar-none">
          <li>
            <a href="#"></a>
            <span className="text-link whitespace-nowrap text-white b2-regular">iphone 16</span>
          </li>
          <li>
            <a href="#"></a>
            <span className="text-link whitespace-nowrap text-white b2-regular">Laptop</span>
          </li>
          <li>
            <a href="#"></a>
            <span className="text-link whitespace-nowrap text-white b2-regular">Apple watch</span>
          </li>
          <li>
            <a href="#"></a>
            <span className="text-link whitespace-nowrap text-white b2-regular">Samsung</span>
          </li>
          <li>
            <a href="#"></a>
            <span className="text-link whitespace-nowrap text-white b2-regular">Carseat</span>
          </li>
          <li>
            <a href="#"></a>
            <span className="text-link whitespace-nowrap text-white b2-regular">Robot hút bụi</span>
          </li>
          <li>
            <a href="#"></a>
            <span className="text-link whitespace-nowrap text-white b2-regular">Quạt điều hòa</span>
          </li>
        </ul>
      </div>

    </Box>
  );

};

export default Header;
