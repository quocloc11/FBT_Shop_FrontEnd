import { useEffect, useState } from "react";
import { updatedProductAPI } from "../../../../apis"; // Đảm bảo API này đã được import đúng
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditProduct = ({ setShowEditModal, products, setProducts, showEditModal, currentProduct, setCurrentProduct }) => {
  const [imagePreview, setImagePreview] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    discountPrice: 0,
    description: "",
    video: "",
    promotion: "",
    specs: "",
    quantity: 0,
    brand: "",
    images: []
  });


  useEffect(() => {
    if (currentProduct) {
      setNewProduct({
        ...currentProduct,
        images: []
      });

      if (Array.isArray(currentProduct.images)) {
        setImagePreview(currentProduct.images);
      } else {
        setImagePreview([]);
      }
    }
  }, [currentProduct, showEditModal]);


  const handleUpdateProduct = async (product) => {
    try {
      const { _id, images, ...productData } = product;

      const formData = new FormData();

      // Append non-image fields
      Object.entries(productData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Chỉ append ảnh mới nếu có
      if (images.length > 0) {
        images.forEach((file) => {
          formData.append("images", file);
        });
      }

      const updatedProduct = await updatedProductAPI(_id, formData);

      const updatedProducts = products.map(p =>
        p._id === _id ? updatedProduct : p
      );

      setProducts(updatedProducts);
      setShowEditModal(false);
      setCurrentProduct(null);
      toast.success("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update the product. Please try again.");
    }
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "price" || name === "discountPrice" || name === "stock" || name === "quantity") {
      const numericValue = value === "" ? 0 : parseFloat(value);
      setNewProduct((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setNewProduct((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewProduct((prev) => ({ ...prev, images: files }));

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreview(previews);
  };

  return (
    showEditModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-[50rem] max-h-[90vh] overflow-auto">
          <h3 className="text-xl font-semibold text-gray-100 mb-4">Edit Product</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateProduct(newProduct);
            }}
            className="space-y-4"
          >
            {/* Form nhập dữ liệu */}
            <div className="grid grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="text-sm text-gray-300">Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full p-2 mt-1 bg-gray-700 text-gray-300 rounded-lg border border-gray-600"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-sm text-gray-300">Category</label>


                <select
                  className="w-full p-2 mt-1 bg-gray-700 text-gray-300 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  value={newProduct.category || ""}

                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  required
                >
                  <option value="">-- Chọn danh mục --</option>
                  <option value="dien-thoai">Điện Thoại</option>
                  <option value="laptop">Laptop</option>
                  <option value="tu-lanh">Tủ Lạnh</option>
                  <option value="phu-kien">Phụ Kiện</option>
                  <option value="may-lanh">Máy Lạnh - Điều Hòa</option>
                  <option value="sim-fpt">Sim FPT</option>
                  <option value="quat-dieu-hoa">Quạt Điều Hòa</option>
                </select>

              </div>

              {/* Price */}
              <div>
                <label className="text-sm text-gray-300">Price</label>
                <input
                  type="number"
                  name="price"
                  className="w-full p-2 mt-1 bg-gray-700 text-gray-300 rounded-lg border border-gray-600"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="text-sm text-gray-300">Price</label>
                <input
                  type="number"
                  name="discountPrice"
                  className="w-full p-2 mt-1 bg-gray-700 text-gray-300 rounded-lg border border-gray-600"
                  value={newProduct.discountPrice}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {/* Stock */}
              <div>
                <label className="text-sm text-gray-300">Stock</label>
                <input
                  type="number"
                  name="stock"
                  className="w-full p-2 mt-1 bg-gray-700 text-gray-300 rounded-lg border border-gray-600"
                  value={newProduct.stock}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Video */}
              <div>
                <label className="text-sm text-gray-300">Video</label>
                <input
                  type="text"
                  name="video"
                  className="w-full p-2 mt-1 bg-gray-700 text-gray-300 rounded-lg border border-gray-600"
                  value={newProduct.video}
                  onChange={handleInputChange}
                />
              </div>
              {/* brand */}
              <div>
                <label className="text-sm text-gray-300">brand</label>
                <input
                  type="text"
                  name="video"
                  className="w-full p-2 mt-1 bg-gray-700 text-gray-300 rounded-lg border border-gray-600"
                  value={newProduct.brand}
                  onChange={handleInputChange}
                />
              </div>

              {/* Promotion */}
              <div>
                <label className="text-sm text-gray-300">Promotion</label>
                <input
                  type="text"
                  name="promotion"
                  className="w-full p-2 mt-1 bg-gray-700 text-gray-300 rounded-lg border border-gray-600"
                  value={newProduct.promotion}
                  onChange={handleInputChange}
                />
              </div>

              {/* Specs */}
              <div>
                <label className="text-sm text-gray-300">Specs</label>
                <input
                  type="text"
                  name="specs"
                  className="w-full p-2 mt-1 bg-gray-700 text-gray-300 rounded-lg border border-gray-600"
                  value={newProduct.specs}
                  onChange={handleInputChange}
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="text-sm text-gray-300">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  className="w-full p-2 mt-1 bg-gray-700 text-gray-300 rounded-lg border border-gray-600"
                  value={newProduct.quantity}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="text-sm text-gray-300">Images</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 mt-1 bg-gray-700 text-gray-300 rounded-lg border border-gray-600"
                />
                <div className="flex gap-2 mt-2 flex-wrap">
                  {Array.isArray(imagePreview) &&
                    imagePreview.map((src, idx) => (
                      <img
                        key={idx}
                        src={src}
                        alt={`preview-${idx}`}
                        className="w-24 h-24 object-cover rounded-lg border"
                      />
                    ))}
                </div>
              </div>

            </div>

            {/* Description */}
            <div>
              <label className="text-sm text-gray-300">Description</label>
              <textarea
                name="description"
                className="w-full p-2 mt-1 bg-gray-700 text-gray-300 rounded-lg border border-gray-600 h-24"
                value={newProduct.description}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="text-red-400 hover:text-red-300 transition duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600 transition duration-200"
              >
                Edit Product
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default EditProduct;

