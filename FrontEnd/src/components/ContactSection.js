import React from "react";
import { useTranslation } from 'react-i18next';

export default function ContactSection() {
  const { t } = useTranslation();
  return (
    <section id="contact-section" className="bg-light py-5">
      <div className="container">
        <h2 className="mb-4">{t('contact.title')}</h2>
        <p>{t('contact.desc2')}</p>
        <ul className="list-unstyled">
          <li><strong>{t('contact.email')}</strong> info@tekstilmagaza.com</li>
          <li><strong>{t('contact.phone')}</strong> +90 555 123 45 67</li>
          <li><strong>{t('contact.address')}</strong> {t('contact.addressValue')}</li>
        </ul>
      </div>
    </section>
  );
}
