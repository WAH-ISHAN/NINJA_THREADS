import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminCreateProfile() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/createAdmin`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);
      setFormData({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create admin profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12
      bg-gray-800 text-white"
    >
      <div className="max-w-lg w-full bg-gray-900 bg-opacity-80 backdrop-blur-md rounded-xl shadow-xl p-8">
        <h2 className="text-3xl font-extrabold mb-8 text-center">Create Admin Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-800 bg-opacity-60 px-4 py-3 rounded text-gray-300 focus:outline-none focus:ring-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-gray-800 bg-opacity-60 px-4 py-3 rounded focus:outline-none focus:ring-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full bg-gray-800 bg-opacity-60 px-4 py-3 rounded focus:outline-none focus:ring-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full bg-gray-800 bg-opacity-60 px-4 py-3 rounded focus:outline-none focus:ring-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-gray-800 bg-opacity-60 px-4 py-3 rounded focus:outline-none focus:ring-2"
              required
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-white font-bold transition"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Admin"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
