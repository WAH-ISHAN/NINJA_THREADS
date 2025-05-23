import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/pages/Interface/HomePage.jsx';
import Header from './Components/pages/Interface/Header.jsx';
import Register from "./Components/pages/Interface/Register.jsx"
import Login from './Components/pages/Interface/Login.jsx';
import Product from './Components/pages/Interface/Product.jsx';
import Contact from "./Components/pages/Interface/Contact.jsx"
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AdminHome from './Components/pages/Adminpage/AdminHome.jsx';
import ForgotPass from './Components/pages/Interface/ForgetPass.jsx';


function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <BrowserRouter>
      <Header />
      <Toaster position="top-right"/>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/AdminHome" element={<AdminHome/>}/>
      <Route path="/Register" element={<Register/>} />
      <Route path="/Product" element={<Product />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/ForgotPass" element={<ForgotPass />} />
</Routes>
    </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
