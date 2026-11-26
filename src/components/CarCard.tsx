import React, { useState } from 'react';
import {
  Heart,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CarFront,
  MessageCircle,
} from 'lucide-react';
import { Car, Language, Currency } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { formatCurrencyPrice } from '../utils/currency';
import { getTestDriveWhatsAppUrl } from '../utils/whatsapp';

interface CarCardProps {
  car: Car;
  isFavorite: boolean;
  onToggleFavorite: (carId: string) => void;
  onSelectCar: (car: Car) => void;
  whatsappNumber?: string;
  language: Language;
  currency: Currency;
}

export const CarCard: React.FC<CarCardProps> = ({
  car,
  isFavorite,
  onToggleFavorite,
  onSelectCar,
  whatsappNumber,
  language,
  currency,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const t = TRANSLATIONS[language]?.inventory || TRANSLATIONS.nl.inventory;
  const tCard = TRANSLATIONS[language]?.carCard || TRANSLATIONS.nl.carCard;
  const tHero = TRANSLATIONS[language]?.hero || TRANSLATIONS.nl.hero;
  const isSold = car.status === 'sold';

  const getFuelDisplay = (fuel: string) => {
    if (fuel === 'Benzine') return tHero.petrol;
    if (fuel === 'Diesel') return tHero.diesel;
    if (fuel === 'Hybride' || fuel === 'Plug-in Hybride' || fuel === 'Mild Hybride') return tHero.hybrid;
    if (fuel === 'Elektrisch') return tHero.electric;
    return fuel;
  };

  const getTransmissionDisplay = (trans: string) => {
    if (trans === 'Automaat') return t.automatic;
    if (trans === 'Manueel' || trans === 'Handgeschakeld') return t.manual;
    return trans;
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageError(false);
    setActiveImageIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageError(false);
    setActiveImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
  };

  const currentImg = car.images[activeImageIndex] || car.images[0];

  return (
    <article
      onClick={() => onSelectCar(car)}
      className="group bg-white rounded-2xl border border-zinc-200 hover:border-zinc-400 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] w-full bg-zinc-100 overflow-hidden">
        {currentImg && !imageError ? (
          <img
            src={currentImg}
            alt={`${car.brand} ${car.model}`}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-300"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 text-zinc-400">
            <CarFront className="w-10 h-10 mb-1" />
            <span className="text-xs font-medium text-zinc-500">
              {car.brand} {car.model}
            </span>
          </div>
        )}

        {/* Sold Overlay */}
        {isSold && (
          <div className="absolute inset-0 bg-black/45 flex items-center justify-center pointer-events-none z-10">
            <span className="px-4 py-1.5 bg-red-600 text-white font-bold text-xs tracking-widest uppercase rounded-lg">
              {t.soldBadge}
            </span>
          </div>
        )}

        {/* Single Clean Tag (optional) */}
        {car.featured && !isSold && (
          <span className="absolute top-3 left-3 bg-[#FF6B00] text-white text-[11px] font-bold px-2.5 py-1 rounded-md z-10">
            {tCard.featured}
          </span>
        )}

        {/* Favorite Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(car.id);
          }}
          className={`absolute top-2.5 right-2.5 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-full transition-colors z-10 cursor-pointer ${
            isFavorite
              ? 'bg-[#FF6B00] text-white'
              : 'bg-black/55 text-white hover:bg-[#FF6B00]'
          }`}
          title={isFavorite ? tCard.removeFavorite : tCard.saveFavorite}
          aria-label={isFavorite ? tCard.removeFavorite : tCard.saveFavorite}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
        </button>

        {/* Image Navigation */}
        {car.images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevImage}
              aria-label="Vorige foto"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/55 hover:bg-black/80 text-white flex items-center justify-center opacity-85 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              aria-label="Volgende foto"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/55 hover:bg-black/80 text-white flex items-center justify-center opacity-85 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <div className="absolute bottom-2.5 right-3 bg-black/65 text-white text-[11px] font-medium px-2 py-0.5 rounded tabular-nums z-10">
              {activeImageIndex + 1}/{car.images.length}
            </div>
          </>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 gap-3">
        <div>
          <div className="text-xs font-semibold text-[#FF6B00] uppercase tracking-wider">
            {car.brand}
          </div>
          <h3 className="text-lg font-bold text-zinc-950 font-['Outfit',sans-serif] tracking-tight line-clamp-1 group-hover:text-[#FF6B00] transition-colors mt-0.5">
            {car.model}
          </h3>
          {car.edition && (
            <p className="text-xs text-zinc-500 line-clamp-1 mt-0.5">
              {car.edition}
            </p>
          )}
        </div>

        {/* Clean Unboxed Specs Metadata */}
        <div className="text-xs text-zinc-600 flex flex-wrap items-center gap-x-2 gap-y-1 tabular-nums">
          <span className="font-semibold text-zinc-800">{car.year}</span>
          <span aria-hidden="true" className="text-zinc-300">·</span>
          <span>{car.mileage.toLocaleString('nl-BE')} km</span>
          <span aria-hidden="true" className="text-zinc-300">·</span>
          <span>{getFuelDisplay(car.fuel)}</span>
          <span aria-hidden="true" className="text-zinc-300">·</span>
          <span>{getTransmissionDisplay(car.transmission)}</span>
          <span aria-hidden="true" className="text-zinc-300">·</span>
          <span>{car.powerHp} PK</span>
        </div>

        {/* Price & Action Footer */}
        <div className="mt-auto pt-4 border-t border-zinc-100 flex items-center justify-between gap-3">
          <div>
            {isSold ? (
              <div className="text-sm font-bold text-red-600 uppercase tracking-wide">
                {t.soldBadge}
              </div>
            ) : (
              <div>
                <div className="text-xl font-extrabold text-zinc-950 font-['Outfit',sans-serif] tabular-nums">
                  {formatCurrencyPrice(car.price, currency)}
                </div>
                <div className="text-[11px] text-zinc-500 tabular-nums">
                  {tCard.from} {formatCurrencyPrice(car.monthlyPrice, currency)}/{t.perMonth}
                  {car.vatDeductible ? ` · ${t.vatDeductible}` : ''}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {!isSold && (
              <a
                href={getTestDriveWhatsAppUrl(whatsappNumber, car)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title={`${t.testDriveButton} via WhatsApp`}
                aria-label={`${t.testDriveButton} via WhatsApp`}
                className="min-h-[42px] min-w-[42px] flex items-center justify-center rounded-xl border border-zinc-200 hover:border-emerald-600 hover:text-emerald-600 text-zinc-700 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            )}

            <button
              type="button"
              className="min-h-[42px] inline-flex items-center gap-1.5 bg-zinc-950 group-hover:bg-[#FF6B00] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>{t.detailsButton}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
