// import React, { useState } from "react";
// import {
//   Container,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Slider,
// } from "@mui/material";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import Header from "../../Hearder/Header";
// import { useNavigate } from "react-router-dom";

// const banners = [
//   { image: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/H1_1440x242_5258c28910.png", alt: "Máy lạnh" },
//   { image: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/H1_1440x242_f002f904d9.png", alt: "Laptop Gaming" },
//   { image: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/H1_1440x242_c7fb1dd38a.png", alt: "Laptop Gaming" },
// ];

// const products = [
//   {
//     id: 1,
//     name: "iPhone 16 Pro Max 256GB",
//     price: 30990000,
//     oldPrice: 34990000,
//     discount: "11%",
//     image: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/iphone_16_pro_max_bda3030b4b.png",
//   },
//   {
//     id: 2,
//     name: "Samsung Galaxy S24 FE 5G 128GB",
//     price: 13490000,
//     oldPrice: 16990000,
//     discount: "21%",
//     image: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/iphone_16_pro_max_bda3030b4b.png",
//   },
// ];

// export default function ProductList() {
//   const [priceRange, setPriceRange] = useState([1000000, 50000000]);
//   const [osFilter, setOsFilter] = useState("all");
//   const navigate = useNavigate();

//   return (
//     <>
//       <Header />
//       <Container>
//         <Swiper
//           modules={[Navigation, Pagination, Autoplay]}
//           spaceBetween={10}
//           slidesPerView={1}
//           navigation
//           pagination={{ clickable: true }}
//           autoplay={{ delay: 3000, disableOnInteraction: false }}
//           loop={true}
//         >
//           {banners.map((banner, index) => (
//             <SwiperSlide key={index}>
//               <Card onClick={() => navigate(`/dienthoai/detail`)} sx={{ cursor: "pointer", transition: "0.3s", '&:hover': { transform: "scale(1.05)" } }}>
//                 <CardMedia component="img" sx={{ width: "100%", height: "auto", borderRadius: 2 }} image={banner.image} alt={banner.alt} />
//               </Card>
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         <Grid container spacing={2} sx={{ mt: 3 }}>
//           <Grid item xs={12} sm={3}>
//             <FormControl fullWidth margin="normal">
//               <InputLabel>Hệ điều hành</InputLabel>
//               <Select value={osFilter} onChange={(e) => setOsFilter(e.target.value)}>
//                 <MenuItem value="all">Tất cả</MenuItem>
//                 <MenuItem value="ios">iOS</MenuItem>
//                 <MenuItem value="android">Android</MenuItem>
//               </Select>
//             </FormControl>

//             <Typography gutterBottom>Mức giá</Typography>
//             <Slider
//               value={priceRange}
//               onChange={(e, newValue) => setPriceRange(newValue)}
//               min={1000000}
//               max={50000000}
//               valueLabelDisplay="auto"
//             />
//           </Grid>

//           <Grid item xs={12} sm={9}>
//             <Grid container spacing={2}>
//               {products.map((product) => (
//                 <Grid item xs={12} sm={6} md={4} key={product.id}>
//                   <Card onClick={() => navigate(`/dienthoai/detail`)} sx={{ cursor: "pointer", transition: "0.3s", '&:hover': { transform: "scale(1.05)" } }}>
//                     <CardMedia component="img" height="140" image={product.image} alt={product.name} />
//                     <CardContent>
//                       <Typography variant="h6">{product.name}</Typography>
//                       <Typography variant="body2" color="textSecondary">
//                         <s>{product.oldPrice.toLocaleString()}đ</s> - Giảm {product.discount}
//                       </Typography>
//                       <Typography variant="h5" color="primary">
//                         {product.price.toLocaleString()}đ
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </Grid>
//         </Grid>
//       </Container>
//     </>
//   );
// }

// import React, { useState } from "react";
// import { Container, Grid, Card, CardContent, CardMedia, Typography, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, Slider, Box } from "@mui/material";
// import Header from "../../Hearder/Header";
// import { useNavigate } from "react-router-dom";
// const products = [
//   {
//     id: 1,
//     name: "iPhone 16 Pro Max",
//     price: 30990000,
//     image: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/iphone_15_pro_max_f589ed5358.png",
//     rom: ["256GB", "512GB"],
//     os: "iOS",
//   },
//   {
//     id: 2,
//     name: "Samsung Galaxy S24 FE",
//     price: 13490000,
//     image: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/iphone_15_pro_max_f589ed5358.png",
//     rom: ["128GB", "256GB"],
//     os: "Android",
//   },
//   {
//     id: 3,
//     name: "Samsung Galaxy Z Fold6",
//     price: 36690000,
//     image: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/iphone_15_pro_max_f589ed5358.png",
//     rom: ["256GB", "512GB"],
//     os: "Android",
//   },
//   {
//     id: 4,
//     name: "Samsung Galaxy Z Fold6",
//     price: 36690000,
//     image: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/iphone_15_pro_max_f589ed5358.png",
//     rom: ["256GB", "512GB"],
//     os: "Android",
//   },
//   {
//     id: 5,
//     name: "Samsung Galaxy Z Fold6",
//     price: 36690000,
//     image: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/iphone_15_pro_max_f589ed5358.png",
//     rom: ["256GB", "512GB"],
//     os: "Android",
//   },
// ];

// const ProductList = () => {
//   const [filterOs, setFilterOs] = useState([]);
//   const [sortBy, setSortBy] = useState("none");
//   const [priceRange, setPriceRange] = useState([0, 50000000]);
//   const navigate = useNavigate();
//   const handleFilterChange = (event) => {
//     setFilterOs(event.target.value);
//   };

