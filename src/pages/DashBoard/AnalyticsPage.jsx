import Header from '../../components/AdminDashBoard/common/Header.jsx'

import OverviewCards from '../../components/AdminDashBoard/analytics/OverviewCards.jsx'
import RevenueChart from '../../components/AdminDashBoard/analytics/RevenueChart.jsx'
import ChannelPerformance from '../../components/AdminDashBoard/analytics/ChannelPerformance.jsx'
import ProductPerformance from "../../components/AdminDashBoard/analytics/ProductPerformance";
import UserRetention from "../../components/AdminDashBoard/analytics/UserRetention.jsx";
import CustomerSegmentation from "../../components/AdminDashBoard/analytics/CustomerSegmentation";
import AIPoweredInsights from "../../components/AdminDashBoard/analytics/AIPoweredInsights";

const AnalyticsPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
			<Header title={"Analytics Dashboard"} />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				<OverviewCards />
				<RevenueChart />

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
					<ChannelPerformance />
					<ProductPerformance />
					<UserRetention />
					<CustomerSegmentation />
				</div>

				<AIPoweredInsights />
			</main>
		</div>
	);
};
export default AnalyticsPage;
