import { Routes, Route, Link, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from "./pages/404/NotFound";
import Auth from "./pages/Auth/Auth";
import Settings from "./pages/Settings/Settings";
import Profiles from "./components/Profiles/Profiles";
import { useSelector } from "react-redux";
import ProductList from "./pages/Body/ProductList/ProductList";
import DetailProduct from "./pages/Body/DetailProduct/DetailProduct";
import CartPage from "./pages/CartPage/CartPage";
import ProductsAdmin from "./components/Admin/AdminDashboard";

export const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const token = useSelector(state => state.user.token);
  console.log('token', token)
  return (

    <div>
      {/* <nav className="bg-gray-800">

        <div className="container mx-auto p-2 flex items-center justify-between">
          <Link to="/"><h2 className="text-white text-2xl font-bold">React CRUD</h2></Link>
          <Profiles className="ml-auto" />
        </div>
      </nav> */}

      <div >
        <Routes>
          <Route index element={<HomePage />}></Route>
          <Route path="/create" element={<CreatePage />}></Route>
          <Route path="/edit/:id" element={<EditPage />}></Route>
          <Route path='/login' element={<Auth />} />
          <Route path='/register' element={< Auth />} />
          <Route path='/settings/account' element={<Settings />} />
          <Route path='/dienthoai' element={<ProductList />} />
          <Route path='/dienthoai/detail' element={<DetailProduct />} />
          <Route path='/gio-hang' element={<CartPage />} />
          <Route path='/dashboard' element={<ProductsAdmin />} />

          <Route path='/settings/security' element={<Settings />} />
          <Route path="/" element={token ? <HomePage /> : <Navigate to="/login" />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      <ToastContainer />

    </div>
  );
}

export default App;