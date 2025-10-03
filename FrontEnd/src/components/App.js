import React from "react";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import MyNavbar from "./Navbar";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Footer from "./Footer";
import Home from "../pages/Home";
import Categories from "../pages/Categories";
import Contact from "../pages/Contact";
import ProductDetail from "../pages/ProductDetail";
import CategoryProducts from "../pages/CategoryProducts";
import Kargolar from "../pages/Kargolar";
import LiveSupport from "./LiveSupport";
import AdminPanel from "../pages/AdminPanel";
import Login from "../pages/Login";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [auth, setAuth] = useState({ token: localStorage.getItem('token') || '', role: localStorage.getItem('role') || '' });
  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  React.useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);
  return (
    <div>
      <MyNavbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} auth={auth} setAuth={setAuth} />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kategoriler" element={<Categories />} />
          <Route path="/iletisim" element={<Contact />} />
          <Route path="/urun/:id" element={<ProductDetail />} />
          <Route path="/urunler/:kategori" element={<CategoryProducts />} />
          <Route path="/admin" element={auth.role === 'ADMIN' ? <AdminPanel /> : <Login setAuth={setAuth} />} />
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/kargolar" element={<Kargolar />} />
        </Routes>
      </div>
      <Footer />
      <LiveSupport />
    </div>
  );
}

export default App;
