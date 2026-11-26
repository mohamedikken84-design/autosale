import React, { useState } from 'react';
import {
  Search,
  ArrowRight,
  ShieldCheck,
  Clock,
  Star,
  CheckCircle2,
  MapPin,
  MessageCircle,
} from 'lucide-react';
import { FilterState, Language, Car as CarType, DealershipSettings } from '../types';
import { DEFAULT_SHOWROOM_IMAGE } from '../data/dealership';
import { TRANSLATIONS } from '../i18n/translations';
import { getTradeInWhatsAppUrl } from '../utils/whatsapp';

interface HeroProps {
  onExploreStock: () => void;
  onApplyQuickFilter: (filters: Partial<FilterState>) => void;
  availableBrands: string[];
  totalCarsCount: number;
  language: Language;
  featuredCars: CarType[];
  dealershipSettings: DealershipSettings;
  onSelectCar?: (car: CarType) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreStock,
  onApplyQuickFilter,
  availableBrands,
  totalCarsCount,
  language,
  dealershipSettings,
}) => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedFuel, setSelectedFuel] = useState('');
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<number>(0);
  const [bgImage, setBgImage] = useState(
    dealershipSettings.showroomImageUrl || DEFAULT_SHOWROOM_IMAGE
  );
  const [bgFailed, setBgFailed] = useState(false);

  React.useEffect(() => {
    setBgImage(dealershipSettings.showroomImageUrl || DEFAULT_SHOWROOM_IMAGE);
    setBgFailed(false);
  }, [dealershipSettings.showroomImageUrl]);

  const t = TRANSLATIONS[language]?.hero || TRANSLATIONS.nl.hero;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyQuickFilter({
      brand: selectedBrand,
      fuel: selectedFuel,
      maxPrice: selectedMaxPrice || 250000,
    });
    onExploreStock();
  };

  return (
    <section id="hero" className="relative bg-[#111113] text-white overflow-hidden border-b border-zinc-800">
      {/* Desktop Background Image with Measured Contrast Scrim */}
      <div className="hidden md:block absolute inset-0 z-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-neutral-900">
        {!bgFailed && (
          <img
            src={bgImage}
            alt="Auto Sale Antwerpen Showroom"
            onError={() => setBgFailed(true)}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-black/35" />
      </div>

      {/* Mobile Clean Top Showroom Photo Banner (keeps building & sign crisp on small screens) */}
      <div className="md:hidden relative w-full aspect-[16/10] bg-zinc-950 overflow-hidden">
        {!bgFailed && (
          <img
            src={bgImage}
            alt="Auto Sale Antwerpen Showroom"
            onError={() => setBgFailed(true)}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-black/25 to-black/10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 md:mt-0 pb-8 pt-2 sm:py-16 lg:py-20 flex flex-col justify-between gap-7 sm:gap-10">
        {/* Clean Top Kicker */}
        <div className="max-w-3xl space-y-4 sm:space-y-5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-300 font-medium">
            <span className="text-[#FF6B00] font-semibold">{t.traxioHeader}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
              <span>{dealershipSettings.address}, {dealershipSettings.city}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-['Outfit',sans-serif] tracking-tight leading-[1.08] text-white text-balance">
            Auto Sale <span className="text-[#FF6B00]">Antwerpen</span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 max-w-xl leading-relaxed">
            {t.subtitle}
          </p>

          {/* Primary + Secondary CTA */}
          <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
            <button
              type="button"
              onClick={onExploreStock}
              className="w-full sm:w-auto min-h-[46px] px-6 py-3 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <span>{t.viewStock} ({totalCarsCount})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={getTradeInWhatsAppUrl(dealershipSettings.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-h-[46px] px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold text-sm transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>{t.sellCar}</span>
            </a>
          </div>
        </div>

        {/* Clean Quick Search Strip */}
        <div className="space-y-4 sm:space-y-5">
          <form
            onSubmit={handleSearchSubmit}
            className="bg-zinc-900/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-white/10 grid grid-cols-2 lg:grid-cols-12 gap-2.5 sm:gap-3 items-end"
          >
            <div className="col-span-1 lg:col-span-3">
              <label className="block text-[11px] sm:text-xs font-medium text-zinc-400 mb-1.5">
                {t.brand}
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full min-h-[44px] bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-base sm:text-sm font-medium text-white focus:outline-none focus:border-[#FF6B00]"
              >
                <option value="">{t.allBrands}</option>
                {availableBrands.map((brand) => (
                  <option key={brand} value={brand} className="bg-zinc-900 text-white">
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-1 lg:col-span-3">
              <label className="block text-[11px] sm:text-xs font-medium text-zinc-400 mb-1.5">
                {t.fuel}
              </label>
              <select
                value={selectedFuel}
                onChange={(e) => setSelectedFuel(e.target.value)}
                className="w-full min-h-[44px] bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-base sm:text-sm font-medium text-white focus:outline-none focus:border-[#FF6B00]"
              >
                <option value="">{t.allFuels}</option>
                <option value="Benzine">{t.petrol}</option>
                <option value="Diesel">{t.diesel}</option>
                <option value="Hybride">{t.hybrid}</option>
                <option value="Elektrisch">{t.electric}</option>
              </select>
            </div>

            <div className="col-span-2 sm:col-span-1 lg:col-span-3">
              <label className="block text-[11px] sm:text-xs font-medium text-zinc-400 mb-1.5">
                {t.budget}
              </label>
              <select
                value={selectedMaxPrice}
                onChange={(e) => setSelectedMaxPrice(Number(e.target.value))}
                className="w-full min-h-[44px] bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-base sm:text-sm font-medium text-white focus:outline-none focus:border-[#FF6B00]"
              >
                <option value={0}>{t.noLimit}</option>
                <option value={25000}>{t.upTo} € 25.000</option>
                <option value={40000}>{t.upTo} € 40.000</option>
                <option value={60000}>{t.upTo} € 60.000</option>
                <option value={85000}>{t.upTo} € 85.000</option>
                <option value={120000}>{t.upTo} € 120.000+</option>
              </select>
            </div>

            <div className="col-span-2 sm:col-span-1 lg:col-span-3">
              <button
                type="submit"
                className="w-full min-h-[44px] bg-[#FF6B00] hover:bg-orange-600 text-white font-bold text-sm py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>{t.searchButton}</span>
              </button>
            </div>
          </form>

          {/* Clean Trust Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 text-xs text-zinc-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0" />
              <span>{t.carPass100}</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#FF6B00] shrink-0" />
              <span>{t.checks113}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
              <span>{t.googleScore}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#FF6B00] shrink-0" />
              <span>{t.directTakeover}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
