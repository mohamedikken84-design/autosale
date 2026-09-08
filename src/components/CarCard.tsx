import React, { useState } from 'react';
import { 
  Heart, Calendar, Gauge, Fuel, Zap, ShieldCheck, 
  ArrowRight, Check, ChevronLeft, ChevronRight, Sparkles, CarFront
} from 'lucide-react';
import { Car, Language, Currency } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { formatCurrencyPrice } from '../utils/currency';

interface CarCardProps {
  car: Car;
  isFavorite: boolean;
  onToggleFavorite: (carId: string) => void;
  onSelectCar: (car: Car) => void;
  onRequestTestDrive: (car: Car) => void;
  language: Language;
  currency: Currency;
}

export const CarCard: React.FC<CarCardProps> = ({
  car,
  isFavorite,
  onToggleFavorite,
  onSelectCar,
  onRequestTestDrive,
  language,
  currency,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const t = TRANSLATIONS[language]?.inventory || TRANSLATIONS.nl.inventory;
  const tCard = TRANSLATIONS[language]?.carCard || TRANSLATIONS.nl.carCard;
  const tHero = TRANSLATIONS[language]?.hero || TRANSLATIONS.nl.hero;
  const isSold = car.status === 'sold';

  const getFuelDisplay = (fuel: string) => {
    if (fuel === 'Benzine') return tHero.petrol;
    if (fuel === 'Diesel') return tHero.diesel;
    if (fuel === 'Hybride' || fuel === 'Plug-in Hybride') return tHero.hybrid;
    if (fuel === 'Elektrisch') return tHero.electric;
    return fuel;
  };

  const getTransmissionDisplay = (trans: string) => {
    if (trans === 'Automaat') return t.automatic;
    if (trans === 'Handgeschakeld') return t.manual;
    return trans;
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
  };

  return (
    <div 
      onClick={() => onSelectCar(car)}
      className="group relative bg-white rounded-3xl border border-gray-200 hover:border-[#1A1A1A] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Image Container with controls */}
      <div className="relative aspect-[16/10] w-full bg-gray-100 overflow-hidden">
        <img
          src={car.images[activeImageIndex] || car.images[0]}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/70 via-transparent to-black/20 pointer-events-none" />

        {/* Sold Overlay Ribbon */}
        {isSold && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none z-10">
            <span className="px-5 py-2 bg-red-600 text-white font-black text-sm tracking-widest uppercase rounded-2xl shadow-xl rotate-[-4deg] border border-white">
              {t.soldBadge}
            </span>
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {car.featured && !isSold && (
            <span className="inline-flex items-center gap-1 bg-[#FF6B00] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-xs">
              <Sparkles className="w-3 h-3" />
              {tCard.featured}
            </span>
          )}

          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs backdrop-blur-md ${
            car.fuel === 'Plug-in Hybride' 
              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
              : car.fuel === 'Elektrisch'
              ? 'bg-sky-950/80 text-sky-300 border border-sky-500/30'
              : 'bg-[#1A1A1A]/80 text-zinc-200 border border-zinc-700/50'
          }`}>
            {getFuelDisplay(car.fuel)}
          </span>

          {car.vatDeductible && !isSold && (
            <span className="bg-[#1A1A1A]/80 text-amber-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-amber-500/30">
              {t.vatDeductible}
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(car.id);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all z-10 cursor-pointer ${
            isFavorite 
              ? 'bg-[#FF6B00] text-white shadow-md' 
              : 'bg-black/50 text-white hover:bg-[#FF6B00]'
          }`}
          title={isFavorite ? tCard.removeFavorite : tCard.saveFavorite}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
        </button>

        {/* Multi-image thumbnail dots & arrows */}
        {car.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              aria-label="Vorige foto"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              aria-label="Volgende foto"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1 z-10">
              {car.images.map((_, idx) => (
                <span
                  key={idx}
                  className={`block rounded-full transition-all ${
                    activeImageIndex === idx
                      ? 'w-4 h-1.5 bg-[#FF6B00]'
                      : 'w-1.5 h-1.5 bg-white/70'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Warranty pill on image corner */}
        <div className="absolute bottom-2.5 left-3 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-white/95 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5 text-[#FF6B00]" />
          <span>{car.warrantyMonths} {tCard.warranty}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-6 flex flex-col flex-1">
        {/* Brand & Model Title */}
        <div className="mb-2 sm:mb-3">
          <div className="mb-1">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest font-black text-[#FF6B00]">
              {car.brand}
            </span>
          </div>
          <h3 className="text-base sm:text-xl font-black text-[#1A1A1A] font-['Outfit',sans-serif] tracking-tight line-clamp-1 group-hover:text-[#FF6B00] transition-colors">
            {car.model}
          </h3>
          {car.edition && (
            <p className="text-[11px] sm:text-xs text-gray-500 font-medium line-clamp-1 mt-0.5">
              {car.edition}
            </p>
          )}
        </div>

        {/* 4 Quick Specs Grid - Bento Mini-Cards */}
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2 my-1.5 sm:my-2 py-2 sm:py-3 px-2.5 sm:px-3.5 bg-[#F8F8F8] rounded-xl sm:rounded-2xl border border-gray-100 text-[11px] sm:text-xs">
          <div className="flex items-center gap-1.5 text-zinc-700">
            <Calendar className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
            <span className="font-bold">{car.year}</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-700">
            <Gauge className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
            <span className="font-bold">{car.mileage.toLocaleString('nl-BE')} km</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-700">
            <Zap className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
            <span className="font-bold truncate">{car.powerHp} PK ({getTransmissionDisplay(car.transmission)})</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-700">
            <Fuel className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
            <span className="font-bold truncate">{car.engineSize || getFuelDisplay(car.fuel)}</span>
          </div>
        </div>

        {/* Highlights List */}
        {car.highlightSpecs && car.highlightSpecs.length > 0 && (
          <div className="space-y-0.5 sm:space-y-1 my-2 sm:my-3">
            {car.highlightSpecs.slice(0, 2).map((h, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-600 font-medium">
                <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FF6B00] shrink-0" />
                <span className="line-clamp-1">{h}</span>
              </div>
            ))}
          </div>
        )}

        {/* Price & Action Row */}
        <div className="mt-auto pt-3 sm:pt-4 border-t border-gray-100 flex items-center justify-between gap-2 sm:gap-3">
          <div>
            {isSold ? (
              <div>
                <span className="inline-block px-2.5 py-0.5 sm:px-3 sm:py-1 bg-red-600 text-white font-black text-[10px] sm:text-xs uppercase tracking-wider rounded-lg sm:rounded-xl shadow-xs">
                  {t.soldBadge}
                </span>
                <div className="text-[10px] sm:text-[11px] text-gray-400 font-medium mt-0.5 sm:mt-1">
                  {tCard.notAvailable}
                </div>
              </div>
            ) : (
              <div>
                <div className="text-xl sm:text-2xl font-black text-[#1A1A1A] font-['Outfit',sans-serif] tracking-tighter">
                  {formatCurrencyPrice(car.price, currency)}
                </div>
                <div className="text-[10px] sm:text-[11px] text-gray-400 font-semibold">
                  {tCard.from} <span className="font-black text-[#1A1A1A]">{formatCurrencyPrice(car.monthlyPrice, currency)}</span>/{t.perMonth}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {!isSold && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRequestTestDrive(car);
                }}
                title={t.testDriveButton}
                className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border border-gray-200 hover:border-[#FF6B00] hover:text-[#FF6B00] text-zinc-700 transition-colors cursor-pointer"
              >
                <CarFront className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            )}

            <button
              type="button"
              className="inline-flex items-center gap-1 bg-[#1A1A1A] group-hover:bg-[#FF6B00] text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              <span>{t.detailsButton}</span>
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
