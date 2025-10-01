
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function Categories() {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prodData, setProdData] = useState({});
  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3001/categories").then(res => res.json()),
      fetch("http://localhost:3001/products").then(res => res.json())
    ]).then(([catData, products]) => {
      setProdData(products);
      const kategorilerWithUrun = catData.filter(cat => {
        return products[cat.name] && products[cat.name].length > 0;
      });
      setCategories(kategorilerWithUrun);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="container mt-5">{t('categories.loading')}</div>;
  return (
    <div className="container mt-5 pt-5">
      <h1 className="mb-4">{t('categories.title')}</h1>
      <div className="row">
        {categories.map((cat) => {
          let imgSrc = "/img/erkekGiyim.jpg";
          const urunler = prodData[cat.name];
          if (urunler && urunler.length > 0) {
            const randomIndex = Math.floor(Math.random() * urunler.length);
            const urun = urunler[randomIndex];
            imgSrc = urun.imageUrl ? (urun.imageUrl.startsWith('/uploads') ? `http://localhost:3001${urun.imageUrl}` : urun.imageUrl) : imgSrc;
          }
          return (
            <div className="col-md-4 mb-4" key={cat.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={imgSrc}
                  className="card-img-top w-100"
                  alt={cat.name}
                  style={{ height: "550px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{cat.name}</h5>
                  <p className="card-text flex-grow-1">{t('categories.desc')}</p>
                  <Link
                    to={`/urunler/${cat.name.toLowerCase()}`}
                    className="btn btn-outline-primary mt-auto"
                  >
                    {t('categories.products')}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
