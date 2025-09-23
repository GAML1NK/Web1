import React from "react";
import ProductCard from "./ProductCard";
import '../App.css';

const products = [
  { id: 1, name: "Kadın Elbise", price: "499 TL", img: "/img/kadınElbise.jpg" },
  { id: 2, name: "Erkek Gömlek", price: "299 TL", img: "/img/erkekGömlek.jpg" },
  { id: 3, name: "Çocuk Tişört", price: "199 TL", img: "/img/cocukKıyafet.jpg" },
];

export default function Products() {
  return (
    <div className="container my-5 products-section">
      <h2 className="mb-4">Öne Çıkan Ürünler</h2>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4 product-card" key={product.id}>
            <ProductCard id={product.id} name={product.name} price={product.price} img={product.img} />
          </div>
        ))}
      </div>
    </div>
  );
}