//   const handleSortChange = (event) => {
//     setSortBy(event.target.value);
//   };

//   const handlePriceChange = (event, newValue) => {
//     setPriceRange(newValue);
//   };

//   const filteredProducts = products
//     .filter((product) => (filterOs.length === 0 ? true : filterOs.includes(product.os)))
//     .filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])
//     .sort((a, b) => {
//       if (sortBy === "priceAsc") return a.price - b.price;
//       if (sortBy === "priceDesc") return b.price - a.price;
//       return 0;
//     });

//   return (
//     <>
//       <Header />
//       <Container>
//         <Grid container spacing={2}>
//           {/* Bộ lọc bên trái */}
//           <Grid item xs={12} md={3}>
//             <Box sx={{ padding: 2, border: "1px solid #ddd", borderRadius: 2 }}>
//               <Typography variant="h6" gutterBottom>Bộ lọc tìm kiếm</Typography>

//               <FormControl fullWidth>
//                 <InputLabel>Hệ điều hành</InputLabel>
//                 <Select
//                   multiple
//                   value={filterOs}
//                   onChange={handleFilterChange}
//                   renderValue={(selected) => selected.join(", ")}
//                 >
//                   {['iOS', 'Android'].map((os) => (
//                     <MenuItem key={os} value={os}>
//                       <Checkbox checked={filterOs.indexOf(os) > -1} />
//                       <ListItemText primary={os} />
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>

//               <Typography gutterBottom mt={2}>Khoảng giá</Typography>
//               <Slider
//                 value={priceRange}
//                 onChange={handlePriceChange}
//                 valueLabelDisplay="auto"
//                 min={0}
//                 max={50000000}
//                 step={1000000}
//               />

//               <FormControl fullWidth sx={{ mt: 2 }}>
//                 <InputLabel>Sắp xếp</InputLabel>
//                 <Select value={sortBy} onChange={handleSortChange}>
//                   <MenuItem value="none">Mặc định</MenuItem>
//                   <MenuItem value="priceAsc">Giá thấp đến cao</MenuItem>
//                   <MenuItem value="priceDesc">Giá cao đến thấp</MenuItem>
//                 </Select>
//               </FormControl>
//             </Box>
//           </Grid>

//           {/* Danh sách sản phẩm bên phải */}
//           <Grid item xs={12} md={9}>
//             <Grid container spacing={2}>
//               {filteredProducts.map((product) => (
//                 <Grid item xs={12} sm={6} md={3} key={product.id}>
//                   <Card onClick={() => navigate(`/dienthoai/detail`)} sx={{ cursor: "pointer", transition: "0.3s", '&:hover': { transform: "scale(1.05)" } }}>
//                     <CardMedia component="img" height="200" image={product.image} alt={product.name} />
//                     <CardContent>
//                       <Typography variant="h6">{product.name}</Typography>
//                       <Typography variant="body1" color="primary">
//                         {product.price.toLocaleString()} đ
//                       </Typography>
//                       <Typography variant="body2">Dung lượng ROM: {product.rom.join(", ")}</Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </Grid>
//         </Grid>
//       </Container>
//     </>
//   );
// };

// export default ProductList;
import React, { useEffect, useState } from "react";
import {
  Container, Grid, Card, CardContent, Link,
  Breadcrumbs, CardMedia, Typography, FormControl, Divider,
  InputLabel, Select, MenuItem, Checkbox, ListItemText, Slider, Box, FormControlLabel
} from "@mui/material";
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
          <Link href="/" underline="hover">Trang chủ</Link>
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
          modules={[Navigation, Pagination, Autoplay]}
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
            <Box sx={{ width: 250, padding: 2, border: '1px solid #ccc' }}>
              <Typography variant="h6" gutterBottom>
                Bộ lọc tìm kiếm
              </Typography>
              <Typography variant="subtitle1">Mức giá</Typography>
              <Divider />

            </Box>
            <Box sx={{ width: 250, padding: 2, border: '1px solid #ccc' }}>

              <Typography gutterBottom mt={2}>Khoảng giá</Typography>
              <Slider
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={0}
                max={50000000}
                step={1000000}
              />

              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Sắp xếp</InputLabel>
                <Select value={sortBy} onChange={handleSortChange}>
                  <MenuItem value="none">Mặc định</MenuItem>
                  <MenuItem value="priceAsc">Giá thấp đến cao</MenuItem>
                  <MenuItem value="priceDesc">Giá cao đến thấp</MenuItem>
                </Select>
              </FormControl>

            </Box>
            <FormControl
              sx={{ width: 250, padding: 2, border: '1px solid #ccc', mb: 8 }}
              fullWidth>
              <InputLabel>Hệ điều hành</InputLabel>
              <Select
                multiple
                value={filterOs}
                onChange={handleFilterChange}
                renderValue={(selected) => selected.join(", ")}
              >
                {["iOS", "Android"].map((os) => (
                  <MenuItem key={os} value={os}>
                    <Checkbox checked={filterOs.indexOf(os) > -1} />
                    <ListItemText primary={os} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={9}>
            <Grid container spacing={2}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={3} key={product.id}>
                  {/* onClick={() => navigate(`/${slugify(category.name)}`)} */}

                  <Card
                    onClick={() => handleClickProduct(product)}
                  >
                    <CardMedia component="img" height="200" image={product.images} alt={product.name} />
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
