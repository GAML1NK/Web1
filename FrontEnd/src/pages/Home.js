
import Hero from "../components/Hero";
import Products from "../components/Products";
import ContactSection from "../components/ContactSection";
import a from '../App.css';

export default function Home() {
  return (
    <>
      <Hero />
      {/* Proje Tanıtım Bölümü */}
      <section className="bg-white py-5 border-bottom home-info-section">
        <div className="container">
          <h2 className="mb-3 home-info-title">Neden Tekstil Mağazası?</h2>
          <p className="lead home-info-lead">Tekstil Mağazası, en yeni moda ürünlerini uygun fiyatlarla sunar. Geniş ürün yelpazemiz, hızlı teslimat ve müşteri memnuniyeti odaklı hizmet anlayışımız ile alışverişinizi keyfe dönüştürüyoruz.</p>
          <ul className="list-unstyled row">
            <li className="col-md-4 mb-3">
              <div className="h-100 p-3 border rounded bg-light">
                <strong>Güvenli Alışveriş</strong>
                <p className="mb-0">SSL sertifikalı, güvenli ödeme altyapısı.</p>
              </div>
            </li>
            <li className="col-md-4 mb-3">
              <div className="h-100 p-3 border rounded bg-light">
                <strong>Hızlı Kargo</strong>
                <p className="mb-0">Siparişleriniz aynı gün kargoda.</p>
              </div>
            </li>
            <li className="col-md-4 mb-3">
              <div className="h-100 p-3 border rounded bg-light">
                <strong>7/24 Destek</strong>
                <p className="mb-0">Her zaman ulaşabileceğiniz müşteri hizmetleri.</p>
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
