import React, { useState } from "react";

const faqList = [
  { q: "Kargo kaç günde gelir?", a: "Siparişleriniz aynı gün kargoya verilir ve genellikle 1-3 iş günü içinde teslim edilir." },
  { q: "İade nasıl yapılır?", a: "Ürünü teslim aldıktan sonra 14 gün içinde iade edebilirsiniz. Detaylar için iade politikamıza bakınız." },
  { q: "Beden değişimi mümkün mü?", a: "Evet, stokta olması durumunda beden değişimi yapabilirsiniz." },
];

const WHATSAPP_NUMBER = "905551234567"; // Başında ülke kodu olmadan yazmayın

export default function LiveSupport() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Canlı destek yuvarlak butonu */}
      <button
        className="live-support-btn"
        onClick={() => setOpen((v) => !v)}
        aria-label="Canlı Destek Aç"
      >
        <span role="img" aria-label="destek">💬</span>
      </button>

      {/* Açılır canlı destek paneli */}
      {open && (
        <div className="live-support-panel">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <strong>Sıkça Sorulan Sorular</strong>
            <button className="btn-close" onClick={() => setOpen(false)} aria-label="Kapat" style={{fontSize: '1.2rem'}}></button>
          </div>
          <ul className="list-unstyled mb-3">
            {faqList.map((item, i) => (
              <li key={i} className="mb-2">
                <strong>{item.q}</strong>
                <div style={{fontSize: '0.97em'}}>{item.a}</div>
              </li>
            ))}
          </ul>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-success w-100"
          >
            WhatsApp Canlı Destek
          </a>
        </div>
      )}
    </>
  );
}
