import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, Quote, ArrowRight } from 'lucide-react';
import { DEALERSHIP_INFO, DEFAULT_SHOWROOM_IMAGE } from '../data/dealership';
import { Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface AboutSectionProps {
  onExploreStock: () => void;
  onOpenValuation: () => void;
  showroomImageUrl?: string;
  language?: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onExploreStock,
  onOpenValuation,
  showroomImageUrl,
  language = 'nl',
}) => {
  const currentShowroomPhoto = showroomImageUrl || DEFAULT_SHOWROOM_IMAGE;
  const [imgFailed, setImgFailed] = useState(false);
  const t = TRANSLATIONS[language]?.about || TRANSLATIONS.nl.about;

  useEffect(() => {
    setImgFailed(false);
  }, [currentShowroomPhoto]);

  return (
    <section id="over-ons" className="py-10 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
        {/* Main Editorial Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-200 relative">
              {!imgFailed ? (
                <img
                  src={currentShowroomPhoto}
                  alt="Auto Sale Showroom Antwerpen"
                  onError={() => setImgFailed(true)}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800 text-white font-['Outfit',sans-serif] text-2xl font-bold">
                  Auto Sale Antwerpen
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-3.5 left-3.5 right-3.5 sm:bottom-4 sm:left-4 sm:right-4 text-white">
                <div className="text-[11px] sm:text-xs font-semibold text-[#FF6B00]">
                  {DEALERSHIP_INFO.address.street}, {DEALERSHIP_INFO.address.city}
                </div>
                <div className="text-sm sm:text-base font-bold font-['Outfit',sans-serif]">
                  {DEALERSHIP_INFO.legalName} · KBO {DEALERSHIP_INFO.vatNumber}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4 sm:space-y-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#FF6B00]">
              {t.badge}
            </p>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-950 font-['Outfit',sans-serif] tracking-tight leading-tight text-balance">
              {t.historyTitle}
            </h2>

            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
              {t.historyText}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs font-semibold text-zinc-800">
              {[t.bullet1, t.bullet2, t.bullet3, t.bullet4].map((bullet, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 border border-zinc-200 flex gap-3 sm:gap-3.5 items-start">
              <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF6B00] shrink-0" />
              <div>
                <blockquote className="italic text-zinc-900 text-sm font-semibold leading-relaxed">
                  {t.quote}
                </blockquote>
                <div className="mt-2 text-xs text-zinc-500">
                  <strong className="text-zinc-900">{DEALERSHIP_INFO.owner}</strong> · {DEALERSHIP_INFO.legalName}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-2.5 sm:gap-3 pt-1">
              <button
                type="button"
                onClick={onExploreStock}
                className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 bg-[#FF6B00] hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl transition-colors cursor-pointer"
              >
                <span>{t.exploreBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onOpenValuation}
                className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 bg-white hover:bg-zinc-50 text-zinc-900 font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl border border-zinc-200 transition-colors cursor-pointer"
              >
                <span>{t.valuationBtn}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Clean Traxio Warranty Strip */}
        <div id="garantie" className="bg-[#141416] text-white rounded-2xl p-5 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6">
          <div className="flex items-start gap-3.5 sm:gap-4 max-w-2xl">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#FF6B00]/15 text-[#FF6B00] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold font-['Outfit',sans-serif] text-white">
                {t.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">
                {t.description}
              </p>
            </div>
          </div>
          <div className="text-xs text-zinc-400 shrink-0 font-medium">
            Erkend Traxio-lid · Car-Pass Partner
          </div>
        </div>
      </div>
    </section>
  );
};
