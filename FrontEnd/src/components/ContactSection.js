import React from "react";

export default function ContactSection() {
  return (
    <section id="contact-section" className="bg-light py-5">
      <div className="container">
        <h2 className="mb-4">İletişim</h2>
        <p>Bize ulaşmak için aşağıdaki bilgileri kullanabilirsiniz:</p>
        <ul className="list-unstyled">
          <li><strong>Email:</strong> info@tekstilmagaza.com</li>
          <li><strong>Telefon:</strong> +90 555 123 45 67</li>
          <li><strong>Adres:</strong> İstanbul, Türkiye</li>
        </ul>
      </div>
    </section>
  );
}
