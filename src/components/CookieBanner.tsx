import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface CookieBannerProps {
  language: Language;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ language }) => {
  const [isVisible, setIsVisible] = useState(false);
  const t = TRANSLATIONS[language]?.cookie || TRANSLATIONS.nl.cookie;

  useEffect(() => {
    try {
      const consent = localStorage.getItem('auto_sale_cookie_consent');
      if (!consent) {
        setIsVisible(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('auto_sale_cookie_consent', 'accepted');
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('auto_sale_cookie_consent', 'essential_only');
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-16 md:bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-[#1A1A1A] text-white p-5 rounded-3xl shadow-2xl border border-zinc-800 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-start gap-3.5">
        <div className="p-2 rounded-2xl bg-[#FF6B00]/10 text-[#FF6B00] shrink-0 mt-0.5">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm">{t.title}</h4>
            <button
              onClick={handleDecline}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed font-normal">
            {t.text}
          </p>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleAccept}
              className="flex-1 py-2 px-3 bg-[#FF6B00] hover:bg-orange-600 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-sm"
            >
              {t.accept}
            </button>
            <button
              onClick={handleDecline}
              className="py-2 px-3 bg-zinc-800 hover:bg-zinc-700 text-gray-300 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
            >
              {t.decline}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
