
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Sadece erkek giyim kategorilerini çek
    fetch("http://localhost:3001/categories")
      .then((res) => res.json())
      .then((data) => {
        // Erkek giyim ile ilgili kategorileri filtrele (örnek: Gömlek, Pantolon, Ceket, Tişört, Takım Elbise)
        const erkekKategoriler = data.filter(cat => [
          "Gömlek", "Pantolon", "Ceket", "Tişört", "Takım Elbise"
        ].includes(cat.name));
        setCategories(erkekKategoriler);
      });
  }, []);

  return (
    <div className="container mt-5 pt-5">
      <h1 className="mb-4">Kategoriler</h1>
      <div className="row">
        {categories.map((cat) => (
          <div className="col-md-4 mb-4" key={cat.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={"/img/erkekGiyim.jpg"}
                className="card-img-top w-100"
                alt={cat.name}
                style={{ height: "550px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{cat.name}</h5>
                <p className="card-text flex-grow-1">Erkek giyim ürünleri</p>
                <Link
                  to={`/urunler/${cat.name.toLowerCase()}`}
                  className="btn btn-outline-primary mt-auto"
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
