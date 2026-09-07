import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MapPin, 
  MessageCircle, 
  Heart, 
  Menu, 
  X, 
  CarFront, 
  ExternalLink,
  Lock,
  Globe,
  Coins
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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tNav = TRANSLATIONS[currentLang]?.nav || TRANSLATIONS.nl.nav;

  const navLinks = [
    { id: 'stock', label: tNav.stock },
    { id: 'overname', label: tNav.valuation },
    { id: 'financiering', label: tNav.financing },
    { id: 'garantie', label: tNav.warranty },
    { id: 'over-ons', label: tNav.about },
    { id: 'contact', label: tNav.contact }
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top utility bar */}
      <div className="bg-[#1A1A1A] text-zinc-300 text-xs py-2 px-4 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Showroom Opening hours & Address */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 text-zinc-300">
              <span className="inline-block w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse"></span>
              <span className="font-bold text-white uppercase tracking-wider text-[11px]">Showroom:</span>
              <span>Ma-Do 10u-19u | Vr 10u-16:30u</span>
            </div>
            <span className="hidden sm:inline text-zinc-700">|</span>
            <a 
              href={dealershipSettings.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-zinc-300 hover:text-[#FF6B00] transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>{dealershipSettings.address}, {dealershipSettings.zipCode} {dealershipSettings.city}</span>
            </a>
          </div>

          {/* Right utility options: Phone, WhatsApp, Dealer Portal, Currency, Language */}
          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <a 
              href={`tel:${dealershipSettings.phoneRaw}`}
              className="flex items-center gap-1.5 font-bold text-white hover:text-[#FF6B00] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span className="hidden md:inline">{dealershipSettings.phone}</span>
            </a>

            <a 
              href={`https://wa.me/${dealershipSettings.whatsapp.replace(/[^0-9]/g, '')}?text=Hallo%20Auto%20Sale%2C%20ik%20heb%20een%20vraag.`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-zinc-300 hover:text-[#FF6B00] font-semibold text-xs transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>WhatsApp</span>
            </a>

            {/* Currency Selector */}
            <div className="flex items-center gap-0.5 bg-black/50 border border-zinc-800 rounded-lg p-0.5">
              {(['EUR', 'USD', 'GBP'] as Currency[]).map((curr) => (
                <button
                  key={curr}
                  onClick={() => onSelectCurrency(curr)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                    currentCurrency === curr 
                      ? 'bg-zinc-700 text-white' 
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  title={`Valuta: ${curr}`}
                >
                  {curr === 'EUR' ? '€' : curr === 'USD' ? '$' : '£'}
                </button>
              ))}
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-0.5 bg-black/50 border border-zinc-800 rounded-lg p-0.5">
              {(['nl', 'fr', 'en', 'de'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onSelectLanguage(lang)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase transition-all cursor-pointer ${
                    currentLang === lang 
                      ? 'bg-[#FF6B00] text-white' 
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  title={`Taal: ${lang.toUpperCase()}`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Dealer Portal Button */}
            {isLoggedIn ? (
              <button
                onClick={onOpenDashboard}
                className="flex items-center gap-1 bg-[#FF6B00] hover:bg-orange-600 text-white px-2.5 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer shadow-xs"
              >
                <Lock className="w-3 h-3" />
                <span>Dashboard</span>
              </button>
            ) : (
              <button
                onClick={onOpenDealerLogin}
                className="flex items-center gap-1 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-600 px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                title="Dealer Beheer Portaal"
              >
                <Lock className="w-2.5 h-2.5 text-[#FF6B00]" />
                <span className="hidden sm:inline">Dealer</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className={`bg-white/95 backdrop-blur-md transition-all duration-200 border-b ${
        isScrolled ? 'border-gray-200 shadow-sm py-3' : 'border-gray-100 py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button 
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
          >
            <div className="w-11 h-11 rounded-2xl bg-black/5 border border-zinc-200/80 p-1 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200 shrink-0">
              <img 
                src="/logo2.png" 
                alt="Auto Sale Antwerpen Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tighter text-[#1A1A1A]">
                  AUTO <span className="text-[#FF6B00]">SALE</span>
                </span>
                <span className="text-[9px] uppercase font-bold tracking-widest bg-gray-100 text-[#1A1A1A] px-1.5 py-0.5 rounded-full border border-gray-200">
                  {dealershipSettings.city}
                </span>
              </div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                Drive Your Dream • Sinds 1999
              </p>
            </div>
          </button>

          {/* Desktop Nav Links - Bento Style uppercase tracking-widest */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 font-bold text-xs uppercase tracking-widest">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`py-2 transition-colors duration-150 relative cursor-pointer ${
                    isActive
                      ? 'text-[#1A1A1A] border-b-2 border-[#FF6B00] font-black'
                      : 'text-gray-400 hover:text-[#1A1A1A]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Right Action buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Saved favorites */}
            <button
              onClick={onOpenFavorites}
              className="relative p-2.5 rounded-2xl border border-gray-200 text-[#1A1A1A] hover:text-[#FF6B00] hover:border-[#FF6B00] transition-all cursor-pointer"
              title="Opgeslagen wagens"
            >
              <Heart className="w-5 h-5" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#FF6B00] text-white rounded-full text-xs font-bold flex items-center justify-center shadow-xs">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Test Drive CTA */}
            <button
              onClick={onOpenTestDrive}
              className="flex items-center gap-2 bg-[#FF6B00] hover:bg-orange-600 text-white px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider shadow-sm transition-all duration-200 cursor-pointer"
            >
              <CarFront className="w-4 h-4" />
              <span>{tNav.testDrive}</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenFavorites}
              className="relative p-2 rounded-xl text-zinc-700 hover:bg-zinc-100"
            >
              <Heart className="w-5 h-5" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF6B00] text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border border-gray-200 text-zinc-800 hover:bg-gray-100 focus:outline-none"
              aria-label="Menu openen"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
            <div className="py-2 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-colors ${
                    activeSection === link.id
                      ? 'bg-[#FF6B00] text-white'
                      : 'text-[#1A1A1A] hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  onOpenTestDrive();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#FF6B00] text-white py-3 rounded-2xl text-xs font-bold uppercase tracking-wider shadow-sm"
              >
                <CarFront className="w-4 h-4" />
                <span>{tNav.testDrive}</span>
              </button>

              <a
                href={`tel:${dealershipSettings.phoneRaw}`}
                className="w-full flex items-center justify-center gap-2 bg-[#1A1A1A] text-white py-3 rounded-2xl text-xs font-bold uppercase tracking-wider"
              >
                <Phone className="w-4 h-4 text-[#FF6B00]" />
                <span>Bel Sales: {dealershipSettings.phone}</span>
              </a>

              <a
                href={dealershipSettings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 border border-gray-200 text-[#1A1A1A] py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider"
              >
                <MapPin className="w-4 h-4 text-[#FF6B00]" />
                <span>Google Maps Route</span>
                <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
              </a>

              <button
                onClick={() => {
                  if (isLoggedIn) onOpenDashboard();
                  else onOpenDealerLogin();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 border border-zinc-300 text-zinc-700 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider hover:bg-zinc-50"
              >
                <Lock className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>{isLoggedIn ? 'Dealer Dashboard' : 'Dealer Inloggen'}</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
