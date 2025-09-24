import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  tr: {
    translation: {
      "home": "Ana Sayfa",
      "categories": "Kategoriler",
      "contact": "İletişim",
      "seeProducts": "Ürünleri Gör",
      "featuredProducts": "Öne Çıkan Ürünler",
      "viewProduct": "Ürünü Gör",
      "notFound": "Ürün bulunamadı.",
      "categoryProducts": "{{category}} Kategorisi Ürünleri",
      "noProductsInCategory": "Bu kategoride ürün bulunamadı.",
      "addToCart": "Sepete Ekle",
      "stock": "Stok",
      "size": "Beden",
      "contactTitle": "İletişim",
      "contactDesc": "Bize ulaşmak için aşağıdaki bilgileri kullanabilirsiniz:",
      "email": "Email",
      "phone": "Telefon",
      "address": "Adres",
      "addressValue": "İstanbul, Türkiye",
      "footer": "© 2025 Tekstil Mağazası | Tüm hakları saklıdır",
      "faq": "Sıkça Sorulan Sorular",
      "liveSupport": "Canlı Destek Aç",
      "whatsappSupport": "WhatsApp Canlı Destek",
      "projectTitle": "Neden Tekstil Mağazası?",
      "projectDesc": "Tekstil Mağazası, en yeni moda ürünlerini uygun fiyatlarla sunar. Geniş ürün yelpazemiz, hızlı teslimat ve müşteri memnuniyeti odaklı hizmet anlayışımız ile alışverişinizi keyfe dönüştürüyoruz.",
      "secureShopping": "Güvenli Alışveriş",
      "secureShoppingDesc": "SSL sertifikalı, güvenli ödeme altyapısı.",
      "fastShipping": "Hızlı Kargo",
      "fastShippingDesc": "Siparişleriniz aynı gün kargoda.",
      "support247": "7/24 Destek",
      "support247Desc": "Her zaman ulaşabileceğiniz müşteri hizmetleri.",
      "productName1": "Kadın Elbise",
      "productName2": "Erkek Gömlek",
      "productName3": "Çocuk Tişört",
      "categoryWomen": "Kadın Giyim",
      "categoryMen": "Erkek Giyim",
      "categoryKids": "Çocuk Giyim",
      "categoryWomenDesc": "Elbise, bluz, pantolon ve daha fazlası.",
      "categoryMenDesc": "Gömlek, tişört, ceket ve daha fazlası.",
      "categoryKidsDesc": "Çocuklar için rahat ve şık ürünler.",
      "productDetailName1": "Erkek Gömlek",
      "productDetailDesc1": "Klasik kesim, pamuklu erkek gömlek.",
      "productDetailName2": "Erkek Pantolon",
      "productDetailDesc2": "Rahat ve şık erkek pantolon.",
      "stockUnit": "adet"
    }
  },
  en: {
    translation: {
      "home": "Home",
      "categories": "Categories",
      "contact": "Contact",
      "seeProducts": "See Products",
      "featuredProducts": "Featured Products",
      "viewProduct": "View Product",
      "notFound": "Product not found.",
      "categoryProducts": "{{category}} Category Products",
      "noProductsInCategory": "No products found in this category.",
      "addToCart": "Add to Cart",
      "stock": "Stock",
      "size": "Size",
      "contactTitle": "Contact",
      "contactDesc": "You can contact us using the information below:",
      "email": "Email",
      "phone": "Phone",
      "address": "Address",
      "addressValue": "Istanbul, Turkey",
      "footer": "© 2025 Textile Store | All rights reserved",
      "faq": "Frequently Asked Questions",
      "liveSupport": "Open Live Support",
      "whatsappSupport": "WhatsApp Live Support",
      "projectTitle": "Why Textile Store?",
      "projectDesc": "Textile Store offers the latest fashion products at affordable prices. With our wide product range, fast delivery, and customer satisfaction-oriented service, we turn your shopping into a pleasure.",
      "secureShopping": "Secure Shopping",
      "secureShoppingDesc": "SSL certified, secure payment infrastructure.",
      "fastShipping": "Fast Shipping",
      "fastShippingDesc": "Your orders are shipped the same day.",
      "support247": "24/7 Support",
      "support247Desc": "Customer service you can always reach.",
      "productName1": "Women's Dress",
      "productName2": "Men's Shirt",
      "productName3": "Kids T-shirt",
      "categoryWomen": "Women's Clothing",
      "categoryMen": "Men's Clothing",
      "categoryKids": "Kids' Clothing",
      "categoryWomenDesc": "Dress, blouse, pants and more.",
      "categoryMenDesc": "Shirt, t-shirt, jacket and more.",
      "categoryKidsDesc": "Comfortable and stylish products for kids.",
      "productDetailName1": "Men's Shirt",
      "productDetailDesc1": "Classic fit, cotton men's shirt.",
      "productDetailName2": "Men's Pants",
      "productDetailDesc2": "Comfortable and stylish men's pants.",
      "stockUnit": "pcs"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'tr',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
