import { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";



export function Register() {
const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		password: "",
		confirmPassword: "",
	});
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	function handleChange(e) {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	}

	function handleRegister() {
		if (formData.password !== formData.confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}

		setLoading(true);
		const payload = {
			firstName: formData.firstName,
			lastName: formData.lastName,
			email: formData.email,
			phone: formData.phone,
			password: formData.password,
		};

		axios
			.post(import.meta.env.VITE_API_URL+ "/api/user/saveUser", payload)
			.then((response) => {
				console.log("Registration successful", response.data);
				toast.success("Registration successful");
				navigate("/login");
			})
			.catch((error) => {
				console.log("Registration failed", error?.response?.data);
				toast.error(error?.response?.data?.message || "Registration failed");
			})
			.finally(() => {
				setLoading(false);
			});
	}


  return (
	
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br to-black text-white">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-slate-900 p-10 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Create Your Account</h2>
        <form className="space-y-5" onSubmit={handleRegister}>
          <input
           name="firstName"
            value={formData.firstName}
           onChange={handleChange}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none"
           type="text"
						placeholder="First Name"
          />
           <input
           name="lastName"
						value={formData.lastName}
						onChange={handleChange}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none"
            type="text"
						placeholder="Last Name"
          />
          <input
            name="email"
						value={formData.email}
						onChange={handleChange}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none"
            type="email"
						placeholder="Email"
          />
          <input
           name="password"
						value={formData.password}
						onChange={handleChange}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none"
            type="password"
						placeholder="Password"
          />
          <input
           name="confirmPassword"
						value={formData.confirmPassword}
						onChange={handleChange}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none"
            type="password"
						placeholder="Confirm Password"
          />
          <button
            type="submit"
            	onClick={handleRegister}
            disabled={loading}
			      className={`w-full p-3 rounded-md ${loading ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"}`}>
            {
              loading ? "Registering..." : "Register"
            }
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-700 underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
