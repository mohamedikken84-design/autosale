import React from 'react';
import {
  Banknote,
  Clock,
  FileCheck,
  MessageCircle,
  Phone,
  Camera,
  CheckCircle2,
} from 'lucide-react';
import { DealershipSettings, Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { getTradeInWhatsAppUrl } from '../utils/whatsapp';

interface CarValuationSectionProps {
  dealershipSettings: DealershipSettings;
  language?: Language;
}

export const CarValuationSection: React.FC<CarValuationSectionProps> = ({
  dealershipSettings,
  language = 'nl',
}) => {
  const t = TRANSLATIONS[language]?.valuation || TRANSLATIONS.nl.valuation;
  const tradeInWhatsAppUrl = getTradeInWhatsAppUrl(dealershipSettings.whatsapp);

  return (
    <section id="overname" className="py-10 sm:py-16 lg:py-20 bg-[#141416] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Clean Value Proposition */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#FF6B00]">
              {t.badge}
            </p>

            <h2 className="text-2xl sm:text-4xl font-extrabold font-['Outfit',sans-serif] tracking-tight leading-tight text-balance">
              {t.title}
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              {t.subtitle}
            </p>

            <div className="space-y-3.5 sm:space-y-4 pt-2 border-t border-zinc-800">
              <div className="flex items-center gap-3.5 pt-2">
                <div className="w-10 h-10 rounded-xl bg-zinc-800/80 text-[#FF6B00] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-sm font-semibold text-white">{t.benefit1}</div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-zinc-800/80 text-[#FF6B00] flex items-center justify-center shrink-0">
                  <Banknote className="w-5 h-5" />
                </div>
                <div className="text-sm font-semibold text-white">{t.benefit2}</div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-zinc-800/80 text-[#FF6B00] flex items-center justify-center shrink-0">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div className="text-sm font-semibold text-white">{t.benefit3}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct WhatsApp Trade-In Card (No form fields) */}
          <div className="lg:col-span-6">
            <div className="bg-white text-zinc-950 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold font-['Outfit',sans-serif] text-zinc-950 tracking-tight">
                    Direct inruilen of verkopen via WhatsApp
                  </h3>
                  <p className="text-sm text-zinc-600 mt-1 leading-relaxed">
                    Geen lange formulieren nodig. Stuur uw wagen rechtstreeks door via WhatsApp en ontvang snel een eerlijke overnameprijs.
                  </p>
                </div>
              </div>

              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 space-y-2.5 text-xs sm:text-sm text-zinc-700">
                <div className="font-bold text-zinc-950 flex items-center gap-2">
                  <Camera className="w-4 h-4 text-[#FF6B00]" />
                  <span>Stuur ons eenvoudig via WhatsApp:</span>
                </div>
                <ul className="space-y-1.5 pl-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Merk, model, bouwjaar en kilometerstand</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Enkele foto’s van buiten- en binnenkant</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Eventuele opmerkingen of gewenste inruilwagen</span>
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <a
                  href={tradeInWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm:col-span-2 min-h-[50px] inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3.5 px-6 rounded-xl transition-colors shadow-sm"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Auto inruilen via WhatsApp</span>
                </a>

                <a
                  href={`tel:${dealershipSettings.phoneRaw}`}
                  className="sm:col-span-2 min-h-[46px] inline-flex items-center justify-center gap-2 bg-zinc-950 hover:bg-black text-white font-semibold text-xs py-3 px-5 rounded-xl transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#FF6B00]" />
                  <span>Of bel direct: {dealershipSettings.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
