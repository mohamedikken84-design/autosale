import React, { useState, useEffect } from 'react';
import {
  Phone,
  MapPin,
  Heart,
  Menu,
  X,
  CarFront,
  Lock,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';
import { Language, Currency, DealershipSettings } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface NavbarProps {
  favoritesCount: number;
  onOpenFavorites: () => void;
  onOpenTestDrive: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  currentLang: Language;
  onSelectLanguage: (lang: Language) => void;
  currentCurrency: Currency;
  onSelectCurrency: (curr: Currency) => void;
  dealershipSettings: DealershipSettings;
  onOpenDealerLogin: () => void;
  isLoggedIn: boolean;
  onOpenDashboard: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  favoritesCount,
  onOpenFavorites,
  onOpenTestDrive,
  onNavigate,
  activeSection,
  currentLang,
  onSelectLanguage,
  currentCurrency,
  onSelectCurrency,
  dealershipSettings,
  onOpenDealerLogin,
  isLoggedIn,
  onOpenDashboard,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tNav = TRANSLATIONS[currentLang]?.nav || TRANSLATIONS.nl.nav;

  const navLinks = [
    { id: 'stock', label: tNav.stock },
    { id: 'overname', label: tNav.valuation },
    { id: 'financiering', label: tNav.financing },
    { id: 'over-ons', label: tNav.about },
    { id: 'contact', label: tNav.contact },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const handleAdminClick = () => {
    if (isLoggedIn) {
      onOpenDashboard();
    } else {
      onOpenDealerLogin();
    }
    setMobileMenuOpen(false);
  };

  const whatsappClean = (dealershipSettings.whatsapp || dealershipSettings.phoneRaw || '').replace(/[^0-9]/g, '');

  return (
    <>
      {/* Sleek Desktop Utility Top Strip */}
      <div className="hidden md:block bg-[#141416] text-zinc-300 border-b border-zinc-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 truncate">
            <a
              href={dealershipSettings.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors truncate"
            >
              <MapPin className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
              <span className="truncate">
                {dealershipSettings.address}, {dealershipSettings.zipCode} {dealershipSettings.city}
              </span>
            </a>
            <span aria-hidden="true" className="text-zinc-700">|</span>
            <a
              href={`tel:${dealershipSettings.phoneRaw}`}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap shrink-0 tabular-nums"
            >
              <Phone className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
              <span>{dealershipSettings.phone}</span>
            </a>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <select
              value={currentLang}
              onChange={(e) => onSelectLanguage(e.target.value as Language)}
              aria-label="Taal kiezen"
              className="bg-transparent text-zinc-300 hover:text-white text-xs font-semibold uppercase focus:outline-none cursor-pointer"
            >
              {(['nl', 'fr', 'en', 'de', 'es', 'it', 'pl'] as Language[]).map((lang) => (
                <option key={lang} value={lang} className="bg-zinc-900 text-white">
                  {lang.toUpperCase()}
                </option>
              ))}
            </select>

            <span aria-hidden="true" className="text-zinc-700">|</span>

            <select
              value={currentCurrency}
              onChange={(e) => onSelectCurrency(e.target.value as Currency)}
              aria-label="Valuta kiezen"
              className="bg-transparent text-zinc-300 hover:text-white text-xs font-semibold focus:outline-none cursor-pointer"
            >
              <option value="EUR" className="bg-zinc-900 text-white">€ EUR</option>
              <option value="USD" className="bg-zinc-900 text-white">$ USD</option>
              <option value="GBP" className="bg-zinc-900 text-white">£ GBP</option>
            </select>

            <span aria-hidden="true" className="text-zinc-700">|</span>

            <button
              type="button"
              onClick={handleAdminClick}
              className="inline-flex items-center gap-1.5 text-zinc-200 hover:text-[#FF6B00] font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Lock className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>{isLoggedIn ? 'Admin Dashboard' : 'Admin inloggen'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation Bar */}
      <header
        className={`sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b transition-shadow duration-200 ${
          isScrolled ? 'border-zinc-200 shadow-sm' : 'border-zinc-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 md:h-16 flex items-center justify-between gap-4 md:gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <button
            type="button"
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-2.5 text-left focus:outline-none cursor-pointer whitespace-nowrap shrink-0"
          >
            <img
              src="/logo2.png"
              alt="Auto Sale Antwerpen"
              className="w-8 h-8 md:w-9 md:h-9 object-contain shrink-0"
            />
            <span className="text-base md:text-lg font-extrabold tracking-tight text-zinc-950 font-['Outfit',sans-serif]">
              AUTO <span className="text-[#FF6B00]">SALE</span>
            </span>
          </button>

          {/* Zone 2: Clean single-line navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-zinc-600">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleLinkClick(link.id)}
                  className={`py-1.5 whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer border-b-2 ${
                    isActive
                      ? 'text-zinc-950 border-[#FF6B00] font-semibold'
                      : 'border-transparent hover:text-zinc-950'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Desktop Actions */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onOpenFavorites}
              className="relative min-h-[40px] min-w-[40px] px-3 rounded-xl border border-zinc-200 text-zinc-700 hover:text-[#FF6B00] hover:border-[#FF6B00] transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5 text-xs font-semibold whitespace-nowrap shrink-0"
              title={tNav.favorites}
              aria-label={tNav.favorites}
            >
              <Heart className="w-4 h-4" />
              {favoritesCount > 0 && (
                <span className="w-4 h-4 bg-[#FF6B00] text-white rounded-full text-[10px] font-bold flex items-center justify-center tabular-nums">
                  {favoritesCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={handleAdminClick}
              className="lg:inline-flex hidden items-center gap-1.5 min-h-[40px] px-3 rounded-xl border border-zinc-200 hover:border-zinc-400 text-zinc-700 hover:text-zinc-950 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
              title={isLoggedIn ? 'Dashboard openen' : 'Admin inloggen'}
            >
              <Lock className={`w-3.5 h-3.5 ${isLoggedIn ? 'text-[#FF6B00]' : 'text-zinc-500'}`} />
              <span>{isLoggedIn ? 'Dashboard' : 'Admin'}</span>
            </button>

            <button
              type="button"
              onClick={onOpenTestDrive}
              className="inline-flex items-center gap-2 min-h-[40px] bg-[#FF6B00] hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <CarFront className="w-4 h-4" />
              <span>{tNav.testDrive}</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl border border-zinc-200 text-zinc-800 hover:bg-zinc-100 cursor-pointer"
              aria-label="Menu openen"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Compact Header Actions (< 768px) */}
          <div className="flex md:hidden items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={onOpenFavorites}
              className="relative min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-zinc-700 hover:bg-zinc-100 cursor-pointer"
              aria-label={tNav.favorites}
            >
              <Heart className="w-5 h-5" />
              {favoritesCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#FF6B00] text-white rounded-full text-[9px] font-bold flex items-center justify-center tabular-nums">
                  {favoritesCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={handleAdminClick}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-zinc-700 hover:bg-zinc-100 cursor-pointer"
              aria-label="Admin inloggen"
              title="Admin inloggen"
            >
              <Lock className={`w-4 h-4 ${isLoggedIn ? 'text-[#FF6B00]' : 'text-zinc-700'}`} />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border border-zinc-200 text-zinc-900 bg-zinc-50 hover:bg-zinc-100 focus:outline-none cursor-pointer"
              aria-label="Menu openen"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Slide-Down Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-zinc-200 bg-white px-4 pt-3 pb-5 space-y-4 shadow-xl max-h-[calc(100vh-3.5rem)] overflow-y-auto">
            {/* Language & Currency Selectors */}
            <div className="grid grid-cols-2 gap-2.5">
              <select
                value={currentLang}
                onChange={(e) => onSelectLanguage(e.target.value as Language)}
                aria-label="Taal kiezen"
                className="min-h-[44px] bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-base sm:text-xs font-semibold text-zinc-800"
              >
                {(['nl', 'fr', 'en', 'de', 'es', 'it', 'pl'] as Language[]).map((lang) => (
                  <option key={lang} value={lang}>
                    Taal: {lang.toUpperCase()}
                  </option>
                ))}
              </select>
              <select
                value={currentCurrency}
                onChange={(e) => onSelectCurrency(e.target.value as Currency)}
                aria-label="Valuta kiezen"
                className="min-h-[44px] bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-base sm:text-xs font-semibold text-zinc-800"
              >
                <option value="EUR">Valuta: € EUR</option>
                <option value="USD">Valuta: $ USD</option>
                <option value="GBP">Valuta: £ GBP</option>
              </select>
            </div>

            {/* Navigation Items */}
            <div className="divide-y divide-zinc-100 border border-zinc-200 rounded-2xl overflow-hidden">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleLinkClick(link.id)}
                  className={`w-full min-h-[48px] text-left px-4 py-3 text-sm font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                    activeSection === link.id
                      ? 'bg-[#FF6B00] text-white'
                      : 'bg-white text-zinc-900 hover:bg-zinc-50'
                  }`}
                >
                  <span>{link.label}</span>
                </button>
              ))}
            </div>

            {/* Quick Contact & Admin Access */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  onOpenTestDrive();
                  setMobileMenuOpen(false);
                }}
                className="w-full min-h-[46px] flex items-center justify-center gap-2 bg-[#FF6B00] hover:bg-orange-600 text-white py-3 rounded-xl text-sm font-bold cursor-pointer"
              >
                <CarFront className="w-4 h-4" />
                <span>{tNav.testDrive}</span>
              </button>

              <div className="grid grid-cols-3 gap-2">
                <a
                  href={`tel:${dealershipSettings.phoneRaw}`}
                  className="min-h-[44px] flex items-center justify-center gap-1.5 bg-zinc-950 text-white py-2.5 rounded-xl text-xs font-semibold"
                >
                  <Phone className="w-3.5 h-3.5 text-[#FF6B00]" />
                  <span>Bellen</span>
                </a>
                <a
                  href={`https://wa.me/${whatsappClean}?text=Hallo%20Auto%20Sale%2C%20ik%20heb%20een%20vraag.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] flex items-center justify-center gap-1.5 bg-emerald-600 text-white py-2.5 rounded-xl text-xs font-semibold"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={dealershipSettings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] flex items-center justify-center gap-1.5 border border-zinc-200 text-zinc-900 py-2.5 rounded-xl text-xs font-semibold"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#FF6B00]" />
                  <span>Route</span>
                </a>
              </div>

              <button
                type="button"
                onClick={handleAdminClick}
                className="w-full min-h-[46px] flex items-center justify-center gap-2 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-900 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-[#FF6B00]" />
                <span>{isLoggedIn ? 'Dealer / Admin Dashboard openen' : 'Admin / Beheerder inloggen'}</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
