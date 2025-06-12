import { useState } from "react";
import PlaceOrder from "./PlaceOrder";

export default function Cart() {
  const [cartItems, setCartItems] = useState(() => {
    
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  return (
    <div className="min-h-screen bg-[#0e1013] text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="mb-4">
            {cartItems.map((item, index) => (
              <li key={index} className="mb-2">
                {item.name} x {item.quantity} — Rs. {item.price * item.quantity}
              </li>
            ))}
          </ul>

          <PlaceOrder cartItems={cartItems} clearCart={clearCart} />
        </>
      )}
    </div>
  );
}
