import React from "react";
import { Box, Stack, Typography } from "@mui/material";

const categories = [
  { img: "https://cdn2.fptshop.com.vn/unsafe/64x0/filters:quality(100)/small/Icon_voucher_b32dd373e6.png", title: "Nhập mã giảm thêm" },
  { img: "https://cdn2.fptshop.com.vn/unsafe/64x0/filters:quality(100)/small/location_ae6d4783bf.png", title: "Điện máy giảm giá" },
  { img: "https://cdn2.fptshop.com.vn/unsafe/64x0/filters:quality(100)/small/icon_may_loc_nuoc_c36fe887af.png", title: "Lọc nước từ 3.290k" },
  { img: "https://cdn2.fptshop.com.vn/unsafe/64x0/filters:quality(100)/small/icon_sim_du_lich_ea0c022d47.png", title: "Sim du lịch" },
  { img: "https://cdn2.fptshop.com.vn/unsafe/64x0/filters:quality(100)/small/Laptop_abc55208fe.jpg", title: "Tuần lễ Laptop Dell" },
  { img: "https://cdn2.fptshop.com.vn/unsafe/64x0/filters:quality(100)/small/icon_tivi_90d89d0c97.png", title: "Tivi Nhật Bản" },
];

const CategoryMenu = () => {
  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "auto",
        whiteSpace: "nowrap",
        backgroundColor: "#fff",

        display: "grid",
        px: 8,
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          display: { xs: 'none', sm: 'flex' }
        }}
      >
        {categories.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              minWidth: 150,
              textAlign: "left",
              gap: 1,
            }}
          >
            <img
              src={item.img}
              alt={item.title}
              style={{ width: 32, height: 32, borderRadius: "50%" }}
            />
            <Typography variant="body2">{item.title}</Typography>
          </Box>
        ))}
      </Stack>

    </Box>
  );
};

export default CategoryMenu;
