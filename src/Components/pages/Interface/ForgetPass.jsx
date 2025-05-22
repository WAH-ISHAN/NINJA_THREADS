import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import axios from "axios";

export function ForgotPass() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(import.meta.env.VITE_API_URL + "/api/user/forgot-password", {
        email,
      });
      toast.success(response.data.message || "Password reset link sent to your email");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-slate-900 p-10 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Forgot Password</h2>
        <p className="text-sm text-center mb-6 text-gray-400">
          Enter your email address to receive a password reset link.
        </p>
        <form className="space-y-5" onSubmit={handleForgotPassword}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full p-3 rounded-md bg-blue-600 hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Remember your password?{" "}
          <Link to="/login" className="text-blue-700 underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPass;
