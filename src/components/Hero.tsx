import React, { useState } from 'react';
import { 
  Search, ArrowRight, ShieldCheck, Clock, Car, Star, 
  MapPin, CheckCircle2, Award, Phone, Sparkles, ChevronRight
} from 'lucide-react';
import { FilterState, Language, Car as CarType, DealershipSettings } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface HeroProps {
  onExploreStock: () => void;
  onOpenValuation: () => void;
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
  onOpenValuation,
  onApplyQuickFilter,
  availableBrands,
  totalCarsCount,
  language,
  dealershipSettings,
}) => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedFuel, setSelectedFuel] = useState('');
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<number>(0);
  const [bgImage, setBgImage] = useState(dealershipSettings.showroomImageUrl || '/hero-showroom.jpg');

  React.useEffect(() => {
    if (dealershipSettings.showroomImageUrl) {
      setBgImage(dealershipSettings.showroomImageUrl);
    }
  }, [dealershipSettings.showroomImageUrl]);

  const t = TRANSLATIONS[language]?.hero || TRANSLATIONS.nl.hero;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyQuickFilter({
      brand: selectedBrand,
      fuel: selectedFuel,
      maxPrice: selectedMaxPrice || 250000
    });
    onExploreStock();
  };

  return (
    <section id="hero" className="relative bg-[#0F0F10] text-white overflow-hidden border-b border-zinc-800">
      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt="Auto Sale Antwerpen Showroom"
          onError={() => setBgImage('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80')}
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Multilayered gradient overlay for readability and depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F10] via-transparent to-black/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6 sm:pt-14 sm:pb-12 flex flex-col justify-between min-h-[420px] sm:min-h-[520px]">
        {/* Top Badges Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#FF6B00] text-white text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Drive Your Dream</span>
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs text-gray-200 font-medium truncate max-w-[200px] sm:max-w-none">
              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FF6B00] shrink-0" />
              <span className="truncate">{dealershipSettings.address}, {dealershipSettings.city}</span>
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-gray-300 font-semibold">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Showroom Geopend</span>
            </span>
            <span className="hidden sm:inline text-gray-500">•</span>
            <span className="hidden sm:inline text-gray-400">Ma-Do 10:00-19:00 | Vr tot 16:30</span>
          </div>
        </div>

        {/* Central Content Area */}
        <div className="max-w-3xl space-y-3 sm:space-y-4 my-auto">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-1 flex items-center justify-center shadow-md shrink-0">
              <img src="/logo2.png" alt="Auto Sale" className="w-full h-full object-contain" />
            </div>
            <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs uppercase font-bold tracking-widest text-[#FF6B00]">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Erkend Traxio Concessiehouder • 25+ Jaar</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-6xl font-black font-['Outfit',sans-serif] tracking-tight leading-[1.1] text-white">
            Auto Sale <span className="text-[#FF6B00]">Antwerpen</span>
          </h1>

          <p className="text-xs sm:text-base text-gray-300 max-w-2xl leading-relaxed">
            Zorgvuldig geselecteerde, jonge directiewagens en premium tweedehandswagens. 
            Elk voertuig gekeurd met 113 controlepunten, officiële Car-Pass en tot 24 maanden Traxio garantie.
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1 sm:pt-2">
            <button
              onClick={onExploreStock}
              className="px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-2xl bg-[#FF6B00] hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-orange-500/25 flex items-center gap-2 cursor-pointer"
            >
              <span>Aanbod ({totalCarsCount})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenValuation}
              className="px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <Car className="w-4 h-4 text-[#FF6B00]" />
              <span>Inruilen / Taxatie</span>
            </button>

            <a
              href={`tel:${dealershipSettings.phoneRaw}`}
              className="px-3.5 py-2.5 sm:px-4 sm:py-3.5 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800 text-gray-300 hover:text-white border border-zinc-700 text-xs font-semibold transition-colors flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF6B00]" />
              <span className="font-bold text-white">{dealershipSettings.phone}</span>
            </a>
          </div>
        </div>

        {/* Quick Search & Filter Strip */}
        <div className="mt-4 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10">
          <form
            onSubmit={handleSearchSubmit}
            className="bg-zinc-900/90 backdrop-blur-md p-3 sm:p-4 rounded-3xl border border-white/10 shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center"
          >
            {/* Brand selector */}
            <div className="lg:col-span-3">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1 px-1">
                Merk
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-zinc-800/90 border border-zinc-700 rounded-xl px-3 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-[#FF6B00]"
              >
                <option value="">Alle Merken</option>
                {availableBrands.map((brand) => (
                  <option key={brand} value={brand} className="bg-zinc-900 text-white">
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            {/* Fuel selector */}
            <div className="lg:col-span-3">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1 px-1">
                Brandstof
              </label>
              <select
                value={selectedFuel}
                onChange={(e) => setSelectedFuel(e.target.value)}
                className="w-full bg-zinc-800/90 border border-zinc-700 rounded-xl px-3 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-[#FF6B00]"
              >
                <option value="">Alle Brandstoffen</option>
                <option value="Benzine">Benzine</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybride">Hybride</option>
                <option value="Elektrisch">100% Elektrisch</option>
              </select>
            </div>

            {/* Max budget selector */}
            <div className="lg:col-span-3">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1 px-1">
                Budget tot
              </label>
              <select
                value={selectedMaxPrice}
                onChange={(e) => setSelectedMaxPrice(Number(e.target.value))}
                className="w-full bg-zinc-800/90 border border-zinc-700 rounded-xl px-3 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-[#FF6B00]"
              >
                <option value={0}>Geen limiet</option>
                <option value={20000}>Tot € 20.000</option>
                <option value={35000}>Tot € 35.000</option>
                <option value={50000}>Tot € 50.000</option>
                <option value={75000}>Tot € 75.000</option>
                <option value={100000}>Tot € 100.000+</option>
              </select>
            </div>

            {/* Search button */}
            <div className="lg:col-span-3 flex items-end">
              <button
                type="submit"
                className="w-full mt-auto bg-[#FF6B00] hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md shadow-orange-500/20"
              >
                <Search className="w-4 h-4" />
                <span>Zoek In Aanbod</span>
                <span className="ml-1 px-1.5 py-0.5 rounded bg-black/30 text-[10px] font-mono">
                  {totalCarsCount}
                </span>
              </button>
            </div>
          </form>

          {/* Micro Trust Strip below search */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 text-[11px] text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0" />
              <span>100% Car-Pass Historiek</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>113 Traxio Controlepunten</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
              <span>4.9 / 5 Google Score (280+ reviews)</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#FF6B00] shrink-0" />
              <span>Directe Overname binnen 24u</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
