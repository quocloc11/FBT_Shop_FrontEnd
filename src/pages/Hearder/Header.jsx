import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaBars, FaUser } from "react-icons/fa";
import { Box, Button, TextField, InputAdornment, IconButton, MenuItem, Menu, Container, Typography, Grid, ListItemIcon, ListItemText, ListItem, List, Drawer, Badge, CircularProgress, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Clear, Search, ShoppingCart } from "@mui/icons-material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Profiles from "../../components/Profiles/Profiles";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
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
  const token = useSelector(state => state.user.currentUser?.accessToken);
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
              label: mapItem.label || categoryKey,
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

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const keyword = e.target.value;
    setSearchQuery(keyword);

    if (keyword) {
      fetchSearchSuggestions(keyword);
    } else {
      setSuggestions([]);
    }
  };

  const fetchSearchSuggestions = async (keyword) => {
    setLoading(true);
    try {
      const result = await searchProductAPI(keyword);
    } catch (error) {
      console.error('Lỗi khi tìm kiếm sản phẩm:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    const updatedHistory = [searchQuery, ...searchHistory.filter(q => q !== searchQuery)].slice(0, 5);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    setSearchHistory(updatedHistory);
    navigate(`/search?keyword=${searchQuery.trim()}`);
  };
  const handleDeleteHistoryItem = (itemToDelete) => {
    console.log("Deleting: ", itemToDelete);
    const updatedHistory = searchHistory.filter(item => item !== itemToDelete);
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  const groupedProducts = filteredProducts.reduce((acc, product) => {
    const brand = product.brand || "Unknown";
    if (!acc[brand]) {
      acc[brand] = [];
    }
    acc[brand].push(product);
    return acc;
  }, {});

  const handleLoginClick = () => {
    navigate("/login");
  };
  return (
    <Box
      sx={{
        backgroundColor: '#cb1c22',
        color: 'white',
        px: { xs: 2, sm: 4, md: 6, lg: 8 },
        py: 1,
        position: 'relative',
      }}
    >

      <Box sx={{ display: { xs: 'flex', sm: 'none' }, justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        {/* Logo */}
        <Box
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <img
            src="https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/small/fptshop_logo_c5ac91ae46.png"
            alt="FPT Shop"
            style={{ height: '40px' }}
          />
        </Box>

        {/* Giỏ hàng */}
        <Box onClick={() => navigate(`/gio-hang`)}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'black',
              color: 'white',
              borderRadius: '30px',
              minHeight: '40px',
              px: 2,
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCart />
            </Badge>
          </Button>
        </Box>
      </Box>
      {/* Thanh tìm kiếm cho MOBILE */}
      <Box
        sx={{
          display: { xs: 'block', sm: 'none' },
          width: '100%',
          mt: 1,
        }}
      >
        <TextField
          autoComplete="off"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
          placeholder="Tìm sản phẩm..."
          variant="outlined"
          fullWidth
          sx={{
            backgroundColor: 'white',
            borderRadius: '50px',
            '& fieldset': { border: 'none' },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch}>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box sx={{
        display: { xs: 'none', sm: 'flex' },
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        rowGap: 1
      }}>


        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: "pointer", mr: { xs: 1, sm: 2, md: 4 } }}
          onClick={() => navigate("/")}
        >
          <img src="https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/small/fptshop_logo_c5ac91ae46.png" alt="FPT Shop" style={{ height: '40px' }} />
        </Box>

        {/* Danh mục và Tìm kiếm */}
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'center',
            flexGrow: 1,
            position: 'relative'
          }}
        >

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
                marginRight: "10px",
                whiteSpace: 'nowrap'
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
                      width: { xs: '90vw', sm: 'calc(100vw - 330px)', md: 800 },
                      minWidth: 250,

                      maxHeight: 600,
                      overflowY: "auto",
                      zIndex: 1300,
                      fontSize: '0.85rem'
                    }}
                  >
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


          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              //alignItems: 'center',
              alignItems: 'stretch',
              width: '100%',
              maxWidth: { xs: '100%', sm: '500px', md: '600px' },
              px: { xs: 1, sm: 2 },
              mx: 'auto',
            }}
          >
            {/* Thanh tìm kiếm */}

            <TextField
              autoComplete="off"
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
              placeholder="Nhập tên sản phẩm..."
              variant="outlined"
              sx={{
                backgroundColor: 'white',
                width: '100%',
                maxWidth: '600px',
                transition: 'all 0.3s ease',
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

            {showDropdown && (suggestions.length > 0 || searchHistory.length > 0) && (
              <div style={{
                position: 'absolute',
                top: '60px',
                left: 0,
                width: '100%',
                maxWidth: '600px',

                backgroundColor: 'white',
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                zIndex: 999,
              }}>
                <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
                  {suggestions.length > 0 ? (
                    suggestions.map((product, index) => {
                      const priceAfterDiscount =
                        product.discountPrice && product.discountPrice < product.price
                          ? product.price - product.discountPrice
                          : product.price;

                      return (
                        <li
                          key={index}
                          style={{
                            padding: '10px',
                            borderBottom: '1px solid #f0f0f0',
                            cursor: 'pointer',
                          }}
                          onMouseDown={() =>
                            navigate(`/${slugify(product.category)}/${slugify(product.name)}`, {
                              state: {
                                ...product,
                                priceAfterDiscount,
                              },
                            })
                          }
                        >
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img
                              src={product.images}
                              alt={product.name}
                              style={{
                                width: '40px',
                                height: '40px',
                                objectFit: 'cover',
                                marginRight: '10px',
                                borderRadius: '4px',
                              }}
                            />
                            <div>
                              <div style={{ color: '#ff0000', fontWeight: '500' }}>{product.name}</div>
                              <div style={{ color: '#ff0000', fontSize: '14px' }}>
                                {product.price.toLocaleString()} VND
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })
                  ) : (
                    searchHistory.map((item, index) => (
                      <li
                        key={index}
                        style={{
                          padding: '10px',
                          borderBottom: '1px solid #f0f0f0',
                          cursor: 'pointer',
                          color: '#555',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <span
                          onMouseDown={() => {
                            setSearchQuery(item);
                            handleSearch();
                          }}
                          style={{ flex: 1 }}
                        >
                          🔍 {item}
                        </span>
                        <IconButton
                          sx={{
                            padding: '0',
                            color: '#ff0000',
                            '&:hover': {
                              backgroundColor: 'transparent',
                            },
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteHistoryItem(item);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            )}
          </Box>
        </Box>

        {/* Giỏ hàng */}
        {token ? (
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Profiles />
          </Box>
        ) : (
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Tooltip title="Đăng nhập">
              <IconButton
                onClick={handleLoginClick}
                sx={{ color: "white", fontSize: 28, p: 1.2 }}
              >
                <AccountCircleIcon sx={{ fontSize: 45 }} />
              </IconButton>
            </Tooltip>
          </Box>
        )}

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
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCart />
            </Badge>
            <span style={{ marginLeft: 6 }}>Giỏ hàng</span>
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          justifyContent: 'center',
          mb: 1,
          px: { xs: 1, sm: 3, md: 5 },
          mx: 'auto',
          width: '100%',
        }}
      >
        <ul className="text-truncate flex w-full items-center gap-x-3 overflow-auto scrollbar-none" style={{ justifyContent: 'center' }}>
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
