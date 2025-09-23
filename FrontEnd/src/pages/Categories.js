import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Kadın Giyim", desc: "Elbise, bluz, pantolon ve daha fazlası.", img: "/img/kadınGiyim.jpg" },
    { id: 2, name: "Erkek Giyim", desc: "Gömlek, tişört, ceket ve daha fazlası.", img: "/img/erkekGiyim.jpg" },
    { id: 3, name: "Çocuk Giyim", desc: "Çocuklar için rahat ve şık ürünler.", img: "/img/cocukGiyim.jpg" },
  ]);

  // Yeni kategori eklemek için örnek fonksiyon (ileride kullanılabilir)
  // const addCategory = (newCat) => setCategories([...categories, newCat]);

  return (
    <div className="container mt-5 pt-5">
      <h1 className="mb-4">Kategoriler</h1>
      <div className="row">
        {categories.map((cat) => (
          <div className="col-md-4 mb-4" key={cat.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={cat.img}
                className="card-img-top w-100"
                alt={cat.name}
                style={{ height: "550px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{cat.name}</h5>
                <p className="card-text flex-grow-1">{cat.desc}</p>
                <Link
                  to={cat.name === "Erkek Giyim" ? "/urunler/gomlek" : "#"}
                  className="btn btn-outline-primary mt-auto"
                  disabled={cat.name !== "Erkek Giyim"}
                >
                  Ürünleri Gör
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
