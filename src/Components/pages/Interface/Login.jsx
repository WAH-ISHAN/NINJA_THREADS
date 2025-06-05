import { Link, useNavigate } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { useState } from "react";
import { Loader } from "../utils/loading";
import axios from "axios";
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()


  const loginwithGoogle = useGoogleLogin({
    onSuccess: (res) => {
      setLoading(true);
      axios
        .post(import.meta.env.VITE_API_URL + "/api/user/login", {
          accessToken: res.access_token,
        })
        .then((response) => {
          console.log("Login successful", response.data);
          toast.success("Login successful");
          localStorage.setItem("token", response.data.token);
          

          const user = response.data.user;
          if (user.usertype === "admin") {
            console.log("Navigating to admin dashboard");
            navigate("/AdminHome");
          } else {
            console.log("Navigating to home page");
            navigate('/')
          }
        })
        .catch((error) => {
          console.error("Google login failed", error);
          toast.error("Google login failed");
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    axios
      .post(import.meta.env.VITE_API_URL + "/api/user/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log("Login successful", response.data);
        toast.success("Login successful");
        localStorage.setItem("token", response.data.token);

        const user = response.data.user;
        if (user.usertype === "admin") {
          navigate("/AdminHome")
        }
         else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log("Login failed", error?.response?.data || error.message);
        toast.error(error?.response?.data?.message || "Login failed");
      })
      .finally(() => {
        setLoading(false);
      });

    console.log("Login button clicked");
  }

  return (
     
    <div
  className="flex min-h-screen items-center justify-center bg-black text-white"
  style={{ backgroundImage: "url('./login.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
>

      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-[rgba(15,23,42,0.6)] p-10 rounded-xl shadow-lg w-full max-w-md backdrop-blur-sm">

        <h2 className="text-3xl font-bold mb-6 text-center"> NINJA THREADS</h2>
        <form className="space-y-5" onSubmit={handleLogin}>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none"
            required
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none"
            required
          />
           <div className="text-right mt-1">
          <Link to="/ForgotPass" className="text-sm text-blue-500 hover:underline">
              Forgot Password?
          </Link >
  </div>
          <button
            type="submit"
            className="w-full flex relative px-6 py-2 font-semibold text-white bg-transparent border-2 border-[#DC2626] overflow-hidden cursor-pointer
            before:absolute before:inset-0 before:border-2 before:border-[#DC2626] before:rounded-md before:scale-0 before:transition-transform before:duration-300
            hover:before:scale-100 hover:bg-[#DC2626] hover:text-white z-50 p-3 rounded-md  items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>

          <button
            type="button"
            onClick={loginwithGoogle}
            className="w-full md:flex relative px-6 py-2 font-semibold text-white bg-transparent border-2 border-[#DC2626] rounded-md overflow-hidden cursor-pointer
            before:absolute before:inset-0 before:border-2 before:border-[#DC2626] before:rounded-md before:scale-0 before:transition-transform before:duration-300
            hover:before:scale-100 hover:bg-[#DC2626] hover:text-white z-50 p-3 flex items-center justify-center gap-2"
            disabled={loading}
          >
            <FcGoogle className="text-2xl" />
            {loading ? "Loading..." : "Sign in with Google"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-700 underline">
            Register
          </Link>
        </p>
      </div>
    </div>
    
  );
}
