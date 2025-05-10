import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaBars, FaUser } from "react-icons/fa";
import { Box, Button, TextField, InputAdornment, IconButton, MenuItem, Menu, Container, Typography, Grid, ListItemIcon, ListItemText, ListItem, List, Drawer, Badge, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Clear, Search, ShoppingCart } from "@mui/icons-material";
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
import slugify from 'slugify';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import AcUnitIcon from '@mui/icons-material/AcUnit'; // máy lạnh
import SimCardIcon from '@mui/icons-material/SimCard';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther'; // fallback
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { useSelector } from "react-redux";
import { selectOrders } from "../../components/redux/order/orderSlice";
import { selectCartItems } from "../../components/redux/cart/cartSlice";
import { getProductAPI, searchProductAPI } from "../../apis";
import { LaptopIcon } from "lucide-react";
// const categories = [
//   { icon: <TvIcon />, label: "Tivi, Tủ lạnh, Máy lạnh - Điều hòa" },
//   { icon: <LocalLaundryServiceIcon />, label: "Máy giặt, Máy sấy, Tủ sấy" },
//   { icon: <ComputerIcon />, label: "PC, Màn hình, Đồng hồ, Máy tính bảng" },
//   { icon: <ToysIcon />, label: "Quạt, Quạt điều hòa, Máy lọc nước" },
//   { icon: <CleaningServicesIcon />, label: "Robot hút bụi, Máy hút bụi" },
//   { icon: <PrintIcon />, label: "Máy in, Phần mềm, Linh kiện" },
//   { icon: <KitchenIcon />, label: "Ấm siêu tốc, Nồi cơm điện" },
//   { icon: <PowerIcon />, label: "Điện gia dụng, Máy ép" },
//   { icon: <RestaurantIcon />, label: "Thiết bị bếp, Nồi, Chảo" },
//   { icon: <LocalFireDepartmentIcon />, label: "Hút ẩm, Máy sưởi" },
//   { icon: <FavoriteIcon />, label: "Chăm sóc sức khỏe" },
//   { icon: <CameraAltIcon />, label: "Camera, Thiết bị mạng" },
// ];



