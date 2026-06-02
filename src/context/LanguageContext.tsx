'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { en } from '@/locales/en';
import { mm } from '@/locales/mm';

type LanguageContextType = {
  lang: 'en' | 'mm';
  t: typeof en;
  toggleLang: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<'en' | 'mm'>('en');
  
  useEffect(() => {
    const saved = localStorage.getItem('lang') as 'en' | 'mm';
    if (saved) setLang(saved);
  }, []);

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'mm' : 'en';
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  const t = lang === 'en' ? en : mm;

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
}
