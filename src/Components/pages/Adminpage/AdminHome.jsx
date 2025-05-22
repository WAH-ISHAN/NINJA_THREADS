import { Link, Route, Routes} from "react-router-dom";
import { MdWarehouse } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaFileInvoice } from "react-icons/fa6";
import AdminContent from "./AdminContent"
import { FaHome } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { FaCartArrowDown } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { SiGoogleanalytics } from "react-icons/si";
import { IoLogOut } from "react-icons/io5";
import Login from "../Interface/Login"
import { AccountToggle } from "./AccountToggle";
import { FaUserCircle } from "react-icons/fa";
import { AddProduct } from "./AddProduct";



export default function AdminPage() {

	return (
		<div className="w-full h-screen font-sans bg-black flex p-2 gap-2">
				<>
        <div className="w-64 bg-[#1a1a1a] h-screen p-4 hidden md:block shadow hover:shadow-blue-800 transition rounded-3xl space-y-3 ">
            
            <AccountToggle/>
            
            <h2  className="text-xl font-bold mb-9 ">Admin Pane</h2>
            <br />
              <Link onClick={<AdminContent />} className="flex items-center gap-4 cursor-pointer hover:shadow hover:shadow-gray-700 transition duration-300 rounded px-2 py-1">
	              <FaHome /> Dashboard
              </Link>
              <Link className="flex items-center gap-4 cursor-pointer hover:shadow hover:shadow-gray-700 transition duration-300 rounded px-2 py-1">
              	<FaUserCircle /> Profile
              </Link>
              <Link className="flex items-center gap-4 cursor-pointer hover:shadow hover:shadow-gray-700 transition duration-300 rounded px-2 py-1">
              	<FaUsers /> Users
              </Link>
              <Link className="flex items-center gap-4 cursor-pointer hover:shadow hover:shadow-gray-700 transition duration-300 rounded px-2 py-1">
              	<FaCartArrowDown /> Orders
              </Link>
              <Link to={'/AddProduct'} className="flex items-center gap-4 cursor-pointer hover:shadow hover:shadow-gray-700 transition duration-300 rounded px-2 py-1">
              	<AiFillProduct /> Add Product
              </Link>
              <Link className="flex items-center gap-4 cursor-pointer hover:shadow hover:shadow-gray-700 transition duration-300 rounded px-2 py-1">
              	<SiGoogleanalytics /> Analyties
              </Link>
              <Link className="flex items-center gap-4 cursor-pointer hover:shadow hover:shadow-gray-700 transition duration-300 rounded px-2 py-1">
              	<IoLogOut /> LogOut
              </Link>

					</div>
					<div className="h-full bg-white w-[calc(100vw-300px)] rounded-3xl">
            
						<Routes path="/*">
							
							<Route path="/AddProduct" element={<AddProduct />}/>
							<Route path="/orders" element={<AdminContent />}/>
							<Route path="/Analyties" element={<AdminContent />}/>
							<Route path="/Users" element={<AdminContent />}/>
              <Route path="/Profile" element={<AdminContent />}/>

						</Routes>
					</div>
				</>
			  
		
			
		</div>
	);
}
