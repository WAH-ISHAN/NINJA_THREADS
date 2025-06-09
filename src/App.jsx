import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import HomePage from './Components/pages/Interface/HomePage.jsx';
import Header from './Components/pages/Interface/Header.jsx';
import Register from "./Components/pages/Interface/Register.jsx";
import Login from './Components/pages/Interface/Login.jsx';
import Product from './Components/pages/ProductLayouts/Product.jsx';
import Contact from "./Components/pages/Interface/Contact.jsx";
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ForgotPass from './Components/pages/Interface/ForgetPass.jsx';
import CartSidebar from './Components/pages/utils/CardSideBar.jsx'; 
import AdminHome from './Components/pages/Adminpage/AdminHome.jsx';

function App() {
  const [isCartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    const existing = cartItems.find(item => item.id === product.id);
    if (existing) {
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    setCartOpen(true);
  };

  const handleRemoveFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
       
        <Header
          onCartClick={() => setCartOpen(true)}
          cartItemCount={cartItems.length}
        />
        <Toaster position="top-right" />
        <Routes path="/">
          <Route path="/AdminHome/*" element={<AdminHome />} />
          <Route path="/" element={<HomePage handleAddToCart={handleAddToCart} />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Product" element={<Product handleAddToCart={handleAddToCart} />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/ForgotPass" element={<ForgotPass />} />
        </Routes>
        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setCartOpen(false)}
          cartItems={cartItems}
          onRemove={handleRemoveFromCart}
        />
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
