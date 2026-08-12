import { ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './Footer.css';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer__content">
        <ShieldCheck size={16} className="footer__icon" />
        <p>{t('footer.text')}</p>
      </div>
    </footer>
  );
}
