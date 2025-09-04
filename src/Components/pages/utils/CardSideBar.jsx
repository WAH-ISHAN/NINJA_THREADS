import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  FiX,
  FiShoppingCart,
  FiTrash2,
  FiArrowRight,
  FiCreditCard,
  FiPlus,
  FiMinus,
  FiImage,
  FiTag,
  FiTruck,
} from "react-icons/fi";

export function CartSidebar({ isOpen, onClose, cartItems = [], onRemove, onUpdateQty }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const panelRef = useRef(null);

  // Disable body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const formatMoney = (n) => `$${Number(n || 0).toFixed(2)}`;

  const subtotal = useMemo(
    () => cartItems.reduce((sum, it) => sum + Number(it.price || 0) * Number(it.quantity || 1), 0),
    [cartItems]
  );

  const FREE_SHIPPING_THRESHOLD = 100;
  const shippingLeft = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShipProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const handleProceedToCheckout = () => {
    if (!cartItems.length) {
      toast("Your cart is empty.");
      return;
    }
    // Preserves your current single-item checkout behavior
    localStorage.setItem("buyNowProduct", JSON.stringify(cartItems[0]));
    onClose?.();
    navigate("/PlaceOrder");
  };

  const handleSubmitOrder = async () => {
    if (!cartItems.length) {
      toast("Your cart is empty.");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/order`);
      toast.success(res?.data?.message || "Order placed successfully!");
      onClose?.();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to place order, please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleMinus = (item) => {
    if (!onUpdateQty) return;
    const id = item.id || item.productId;
    const next = Math.max(1, Number(item.quantity || 1) - 1);
    onUpdateQty(id, next);
  };

  const handlePlus = (item) => {
    if (!onUpdateQty) return;
    const id = item.id || item.productId;
    const next = Number(item.quantity || 1) + 1;
    onUpdateQty(id, next);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        ref={panelRef}
        role="dialog"
        aria-label="Cart"
        className={`fixed right-0 top-0 h-full w-[92vw] sm:w-96 md:w-[420px] z-50 transform transition-transform duration-300
        bg-[#0f131a] border-l border-white/10 shadow-2xl rounded-l-2xl flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center">
                <FiShoppingCart />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Your Cart</h2>
                <div className="text-xs text-gray-400">
                  {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
              aria-label="Close"
            >
              <FiX />
            </button>
          </div>

          {/* Free shipping progress */}
          <div className="mt-3">
            <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500"
                style={{ width: `${freeShipProgress}%` }}
              />
            </div>
            <div className="mt-1 text-[11px] text-gray-400">
              {shippingLeft > 0
                ? `Spend ${formatMoney(shippingLeft)} more to unlock free shipping`
                : "You’ve unlocked free shipping!"}
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-300">
              <div className="h-20 w-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                <FiImage className="text-3xl text-gray-400" />
              </div>
              <div className="text-lg font-medium">Your cart is empty</div>
              <p className="text-sm text-gray-400 mt-1">Add items to get started</p>
            </div>
          ) : (
            cartItems.map((item) => {
              const id = item.id || item.productId;
              const img = item.images?.[0] || item.image;
              const qty = Number(item.quantity || 1);
              const unit = Number(item.price || 0);
              const line = unit * qty;

              return (
                <div
                  key={id}
                  className="group rounded-2xl bg-white/5 border border-white/10 p-3 flex gap-3 hover:bg-white/10 transition"
                >
                  <div className="h-16 w-16 rounded-xl bg-black/30 overflow-hidden flex items-center justify-center shrink-0">
                    {img ? (
                      <img src={img} alt={item.name} className="h-full w-full object-cover" />
                    ) : (
                      <FiImage className="text-gray-500" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="font-medium truncate">{item.name || "Unnamed Item"}</div>
                        {item?.label && (
                          <div className="text-xs text-gray-400 flex items-center gap-1">
                            <FiTag /> {item.label}
                          </div>
                        )}
                      </div>
                      <button
                        className="text-rose-300 hover:text-rose-200 inline-flex items-center gap-1 text-sm"
                        onClick={() => onRemove?.(id)}
                        title="Remove"
                      >
                        <FiTrash2 />
                      </button>
                    </div>

                    <div className="mt-1 flex items-center justify-between">
                      <div className="text-sm text-gray-300">
                        {formatMoney(unit)} <span className="text-gray-500">/ each</span>
                      </div>

                      {/* Quantity controls if onUpdateQty provided */}
                      {onUpdateQty ? (
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => handleMinus(item)}
                            className="h-7 w-7 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center"
                            aria-label="Decrease quantity"
                          >
                            <FiMinus />
                          </button>
                          <div className="min-w-[2ch] text-center text-sm">{qty}</div>
                          <button
                            onClick={() => handlePlus(item)}
                            className="h-7 w-7 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center"
                            aria-label="Increase quantity"
                          >
                            <FiPlus />
                          </button>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-300">Qty: {qty}</div>
                      )}
                    </div>

                    <div className="mt-1 text-sm">
                      <span className="text-gray-400">Line total:</span>{" "}
                      <span className="font-medium">{formatMoney(line)}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-white/5 rounded-bl-2xl">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-300">Subtotal</span>
            <span className="font-semibold">{formatMoney(subtotal)}</span>
          </div>
          <div className="mt-1 text-xs text-gray-400 flex items-center gap-2">
            <FiTruck /> {subtotal >= FREE_SHIPPING_THRESHOLD ? "Free shipping applied" : "Shipping calculated at checkout"}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2">
            <button
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 transition disabled:opacity-60"
              onClick={handleProceedToCheckout}
              disabled={!cartItems.length}
              title="Proceed to checkout"
            >
              <FiCreditCard />
              Proceed to Checkout
              <FiArrowRight />
            </button>

            {/* Optional quick order action using your existing endpoint */}
            <button
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition disabled:opacity-60"
              onClick={handleSubmitOrder}
              disabled={!cartItems.length || loading}
              title="Quick order"
            >
              {loading ? "Placing order..." : "Quick Order"}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default CartSidebar;