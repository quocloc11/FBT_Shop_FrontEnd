import { Routes, Route, Link, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from "./pages/404/NotFound";
import Auth from "./pages/Auth/Auth";
import Settings from "./pages/Settings/Settings";
import { useSelector } from "react-redux";
import ProductList from "./pages/Body/ProductList/ProductList";
import DetailProduct from "./pages/Body/DetailProduct/DetailProduct";
import CartPage from "./pages/CartPage/CartPage";

import OverviewPage from "./pages/DashBoard/OverviewPage";
import ProductsPage from "./pages/DashBoard/ProductsPage";
import UsersPage from "./pages/DashBoard/UsersPage";
import SalesPage from "./pages/DashBoard/SalesPage";
import OrdersPage from "./pages/DashBoard/OrdersPage";
import AnalyticsPage from "./pages/DashBoard/AnalyticsPage";
import SettingsPage from "./pages/DashBoard/SettingsPage";
import AdminLayout from "./components/Layout/AdminLayout.jsx";
// import Sidebar from "./components/AdminDashBoard/common/Sidebar.jsx";

export const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const token = useSelector(state => state.user.token);
  // console.log('token', token)
  return (

    <div>
      <div >

        <Routes>
          <Route index element={<HomePage />}></Route>
          <Route path="/create" element={<CreatePage />}></Route>
          <Route path="/edit/:id" element={<EditPage />}></Route>
          <Route path='/login' element={<Auth />} />
          <Route path='/register' element={< Auth />} />
          <Route path='/settings/account' element={<Settings />} />
          <Route path="/:category" element={<ProductList />} />
          <Route path="/gio-hang" element={<CartPage />} />
          {/* onClick={() => navigate(`/${slugify(category.name)}`)} */}
          <Route path='/:category/:slug' element={<DetailProduct />} />
          <Route path='/gio-hang' element={<CartPage />} />


          <Route path='/settings/security' element={<Settings />} />


          {/* <Sidebar /> */}
          {/* Admin */}
          <Route path="/dashboard" element={<AdminLayout />}>
            <Route index element={<OverviewPage />} />
            <Route path='/dashboard/products' element={<ProductsPage />} />
            <Route path='/dashboard/users' element={<UsersPage />} />
            <Route path='/dashboard/sales' element={<SalesPage />} />
            <Route path='/dashboard/orders' element={<OrdersPage />} />
            <Route path='/dashboard/analytics' element={<AnalyticsPage />} />
            <Route path='/dashboard/settings' element={<SettingsPage />} />
          </Route>

          <Route path="/" element={token ? <HomePage /> : <Navigate to="/login" />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      <ToastContainer />

    </div>
  );
}

export default App;