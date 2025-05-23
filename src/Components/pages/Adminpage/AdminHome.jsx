import { Link, Route, Routes } from "react-router-dom";
import { MdWarehouse } from "react-icons/md";
import { FaUsers, FaUserCircle, FaCartArrowDown, FaHome } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { SiGoogleanalytics } from "react-icons/si";
import { IoLogOut } from "react-icons/io5";
import AdminContent from "./AdminContent";
import { AddProduct } from "./AddProduct";
import { AccountToggle } from "./AccountToggle";

export default function AdminPage() {
  return (
	 <>
    <div className="w-full h-screen font-sans bg-black flex p-2 gap-2">
     
      
        <div className="w-64 bg-[#1a1a1a] h-full p-4 hidden md:block shadow hover:shadow-blue-800 transition rounded-3xl space-y-3">
          <AccountToggle />

          <h2 className="text-xl font-bold mb-9">Admin Pane</h2>
          <br />

          <Link to="/" className="flex items-center gap-4 cursor-pointer hover:shadow hover:shadow-gray-700 transition duration-300 rounded px-2 py-1">
            <FaHome /> Dashboard
          </Link>
          <Link to="/Profile" className="flex items-center gap-4 cursor-pointer hover:shadow hover:shadow-gray-700 transition duration-300 rounded px-2 py-1">
            <FaUserCircle /> Profile
          </Link>
          <Link to="/Users" className="flex items-center gap-4 cursor-pointer hover:shadow hover:shadow-gray-700 transition duration-300 rounded px-2 py-1">
            <FaUsers /> Users
          </Link>
          <Link to="/Orders" className="flex items-center gap-4 cursor-pointer hover:shadow hover:shadow-gray-700 transition duration-300 rounded px-2 py-1">
            <FaCartArrowDown /> Orders
          </Link>
          <Link to="/AddProduct" className="flex items-center gap-4 cursor-pointer hover:shadow hover:shadow-gray-700 transition duration-300 rounded px-2 py-1">
            <AiFillProduct /> Add Product
          </Link>
          <Link to="/Analytics" className="flex items-center gap-4 cursor-pointer hover:shadow hover:shadow-gray-700 transition duration-300 rounded px-2 py-1">
            <SiGoogleanalytics /> Analytics
          </Link>
          <Link to="/logout" className="flex items-center gap-4 cursor-pointer hover:shadow hover:shadow-gray-700 transition duration-300 rounded px-2 py-1">
            <IoLogOut /> LogOut
          </Link>
        </div>

        <div className="h-full bg-gray-800 w-[calc(100vw-300px)] rounded-3xl p-4 overflow-y-auto">
          <Routes>
            <Route path="/" element={<AdminContent />} />
            <Route path="/AddProduct" element={<AddProduct />} />
            <Route path="/Orders" element={<AdminContent />} />
            <Route path="/Analytics" element={<AdminContent />} />
            <Route path="/Users" element={<AdminContent />} />
            <Route path="/Profile" element={<AdminContent />} />
            <Route path="/logout" element={<AdminContent />} />
          </Routes>
        </div>
     
    </div>
	 </>
  );
}
