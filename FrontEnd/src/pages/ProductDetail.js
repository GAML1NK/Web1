import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
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

  if (loading) return <div className="container mt-5">Yükleniyor...</div>;
  if (!product) return <div className="container mt-5">Ürün bulunamadı.</div>;

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
            <label>Varyantlar:</label>
            {product.variants && product.variants.length > 0 ? (
              <ul>
                {product.variants.map((v) => (
                  <li key={v.id}>
                    Renk: {v.color}, Beden: {v.size}, Stok: {v.stock}
                  </li>
                ))}
              </ul>
            ) : (
              <span>Varyant yok</span>
            )}
          </div>
          <button className="btn btn-success">Sepete Ekle</button>
        </div>
      </div>
    </div>
  );
}