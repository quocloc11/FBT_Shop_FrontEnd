import React, { useEffect, useState } from "react";
import {
  Container, Grid, Card, CardContent, Link,
  Breadcrumbs, CardMedia, Typography, FormControl, Divider,
  InputLabel, Select, MenuItem, Checkbox, ListItemText, Slider, Box, FormControlLabel,
  TextField,
  FormGroup,
  styled
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
import { Pagination as MuiPagination } from '@mui/material';


const banners = [
  "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/H1_1440x242_f002f904d9.png",
  "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/H1_1440x242_f002f904d9.png",
  "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/H1_1440x242_f002f904d9.png",
];
const ProductList = () => {
  const [filterOs, setFilterOs] = useState([]);
  const [sortBy, setSortBy] = useState("none");
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const navigate = useNavigate();
  const [selectedPrice, setSelectedPrice] = useState('all');
  const { category } = useParams();
  const selectedCategory = category;
  const [products, setProducts] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Số sản phẩm mỗi trang

  const [totalPages, setTotalPages] = useState(1);

  const [selectedBrand, setSelectedBrand] = useState('');

  const location = useLocation();
  const product = location.state;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProductAPI({
          page: currentPage,
          limit: itemsPerPage,
          category: selectedCategory // ← truyền từ URL hoặc state
        });

        setProducts(response.products);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [currentPage, selectedCategory]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };
  const handleSliderPriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const priceOptions = [
    { label: "Tất cả", value: "all" },
    { label: "Dưới 500K", value: "under_500" },
    { label: "500K - 1 triệu", value: "500_1tr" },
    { label: "Trên 1 triệu", value: "above_1tr" }
  ];
  const handlePriceChange = (event) => {
    const value = event.target.value;

    if (value === "all") {
      // Nếu chọn "Tất cả", bỏ chọn tất cả các filter khác
      setSelectedPrices([]);
      return;
    }

    setSelectedPrices((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value) // Bỏ chọn nếu đã có
        : [...prev.filter((v) => v !== "all"), value] // Thêm mới
    );
  };
  const uniqueBrands = [...new Set(products.map((product) => product.brand))];

  const filteredProducts = products
    .filter((product) => {
      const price = product.price;

      const isInSliderRange = price >= priceRange[0] && price <= priceRange[1];

      const matchesCheckbox = selectedPrices.length === 0 || selectedPrices.some((val) => {
        if (val === "under_500") return price < 500000;
        if (val === "500_1tr") return price >= 500000 && price <= 1000000;
        if (val === "above_1tr") return price > 1000000;
        return true;
      });

      const matchesBrand = !selectedBrand || selectedBrand === "" || product.brand === selectedBrand;

      return isInSliderRange && matchesCheckbox && matchesBrand;
    })
    .sort((a, b) => {
      if (sortBy === "priceAsc") return a.price - b.price;
      if (sortBy === "priceDesc") return b.price - a.price;
      return 0; // mặc định không sắp xếp
    });


  const handleClickProduct = async (product) => {
    await addViewProductAPI(product);

    const priceAfterDiscount =
      product.discountPrice && product.discountPrice < product.price
        ? product.price - product.discountPrice
        : product.price;

    navigate(`/${slugify(product?.category)}/${slugify(product?.name)}`, {
      state: {
        ...product,
        priceAfterDiscount,
      },
    });
  };
  const StyledCard = styled(Card)({
    boxShadow: "none",
    borderRadius: "10px",
    textAlign: "center",
    padding: "10px",
  });

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

              {priceOptions.map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      checked={selectedPrices.includes(option.value)}
                      onChange={handlePriceChange}
                      value={option.value}
                    />
                  }
                  label={option.label}
                />
              ))}



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
                onChange={handleSliderPriceChange}
                valueLabelDisplay="auto"
                min={0}
                max={50000000}
                step={100000}
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
                <InputLabel>Hãng Sản Xuất:</InputLabel>
                <Select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  label="Hãng Sản Xuất"
                >
                  <MenuItem value=""><em>Tất cả</em></MenuItem>
                  {uniqueBrands.map((brand, idx) => (
                    <MenuItem key={idx} value={brand}>{brand}</MenuItem>
                  ))}

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
                  Tìm thấy <strong>{filteredProducts.length}</strong> kết quả
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
              {filteredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={3} key={product.id}>
                  <StyledCard
                    onClick={() => handleClickProduct(product)}
                    sx={{
                      cursor: "pointer",
                      border: "1px solid #e0e0e0", // Thêm dòng này để có border
                      borderRadius: "8px", // Tuỳ chọn bo góc nếu muốn
                      transition: "box-shadow 0.3s ease-in-out",
                      "&:hover": {
                        boxShadow: 3,
                      },
                    }}
                  >

                    <CardMedia
                      component="img"
                      image={product.images}
                      alt={product.title}
                      sx={{
                        objectFit: "cover",
                        width: "100%",
                        borderRadius: "4px",
                        transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
                        "&:hover": {
                          transform: "scale(1.05)",
                          opacity: 0.9,
                        },
                      }}
                    />

                    <CardContent>
                      {product.discountPrice && product.discountPrice < product.price ? (
                        <>


                          {/* Giá gốc */}
                          <Typography
                            variant="body2"
                            sx={{
                              textDecoration: "line-through",
                              color: "gray",
                            }}
                          >
                            {Number(product.price).toLocaleString("vi-VN")} đ
                          </Typography>
                          {/* Giá đã giảm */}
                          <Typography
                            variant="h6"
                            sx={{
                              color: "error.main",
                              fontWeight: "bold",
                              fontSize: "1.1rem",
                              letterSpacing: "0.5px",
                            }}
                          >
                            {Number(product.price - product.discountPrice).toLocaleString("vi-VN")} đ
                          </Typography>
                          {/* Phần giảm giá (VD: -2.000.000 đ) */}
                          <Typography
                            variant="body2"
                            color="success.main"
                            sx={{ fontWeight: 500 }}
                          >
                            Giảm {Number(product.discountPrice).toLocaleString("vi-VN")} đ

                          </Typography>
                        </>
                      ) : (
                        // Nếu không giảm giá, chỉ hiển thị giá gốc
                        <Typography
                          variant="h6"
                          sx={{
                            color: "black",
                            fontWeight: "bold",
                            fontSize: "1.1rem",
                            letterSpacing: "0.5px",
                          }}
                        >
                          {Number(product.price).toLocaleString("vi-VN")} đ
                        </Typography>
                      )}

                      <Typography variant="body2" color="black" mt={1}>
                        {product.name}
                      </Typography>
                    </CardContent>

                  </StyledCard>
                </Grid>
              ))}
            </Grid>


          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <MuiPagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            color="primary"
          />
        </Box>



      </Container >
      <Footer />
    </>
  );
};

export default ProductList;
