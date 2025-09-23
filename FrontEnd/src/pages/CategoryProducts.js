import React from "react";
import { Link, useParams } from "react-router-dom";

// Örnek ürün verisi
const allProducts = [
  {
    id: 1,
    name: "Beyaz Klasik Gömlek",
    price: "299 TL",
    img: "/img/erkekGömlek.jpg",
    category: "gomlek"
  },
  {
    id: 2,
    name: "Mavi Slim Fit Gömlek",
    price: "319 TL",
    img: "/img/erkekGömlek.jpg",
    category: "gomlek"
  },
  {
    id: 3,
    name: "Siyah Keten Gömlek",
    price: "349 TL",
    img: "/img/erkekGömlek.jpg",
    category: "gomlek"
  },
  {
    id: 4,
    name: "Lacivert Pantolon",
    price: "399 TL",
    img: "/img/erkekGiyim.jpg",
    category: "pantolon"
  },
  {
    id: 5,
    name: "Siyah Slim Fit Pantolon",
    price: "429 TL",
    img: "/img/erkekGiyim.jpg",
    category: "pantolon"
  },
  {
    id: 6,
    name: "Gri Klasik Pantolon",
    price: "389 TL",
    img: "/img/erkekGiyim.jpg",
    category: "pantolon"
  }
];

export default function CategoryProducts() {
  const { kategori } = useParams();
  const products = allProducts.filter((p) => p.category === kategori);

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
                src={product.img}
                className="card-img-top w-100"
                alt={product.name}
                style={{ height: "350px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.price}</p>
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
