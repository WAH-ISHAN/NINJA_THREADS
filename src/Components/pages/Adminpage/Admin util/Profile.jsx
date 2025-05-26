
import { useState, useEffect } from "react";
import axios from "axios";

export default function Profile() {
  const [userData, setUserData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  const [formData, setFormData] = useState(userData);

  useEffect(() => {
    axios.get("/api/user")
      .then(res => {
        setUserData(res.data);
        setFormData(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put("/api/user", formData)
    .then(() => alert("Updated Successfully"))
    .catch(err => console.error(err));
    alert("Profile updated: " + JSON.stringify(formData));
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-6">Admin Profile</h2>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md max-w-lg space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Email (read-only)</label>
          <input
            type="email"
            value={formData.email}
            readOnly
            className="w-full bg-gray-700 px-4 py-2 rounded text-gray-300 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full bg-gray-700 px-4 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full bg-gray-700 px-4 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-gray-700 px-4 py-2 rounded"
            required
          />
        </div>
        <div className="text-right">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-semibold">
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
}
