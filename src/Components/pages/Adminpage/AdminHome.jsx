
import AdminContent from "./AdminContent"
import { FaHome } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { FaCartArrowDown } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { SiGoogleanalytics } from "react-icons/si";
import { IoLogOut } from "react-icons/io5";
import Login from "../Interface/Login"
import { useNavigate } from "react-router-dom";
import { AccountToggle } from "./AccountToggle";
import { FaUserCircle } from "react-icons/fa";




export function AdminHome(){
 const navigate = useNavigate();

 const handleLogout = () => {
    navigate("/login");
  };

  const handleProfil = () => {
    navigate("");
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans">
        
      <header className="flex justify-between items-center p-4 border-b border-gray-800">
     
      </header>

         
        <section className="flex ">
            
          <aside className="w-64 bg-[#1a1a1a] h-screen p-6 hidden md:block  shadow hover:shadow-blue-500 transition">
            
             <div>
            <AccountToggle />
          </div>
          <br />
            <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
            
            
            <ul className="space-y-4">
              
                <li className="flex items-center gap-2  cursor-pointer hover:shadow hover:shadow-gray-700 transition duration-300 rounded px-2 py-1">
                <FaHome /> Dashboard
              </li>
              
              
              <li onClick={handleProfil} className="flex items-center gap-2  cursor-pointer hover:shadow hover:shadow-gray-700 transition duration-300 rounded px-2 py-1">
                <FaUserCircle />Profile
              </li>


              <li className="flex items-center gap-2  cursor-pointer hover:shadow hover:shadow-gray-700 transition duration-300 rounded px-2 py-1">
                <FaUsers /> Users
              </li>


              <li className="flex items-center gap-2  cursor-pointer hover:shadow hover:shadow-gray-700 transition duration-300 rounded px-2 py-1">
                <FaCartArrowDown /> Orders
              </li>


              <li className="flex items-center gap-2  cursor-pointer hover:shadow hover:shadow-gray-700 transition duration-300 rounded px-2 py-1">
                <AiFillProduct /> Add Product
              </li>


              <li className="flex items-center gap-2  cursor-pointer hover:shadow hover:shadow-gray-700 transition duration-300 rounded px-2 py-1">
                <SiGoogleanalytics /> Analyties
              </li>

             
              <li className="flex items-center gap-2  cursor-pointer hover:shadow hover:shadow-gray-700 transition duration-300 rounded px-2 py-1">
                <IoIosSettings />Settings
              </li>


              <li onClick={handleLogout} className="flex items-center gap-2  cursor-pointer hover:shadow hover:shadow-gray-700 transition duration-300 rounded px-2 py-1">
                <IoLogOut />LogOut
              </li>


            </ul>
          </aside>

          <AdminContent />
         
        </section>
      
    </div>
  );
};

export default AdminHome
