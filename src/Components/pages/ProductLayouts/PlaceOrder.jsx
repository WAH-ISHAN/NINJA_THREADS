import React, { useEffect, useState } from "react";
import axios from "axios";

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
      alert("No products to order.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to place an order.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/api/order",
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

      alert(res.data.message || "Order placed successfully!");
      localStorage.removeItem("buyNowProduct");
      setCartItems([]);
      setForm({ name: "", phone: "", address: "" });
    } catch (error) {
      console.error("Order error:", error);
      alert(error.response?.data?.message || "Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return <p className="text-white p-4">No products selected for order.</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6 flex justify-center items-center">
      <div className="w-full max-w-2xl bg-[#1f1f1f] p-8 rounded-2xl shadow-lg border border-gray-800">
        <h2 className="text-4xl font-bold mb-6 text-center text-white">
          Place Your Order
        </h2>

      
        <div className="mb-8 space-y-4">
          {cartItems.map((product, index) => (
            <div
              key={product.productId || product.id || index}
              className="bg-black p-4 rounded-lg border border-gray-700 flex items-center gap-4"
            >
              <img
                src={product.images?.[0] || "/placeholder.png"}
                alt={product.name}
                className="w-20 h-20 object-contain rounded-lg bg-[#111]"
              />
              <div className="flex flex-col">
                <p className="text-xl font-semibold">{product.name}</p>
                <p className="text-red-500 text-lg">
                  ${product.price?.toFixed(2)}
                </p>
                <p className="text-gray-400">Qty: {product.quantity || 1}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-6 text-right font-semibold text-xl text-red-500">
          Total: ${calculateTotal()}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full p-3 rounded-lg bg-[#111] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Phone</label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
              className="w-full p-3 rounded-lg bg-[#111] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="07X XXX XXXX"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Address</label>
            <textarea
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              required
              rows="4"
              className="w-full p-3 rounded-lg bg-[#111] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Street, City, Postal Code"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-lg transition disabled:opacity-50"
          >
            {loading ? "Placing order..." : "Confirm Order"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PlaceOrder;
