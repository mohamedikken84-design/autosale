import React, { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  ChevronDown,
  Phone,
  MessageCircle,
  Send,
  CheckCircle2,
  CarFront,
} from 'lucide-react';
import { Car as CarType, FilterState, Language, Currency, DealershipSettings } from '../types';
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
  onConciergeSubmit,
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
  const tHero = TRANSLATIONS[language]?.hero || TRANSLATIONS.nl.hero;
  const tValuation = TRANSLATIONS[language]?.valuation || TRANSLATIONS.nl.valuation;

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
        email: conciergeEmail,
      });
    }
    setConciergeSubmitted(true);
  };

  const hasActiveFilters =
    filterState.searchQuery !== '' ||
    filterState.brand !== '' ||
    filterState.category !== 'all' ||
    filterState.fuel !== '' ||
    filterState.transmission !== '' ||
    filterState.maxPrice < 250000;

  return (
    <section id="stock" className="py-10 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#FF6B00] mb-1">
              {dealershipSettings.city}
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-950 font-['Outfit',sans-serif] tracking-tight">
              {stockView === 'sold' ? t.soldTitle : t.title}
            </h2>
            <p className="mt-1 text-sm text-zinc-500 max-w-xl">
              {stockView === 'sold' ? t.soldSubtitle : t.subtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 w-full md:w-auto">
            <div className="grid grid-cols-2 sm:flex items-center p-1 bg-zinc-100 rounded-xl border border-zinc-200 text-xs font-semibold w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setStockView('available')}
                className={`min-h-[40px] px-3 sm:px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap truncate ${
                  stockView === 'available'
                    ? 'bg-zinc-950 text-white'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                {t.currentStock} ({availableCarsCount})
              </button>
              <button
                type="button"
                onClick={() => setStockView('sold')}
                className={`min-h-[40px] px-3 sm:px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap truncate ${
                  stockView === 'sold'
                    ? 'bg-[#FF6B00] text-white'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                {t.soldStock} ({soldCarsCount})
              </button>
            </div>

            <div className="relative w-full sm:w-auto">
              <select
                value={filterState.sortBy}
                onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
                aria-label={t.sortBy}
                className="w-full sm:w-auto min-h-[42px] bg-zinc-50 border border-zinc-200 text-zinc-900 text-base sm:text-xs font-semibold rounded-xl px-3.5 py-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-[#FF6B00] cursor-pointer"
              >
                <option value="featured">{t.sortFeatured}</option>
                <option value="price-asc">{t.sortPriceAsc}</option>
                <option value="price-desc">{t.sortPriceDesc}</option>
                <option value="year-desc">{t.sortYearDesc}</option>
                <option value="mileage-asc">{t.sortKmAsc}</option>
              </select>
              <ChevronDown className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-zinc-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Clean Filter Bar */}
        <div className="bg-zinc-50 rounded-2xl border border-zinc-200 p-3.5 sm:p-4 mb-6 sm:mb-8">
          <div className="flex flex-col md:flex-row gap-2.5 sm:gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={filterState.searchQuery}
                onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
                placeholder={t.searchPlaceholder}
                className="w-full min-h-[44px] bg-white border border-zinc-200 text-zinc-950 text-base sm:text-sm rounded-xl pl-10 pr-9 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] placeholder:text-zinc-400"
              />
              {filterState.searchQuery && (
                <button
                  type="button"
                  onClick={() => onFilterChange({ searchQuery: '' })}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-xs font-bold text-zinc-400 hover:text-zinc-700 cursor-pointer"
                  aria-label="Zoekopdracht wissen"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 md:flex items-center gap-2.5">
              {availableBrands.length > 0 && (
                <div className="col-span-1 md:w-52">
                  <select
                    value={filterState.brand}
                    onChange={(e) => onFilterChange({ brand: e.target.value })}
                    aria-label={tHero.brand}
                    className="w-full min-h-[44px] bg-white border border-zinc-200 text-zinc-950 text-base sm:text-sm font-medium rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  >
                    <option value="">{tHero.allBrands}</option>
                    {availableBrands.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              )}

              <button
                type="button"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`min-h-[44px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer whitespace-nowrap ${
                  availableBrands.length === 0 ? 'col-span-2' : 'col-span-1'
                } ${
                  showAdvancedFilters || hasActiveFilters
                    ? 'bg-[#FF6B00] text-white border-[#FF6B00]'
                    : 'bg-white text-zinc-900 border-zinc-200 hover:bg-zinc-100'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>{t.filterToggle}</span>
              </button>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={onResetFilters}
                  className="col-span-2 md:col-span-1 min-h-[44px] flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-700 hover:text-[#FF6B00] bg-white border border-zinc-200 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.resetFilters}</span>
                </button>
              )}
            </div>
          </div>

          {showAdvancedFilters && (
            <div className="mt-4 pt-4 border-t border-zinc-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-1.5">
                  {t.fuelType}
                </label>
                <select
                  value={filterState.fuel}
                  onChange={(e) => onFilterChange({ fuel: e.target.value })}
                  className="w-full min-h-[44px] bg-white border border-zinc-200 text-zinc-900 text-base sm:text-sm rounded-xl px-3.5 py-2"
                >
                  <option value="">{tHero.allFuels}</option>
                  <option value="Benzine">{tHero.petrol}</option>
                  <option value="Diesel">{tHero.diesel}</option>
                  <option value="Hybride">{tHero.hybrid}</option>
                  <option value="Elektrisch">{tHero.electric}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-1.5">
                  {t.transmission}
                </label>
                <select
                  value={filterState.transmission}
                  onChange={(e) => onFilterChange({ transmission: e.target.value })}
                  className="w-full min-h-[44px] bg-white border border-zinc-200 text-zinc-900 text-base sm:text-sm rounded-xl px-3.5 py-2"
                >
                  <option value="">{t.allTransmissions}</option>
                  <option value="Automaat">{t.automatic}</option>
                  <option value="Manueel">{t.manual}</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-semibold text-zinc-600 mb-1.5">
                  <span>{t.maxBudget}</span>
                  <span className="font-bold text-[#FF6B00] tabular-nums">
                    {filterState.maxPrice >= 250000
                      ? tHero.noLimit
                      : `€ ${filterState.maxPrice.toLocaleString('nl-BE')}`}
                  </span>
                </div>
                <input
                  type="range"
                  min="15000"
                  max="250000"
                  step="5000"
                  value={filterState.maxPrice}
                  onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) })}
                  className="w-full accent-[#FF6B00] cursor-pointer mt-2 h-2"
                />
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6 text-xs text-zinc-500">
          <div className="font-medium text-zinc-700 tabular-nums">
            <span className="text-[#FF6B00] font-bold text-sm">{displayedCars.length}</span> {t.resultsCount}
          </div>
          {favorites.length > 0 && (
            <span className="text-[#FF6B00] font-semibold tabular-nums">
              {favorites.length} bewaard
            </span>
          )}
        </div>

        {/* Cars Grid or Clean Empty State */}
        {displayedCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
        ) : hasActiveFilters ? (
          <div className="bg-zinc-50 rounded-2xl border border-zinc-200 p-10 text-center space-y-3">
            <CarFront className="w-10 h-10 text-zinc-400 mx-auto" />
            <h3 className="text-lg font-bold text-zinc-900">{t.emptyTitle}</h3>
            <p className="text-sm text-zinc-500 max-w-md mx-auto">{t.emptyText}</p>
            <button
              type="button"
              onClick={onResetFilters}
              className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.resetFilters}</span>
            </button>
          </div>
        ) : stockView === 'sold' ? (
          <div className="bg-zinc-50 rounded-2xl border border-zinc-200 p-10 text-center space-y-2">
            <CarFront className="w-10 h-10 text-zinc-400 mx-auto" />
            <h3 className="text-lg font-bold text-zinc-900">{t.soldTitle}</h3>
            <p className="text-sm text-zinc-500 max-w-md mx-auto">
              Er zijn momenteel nog geen verkochte voertuigen gearchiveerd.
            </p>
          </div>
        ) : (
          /* Clean Concierge Search Request Card when stock is empty */
          <div className="bg-zinc-50 rounded-2xl p-5 sm:p-8 border border-zinc-200 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 sm:pb-6 border-b border-zinc-200">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-950 font-['Outfit',sans-serif] tracking-tight">
                  {t.conciergeTitle}
                </h3>
                <p className="text-sm text-zinc-500 mt-1 max-w-xl">
                  {t.conciergeSubtitle}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:flex items-center gap-2.5 shrink-0">
                <a
                  href={`https://wa.me/${dealershipSettings.whatsapp.replace(/[^0-9]/g, '')}?text=Hallo%20Auto%20Sale%2C%20ik%20heb%20een%20zoekopdracht%20voor%20een%20wagen.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={`tel:${dealershipSettings.phoneRaw}`}
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-950 hover:bg-black text-white font-semibold text-xs transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#FF6B00]" />
                  <span>Bellen</span>
                </a>
              </div>
            </div>

            {conciergeSubmitted ? (
              <div className="my-6 p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <div className="font-bold text-zinc-900 text-sm">{t.conciergeSuccess}</div>
              </div>
            ) : (
              <form onSubmit={handleConciergeFormSubmit} className="mt-5 sm:mt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">{tHero.brand}</label>
                    <input
                      type="text"
                      required
                      placeholder="Porsche, BMW..."
                      value={conciergeBrand}
                      onChange={(e) => setConciergeBrand(e.target.value)}
                      className="w-full min-h-[44px] bg-white border border-zinc-200 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-zinc-900 focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">Model</label>
                    <input
                      type="text"
                      required
                      placeholder="Taycan, X5..."
                      value={conciergeModel}
                      onChange={(e) => setConciergeModel(e.target.value)}
                      className="w-full min-h-[44px] bg-white border border-zinc-200 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-zinc-900 focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">{t.maxBudget} (€)</label>
                    <input
                      type="text"
                      placeholder="€ 65.000"
                      value={conciergeBudget}
                      onChange={(e) => setConciergeBudget(e.target.value)}
                      className="w-full min-h-[44px] bg-white border border-zinc-200 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-zinc-900 focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">{tValuation.name}</label>
                    <input
                      type="text"
                      required
                      placeholder="Naam"
                      value={conciergeName}
                      onChange={(e) => setConciergeName(e.target.value)}
                      className="w-full min-h-[44px] bg-white border border-zinc-200 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-zinc-900 focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">{tValuation.phone}</label>
                    <input
                      type="tel"
                      required
                      placeholder="+32 4..."
                      value={conciergePhone}
                      onChange={(e) => setConciergePhone(e.target.value)}
                      className="w-full min-h-[44px] bg-white border border-zinc-200 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-zinc-900 focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">{tValuation.email}</label>
                    <input
                      type="email"
                      required
                      placeholder="naam@email.be"
                      value={conciergeEmail}
                      onChange={(e) => setConciergeEmail(e.target.value)}
                      className="w-full min-h-[44px] bg-white border border-zinc-200 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-zinc-900 focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto min-h-[46px] px-6 py-3 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t.conciergeSubmit}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
