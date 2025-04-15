import React, { useState } from "react";
import { FaShoppingCart, FaBars, FaUser } from "react-icons/fa";
import { Box, Button, TextField, InputAdornment, IconButton, MenuItem, Menu, Container, Typography, Grid, ListItemIcon, ListItemText, ListItem, List, Drawer } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Search, ShoppingCart } from "@mui/icons-material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Profiles from "../../components/Profiles/Profiles";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import TvIcon from "@mui/icons-material/Tv";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import ComputerIcon from "@mui/icons-material/Computer";
import ToysIcon from "@mui/icons-material/Toys";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import PrintIcon from "@mui/icons-material/Print";
import KitchenIcon from "@mui/icons-material/Kitchen";
import PowerIcon from "@mui/icons-material/Power";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
const categories = [
  { icon: <TvIcon />, label: "Tivi, Tủ lạnh, Máy lạnh - Điều hòa" },
  { icon: <LocalLaundryServiceIcon />, label: "Máy giặt, Máy sấy, Tủ sấy" },
  { icon: <ComputerIcon />, label: "PC, Màn hình, Đồng hồ, Máy tính bảng" },
  { icon: <ToysIcon />, label: "Quạt, Quạt điều hòa, Máy lọc nước" },
  { icon: <CleaningServicesIcon />, label: "Robot hút bụi, Máy hút bụi" },
  { icon: <PrintIcon />, label: "Máy in, Phần mềm, Linh kiện" },
  { icon: <KitchenIcon />, label: "Ấm siêu tốc, Nồi cơm điện" },
  { icon: <PowerIcon />, label: "Điện gia dụng, Máy ép" },
  { icon: <RestaurantIcon />, label: "Thiết bị bếp, Nồi, Chảo" },
  { icon: <LocalFireDepartmentIcon />, label: "Hút ẩm, Máy sưởi" },
  { icon: <FavoriteIcon />, label: "Chăm sóc sức khỏe" },
  { icon: <CameraAltIcon />, label: "Camera, Thiết bị mạng" },
];

const phoneBrands = {
  Apple: ["iPhone 16 Series", "iPhone 15 Series", "iPhone 14 Series"],
  Samsung: ["Galaxy A", "Galaxy S", "Galaxy Z", "Galaxy M"],
  Xiaomi: ["Poco Series", "Redmi Note", "Redmi Series"],
  OPPO: ["Reno Series", "A Series", "Find Series"],
  Khác: ["Realme", "Vivo", "Nokia", "Itel"],
};


const Header = () => {

  const [open, setOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setOpen(true);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);

    setOpen(false);

  };

  const navigate = useNavigate();
  // Hiển thị menu khi di chuột vào


  return (
    <Box sx={{ backgroundColor: '#cb1c22', color: 'white', px: 8, py: 1, position: 'relative' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: "pointer", mr: 4 }}
          onClick={() => navigate("/")}
        >
          <img src="https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/small/fptshop_logo_c5ac91ae46.png" alt="FPT Shop" style={{ height: '40px' }} />
        </Box>

        {/* Danh mục và Tìm kiếm */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, position: 'relative' }}>
          <Box
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{ position: 'relative' }}
          >
            <Button
              variant="contained"
              startIcon={<MenuIcon />}
              sx={{
                backgroundColor: "darkred",
                color: "white",
                borderRadius: "20px",
                paddingX: "16px",
                minHeight: "43px",
                marginRight: "10px"
              }}
            >
              Danh mục
            </Button>

            {open && (
              <Box
                sx={{
                  position: "absolute",
                  top: 50,
                  left: 0,
                  display: "flex",
                  zIndex: 1300,
                }}

              >
                {/* Menu Danh mục */}
                <Box
                  sx={{
                    background: "white",
                    color: "black",
                    width: 300,
                    boxShadow: 3,
                    p: 1,
                  }}
                >
                  <List>
                    {categories.map((item, index) => (
                      <ListItem button key={index}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label} />
                      </ListItem>
                    ))}
                  </List>
                </Box>

                {/* Gợi ý cho bạn */}
                <Box
                  sx={{
                    background: "#fff",
                    boxShadow: 3,
                    padding: 2,
                    width: "calc(100vw - 330px)",
                    maxHeight: 600,
                    overflowY: "auto",
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    🔥 Gợi ý cho bạn
                  </Typography>
                  <Grid container spacing={2}>
                    {Object.entries(phoneBrands).map(([brand, series], idx) => (
                      <Grid item xs={6} sm={4} md={3} key={idx}>
                        <Typography fontWeight="bold" sx={{ mb: 1 }}>
                          {brand}
                        </Typography>
                        {series.map((item, i) => (
                          <Typography key={i} sx={{ fontSize: "0.9rem" }}>
                            {item}
                          </Typography>
                        ))}
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Box>
            )}
          </Box>

          {/* Thanh tìm kiếm */}
          <TextField
            fullWidth
            placeholder="Nhập tên điện thoại, máy tính, phụ kiện... cần tìm"
            variant="outlined"
            sx={{
              backgroundColor: 'white',
              ml: 2,
              width: '600px',
              height: '43px',
              borderRadius: '50px',
              '& fieldset': { border: 'none' },
              justifyContent: 'center',
              alignItems: 'center'
            }}
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

        {/* Giỏ hàng */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}
          onClick={() => navigate(`/gio-hang`)}
        >
          <IconButton sx={{ color: 'white' }}>
            <Profiles />
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
            <ShoppingCart sx={{ mr: 1 }} /> Giỏ hàng

          </Button>
        </Box>
      </Box>

      {/* Dòng sản phẩm hot */}
      <Box sx={{ mb: 1, ml: "360px" }}>
        <ul className="text-truncate flex w-full items-center gap-x-3 overflow-auto scrollbar-none">
          {["iphone 16", "Laptop", "Apple watch", "Samsung", "Carseat", "Robot hút bụi", "Quạt điều hòa"].map((text, i) => (
            <li key={i}>
              <span className="text-link whitespace-nowrap text-white b2-regular">{text}</span>
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  );

};

export default Header;
