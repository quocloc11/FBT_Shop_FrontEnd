import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { addViewProductAPI, viewProductAPI } from '../../apis';
import { useEffect, useState } from 'react';
import slugify from 'slugify';

export default function ViewedProducts() {
  const [products, setProducts] = useState(null);
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.user.currentUser);

  // const handleViewProduct = async (product) => {
  //   // Kiểm tra nếu product là undefined hoặc null
  //   if (!product || !product._id) {
  //     console.log("Product or product._id is undefined");

  //   }


  //   try {
  //     await addViewProductAPI(product); // Nếu product hợp lệ
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        //const resoponse=dispatch(getProductAPI())
        const response = await viewProductAPI();
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div className="px-16">
      <h2 className="text-xl font-bold mb-3">Sản phẩm đã xem</h2>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={5}
        navigation
        pagination={{ clickable: true }}

      >
        {Array.isArray(products) && products.length > 0 ? (
          products.map((item, index) => {

            const product = item?.product;
            if (!product) return null; // Nếu không có product thì bỏ qua

            return (
              <SwiperSlide key={index}>
                <div

                  className="bg-white p-4 rounded-xl shadow-md"
                  onClick={() => navigate(`/${slugify(product?.category)}/${slugify(product?.name)}`, { state: product })}
                >
                  <img
                    src={product?.images?.length > 0 ? product.images : "https://via.placeholder.com/150"}
                    alt={product?.name || "Sản phẩm"}
                    className="w-full h-40 object-contain cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:opacity-90"

                    loading="lazy"
                  />

                  <div className="mt-3">
                    <p className="text-lg font-semibold">{product?.name || "Không tên"}</p>

                    {product?.oldPrice && (
                      <p className="text-gray-500 line-through text-sm">
                        {product.oldPrice}
                      </p>
                    )}

                    <p className="text-red-500 text-lg font-bold">
                      {product?.price || "?"}{" "}
                      <span className="text-sm">{product?.discount || ""}</span>
                    </p>

                    {product?.discountAmount && (
                      <p className="text-green-500 text-sm">{product.discountAmount}</p>
                    )}

                    {product?.stock && (
                      <p className="text-gray-400 text-xs">{product.stock}</p>
                    )}

                    <ul className="mt-2 text-sm text-gray-600">
                      {Array.isArray(product?.features) &&
                        product.features.map((feature, i) => (
                          <li key={i}>✅ {feature}</li>
                        ))}
                    </ul>
                  </div>
                </div>
              </SwiperSlide>
            );
          })
        ) : (
          <p>Loading...</p>
        )}


      </Swiper>
    </div>
  );
}
