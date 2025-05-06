import { motion } from "framer-motion";
import { Edit, Search, Trash2, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { createProductAPI, deleteAProductAPI, getProductAPI } from "../../../apis";
import EditProduct from "./EditProduct/EditProduct";
import Modal from 'react-modal';  // import thư viện modal (hoặc sử dụng modal của bạn)
// import { getProductAPI } from "../../redux/product/productSlice";
import { useDispatch } from "react-redux";

const ProductsTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false); // Trạng thái modal
	const [productToDelete, setProductToDelete] = useState(null);  // Sản phẩm đang được xóa
	const [currentProduct, setCurrentProduct] = useState(null);
	const [newProduct, setNewProduct] = useState({
		name: "",
		category: "",
		price: 0,
		stock: 0,
		description: "",
		video: "",
		promotion: "",
		specs: "",
		quantity: 0,
		images: "",
		brand: "",
		//	flashSale: false
	});

	// Gọi API để lấy danh sách sản phẩm	
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				//const resoponse=dispatch(getProductAPI())
				const response = await getProductAPI(); // 🟢 Đổi URL thành API của bạn
				setProducts(response.products); // Cập nhật state với dữ liệu từ API
				setFilteredProducts(response.products);
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};

		fetchProducts();
	}, []);

	// Xử lý tìm kiếm sản phẩm
	useEffect(() => {
		const filtered = products.filter((product) =>
			product.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredProducts(filtered);
	}, [searchTerm, products]);

	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		setFilteredProducts(
			products.filter(
				(product) =>
					product.name.toLowerCase().includes(term) ||
					product.category.toLowerCase().includes(term)
			)
		);
	};

	const handleCreateProduct = async () => {
		try {
			const formData = new FormData();

			// Thêm các trường văn bản
			for (const key in newProduct) {
				if (key !== "images") {
					formData.append(key, newProduct[key]);
				}
			}

			// Thêm các file ảnh
			if (newProduct.images && newProduct.images.length > 0) {
				Array.from(newProduct.images).forEach((file) => {
					formData.append("images", file);
				});
			}

			// Gửi FormData đến API
			const response = await createProductAPI(formData); // Đảm bảo hàm này sử dụng axios và không stringify dữ liệu

			// Kiểm tra nếu API trả về dữ liệu thành công
			if (response && response.data) {
				const updatedProducts = [...products, response.data];
				setProducts(updatedProducts);
				setFilteredProducts(updatedProducts);

				console.log("Modal status before closing:", showCreateModal);
				setShowCreateModal(false);

				// Reset form
				setNewProduct({
					name: "",
					category: "",
					price: 0,
					stock: 0,
					description: "",
					video: "",
					promotion: "",
					specs: "",
					quantity: 0,
					brand: "",
					images: [],
					//	flashSale: false
				});
			} else {
				console.error("API response invalid:", response);
			}
		} catch (error) {
			console.error("Error creating product:", error);
		}
	};


	const handleCancelDelete = () => {
		setShowDeleteModal(false);  // Đóng modal nếu không xóa
		setProductToDelete(null);  // Reset sản phẩm cần xóa
	};
	const handleEditProduct = (product) => {
		setCurrentProduct(product);
		setShowEditModal(true);
	};


	const handleDeleteClick = (id) => {
		// Hiển thị modal xác nhận xóa
		setProductToDelete(id);
		setShowDeleteModal(true);
	};

	const handleDeleteProduct = async () => {
		try {
			// Gọi API xóa sản phẩm
			const deletedProduct = await deleteAProductAPI(productToDelete);

			// Kiểm tra nếu sản phẩm xóa thành công, cập nhật lại danh sách sản phẩm
			const updatedProducts = products.filter(p => p._id !== productToDelete);
			setProducts(updatedProducts);
			setFilteredProducts(updatedProducts);

			// Đóng modal sau khi xóa thành công
			setShowDeleteModal(false);
			setProductToDelete(null);  // Reset sản phẩm cần xóa

			console.log('Product deleted successfully:', deletedProduct);
		} catch (error) {
			console.error("Error deleting product:", error);
		}
	};


	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setCurrentProduct({
			...currentProduct,
			[name]: name === "price" || name === "stock" || name === "quantity" || name === "promotion" ? parseFloat(value) : value
		});
	};

	console.log('newProduct', newProduct)
	return (

		<motion.div
			className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-xl font-semibold text-gray-100">Product List</h2>
				<div className="flex items-center gap-2">
					<button
						onClick={() => setShowCreateModal(true)}
						className="text-green-400 hover:text-green-300 flex items-center gap-1"
					>
						<PlusCircle size={18} />
						<span>Create Product</span>
					</button>
					<div className="relative">
						<input
							type="text"
							placeholder="Search products..."
							className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							onChange={handleSearch}
							value={searchTerm}
						/>
						<Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
					</div>
				</div>
			</div>

			{/* Product Table */}
			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-700">
					<thead>
						<tr>
							{["Name", "Category", "Price", "Stock", "quantity", "Actions"].map((header) => (
								<th
									key={header}
									className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
								>
									{header}
								</th>
							))}
						</tr>
					</thead>

					<tbody className="divide-y divide-gray-700">
						{filteredProducts.map((product) => (
							<motion.tr
								key={product.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center">
									<img
										src={product.images}
										alt="Product img"
										className="w-10 h-10 rounded-full"
									/>
									{product.name}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.category}</td>
								{/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.quantity}</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.promotion}</td>  */}
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
									{product.price.toFixed(2)} đ
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.stock}</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.quantity}</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
									<button
										onClick={() => handleEditProduct(product)}
										className="text-indigo-400 hover:text-indigo-300 mr-2"
									>
										<Edit size={20} />
									</button>
									<button
										onClick={() => handleDeleteClick(product._id)}

										className="text-red-400 hover:text-red-300"
									>
										<Trash2 size={20} />
									</button>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>
			{/* Modal xác nhận xóa */}
			{showDeleteModal && productToDelete && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-gray-800 p-6 rounded-xl shadow-lg w-[30rem] max-h-[50vh] overflow-auto">
						<h3 className="text-xl font-semibold text-gray-100 mb-4">Delete Product</h3>
						<p className="text-gray-300">Are you sure you want to delete the product "{productToDelete.name}"?</p>
						<div className="flex justify-end gap-2 mt-4 pb-4">
							<button onClick={handleCancelDelete} className="text-red-400 hover:text-red-300 transition duration-200">
								Cancel
							</button>
							<button
								onClick={handleDeleteProduct}
								className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600 transition duration-200"
							>
								Confirm Delete
							</button>
						</div>
					</div>
				</div>
			)}
			{/* Modal for Creating a Product */}
			{showCreateModal && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-gray-800 p-6 rounded-xl shadow-lg w-[50rem] max-h-[90vh] overflow-auto">
						<h3 className="text-xl font-semibold text-gray-100 mb-4">Create New Product</h3>

						<form
							onSubmit={(e) => {
								e.preventDefault();
								handleCreateProduct();
							}}
							className="space-y-4"
						>
							<div className="grid grid-cols-2 gap-4">

								{["name", "category", "price", "stock", "video", "promotion", "specs", "quantity", "brand"].map((field) => (
									<div key={field}>
										<label className="text-sm text-gray-300 capitalize">{field}</label>

										{field === "category" ? (
											<select
												className="w-full p-2 mt-1 bg-gray-700 text-gray-300 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
												value={newProduct[field] || ""}
												onChange={(e) => setNewProduct({ ...newProduct, [field]: e.target.value })}
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
										) : (
											<input
												type={["price", "stock", "quantity"].includes(field) ? "number" : "text"}
												className="w-full p-2 mt-1 bg-gray-700 text-gray-300 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
												value={newProduct[field] || ""}
												onChange={(e) => setNewProduct({ ...newProduct, [field]: e.target.value })}
												required
											/>
										)}
									</div>
								))}

								{/* images field */}
								<div className="col-span-2">
									<label className="text-sm text-gray-300 capitalize">Images</label>
									<input
										type="file"
										accept="image/*"
										multiple
										className="w-full p-2 mt-1 bg-gray-700 text-gray-300 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
										onChange={(e) => {
											const files = Array.from(e.target.files);
											setNewProduct({ ...newProduct, images: files });
										}}
										required
									/>
								</div>
							</div>
							{/* <div>
								<label className="text-sm text-gray-300 capitalize">flashSale</label>
								<select
									className="w-full p-2 mt-1 bg-gray-700 text-gray-300 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
									value={newProduct.flashSale}
									onChange={(e) => setNewProduct({ ...newProduct, flashSale: e.target.value === 'true' })}
									required
								>
									<option value="false">Không</option>
									<option value="true">Có</option>
								</select>
							</div> */}

							{/* Image preview */}
							{newProduct.images && newProduct.images.length > 0 && (
								<div className="mt-4">
									<h4 className="text-sm text-gray-300">Image Preview</h4>
									<div className="flex gap-4">
										{newProduct.images.map((image, index) => (
											<div key={index} className="w-24 h-24">
												<img
													src={URL.createObjectURL(image)} // Generate object URL for each image
													alt={`Preview ${index}`}
													className="w-full h-full object-cover rounded-lg"
												/>
											</div>
										))}
									</div>
								</div>
							)}

							{/* Description */}
							<div>
								<label className="text-sm text-gray-300 capitalize">Description</label>
								<textarea
									className="w-full p-2 mt-1 bg-gray-700 text-gray-300 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 h-24"
									value={newProduct.description || ""}
									onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
									required
								></textarea>
							</div>

							{/* Buttons */}
							<div className="flex justify-end gap-2 mt-4 pb-4">
								<button
									type="button"
									onClick={() => setShowCreateModal(false)}
									className="text-red-400 hover:text-red-300 transition duration-200"
								>
									Cancel
								</button>
								<button
									type="submit"
									className="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600 transition duration-200"
								>
									Create Product
								</button>
							</div>
						</form>
					</div>
				</div>
			)}



			{/* Modal for Editing a Product */}

			<EditProduct
				setShowEditModal={setShowEditModal}
				showEditModal={showEditModal}
				currentProduct={currentProduct}
				setCurrentProduct={setCurrentProduct}
				//handleUpdateProduct={handleUpdateProduct}
				setProducts={setProducts}
				setFilteredProducts={setFilteredProducts}
				products={products}
			/>

		</motion.div>
	);
};

export default ProductsTable;