import { useEffect, useState } from "react";
import axios from "axios";

export function AdminOrder() {
  const [orders, setOrders] = useState([]); // ✅ Renamed to plural for consistency

  useEffect(() => {
    axios.get(import.meta.env.VITE_API_URL + "/api/order")
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  const completeOrder = async (id) => {
    try {
      await axios.patch(import.meta.env.VITE_API_URL + `/api/order/${id}/complete`);
      setOrders(prev =>
        prev.map(order =>
          order._id === id ? { ...order, status: "Completed" } : order
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const deleteOrder = async (id) => {
    if (confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(import.meta.env.VITE_API_URL + `/api/order/${id}`);
        setOrders(prev => prev.filter(order => order._id !== id)); // ✅ Fixed typo: setOrders
      } catch (err) {
        console.error(err);
      }
    }
  };

  const editOrder = (id) => {
    alert(`Edit order ${id} (functionality not implemented here)`);
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h2 className="text-2xl font-semibold mb-6">Admin Orders Panel</h2>
      <div className="space-y-4">
        {orders.map(order => (
          <div
            key={order._id}
            className="bg-gray-800 p-5 rounded-lg shadow flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-bold">Order #{order.orderId}</p>
              <p>Customer: {order.name}</p>
              <p>Items: {order.billItems.map(i => i.productName).join(", ")}</p>
              <p>Total: ${order.total.toFixed(2)}</p>
              <p>Status: <span className={`font-semibold ${order.status === "Completed" ? "text-green-400" : "text-yellow-400"}`}>{order.status}</span></p>
            </div>
            <div className="flex gap-2">
              {order.status !== "Completed" && (
                <button
                  onClick={() => completeOrder(order._id)}
                  className="bg-green-600 hover:bg-green-500 px-3 py-1 rounded text-sm"
                >
                  Complete
                </button>
              )}
              <button
                onClick={() => editOrder(order._id)}
                className="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => deleteOrder(order._id)}
                className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
