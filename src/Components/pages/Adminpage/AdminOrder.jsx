import { useEffect, useState } from "react";
import axios from "axios";

export function AdminOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

 
  useEffect(() => {
    setLoading(true);
    axios.get(`${import.meta.env.VITE_API_URL}/api/order`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        setOrders(res.data);
        setError(null);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load orders");
      })
      .finally(() => setLoading(false));
  }, [token]);

  const completeOrder = async (orderId) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/order/${orderId}`,
        { status: "Completed" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders(prev =>
        prev.map(order =>
          order.orderId === orderId ? { ...order, status: "Completed" } : order
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to complete the order.");
    }
  };

  const deleteOrder = async (orderId) => {
    const confirmed = window.confirm("Are you sure you want to delete this order?");
    if (!confirmed) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(prev => prev.filter(order => order.orderId !== orderId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete the order.");
    }
  };

  const editOrder = (orderId) => {
    alert(`Edit order ${orderId} (functionality not implemented here)`);
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-900 min-h-screen text-white flex justify-center items-center">
        <p>Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-900 min-h-screen text-white flex justify-center items-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h2 className="text-2xl font-semibold mb-6">Admin Orders Panel</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div
              key={order.orderId}
              className="bg-gray-800 p-5 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-bold">Order #{order.orderId}</p>
                <p>Customer: {order.name}</p>
                <p>Items: {order.billItems.map(i => i.productName).join(", ")}</p>
                <p>Total: ${order.total.toFixed(2)}</p>
                <p>
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      order.status === "Completed"
                        ? "text-green-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>
              </div>
              <div className="flex gap-2">
                {order.status !== "Completed" && (
                  <button
                    onClick={() => completeOrder(order.orderId)}
                    className="bg-green-600 hover:bg-green-500 px-3 py-1 rounded text-sm"
                  >
                    Complete
                  </button>
                )}
                <button
                  onClick={() => editOrder(order.orderId)}
                  className="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteOrder(order.orderId)}
                  className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}