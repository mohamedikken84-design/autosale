import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ExternalLink, 
  ShieldCheck, 
  CarFront, 
  ArrowUp
} from 'lucide-react';
import { DEALERSHIP_INFO } from '../data/dealership';
import { DealershipSettings } from '../types';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  dealershipSettings?: DealershipSettings;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, dealershipSettings }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const phone = dealershipSettings?.phone || DEALERSHIP_INFO.contact.phone;
  const phoneRaw = dealershipSettings?.phoneRaw || DEALERSHIP_INFO.contact.phoneRaw;
  const email = dealershipSettings?.email || DEALERSHIP_INFO.contact.email;
  const address = dealershipSettings?.address || DEALERSHIP_INFO.address.street;
  const city = dealershipSettings?.city || DEALERSHIP_INFO.address.city;
  const instagram = dealershipSettings?.instagram;
  const facebook = dealershipSettings?.facebook;
  const tiktok = dealershipSettings?.tiktok;

  return (
    <footer className="bg-[#1A1A1A] text-gray-400 text-xs border-t border-zinc-800">
      {/* Upper Footer with badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10">
          {/* Col 1: Brand & Bio (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white/5 border border-white/10 p-1 shadow-md shrink-0">
                <img 
                  src="/logo2.png" 
                  alt="Auto Sale Logo" 
                  className="w-full h-full object-contain" 
                />
              </div>
              <div>
                <span className="text-lg sm:text-xl font-black text-white font-['Outfit',sans-serif] tracking-tight">
                  AUTO <span className="text-[#FF6B00]">SALE</span>
                </span>
                <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">
                  NV • {address}, {city}
                </p>
              </div>
            </div>

            <p className="text-gray-400 text-xs leading-relaxed max-w-sm font-medium">
              Al meer dan 25 jaar uw toonaangevende specialist in exclusieve, jonge tweedehandswagens in Antwerpen. Erkend Traxio lid met 100% Car-Pass kwaliteitsgarantie.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-2 pt-1">
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-gray-300 hover:text-white text-[11px] font-bold transition-colors"
                >
                  Instagram
                </a>
              )}
              {facebook && (
                <a
                  href={facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-gray-300 hover:text-white text-[11px] font-bold transition-colors"
                >
                  Facebook
                </a>
              )}
              {tiktok && (
                <a
                  href={tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-gray-300 hover:text-white text-[11px] font-bold transition-colors"
                >
                  TikTok
                </a>
              )}
            </div>

            <div className="pt-1 flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/50 border border-zinc-800 text-[10px] sm:text-[11px] font-bold text-gray-300 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>Traxio Gecertificeerd</span>
              </div>
              <div className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/50 border border-zinc-800 text-[10px] sm:text-[11px] font-bold text-gray-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Car-Pass Partner</span>
              </div>
            </div>
          </div>

          {/* Col 2: Snelle Links */}
          <div className="space-y-2 sm:space-y-3">
            <h4 className="text-white font-black text-xs font-['Outfit',sans-serif] uppercase tracking-widest">
              Navigatie
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs font-medium">
              <li>
                <button
                  onClick={() => onNavigate('stock')}
                  className="hover:text-[#FF6B00] transition-colors text-left cursor-pointer"
                >
                  Onze Wagens (Stock)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('overname')}
                  className="hover:text-[#FF6B00] transition-colors text-left cursor-pointer"
                >
                  Auto Verkopen / Overname
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('financiering')}
                  className="hover:text-[#FF6B00] transition-colors text-left cursor-pointer"
                >
                  Financieringscalculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('garantie')}
                  className="hover:text-[#FF6B00] transition-colors text-left cursor-pointer"
                >
                  Traxio Garantie (12-24 mnd)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('over-ons')}
                  className="hover:text-[#FF6B00] transition-colors text-left cursor-pointer"
                >
                  Over Auto Sale (1999)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Details */}
          <div className="space-y-2 sm:space-y-3">
            <h4 className="text-white font-black text-xs font-['Outfit',sans-serif] uppercase tracking-widest">
              Contact & Route
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <a
                  href={DEALERSHIP_INFO.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 hover:text-[#FF6B00] transition-colors group"
                >
                  <MapPin className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
                  <span>
                    {address} <br />
                    2660 {city}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${phoneRaw}`}
                  className="flex items-center gap-2 hover:text-[#FF6B00] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#FF6B00] shrink-0" />
                  <span>{phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 hover:text-[#FF6B00] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#FF6B00] shrink-0" />
                  <span>{email}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Openingsuren */}
          <div className="space-y-2 sm:space-y-3">
            <h4 className="text-white font-black text-xs font-['Outfit',sans-serif] uppercase tracking-widest">
              Openingsuren
            </h4>
            <div className="space-y-1.5 sm:space-y-2 text-xs font-medium">
              <div className="flex justify-between">
                <span>Maandag - Donderdag:</span>
                <span className="text-white font-bold">10:00 - 19:00</span>
              </div>
              <div className="flex justify-between">
                <span>Vrijdag:</span>
                <span className="text-white font-bold">10:00 - 16:30</span>
              </div>
              <div className="flex justify-between">
                <span>Zaterdag:</span>
                <span className="text-[#FF6B00] font-bold">Op afspraak</span>
              </div>
              <div className="flex justify-between">
                <span>Zondag:</span>
                <span className="text-gray-500">Gesloten</span>
              </div>
            </div>
            <div className="pt-1 text-[11px] text-gray-500 font-semibold">
              BTW & KBO: {DEALERSHIP_INFO.vatNumber}
            </div>
          </div>
        </div>
      </div>

      {/* Lower Copyright Strip */}
      <div className="border-t border-zinc-800 bg-black/60 py-3 sm:py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 text-[10px] sm:text-[11px] text-gray-500 font-medium">
          <div>
            © {new Date().getFullYear()} {DEALERSHIP_INFO.legalName} • Alle rechten voorbehouden.
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <span>Algemene Verkoopsvoorwaarden</span>
            <span>•</span>
            <span>Privacybeleid</span>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-gray-400 hover:text-[#FF6B00] transition-colors cursor-pointer"
            >
              <span>Naar boven</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
