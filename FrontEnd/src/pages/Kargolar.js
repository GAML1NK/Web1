import React, { useEffect, useState } from "react";

export default function Kargolar() {
  const [kargos, setKargos] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/kargos")
      .then(res => res.json())
      .then(data => setKargos(data));
  }, []);

  return (
    <div className="container mt-5 pt-5">
      <h2 className="mb-4">Kargo Firmaları</h2>
      {kargos.length === 0 && <div>Kargo bulunamadı.</div>}
      <div className="row">
        {kargos.map(kargo => (
          <div className="col-12 mb-4" key={kargo.id}>
            <div className="card shadow-sm p-3" style={{borderRadius: 18}}>
              <div className="card-body">
                <h5 className="card-title">{kargo.name}</h5>
                <p className="mb-1"><strong>Telefon:</strong> {kargo.phone}</p>
                <p className="mb-1"><strong>Email:</strong> {kargo.email}</p>
                <p className="mb-1"><strong>Adres:</strong> {kargo.address}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
