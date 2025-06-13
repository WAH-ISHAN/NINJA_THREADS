import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const res = await axios.get(import.meta.env.VITE_API_URL + "/api/order", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);


  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/order/${orderId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Order status changed successfully");
      fetchOrders();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update order status");
    }
  };

  const handleDelete = async (orderId) => {
    const token = localStorage.getItem("token");
    try {
     await axios.delete(`${import.meta.env.VITE_API_URL}/api/order/${orderId}/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Order deleted");
      fetchOrders();
    } catch (error) {
      toast.error("Failed to delete order");
      console.error(error);
    }
  };







  return (
    <>
      <ToastContainer position="top-center" />
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Orders</h1>

        {loading ? (
          <p className="text-center">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-center">No orders found.</p>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div key={order.orderId} className="border p-4 rounded-lg bg-gray-800 shadow-md">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold">Order #{order.orderId}</h2>
                  <select
                    className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                      order.status === "Completed" ? "bg-green-600" : "bg-yellow-500"
                    }`}
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <p>
                  <strong>Name:</strong> {order.name}
                </p>
                <p>
                  <strong>Phone:</strong> {order.phone}
                </p>
                <p>
                  <strong>Address:</strong> {order.address}
                </p>

                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Items:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {order.billItems.map((item, idx) => (
                      <li key={idx}>
                        {item.productName} - Qty: {item.quantity} - Price: ${item.price.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 font-bold">Total: ${order.total.toFixed(2)}</p>
                </div>

                <div className="mt-4 flex space-x-4">
                  <button
                    onClick={() => handleDelete(order.orderId)}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                  >
                    Delete Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default AdminOrder;
