import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye, Trash2 } from "lucide-react";
import { deleteOrderProductAPI, getOrderByIdProductAPI, getOrderProductAPI, statusOrderProductAPI } from "../../redux/order/orderSlice";
import { useDispatch } from "react-redux";



const OrdersTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredOrders, setFilteredOrders] = useState([]);
	const dispatch = useDispatch();
	const [selectedOrder, setSelectedOrder] = useState(null);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const resultAction = await dispatch(getOrderProductAPI());
				if (getOrderProductAPI.fulfilled.match(resultAction)) {
					setFilteredOrders(resultAction.payload); // Hoặc resultAction.payload.data tùy vào API
				} else {
					console.error("API call failed:", resultAction.error);
				}
			} catch (err) {
				console.error("Unexpected error:", err);
			}
		};

		fetchOrders();
	}, [dispatch]);

	const handleViewDetails = async (orderId) => {
		try {
			const resultAction = await dispatch(getOrderByIdProductAPI(orderId));
			if (getOrderByIdProductAPI.fulfilled.match(resultAction)) {
				setSelectedOrder(resultAction.payload); // Lưu thông tin đơn hàng
			} else {
				console.error("Lấy chi tiết đơn hàng thất bại:", resultAction.error);
			}
		} catch (err) {
			console.error("Lỗi khi lấy chi tiết đơn hàng:", err);
		}
	};

	const handleUpdateStatus = async (orderId, newStatus) => {
		try {
			const resultAction = await dispatch(statusOrderProductAPI({ id: orderId, status: newStatus }));
			if (statusOrderProductAPI.fulfilled.match(resultAction)) {
				// Cập nhật lại danh sách đơn hàng mới
				const refreshed = await dispatch(getOrderProductAPI());
				if (getOrderProductAPI.fulfilled.match(refreshed)) {
					setFilteredOrders(refreshed.payload);
				}
			} else {
				console.error("Cập nhật trạng thái thất bại:", resultAction.error);
			}
		} catch (err) {
			console.error("Lỗi khi cập nhật trạng thái:", err);
		}
	};



	const handleDeleteOrder = async (orderId) => {
		try {
			const resultAction = await dispatch(deleteOrderProductAPI(orderId));
			if (deleteOrderProductAPI.fulfilled.match(resultAction)) {
				// Cập nhật lại danh sách đơn hàng mới
				const refreshed = await dispatch(getOrderProductAPI());
				if (getOrderProductAPI.fulfilled.match(refreshed)) {
					setFilteredOrders(refreshed.payload);
				}
			} else {
				console.error("Xoá đơn hàng thất bại:", resultAction.error);
			}
		} catch (err) {
			console.error("Lỗi khi xoá đơn hàng:", err);
		}
	};


	return (
		<motion.div
			className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.4 }}
		>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-xl font-semibold text-gray-100">Order List</h2>
				<div className="relative">
					<input
						type="text"
						placeholder="Search orders..."
						className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
				</div>
			</div>

			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-700">
					<thead>
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Order ID</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Customer</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Total</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
						</tr>
					</thead>

					<tbody className="divide divide-gray-700">
						{filteredOrders.map((order) => (
							<motion.tr
								key={order._id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">{order._id}</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">{order.customerName}</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">${order.total.toFixed(2)}</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
									<select
										value={order.status}
										onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
										className="bg-white text-gray-800 text-xs px-2 py-1 rounded"
									>
										<option value="pending">Pending</option>
										<option value="confirmed">Confirmed</option>
										<option value="shipped">Shipped</option>
									</select>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{new Date(order.createdAt).toLocaleDateString()}</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
									<button className="text-indigo-400 hover:text-indigo-300 mr-2" onClick={() => handleViewDetails(order._id)}>
										<Eye size={18} />
									</button>
									<button className="text-red-400 hover:text-red-300" onClick={() => handleDeleteOrder(order._id)}>
										<Trash2 size={18} />
									</button>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>

			{selectedOrder && (
				<div className="mt-4 bg-gray-700 p-4 rounded-lg">
					<h3 className="text-lg text-gray-100">Order Details</h3>
					<div className="text-gray-300 mt-2">
						<p><strong>Order ID:</strong> {selectedOrder._id}</p>
						<p><strong>Customer Name:</strong> {selectedOrder.customerName}</p>
						<p><strong>Phone Number:</strong> {selectedOrder.phoneNumber}</p>
						<p><strong>Status:</strong> {selectedOrder.status}</p>
						<p><strong>Total:</strong> ${selectedOrder.total.toFixed(2)}</p>
						<p><strong>Created At:</strong> {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>

						<h4 className="mt-4">Items:</h4>
						<table className="min-w-full text-sm text-gray-300">
							<thead>
								<tr>
									<th className="px-4 py-2 text-left">Product Name</th>
									<th className="px-4 py-2 text-left">Quantity</th>
									<th className="px-4 py-2 text-left">Price</th>
								</tr>
							</thead>
							<tbody>
								{selectedOrder.items.map((item, index) => (
									<tr key={index}>
										<td className="px-4 py-2">{item.name}</td>
										<td className="px-4 py-2">{item.quantity}</td>
										<td className="px-4 py-2">{item.price}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}


		</motion.div>
	);
};
export default OrdersTable;
