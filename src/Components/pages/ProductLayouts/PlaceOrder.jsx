import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PlaceOrder() {
  const [cartItems, setCartItems] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("buyNowProduct");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCartItems(Array.isArray(parsed) ? parsed : [parsed]);
      } catch (err) {
        console.error("Failed to parse buyNowProduct from localStorage:", err);
        setCartItems([]);
      }
    }
  }, []);

  const calculateTotal = () => {
    return cartItems
      .reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0)
      .toFixed(2);
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
        import.meta.env.VITE_API_URL + "/api/order/CreateOrder",
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
        <p className="text-white p-4">No products selected for order.</p>
      </>
    );
  }

  return (
    <>
      <ToastContainer position="top-center" />
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-8 flex justify-center items-center">
        <div className="w-full max-w-2xl bg-gray-800 p-10 rounded-3xl shadow-2xl border border-gray-700">
          <h2 className="text-4xl font-extrabold mb-8 text-center text-red-500 tracking-wide">
            Place Your Order
          </h2>

          <div className="mb-10 space-y-5 max-h-96 overflow-y-auto">
            {cartItems.map((product, index) => (
              <div
                key={product.productId || product.id || index}
                className="bg-gray-900 p-4 rounded-xl border border-gray-700 flex items-center gap-5 hover:border-red-500 transition"
              >
                <img
                  src={product.images?.[0] || "/placeholder.png"}
                  alt={product.name}
                  className="w-20 h-20 object-contain rounded-lg bg-gray-700 shadow-inner"
                />
                <div className="flex flex-col flex-1">
                  <p className="text-xl font-semibold text-white">{product.name}</p>
                  <p className="text-red-500 font-bold text-lg mt-1">
                    ${product.price?.toFixed(2)}
                  </p>
                  <p className="text-gray-400 mt-1">Qty: {product.quantity || 1}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-8 text-right font-bold text-2xl text-red-500 tracking-wide">
            Total: ${calculateTotal()}
          </div>

          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <label className="block text-sm text-gray-300 mb-2 font-medium">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full p-4 rounded-xl bg-gray-700 border border-red-600 text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-red-600 focus:border-red-600 shadow-md transition"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2 font-medium">Phone</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
                className="w-full p-4 rounded-xl bg-gray-700 border border-red-600 text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-red-600 focus:border-red-600 shadow-md transition"
                placeholder="07X XXX XXXX"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2 font-medium">Address</label>
              <textarea
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                required
                rows="4"
                className="w-full p-4 rounded-xl bg-gray-700 border border-red-600 text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-red-600 focus:border-red-600 shadow-md transition resize-none"
                placeholder="Street, City, Postal Code"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold text-lg tracking-wide transition disabled:opacity-60"
            >
              {loading ? "Placing order..." : "Confirm Order"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default PlaceOrder;
