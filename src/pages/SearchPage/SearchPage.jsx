import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Slider,
  FormControlLabel,
  Checkbox,
  Pagination,
  Badge,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../Hearder/Header";
import CategoryMenu from "../CategoryMenu/CategoryMenu";
import Footer from "../Footer/Footer";
import { searchProductAPI } from "../../apis";
import slugify from "slugify";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../components/redux/cart/cartSlice";

const SearchPage = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const [sortBy, setSortBy] = useState("none");
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('keyword');
  const navigate = useNavigate();
  const [originalProducts, setOriginalProducts] = useState([]);
  const carts = useSelector(selectCartItems);
  const cartCount = carts?.items?.length
  useEffect(() => {
    const fetchData = async () => {

      try {

        const response = await searchProductAPI(searchQuery.trim());
        setOriginalProducts(response.products);
        setFilteredProducts(response.products);

      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [searchQuery]);




  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSliderPriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handlePriceChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedPrices((prev) => [...prev, value]);
    } else {
      setSelectedPrices((prev) => prev.filter((item) => item !== value));
    }
  };



  const priceOptions = [
    { label: "Tất cả", value: "all" },
    { label: "Dưới 500K", value: "under_500" },
    { label: "500K - 1 triệu", value: "500_1tr" },
    { label: "Trên 1 triệu", value: "above_1tr" },
  ];

  const handleClickProduct = (product) => {
    navigate(`/${slugify(product?.category)}/${slugify(product?.name)}`, { state: product });
  };
  useEffect(() => {
    const applyFiltersAndSorting = () => {
      let products = [...originalProducts];

      // Lọc theo khoảng giá
      products = products.filter(
        (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
      );

      // Lọc theo các mức giá đã chọn
      if (selectedPrices.length > 0) {
        products = products.filter((product) => {
          return selectedPrices.some((range) => {
            if (range === "under_500") return product.price < 500000;
            if (range === "500_1tr") return product.price >= 500000 && product.price <= 1000000;
            if (range === "above_1tr") return product.price > 1000000;
            return true;
          });
        });
      }

      // Sắp xếp
      if (sortBy === "priceAsc") {
        products.sort((a, b) => a.price - b.price);
      } else if (sortBy === "priceDesc") {
        products.sort((a, b) => b.price - a.price);
      }

      setFilteredProducts(products);
    };

    applyFiltersAndSorting();
  }, [originalProducts, priceRange, selectedPrices, sortBy]);

  return (
    <>

      <Header />


      <Container>
        <CategoryMenu />



        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Box sx={{ padding: 2, border: "1px solid #ccc", borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Bộ lọc tìm kiếm
              </Typography>

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
            <Box sx={{ py: 2, px: 2, backgroundColor: "#f9fafb", borderRadius: 2 }}>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Sắp xếp theo</InputLabel>
                <Select value={sortBy} onChange={handleSortChange} label="Sắp xếp theo">
                  <MenuItem value="none">Mặc định</MenuItem>
                  <MenuItem value="priceAsc">Giá thấp đến cao</MenuItem>
                  <MenuItem value="priceDesc">Giá cao đến thấp</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {/* Hiển thị số lượng sản phẩm tìm thấy */}
            <Typography variant="h6" sx={{ m: 2 }}>
              Tìm thấy  <strong>{filteredProducts.length}</strong> kết quả với từ khoá <strong>{searchQuery}</strong>
            </Typography>
            <Grid container spacing={2}>
              {filteredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={3} key={product.id}>
                  <Card
                    onClick={() => handleClickProduct(product)}
                    sx={{
                      cursor: "pointer",
                      transition: "transform 0.2s ease",
                      "&:hover": {
                        transform: "scale(1.02)",
                        boxShadow: 3,
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
                        objectFit: "cover",
                        borderRadius: 1,
                      }}
                    />
                    <CardContent>
                      <Typography variant="h6">{product.name}</Typography>
                      <Typography variant="body1" color="primary">
                        {product.price.toLocaleString()} đ
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(event, value) => setCurrentPage(value)}
                color="primary"
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default SearchPage;
