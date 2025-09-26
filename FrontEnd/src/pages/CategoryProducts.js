
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function CategoryProducts() {
  const { kategori } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => {
        // Kategori adını eşleştirerek ilgili ürünleri filtrele
        const catKey = kategori.charAt(0).toUpperCase() + kategori.slice(1);
        const catProducts = data[catKey] || [];
        setProducts(catProducts);
      });
  }, [kategori]);

  return (
    <div className="container mt-5 pt-5">
      <h2 className="mb-4 text-capitalize">{kategori} Kategorisi Ürünleri</h2>
      <div className="row">
        {products.length === 0 && (
          <div className="col-12">Bu kategoride ürün bulunamadı.</div>
        )}
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card h-100">
              <img
                src={product.imageUrl || "/img/erkekGiyim.jpg"}
                className="card-img-top w-100"
                alt={product.name}
                style={{ height: "350px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.price || ""}</p>
                <Link to={`/urun/${product.id}`} className="btn btn-primary mt-auto">
                  Ürünü Gör
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
