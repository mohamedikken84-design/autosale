import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Clock, 
  MapPin, 
  MessageCircle, 
  Heart, 
  Menu, 
  X, 
  CarFront, 
  ShieldCheck, 
  ArrowRight,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { DEALERSHIP_INFO } from '../data/dealership';

interface NavbarProps {
  favoritesCount: number;
  onOpenFavorites: () => void;
  onOpenTestDrive: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  favoritesCount,
  onOpenFavorites,
  onOpenTestDrive,
  onNavigate,
  activeSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentLang, setCurrentLang] = useState<'NL' | 'FR' | 'EN' | 'DE'>('NL');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'stock', label: 'Onze Wagens' },
    { id: 'overname', label: 'Auto Verkopen' },
    { id: 'financiering', label: 'Financiering' },
    { id: 'garantie', label: 'Traxio Garantie' },
    { id: 'over-ons', label: 'Over Ons' },
    { id: 'contact', label: 'Contact & Route' }
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
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 text-zinc-300">
              <span className="inline-block w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse"></span>
              <span className="font-bold text-white uppercase tracking-wider text-[11px]">Showroom:</span>
              <span>Ma-Do 10u-19u | Vr 10u-16:30u</span>
            </div>
            <span className="hidden sm:inline text-zinc-700">|</span>
            <a 
              href={DEALERSHIP_INFO.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-zinc-300 hover:text-[#FF6B00] transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>Sint-Bernardsesteenweg 733, 2660 Antwerpen</span>
            </a>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <a 
              href={`tel:${DEALERSHIP_INFO.contact.phoneRaw}`}
              className="flex items-center gap-1.5 font-bold text-white hover:text-[#FF6B00] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>{DEALERSHIP_INFO.contact.phone}</span>
            </a>
            <a 
              href={DEALERSHIP_INFO.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-zinc-300 hover:text-[#FF6B00] font-semibold text-xs transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span className="hidden md:inline">WhatsApp</span>
            </a>

            {/* Language Switcher */}
            <div className="flex items-center gap-0.5 bg-black/40 border border-zinc-800 rounded-lg p-0.5">
              {(['NL', 'FR', 'EN', 'DE'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setCurrentLang(lang)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all ${
                    currentLang === lang 
                      ? 'bg-[#FF6B00] text-white' 
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
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
            <div className="w-10 h-10 bg-[#FF6B00] rounded-2xl flex items-center justify-center font-black text-white italic text-xl shadow-sm group-hover:scale-105 transition-transform duration-200">
              A
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tighter text-[#1A1A1A]">
                  AUTO <span className="text-[#FF6B00]">SALE</span>
                </span>
                <span className="text-[9px] uppercase font-bold tracking-widest bg-gray-100 text-[#1A1A1A] px-1.5 py-0.5 rounded-full border border-gray-200">
                  Antwerpen
                </span>
              </div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                Sinds 1999 • Traxio & Car-Pass
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
              <span>Plan Proefrit</span>
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
                <span>Plan een Proefrit</span>
              </button>

              <a
                href={`tel:${DEALERSHIP_INFO.contact.phoneRaw}`}
                className="w-full flex items-center justify-center gap-2 bg-[#1A1A1A] text-white py-3 rounded-2xl text-xs font-bold uppercase tracking-wider"
              >
                <Phone className="w-4 h-4 text-[#FF6B00]" />
                <span>Bel Sales: {DEALERSHIP_INFO.contact.phone}</span>
              </a>

              <a
                href={DEALERSHIP_INFO.address.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 border border-gray-200 text-[#1A1A1A] py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider"
              >
                <MapPin className="w-4 h-4 text-[#FF6B00]" />
                <span>Google Maps Route</span>
                <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
