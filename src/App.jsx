import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage.jsx';
import Header from './Components/Header.jsx';
import Register from "./Components/pages/Register.jsx"
import Login from './Components/pages/Login.jsx';
import Introduction from './Components/pages/Introduction.jsx';
import Product from './Components/pages/Product.jsx';
import Contact from './Components/pages/Contact.jsx';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';


function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <BrowserRouter>
      <Header />
      <Toaster position="top-right"/>
      <Routes path="/*">
        <Route path="/*" element={<HomePage />} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/Introduction" element={<Introduction/>}/>
        <Route path="/Product" element={<Product />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
