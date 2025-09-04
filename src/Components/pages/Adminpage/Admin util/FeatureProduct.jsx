import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FiSearch,
  FiFilter,
  FiEdit2,
  FiTrash2,
  FiX,
  FiDollarSign,
  FiBox,
  FiHash,
  FiChevronLeft,
  FiChevronRight,
  FiRefreshCw,
  FiImage,
  FiCopy,
} from "react-icons/fi";

export default function EditProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // UI controls
  const [search, setSearch] = useState("");
  const [stockFilter, setStockFilter] = useState("all"); // all | in | low | out
  const [sortKey, setSortKey] = useState("name"); // name | price | stock
  const [sortDir, setSortDir] = useState("asc"); // asc | desc
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);

  // Edit + Delete
  const [editingProduct, setEditingProduct] = useState(null);
  const [saving, setSaving] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const LOW_STOCK_THRESHOLD = 5;

  const formatMoney = (n) => `$${Number(n || 0).toFixed(2)}`;

  const fetchProducts = async (opts = { showToast: false }) => {
    try {
      if (products.length > 0) setRefreshing(true);
      setLoading(products.length === 0);
      setError(null);

      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/product/getProducts`);
      const list = Array.isArray(res.data) ? res.data : [];
      setProducts(list);
      if (opts.showToast) toast.success("Products refreshed");
    } catch (err) {
      console.error(err);
      setError("Failed to load products");
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filter + sort
  const filteredSorted = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = [...products];

    if (q) {
      list = list.filter((p) => {
        const name = String(p.name || "").toLowerCase();
        const pid = String(p.productId || "").toLowerCase();
        const desc = String(p.description || "").toLowerCase();
        return name.includes(q) || pid.includes(q) || desc.includes(q);
      });
    }

    if (stockFilter !== "all") {
      list = list.filter((p) => {
        const s = Number(p.stock || 0);
        if (stockFilter === "in") return s > LOW_STOCK_THRESHOLD;
        if (stockFilter === "low") return s > 0 && s <= LOW_STOCK_THRESHOLD;
        if (stockFilter === "out") return s === 0;
        return true;
      });
    }

    list.sort((a, b) => {
      let A, B;
      if (sortKey === "name") {
        A = String(a.name || "").toLowerCase();
        B = String(b.name || "").toLowerCase();
      } else if (sortKey === "price") {
        A = Number(a.price || 0);
        B = Number(b.price || 0);
      } else {
        // stock
        A = Number(a.stock || 0);
        B = Number(b.stock || 0);
      }
      if (A < B) return sortDir === "asc" ? -1 : 1;
      if (A > B) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return list;
  }, [products, search, stockFilter, sortKey, sortDir]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredSorted.length / pageSize));
  useEffect(() => setPage(1), [search, stockFilter, sortKey, sortDir, pageSize]);
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredSorted.slice(start, start + pageSize);
  }, [filteredSorted, page, pageSize]);

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "name" ? "asc" : "desc");
    }
  };

  const handleEdit = (product) => {
    // clone to avoid mutating the list
    setEditingProduct({
      _id: product._id,
      productId: product.productId,
      name: product.name || "",
      price: Number(product.price || 0),
      stock: Number(product.stock || 0),
      description: product.description || "",
      images: Array.isArray(product.images) ? product.images : [],
    });
  };

  const handleUpdate = async () => {
    if (!editingProduct) return;
    if (!editingProduct.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (Number(editingProduct.price) < 0) {
      toast.error("Price cannot be negative");
      return;
    }
    if (Number(editingProduct.stock) < 0) {
      toast.error("Stock cannot be negative");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in");
      return;
    }

    setSaving(true);
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/product/${editingProduct._id}/update`,
        {
          name: editingProduct.name,
          price: Number(editingProduct.price),
          stock: Number(editingProduct.stock),
          description: editingProduct.description,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Product updated");
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in");
      return;
    }
    setDeletingId(productId);
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/product/${productId}/delete`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Product deleted");
      setConfirmDeleteId(null);
      fetchProducts();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(String(text || ""));
      toast.success("Copied");
    } catch {
      toast.error("Copy failed");
    }
  };

  const StockBadge = ({ stock }) => {
    const s = Number(stock || 0);
    let classes =
      "inline-flex items-center gap-2 px-2 py-0.5 rounded-full text-xs border";
    if (s === 0) classes += " bg-rose-500/15 text-rose-300 border-rose-500/30";
    else if (s <= LOW_STOCK_THRESHOLD)
      classes += " bg-amber-500/15 text-amber-300 border-amber-500/30";
    else classes += " bg-emerald-500/15 text-emerald-300 border-emerald-500/30";

    return (
      <span className={classes} title="Stock level">
        <FiBox />
        {s === 0 ? "Out of stock" : s <= LOW_STOCK_THRESHOLD ? `Low: ${s}` : `In Stock: ${s}`}
      </span>
    );
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Manage Products</h2>
          <p className="text-gray-400 text-sm">Search, edit, and delete products</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => fetchProducts({ showToast: true })}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition ${
              refreshing ? "opacity-60 cursor-not-allowed" : ""
            }`}
            disabled={refreshing}
          >
            <FiRefreshCw className={refreshing ? "animate-spin" : ""} />
            <span className="text-sm">Refresh</span>
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
        <div className="col-span-2 flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
          <FiSearch className="text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, product ID, description..."
            className="bg-transparent outline-none w-full text-sm placeholder:text-gray-400"
          />
        </div>

        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm"
          title="Filter stock"
        >
          <option value="all">All stock</option>
          <option value="in">In stock</option>
          <option value="low">Low stock</option>
          <option value="out">Out of stock</option>
        </select>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleSort("name")}
            className={`flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 ${
              sortKey === "name" ? "ring-1 ring-white/20" : ""
            }`}
            title="Sort by name"
          >
            <FiFilter />
            Name {sortKey === "name" ? (sortDir === "asc" ? "▲" : "▼") : ""}
          </button>
          <button
            onClick={() => toggleSort("price")}
            className={`flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 ${
              sortKey === "price" ? "ring-1 ring-white/20" : ""
            }`}
            title="Sort by price"
          >
            <FiDollarSign />
            Price {sortKey === "price" ? (sortDir === "asc" ? "▲" : "▼") : ""}
          </button>
          <button
            onClick={() => toggleSort("stock")}
            className={`flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 ${
              sortKey === "stock" ? "ring-1 ring-white/20" : ""
            }`}
            title="Sort by stock"
          >
            <FiBox />
            Stock {sortKey === "stock" ? (sortDir === "asc" ? "▲" : "▼") : ""}
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-2xl bg-white/5 border border-white/10 p-4 animate-pulse">
              <div className="h-40 w-full bg-white/10 rounded-xl mb-3" />
              <div className="h-5 w-1/2 bg-white/10 rounded mb-2" />
              <div className="h-4 w-1/3 bg-white/10 rounded mb-2" />
              <div className="h-4 w-1/4 bg-white/10 rounded" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="rounded-2xl bg-rose-500/10 border border-rose-500/30 p-4 text-rose-200">
          {error}
        </div>
      ) : filteredSorted.length === 0 ? (
        <div className="text-center py-16 rounded-2xl bg-white/5 border border-white/10">
          No products match your filters.
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {paged.map((product) => {
              const img = product.images?.[0];
              const price = formatMoney(product.price);
              const stock = Number(product.stock || 0);
              return (
                <div
                  key={product._id || product.productId}
                  className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition"
                >
                  <div className="relative h-40 bg-black/30 flex items-center justify-center">
                    {img ? (
                      <img
                        src={img}
                        alt={product.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <FiImage className="text-3xl mb-1" />
                        <span className="text-xs">No image</span>
                      </div>
                    )}
                    <div className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-black/60 text-xs">
                      <FiHash /> {product.productId || "—"}
                      <button
                        className="ml-1 opacity-70 hover:opacity-100"
                        onClick={() => copyToClipboard(product.productId)}
                        title="Copy ID"
                      >
                        <FiCopy />
                      </button>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-semibold truncate">{product.name}</h3>
                      <span className="px-2 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-sm">
                        {price}
                      </span>
                    </div>
                    <StockBadge stock={stock} />
                    <p className="text-sm text-gray-300 line-clamp-3">
                      {product.description || "No description"}
                    </p>

                    <div className="pt-2 flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10"
                        title="Edit"
                      >
                        <FiEdit2 /> Edit
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(product.productId)}
                        className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-rose-500/15 text-rose-300 border border-rose-500/30 hover:bg-rose-500/25"
                        title="Delete"
                      >
                        <FiTrash2 /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer: pagination + size */}
          <div className="flex items-center justify-between gap-3 mt-3">
            <div className="text-sm text-gray-400">
              Showing {(page - 1) * pageSize + 1}-
              {Math.min(page * pageSize, filteredSorted.length)} of {filteredSorted.length}
            </div>
            <div className="flex items-center gap-2">
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-sm"
              >
                {[6, 9, 12, 18].map((n) => (
                  <option key={n} value={n}>
                    {n}/page
                  </option>
                ))}
              </select>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-50"
              >
                <FiChevronLeft />
              </button>
              <div className="text-sm">
                Page {page} of {totalPages}
              </div>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-50"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        </>
      )}

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
          <div className="absolute inset-0 bg-black/70" onClick={() => setEditingProduct(null)} />
          <div className="relative z-10 w-full md:max-w-2xl bg-[#0f131a] border border-white/10 rounded-t-2xl md:rounded-2xl p-4 md:p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Edit Product</h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10"
              >
                <FiX />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                icon={FiHash}
                label="Product ID"
                value={editingProduct.productId}
                readOnly
              />
              <Field
                icon={FiDollarSign}
                label="Price"
                type="number"
                min="0"
                step="0.01"
                value={editingProduct.price}
                onChange={(e) =>
                  setEditingProduct((p) => ({ ...p, price: e.target.value }))
                }
              />
              <Field
                icon={FiBox}
                label="Stock"
                type="number"
                min="0"
                step="1"
                value={editingProduct.stock}
                onChange={(e) =>
                  setEditingProduct((p) => ({ ...p, stock: e.target.value }))
                }
              />
              <Field
                label="Name"
                value={editingProduct.name}
                onChange={(e) =>
                  setEditingProduct((p) => ({ ...p, name: e.target.value }))
                }
              />
            </div>

            <div className="mt-4">
              <label className="text-sm text-gray-300">Description</label>
              <textarea
                rows={4}
                value={editingProduct.description}
                onChange={(e) =>
                  setEditingProduct((p) => ({ ...p, description: e.target.value }))
                }
                className="mt-1 w-full px-3 py-2 rounded-xl bg-black/30 border border-white/10 outline-none focus:border-white/20"
                placeholder="Describe the product..."
              />
            </div>

            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={saving}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 transition ${
                  saving ? "opacity-80 cursor-not-allowed" : ""
                }`}
              >
                {saving && <FiRefreshCw className="animate-spin" />}
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setConfirmDeleteId(null)}
          />
          <div className="relative z-10 w-[92%] max-w-md rounded-2xl bg-[#0f131a] border border-white/10 p-5">
            <div className="text-lg font-semibold">Delete Product</div>
            <p className="text-sm text-gray-400 mt-1">
              Are you sure you want to delete product with ID <span className="font-mono">{confirmDeleteId}</span>? This action cannot be undone.
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
                disabled={deletingId === confirmDeleteId}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-rose-500/20 text-rose-200 border border-rose-500/30 hover:bg-rose-500/30 disabled:opacity-60"
              >
                {deletingId === confirmDeleteId ? (
                  <FiRefreshCw className="animate-spin" />
                ) : (
                  <FiTrash2 />
                )}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ icon: Icon, label, className = "", ...inputProps }) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-300 flex items-center gap-2">
        {Icon && <Icon />} {label}
      </label>
      <input
        {...inputProps}
        className={`w-full px-3 py-2 rounded-xl bg-black/30 border border-white/10 outline-none focus:border-white/20 ${className}`}
      />
    </div>
  );
}