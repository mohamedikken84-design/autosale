import React from 'react';
import { 
  ShieldCheck, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  Car, 
  Star, 
  Award,
  Sparkles,
  ChevronDown,
  Clock,
  CarFront
} from 'lucide-react';
import { DEALERSHIP_INFO } from '../data/dealership';
import { FilterState } from '../types';

interface HeroProps {
  onExploreStock: () => void;
  onOpenValuation: () => void;
  onApplyQuickFilter: (filters: Partial<FilterState>) => void;
  availableBrands: string[];
  totalCarsCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreStock,
  onOpenValuation,
  onApplyQuickFilter,
  availableBrands,
  totalCarsCount
}) => {
  const [selectedBrand, setSelectedBrand] = React.useState('');
  const [selectedFuel, setSelectedFuel] = React.useState('');
  const [selectedMaxPrice, setSelectedMaxPrice] = React.useState<number>(0);

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
    <section id="hero" className="bg-white pt-6 pb-14 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Bento Block 1: Main Dark Showcase (8 cols, row-span-2) */}
          <div className="lg:col-span-8 bg-[#1A1A1A] rounded-3xl relative overflow-hidden flex flex-col justify-between p-8 sm:p-12 min-h-[460px] text-white group">
            {/* Background image overlay with gradient */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent pointer-events-none" />

            {/* Top row of Hero Bento */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
              <span className="bg-[#FF6B00] text-white px-4 py-1.5 font-bold text-xs uppercase tracking-widest rounded-full shadow-sm">
                Showroom Antwerpen • {totalCarsCount} Wagens
              </span>
              <span className="text-gray-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Traxio & Car-Pass Gecertificeerd
              </span>
            </div>

            {/* Center/Bottom Content */}
            <div className="relative z-10 space-y-4 max-w-2xl mt-12">
              <h1 className="text-white text-4xl sm:text-6xl font-black tracking-tighter leading-none font-['Outfit',sans-serif]">
                AUTO SALE <span className="text-[#FF6B00]">ANTWERPEN</span>
              </h1>
              <p className="text-gray-300 text-base sm:text-lg font-medium leading-relaxed">
                Exclusieve & jonge tweedehandswagens. Uitmuntende staat, extreme selectiviteit en 100% Car-Pass historiek sinds 1999.
              </p>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  onClick={onExploreStock}
                  className="bg-[#FF6B00] text-white px-8 py-4 font-bold uppercase text-xs tracking-widest rounded-2xl hover:bg-orange-600 transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-lg shadow-orange-500/20"
                >
                  <span>Ontdek Onze Stock</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenValuation}
                  className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-xs border border-white/20 px-6 py-4 font-bold uppercase text-xs tracking-widest rounded-2xl transition-all duration-200 cursor-pointer flex items-center gap-2"
                >
                  <Car className="w-4 h-4 text-[#FF6B00]" />
                  <span>Wagen Inruilen</span>
                </button>
              </div>
            </div>

            {/* Decorative Background Watermark */}
            <div className="absolute -bottom-8 -right-8 opacity-5 text-[160px] sm:text-[200px] font-black text-white italic tracking-tighter pointer-events-none select-none">
              SPORT
            </div>
          </div>

          {/* Bento Block 2: Opening Hours (4 cols) */}
          <div className="lg:col-span-4 bg-[#F8F8F8] rounded-3xl p-6 sm:p-8 border border-gray-200 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold uppercase text-xs tracking-widest text-gray-500">
                  Showroom Openingsuren
                </h3>
                <div className="text-lg font-black text-[#1A1A1A] tracking-tight mt-0.5">
                  Sint-Bernardsesteenweg 733
                </div>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse mt-1" title="Open"></div>
            </div>

            <div className="my-5 space-y-2.5 text-xs">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-bold text-[#1A1A1A]">Maandag - Donderdag</span>
                <span className="font-semibold text-gray-700">10:00 - 19:00</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-bold text-[#1A1A1A]">Vrijdag</span>
                <span className="font-semibold text-gray-700">10:00 - 16:30</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="font-bold text-[#1A1A1A]">Zaterdag</span>
                <span className="font-bold text-[#FF6B00]">Op afspraak</span>
              </div>
            </div>

            <div className="text-[11px] text-gray-500 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>Buiten openingsuren altijd welkom na afspraak</span>
            </div>
          </div>

          {/* Bento Block 3: Direct Car Valuation Orange Punch Card (4 cols) */}
          <div 
            onClick={onOpenValuation}
            className="lg:col-span-4 bg-[#FF6B00] rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between group cursor-pointer hover:bg-orange-600 transition-all duration-200 shadow-md"
          >
            <div className="space-y-1">
              <span className="text-xs uppercase font-bold tracking-widest text-white/80">
                Inkoop & Overname
              </span>
              <div className="text-3xl sm:text-4xl font-black tracking-tight font-['Outfit',sans-serif] leading-tight">
                Wagen verkopen?
              </div>
              <p className="text-white/90 text-xs mt-1">
                Ontvang binnen 24 uur een gegarandeerd overnamebod met directe bankoverschrijving.
              </p>
            </div>

            <div className="flex items-center gap-2 font-bold uppercase text-xs tracking-widest pt-4 group-hover:translate-x-1 transition-transform">
              <span>Directe Taxatie</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Bento Block 4: Featured Spotlight 1 (4 cols) */}
          <div 
            onClick={onExploreStock}
            className="lg:col-span-4 bg-white border-2 border-[#1A1A1A] rounded-3xl p-6 flex items-center gap-5 hover:border-[#FF6B00] transition-colors cursor-pointer group"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-2xl overflow-hidden shrink-0 flex items-center justify-center font-black text-gray-400 italic">
              <img 
                src="https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=400&q=80" 
                alt="Range Rover Sport" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                Hybride • 440 PK
              </span>
              <h4 className="font-black text-base text-[#1A1A1A] truncate tracking-tight">
                Range Rover Sport P440e
              </h4>
              <p className="text-[#FF6B00] font-black text-lg tracking-tight">
                € 94.950
              </p>
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter mt-0.5">
                Autobiography • Luchtvering
              </p>
            </div>
          </div>

          {/* Bento Block 5: Featured Spotlight 2 (4 cols) */}
          <div 
            onClick={onExploreStock}
            className="lg:col-span-4 bg-white border-2 border-[#1A1A1A] rounded-3xl p-6 flex items-center gap-5 hover:border-[#FF6B00] transition-colors cursor-pointer group"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-2xl overflow-hidden shrink-0 flex items-center justify-center font-black text-gray-400 italic">
              <img 
                src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=400&q=80" 
                alt="Mercedes-AMG G63" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                V8 Biturbo • 585 PK
              </span>
              <h4 className="font-black text-base text-[#1A1A1A] truncate tracking-tight">
                Mercedes-AMG G63
              </h4>
              <p className="text-[#FF6B00] font-black text-lg tracking-tight">
                € 168.950
              </p>
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter mt-0.5">
                Night Package • Exclusive
              </p>
            </div>
          </div>

          {/* Bento Block 6: Customer Testimonial Bento with Orange Accent Border (4 cols) */}
          <div className="lg:col-span-4 bg-[#1A1A1A] rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between border-2 border-[#FF6B00] shadow-sm">
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-3.5 h-3.5 bg-[#FF6B00] rounded-xs"></div>
              ))}
            </div>
            <p className="text-xs sm:text-sm italic font-medium leading-relaxed text-gray-200">
              "Zeer correcte en professionele afhandeling door Michel. Mijn Range Rover was in absolute nieuwstaat afgeleverd met volledige Car-Pass!"
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00]">
                — Marc V., Antwerpen
              </span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                Google 4.7★
              </span>
            </div>
          </div>

          {/* Bento Block 7: Quick Search & Filter Bento Bar (Full width, 12 cols) */}
          <div className="lg:col-span-12 bg-[#F8F8F8] rounded-3xl p-6 sm:p-8 border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1A1A1A]">
                <Search className="w-4 h-4 text-[#FF6B00]" />
                <span>Vind Uw Wagen in Onze Stock</span>
              </div>
              <span className="text-xs text-gray-500 font-semibold">
                Actuele voorraad: <strong className="text-[#1A1A1A]">{totalCarsCount} gecontroleerde wagens</strong>
              </span>
            </div>

            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Brand Selector */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                  Merk
                </label>
                <div className="relative">
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    aria-label="Filter op merk"
                    className="w-full bg-white border border-gray-200 text-[#1A1A1A] text-xs font-bold rounded-2xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  >
                    <option value="">Alle Merken</option>
                    {availableBrands.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Fuel Selector */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                  Aandrijving / Brandstof
                </label>
                <div className="relative">
                  <select
                    value={selectedFuel}
                    onChange={(e) => setSelectedFuel(e.target.value)}
                    aria-label="Filter op brandstof"
                    className="w-full bg-white border border-gray-200 text-[#1A1A1A] text-xs font-bold rounded-2xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  >
                    <option value="">Alle Brandstoffen</option>
                    <option value="Plug-in Hybride">Plug-in Hybride (PHEV)</option>
                    <option value="Elektrisch">100% Elektrisch (EV)</option>
                    <option value="Benzine">Benzine</option>
                    <option value="Diesel">Diesel</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Max Price */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                  Budget Limiet
                </label>
                <div className="relative">
                  <select
                    value={selectedMaxPrice}
                    onChange={(e) => setSelectedMaxPrice(Number(e.target.value))}
                    aria-label="Filter op budget"
                    className="w-full bg-white border border-gray-200 text-[#1A1A1A] text-xs font-bold rounded-2xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  >
                    <option value={0}>Geen limiet</option>
                    <option value={35000}>Tot € 35.000</option>
                    <option value={50000}>Tot € 50.000</option>
                    <option value={75000}>Tot € 75.000</option>
                    <option value={100000}>Tot € 100.000</option>
                    <option value={150000}>Tot € 150.000</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Search CTA */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-[#1A1A1A] hover:bg-[#FF6B00] text-white font-bold uppercase text-xs tracking-widest py-3 px-4 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Search className="w-4 h-4 text-[#FF6B00] group-hover:text-white" />
                  <span>Toon Selectie</span>
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
