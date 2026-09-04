import React from 'react';
import { 
  X, 
  Heart, 
  Trash2, 
  ArrowRight, 
  CarFront, 
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { Car } from '../types';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  allCars: Car[];
  onRemoveFavorite: (carId: string) => void;
  onSelectCar: (car: Car) => void;
  onRequestTestDrive: (car: Car) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  allCars,
  onRemoveFavorite,
  onSelectCar,
  onRequestTestDrive
}) => {
  if (!isOpen) return null;

  const savedCars = allCars.filter((c) => favorites.includes(c.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-zinc-200 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center">
              <Heart className="w-4 h-4 fill-white" />
            </div>
            <div>
              <h3 className="font-bold text-base text-zinc-950 font-['Outfit',sans-serif]">
                Opgeslagen Wagens ({savedCars.length})
              </h3>
              <p className="text-[11px] text-zinc-500">
                Vergelijk uw favoriete modellen
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-950 hover:bg-zinc-200 transition-colors"
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
                className="p-3 rounded-2xl border border-zinc-200 hover:border-zinc-300 bg-white transition-all shadow-xs flex gap-3 relative group"
              >
                <img
                  src={car.images[0]}
                  alt=""
                  className="w-24 h-20 object-cover rounded-xl shrink-0 cursor-pointer"
                  onClick={() => {
                    onSelectCar(car);
                    onClose();
                  }}
                />

                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase font-bold text-orange-600">
                    {car.brand}
                  </div>
                  <h4 
                    onClick={() => {
                      onSelectCar(car);
                      onClose();
                    }}
                    className="text-xs font-bold text-zinc-950 truncate cursor-pointer hover:text-orange-600"
                  >
                    {car.model}
                  </h4>
                  <div className="text-[11px] text-zinc-500">
                    {car.year} • {car.mileage.toLocaleString('nl-BE')} km
                  </div>
                  <div className="text-sm font-black text-zinc-950 mt-1 font-['Outfit',sans-serif]">
                    €{car.price.toLocaleString('nl-BE')}
                  </div>
                </div>

                <div className="flex flex-col justify-between items-end">
                  <button
                    onClick={() => onRemoveFavorite(car.id)}
                    className="p-1.5 text-zinc-400 hover:text-red-500 rounded-lg transition-colors"
                    title="Verwijder"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      onRequestTestDrive(car);
                      onClose();
                    }}
                    className="p-1.5 bg-zinc-950 hover:bg-orange-500 text-white rounded-lg transition-colors text-xs"
                    title="Plan proefrit"
                  >
                    <CarFront className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 text-zinc-400">
              <Heart className="w-12 h-12 mx-auto stroke-1 mb-2 text-zinc-300" />
              <p className="text-sm font-semibold text-zinc-700">Geen opgeslagen wagens</p>
              <p className="text-xs text-zinc-400 mt-1">
                Klik op het hartje bij een wagen in onze stock om deze hier te bewaren.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {savedCars.length > 0 && (
          <div className="p-4 border-t border-zinc-200 bg-zinc-50 space-y-2">
            <a
              href={`https://wa.me/3236473339?text=${encodeURIComponent(
                `Hallo Auto Sale, ik heb interesse in de volgende opgeslagen wagens: ${savedCars
                  .map((c) => `${c.brand} ${c.model}`)
                  .join(', ')}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl text-xs font-bold transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Vraag offerte via WhatsApp</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
