
import AdminContent from "./AdminContent"
import { FaHome } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { FaCartArrowDown } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { SiGoogleanalytics } from "react-icons/si";
import { IoLogOut } from "react-icons/io5";
import Login from "../Interface/Login"
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { AccountToggle } from "./AccountToggle";
import { FaUserCircle } from "react-icons/fa";




export function AdminHome(){
 const navigate = useNavigate();

 const handleLogout = () => {
    navigate("/login");
  };


  return (
    <div className="bg-black text-white min-h-screen font-sans">
        
      <header className="flex justify-between items-center p-4 border-b border-gray-800">
     
      </header>

         
        <div className="flex ">
            
          <div className="w-64 bg-[#1a1a1a] h-screen p-6 hidden md:block  shadow hover:shadow-blue-500 transition">
            
             <div>
            <AccountToggle />
          </div>
          <br />
            <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
            
            
            <ul className="space-y-4">
              
                <Link onClick={<AdminContent />}className="flex items-center gap-2  cursor-pointer hover:shadow hover:shadow-gray-700 transition duration-300 rounded px-2 py-1">
                <FaHome /> Dashboard
              </Link>
              
              
              <Link  className="flex items-center gap-2  cursor-pointer hover:shadow hover:shadow-gray-700 transition duration-300 rounded px-2 py-1">
                <FaUserCircle />Profile
              </Link>


              <Link className="flex items-center gap-2  cursor-pointer hover:shadow hover:shadow-gray-700 transition duration-300 rounded px-2 py-1">
                <FaUsers /> Users
              </Link>


              <Link className="flex items-center gap-2  cursor-pointer hover:shadow hover:shadow-gray-700 transition duration-300 rounded px-2 py-1">
                <FaCartArrowDown /> Orders
              </Link>


              <Link  className="flex items-center gap-2  cursor-pointer hover:shadow hover:shadow-gray-700 transition duration-300 rounded px-2 py-1">
                <AiFillProduct /> Add Product
              </Link>


              <Link className="flex items-center gap-2  cursor-pointer hover:shadow hover:shadow-gray-700 transition duration-300 rounded px-2 py-1">
                <SiGoogleanalytics /> Analyties
              </Link>

             
              <Link className="flex items-center gap-2  cursor-pointer hover:shadow hover:shadow-gray-700 transition duration-300 rounded px-2 py-1">
                <IoIosSettings />Settings
              </Link>


              <Link onClick={handleLogout} className="flex items-center gap-2  cursor-pointer hover:shadow hover:shadow-gray-700 transition duration-300 rounded px-2 py-1">
                <IoLogOut />LogOut
              </Link>


            </ul>
          </div>
          <div className="h-full bg-gray w-[calc(100vw-300px)] rounded-lg">
            <AdminContent />
            <Routes path="/*" >
              <Route path="/users" element="" />
							<Route path="/products" element=''/>
							<Route path="/orders" element="" />
							<Route path="/addProduct" element="" />
							<Route path="/editProduct" element="" />
            </Routes>
           
          </div>
         
         
        </div>
      
    </div>
  );
};

export default AdminHome
