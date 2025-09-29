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
import LiveSupport from "./LiveSupport";
import AdminPanel from "../pages/AdminPanel";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  // Body'ye dark-mode sınıfı ekle
  React.useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);
  return (
    <div>
      {/* Sabit navbar, darkMode ve toggleDarkMode prop olarak geçiliyor */}
      <MyNavbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Orta içerik */}
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kategoriler" element={<Categories />} />
          <Route path="/iletisim" element={<Contact />} />
          <Route path="/urun/:id" element={<ProductDetail />} />
          <Route path="/urunler/:kategori" element={<CategoryProducts />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>

      {/* Sabit footer */}
      <Footer />
      <LiveSupport />
    </div>
  );
}

export default App;
