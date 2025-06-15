import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from "recharts";

export function AdminContent() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    newOrders: 0,
    totalProducts: 0,
    completedOrders: 0,
    pendingOrders: 0,
  });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
       
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/dashboard`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = res.data;
        setStats({
          totalUsers: data.totalUsers,
          newOrders: data.newOrders,
          totalProducts: data.totalProducts,
          completedOrders: data.completedOrders,
          pendingOrders: data.pendingOrders,
        });
      
        setChartData(data.chartData);
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div className="flex-1 p-6">
      <h1 className="text-3xl font-bold mb-6">🎓 Welcome, Admin!</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <StatCard label="Total Users" value={stats.totalUsers} hoverClass="hover:shadow-blue-500" />
        <StatCard label="New Orders" value={stats.newOrders} hoverClass="hover:shadow-green-500" />
        <StatCard label="Products in Inventory" value={stats.totalProducts} hoverClass="hover:shadow-yellow-500" />
        <StatCard label="Completed Orders" value={stats.completedOrders} hoverClass="hover:shadow-cyan-500" />
        <StatCard label="Pending Orders" value={stats.pendingOrders} hoverClass="hover:shadow-pink-500" />
      </div>

      <div className="bg-[#1a1a1a] p-6 rounded-xl shadow transition hover:shadow-blue-500">
        <h2 className="text-white text-xl font-semibold mb-4">📊 Daily Orders Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="date" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Line type="monotone" dataKey="orders" stroke="#00ffcc" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function StatCard({ label, value, hoverClass }) {

  return (
    <div className={`bg-[#1a1a1a] p-4 rounded-xl shadow transition ${hoverClass}`}>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}

export default AdminContent;
