import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import {
  FiSearch,
  FiRefreshCw,
  FiChevronDown,
  FiChevronUp,
  FiTrash2,
  FiCopy,
  FiPhone,
  FiMapPin,
  FiHash,
} from "react-icons/fi";

import "react-toastify/dist/ReactToastify.css";

export default function AdminOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // UI state
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("idDesc"); // idDesc | idAsc | totalDesc | totalAsc
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [expanded, setExpanded] = useState({}); // { [orderId]: boolean }
  const [updating, setUpdating] = useState({}); // { [orderId]: boolean }
  const [deleting, setDeleting] = useState({}); // { [orderId]: boolean }
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const tokenRef = useRef(localStorage.getItem("token"));

  const apiUrl = import.meta.env.VITE_API_URL;

  const statusColors = {
    Pending: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    Processing: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    Completed: "bg-green-500/20 text-green-300 border-green-500/30",
    Cancelled: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  };

  const formatMoney = (n) =>
    typeof n === "number" ? `$${n.toFixed(2)}` : `$${Number(n || 0).toFixed(2)}`;

  // Debounce search
  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(search.trim().toLowerCase()), 300);
    return () => clearTimeout(id);
  }, [search]);

  const fetchOrders = async (opts = { showToast: false }) => {
    if (!tokenRef.current) return;
    const controller = new AbortController();
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/api/order`, {
        headers: { Authorization: `Bearer ${tokenRef.current}` },
        signal: controller.signal,
      });
      setOrders(Array.isArray(res.data) ? res.data : []);
      if (opts.showToast) toast.success("Orders refreshed");
    } catch (error) {
      if (!axios.isCancel(error)) {
        toast.error(error.response?.data?.message || "Failed to fetch orders");
      }
    } finally {
      setLoading(false);
    }
    return () => controller.abort();
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdating((s) => ({ ...s, [orderId]: true }));
    try {
      await axios.put(
        `${apiUrl}/api/order/${orderId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${tokenRef.current}` } }
      );
      // Optimistic UI update
      setOrders((prev) =>
        prev.map((o) => (o.orderId === orderId ? { ...o, status: newStatus } : o))
      );
      toast.success("Order status updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update order status");
    } finally {
      setUpdating((s) => ({ ...s, [orderId]: false }));
    }
  };

  const handleDelete = async (orderId) => {
    setDeleting((s) => ({ ...s, [orderId]: true }));
    try {
      await axios.delete(`${apiUrl}/api/order/${orderId}/delete`, {
        headers: { Authorization: `Bearer ${tokenRef.current}` },
      });
      setOrders((prev) => prev.filter((o) => o.orderId !== orderId));
      toast.success("Order deleted");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete order");
    } finally {
      setDeleting((s) => ({ ...s, [orderId]: false }));
      setConfirmDeleteId(null);
    }
  };

  const filteredSorted = useMemo(() => {
    let list = [...orders];

    // Filter by status
    if (statusFilter !== "All") {
      list = list.filter((o) => (o.status || "").toLowerCase() === statusFilter.toLowerCase());
    }

    // Search by id, name, phone, address
    if (debouncedSearch) {
      list = list.filter((o) => {
        const f = debouncedSearch;
        const id = String(o.orderId || "").toLowerCase();
        const name = String(o.name || "").toLowerCase();
        const phone = String(o.phone || "").toLowerCase();
        const address = String(o.address || "").toLowerCase();
        return id.includes(f) || name.includes(f) || phone.includes(f) || address.includes(f);
      });
    }

    // Sort
    if (sortBy === "idDesc") {
      list.sort((a, b) => Number(b.orderId) - Number(a.orderId));
    } else if (sortBy === "idAsc") {
      list.sort((a, b) => Number(a.orderId) - Number(b.orderId));
    } else if (sortBy === "totalDesc") {
      list.sort((a, b) => Number(b.total || 0) - Number(a.total || 0));
    } else if (sortBy === "totalAsc") {
      list.sort((a, b) => Number(a.total || 0) - Number(b.total || 0));
    }

    return list;
  }, [orders, statusFilter, sortBy, debouncedSearch]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredSorted.length / pageSize));
  useEffect(() => {
    setPage(1);
  }, [statusFilter, sortBy, debouncedSearch, pageSize]);

  const currentPageOrders = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredSorted.slice(start, start + pageSize);
  }, [filteredSorted, page, pageSize]);

  const toggleExpand = (orderId) =>
    setExpanded((e) => ({ ...e, [orderId]: !e[orderId] }));

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(String(text || ""));
      toast.info("Copied to clipboard");
    } catch {
      toast.error("Copy failed");
    }
  };

  return (
    <>
      <ToastContainer position="top-center" theme="dark" autoClose={2200} />
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Orders</h1>
            <p className="text-gray-400 text-sm">Manage, filter and track customer orders</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchOrders({ showToast: true })}
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

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="col-span-2 flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
            <FiSearch className="text-gray-400 shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by order ID, name, phone, address..."
              className="bg-transparent outline-none w-full text-sm placeholder:text-gray-400"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm"
          >
            <option value="All">All statuses</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm w-full"
            >
              <option value="idDesc">Newest (ID ↓)</option>
              <option value="idAsc">Oldest (ID ↑)</option>
              <option value="totalDesc">Total: High → Low</option>
              <option value="totalAsc">Total: Low → High</option>
            </select>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm"
              title="Items per page"
            >
              {[5, 10, 20, 50].map((n) => (
                <option key={n} value={n}>
                  {n}/page
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid gap-4 md:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/5 border border-white/10 p-4 animate-pulse space-y-3"
              >
                <div className="h-5 bg-white/10 rounded w-40" />
                <div className="h-4 bg-white/10 rounded w-56" />
                <div className="h-4 bg-white/10 rounded w-32" />
                <div className="h-24 bg-white/10 rounded" />
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-lg">No orders found</div>
            <p className="text-gray-400 text-sm mt-1">New orders will appear here</p>
          </div>
        ) : filteredSorted.length === 0 ? (
          <div className="text-center py-16 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-lg">No matches for your filters</div>
            <p className="text-gray-400 text-sm mt-1">Try clearing the search or changing filters</p>
          </div>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              {currentPageOrders.map((order) => {
                const isExpanded = !!expanded[order.orderId];
                const isUpdating = !!updating[order.orderId];
                const isDeleting = !!deleting[order.orderId];

                return (
                  <div
                    key={order.orderId}
                    className="rounded-2xl bg-white/5 border border-white/10 p-4 shadow-sm hover:shadow transition"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <FiHash className="text-gray-400" />
                          <h2 className="text-lg font-semibold">Order #{order.orderId}</h2>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-sm">
                          <span
                            className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full border ${statusColors[order.status] || "bg-white/5 border-white/10 text-gray-200"}`}
                            title="Current status"
                          >
                            <span className="h-2 w-2 rounded-full bg-current opacity-80" />
                            {order.status}
                          </span>

                          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                            {formatMoney(order.total)}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2 min-w-[180px]">
                        <select
                          className={`px-3 py-2 rounded-xl text-sm bg-white/5 border border-white/10 hover:bg-white/10 transition ${
                            isUpdating ? "opacity-60 cursor-not-allowed" : ""
                          }`}
                          value={order.status}
                          disabled={isUpdating}
                          onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>

                        <button
                          onClick={() => setConfirmDeleteId(order.orderId)}
                          className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-rose-500/15 text-rose-300 border border-rose-500/30 hover:bg-rose-500/25 transition ${
                            isDeleting ? "opacity-60 cursor-not-allowed" : ""
                          }`}
                          disabled={isDeleting}
                          title="Delete order"
                        >
                          <FiTrash2 />
                          <span className="text-sm">Delete</span>
                        </button>
                      </div>
                    </div>

                    {/* Customer */}
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div className="space-y-1">
                        <div className="text-gray-400">Customer</div>
                        <div className="font-medium">{order.name || "-"}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-gray-400">Phone</div>
                        <div className="flex items-center gap-2">
                          <FiPhone className="text-gray-400" />
                          <span>{order.phone || "-"}</span>
                          <button
                            onClick={() => copyToClipboard(order.phone)}
                            className="ml-auto text-xs px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10"
                          >
                            <FiCopy />
                          </button>
                        </div>
                      </div>
                      <div className="sm:col-span-2 space-y-1">
                        <div className="text-gray-400">Address</div>
                        <div className="flex items-start gap-2">
                          <FiMapPin className="mt-0.5 text-gray-400" />
                          <span className="leading-snug">{order.address || "-"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="mt-4">
                      <button
                        onClick={() => toggleExpand(order.orderId)}
                        className="w-full inline-flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
                      >
                        <span className="font-medium">Items ({order?.billItems?.length || 0})</span>
                        {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                      </button>

                      {isExpanded && (
                        <div className="mt-3 rounded-xl bg-black/20 border border-white/10 overflow-hidden">
                          {order?.billItems?.length ? (
                            <div className="divide-y divide-white/10">
                              {order.billItems.map((item, idx) => (
                                <div
                                  key={`${order.orderId}-item-${idx}`}
                                  className="grid grid-cols-12 gap-2 px-3 py-2 text-sm"
                                >
                                  <div className="col-span-6 truncate">{item.productName}</div>
                                  <div className="col-span-2 text-gray-300">Qty: {item.quantity}</div>
                                  <div className="col-span-2 text-gray-300">
                                    Price: {formatMoney(Number(item.price || 0))}
                                  </div>
                                  <div className="col-span-2 font-medium text-emerald-300">
                                    {formatMoney(Number(item.price || 0) * Number(item.quantity || 0))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="px-3 py-3 text-sm text-gray-400">No items</div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between gap-3 mt-2">
              <div className="text-sm text-gray-400">
                Showing {(page - 1) * pageSize + 1}-
                {Math.min(page * pageSize, filteredSorted.length)} of {filteredSorted.length}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-50"
                >
                  Prev
                </button>
                <div className="text-sm">
                  Page {page} of {totalPages}
                </div>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Confirm Delete Modal */}
      {confirmDeleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setConfirmDeleteId(null)}
          />
          <div className="relative z-10 w-[92%] max-w-md rounded-2xl bg-[#0f131a] border border-white/10 p-5">
            <div className="text-lg font-semibold">Delete Order</div>
            <p className="text-sm text-gray-400 mt-1">
              Are you sure you want to delete order #{confirmDeleteId}? This action cannot be undone.
            </p>
            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDeleteId)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-rose-500/20 text-rose-200 border border-rose-500/30 hover:bg-rose-500/30"
              >
                <FiTrash2 />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}