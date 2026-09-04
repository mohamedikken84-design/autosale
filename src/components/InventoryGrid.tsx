import React from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  RotateCcw, 
  Car, 
  Sparkles, 
  Filter,
  Check,
  ChevronDown
} from 'lucide-react';
import { Car as CarType, FilterState, Category } from '../types';
import { CarCard } from './CarCard';

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
  availableBrands
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = React.useState(false);

  const categoryTabs: { id: Category; label: string }[] = [
    { id: 'all', label: 'Alle Wagens' },
    { id: 'premium', label: 'Exclusief & Premium' },
    { id: 'hybrid-electric', label: 'Hybride & Elektrisch' },
    { id: 'export-handelaar', label: 'Handelaar & Export' }
  ];

  const hasActiveFilters = 
    filterState.searchQuery !== '' ||
    filterState.brand !== '' ||
    filterState.category !== 'all' ||
    filterState.fuel !== '' ||
    filterState.transmission !== '' ||
    filterState.maxPrice < 250000;

  return (
    <section id="stock" className="py-12 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-orange-600 mb-2">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              <span>Actuele Stock te Antwerpen</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 font-['Outfit',sans-serif] tracking-tight">
              Onze Geselecteerde Voertuigen
            </h2>
            <p className="mt-1 text-sm text-zinc-500 max-w-xl">
              Elk voertuig is grondig geïnspecteerd op 113 punten, voorzien van Car-Pass kilometergarantie en direct leverbaar.
            </p>
          </div>

          {/* Sortering dropdown */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <span className="text-xs font-semibold text-zinc-500">Sorteren:</span>
            <div className="relative">
              <select
                value={filterState.sortBy}
                onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
                aria-label="Sorteer wagens"
                className="bg-zinc-50 border border-zinc-200 text-zinc-900 text-xs font-bold rounded-xl px-3 py-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="featured">Aanbevolen eerst</option>
                <option value="price-asc">Prijs: laag naar hoog</option>
                <option value="price-desc">Prijs: hoog naar laag</option>
                <option value="year-desc">Bouwjaar: nieuwste eerst</option>
                <option value="mileage-asc">Kilometerstand: laagste eerst</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-500 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Category Tabs - Bento Pill Style */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {categoryTabs.map((tab) => {
            const isActive = filterState.category === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onFilterChange({ category: tab.id })}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer ${
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
        <div className="bg-[#F8F8F8] rounded-3xl border border-gray-200 p-5 sm:p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={filterState.searchQuery}
                onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
                placeholder="Zoek op merk, model of trefwoord (bijv. Range Rover, G63, Hybride)..."
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
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              )}
            </button>

            {/* Reset Filters button */}
            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-2xl text-xs font-bold text-gray-600 hover:text-[#FF6B00] bg-white border border-gray-200 transition-colors cursor-pointer"
                title="Wis alle filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
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
            <span className="text-orange-600 font-extrabold text-sm">{cars.length}</span> {cars.length === 1 ? 'wagen' : 'wagens'} beschikbaar in voorraad
          </div>
          {favorites.length > 0 && (
            <span className="text-orange-600 font-medium">
              ★ {favorites.length} {favorites.length === 1 ? 'wagen bewaard' : 'wagens bewaard'}
            </span>
          )}
        </div>

        {/* Cars Grid */}
        {cars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {cars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                isFavorite={favorites.includes(car.id)}
                onToggleFavorite={onToggleFavorite}
                onSelectCar={onSelectCar}
                onRequestTestDrive={onRequestTestDrive}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 px-4 bg-zinc-50 rounded-3xl border border-dashed border-zinc-300">
            <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600">
              <Car className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 font-['Outfit',sans-serif]">
              Geen wagens gevonden
            </h3>
            <p className="text-sm text-zinc-500 mt-2 max-w-md mx-auto">
              Er zijn geen voertuigen die overeenkomen met uw huidige filters. Pas uw zoekcriteria aan of wis de filters.
            </p>
            <button
              onClick={onResetFilters}
              className="mt-5 inline-flex items-center gap-2 bg-zinc-950 hover:bg-orange-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Alle Filters</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
