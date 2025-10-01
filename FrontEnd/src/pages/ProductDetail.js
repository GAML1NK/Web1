
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function ProductDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => {
        const all = Object.values(data).flat();
        const found = all.find((p) => String(p.id) === String(id));
        setProduct(found);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="container mt-5">{t('categories.loading')}</div>;
  if (!product) return <div className="container mt-5">{t('productDetail.notFound')}</div>;

  return (
    <div className="container mt-5 pt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.imageUrl ? (product.imageUrl.startsWith('/uploads') ? `http://localhost:3001${product.imageUrl}` : product.imageUrl) : "/img/erkekGiyim.jpg"}
            alt={product.name}
            className="img-fluid mb-3 border rounded"
            style={{ maxHeight: 400, objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <div className="mb-3">
            <label>{t('productDetail.variants')}</label>
            {product.variants && product.variants.length > 0 ? (
              <div className="row">
                  {product.variants.map((variant, idx) => (
                    <div key={idx} className="col-12 mb-3">
                      <strong>Renk:</strong> {variant.color}, <strong>Beden:</strong> {variant.size}, <strong>Stok:</strong> {variant.stock}
                    </div>
                  ))}
              </div>
            ) : (
              <span>{t('productDetail.noVariant')}</span>
            )}
          </div>
          <button className="btn btn-success">{t('productDetail.addToCart')}</button>
        </div>
      </div>
    </div>
  );
}