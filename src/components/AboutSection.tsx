import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  FileCheck, 
  CheckCircle2, 
  Globe, 
  Quote,
  Clock,
  Sparkles,
  CarFront,
  ArrowRight
} from 'lucide-react';
import { DEALERSHIP_INFO } from '../data/dealership';
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
  language = 'nl'
}) => {
  const currentShowroomPhoto = showroomImageUrl || '/hero-showroom.jpg';
  const t = TRANSLATIONS[language]?.about || TRANSLATIONS.nl.about;
  const tNav = TRANSLATIONS[language]?.nav || TRANSLATIONS.nl.nav;

  return (
    <div id="about-container">
      {/* 1. Traxio Kwaliteitsgarantie Highlight Banner - Bento Box */}
      <section id="garantie" className="py-8 sm:py-14 bg-white border-b border-zinc-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#141416] rounded-3xl p-5 sm:p-12 text-white relative overflow-hidden shadow-xl border border-zinc-800">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
              <div className="lg:col-span-7 space-y-3 sm:space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6B00] text-white text-[11px] sm:text-xs font-bold uppercase tracking-widest shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{t.badge}</span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-black font-['Outfit',sans-serif] tracking-tight leading-tight">
                  {t.title}
                </h3>

                <p className="text-gray-300 text-xs sm:text-base leading-relaxed">
                  {t.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 pt-1 sm:pt-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
                    <span>{t.bullet1}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
                    <span>{t.bullet2}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
                    <span>{t.bullet3}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
                    <span>{t.bullet4}</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col items-center justify-center p-5 sm:p-8 bg-black/60 rounded-3xl border border-zinc-800 text-center space-y-2 sm:space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 p-1 flex items-center justify-center shadow-lg shrink-0">
                    <img src="/logo2.png" alt="Auto Sale" className="w-full h-full object-contain" />
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-[#FF6B00] text-white font-black text-xs uppercase tracking-wider shadow-md">
                    TRAXIO
                  </div>
                </div>
                <div className="text-lg sm:text-xl font-black font-['Outfit',sans-serif] text-white">
                  {t.badge}
                </div>
                <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
                  {t.description}
                </p>
                <div className="text-[10px] font-bold text-gray-400 pt-1 uppercase tracking-wider">
                  KBO: {DEALERSHIP_INFO.vatNumber}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. About Auto Sale History & Philosophy */}
      <section id="over-ons" className="py-8 sm:py-16 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            {/* Left: Images & Heritage Badge (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100 shadow-xl border border-zinc-200/90 relative">
                <img
                  src={currentShowroomPhoto}
                  alt="Auto Sale Showroom Antwerpen"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=80';
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-black text-[#FF6B00] uppercase tracking-widest">
                      {DEALERSHIP_INFO.address.street}, {DEALERSHIP_INFO.address.city}
                    </div>
                    <div className="text-base sm:text-lg font-black font-['Outfit',sans-serif]">
                      Auto Sale • Drive Your Dream
                    </div>
                  </div>
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-1 flex items-center justify-center shrink-0">
                    <img src="/logo2.png" alt="Auto Sale" className="w-full h-full object-contain" />
                  </div>
                </div>
              </div>

              {/* Floating Experience Badge */}
              <div className="absolute -bottom-3 -right-2 sm:-bottom-5 sm:right-4 bg-[#FF6B00] text-white p-3 sm:p-5 rounded-2xl sm:rounded-3xl shadow-xl flex items-center gap-2.5 sm:gap-3">
                <div className="text-2xl sm:text-4xl font-black font-['Outfit',sans-serif]">
                  25+
                </div>
                <div className="text-[10px] sm:text-xs font-black leading-tight uppercase tracking-wider">
                  {t.historyTitle}
                </div>
              </div>
            </div>

            {/* Right: Story & Michel Primack Quote (7 cols) */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-zinc-200 text-[#1A1A1A] text-[11px] sm:text-xs font-bold uppercase tracking-widest shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>{tNav.about}</span>
              </div>

              <h2 className="text-2xl sm:text-5xl font-black text-[#1A1A1A] font-['Outfit',sans-serif] tracking-tighter leading-tight">
                {t.historyTitle}
              </h2>

              <p className="text-gray-600 text-xs sm:text-base leading-relaxed">
                {t.historyText}
              </p>

              {/* Founder quote box */}
              <div className="p-6 rounded-3xl bg-[#F8F8F8] border border-gray-200">
                <div className="flex gap-4 items-start">
                  <Quote className="w-8 h-8 text-[#FF6B00] shrink-0 opacity-80" />
                  <div>
                    <blockquote className="italic text-[#1A1A1A] text-sm font-semibold leading-relaxed">
                      {t.quote}
                    </blockquote>
                    <div className="mt-3 text-xs font-bold text-[#1A1A1A]">
                      Michel Primack <span className="text-gray-500 font-normal">— Auto Sale NV</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={onExploreStock}
                  className="inline-flex items-center gap-2 bg-[#FF6B00] hover:bg-orange-600 text-white font-bold uppercase text-xs tracking-wider py-3.5 px-6 rounded-2xl transition-all cursor-pointer shadow-md"
                >
                  <span>{t.exploreBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onOpenValuation}
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-[#1A1A1A] font-bold uppercase text-xs tracking-wider py-3.5 px-6 rounded-2xl border border-gray-200 transition-all cursor-pointer shadow-xs"
                >
                  <span>{t.valuationBtn}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
