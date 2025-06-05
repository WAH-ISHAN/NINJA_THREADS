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
    const fetchStats = async () => {
      try {
        const [usersRes, ordersRes, productsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/user`),
          axios.get("/api/orders"),
          axios.get("/api/products"),
        ]);

        const totalUsers = usersRes.data.length;
        const newOrders = ordersRes.data.filter(o => o.status === "Pending").length;
        const completedOrders = ordersRes.data.filter(o => o.status === "Completed").length;
        const totalProducts = productsRes.data.length;

        setStats({
          totalUsers,
          newOrders,
          totalProducts,
          completedOrders,
          pendingOrders: newOrders,
        });

       
        const ordersByDate = {};
        ordersRes.data.forEach(order => {
          const date = new Date(order.date).toLocaleDateString("en-GB"); 
          if (!ordersByDate[date]) {
            ordersByDate[date] = 1;
          } else {
            ordersByDate[date]++;
          }
        });

        const chartArray = Object.entries(ordersByDate).map(([date, count]) => ({
          date,
          orders: count,
        }));

        setChartData(chartArray.reverse()); 

      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="flex-1 p-6">
      <h1 className="text-3xl font-bold mb-6">🎓 Welcome, Admin!</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <StatCard label="Total Users" value={stats.totalUsers} hover="blue-500" />
        <StatCard label="New Orders" value={stats.newOrders} hover="green-500" />
        <StatCard label="Products in Inventory" value={stats.totalProducts} hover="yellow-500" />
        <StatCard label="Completed Orders" value={stats.completedOrders} hover="cyan-500" />
        <StatCard label="Pending Orders" value={stats.pendingOrders} hover="pink-500" />
      </div>

      <div className="bg-[#1a1a1a] p-6 rounded-xl shadow hover:shadow-blue-500 transition">
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


function StatCard({ label, value, hover }) {
  return (
    <div className={`bg-[#1a1a1a] p-4 rounded-xl shadow hover:shadow-${hover} transition`}>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}

export default AdminContent;
