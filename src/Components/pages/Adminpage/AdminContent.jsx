import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  FiUsers,
  FiShoppingCart,
  FiPackage,
  FiCheckCircle,
  FiClock,
  FiRefreshCw,
  FiTrendingUp,
} from "react-icons/fi";

export function AdminContent() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    newOrders: 0,
    totalProducts: 0,
    completedOrders: 0,
    pendingOrders: 0,
  });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI controls
  const [timeRange, setTimeRange] = useState(14); // 7 | 14 | 30
  const [showAvg, setShowAvg] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchDashboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${apiUrl}/api/admin/dashboard`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = res.data || {};
      setStats({
        totalUsers: data.totalUsers ?? 0,
        newOrders: data.newOrders ?? 0,
        totalProducts: data.totalProducts ?? 0,
        completedOrders: data.completedOrders ?? 0,
        pendingOrders: data.pendingOrders ?? 0,
      });
      setChartData(Array.isArray(data.chartData) ? data.chartData : []);
    } catch (err) {
      console.error("Failed to fetch dashboard stats", err);
      setError("Failed to fetch dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Derived metrics
  const openOrders = (stats.completedOrders || 0) + (stats.pendingOrders || 0);
  const fulfillmentRate =
    openOrders > 0
      ? Math.round((stats.completedOrders / openOrders) * 100)
      : 0;

  // Prepare chart data: sort by date, slice by range, calculate moving average
  const preparedChart = useMemo(() => {
    const sorted = [...chartData].sort((a, b) => {
      const ad = new Date(a?.date || 0).getTime();
      const bd = new Date(b?.date || 0).getTime();
      return ad - bd;
    });

    const sliced =
      timeRange && sorted.length > timeRange
        ? sorted.slice(sorted.length - timeRange)
        : sorted;

    // Simple moving average over 7 points (or fewer if data less than 7)
    const windowSize = Math.min(7, sliced.length);
    const withAvg = sliced.map((d, i, arr) => {
      const start = Math.max(0, i - windowSize + 1);
      const seg = arr.slice(start, i + 1);
      const avg =
        seg.reduce((sum, it) => sum + Number(it.orders || 0), 0) /
        (seg.length || 1);
      return {
        ...d,
        orders: Number(d.orders || 0),
        avg: Number(avg.toFixed(2)),
      };
    });

    return withAvg;
  }, [chartData, timeRange]);

  // Trend vs previous day (%)
  const trend = useMemo(() => {
    if (preparedChart.length < 2) return null;
    const last = preparedChart[preparedChart.length - 1]?.orders || 0;
    const prev = preparedChart[preparedChart.length - 2]?.orders || 0;
    if (prev === 0) return last > 0 ? 100 : 0;
    return Math.round(((last - prev) / prev) * 100);
  }, [preparedChart]);

  const number = (n) => Number(n || 0).toLocaleString();

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Welcome back, Admin
          </h1>
          <p className="text-gray-400 text-sm">
            Overview of platform performance and daily activity
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(Number(e.target.value))}
            className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm"
            title="Time range"
          >
            <option value={7}>Last 7 days</option>
            <option value={14}>Last 14 days</option>
            <option value={30}>Last 30 days</option>
          </select>
          <button
            onClick={fetchDashboard}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
            disabled={loading}
            title="Refresh"
          >
            <FiRefreshCw className={loading ? "animate-spin" : ""} />
            <span className="text-sm">Refresh</span>
          </button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {loading ? (
          // Skeletons
          [...Array(6)].map((_, i) => (
            <div
              key={`sk-${i}`}
              className="rounded-2xl bg-white/5 border border-white/10 p-4 animate-pulse"
            >
              <div className="h-4 w-24 bg-white/10 rounded mb-3" />
              <div className="h-7 w-32 bg-white/10 rounded" />
            </div>
          ))
        ) : (
          <>
            <StatCard
              label="Total Users"
              value={number(stats.totalUsers)}
              icon={FiUsers}
              accent="from-indigo-500 to-fuchsia-500"
            />
            <StatCard
              label="New Orders (today)"
              value={number(stats.newOrders)}
              icon={FiShoppingCart}
              accent="from-emerald-500 to-teal-500"
              chip={trend !== null ? { label: `${trend > 0 ? "+" : ""}${trend}%`, positive: trend >= 0 } : undefined}
            />
            <StatCard
              label="Products in Inventory"
              value={number(stats.totalProducts)}
              icon={FiPackage}
              accent="from-amber-500 to-yellow-500"
            />
            <StatCard
              label="Completed Orders"
              value={number(stats.completedOrders)}
              icon={FiCheckCircle}
              accent="from-green-500 to-emerald-500"
            />
            <StatCard
              label="Pending Orders"
              value={number(stats.pendingOrders)}
              icon={FiClock}
              accent="from-rose-500 to-orange-500"
            />
            <StatCard
              label="Fulfillment Rate"
              value={`${fulfillmentRate}%`}
              icon={FiTrendingUp}
              accent="from-violet-500 to-purple-500"
              progress={fulfillmentRate}
            />
          </>
        )}
      </div>

      {/* Chart card */}
      <div className="rounded-2xl bg-white/5 border border-white/10 p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <h2 className="text-lg md:text-xl font-semibold">Daily Orders Overview</h2>
          <label className="inline-flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={showAvg}
              onChange={(e) => setShowAvg(e.target.checked)}
              className="accent-white"
            />
            Show 7-day moving average
          </label>
        </div>

        {loading ? (
          <div className="h-72 rounded-xl bg-white/5 border border-white/10 animate-pulse" />
        ) : error ? (
          <div className="text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-xl p-4">
            {error}
          </div>
        ) : preparedChart.length === 0 ? (
          <div className="text-gray-300 bg-black/20 border border-white/10 rounded-xl p-6 text-center">
            No chart data available.
          </div>
        ) : (
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={preparedChart} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="date"
                  stroke="#ccc"
                  tick={{ fontSize: 12 }}
                  tickMargin={8}
                />
                <YAxis
                  stroke="#ccc"
                  tick={{ fontSize: 12 }}
                  tickMargin={8}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgba(0,0,0,0.7)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 12,
                    color: "#fff",
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="orders"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#ordersGradient)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
                {showAvg && (
                  <Line
                    type="monotone"
                    dataKey="avg"
                    stroke="#60a5fa"
                    strokeWidth={2}
                    dot={false}
                    strokeDasharray="5 5"
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, accent = "from-indigo-500 to-fuchsia-500", chip, progress }) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="text-sm text-gray-400">{label}</div>
          <div className="text-2xl font-semibold">{value}</div>
        </div>
        <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${accent} flex items-center justify-center text-white/90`}>
          <Icon />
        </div>
      </div>

      {chip && (
        <div
          className={`mt-3 inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs border ${
            chip.positive
              ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
              : "bg-rose-500/15 text-rose-300 border-rose-500/30"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              chip.positive ? "bg-emerald-400" : "bg-rose-400"
            }`}
          />
          {chip.label}
        </div>
      )}

      {typeof progress === "number" && (
        <div className="mt-3">
          <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500"
              style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
            />
          </div>
          <div className="mt-1 text-xs text-gray-400">Completion</div>
        </div>
      )}
    </div>
  );
}

export default AdminContent;