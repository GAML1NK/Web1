
import Hero from "../components/Hero";
import Products from "../components/Products";
import ContactSection from "../components/ContactSection";
import a from '../App.css';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  return (
    <>
      <Hero />
      {/* Proje Tanıtım Bölümü */}
      <section className="bg-white py-5 border-bottom home-info-section">
        <div className="container">
          <h2 className="mb-3 home-info-title">{t('home.title')}</h2>
          <p className="lead home-info-lead">{t('home.lead')}</p>
          <ul className="list-unstyled row">
            <li className="col-md-4 mb-3">
              <div className="h-100 p-3 border rounded info-card">
                <strong>{t('home.safeShopping')}</strong>
                <p className="mb-0">{t('home.safeShoppingDesc')}</p>
              </div>
            </li>
            <li className="col-md-4 mb-3">
              <div className="h-100 p-3 border rounded info-card">
                <strong>{t('home.fastShipping')}</strong>
                <p className="mb-0">{t('home.fastShippingDesc')}</p>
              </div>
            </li>
            <li className="col-md-4 mb-3">
              <div className="h-100 p-3 border rounded info-card">
                <strong>{t('home.support')}</strong>
                <p className="mb-0">{t('home.supportDesc')}</p>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <Products />
      <ContactSection />
    </>
  );
}
