import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiShoppingCart,
  FiMinus,
  FiPlus,
  FiTrash2,
  FiUser,
  FiPhone,
  FiMapPin,
  FiShield,
  FiLoader,
} from "react-icons/fi";

function PlaceOrder() {
  const [cartItems, setCartItems] = useState([]);
  const [wasArray, setWasArray] = useState(true); // track original localStorage shape
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;
  const CURRENCY = import.meta.env.VITE_CURRENCY || "USD";

  useEffect(() => {
    const stored = localStorage.getItem("buyNowProduct");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const isArr = Array.isArray(parsed);
        setWasArray(isArr);
        setCartItems(isArr ? parsed : [parsed]);
      } catch (err) {
        console.error("Failed to parse buyNowProduct from localStorage:", err);
        setCartItems([]);
      }
    }
  }, []);

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

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
        0
      ),
    [cartItems]
  );
  const shipping = 0; // adjust if needed
  const total = subtotal + shipping;

  const updateLocalStorage = (items) => {
    if (!items?.length) {
      localStorage.removeItem("buyNowProduct");
      return;
    }
    localStorage.setItem("buyNowProduct", JSON.stringify(wasArray ? items : items[0]));
  };

  const updateQuantity = (index, delta) => {
    setCartItems((prev) => {
      const next = [...prev];
      const item = { ...next[index] };
      const currentQty = Number(item.quantity) || 1;
      const newQty = Math.max(1, currentQty + delta);
      item.quantity = newQty;
      next[index] = item;
      updateLocalStorage(next);
      return next;
    });
  };

  const removeItem = (index) => {
    setCartItems((prev) => {
      const next = prev.filter((_, i) => i !== index);
      updateLocalStorage(next);
      return next;
    });
    toast.success("Item removed from order");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("No products to order.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to place an order.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        API_URL + "/api/order/CreateOrder",
        {
          name: form.name,
          phone: form.phone,
          address: form.address,
          billItems: cartItems.map((item) => ({
            productId: item.productId || item.id,
            quantity: item.quantity || 1,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message || "Order placed successfully!");
      localStorage.removeItem("buyNowProduct");
      setCartItems([]);
      setForm({ name: "", phone: "", address: "" });
    } catch (error) {
      console.error("Order error:", error);
      toast.error(error.response?.data?.message || "Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <>
        <ToastContainer position="top-center" />
        <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/10 text-rose-400">
              <FiShoppingCart />
            </div>
            <h2 className="text-xl font-bold">Your order is empty</h2>
            <p className="mt-2 text-slate-400">
              No products selected for order. Add items to your cart and return here to place your order.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <ToastContainer position="top-center" />
      <section className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-white">
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[880px] rounded-full bg-gradient-to-r from-rose-600/20 via-orange-500/15 to-pink-600/20 blur-[120px]"
        />
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-rose-500/10 p-3 text-rose-400">
                <FiShoppingCart />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight">Place Your Order</h1>
                <p className="text-sm text-slate-400">Review your items and enter your delivery details.</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
              <FiShield className="text-emerald-300" />
              Secure checkout
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
            {/* Cart Items */}
            <div className="md:col-span-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <h2 className="mb-4 text-lg font-semibold">Your Items</h2>

                <div className="space-y-4">
                  {cartItems.map((product, index) => {
                    const price = Number(product.price) || 0;
                    const qty = Number(product.quantity) || 1;
                    const lineTotal = price * qty;
                    return (
                      <div
                        key={product.productId || product.id || index}
                        className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-rose-500/40"
                      >
                        <img
                          src={product.images?.[0] || "/placeholder.png"}
                          alt={product.name || "Product"}
                          onError={(e) => (e.currentTarget.src = "/placeholder.png")}
                          className="h-20 w-20 rounded-lg bg-black/30 object-contain ring-1 ring-white/10"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-base font-semibold">{product.name || "Product"}</p>
                          <div className="mt-1 flex items-center gap-3 text-sm">
                            <span className="text-slate-400">Price:</span>
                            <span className="font-medium">{formatCurrency(price)}</span>
                          </div>
                          <div className="mt-1 flex items-center gap-2 text-sm text-slate-400">
                            <span>Item total:</span>
                            <span className="font-semibold text-white">{formatCurrency(lineTotal)}</span>
                          </div>
                        </div>

                        {/* Quantity stepper */}
                        <div className="flex items-center gap-3">
                          <div className="inline-flex items-center rounded-lg border border-white/10 bg-white/5">
                            <button
                              type="button"
                              onClick={() => updateQuantity(index, -1)}
                              disabled={qty <= 1}
                              className="p-2 text-slate-300 hover:text-white disabled:opacity-40"
                              aria-label="Decrease quantity"
                            >
                              <FiMinus />
                            </button>
                            <span className="w-10 text-center text-sm font-semibold">{qty}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(index, 1)}
                              className="p-2 text-slate-300 hover:text-white"
                              aria-label="Increase quantity"
                            >
                              <FiPlus />
                            </button>
                          </div>

                          {/* Remove */}
                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="rounded-lg p-2 text-slate-300 hover:bg-rose-500/10 hover:text-rose-400"
                            aria-label="Remove item"
                            title="Remove item"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Order + Form */}
            <div className="md:col-span-2">
              <div className="sticky top-6 space-y-6">
                {/* Summary */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                  <h3 className="mb-4 text-lg font-semibold">Order Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-slate-300">
                      <span>Subtotal</span>
                      <span className="font-medium text-white">{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Shipping</span>
                      <span className="font-medium text-emerald-300">{shipping ? formatCurrency(shipping) : "Free"}</span>
                    </div>
                    <div className="h-px w-full bg-white/10" />
                    <div className="flex justify-between text-base font-bold">
                      <span>Total</span>
                      <span className="text-rose-300">{formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>

                {/* Delivery form */}
                <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                  <h3 className="mb-4 text-lg font-semibold">Delivery Details</h3>

                  <div className="space-y-5">
                    <div>
                      <label className="mb-2 block text-sm text-gray-300 font-medium">Name</label>
                      <div className="relative">
                        <FiUser className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          required
                          autoComplete="name"
                          placeholder="Your full name"
                          className="w-full rounded-xl border border-white/10 bg-black/30 py-3 pl-10 pr-3 text-white placeholder:text-slate-500 outline-none transition focus:border-rose-500/60 focus:ring-2 focus:ring-rose-500/20"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-gray-300 font-medium">Phone</label>
                      <div className="relative">
                        <FiPhone className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          required
                          autoComplete="tel"
                          pattern="[0-9\s()+-]{7,15}"
                          title="Enter a valid phone number (7–15 digits)"
                          placeholder="+1 (555) 000-1234"
                          className="w-full rounded-xl border border-white/10 bg-black/30 py-3 pl-10 pr-3 text-white placeholder:text-slate-500 outline-none transition focus:border-rose-500/60 focus:ring-2 focus:ring-rose-500/20"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-gray-300 font-medium">Address</label>
                      <div className="relative">
                        <FiMapPin className="pointer-events-none absolute left-3 top-3 text-slate-400" />
                        <textarea
                          value={form.address}
                          onChange={(e) => setForm({ ...form, address: e.target.value })}
                          required
                          rows="4"
                          autoComplete="street-address"
                          placeholder="Street, City, Postal Code"
                          className="w-full rounded-xl border border-white/10 bg-black/30 py-3 pl-10 pr-3 text-white placeholder:text-slate-500 outline-none transition focus:border-rose-500/60 focus:ring-2 focus:ring-rose-500/20 resize-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="relative inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-orange-500 px-5 py-3 font-semibold text-white shadow-lg shadow-rose-900/30 transition hover:from-rose-500 hover:to-orange-400 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {loading ? (
                        <>
                          <FiLoader className="animate-spin" />
                          Placing order...
                        </>
                      ) : (
                        <>
                          <FiPackage />
                          Confirm Order
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <p className="mt-8 text-center text-xs text-slate-500">
            By placing this order, you agree to our Terms and Privacy Policy.
          </p>
        </div>
      </section>
    </>
  );
}

export default PlaceOrder;