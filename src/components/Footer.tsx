import React from 'react';
import { MapPin, Phone, Mail, ArrowUp, Lock } from 'lucide-react';
import { DEALERSHIP_INFO } from '../data/dealership';
import { DealershipSettings, Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  dealershipSettings?: DealershipSettings;
  language?: Language;
  isLoggedIn?: boolean;
  onOpenDealerLogin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  dealershipSettings,
  language = 'nl',
  isLoggedIn = false,
  onOpenDealerLogin,
}) => {
  const t = TRANSLATIONS[language]?.footer || TRANSLATIONS.nl.footer;
  const tNav = TRANSLATIONS[language]?.nav || TRANSLATIONS.nl.nav;
  const tReviews = TRANSLATIONS[language]?.reviews || TRANSLATIONS.nl.reviews;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const phone = dealershipSettings?.phone || DEALERSHIP_INFO.contact.phone;
  const phoneRaw = dealershipSettings?.phoneRaw || DEALERSHIP_INFO.contact.phoneRaw;
  const email = dealershipSettings?.email || DEALERSHIP_INFO.contact.email;
  const address = dealershipSettings?.address || DEALERSHIP_INFO.address.street;
  const zipCode = dealershipSettings?.zipCode || DEALERSHIP_INFO.address.postalCode;
  const city = dealershipSettings?.city || DEALERSHIP_INFO.address.city;
  const googleMapsUrl = dealershipSettings?.googleMapsUrl || DEALERSHIP_INFO.address.googleMapsUrl;
  const instagram = dealershipSettings?.instagramUrl;
  const facebook = dealershipSettings?.facebookUrl;
  const tiktok = dealershipSettings?.tiktokUrl;
  const autoscout = dealershipSettings?.autoscoutUrl || dealershipSettings?.autoscoutDealerUrl;

  return (
    <footer className="bg-[#141416] text-zinc-400 text-xs border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="sm:col-span-2 lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <img src="/logo2.png" alt="Auto Sale Logo" className="w-8 h-8 object-contain" />
              <div>
                <span className="text-lg font-extrabold text-white font-['Outfit',sans-serif] tracking-tight">
                  AUTO <span className="text-[#FF6B00]">SALE</span>
                </span>
              </div>
            </div>

            <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
              {t.aboutText}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs">
              {autoscout && (
                <a
                  href={autoscout}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-300 hover:text-[#FF6B00] transition-colors font-medium"
                >
                  AutoScout24
                </a>
              )}
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-300 hover:text-[#FF6B00] transition-colors font-medium"
                >
                  Instagram
                </a>
              )}
              {facebook && (
                <a
                  href={facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-300 hover:text-[#FF6B00] transition-colors font-medium"
                >
                  Facebook
                </a>
              )}
              {tiktok && (
                <a
                  href={tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-300 hover:text-[#FF6B00] transition-colors font-medium"
                >
                  TikTok
                </a>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              {t.navigation}
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'stock', label: tNav.stock },
                { id: 'overname', label: tNav.valuation },
                { id: 'financiering', label: tNav.financing },
                { id: 'over-ons', label: tNav.about },
                { id: 'contact', label: tNav.contact },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(item.id)}
                    className="hover:text-[#FF6B00] transition-colors text-left cursor-pointer py-0.5"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              {tReviews.contactTitle}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 hover:text-[#FF6B00] transition-colors"
                >
                  <MapPin className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
                  <span>
                    {address}<br />
                    {zipCode} {city}
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

          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              {tReviews.openingHoursTitle}
            </h4>
            <div className="space-y-1.5 text-xs text-zinc-300">
              <div>{tReviews.monThu}</div>
              <div>{tReviews.friday}</div>
              <div>{tReviews.saturday}</div>
              <div className="text-zinc-500">{tReviews.sunday}</div>
            </div>
            <div className="text-[11px] text-zinc-500 pt-1">
              KBO / BTW: {DEALERSHIP_INFO.vatNumber}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-800 pt-4 pb-20 md:pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} {DEALERSHIP_INFO.legalName} · {t.rights}
          </div>
          <div className="flex items-center gap-4 self-end sm:self-auto">
            {onOpenDealerLogin && (
              <button
                type="button"
                onClick={onOpenDealerLogin}
                className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-[#FF6B00] transition-colors cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>{isLoggedIn ? 'Admin Dashboard' : 'Admin inloggen'}</span>
              </button>
            )}
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Naar boven"
              className="inline-flex items-center gap-1 text-zinc-400 hover:text-[#FF6B00] transition-colors cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
