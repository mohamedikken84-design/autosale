import React, { useState, useEffect } from 'react';
import { 
  X, 
  CarFront, 
  CheckCircle2, 
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Car, TestDriveBooking, Language, DealershipSettings } from '../types';
import { DEALERSHIP_INFO } from '../data/dealership';
import { TRANSLATIONS } from '../i18n/translations';

interface TestDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCar: Car | null;
  allCars: Car[];
  onBookingSuccess?: (booking: TestDriveBooking) => void;
  language?: Language;
  dealershipSettings?: DealershipSettings;
}

export const TestDriveModal: React.FC<TestDriveModalProps> = ({
  isOpen,
  onClose,
  selectedCar,
  allCars,
  onBookingSuccess,
  language = 'nl',
  dealershipSettings,
}) => {
  const t = TRANSLATIONS[language]?.testDrive || TRANSLATIONS.nl.testDrive;
  const availableCars = allCars.filter((c) => !c.deletedAt && c.status !== 'sold');
  const [activeCarId, setActiveCarId] = useState<string>(selectedCar ? selectedCar.id : (availableCars[0]?.id || ''));
  const [customModel, setCustomModel] = useState('');
  const [formData, setFormData] = useState<TestDriveBooking>({
    carId: selectedCar ? selectedCar.id : '',
    carTitle: selectedCar ? `${selectedCar.brand} ${selectedCar.model}` : 'Algemene showroomafspraak',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    timeSlot: '14:00',
    fullName: '',
    phone: '',
    email: '',
    drivingLicenseConfirmed: true,
    remarks: ''
  });
  const [isBooked, setIsBooked] = useState(false);

  // Sync active car & reset booking confirmation whenever modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setIsBooked(false);
      return;
    }
    const targetCar = selectedCar || availableCars[0] || null;
    if (targetCar) {
      setActiveCarId(targetCar.id);
      setFormData((prev) => ({
        ...prev,
        carId: targetCar.id,
        carTitle: `${targetCar.brand} ${targetCar.model}`,
      }));
    } else {
      setActiveCarId('');
      setFormData((prev) => ({
        ...prev,
        carId: '',
        carTitle: customModel.trim() || 'Showroom bezoek / proefrit',
      }));
    }
  }, [isOpen, selectedCar?.id]);

  if (!isOpen) return null;

  const currentCar = availableCars.find((c) => c.id === activeCarId) || selectedCar;
  const shopName = dealershipSettings?.name || DEALERSHIP_INFO.name;
  const shopAddress = dealershipSettings?.address
    ? `${dealershipSettings.address}, ${dealershipSettings.zipCode || '2660'} ${dealershipSettings.city || 'Hoboken (Antwerpen)'}`
    : DEALERSHIP_INFO.address.full;
  const shopPhone = dealershipSettings?.phone || DEALERSHIP_INFO.contact.phone;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalBooking: TestDriveBooking = {
      ...formData,
      carTitle: currentCar
        ? `${currentCar.brand} ${currentCar.model}`
        : customModel.trim() || 'Algemene proefrit / showroombezoek',
    };
    setIsBooked(true);
    confetti({
      particleCount: 65,
      spread: 55,
      origin: { y: 0.6 }
    });
    if (onBookingSuccess) {
      onBookingSuccess(finalBooking);
    }
  };

  const timeSlots = ['10:30', '11:45', '14:00', '15:15', '16:30', '17:45'];

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col border border-zinc-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#141416] text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FF6B00] flex items-center justify-center text-white">
              <CarFront className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-['Outfit',sans-serif]">
                {t.title}
              </h3>
              <p className="text-[11px] text-zinc-400">
                {t.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-5">
          {!isBooked ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Selected Car Preview / Switcher */}
              <div>
                <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
                  {t.selectCar}
                </label>
                {availableCars.length > 0 ? (
                  <select
                    value={activeCarId}
                    onChange={(e) => {
                      const id = e.target.value;
                      setActiveCarId(id);
                      const car = availableCars.find((c) => c.id === id);
                      if (car) {
                        setFormData((prev) => ({
                          ...prev,
                          carId: car.id,
                          carTitle: `${car.brand} ${car.model}`
                        }));
                      }
                    }}
                    className="w-full min-h-[44px] bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-base sm:text-sm font-semibold text-zinc-950 focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                  >
                    {availableCars.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.brand} {c.model} ({c.year} - €{c.price.toLocaleString('nl-BE')})
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={customModel}
                    onChange={(e) => setCustomModel(e.target.value)}
                    placeholder="Bijv. Audi RS6, BMW X5, of algemene showroomafspraak..."
                    className="w-full min-h-[44px] bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-base sm:text-sm font-medium text-zinc-950 focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                  />
                )}
              </div>

              {currentCar && (
                <div className="flex items-center gap-3.5 p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs">
                  <img
                    src={currentCar.images[0] || '/logo2.png'}
                    alt=""
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/logo2.png';
                    }}
                    className="w-16 h-12 object-cover rounded-lg"
                  />
                  <div>
                    <div className="font-bold text-zinc-950">
                      {currentCar.brand} {currentCar.model}
                    </div>
                    <div className="text-zinc-500">
                      {currentCar.powerHp} PK · {currentCar.transmission} · {currentCar.fuel}
                    </div>
                  </div>
                </div>
              )}

              {/* Date & Time Slot Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-[#1A1A1A] uppercase tracking-wider mb-2">
                    {t.date} *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full min-h-[44px] bg-[#F8F8F8] border border-gray-200 rounded-2xl px-4 py-3 text-base sm:text-sm focus:ring-2 focus:ring-[#FF6B00] focus:outline-none font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-[#1A1A1A] uppercase tracking-wider mb-2">
                    {t.time} *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setFormData({ ...formData, timeSlot: slot })}
                        className={`min-h-[42px] py-2.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          formData.timeSlot === slot
                            ? 'bg-[#FF6B00] text-white border-[#FF6B00] shadow-sm'
                            : 'bg-[#F8F8F8] border-gray-200 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Personal Info */}
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {t.fullName} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t.fullName}
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full min-h-[44px] bg-[#F8F8F8] border border-gray-200 rounded-2xl px-4 py-3 text-base sm:text-sm focus:ring-2 focus:ring-[#FF6B00] focus:outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {t.phone} *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+32 4XX XX XX XX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full min-h-[44px] bg-[#F8F8F8] border border-gray-200 rounded-2xl px-4 py-3 text-base sm:text-sm focus:ring-2 focus:ring-[#FF6B00] focus:outline-none font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {t.email} *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="email@..."
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full min-h-[44px] bg-[#F8F8F8] border border-gray-200 rounded-2xl px-4 py-3 text-base sm:text-sm focus:ring-2 focus:ring-[#FF6B00] focus:outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {t.remarks}
                  </label>
                  <textarea
                    rows={2}
                    placeholder="..."
                    value={formData.remarks}
                    onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                    className="w-full bg-[#F8F8F8] border border-gray-200 rounded-2xl p-3.5 text-base sm:text-xs focus:ring-2 focus:ring-[#FF6B00] focus:outline-none font-medium"
                  />
                </div>
              </div>

              {/* Driving License Checkbox */}
              <label className="flex items-start gap-3 cursor-pointer text-xs text-gray-600 font-medium">
                <input
                  type="checkbox"
                  required
                  checked={formData.drivingLicenseConfirmed}
                  onChange={(e) => setFormData({ ...formData, drivingLicenseConfirmed: e.target.checked })}
                  className="mt-0.5 accent-[#FF6B00] rounded"
                />
                <span>
                  {t.drivingLicense}
                </span>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#FF6B00] hover:bg-orange-600 text-white font-bold uppercase text-xs tracking-wider py-4 px-4 rounded-2xl shadow-md transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{t.submit}</span>
              </button>
            </form>
          ) : (
            /* Booking Confirmed State */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black font-['Outfit',sans-serif] text-[#1A1A1A]">
                {t.successTitle}
              </h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed font-medium">
                {t.successText}
              </p>

              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-600 max-w-sm mx-auto text-left space-y-1.5">
                <div className="font-bold text-zinc-950">{shopName}</div>
                <div>{shopAddress}</div>
                <div className="text-[#FF6B00] font-bold pt-1">
                  Tel: {shopPhone}
                </div>
              </div>

              <button
                onClick={onClose}
                className="inline-block bg-[#141416] hover:bg-black text-white text-xs font-bold uppercase tracking-wider px-8 py-3 rounded-xl cursor-pointer transition-colors"
              >
                {t.close}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
