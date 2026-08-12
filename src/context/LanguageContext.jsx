import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Try to load from localStorage, default to 'en'
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('app_language');
    return saved === 'hi' ? 'hi' : 'en';
  });

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('app_language', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  }, []);

  const t = useCallback((key, replacements = {}) => {
    const translationData = translations[key];
    
    if (!translationData) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }

    let text = translationData[language] || translationData.en || key;

    // Handle string replacements if any (e.g. {count})
    Object.keys(replacements).forEach(rKey => {
      text = text.replace(`{${rKey}}`, replacements[rKey]);
    });

    return text;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
