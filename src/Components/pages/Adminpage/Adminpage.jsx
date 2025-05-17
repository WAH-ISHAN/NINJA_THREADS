import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { MdWarehouse } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaFileInvoice } from "react-icons/fa6";
import AdminProductsPage from "./admin/products";
import AddProductForm from "./admin/addProductForm";
import EditProductForm from "./admin/editProduct";
import AdminOrdersPage from "./admin/adminOrders";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminPage() {
	const [userValidated, setUserValidated] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			toast.error("You are not logged in");
			navigate("/login");
		} else {
			axios
				.get(import.meta.env.VITE_BACKEND_URL + "/api/user/current", {
					headers: { Authorization: "Bearer " + token },
				})
				.then((res) => {
					if (res.data.user.role === "admin") setUserValidated(true);
					else {
						toast.error("You are not an admin");
						navigate("/login");
					}
				})
				.catch(() => {
					toast.error("Something went wrong. Please login again.");
					navigate("/login");
				});
		}
	}, []);

	if (!userValidated) return <Loader />;

	return (
		<div className="flex h-screen w-full bg-black text-white">
			{/* Sidebar */}
			<div className="w-[280px] p-5 bg-[#0d1117] border-r border-gray-800 flex flex-col space-y-5">
				<h1 className="text-2xl font-bold text-white mb-5">🔧 Admin Panel</h1>
				<Link
					to="/admin/users"
					className="flex items-center gap-2 text-white hover:text-[#00BFFF] transition duration-200"
				>
					<FaUsers /> Users
				</Link>
				<Link
					to="/admin/products"
					className="flex items-center gap-2 text-white hover:text-[#00BFFF] transition duration-200"
				>
					<MdWarehouse /> Products
				</Link>
				<Link
					to="/admin/orders"
					className="flex items-center gap-2 text-white hover:text-[#00BFFF] transition duration-200"
				>
					<FaFileInvoice /> Orders
				</Link>
			</div>

			{/* Content */}
			<div className="flex-1 p-5 bg-[#161b22] overflow-auto rounded-l-2xl">
				<div className="bg-[#1f2937] p-6 rounded-xl shadow-lg border border-gray-700 h-full">
					<Routes>
						<Route path="/users" element={<h1 className="text-3xl font-bold">Users</h1>} />
						<Route path="/products" element={<AdminProductsPage />} />
						<Route path="/orders" element={<AdminOrdersPage />} />
						<Route path="/addProduct" element={<AddProductForm />} />
						<Route path="/editProduct" element={<EditProductForm />} />
					</Routes>
				</div>
			</div>
		</div>
	);
}
