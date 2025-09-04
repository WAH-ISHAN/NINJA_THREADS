import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import CartSidebar from "../utils/CardSideBar";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiShoppingCart,
  FiPlus,
  FiCheck,
  FiAlertCircle,
  FiFilter,
} from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured"); // featured | priceLow | priceHigh | name

  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;
  const CURRENCY = import.meta.env.VITE_CURRENCY || "USD";

  // Load products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setFetchError("");
        const res = await axios.get(`${API_URL}/api/product/getProducts`);
        setProducts(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setFetchError(error?.response?.data?.message || "Failed to load products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [API_URL]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCartItems(Array.isArray(parsed) ? parsed : []);
      } catch {
        setCartItems([]);
      }
    }
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const formatCurrency = (amount) => {
    const n = Number(amount || 0);
    try {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: CURRENCY,
      }).format(n);
    } catch {
      return `$${n.toFixed(2)}`;
    }
  };

  const displayProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = products.filter((p) =>
      q ? (p.name || "").toLowerCase().includes(q) : true
    );
    switch (sort) {
      case "priceLow":
        list = list.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
        break;
      case "priceHigh":
        list = list.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
        break;
      case "name":
        list = list.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        break;
      default:
        // featured: keep original order
        break;
    }
    return list;
  }, [products, search, sort]);

  const handleAddToCart = (product) => {
    if (!product) return;
    setCartItems((prev) => {
      const next = [...prev];
      const id = product.productId ?? product.id;
      const idx = next.findIndex((item) => item.id === id);

      if (idx > -1) {
        next[idx] = { ...next[idx], quantity: (Number(next[idx].quantity) || 1) + 1 };
        toast.success("Increased quantity in cart");
      } else {
        next.push({
          id,
          name: product.name,
          price: Number(product.price) || 0,
          quantity: 1,
          images: product.images || [],
        });
        toast.success("Added to cart");
      }
      return next;
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("Removed from cart");
  };

  const openBuyNowModal = (product) => {
    if (!product) return;
    // Persist selection for PlaceOrder page
    localStorage.setItem("buyNowProduct", JSON.stringify(product));
    navigate("/placeorder");
  };

  if (loading) {
    return (
      <>
        <ToastContainer position="top-center" />
        <section className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-white">
          <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
            <header className="mb-6">
              <h3 className="text-3xl font-extrabold">Products</h3>
              <p className="text-slate-400 mt-1 text-sm">Loading the latest products...</p>
            </header>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl animate-pulse"
                >
                  <div className="aspect-square w-full rounded-xl bg-white/10" />
                  <div className="mt-4 h-4 w-3/4 rounded bg-white/10" />
                  <div className="mt-2 h-4 w-1/3 rounded bg-white/10" />
                  <div className="mt-4 h-10 w-full rounded bg-white/10" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <ToastContainer position="top-center" />
      <section className="relative min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-white">
        {/* Ambient glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[880px] rounded-full bg-gradient-to-r from-rose-600/20 via-orange-500/15 to-pink-600/20 blur-[120px]"
        />
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-12 relative z-10">
          {/* Header + Controls */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-3xl font-extrabold tracking-tight">Products</h3>
              <p className="text-slate-400 mt-1 text-sm">
                Browse our catalog and find your next favorite.
              </p>
              {fetchError && (
                <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs text-amber-200">
                  <FiAlertCircle /> {fetchError}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative">
                <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products"
                  className="w-full sm:w-72 rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-3 text-white outline-none transition placeholder:text-slate-500 focus:border-rose-500/60 focus:ring-2 focus:ring-rose-500/20"
                />
              </div>
              <div className="relative">
                <FiFilter className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full sm:w-52 appearance-none rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-10 text-white outline-none transition focus:border-rose-500/60 focus:ring-2 focus:ring-rose-500/20"
                >
                  <option value="featured">Featured</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                  <option value="name">Name A–Z</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  ▾
                </span>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {displayProducts.length === 0 ? (
              <div className="col-span-full rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-slate-300">
                No products found.
              </div>
            ) : (
              displayProducts.map((product) => {
                const id = product.productId ?? product.id;
                const price = Number(product.price) || 0;
                const inStock = product.stock == null ? true : Number(product.stock) > 0;

                return (
                  <div
                    key={id}
                    className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition hover:border-rose-500/40 hover:shadow-lg hover:shadow-rose-900/10"
                  >
                    {/* Image */}
                    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-black/20 ring-1 ring-white/10">
                      <img
                        src={
                          product.images?.[0] ||
                          product.image ||
                          "/placeholder.png"
                        }
                        alt={product.name || "Product"}
                        onError={(e) => (e.currentTarget.src = "/placeholder.png")}
                        className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                      />

                      {/* Quick add button */}
                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        disabled={!inStock}
                        className={`absolute right-3 top-3 inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium backdrop-blur ${
                          inStock
                            ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200 hover:bg-emerald-400/15"
                            : "border-white/10 bg-white/5 text-slate-400 cursor-not-allowed"
                        }`}
                        title={inStock ? "Add to cart" : "Out of stock"}
                      >
                        <FiPlus /> Add
                      </button>

                      {/* Sold out badge */}
                      {!inStock && (
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/50">
                          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-300 ring-1 ring-white/20">
                            Sold out
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="mt-4 flex flex-1 flex-col">
                      <h4 className="line-clamp-1 text-lg font-semibold">
                        {product.name}
                      </h4>
                      <div className="mt-1 flex items-center gap-2 text-sm text-slate-400">
                        <span className="font-medium text-rose-300">
                          {formatCurrency(price)}
                        </span>
                        {product.rating ? (
                          <span className="rounded bg-white/5 px-2 py-0.5 text-xs">
                            ★ {product.rating.toFixed ? product.rating.toFixed(1) : product.rating}
                          </span>
                        ) : null}
                      </div>

                      {/* Actions */}
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <button
                          onClick={() => openBuyNowModal(product)}
                          disabled={!inStock}
                          className={`inline-flex items-center justify-center rounded-xl px-4 py-2 font-semibold transition ${
                            inStock
                              ? "bg-gradient-to-r from-rose-600 to-orange-500 text-white hover:from-rose-500 hover:to-orange-400"
                              : "cursor-not-allowed bg-white/5 text-slate-400"
                          }`}
                        >
                          Buy Now
                        </button>
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={!inStock}
                          className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2 font-semibold transition ${
                            inStock
                              ? "border-rose-500/30 bg-white/5 text-rose-300 hover:bg-white/10"
                              : "cursor-not-allowed border-white/10 bg-white/5 text-slate-400"
                          }`}
                        >
                          <FiShoppingCart />
                          Add to Cart
                        </button>
                      </div>

                      {/* Status hint */}
                      <div className="mt-3 text-xs text-slate-400">
                        {inStock ? (
                          <span className="inline-flex items-center gap-1 text-emerald-300">
                            <FiCheck /> In stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1">
                            <FiAlertCircle /> Unavailable
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemove={handleRemoveFromCart}
      />
    </>
  );
}

export default Product;