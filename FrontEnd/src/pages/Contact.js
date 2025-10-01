
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();
  return (
    <div className="container mt-5 pt-5 contact-box">
      <h1>{t('contact.title')}</h1>
      <p>{t('contact.desc')}</p>
    </div>
  );
}
