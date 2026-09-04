import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  ShieldCheck, 
  Calendar, 
  Gauge, 
  Fuel, 
  Zap, 
  FileCheck, 
  Phone, 
  MessageCircle, 
  CarFront, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  Share2,
  Check,
  Sparkles,
  Info
} from 'lucide-react';
import { Car } from '../types';
import { DEALERSHIP_INFO } from '../data/dealership';

interface CarDetailModalProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (carId: string) => void;
  onRequestTestDrive: (car: Car) => void;
  onNavigateToValuation: () => void;
}

export const CarDetailModal: React.FC<CarDetailModalProps> = ({
  car,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onRequestTestDrive,
  onNavigateToValuation
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen || !car) return null;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('nl-BE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${car.brand} ${car.model} | Auto Sale Antwerpen`,
        text: `Bekijk deze ${car.brand} ${car.model} bij Auto Sale Antwerpen!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hallo Auto Sale, ik heb interesse in de ${car.brand} ${car.model} (${car.year} - ${formatPrice(car.price)} - Ref: ${car.carPassId}). Is deze wagen nog beschikbaar voor bezichtiging?`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col border border-zinc-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-md border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-black tracking-widest text-[#FF6B00]">
              {car.brand}
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-xs font-bold text-gray-500">
              Car-Pass Ref: {car.carPassId}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Share button */}
            <button
              onClick={handleShare}
              className="p-2 rounded-2xl text-gray-600 hover:text-black hover:bg-gray-100 transition-colors cursor-pointer"
              title="Deel wagen"
            >
              {copiedLink ? <Check className="w-5 h-5 text-emerald-600" /> : <Share2 className="w-5 h-5" />}
            </button>

            {/* Favorite button */}
            <button
              onClick={() => onToggleFavorite(car.id)}
              className={`p-2 rounded-2xl transition-colors cursor-pointer ${
                isFavorite 
                  ? 'text-[#FF6B00] bg-orange-50' 
                  : 'text-gray-600 hover:text-[#FF6B00] hover:bg-gray-100'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-[#FF6B00]' : ''}`} />
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-2 rounded-2xl text-gray-400 hover:text-black hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Sluiten"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8">
          {/* Main Showcase & Overview Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Left: Gallery (7 cols) */}
            <div className="lg:col-span-7 space-y-3">
              {/* Main Active Image */}
              <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-black shadow-md border border-gray-200">
                <img
                  src={car.images[selectedImageIndex] || car.images[0]}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-full object-cover"
                />

                {car.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer"
                      aria-label="Vorige foto"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setSelectedImageIndex((prev) => (prev + 1) % car.images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer"
                      aria-label="Volgende foto"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-xl">
                  Foto {selectedImageIndex + 1} van {car.images.length}
                </div>
              </div>

              {/* Thumbnails row */}
              {car.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                  {car.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative shrink-0 w-20 h-14 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                        selectedImageIndex === idx
                          ? 'border-[#FF6B00] scale-95 shadow-md'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Traxio & Car-Pass Guarantee Notice */}
              <div className="bg-[#F8F8F8] rounded-3xl border border-gray-200 p-5 flex items-start gap-4 text-xs">
                <ShieldCheck className="w-6 h-6 text-[#FF6B00] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-[#1A1A1A] text-sm font-['Outfit',sans-serif]">
                    {car.warrantyMonths} Maanden Traxio Waarborg & Car-Pass
                  </h4>
                  <p className="mt-1 text-gray-500 leading-relaxed font-medium">
                    Dit voertuig is conform de Traxio kwaliteitsnormen gekeurd op 113 punten en voorzien van een officiële Belgische Car-Pass kilometerhistoriek.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Quick Info, Pricing & CTA Box (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] font-['Outfit',sans-serif] tracking-tight">
                  {car.brand} {car.model}
                </h1>
                {car.edition && (
                  <p className="text-sm font-semibold text-gray-500 mt-1">
                    {car.edition}
                  </p>
                )}

                {/* Price Display */}
                <div className="mt-5 p-5 rounded-3xl bg-[#F8F8F8] border border-gray-200">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-[#1A1A1A] font-['Outfit',sans-serif] tracking-tight">
                      {formatPrice(car.price)}
                    </span>
                    <span className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-white border border-gray-200 text-[#1A1A1A]">
                      {car.priceType}
                    </span>
                  </div>

                  {car.vatDeductible && (
                    <div className="text-xs text-emerald-600 font-bold mt-2 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> BTW 21% recuperabel voor bedrijven & zelfstandigen (€{(car.price / 1.21).toFixed(0)} ex. BTW)
                    </div>
                  )}

                  <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500 font-medium">
                    <span>Lease / Financiering indicatie:</span>
                    <span className="font-bold text-[#1A1A1A] text-sm">
                      vanaf €{car.monthlyPrice} /mnd
                    </span>
                  </div>
                </div>

                {/* Key specs badge strip - Bento mini cards */}
                <div className="grid grid-cols-2 gap-2.5 mt-4 text-xs font-semibold text-gray-700">
                  <div className="p-3 rounded-2xl bg-[#F8F8F8] border border-gray-200 flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-[#FF6B00]" />
                    <span>Bouwjaar: <strong className="text-[#1A1A1A]">{car.year}</strong></span>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#F8F8F8] border border-gray-200 flex items-center gap-2.5">
                    <Gauge className="w-4 h-4 text-[#FF6B00]" />
                    <span>KM: <strong className="text-[#1A1A1A]">{car.mileage.toLocaleString('nl-BE')}</strong></span>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#F8F8F8] border border-gray-200 flex items-center gap-2.5">
                    <Zap className="w-4 h-4 text-[#FF6B00]" />
                    <span>Vermogen: <strong className="text-[#1A1A1A]">{car.powerHp} PK</strong></span>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#F8F8F8] border border-gray-200 flex items-center gap-2.5">
                    <Fuel className="w-4 h-4 text-[#FF6B00]" />
                    <span>Brandstof: <strong className="text-[#1A1A1A]">{car.fuel}</strong></span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <button
                  onClick={() => {
                    onRequestTestDrive(car);
                    onClose();
                  }}
                  className="w-full flex items-center justify-center gap-2.5 bg-[#FF6B00] hover:bg-orange-600 text-white font-bold uppercase text-xs tracking-wider py-4 px-4 rounded-2xl shadow-md transition-all cursor-pointer"
                >
                  <CarFront className="w-4 h-4" />
                  <span>Plan een Vrijblijvende Proefrit</span>
                </button>

                <a
                  href={`https://wa.me/3236473339?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase text-xs tracking-wider py-3.5 px-4 rounded-2xl transition-all shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Verkoper Over Deze Wagen</span>
                </a>

                <a
                  href={`tel:${DEALERSHIP_INFO.contact.phoneRaw}`}
                  className="w-full flex items-center justify-center gap-2 bg-[#1A1A1A] hover:bg-black text-white font-bold uppercase text-xs tracking-wider py-3.5 px-4 rounded-2xl transition-all shadow-sm"
                >
                  <Phone className="w-4 h-4 text-[#FF6B00]" />
                  <span>Bel Direct: {DEALERSHIP_INFO.contact.phone}</span>
                </a>

                <button
                  onClick={() => {
                    onNavigateToValuation();
                    onClose();
                  }}
                  className="w-full text-center text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-[#FF6B00] py-2 transition-colors cursor-pointer"
                >
                  Wilt u uw wagen inruilen? Vraag overnameprijs aan →
                </button>
              </div>
            </div>
          </div>

          {/* Description & Specs Tabs */}
          <div className="border-t border-gray-200 pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Description & Options (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="text-xl font-black text-[#1A1A1A] font-['Outfit',sans-serif] mb-3">
                  Voertuigbeschrijving
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line font-medium">
                  {car.description}
                </p>
              </div>

              {/* Options & Features Checklist */}
              <div>
                <h3 className="text-xl font-black text-[#1A1A1A] font-['Outfit',sans-serif] mb-3">
                  Aanwezige Opties & Uitrusting
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {car.options.map((opt, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-gray-700 font-semibold bg-[#F8F8F8] p-3 rounded-2xl border border-gray-100">
                      <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
                      <span>{opt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Complete Technical Data Table (5 cols) */}
            <div className="lg:col-span-5 bg-[#F8F8F8] rounded-3xl border border-gray-200 p-6">
              <h3 className="text-lg font-black text-[#1A1A1A] font-['Outfit',sans-serif] mb-4">
                Technische Specificaties
              </h3>
              <dl className="divide-y divide-gray-200/80 text-xs">
                <div className="py-2.5 flex justify-between">
                  <dt className="text-gray-500 font-medium">Merk & Model</dt>
                  <dd className="font-bold text-[#1A1A1A]">{car.brand} {car.model}</dd>
                </div>
                <div className="py-2.5 flex justify-between">
                  <dt className="text-gray-500 font-medium">Bouwjaar</dt>
                  <dd className="font-bold text-[#1A1A1A]">{car.year}</dd>
                </div>
                <div className="py-2.5 flex justify-between">
                  <dt className="text-gray-500 font-medium">Kilometerstand</dt>
                  <dd className="font-bold text-[#1A1A1A]">{car.mileage.toLocaleString('nl-BE')} km</dd>
                </div>
                <div className="py-2.5 flex justify-between">
                  <dt className="text-gray-500 font-medium">Brandstoftype</dt>
                  <dd className="font-bold text-[#1A1A1A]">{car.fuel}</dd>
                </div>
                <div className="py-2.5 flex justify-between">
                  <dt className="text-gray-500 font-medium">Transmissie</dt>
                  <dd className="font-bold text-[#1A1A1A]">{car.transmission}</dd>
                </div>
                <div className="py-2.5 flex justify-between">
                  <dt className="text-gray-500 font-medium">Vermogen</dt>
                  <dd className="font-bold text-[#1A1A1A]">{car.powerHp} PK / {(car.powerHp * 0.735).toFixed(0)} kW</dd>
                </div>
                {car.engineSize && (
                  <div className="py-2.5 flex justify-between">
                    <dt className="text-gray-500 font-medium">Motorisatie</dt>
                    <dd className="font-bold text-[#1A1A1A]">{car.engineSize}</dd>
                  </div>
                )}
                {car.co2 !== undefined && (
                  <div className="py-2.5 flex justify-between">
                    <dt className="text-gray-500 font-medium">CO2-uitstoot (WLTP)</dt>
                    <dd className="font-bold text-[#1A1A1A]">{car.co2} g/km</dd>
                  </div>
                )}
                {car.euroStandard && (
                  <div className="py-2.5 flex justify-between">
                    <dt className="text-gray-500 font-medium">Euronorm</dt>
                    <dd className="font-bold text-[#1A1A1A]">{car.euroStandard}</dd>
                  </div>
                )}
                <div className="py-2.5 flex justify-between">
                  <dt className="text-gray-500 font-medium">Kleur Exterieur</dt>
                  <dd className="font-bold text-[#1A1A1A]">{car.color}</dd>
                </div>
                <div className="py-2.5 flex justify-between">
                  <dt className="text-gray-500 font-medium">Interieur Bekleding</dt>
                  <dd className="font-bold text-[#1A1A1A]">{car.interior}</dd>
                </div>
                <div className="py-2.5 flex justify-between">
                  <dt className="text-gray-500 font-medium">Car-Pass Certificaat</dt>
                  <dd className="font-bold text-emerald-600 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Geverifieerd
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
