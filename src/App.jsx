import { Routes, Route, Link, Navigate } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";

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
import OrderSuccess from "./pages/PageOrder/OrderSuccess.jsx";
import SearchPage from "./pages/SearchPage/SearchPage.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import Unauthorized from "./pages/PrivateRoute/Unauthorized.jsx";


export const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const token = useSelector(state => state.user.currentUser?.accessToken);
  return (

    <div >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route index element={<HomePage />}></Route>
        <Route path="/create" element={<CreatePage />}></Route>
        <Route path="/edit/:id" element={<EditPage />}></Route>
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={< Auth />} />
        <Route path='/settings/account' element={<Settings />} />
        <Route path="/:category" element={<ProductList />} />
        <Route path="/gio-hang" element={<CartPage />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/search" element={<SearchPage />} />

        <Route path='/:category/:slug' element={<DetailProduct />} />
        <Route path='/gio-hang' element={<CartPage />} />


        <Route path='/settings/security' element={<Settings />} />


        {/* Admin */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <AdminLayout />
            </PrivateRoute>
          }
        >

          <Route index element={<OverviewPage />} />
          <Route path='/dashboard/products' element={<ProductsPage />} />
          <Route path='/dashboard/users' element={<UsersPage />} />
          <Route path='/dashboard/sales' element={<SalesPage />} />
          <Route path='/dashboard/orders' element={<OrdersPage />} />
          <Route path='/dashboard/analytics' element={<AnalyticsPage />} />
          <Route path='/dashboard/settings' element={<SettingsPage />} />


        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/" element={token ? <HomePage /> : <Navigate to="/login" />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>


  );
}

export default App;