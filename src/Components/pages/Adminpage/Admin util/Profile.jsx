import React, { useEffect, useState } from "react";

const API_BASE = "http://localhost:5000/api/user";

export default function Profile() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const getToken = () => localStorage.getItem("token");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(`${API_BASE}/profile`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await res.json();

        setFormData({
          email: data.user.email,
          firstName: data.user.firstName || "",
          lastName: data.user.lastName || "",
          phone: data.user.phone || "",
          password: "",
        });
        setLoading(false);
      } catch (err) {
        setError(err.message || "Error loading profile");
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    const updatePayload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
    };
    if (formData.password.trim() !== "") {
      updatePayload.password = formData.password;
    }

    try {
      const res = await fetch(`${API_BASE}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(updatePayload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to update profile");
      }

      setSuccessMsg("Profile updated successfully");
      setFormData((prev) => ({ ...prev, password: "" }));
    } catch (err) {
      setError(err.message || "Error updating profile");
    }
  }

  if (loading) {
    return <div className="p-6 text-white">Loading...</div>;
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12
        bg-gray-800 to-pink-900
        text-white"
    >
      <div className="max-w-lg w-full bg-gray-900 bg-opacity-80 backdrop-blur-md rounded-xl shadow-xl p-8">
        <h2 className="text-3xl font-extrabold mb-8 text-center">My Profile</h2>
        {error && <div className="bg-red-700 p-3 mb-6 rounded">{error}</div>}
        {successMsg && (
          <div className="bg-green-700 p-3 mb-6 rounded">{successMsg}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Email (read-only)</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="w-full bg-gray-800 bg-opacity-60 px-4 py-3 rounded text-gray-300 cursor-not-allowed focus:outline-none focus:ring-2"
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
              className="w-full bg-gray-800 bg-opacity-60 px-4 py-3 rounded focus:outline-none focus:ring-2 "
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Password (leave empty if unchanged)
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-gray-800 bg-opacity-60 px-4 py-3 rounded focus:outline-none focus:ring-2 "
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-gray-800 bg-opacity-60 px-4 py-3 rounded focus:outline-none focus:ring-2 "
              required
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-white font-bold transition"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
