import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage.jsx';
import Header from './Components/Header.jsx';
import Register from "./Components/pages/Register.jsx"
import Login from './Components/pages/Login.jsx';
import Introduction from './Components/pages/Introduction.jsx';
import Product from './Components/pages/Product.jsx';
import Contact from './Components/pages/Contact.jsx';



function App() {
  return (
    <BrowserRouter>
      <Header />
      <Toaster position="top-right"/>
      <Routes path="/*">
        <Route path="/*" element={<HomePage />} />
        <Route path="/admin/*" element={<AdminPage/>}/>
        <Route path="/Login" element={<Login/>} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/Introduction" element={<Introduction/>}/>
        <Route path="/Product" element={<Product />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
