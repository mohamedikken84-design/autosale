import React, { useState } from 'react';
import { 
  X, 
  CarFront, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  User, 
  Phone, 
  Mail,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Car, TestDriveBooking } from '../types';
import { DEALERSHIP_INFO } from '../data/dealership';

interface TestDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCar: Car | null;
  allCars: Car[];
}

export const TestDriveModal: React.FC<TestDriveModalProps> = ({
  isOpen,
  onClose,
  selectedCar,
  allCars
}) => {
  const [activeCarId, setActiveCarId] = useState<string>(selectedCar ? selectedCar.id : (allCars[0]?.id || ''));
  const [formData, setFormData] = useState<TestDriveBooking>({
    carId: selectedCar ? selectedCar.id : '',
    carTitle: selectedCar ? `${selectedCar.brand} ${selectedCar.model}` : '',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    timeSlot: '14:00',
    fullName: '',
    phone: '',
    email: '',
    drivingLicenseConfirmed: true,
    remarks: ''
  });
  const [isBooked, setIsBooked] = useState(false);

  // Update active car if prop changes
  React.useEffect(() => {
    if (selectedCar) {
      setActiveCarId(selectedCar.id);
      setFormData((prev) => ({
        ...prev,
        carId: selectedCar.id,
        carTitle: `${selectedCar.brand} ${selectedCar.model}`
      }));
    }
  }, [selectedCar]);

  if (!isOpen) return null;

  const currentCar = allCars.find((c) => c.id === activeCarId) || selectedCar;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const timeSlots = ['10:30', '11:45', '14:00', '15:15', '16:30', '17:45'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col border border-zinc-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-[#1A1A1A] text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FF6B00] flex items-center justify-center text-white shadow-md">
              <CarFront className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black font-['Outfit',sans-serif]">
                Plan een Vrijblijvende Proefrit
              </h3>
              <p className="text-[11px] text-gray-400 font-medium">
                Ervaar het rijcomfort bij Auto Sale te Hoboken (Antwerpen)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl text-gray-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {!isBooked ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Selected Car Preview / Switcher */}
              <div>
                <label className="block text-xs font-black text-[#1A1A1A] uppercase tracking-wider mb-2">
                  Gekozen Voertuig
                </label>
                <select
                  value={activeCarId}
                  onChange={(e) => {
                    const id = e.target.value;
                    setActiveCarId(id);
                    const car = allCars.find((c) => c.id === id);
                    if (car) {
                      setFormData((prev) => ({
                        ...prev,
                        carId: car.id,
                        carTitle: `${car.brand} ${car.model}`
                      }));
                    }
                  }}
                  className="w-full bg-[#F8F8F8] border border-gray-200 rounded-2xl px-4 py-3 text-sm font-bold text-[#1A1A1A] focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                >
                  {allCars.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.brand} {c.model} ({c.year} - €{c.price.toLocaleString('nl-BE')})
                    </option>
                  ))}
                </select>
              </div>

              {currentCar && (
                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#F8F8F8] border border-gray-200 text-xs">
                  <img
                    src={currentCar.images[0]}
                    alt=""
                    className="w-16 h-12 object-cover rounded-xl"
                  />
                  <div>
                    <div className="font-bold text-[#1A1A1A]">
                      {currentCar.brand} {currentCar.model}
                    </div>
                    <div className="text-gray-500 font-medium">
                      {currentCar.powerHp} PK • {currentCar.transmission} • {currentCar.fuel}
                    </div>
                  </div>
                </div>
              )}

              {/* Date & Time Slot Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-[#1A1A1A] uppercase tracking-wider mb-2">
                    Gewenste Datum *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-[#F8F8F8] border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#FF6B00] focus:outline-none font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-[#1A1A1A] uppercase tracking-wider mb-2">
                    Voorkeurstijdstip *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setFormData({ ...formData, timeSlot: slot })}
                        className={`py-2.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
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
                <label className="block text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
                  Uw Contactgegevens
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Volledige naam"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-[#F8F8F8] border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#FF6B00] focus:outline-none font-medium"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Telefoonnummer (+32...)"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#F8F8F8] border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#FF6B00] focus:outline-none font-medium"
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="email"
                    required
                    placeholder="E-mailadres"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#F8F8F8] border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#FF6B00] focus:outline-none font-medium"
                  />
                </div>

                <div>
                  <textarea
                    rows={2}
                    placeholder="Eventuele opmerkingen of vragen..."
                    value={formData.remarks}
                    onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                    className="w-full bg-[#F8F8F8] border border-gray-200 rounded-2xl p-3.5 text-xs focus:ring-2 focus:ring-[#FF6B00] focus:outline-none font-medium"
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
                  Ik ben in het bezit van een geldig rijbewijs B en neem dit mee naar de afspraak.
                </span>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#FF6B00] hover:bg-orange-600 text-white font-bold uppercase text-xs tracking-wider py-4 px-4 rounded-2xl shadow-md transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Afspraak Definitief Bevestigen</span>
              </button>
            </form>
          ) : (
            /* Booking Confirmed State */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black font-['Outfit',sans-serif] text-[#1A1A1A]">
                Proefrit Aangevraagd!
              </h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed font-medium">
                Bedankt <strong>{formData.fullName}</strong>. Wij hebben uw aanvraag voor de{' '}
                <strong>{currentCar?.brand} {currentCar?.model}</strong> op{' '}
                <strong>{formData.date} om {formData.timeSlot} uur</strong> ontvangen.
                U ontvangt ter bevestiging een e-mail en sms.
              </p>

              <div className="p-5 rounded-3xl bg-[#F8F8F8] border border-gray-200 text-xs text-gray-600 max-w-sm mx-auto text-left space-y-1.5 font-medium">
                <div className="font-black text-[#1A1A1A]">Locatie afspraak:</div>
                <div>{DEALERSHIP_INFO.name}</div>
                <div>{DEALERSHIP_INFO.address.full}</div>
                <div className="text-[#FF6B00] font-bold pt-1">
                  Tel: {DEALERSHIP_INFO.contact.phone}
                </div>
              </div>

              <button
                onClick={onClose}
                className="inline-block bg-[#1A1A1A] hover:bg-black text-white text-xs font-bold uppercase tracking-wider px-8 py-3 rounded-2xl cursor-pointer transition-colors"
              >
                Sluiten
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
