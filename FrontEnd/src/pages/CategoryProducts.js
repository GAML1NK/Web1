

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function CategoryProducts() {
  const { t } = useTranslation();
  const { kategori } = useParams();
  const [products, setProducts] = useState([]);

  // Kullanıcı bilgisi localStorage'dan alınır
  const userId = localStorage.getItem('userId');
  const userRole = localStorage.getItem('role');

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => {
        const normalizedKategori = kategori.replace(/\s+/g, "").toLowerCase();
        let catProducts = [];
        Object.keys(data).forEach(key => {
          const normalizedKey = key.replace(/\s+/g, "").toLowerCase();
          if (normalizedKey === normalizedKategori) {
            catProducts = data[key];
          }
        });
        // Filtreleme: admin ise tüm ürünleri görür
        let filtered = catProducts;
        if (userRole !== 'ADMIN') {
          filtered = catProducts.filter(product => {
            if (product.visibility === 'ALL') return true;
            if (product.visibility === 'SPECIAL' && userId && product.allowedUserIds) {
              const allowed = product.allowedUserIds.split(',').map(id => id.trim());
              return allowed.includes(userId);
            }
            return false;
          });
        }
        setProducts(filtered);
      });
  }, [kategori, userId, userRole]);

  return (
    <div className="container mt-5 pt-5">
      <h2 className="mb-4 text-capitalize">{t('categoryProducts.title', { category: kategori })}</h2>
      <div className="row">
        {products.length === 0 && (
          <div className="col-12">{t('categoryProducts.empty')}</div>
        )}
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card h-100">
              <img
                src={product.imageUrl ? (product.imageUrl.startsWith('/uploads') ? `http://localhost:3001${product.imageUrl}` : product.imageUrl) : "/img/erkekGiyim.jpg"}
                className="card-img-top w-100"
                alt={product.name}
                style={{ height: "350px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.price || ""}</p>
                <Link to={`/urun/${product.id}`} className="btn btn-primary mt-auto">
                  {t('categoryProducts.see')}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
