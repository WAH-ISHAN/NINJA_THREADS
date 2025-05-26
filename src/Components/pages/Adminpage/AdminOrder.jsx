
import { useState } from "react";

export  function AdminOrder() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "John Doe",
      items: ["Product A", "Product B"],
      total: 149.99,
      status: "Pending",
    },
    {
      id: 2,
      customer: "Jane Smith",
      items: ["Product C"],
      total: 89.99,
      status: "Pending",
    },
  ]);

  const completeOrder = (id) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === id ? { ...order, status: "Completed" } : order
      )
    );
  };

  const deleteOrder = (id) => {
    if (confirm("Are you sure you want to delete this order?")) {
      setOrders(prev => prev.filter(order => order.id !== id));
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
            key={order.id}
            className="bg-gray-800 p-5 rounded-lg shadow flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-bold">Order #{order.id}</p>
              <p>Customer: {order.customer}</p>
              <p>Items: {order.items.join(", ")}</p>
              <p>Total: ${order.total.toFixed(2)}</p>
              <p>Status: <span className={`font-semibold ${order.status === "Completed" ? "text-green-400" : "text-yellow-400"}`}>{order.status}</span></p>
            </div>
            <div className="flex gap-2">
              {order.status !== "Completed" && (
                <button
                  onClick={() => completeOrder(order.id)}
                  className="bg-green-600 hover:bg-green-500 px-3 py-1 rounded text-sm"
                >
                  Complete
                </button>
              )}
              <button
                onClick={() => editOrder(order.id)}
                className="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => deleteOrder(order.id)}
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
