import React, { Suspense, useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";

// Eager-load Header so it shows instantly
import Header from "./Components/pages/Interface/Header.jsx";
import CartSidebar from "./Components/pages/utils/CardSideBar.jsx";

// Lazy-load pages for faster initial load
const HomePage = React.lazy(() => import("./Components/pages/Interface/HomePage.jsx"));
const Register = React.lazy(() => import("./Components/pages/Interface/Register.jsx"));
const Login = React.lazy(() => import("./Components/pages/Interface/Login.jsx"));
const Product = React.lazy(() => import("./Components/pages/ProductLayouts/Product.jsx"));
const Contact = React.lazy(() => import("./Components/pages/Interface/Contact.jsx"));
const ForgotPass = React.lazy(() => import("./Components/pages/Interface/ForgetPass.jsx"));
const AdminHome = React.lazy(() => import("./Components/pages/Adminpage/AdminHome.jsx"));
const PlaceOrder = React.lazy(() => import("./Components/pages/ProductLayouts/PlaceOrder.jsx"));
// Optional: a Cart page if you have one
// const Cart = React.lazy(() => import("./Components/pages/ProductLayouts/Cart.jsx"));

// Minimal loader (you can import your Loader component instead)
function CenteredLoader() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-4 border-white/10" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-400 border-r-fuchsia-400 animate-spin" />
      </div>
    </div>
  );
}

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

// Protected route (checks token; set requireAdmin to true to enforce admin role)
function ProtectedRoute({ children, requireAdmin = false }) {
  const token = localStorage.getItem("token");
  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  }, []);

  if (!token) return <Navigate to="/Login" replace />;
  if (requireAdmin && (user?.usertype || "").toLowerCase() !== "admin") {
    return <Navigate to="/" replace />;
  }
  return children;
}

// 404 page
function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center text-center">
      <div>
        <div className="text-5xl font-bold">404</div>
        <div className="text-gray-400 mt-2">Page not found</div>
      </div>
    </div>
  );
}

function AppShell({ children }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0b0e14] via-[#0d1117] to-[#0a0d12] text-white">
      {children}
    </div>
  );
}

function App() {
  const [isCartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart") || "[]");
    } catch {
      return [];
    }
  });

  // Persist cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const totalItems = cartItems.reduce((sum, it) => sum + Number(it.quantity || 1), 0);

  const handleAddToCart = (product) => {
    const id = product.id ?? product.productId;
    setCartItems((prev) => {
      const idx = prev.findIndex((it) => (it.id ?? it.productId) === id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: Number(copy[idx].quantity || 1) + 1 };
        return copy;
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((it) => (it.id ?? it.productId) !== id));
  };

  const handleUpdateQty = (id, nextQty) => {
    setCartItems((prev) =>
      prev.map((it) =>
        (it.id ?? it.productId) === id ? { ...it, quantity: Math.max(1, Number(nextQty || 1)) } : it
      )
    );
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <AppShell>
          <Header onCartClick={() => setCartOpen(true)} cartItemCount={totalItems} />
          <Toaster position="top-right" />
          <ScrollToTop />

          <Suspense fallback={<CenteredLoader />}>
            <Routes>
              <Route path="/" element={<HomePage handleAddToCart={handleAddToCart} />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/Product" element={<Product handleAddToCart={handleAddToCart} />} />
              <Route path="/Contact" element={<Contact />} />
              <Route path="/ForgotPass" element={<ForgotPass />} />
              <Route path="/PlaceOrder" element={<PlaceOrder />} />

              {/* Admin */}
              <Route
                path="/AdminHome/*"
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminHome />
                  </ProtectedRoute>
                }
              />

              {/* Optional cart page
              <Route path="/Cart" element={<Cart />} /> */}

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>

          <CartSidebar
            isOpen={isCartOpen}
            onClose={() => setCartOpen(false)}
            cartItems={cartItems}
            onRemove={handleRemoveFromCart}
            onUpdateQty={handleUpdateQty}
          />
        </AppShell>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;