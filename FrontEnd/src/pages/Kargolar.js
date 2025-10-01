
import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

export default function Kargolar() {
  const { t } = useTranslation();
  const [kargos, setKargos] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/kargos")
      .then(res => res.json())
      .then(data => setKargos(data));
  }, []);

  return (
    <div className="container mt-5 pt-5">
      <h2 className="mb-4">{t('kargolar.title')}</h2>
      {kargos.length === 0 && <div>{t('kargolar.empty')}</div>}
      <div className="row">
        {kargos.map(kargo => (
          <div className="col-12 mb-4" key={kargo.id}>
            <div className="card shadow-sm p-3" style={{borderRadius: 18}}>
              <div className="card-body">
                <h5 className="card-title">{kargo.name}</h5>
                <p className="mb-1"><strong>{t('kargolar.phone')}</strong> {kargo.phone}</p>
                <p className="mb-1"><strong>{t('kargolar.email')}</strong> {kargo.email}</p>
                <p className="mb-1"><strong>{t('kargolar.address')}</strong> {kargo.address}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
