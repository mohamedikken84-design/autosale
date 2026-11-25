import React from 'react';
import { 
  X, 
  Heart, 
  Trash2, 
  CarFront, 
  MessageCircle
} from 'lucide-react';
import { Car, Language, Currency, DealershipSettings } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { formatCurrencyPrice } from '../utils/currency';
import { DEALERSHIP_INFO } from '../data/dealership';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  allCars: Car[];
  onRemoveFavorite: (carId: string) => void;
  onSelectCar: (car: Car) => void;
  onRequestTestDrive: (car: Car) => void;
  language?: Language;
  currency?: Currency;
  dealershipSettings?: DealershipSettings;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  allCars,
  onRemoveFavorite,
  onSelectCar,
  onRequestTestDrive,
  language = 'nl',
  currency = 'EUR' as Currency,
  dealershipSettings,
}) => {
  if (!isOpen) return null;

  const activeCurrency: Currency = currency;
  const t = TRANSLATIONS[language]?.favorites || TRANSLATIONS.nl.favorites;
  const savedCars = allCars.filter((c) => favorites.includes(c.id));
  const whatsappRaw = (dealershipSettings?.whatsapp || DEALERSHIP_INFO.contact.whatsapp).replace(/[^0-9]/g, '');

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-zinc-200 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FF6B00] text-white flex items-center justify-center">
              <Heart className="w-4 h-4 fill-white" />
            </div>
            <div>
              <h3 className="font-bold text-base text-zinc-950 font-['Outfit',sans-serif]">
                {t.title} ({savedCars.length})
              </h3>
              <p className="text-[11px] text-zinc-500">
                {t.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-950 hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {savedCars.length > 0 ? (
            savedCars.map((car) => (
              <div
                key={car.id}
                className="p-3 rounded-xl border border-zinc-200 hover:border-zinc-300 bg-white transition-all flex gap-3 relative group"
              >
                <img
                  src={car.images[0] || '/logo2.png'}
                  alt={`${car.brand} ${car.model}`}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/logo2.png';
                  }}
                  className="w-24 h-20 object-cover rounded-lg shrink-0 cursor-pointer"
                  onClick={() => {
                    onSelectCar(car);
                    onClose();
                  }}
                />

                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase font-bold text-[#FF6B00]">
                    {car.brand}
                  </div>
                  <h4 
                    onClick={() => {
                      onSelectCar(car);
                      onClose();
                    }}
                    className="text-xs font-bold text-zinc-950 truncate cursor-pointer hover:text-[#FF6B00]"
                  >
                    {car.model}
                  </h4>
                  <div className="text-[11px] text-zinc-500 tabular-nums">
                    {car.year} · {car.mileage.toLocaleString('nl-BE')} km
                  </div>
                  <div className="text-sm font-extrabold text-zinc-950 mt-1 font-['Outfit',sans-serif] tabular-nums">
                    {car.status === 'sold' ? 'VERKOCHT' : formatCurrencyPrice(car.price, activeCurrency)}
                  </div>
                </div>

                <div className="flex flex-col justify-between items-end">
                  <button
                    onClick={() => onRemoveFavorite(car.id)}
                    className="p-1.5 text-zinc-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                    title="Verwijder"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {car.status !== 'sold' && (
                    <button
                      onClick={() => {
                        onRequestTestDrive(car);
                        onClose();
                      }}
                      className="p-1.5 bg-zinc-950 hover:bg-[#FF6B00] text-white rounded-lg transition-colors text-xs cursor-pointer"
                      title={t.requestTestDrive}
                    >
                      <CarFront className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 text-zinc-400">
              <Heart className="w-12 h-12 mx-auto stroke-1 mb-2 text-zinc-300" />
              <p className="text-sm font-semibold text-zinc-700">{t.emptyTitle}</p>
              <p className="text-xs text-zinc-400 mt-1">
                {t.emptyText}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {savedCars.length > 0 && (
          <div className="p-4 border-t border-zinc-200 bg-zinc-50 space-y-2">
            <a
              href={`https://wa.me/${whatsappRaw}?text=${encodeURIComponent(
                `Hallo Auto Sale, ik heb interesse in de volgende opgeslagen wagens: ${savedCars
                  .map((c) => `${c.brand} ${c.model}`)
                  .join(', ')}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl text-xs font-bold transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
