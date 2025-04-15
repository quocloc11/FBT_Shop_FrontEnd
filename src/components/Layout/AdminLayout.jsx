import { Outlet } from "react-router-dom";
import Sidebar from "../AdminDashBoard/common/Sidebar.jsx";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Background Gradient */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      {/* Sidebar */}
      <Sidebar />

      {/* Nội dung Admin */}
      <div className="admin-content relative z-10 flex-1 p-5 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
