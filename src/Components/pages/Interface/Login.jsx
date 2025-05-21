import { Link } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { useState } from "react";
import { Loader } from "../utils/loading";
import axios from "axios";
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const loginwithGoogle = useGoogleLogin({
    onSuccess : (res)=>{
      setLoading(true)
      axios.post(import.meta.env.VITE_API_URL+"/api/user/google", {
        accesstoken: res.access_token
      }).then((response)=>{ console.log("Login successful", response.data);
        toast.success(response.data?.message || "Login successful");
        localStorage.setItem("token", response.data.token);

        const user = response.data?.user;
        console.log("User data:", user);
        if (user.UserType === "admin") {
          window.location.href = "/Admin";
        } else {
          window.location.href = "/";
        }
        setLoading(false)}
        
      )
    },
    
  })


  function handleLogin(e) {
    e.preventDefault();
    console.log("email:", Email);
    console.log("password:", Password);
    setLoading(true);

    axios
      .post(import.meta.env.VITE_API_URL+ "/api/user/login",{
        Email: Email,
        password: Password,
      })
       .then((response) => {
        console.log("Login successful", response.data);
        toast.success(response.data?.message || "Login successful");
        localStorage.setItem("token", response.data.token);

        const user = response.data?.user;
        console.log("User data:", user);
        if (user.UserType === "admin") {
          window.location.href = "/Admin";
        } else {
          window.location.href = "/";
        }
        setLoading(false)
      })
      .catch((error) => {
        console.log("Login failed", error);
        toast.error(error.response?.data?.message || "Login failed");
        setLoading(false)
      });

    console.log("Login button clicked");
  }

  return (
    
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-slate-900 p-10 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign In to DEVOXS</h2>
        <form className="space-y-5" onSubmit={handleLogin}>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-md"
          >
            {loading ? " loading ... " : "Login"}
          </button>

          <button
    type="submit"
    onClick={loginwithGoogle}
    
    className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-md flex items-center justify-center gap-2"
  >
    <FcGoogle className="text-2xl" />
     {loading ? " loading ... " : "Sign in with Google"}
    
  </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-700 underline">
            Register
          </Link>
          <Link>
          
          </Link>
        </p>
      </div>
    </div>
  );
}
