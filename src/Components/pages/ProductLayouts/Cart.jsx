import { useEffect, useMemo, useState } from "react";
import PlaceOrder from "./PlaceOrder";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiShoppingCart,
  FiMinus,
  FiPlus,
  FiTrash2,
  FiArrowLeft,
  FiChevronDown,
} from "react-icons/fi";

export default function Cart() {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cart");
    try {
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [showCheckout, setShowCheckout] = useState(false);

  // Persist any change back to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const formatRs = (amount) => {
    const n = Number(amount || 0);
    try {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "LKR", // change if needed
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(n);
    } catch {
      return `Rs. ${n.toFixed(2)}`;
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

  const updateQty = (index, delta) => {
    setCartItems((prev) => {
      const next = [...prev];
      const item = { ...next[index] };
      const current = Number(item.quantity) || 1;
      item.quantity = Math.max(1, current + delta);
      next[index] = item;
      return next;
    });
  };

  const removeItem = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
    toast.success("Item removed from cart");
  };

  const clearCart = () => {
    if (!cartItems.length) return;
    const yes = window.confirm("Remove all items from cart?");
    if (!yes) return;
    setCartItems([]);
    localStorage.removeItem("cart");
    toast.success("Cart cleared");
    setShowCheckout(false);
  };

  const handleCheckout = () => {
    if (!cartItems.length) {
      toast.error("Your cart is empty.");
      return;
    }
    // For compatibility with PlaceOrder implementations that read from localStorage:
    localStorage.setItem("buyNowProduct", JSON.stringify(cartItems));
    setShowCheckout(true);
    // smooth scroll to checkout section
    setTimeout(() => {
      const el = document.getElementById("checkout-section");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  if (cartItems.length === 0) {
    return (
      <>
        <ToastContainer position="top-center" />
        <section className="relative min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-white">
          {/* Ambient glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[880px] rounded-full bg-gradient-to-r from-rose-600/20 via-orange-500/15 to-pink-600/20 blur-[120px]"
          />
          <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-4">
            <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/10 text-rose-400">
                <FiShoppingCart />
              </div>
              <h1 className="text-2xl font-extrabold">Your cart is empty</h1>
              <p className="mt-2 text-slate-400">
                Add items to your cart and come back to checkout.
              </p>
              <button
                onClick={() => (window.history.length > 1 ? window.history.back() : (window.location.href = "/"))}
                className="mt-6 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
              >
                <FiArrowLeft />
                Continue shopping
              </button>
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
                <h1 className="text-2xl font-extrabold tracking-tight">Your Cart</h1>
                <p className="text-sm text-slate-400">
                  Review your items and proceed to checkout.
                </p>
              </div>
            </div>
            <button
              onClick={clearCart}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
            >
              Clear cart
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
            {/* Items */}
            <div className="md:col-span-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <h2 className="mb-4 text-lg font-semibold">Items</h2>

                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                  {cartItems.map((item, index) => {
                    const price = Number(item.price) || 0;
                    const qty = Number(item.quantity) || 1;
                    const lineTotal = price * qty;
                    return (
                      <div
                        key={item.id || item.productId || index}
                        className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-rose-500/40"
                      >
                        <img
                          src={item.images?.[0] || item.image || "/placeholder.png"}
                          alt={item.name || "Product"}
                          onError={(e) => (e.currentTarget.src = "/placeholder.png")}
                          className="h-20 w-20 rounded-lg bg-black/30 object-contain ring-1 ring-white/10"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-base font-semibold">
                            {item.name || "Product"}
                          </p>
                          <div className="mt-1 flex items-center gap-3 text-sm">
                            <span className="text-slate-400">Price:</span>
                            <span className="font-medium">{formatRs(price)}</span>
                          </div>
                          <div className="mt-1 flex items-center gap-2 text-sm text-slate-400">
                            <span>Item total:</span>
                            <span className="font-semibold text-white">
                              {formatRs(lineTotal)}
                            </span>
                          </div>
                        </div>

                        {/* Quantity stepper */}
                        <div className="flex items-center gap-3">
                          <div className="inline-flex items-center rounded-lg border border-white/10 bg-white/5">
                            <button
                              type="button"
                              onClick={() => updateQty(index, -1)}
                              disabled={qty <= 1}
                              className="p-2 text-slate-300 hover:text-white disabled:opacity-40"
                              aria-label="Decrease quantity"
                            >
                              <FiMinus />
                            </button>
                            <span className="w-10 text-center text-sm font-semibold">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQty(index, 1)}
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

            {/* Summary */}
            <div className="md:col-span-2">
              <div className="sticky top-6 space-y-6">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                  <h3 className="mb-4 text-lg font-semibold">Order Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-slate-300">
                      <span>Subtotal</span>
                      <span className="font-medium text-white">
                        {formatRs(subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Shipping</span>
                      <span className="font-medium text-emerald-300">Free</span>
                    </div>
                    <div className="h-px w-full bg-white/10" />
                    <div className="flex justify-between text-base font-bold">
                      <span>Total</span>
                      <span className="text-rose-300">{formatRs(subtotal)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-orange-500 px-5 py-3 font-semibold text-white shadow-lg shadow-rose-900/30 transition hover:from-rose-500 hover:to-orange-400"
                  >
                    Proceed to Checkout
                    <FiChevronDown
                      className={`transition ${showCheckout ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Section (inline reveal) */}
          <div
            id="checkout-section"
            className={`transition-all duration-300 ${
              showCheckout ? "mt-8 opacity-100" : "mt-0 opacity-0 pointer-events-none"
            }`}
          >
            {showCheckout && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                {/* If your PlaceOrder reads from localStorage, the handler already sets buyNowProduct.
                    If it accepts props (cartItems, clearCart), this will pass them through. */}
                <PlaceOrder cartItems={cartItems} clearCart={clearCart} />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}