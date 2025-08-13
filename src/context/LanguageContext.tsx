import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Lang = 'ar' | 'en';

type I18nDict = Record<string, string>;

type Translations = Record<Lang, I18nDict>;

const translations: Translations = {
  ar: {
    appName: 'نظام اداره الملفات',
    home: 'الرئيسية',
    reports: 'تقارير العقارات',
    mekyasReports: 'تقارير مقياس',
    viewReports: 'عرض التقارير',
    noqraReports: 'تقارير نقرة',
    dashboard: 'لوحة الإدارة',
    settings: 'إعدادات المستخدم',
    support: 'المساعدة والدعم',
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    language: 'اللغة',
    english: 'الإنجليزية',
    arabic: 'العربية',
  },
  en: {
    appName: 'Reports Management System',
    home: 'Home',
    reports: 'Reports',
    mekyasReports: 'Mekyas Reports',
    viewReports: 'View Reports',
    noqraReports: 'Noqra Reports',
    dashboard: 'Dashboard',
    settings: 'User Settings',
    support: 'Help & Support',
    login: 'Login',
    logout: 'Logout',
    language: 'Language',
    english: 'English',
    arabic: 'Arabic',
  },
};

interface LanguageContextValue {
  lang: Lang;
  dir: 'rtl' | 'ltr';
  t: (key: string) => string;
  setLang: (lang: Lang) => void;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem('lang');
    if (saved === 'ar' || saved === 'en') return saved;
    // Default to Arabic; you can switch to browser language if needed
    return 'ar';
  });

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  const setLang = (l: Lang) => setLangState(l);
  const toggle = () => setLangState(prev => (prev === 'ar' ? 'en' : 'ar'));

  useEffect(() => {
    localStorage.setItem('lang', lang);
    if (typeof document !== 'undefined') {
      document.documentElement.dir = dir;
      document.documentElement.lang = lang;
    }
  }, [lang, dir]);

  const t = useMemo(() => {
    const dict = translations[lang] || {};
    return (key: string) => dict[key] ?? key;
  }, [lang]);

  const value = useMemo<LanguageContextValue>(() => ({ lang, dir, t, setLang, toggle }), [lang, dir, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
};

export const useTr = () => {
  const { lang } = useLanguage();
  return (ar: string, en: string) => (lang === 'ar' ? ar : en);
};

