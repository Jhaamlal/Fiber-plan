import { Zap, Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './Header.css';

export default function Header() {
  const { t, language, toggleLanguage } = useLanguage();

  return (
    <header className="header">
      <div className="header__content">
        <div className="header__logo">
          <div className="header__icon-wrapper">
            <Zap size={24} className="header__icon" />
          </div>
          <div className="header__text">
            <h1 className="header__title">{t('header.title')}</h1>
            <p className="header__subtitle">{t('header.subtitle')}</p>
          </div>
        </div>
        
        <button 
          className="header__lang-toggle" 
          onClick={toggleLanguage}
          aria-label="Toggle Language"
        >
          <Languages size={18} />
          <span className="header__lang-text">
            {language === 'en' ? 'हिंदी' : 'English'}
          </span>
        </button>
      </div>
    </header>
  );
}
