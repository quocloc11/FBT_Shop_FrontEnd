import { useState, useEffect } from 'react';
import { motion } from "framer-motion";

import Header from '../../components/AdminDashBoard/common/Header.jsx';
import StatCard from "../../components/AdminDashBoard/common/StatCard.jsx";

import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";
import CategoryDistributionChart from "../../components/AdminDashBoard/overview/CategoryDistributionChart.jsx";
import SalesTrendChart from "../../components/AdminDashBoard/products/SalesTrendChart.jsx";
import ProductsTable from "../../components/AdminDashBoard/products/ProductsTable.jsx";
import { getProductAPI } from '../../apis/index.js';

const ProductsPage = () => {
	const [totalProducts, setTotalProducts] = useState(0); // State cho Total Products
	const [topSelling, setTopSelling] = useState(0); // State cho Top Selling
	const [lowStock, setLowStock] = useState(0); // State cho Low Stock
	const [totalRevenue, setTotalRevenue] = useState("$0"); // State cho Total Revenue

	// Hàm gọi API để lấy thông tin thống kê
	const fetchStatistics = async () => {
		try {
			const response = await getProductAPI()
			const { totalItems, products } = response;


			const total = products.reduce((sum, product) => sum + (product.price || 0), 0);
			const formattedRevenue = `$${total.toLocaleString()}`;

			setTotalProducts(totalItems); // ✅ Tổng số sản phẩm từ API

			setTotalRevenue(formattedRevenue);

			const topSellingCount = products
				.filter(p => typeof p.sold === 'number') // đảm bảo có trường sold
				.sort((a, b) => b.sold - a.sold)
				.slice(0, 3)
				.reduce((sum, p) => sum + p.sold, 0); // tính tổng sold của top 3

			setTopSelling(topSellingCount);

			const lowStockCount = products.filter(p => p.quantity !== undefined && p.quantity < 10).length;
			setLowStock(lowStockCount);
		} catch (error) {
			console.error("Lỗi khi lấy danh sách sản phẩm:", error);
		}
	};

	// Gọi hàm fetchStatistics khi component được mount
	useEffect(() => {
		fetchStatistics();
	}, []);

	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Products' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Products' icon={Package} value={totalProducts} color='#6366F1' />
					<StatCard name='Top Selling' icon={TrendingUp} value={topSelling} color='#10B981' />
					<StatCard name='Low Stock' icon={AlertTriangle} value={lowStock} color='#F59E0B' />
					<StatCard name='Total Revenue' icon={DollarSign} value={totalRevenue} color='#EF4444' />
				</motion.div>

				<ProductsTable />

				{/* CHARTS */}
				<div className='grid grid-col-1 lg:grid-cols-2 gap-8'>
					<SalesTrendChart />
					<CategoryDistributionChart />
				</div>
			</main>
		</div>
	);
};

export default ProductsPage;
