import React from "react";
import { useParams } from "react-router-dom";

// Örnek ürün verisi (gerçek uygulamada API'den gelir)
const products = [
  {
    id: "1",
    name: "Erkek Gömlek",
    price: "299 TL",
    description: "Klasik kesim, pamuklu erkek gömlek.",
    stock: 12,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Beyaz", img: "/img/erkekGömlek.jpg" },
      { name: "Mavi", img: "/img/erkekGömlek.jpg" }
    ]
  },
  {
    id: "2",
    name: "Erkek Pantolon",
    price: "399 TL",
    description: "Rahat ve şık erkek pantolon.",
    stock: 8,
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Siyah", img: "/img/erkekGiyim.jpg" },
      { name: "Lacivert", img: "/img/erkekGiyim.jpg" }
    ]
  }
];

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [selectedColor, setSelectedColor] = React.useState(0);
  const [selectedSize, setSelectedSize] = React.useState(product?.sizes[0] || "");

  if (!product) return <div className="container mt-5">Ürün bulunamadı.</div>;

  return (
    <div className="container mt-5 pt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.colors[selectedColor].img}
            alt={product.name}
            className="img-fluid mb-3 border rounded"
            style={{ maxHeight: 400, objectFit: "cover" }}
          />
          <div className="d-flex gap-2 mb-3">
            {product.colors.map((color, idx) => (
              <img
                key={color.name}
                src={color.img}
                alt={color.name}
                className={`border rounded ${selectedColor === idx ? "border-primary" : ""}`}
                style={{ width: 60, height: 60, objectFit: "cover", cursor: "pointer" }}
                onClick={() => setSelectedColor(idx)}
              />
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <h4 className="text-success mb-3">{product.price}</h4>
          <div className="mb-2">
            <strong>Beden:</strong>
            <div className="d-flex gap-2 mt-1">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`btn btn-outline-dark btn-sm ${selectedSize === size ? "active" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-2">
            <strong>Stok:</strong> {product.stock} adet
          </div>
          <button className="btn btn-primary mt-3" disabled={product.stock === 0}>
            Sepete Ekle
          </button>
        </div>
      </div>
    </div>
  );
}
