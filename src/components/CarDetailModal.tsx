import React, { useState } from 'react';
import { 
  X, Heart, ShieldCheck, Calendar, Gauge, Fuel, Zap, 
  Phone, MessageCircle, CarFront, CheckCircle2, ChevronLeft, 
  ChevronRight, Share2, Check, Play, Maximize2, Globe, FileCheck
} from 'lucide-react';
import { Car, Language, Currency, DealershipSettings } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { formatCurrencyPrice } from '../utils/currency';
import { LightboxModal } from './LightboxModal';
import { VideoModal } from './VideoModal';

interface CarDetailModalProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (carId: string) => void;
  onRequestTestDrive: (car: Car) => void;
  onNavigateToValuation: () => void;
  language: Language;
  currency: Currency;
  dealershipSettings: DealershipSettings;
  allCars: Car[];
  onSelectCar: (car: Car) => void;
}

export const CarDetailModal: React.FC<CarDetailModalProps> = ({
  car,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onRequestTestDrive,
  onNavigateToValuation,
  language,
  currency,
  dealershipSettings,
  allCars,
  onSelectCar,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen || !car) return null;

  const t = TRANSLATIONS[language]?.carDetail || TRANSLATIONS.nl.carDetail;
  const isSold = car.status === 'sold';

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${car.brand} ${car.model} | Auto Sale Antwerpen`,
        text: `Bekijk deze ${car.brand} ${car.model} bij Auto Sale Antwerpen!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hallo Auto Sale, ik heb interesse in de ${car.brand} ${car.model} (${car.year} - Ref: ${car.carPassId}). Is deze wagen beschikbaar?`
  );

  // Find similar cars (same bodyType or brand, not this car, not deleted)
  const similarCars = allCars
    .filter((c) => c.id !== car.id && !c.deletedAt && (c.bodyType === car.bodyType || c.brand === car.brand))
    .slice(0, 3);

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
        <div 
          className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col border border-zinc-200"
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
                title={t.shareCar}
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
                {/* Main Active Image with Lightbox Trigger */}
                <div 
                  className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-black shadow-md border border-gray-200 cursor-pointer group"
                  onClick={() => setIsLightboxOpen(true)}
                  title={t.viewAllPhotos}
                >
                  <img
                    src={car.images[selectedImageIndex] || car.images[0]}
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />

                  {/* Fullscreen Overlay Hint */}
                  <div className="absolute top-3 right-3 p-2.5 rounded-2xl bg-black/60 hover:bg-black/90 text-white transition-all backdrop-blur-sm">
                    <Maximize2 className="w-4 h-4" />
                  </div>

                  {/* Sold Ribbon Overlay */}
                  {isSold && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
                      <span className="px-6 py-2.5 bg-red-600 text-white font-black text-xl tracking-widest uppercase rounded-2xl shadow-2xl rotate-[-4deg] border-2 border-white">
                        VERKOCHT • SOLD
                      </span>
                    </div>
                  )}

                  {car.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer z-10"
                        aria-label="Vorige foto"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImageIndex((prev) => (prev + 1) % car.images.length);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer z-10"
                        aria-label="Volgende foto"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-xl">
                    Foto {selectedImageIndex + 1} / {car.images.length}
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

                {/* Video & Fullscreen Action Bar */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => setIsLightboxOpen(true)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold rounded-2xl transition-colors cursor-pointer"
                  >
                    <Maximize2 className="w-4 h-4 text-[#FF6B00]" />
                    <span>{t.viewAllPhotos} ({car.images.length})</span>
                  </button>

                  {car.videoUrl && (
                    <button
                      onClick={() => setIsVideoModalOpen(true)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-[#FF6B00]/10 hover:bg-[#FF6B00]/20 text-[#FF6B00] text-xs font-bold rounded-2xl border border-[#FF6B00]/30 transition-colors cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-[#FF6B00]" />
                      <span>{t.watchVideo}</span>
                    </button>
                  )}
                </div>

                {/* Traxio & Car-Pass Guarantee Notice */}
                <div className="bg-[#F8F8F8] rounded-3xl border border-gray-200 p-5 flex items-start gap-4 text-xs">
                  <ShieldCheck className="w-6 h-6 text-[#FF6B00] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-black text-[#1A1A1A] text-sm font-['Outfit',sans-serif]">
                      {car.warrantyMonths} {t.warrantyBanner}
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

                  {/* Price Display: HIDE IF SOLD */}
                  <div className="mt-5 p-5 rounded-3xl bg-[#F8F8F8] border border-gray-200">
                    {isSold ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="px-3.5 py-1.5 rounded-full bg-red-600 text-white font-black text-sm tracking-wider uppercase shadow-sm">
                            VERKOCHT • SOLD
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 font-medium">
                          {t.soldMessage}
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-3xl sm:text-4xl font-black text-[#1A1A1A] font-['Outfit',sans-serif] tracking-tight">
                            {formatCurrencyPrice(car.price, currency)}
                          </span>
                          <span className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-white border border-gray-200 text-[#1A1A1A]">
                            {car.priceType}
                          </span>
                        </div>

                        {car.vatDeductible && (
                          <div className="text-xs text-emerald-600 font-bold mt-2 flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> BTW 21% recuperabel voor bedrijven & zelfstandigen (€{formatCurrencyPrice(Math.round(car.price / 1.21), currency)} ex. BTW)
                          </div>
                        )}

                        <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500 font-medium">
                          <span>{t.monthlyEst}:</span>
                          <span className="font-bold text-[#1A1A1A] text-sm">
                            vanaf {formatCurrencyPrice(car.monthlyPrice, currency)} /mnd
                          </span>
                        </div>
                      </>
                    )}
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

                  {/* International Export Information Box */}
                  <div className="mt-4 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold">
                      <Globe className="w-4 h-4 text-[#FF6B00]" />
                      <span>Internationale Export & Intra-EU Levering</span>
                    </div>
                    <p className="text-[11px] text-amber-800 leading-relaxed font-normal">
                      Levering mogelijk in heel Europa. Wij regelen officiële transitkentekens (exportplaten 14 dagen met verzekering), douanedocumenten en netto intra-communautaire facturatie.
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  {!isSold && (
                    <button
                      onClick={() => {
                        onRequestTestDrive(car);
                        onClose();
                      }}
                      className="w-full flex items-center justify-center gap-2.5 bg-[#FF6B00] hover:bg-orange-600 text-white font-bold uppercase text-xs tracking-wider py-4 px-4 rounded-2xl shadow-md transition-all cursor-pointer"
                    >
                      <CarFront className="w-4 h-4" />
                      <span>{t.planTestDrive}</span>
                    </button>
                  )}

                  <a
                    href={`https://wa.me/${dealershipSettings.whatsapp.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase text-xs tracking-wider py-3.5 px-4 rounded-2xl transition-all shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t.whatsappSeller}</span>
                  </a>

                  <a
                    href={`tel:${dealershipSettings.phoneRaw}`}
                    className="w-full flex items-center justify-center gap-2 bg-[#1A1A1A] hover:bg-black text-white font-bold uppercase text-xs tracking-wider py-3.5 px-4 rounded-2xl transition-all shadow-sm"
                  >
                    <Phone className="w-4 h-4 text-[#FF6B00]" />
                    <span>{t.callDirect}: {dealershipSettings.phone}</span>
                  </a>

                  <button
                    onClick={() => {
                      onNavigateToValuation();
                      onClose();
                    }}
                    className="w-full text-center text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-[#FF6B00] py-2 transition-colors cursor-pointer"
                  >
                    {t.tradeInCta}
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
                    {t.description}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line font-medium">
                    {car.description || 'Geen beschrijving opgegeven.'}
                  </p>
                </div>

                {/* Options & Features Checklist */}
                {car.options && car.options.length > 0 && (
                  <div>
                    <h3 className="text-xl font-black text-[#1A1A1A] font-['Outfit',sans-serif] mb-3">
                      {t.options}
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
                )}
              </div>

              {/* Complete Technical Data Table (5 cols) */}
              <div className="lg:col-span-5 bg-[#F8F8F8] rounded-3xl border border-gray-200 p-6">
                <h3 className="text-lg font-black text-[#1A1A1A] font-['Outfit',sans-serif] mb-4">
                  {t.specs}
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
                  <div className="py-2.5 flex justify-between">
                    <dt className="text-gray-500 font-medium">Carrosserie</dt>
                    <dd className="font-bold text-[#1A1A1A]">{car.bodyType}</dd>
                  </div>
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

            {/* Similar Cars Cross-Selling Section */}
            {similarCars.length > 0 && (
              <div className="border-t border-gray-200 pt-8 space-y-4">
                <h3 className="text-xl font-black text-[#1A1A1A] font-['Outfit',sans-serif]">
                  {TRANSLATIONS[language]?.inventory.similarCars || 'Vergelijkbare Voertuigen'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {similarCars.map((simCar) => (
                    <div
                      key={simCar.id}
                      onClick={() => onSelectCar(simCar)}
                      className="group p-3 rounded-2xl bg-[#F8F8F8] border border-gray-200 hover:border-[#FF6B00] transition-all cursor-pointer space-y-2"
                    >
                      <div className="aspect-[16/10] rounded-xl overflow-hidden bg-black">
                        <img
                          src={simCar.images[0]}
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="text-xs">
                        <h4 className="font-black text-[#1A1A1A] truncate">{simCar.brand} {simCar.model}</h4>
                        <div className="text-gray-500">{simCar.year} • {simCar.mileage.toLocaleString('nl-BE')} km</div>
                        <div className="font-bold text-[#FF6B00] mt-1">
                          {simCar.status === 'sold' ? 'VERKOCHT' : formatCurrencyPrice(simCar.price, currency)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <LightboxModal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={car.images}
        currentIndex={selectedImageIndex}
        onIndexChange={setSelectedImageIndex}
        carTitle={`${car.brand} ${car.model}`}
      />

      {/* Video Walkaround Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={car.videoUrl}
        carTitle={`${car.brand} ${car.model}`}
      />
    </>
  );
};
