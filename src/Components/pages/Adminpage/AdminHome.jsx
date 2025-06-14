import { Link, Route, Routes } from "react-router-dom";
import { GrView } from "react-icons/gr";
import { FaUsers, FaUserCircle, FaCartArrowDown, FaHome } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { IoLogOut } from "react-icons/io5";
import { AdminContent } from "./AdminContent";
import AddProduct from "./AddProduct";
import  EditProduct  from "./Admin util/FeatureProduct";
import  AdminOrder from "./AdminOrder";
import { AdminUsers } from "./AdminUsers";
import Profile from "./Admin util/Profile";
import { HomePage } from "../Interface/HomePage";
import { AccountToggle } from "./AccountToggle";
import AdminCreateProfile from "./Admin util/AdminCreate";

export default function AdminPage() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="w-full h-screen font-sans flex p-2 gap-2">
      <div className="w-64 bg-[#1a1a1a] h-full p-4 hidden md:block shadow hover:shadow-blue-800 transition rounded-3xl space-y-3">
        <AccountToggle />
        <h2 className="text-xl font-bold mb-9 text-white">Admin Panel</h2>

        <Link to="AdminContent" className="flex items-center gap-4 text-white hover:shadow hover:shadow-gray-700 transition duration-300 rounded px-2 py-1">
          <FaHome /> Dashboard
        </Link>
        <Link to="Profile" className="flex items-center gap-4 text-white hover:shadow hover:shadow-gray-700 transition duration-300 rounded px-2 py-1">
          <FaUserCircle /> Profile
        </Link>
        <Link to="AdminCreateProfile" className="flex items-center gap-4 text-white hover:shadow hover:shadow-gray-700 transition duration-300 rounded px-2 py-1">
          <FaUsers /> Create Admin
        </Link>
        <Link to="Users" className="flex items-center gap-4 text-white hover:shadow hover:shadow-gray-700 transition duration-300 rounded px-2 py-1">
          <FaUsers /> Users
        </Link>
        <Link to="Orders" className="flex items-center gap-4 text-white hover:shadow hover:shadow-gray-700 transition duration-300 rounded px-2 py-1">
          <FaCartArrowDown /> Orders
        </Link>
        <Link to="AddProduct" className="flex items-center gap-4 text-white hover:shadow hover:shadow-gray-700 transition duration-300 rounded px-2 py-1">
          <AiFillProduct /> Add Product
        </Link>
        <Link to="EditProduct" className="flex items-center gap-4 text-white hover:shadow hover:shadow-gray-700 transition duration-300 rounded px-2 py-1">
          <AiFillProduct /> Edit Product
        </Link>
        <Link to="pageoverview" className="flex items-center gap-4 text-white hover:shadow hover:shadow-gray-700 transition duration-300 rounded px-2 py-1">
          <GrView /> Page Overview
        </Link>
        <Link onClick={handleLogout} className="flex items-center gap-4 text-white hover:shadow hover:shadow-gray-700 transition duration-300 rounded px-2 py-1">
          <IoLogOut /> LogOut
        </Link>
      </div>
      <div className="h-full bg-gray-800 w-full md:w-[calc(100vw-300px)] rounded-3xl p-4 overflow-y-auto text-white">
        <Routes>
          <Route path="AdminContent" element={<AdminContent />} />
          <Route path="AddProduct" element={<AddProduct />} />
          <Route path="EditProduct" element={<EditProduct/>} />
          <Route path="Orders" element={<AdminOrder />} />
          <Route path="Users" element={<AdminUsers />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="AdminCreateProfile" element={<AdminCreateProfile />} />
          <Route path="pageoverview" element={<HomePage />} />
          <Route path="logout" element={<h1>Logging Out...</h1>} />
        </Routes>
      </div>
    </div>
  );
}
