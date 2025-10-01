

import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import '../App.css';
import { useTranslation } from 'react-i18next';

export default function Products() {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/products")
      .then((res) => {
        // Tüm kategorilerden ürünleri birleştir
        const all = Object.values(res.data).flat();
        setProducts(all);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container my-5 products-section">
      <h2 className="mb-4">{t('products.featured')}</h2>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4 product-card" key={product.id}>
            <ProductCard id={product.id} name={product.name} price={product.price || ""} img={product.imageUrl || "/img/erkekGiyim.jpg"} />
          </div>
        ))}
      </div>
    </div>
  );
}