const Header = () => {
  const [categories, setCategories] = useState([]);

  const [open, setOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [products, setProducts] = useState([]);

  const carts = useSelector(selectCartItems);

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const [searchHistory, setSearchHistory] = useState(() => {
    const stored = localStorage.getItem('searchHistory');
    return stored ? JSON.parse(stored) : [];
  });
  const cartCount = carts?.length
  const handleMouseEnter = () => {
    setOpen(true);
    setIsHovering(true);
  };
  const categoryMap = {
    "dien-thoai": { label: "Điện Thoại", icon: <PhoneIphoneIcon /> },
    "laptop": { label: "Laptop", icon: <LaptopIcon /> },
    "tu-lanh": { label: "Tủ Lạnh", icon: <AcUnitIcon /> },
    "may-lanh": { label: "Máy Lạnh", icon: <AcUnitIcon /> },
    "sim-fpt": { label: "Sim FPT", icon: <SimCardIcon /> },
    "phu-kien": { label: "Phụ Kiện", icon: <HeadphonesIcon /> },
    "quat-dieu-hoa": { label: "Quạt Điều Hòa", icon: <AcUnitIcon /> }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);

    setOpen(false);

  };
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const data = await getProductAPI();
  //       setProducts(data.products); // Lưu toàn bộ sản phẩm
  //       const uniqueCategoryMap = {};

  //       data.products.forEach(product => {
  //         const category = product.category?.trim();
  //         if (category && !uniqueCategoryMap[category]) {
  //           uniqueCategoryMap[category] = {
  //             label: category,

  //           };
  //         }
  //       });

  //       setCategories(Object.values(uniqueCategoryMap)); // chỉ giữ mỗi danh mục 1 lần
  //     } catch (err) {
  //       console.error("Lỗi khi lấy danh sách sản phẩm:", err);
  //     }
  //   };

  //   fetchProducts();
  // }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductAPI();
        setProducts(data.products);

        const uniqueCategoryMap = {};

        data.products.forEach(product => {
          const categoryKey = product.category?.trim();
          if (categoryKey && !uniqueCategoryMap[categoryKey]) {
            const mapItem = categoryMap[categoryKey] || {};
            uniqueCategoryMap[categoryKey] = {
              value: categoryKey,
              label: mapItem.label || categoryKey, // fallback nếu không có trong map
              icon: mapItem.icon || <HeadphonesIcon />
            };
          }
        });

        setCategories(Object.values(uniqueCategoryMap));
      } catch (err) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", err);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => p.category === hoveredCategory);

  //const cartCount = 4;
  const navigate = useNavigate();
  // Hiển thị menu khi di chuột vào

  // Xử lý khi người dùng thay đổi ô tìm kiếm
  const handleInputChange = (e) => {
    const keyword = e.target.value;
    setSearchQuery(keyword);

    // Nếu có từ khóa, bắt đầu tìm kiếm gợi ý
    if (keyword) {
      fetchSearchSuggestions(keyword);
    } else {
      setSuggestions([]); // Nếu không có từ khóa, xóa gợi ý
    }
  };

  // Hàm tìm kiếm sản phẩm gợi ý
  const fetchSearchSuggestions = async (keyword) => {
    setLoading(true);
    try {
      const result = await searchProductAPI(keyword); // Gọi API tìm kiếm sản phẩm
      setSuggestions(result.products); // Giả sử kết quả trả về là một mảng sản phẩm gợi ý
    } catch (error) {
      console.error('Lỗi khi tìm kiếm sản phẩm:', error);
    } finally {
      setLoading(false);
    }
  };

  // Xử lý khi nhấn "Search"
  // const handleSearch = () => {
  //   navigate(`/search?keyword=${searchQuery.trim()}`);
  // };
  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    // Lưu lịch sử (tối đa 5 mục, không trùng lặp)
    const updatedHistory = [searchQuery, ...searchHistory.filter(q => q !== searchQuery)].slice(0, 5);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    setSearchHistory(updatedHistory);
    navigate(`/search?keyword=${searchQuery.trim()}`);
    // Gọi API tìm kiếm sản phẩm nếu cần
  };
  const handleDeleteHistoryItem = (itemToDelete) => {
    console.log("Deleting: ", itemToDelete);
    const updatedHistory = searchHistory.filter(item => item !== itemToDelete);
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };




  const groupedProducts = filteredProducts.reduce((acc, product) => {
    const brand = product.brand || "Unknown"; // Nếu không có thương hiệu thì cho là "Unknown"
    if (!acc[brand]) {
      acc[brand] = [];
    }
    acc[brand].push(product);
    return acc;
  }, {});
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
            sx={{ position: 'relative', display: 'flex' }}
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
                  top: 44,
                  left: 0,
                  display: "flex",
                  borderRadius: '15px',
                  overflow: 'hidden',
                  backgroundColor: '#333',
                  boxShadow: 3,
                  zIndex: 1300,
                }}
              >
                {/* Menu Danh mục */}
                <Box
                  sx={{
                    backgroundColor: "#ffffff",
                    color: "black",
                    width: 200,
                    boxShadow: 3,
                    p: 1,
                    fontSize: '0.85rem'
                  }}
                >
                  <List>
                    {categories.map((item, index) => (
                      <ListItem
                        button
                        key={index}
                        onMouseEnter={() => setHoveredCategory(item.value)}
                        sx={{ '&:hover': { backgroundColor: "#f5f5f5" } }}
                      >
                        <ListItemIcon sx={{ color: "black" }}>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.label} />
                      </ListItem>
                    ))}

                  </List>

                </Box>

                {/* Gợi ý cho bạn */}
                {hoveredCategory && (
                  <Box
                    sx={{
                      backgroundColor: "#FFFFFF",
                      color: "black",
                      boxShadow: 3,
                      padding: 2,
                      width: "calc(100vw - 330px)",
                      maxWidth: 800,
                      maxHeight: 600,
                      overflowY: "auto",
                      zIndex: 1300,
                      fontSize: '0.85rem'
                    }}
                  >


                    {/* Nhóm sản phẩm theo thương hiệu */}
                    <Grid container spacing={4}>
                      {filteredProducts.length === 0 ? (
                        <Grid item xs={12}>
                          <Typography variant="body1" sx={{ color: "#555", fontStyle: "italic", ml: 2 }}>
                            Gợi ý cho bạn
                          </Typography>
                        </Grid>
                      ) : (
                        Object.entries(groupedProducts).map(([brand, items], index) => (
                          <Grid item xs={12} sm={6} md={4} key={index}>

                            <Typography variant="subtitle1" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>
                              {brand}
                              <Box component="span" sx={{ ml: 1 }}>{'>'}</Box>
                            </Typography>
                            <Box sx={{ mt: 1 }}>
                              {items.map((product, i) => {
                                const priceAfterDiscount =
                                  product.discountPrice && product.discountPrice < product.price
                                    ? product.price - product.discountPrice
                                    : product.price;

                                return (
                                  <Typography
                                    key={i}
                                    variant="body2"
                                    sx={{ ml: 1, color: "#333", fontSize: '0.75rem ', cursor: "pointer", '&:hover': { textDecoration: 'underline' } }}
                                    onClick={() =>
                                      navigate(`/${slugify(product.category)}/${slugify(product.name)}`, {
                                        state: {
                                          ...product,
                                          priceAfterDiscount,
                                        },
                                      })
                                    }
                                  >
                                    {product.name}
                                  </Typography>
                                );
                              })}
                            </Box>
                          </Grid>
                        ))
                      )}
                    </Grid>

                  </Box>
                )}
              </Box>
            )}
          </Box>


          {/* Thanh tìm kiếm */}
          <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Thanh tìm kiếm */}

            <TextField
              autoComplete="off"
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
              onFocus={() => setShowDropdown(true)}  // Hiển thị dropdown khi focus vào ô tìm kiếm
              onBlur={() => setTimeout(() => setShowDropdown(false), 100)}  // Đảm bảo dropdown ẩn đi sau một khoảng thời gian (để không bị ẩn ngay khi click)
              placeholder="Nhập tên sản phẩm..."
              variant="outlined"
              sx={{
                backgroundColor: 'white',
                width: '600px',
                borderRadius: '50px',
                '& fieldset': { border: 'none' },
              }}
              InputProps={{
                sx: {
                  height: '43px',
                  borderRadius: '50px',
                  paddingRight: '8px',
                  paddingLeft: '16px',
                  display: 'flex',
                  alignItems: 'center',
                },
                endAdornment: (
                  <>
                    {searchQuery && (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setSearchQuery('')}>
                          <Clear />
                        </IconButton>
                      </InputAdornment>
                    )}
                    <InputAdornment position="end">
                      <IconButton onClick={handleSearch}>
                        <Search />
                      </IconButton>
                    </InputAdornment>
                  </>
                ),
              }}
            />

            {/* Hiển thị danh sách gợi ý */}
            {showDropdown && (suggestions.length > 0 || searchHistory.length > 0) && (
              <div style={{
                position: 'absolute',
                top: '60px',
                left: 0,
                width: '600px',
                backgroundColor: 'white',
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                zIndex: 999,
              }}>
                <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
                  {suggestions.length > 0 ? (
                    suggestions.map((product, index) => (
                      <li key={index} style={{ padding: '10px', borderBottom: '1px solid #f0f0f0', cursor: 'pointer' }}
                        onMouseDown={() => navigate(`/${slugify(product.category)}/${slugify(product.name)}`, { state: product })}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <img src={product.images} alt={product.name} style={{ width: '40px', height: '40px', objectFit: 'cover', marginRight: '10px' }} />
                          <div>
                            <div style={{ color: '#ff0000' }}>{product.name}</div>
                            <div style={{ color: '#ff0000' }}>{product.price} VND</div>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    searchHistory.map((item, index) => (
                      <li key={index} style={{
                        padding: '10px',
                        borderBottom: '1px solid #f0f0f0',
                        cursor: 'pointer',
                        color: '#555',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                        <span onMouseDown={() => {
                          setSearchQuery(item);
                          handleSearch();
                        }}>
                          🔍 {item}
                        </span>
                        <span
                          onClick={(e) => {
                            e.stopPropagation(); // Tránh việc click vào span cha
                            handleDeleteHistoryItem(item);
                          }}
                          style={{
                            marginLeft: '10px',
                            color: '#ff0000',  // Đặt màu đỏ để nổi bật hơn
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            fontSize: '20px', // Tăng kích thước để dễ nhìn
                          }}
                        >
                          <IconButton
                            sx={{
                              padding: '0',
                              color: '#ff0000',  // Đảm bảo màu icon là màu đỏ
                              '&:hover': {
                                backgroundColor: 'transparent', // Tạo hiệu ứng hover mượt mà
                              },
                            }}
                            onClick={(e) => {
                              e.stopPropagation(); // Tránh việc click vào span cha
                              handleDeleteHistoryItem(item);
                            }}
                          >
                            <DeleteIcon /> {/* Thay thế '×' bằng biểu tượng xóa */}
                          </IconButton>
                        </span>


                      </li>
                    ))
                  )}
                </ul>
              </div>
            )}
          </Box>



        </Box>

        {/* Giỏ hàng */}
        <IconButton sx={{ color: 'white' }}>
          <Profiles />
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center' }}
          onClick={() => navigate(`/gio-hang`)}
        >

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
            {/* <ShoppingCart sx={{ mr: 1 }} /> Giỏ hàng */}
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCart />
            </Badge>
            <span style={{ marginLeft: 6 }}>Giỏ hàng</span>
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
