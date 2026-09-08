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
  Coins,
  Instagram,
  Facebook
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
      <div className="bg-[#141416] text-zinc-300 text-[11px] py-1 px-3 sm:px-4 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Showroom Opening hours & Address */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 text-zinc-300 text-[11px]">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse"></span>
              <span className="font-bold text-white uppercase tracking-wider text-[10px]">Showroom:</span>
              <span className="text-zinc-300">Ma-Do 10u-19u | Vr 10u-16:30u</span>
            </div>
            <span className="hidden md:inline text-zinc-700">|</span>
            <a 
              href={dealershipSettings.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-zinc-300 hover:text-[#FF6B00] transition-colors text-[11px]"
            >
              <MapPin className="w-3 h-3 text-[#FF6B00]" />
              <span>{dealershipSettings.address}, {dealershipSettings.zipCode} {dealershipSettings.city}</span>
            </a>
          </div>

          {/* Right utility options: Phone, WhatsApp, Dealer Portal, Currency, Language */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <a 
              href={`tel:${dealershipSettings.phoneRaw}`}
              className="flex items-center gap-1 font-bold text-white hover:text-[#FF6B00] transition-colors text-[11px]"
            >
              <Phone className="w-3 h-3 text-[#FF6B00]" />
              <span className="hidden sm:inline">{dealershipSettings.phone}</span>
            </a>

            <a 
              href={`https://wa.me/${dealershipSettings.whatsapp.replace(/[^0-9]/g, '')}?text=Hallo%20Auto%20Sale%2C%20ik%20heb%20een%20vraag.`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-zinc-300 hover:text-[#FF6B00] font-semibold text-[11px] transition-colors"
            >
              <MessageCircle className="w-3 h-3 text-[#FF6B00]" />
              <span>WhatsApp</span>
            </a>

            {/* Social Media Links */}
            <div className="flex items-center gap-1 border-l border-zinc-800 pl-2">
              <a 
                href={dealershipSettings.instagramUrl || "https://www.instagram.com/autosaleantwerpen"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-[#FF6B00] p-1 transition-colors"
                title="Volg Auto Sale op Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a 
                href={dealershipSettings.facebookUrl || "https://www.facebook.com/autosaleantwerpen"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-[#FF6B00] p-1 transition-colors"
                title="Volg Auto Sale op Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Currency Selector */}
            <div className="flex items-center gap-0.5 bg-black/60 border border-zinc-800 rounded-md p-0.5">
              {(['EUR', 'USD', 'GBP'] as Currency[]).map((curr) => (
                <button
                  key={curr}
                  onClick={() => onSelectCurrency(curr)}
                  className={`px-1 py-0.5 rounded text-[9px] font-bold transition-all cursor-pointer ${
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

            {/* Language Switcher - Includes ES, IT and PL */}
            <div className="flex items-center gap-0.5 bg-black/60 border border-zinc-800 rounded-md p-0.5">
              {(['nl', 'fr', 'en', 'de', 'es', 'it', 'pl'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onSelectLanguage(lang)}
                  className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase transition-all cursor-pointer ${
                    currentLang === lang 
                      ? 'bg-[#FF6B00] text-white shadow-xs' 
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
                className="flex items-center gap-1.5 bg-[#FF6B00] hover:bg-orange-600 text-white px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer shadow-xs"
              >
                <Lock className="w-2.5 h-2.5" />
                <span>Dashboard</span>
              </button>
            ) : (
              <button
                onClick={onOpenDealerLogin}
                className="flex items-center gap-1 text-zinc-300 hover:text-white border border-zinc-700 hover:border-zinc-500 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                title="Dealer Beheer Portaal"
              >
                <Lock className="w-2.5 h-2.5 text-[#FF6B00]" />
                <span>Dealer</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main navigation - Thinner and sleeker */}
      <nav className={`bg-white/95 backdrop-blur-md transition-all duration-200 border-b ${
        isScrolled ? 'border-gray-200 shadow-xs py-1' : 'border-gray-100 py-1 sm:py-1.5'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button 
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-2 text-left group focus:outline-none cursor-pointer"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-black/5 border border-zinc-200/80 p-0.5 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200 shrink-0">
              <img 
                src="/logo2.png" 
                alt="Auto Sale Antwerpen Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-sm sm:text-base font-black tracking-tight text-[#1A1A1A]">
                  AUTO <span className="text-[#FF6B00]">SALE</span>
                </span>
                <span className="text-[8px] uppercase font-bold tracking-wider bg-gray-100 text-[#1A1A1A] px-1 py-0.2 rounded border border-gray-200">
                  {dealershipSettings.city}
                </span>
              </div>
              <p className="text-[8.5px] text-gray-400 font-bold uppercase tracking-wider hidden sm:block mt-0.5 leading-none">
                Drive Your Dream • Sinds 1999
              </p>
            </div>
          </button>

          {/* Desktop Nav Links - Compact & Sleek */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7 font-bold text-[11px] uppercase tracking-wider">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`py-1 transition-colors duration-150 relative cursor-pointer ${
                    isActive
                      ? 'text-[#1A1A1A] border-b-2 border-[#FF6B00] font-black'
                      : 'text-gray-500 hover:text-[#1A1A1A]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Right Action buttons - Thinner & refined */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Saved favorites */}
            <button
              onClick={onOpenFavorites}
              className="relative p-1.5 rounded-xl border border-gray-200 text-[#1A1A1A] hover:text-[#FF6B00] hover:border-[#FF6B00] transition-all cursor-pointer"
              title="Opgeslagen wagens"
            >
              <Heart className="w-4 h-4" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#FF6B00] text-white rounded-full text-[9px] font-bold flex items-center justify-center shadow-xs">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Test Drive CTA */}
            <button
              onClick={onOpenTestDrive}
              className="flex items-center gap-1.5 bg-[#FF6B00] hover:bg-orange-600 text-white px-3.5 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wider shadow-xs transition-all duration-200 cursor-pointer"
            >
              <CarFront className="w-3.5 h-3.5" />
              <span>{tNav.testDrive}</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <button
              onClick={onOpenFavorites}
              className="relative p-1.5 rounded-xl text-zinc-700 hover:bg-zinc-100"
            >
              <Heart className="w-4 h-4" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#FF6B00] text-white rounded-full text-[8px] font-bold flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-xl border border-gray-200 text-zinc-800 hover:bg-gray-100 focus:outline-none"
              aria-label="Menu openen"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white px-4 pt-2.5 pb-5 space-y-2 shadow-lg">
            {/* Mobile language & currency picker bar */}
            <div className="flex flex-col gap-2 py-2 px-2.5 bg-gray-50 rounded-2xl text-xs border border-gray-200">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-500 text-[10px] uppercase">Taal / Language:</span>
                <div className="flex items-center gap-1">
                  {(['nl', 'fr', 'en', 'de', 'es', 'it', 'pl'] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => onSelectLanguage(lang)}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase transition-all ${
                        currentLang === lang ? 'bg-[#FF6B00] text-white shadow-xs' : 'text-gray-600 hover:text-black'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between pt-1.5 border-t border-gray-200/60">
                <span className="font-bold text-gray-500 text-[10px] uppercase">Valuta / Currency:</span>
                <div className="flex items-center gap-1">
                  {(['EUR', 'USD', 'GBP'] as Currency[]).map((curr) => (
                    <button
                      key={curr}
                      onClick={() => onSelectCurrency(curr)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                        currentCurrency === curr ? 'bg-[#1A1A1A] text-white' : 'text-gray-600 hover:text-black'
                      }`}
                    >
                      {curr === 'EUR' ? 'EUR (€)' : curr === 'USD' ? 'USD ($)' : 'GBP (£)'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
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
