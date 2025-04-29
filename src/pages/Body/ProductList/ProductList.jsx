import React, { useEffect, useState } from "react";
import {
  Container, Grid, Card, CardContent, Link,
  Breadcrumbs, CardMedia, Typography, FormControl, Divider,
  InputLabel, Select, MenuItem, Checkbox, ListItemText, Slider, Box, FormControlLabel,
  TextField,
  FormGroup
} from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import Header from "../../Hearder/Header";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import CategoryMenu from "../../CategoryMenu/CategoryMenu";
import Footer from "../../Footer/Footer";
import { addViewProductAPI, getProductAPI } from "../../../apis";
import slugify from 'slugify';

const banners = [
  "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/H1_1440x242_f002f904d9.png",
  "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/H1_1440x242_f002f904d9.png",
  "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/H1_1440x242_f002f904d9.png",
];
// const priceFilters = [

//const brands = ["Apple (iPhone)", "Samsung", "HONOR", "OPPO", "Xiaomi", "Tecno", "Realme", "Nubia - ZTE", "Nokia", "Benco", "TCL", "Masstel"];
const ProductList = () => {
  const [filterOs, setFilterOs] = useState([]);
  const [sortBy, setSortBy] = useState("none");
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const navigate = useNavigate();
  const [selectedPrice, setSelectedPrice] = useState('all');
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  const location = useLocation();
  const product = location.state;
  // Hàm chuyển category về dạng chuẩn (slug)
  const normalizeCategory = (category) => {
    return category
      .toLowerCase()
      .normalize("NFD") // tách dấu
      .replace(/[\u0300-\u036f]/g, "") // xóa dấu
      .replace(/\s+/g, "-"); // thay space bằng dấu gạch nối
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProductAPI();
        // Lọc sản phẩm theo category
        const filtered = response.filter(p => p.category === category);
        setProducts(filtered);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [category]);

  const handleChange = (value) => {
    setSelectedPrice(value);
  };
  const handleFilterChange = (event) => {
    setFilterOs(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const filteredProducts = products
    .filter((product) => (filterOs.length === 0 ? true : filterOs.includes(product.os)))
    .filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])
    .sort((a, b) => {
      if (sortBy === "priceAsc") return a.price - b.price;
      if (sortBy === "priceDesc") return b.price - a.price;
      return 0;
    });
  console.log('product', product)
  const handleClickProduct = async (product) => {
    await addViewProductAPI(product); // Gọi API trước
    navigate(`/${slugify(product?.category)}/${slugify(product?.name)}`, { state: product }); // Sau đó chuyển trang
  };
  return (
    <>
      <Header />
      <Container>
        <CategoryMenu />

        <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 2 }}>
          <Link component={RouterLink} to="/" underline="hover">Trang chủ</Link>
          {/* <Typography color="textPrimary">{products?.category}</Typography> */}
          <Link color="textPrimary">{product?.category}</Link>

        </Breadcrumbs>

        {/* Tiêu đề */}
        <Typography variant="h4" fontWeight="bold" mt={2}>
          {products[0]?.category || "Danh mục"}
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", mt: 1 }}>
          {/* {brands.map((brand) => (
            <Typography key={brand} sx={{ mr: 2, cursor: "pointer", color: "blue" }}>{brand}</Typography>
          ))} */}

          {products.map((product) => (
            <Typography key={product.id} sx={{ mr: 2, cursor: "pointer", color: "blue" }}>{product?.brand}</Typography>

          ))}

        </Box>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          //autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          style={{ width: "100%", paddingTop: "40px", paddingBottom: "40px" }}

        >
          {banners.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Banner ${index + 1}`}
                style={{ width: "100%", height: "auto", display: "block", borderRadius: '15px' }}
              />

            </SwiperSlide>
          ))}
        </Swiper>

        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Box sx={{ width: 250, padding: 2, border: '1px solid #ccc', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Bộ lọc tìm kiếm
              </Typography>

              {/* --- Mức giá --- */}
              <Typography variant="subtitle1" fontWeight="bold">
                Mức giá
              </Typography>
              <Divider sx={{ mb: 1 }} />

              <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Tất cả" />
                <FormControlLabel control={<Checkbox />} label="Dưới 2 triệu" />
                <FormControlLabel control={<Checkbox />} label="Từ 2 - 4 triệu" />
                <FormControlLabel control={<Checkbox />} label="Từ 4 - 7 triệu" />
                <FormControlLabel control={<Checkbox />} label="Từ 7 - 13 triệu" />
                <FormControlLabel control={<Checkbox />} label="Từ 13 - 20 triệu" />
                <FormControlLabel control={<Checkbox />} label="Trên 20 triệu" />
              </FormGroup>

              <Typography gutterBottom mt={2}>
                Hoặc nhập khoảng giá phù hợp với bạn:
              </Typography>
              <Box display="flex" gap={1} mb={2}>
                <TextField
                  size="small"
                  value={priceRange[0].toLocaleString("vi-VN") + "đ"}
                  inputProps={{ readOnly: true }}
                  fullWidth
                />
                <TextField
                  size="small"
                  value={priceRange[1].toLocaleString("vi-VN") + "đ"}
                  inputProps={{ readOnly: true }}
                  fullWidth
                />
              </Box>

              <Slider
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={0}
                max={50000000}
                step={1000000}
              />
            </Box>
          </Grid>


          <Grid item xs={12} md={9}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 2,
                px: 2,
                backgroundColor: '#f9fafb', // màu nền nhẹ giống ảnh
                borderRadius: 2,
              }}
            >
              {/* Lọc nhanh */}
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Hang San Xuat:</InputLabel>
                <Select
                  // value={filterValue}
                  // onChange={onFilterChange}
                  label="Lọc nhanh:"
                >
                  <MenuItem value=""><em>Tất cả</em></MenuItem>
                  <MenuItem value="apple">Apple</MenuItem>
                  <MenuItem value="samsung">Samsung</MenuItem>
                  <MenuItem value="xiaomi">Xiaomi</MenuItem>
                </Select>
              </FormControl>

            </Box>
            <Box sx={{ mb: 2 }}>
              {/* Thanh lọc và sắp xếp */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  py: 2,
                  px: 2,
                  backgroundColor: '#f9fafb',
                  borderRadius: 2,
                }}
              >

                {/* Dòng thông báo kết quả */}
                <Typography sx={{ mt: 2, ml: 1 }}>
                  Tìm thấy <strong>118</strong> kết quả
                </Typography>
                {/* Sắp xếp */}
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel>Sắp xếp theo</InputLabel>
                  <Select
                    value={sortBy}
                    onChange={handleSortChange}
                    label="Sắp xếp theo"
                  >
                    <MenuItem value="none">Mặc định</MenuItem>
                    <MenuItem value="priceAsc">Giá thấp đến cao</MenuItem>
                    <MenuItem value="priceDesc">Giá cao đến thấp</MenuItem>
                  </Select>
                </FormControl>
              </Box>


            </Box>


            <Grid container spacing={2}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={3} key={product.id}>
                  {/* onClick={() => navigate(`/${slugify(category.name)}`)} */}

                  <Card
                    onClick={() => handleClickProduct(product)}
                    sx={{
                      cursor: 'pointer', // hiện biểu tượng tay khi hover
                      transition: 'transform 0.2s ease',
                      '&:hover': {
                        transform: 'scale(1.02)', // hiệu ứng phóng nhẹ khi hover (tuỳ chọn)
                        boxShadow: 3,              // thêm bóng đổ khi hover
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={product.images}
                      alt={product.name}
                      sx={{
                        height: 200,
                        width: "100%",
                        objectFit: "cover", // hoặc "contain"
                        borderRadius: 1,
                      }}
                    />

                    <CardContent>
                      <Typography variant="h6">{product.name}</Typography>
                      <Typography variant="h6">{product.stock}</Typography>
                      <Typography variant="h6">{product.promotion}</Typography>
                      <Typography variant="body1" color="primary">
                        {product.price.toLocaleString()} đ
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}

            </Grid>
          </Grid>
        </Grid>
      </Container >
      <Footer />
    </>
  );
};

export default ProductList;
