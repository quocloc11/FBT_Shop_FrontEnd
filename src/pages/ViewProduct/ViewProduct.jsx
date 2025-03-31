import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

export default function ViewedProducts() {
  const navigate = useNavigate();
  const products = [
    {
      name: "iPhone 16 Pro Max 256GB",
      price: "30.990.000 đ",
      oldPrice: "34.990.000 đ",
      discount: "-11%",
      discountAmount: "Giảm 4.000.000 đ",
      stock: "Còn 01 ngày 14:13:44",
      image: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/iphone_16_pro_max_bda3030b4b.png",
      variants: ["256 GB", "512 GB", "1 TB"],
      features: ["Màn hình cực lớn 6.9 inch", "Chip A18 Pro cực mạnh", "Nút Camera Control mới"],
    },
    {
      name: "iPhone 16 Pro Max 256GB",
      price: "30.990.000 đ",
      oldPrice: "34.990.000 đ",
      discount: "-11%",
      discountAmount: "Giảm 4.000.000 đ",
      stock: "Còn 01 ngày 14:13:44",
      image: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/iphone_16_pro_max_bda3030b4b.png",
      variants: ["256 GB", "512 GB", "1 TB"],
      features: ["Màn hình cực lớn 6.9 inch", "Chip A18 Pro cực mạnh", "Nút Camera Control mới"],
    },
    {
      name: "iPhone 16 Pro Max 256GB",
      price: "30.990.000 đ",
      oldPrice: "34.990.000 đ",
      discount: "-11%",
      discountAmount: "Giảm 4.000.000 đ",
      stock: "Còn 01 ngày 14:13:44",
      image: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/iphone_16_pro_max_bda3030b4b.png",
      variants: ["256 GB", "512 GB", "1 TB"],
      features: ["Màn hình cực lớn 6.9 inch", "Chip A18 Pro cực mạnh", "Nút Camera Control mới"],
    },
    {
      name: "iPhone 16 Pro Max 256GB",
      price: "30.990.000 đ",
      oldPrice: "34.990.000 đ",
      discount: "-11%",
      discountAmount: "Giảm 4.000.000 đ",
      stock: "Còn 01 ngày 14:13:44",
      image: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/iphone_16_pro_max_bda3030b4b.png",
      variants: ["256 GB", "512 GB", "1 TB"],
      features: ["Màn hình cực lớn 6.9 inch", "Chip A18 Pro cực mạnh", "Nút Camera Control mới"],
    },
    {
      name: "Samsung Smart TV 55 inch 4K",
      price: "15.390.000 đ",
      oldPrice: "",
      discount: "",
      discountAmount: "",
      stock: "",
      image: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/samsung_ua55du8000kxxv_1_fa55f69408.png",
      features: ["Điều khiển bằng giọng nói", "Bộ xử lý Crystal 4K", "Motion Xcelerator"],
    },
    {
      name: "Samsung Smart TV 55 inch 4K",
      price: "15.390.000 đ",
      oldPrice: "",
      discount: "",
      discountAmount: "",
      stock: "",
      image: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/samsung_ua55du8000kxxv_1_fa55f69408.png",
      features: ["Điều khiển bằng giọng nói", "Bộ xử lý Crystal 4K", "Motion Xcelerator"],
    },
    {
      name: "Samsung Smart TV 55 inch 4K",
      price: "15.390.000 đ",
      oldPrice: "",
      discount: "",
      discountAmount: "",
      stock: "",
      image: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/samsung_ua55du8000kxxv_1_fa55f69408.png",
      features: ["Điều khiển bằng giọng nói", "Bộ xử lý Crystal 4K", "Motion Xcelerator"],
    },
    {
      name: "Samsung Smart TV 55 inch 4K",
      price: "15.390.000 đ",
      oldPrice: "",
      discount: "",
      discountAmount: "",
      stock: "",
      image: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/samsung_ua55du8000kxxv_1_fa55f69408.png",
      features: ["Điều khiển bằng giọng nói", "Bộ xử lý Crystal 4K", "Motion Xcelerator"],
    },
    {
      name: "Samsung Smart TV 55 inch 4K",
      price: "15.390.000 đ",
      oldPrice: "",
      discount: "",
      discountAmount: "",
      stock: "",
      image: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/samsung_ua55du8000kxxv_1_fa55f69408.png",
      features: ["Điều khiển bằng giọng nói", "Bộ xử lý Crystal 4K", "Motion Xcelerator"],
    },
  ];

  return (
    <div className="px-16">
      <h2 className="text-xl font-bold mb-3">Sản phẩm đã xem</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white p-4 rounded-xl shadow-md"
              onClick={() => {
                navigate(`/dienthoai/detail`);
              }}
            >
              <img src={product.image} alt={product.name} className="w-full h-40 object-contain" />
              <div className="mt-3">
                <p className="text-lg font-semibold">{product.name}</p>
                {product.oldPrice && (
                  <p className="text-gray-500 line-through text-sm">{product.oldPrice}</p>
                )}
                <p className="text-red-500 text-lg font-bold">{product.price} <span className="text-sm">{product.discount}</span></p>
                {product.discountAmount && (
                  <p className="text-green-500 text-sm">{product.discountAmount}</p>
                )}
                {product.stock && (
                  <p className="text-gray-400 text-xs">{product.stock}</p>
                )}
                <ul className="mt-2 text-sm text-gray-600">
                  {product.features.map((feature, i) => (
                    <li key={i}>✅ {feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
