import React, { useState } from 'react';
import { 
  Search, SlidersHorizontal, RotateCcw, Car, Sparkles, 
  ChevronDown, Phone, MessageCircle, Lock, ArrowRight, 
  Send, CheckCircle2, ShieldCheck, Clock
} from 'lucide-react';
import { Car as CarType, FilterState, Category, Language, Currency, DealershipSettings } from '../types';
import { CarCard } from './CarCard';
import { TRANSLATIONS } from '../i18n/translations';

interface InventoryGridProps {
  cars: CarType[];
  filterState: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  favorites: string[];
  onToggleFavorite: (carId: string) => void;
  onSelectCar: (car: CarType) => void;
  onRequestTestDrive: (car: CarType) => void;
  availableBrands: string[];
  language: Language;
  currency: Currency;
  dealershipSettings: DealershipSettings;
  onOpenDealerLogin: () => void;
  onLoadSampleCars?: () => void;
  onConciergeSubmit?: (data: { brand: string; model: string; maxBudget: string; name: string; phone: string; email: string }) => void;
}

export const InventoryGrid: React.FC<InventoryGridProps> = ({
  cars,
  filterState,
  onFilterChange,
  onResetFilters,
  favorites,
  onToggleFavorite,
  onSelectCar,
  onRequestTestDrive,
  availableBrands,
  language,
  currency,
  dealershipSettings,
  onOpenDealerLogin,
  onLoadSampleCars,
  onConciergeSubmit
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [stockView, setStockView] = useState<'available' | 'sold'>('available');
  const [conciergeBrand, setConciergeBrand] = useState('');
  const [conciergeModel, setConciergeModel] = useState('');
  const [conciergeBudget, setConciergeBudget] = useState('');
  const [conciergeName, setConciergeName] = useState('');
  const [conciergePhone, setConciergePhone] = useState('');
  const [conciergeEmail, setConciergeEmail] = useState('');
  const [conciergeSubmitted, setConciergeSubmitted] = useState(false);

  const t = TRANSLATIONS[language]?.inventory || TRANSLATIONS.nl.inventory;

  const availableCarsCount = cars.filter((c) => c.status !== 'sold').length;
  const soldCarsCount = cars.filter((c) => c.status === 'sold').length;

  const displayedCars = cars.filter((c) =>
    stockView === 'sold' ? c.status === 'sold' : c.status !== 'sold'
  );

  const handleConciergeFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onConciergeSubmit) {
      onConciergeSubmit({
        brand: conciergeBrand,
        model: conciergeModel,
        maxBudget: conciergeBudget,
        name: conciergeName,
        phone: conciergePhone,
        email: conciergeEmail
      });
    }
    setConciergeSubmitted(true);
  };

  const categoryTabs: { id: Category; label: string }[] = [
    { id: 'all', label: t.tabAll },
    { id: 'premium', label: t.tabPremium },
    { id: 'hybrid-electric', label: t.tabEco },
    { id: 'export-handelaar', label: t.tabExport }
  ];

  const hasActiveFilters = 
    filterState.searchQuery !== '' ||
    filterState.brand !== '' ||
    filterState.category !== 'all' ||
    filterState.fuel !== '' ||
    filterState.transmission !== '' ||
    filterState.maxPrice < 250000;

  return (
    <section id="stock" className="py-8 sm:py-14 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-[#FF6B00] mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF6B00]"></span>
              <span>{dealershipSettings.city} • Antwerpen</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-zinc-950 font-['Outfit',sans-serif] tracking-tight">
              {stockView === 'sold' ? 'Recent Verkochte Wagens' : t.title}
            </h2>
            <p className="mt-0.5 text-xs sm:text-sm text-zinc-500 max-w-xl">
              {stockView === 'sold'
                ? 'Bekijk de exclusieve wagens die recent door Auto Sale NV zijn geleverd aan tevreden particulieren en ondernemers.'
                : t.subtitle}
            </p>
          </div>

          {/* Sortering dropdown & Stock/Sold Toggle */}
          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
            {/* Actueel vs Verkocht Toggle */}
            <div className="flex items-center p-1 bg-zinc-100 rounded-2xl border border-zinc-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => setStockView('available')}
                className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                  stockView === 'available'
                    ? 'bg-zinc-950 text-white shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                Actueel ({availableCarsCount})
              </button>
              <button
                type="button"
                onClick={() => setStockView('sold')}
                className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  stockView === 'sold'
                    ? 'bg-[#FF6B00] text-white shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verkocht ({soldCarsCount})</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <select
                  value={filterState.sortBy}
                  onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
                  aria-label="Sorteer wagens"
                  className="bg-zinc-50 border border-zinc-200 text-zinc-900 text-xs font-bold rounded-xl px-3 py-1.5 sm:py-2 pr-7 appearance-none focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                >
                  <option value="featured">{t.sortFeatured}</option>
                  <option value="price-asc">{t.sortPriceAsc}</option>
                  <option value="price-desc">{t.sortPriceDesc}</option>
                  <option value="year-desc">{t.sortYearDesc}</option>
                  <option value="mileage-asc">{t.sortKmAsc}</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-500 absolute right-2 top-2.5 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Category Tabs - Bento Pill Style */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2.5 mb-4 sm:mb-6 scrollbar-none">
          {categoryTabs.map((tab) => {
            const isActive = filterState.category === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onFilterChange({ category: tab.id })}
                className={`whitespace-nowrap px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#FF6B00] text-white shadow-sm'
                    : 'bg-[#F8F8F8] text-[#1A1A1A] hover:bg-gray-200 border border-gray-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search & Filter Control Bar - Bento Box Style */}
        <div className="bg-[#F8F8F8] rounded-2xl sm:rounded-3xl border border-gray-200 p-3.5 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={filterState.searchQuery}
                onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
                placeholder={t.searchPlaceholder}
                className="w-full bg-white border border-gray-200 text-[#1A1A1A] text-xs font-semibold rounded-2xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] placeholder:text-gray-400"
              />
              {filterState.searchQuery && (
                <button
                  onClick={() => onFilterChange({ searchQuery: '' })}
                  className="absolute right-3.5 top-3.5 text-xs font-bold text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Brand Filter */}
            {availableBrands.length > 0 && (
              <div className="w-full md:w-52">
                <select
                  value={filterState.brand}
                  onChange={(e) => onFilterChange({ brand: e.target.value })}
                  aria-label="Filter op merk"
                  className="w-full bg-white border border-gray-200 text-[#1A1A1A] text-xs font-bold rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                >
                  <option value="">Alle Merken</option>
                  {availableBrands.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Advanced Filters Toggle Button */}
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                showAdvancedFilters || hasActiveFilters
                  ? 'bg-[#FF6B00] text-white border-[#FF6B00]'
                  : 'bg-white text-[#1A1A1A] border-gray-200 hover:bg-gray-50'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>{t.filterToggle}</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              )}
            </button>

            {/* Reset Filters button */}
            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-2xl text-xs font-bold text-gray-600 hover:text-[#FF6B00] bg-white border border-gray-200 transition-colors cursor-pointer"
                title={t.resetFilters}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.resetFilters}</span>
              </button>
            )}
          </div>

          {/* Advanced collapsible filters */}
          {showAdvancedFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Brandstof */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                  Brandstoftype
                </label>
                <select
                  value={filterState.fuel}
                  onChange={(e) => onFilterChange({ fuel: e.target.value })}
                  className="w-full bg-white border border-gray-200 text-[#1A1A1A] text-xs font-bold rounded-2xl px-3.5 py-2.5"
                >
                  <option value="">Alle brandstoffen</option>
                  <option value="Plug-in Hybride">Plug-in Hybride</option>
                  <option value="Elektrisch">Elektrisch</option>
                  <option value="Benzine">Benzine</option>
                  <option value="Diesel">Diesel</option>
                </select>
              </div>

              {/* Transmissie */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                  Transmissie
                </label>
                <select
                  value={filterState.transmission}
                  onChange={(e) => onFilterChange({ transmission: e.target.value })}
                  className="w-full bg-white border border-gray-200 text-[#1A1A1A] text-xs font-bold rounded-2xl px-3.5 py-2.5"
                >
                  <option value="">Alle versnellingsbakken</option>
                  <option value="Automaat">Automaat</option>
                  <option value="Manueel">Manueel</option>
                </select>
              </div>

              {/* Maximaal Budget Slider */}
              <div>
                <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                  <span>Max. Prijs:</span>
                  <span className="font-black text-[#FF6B00]">
                    {filterState.maxPrice >= 250000 
                      ? 'Geen limiet' 
                      : `€${filterState.maxPrice.toLocaleString('nl-BE')}`}
                  </span>
                </div>
                <input
                  type="range"
                  min="25000"
                  max="250000"
                  step="5000"
                  value={filterState.maxPrice}
                  onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) })}
                  className="w-full accent-[#FF6B00] cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 text-xs text-zinc-500">
          <div className="font-semibold text-zinc-800">
            <span className="text-[#FF6B00] font-extrabold text-sm">{displayedCars.length}</span> {t.resultsCount}
            {stockView === 'sold' && (
              <span className="ml-2 text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                Geleverd aan klanten
              </span>
            )}
          </div>
          {favorites.length > 0 && (
            <span className="text-[#FF6B00] font-medium">
              ★ {favorites.length} wagens bewaard
            </span>
          )}
        </div>

        {/* Cars Grid or Empty State */}
        {displayedCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {displayedCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                isFavorite={favorites.includes(car.id)}
                onToggleFavorite={onToggleFavorite}
                onSelectCar={onSelectCar}
                onRequestTestDrive={onRequestTestDrive}
                language={language}
                currency={currency}
              />
            ))}
          </div>
        ) : (
          /* Enhanced Active Showroom Concierge when Stock is Fresh */
          <div className="space-y-8">
            {/* Top Status & Sample Car Loader Bar */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-black/5 border border-zinc-200 p-1.5 flex items-center justify-center shrink-0 shadow-xs">
                  <img src="/logo2.png" alt="Auto Sale Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-100 text-[#FF6B00] font-black text-[10px] uppercase tracking-wider">
                      <Sparkles className="w-3 h-3" />
                      Wagenpark in continue vernieuwing
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-zinc-950 font-['Outfit',sans-serif] tracking-tight mt-0.5">
                    Zoekt u een specifieke premium wagen?
                  </h3>
                  <p className="text-xs text-zinc-500 max-w-xl mt-0.5 leading-relaxed">
                    Nieuwe directiewagens en exclusieve overnames komen dagelijks binnen. 
                    Gebruik onze gratis Auto Sale Concierge of laad direct de voorbeeldcollectie.
                  </p>
                </div>
              </div>

              {onLoadSampleCars && (
                <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
                  <button
                    onClick={onLoadSampleCars}
                    className="w-full md:w-auto px-5 py-3 rounded-2xl bg-[#FF6B00] hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Car className="w-4 h-4" />
                    <span>Toon Voorbeeldcollectie (5 Wagens)</span>
                  </button>
                </div>
              )}
            </div>

            {/* 2-Column Bento: Car Concierge Form & Expected Arrivals */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left Col: Zoekopdracht op Maat (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FF6B00] mb-2">
                    <Search className="w-3.5 h-3.5" />
                    <span>Auto Sale Car Concierge</span>
                  </div>
                  <h4 className="text-lg font-black text-zinc-950 font-['Outfit',sans-serif]">
                    Gratis Zoekopdracht op Maat
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                    Heeft u een specifiek merk, model of optiepakket in gedachten? Ons netwerk in België en Duitsland zoekt binnen 24 uur uw droomwagen met Car-Pass en garantie.
                  </p>

                  {conciergeSubmitted ? (
                    <div className="my-6 p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                      <div className="font-bold text-zinc-900 text-sm">Aanvraag succesvol ontvangen!</div>
                      <p className="text-xs text-zinc-600">
                        Ons salesteam neemt binnen 24 uur contact met u op met een passend voorstel.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleConciergeFormSubmit} className="mt-4 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-zinc-600 mb-1">Gewenst Merk</label>
                          <input
                            type="text"
                            required
                            placeholder="bv. Porsche, BMW, Mercedes"
                            value={conciergeBrand}
                            onChange={(e) => setConciergeBrand(e.target.value)}
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-900 focus:outline-none focus:border-[#FF6B00]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-zinc-600 mb-1">Model / Uitvoering</label>
                          <input
                            type="text"
                            required
                            placeholder="bv. Taycan, M4, G 63"
                            value={conciergeModel}
                            onChange={(e) => setConciergeModel(e.target.value)}
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-900 focus:outline-none focus:border-[#FF6B00]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-zinc-600 mb-1">Richtbudget (€)</label>
                          <input
                            type="text"
                            placeholder="bv. € 65.000"
                            value={conciergeBudget}
                            onChange={(e) => setConciergeBudget(e.target.value)}
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-900 focus:outline-none focus:border-[#FF6B00]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-zinc-600 mb-1">Uw Naam</label>
                          <input
                            type="text"
                            required
                            placeholder="Voor- en achternaam"
                            value={conciergeName}
                            onChange={(e) => setConciergeName(e.target.value)}
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-900 focus:outline-none focus:border-[#FF6B00]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-zinc-600 mb-1">Telefoonnummer</label>
                          <input
                            type="tel"
                            required
                            placeholder="+32 4..."
                            value={conciergePhone}
                            onChange={(e) => setConciergePhone(e.target.value)}
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-900 focus:outline-none focus:border-[#FF6B00]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-zinc-600 mb-1">E-mailadres</label>
                          <input
                            type="email"
                            required
                            placeholder="naam@voorbeeld.be"
                            value={conciergeEmail}
                            onChange={(e) => setConciergeEmail(e.target.value)}
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-900 focus:outline-none focus:border-[#FF6B00]"
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <span className="text-[11px] text-zinc-400 flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                          Geheel vrijblijvend & binnen 24 uur antwoord
                        </span>

                        <button
                          type="submit"
                          className="px-5 py-2.5 rounded-xl bg-[#1A1A1A] hover:bg-black text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
                        >
                          <Send className="w-3.5 h-3.5 text-[#FF6B00]" />
                          <span>Verstuur Zoekopdracht</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500">
                  <span>Of direct advies van onze zaakvoerder:</span>
                  <div className="flex items-center gap-3">
                    <a
                      href={`https://wa.me/${dealershipSettings.whatsapp.replace(/[^0-9]/g, '')}?text=Hallo%20Auto%20Sale%2C%20ik%20heb%20een%20specifieke%20zoekopdracht.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 font-bold hover:underline flex items-center gap-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                    </a>
                    <span>•</span>
                    <a
                      href={`tel:${dealershipSettings.phoneRaw}`}
                      className="text-zinc-800 font-bold hover:underline flex items-center gap-1"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#FF6B00]" /> {dealershipSettings.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Col: Binnenkort Verwacht in de Showroom (5 cols) */}
              <div className="lg:col-span-5 bg-gradient-to-br from-zinc-900 to-black text-white rounded-3xl p-6 sm:p-8 border border-zinc-800 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FF6B00] mb-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>In Voorbereiding</span>
                  </div>
                  <h4 className="text-lg font-black font-['Outfit',sans-serif]">
                    Binnenkort Verwacht in Showroom
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    Onderstaande voertuigen zijn recent ingekocht en worden momenteel technisch gekeurd volgens de 113 Traxio-inspectiepunten:
                  </p>

                  <div className="mt-4 space-y-2.5">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-xs text-white">Porsche Taycan 4S</div>
                        <div className="text-[10px] text-zinc-400">2023 • 18.500 km • Performance Battery</div>
                      </div>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#FF6B00]/20 text-[#FF6B00] border border-[#FF6B00]/30">
                        In Keuring
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-xs text-white">Mercedes-Benz G 63 AMG</div>
                        <div className="text-[10px] text-zinc-400">2022 • 32.000 km • V8 Biturbo Night Pack</div>
                      </div>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        Poetsfase
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-xs text-white">BMW M4 Competition xDrive</div>
                        <div className="text-[10px] text-zinc-400">2023 • 14.200 km • Isle of Man Green</div>
                      </div>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        Car-Pass Ok
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                  <span className="text-zinc-400 text-[11px]">Dealer Beheerpaneel:</span>
                  <button
                    onClick={onOpenDealerLogin}
                    className="inline-flex items-center gap-1.5 text-xs text-[#FF6B00] hover:text-orange-400 font-bold transition-colors cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Inloggen als Dealer</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
