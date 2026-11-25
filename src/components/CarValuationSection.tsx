import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  Banknote,
  Clock,
  FileCheck,
  Send,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ValuationFormState, Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface CarValuationSectionProps {
  onValuationSubmit?: (data: ValuationFormState, referenceNumber: string) => void;
  language?: Language;
}

export const CarValuationSection: React.FC<CarValuationSectionProps> = ({
  onValuationSubmit,
  language = 'nl',
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');

  const t = TRANSLATIONS[language]?.valuation || TRANSLATIONS.nl.valuation;
  const tHero = TRANSLATIONS[language]?.hero || TRANSLATIONS.nl.hero;

  const [formData, setFormData] = useState<ValuationFormState>({
    licensePlate: '',
    brand: '',
    model: '',
    year: '',
    mileage: '',
    fuel: 'Benzine',
    transmission: 'Automaat',
    condition: 'uitstekend',
    expectedPrice: '',
    name: '',
    phone: '',
    email: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep((prev) => (prev + 1) as 1 | 2 | 3);
    } else {
      const ref = 'AS-TAX-' + Math.floor(100000 + Math.random() * 900000);
      setReferenceNumber(ref);
      setIsSubmitted(true);
      if (onValuationSubmit) {
        onValuationSubmit(formData, ref);
      }
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setStep(1);
    setFormData({
      licensePlate: '',
      brand: '',
      model: '',
      year: '',
      mileage: '',
      fuel: 'Benzine',
      transmission: 'Automaat',
      condition: 'uitstekend',
      expectedPrice: '',
      name: '',
      phone: '',
      email: '',
      notes: '',
    });
  };

  return (
    <section id="overname" className="py-10 sm:py-16 lg:py-20 bg-[#141416] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Clean Value Proposition */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#FF6B00]">
              {t.badge}
            </p>

            <h2 className="text-2xl sm:text-4xl font-extrabold font-['Outfit',sans-serif] tracking-tight leading-tight text-balance">
              {t.title}
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              {t.subtitle}
            </p>

            <div className="space-y-3.5 sm:space-y-4 pt-2 border-t border-zinc-800">
              <div className="flex items-center gap-3.5 pt-2">
                <div className="w-10 h-10 rounded-xl bg-zinc-800/80 text-[#FF6B00] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-sm font-semibold text-white">{t.benefit1}</div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-zinc-800/80 text-[#FF6B00] flex items-center justify-center shrink-0">
                  <Banknote className="w-5 h-5" />
                </div>
                <div className="text-sm font-semibold text-white">{t.benefit2}</div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-zinc-800/80 text-[#FF6B00] flex items-center justify-center shrink-0">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div className="text-sm font-semibold text-white">{t.benefit3}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean 3-Step Valuation Form */}
          <div className="lg:col-span-7">
            <div className="bg-white text-zinc-950 rounded-2xl p-5 sm:p-8 shadow-xl">
              {!isSubmitted ? (
                <div>
                  {/* Step Indicators */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-200 text-xs font-semibold">
                    {[
                      { num: 1, label: t.step1 },
                      { num: 2, label: t.step2 },
                      { num: 3, label: t.step3 },
                    ].map((item, idx) => (
                      <React.Fragment key={item.num}>
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold tabular-nums ${
                              step === item.num
                                ? 'bg-[#FF6B00] text-white'
                                : step > item.num
                                ? 'bg-zinc-900 text-white'
                                : 'bg-zinc-100 text-zinc-500'
                            }`}
                          >
                            {item.num}
                          </span>
                          <span className={`hidden sm:inline ${step === item.num ? 'text-zinc-950 font-bold' : 'text-zinc-500'}`}>
                            {item.label}
                          </span>
                        </div>
                        {idx < 2 && <div className="flex-1 h-px bg-zinc-200 mx-3" />}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Step 1: Vehicle Basics */}
                  {step === 1 && (
                    <form onSubmit={handleNext} className="space-y-4">
                      <h3 className="text-lg sm:text-xl font-bold font-['Outfit',sans-serif] text-zinc-950">
                        {t.step1Title}
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-zinc-700 mb-1">
                            {t.plate}
                          </label>
                          <input
                            type="text"
                            name="licensePlate"
                            value={formData.licensePlate}
                            onChange={handleChange}
                            placeholder="1-ABC-123"
                            className="w-full min-h-[44px] bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-base sm:text-sm font-medium uppercase focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-zinc-700 mb-1">
                            {tHero.brand} *
                          </label>
                          <input
                            type="text"
                            name="brand"
                            required
                            value={formData.brand}
                            onChange={handleChange}
                            placeholder="Land Rover, Mercedes, BMW..."
                            className="w-full min-h-[44px] bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-base sm:text-sm font-medium focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-zinc-700 mb-1">
                            {t.model} *
                          </label>
                          <input
                            type="text"
                            name="model"
                            required
                            value={formData.model}
                            onChange={handleChange}
                            placeholder="Range Rover Sport P440e..."
                            className="w-full min-h-[44px] bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-base sm:text-sm font-medium focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-zinc-700 mb-1">
                            {t.year} *
                          </label>
                          <input
                            type="number"
                            name="year"
                            min="1990"
                            max="2027"
                            required
                            value={formData.year}
                            onChange={handleChange}
                            placeholder="2021"
                            className="w-full min-h-[44px] bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-base sm:text-sm font-medium focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-zinc-700 mb-1">
                            {t.mileage} *
                          </label>
                          <input
                            type="number"
                            name="mileage"
                            min="0"
                            required
                            value={formData.mileage}
                            onChange={handleChange}
                            placeholder="45000"
                            className="w-full min-h-[44px] bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-base sm:text-sm font-medium focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-zinc-700 mb-1">
                            {t.fuel} *
                          </label>
                          <select
                            name="fuel"
                            value={formData.fuel}
                            onChange={handleChange}
                            className="w-full min-h-[44px] bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-base sm:text-sm font-medium focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                          >
                            <option value="Benzine">{tHero.petrol}</option>
                            <option value="Diesel">{tHero.diesel}</option>
                            <option value="Plug-in Hybride">{tHero.hybrid}</option>
                            <option value="Elektrisch">{tHero.electric}</option>
                          </select>
                        </div>
                      </div>

                      <div className="pt-3 flex justify-end">
                        <button
                          type="submit"
                          className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 bg-[#FF6B00] hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl transition-colors cursor-pointer"
                        >
                          <span>{t.nextStep}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Step 2: Condition & Pricing */}
                  {step === 2 && (
                    <form onSubmit={handleNext} className="space-y-4">
                      <h3 className="text-lg sm:text-xl font-bold font-['Outfit',sans-serif] text-zinc-950">
                        {t.step2Title}
                      </h3>

                      <div>
                        <label className="block text-xs font-semibold text-zinc-700 mb-2">
                          {t.condition} *
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          {[
                            { id: 'uitstekend', label: t.conditionExcellent },
                            { id: 'goed', label: t.conditionGood },
                            { id: 'gebruikt', label: t.conditionFair },
                          ].map((c) => (
                            <button
                              key={c.id}
                              type="button"
                              onClick={() => setFormData((prev) => ({ ...prev, condition: c.id as any }))}
                              className={`min-h-[44px] p-3.5 rounded-xl border text-left transition-colors cursor-pointer text-xs font-bold ${
                                formData.condition === c.id
                                  ? 'border-[#FF6B00] bg-orange-50 text-zinc-950 ring-1 ring-[#FF6B00]'
                                  : 'border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                              }`}
                            >
                              {c.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-zinc-700 mb-1">
                          {t.expectedPrice}
                        </label>
                        <input
                          type="text"
                          name="expectedPrice"
                          value={formData.expectedPrice}
                          onChange={handleChange}
                          placeholder="€ 45.000"
                          className="w-full min-h-[44px] bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-base sm:text-sm font-medium focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-zinc-700 mb-1">
                          {t.notes}
                        </label>
                        <textarea
                          name="notes"
                          rows={3}
                          value={formData.notes}
                          onChange={handleChange}
                          placeholder="Onderhoudshistoriek, opties..."
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3.5 text-base sm:text-sm focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                        />
                      </div>

                      <div className="pt-3 flex justify-between items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="min-h-[44px] text-xs font-semibold text-zinc-600 hover:text-zinc-950 py-2.5 px-4 cursor-pointer"
                        >
                          ← {t.previousStep}
                        </button>
                        <button
                          type="submit"
                          className="min-h-[46px] inline-flex items-center justify-center gap-2 bg-[#FF6B00] hover:bg-orange-600 text-white font-bold uppercase text-xs tracking-wider py-3 px-6 rounded-xl transition-colors cursor-pointer"
                        >
                          <span>{t.nextStep}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Step 3: Contact Details & Submit */}
                  {step === 3 && (
                    <form onSubmit={handleNext} className="space-y-4">
                      <h3 className="text-lg sm:text-xl font-bold font-['Outfit',sans-serif] text-zinc-950">
                        {t.step3Title}
                      </h3>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-semibold text-zinc-700 mb-1">
                            {t.name} *
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder={t.name}
                            className="w-full min-h-[44px] bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-base sm:text-sm font-medium focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-zinc-700 mb-1">
                              {t.phone} *
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              required
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="+32 4XX XX XX XX"
                              className="w-full min-h-[44px] bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-base sm:text-sm font-medium focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-zinc-700 mb-1">
                              {t.email} *
                            </label>
                            <input
                              type="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="naam@email.be"
                              className="w-full min-h-[44px] bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-base sm:text-sm font-medium focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 flex justify-between items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="min-h-[44px] text-xs font-semibold text-zinc-600 hover:text-zinc-950 py-2.5 px-4 cursor-pointer"
                        >
                          ← {t.previousStep}
                        </button>
                        <button
                          type="submit"
                          className="min-h-[46px] inline-flex items-center justify-center gap-2 bg-[#FF6B00] hover:bg-orange-600 text-white font-bold uppercase text-xs tracking-wider py-3 px-6 rounded-xl transition-colors cursor-pointer"
                        >
                          <Send className="w-4 h-4" />
                          <span>{t.submit}</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold font-['Outfit',sans-serif] text-zinc-950">
                    {t.successTitle}
                  </h3>
                  <div className="inline-block bg-zinc-100 px-3.5 py-1 rounded-lg text-xs font-mono font-bold text-zinc-700">
                    Ref: {referenceNumber}
                  </div>
                  <p className="text-sm text-zinc-600 max-w-md mx-auto leading-relaxed">
                    {t.successText}
                  </p>
                  <button
                    onClick={handleReset}
                    className="bg-zinc-950 hover:bg-[#FF6B00] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
                  >
                    Nieuwe schatting aanvragen
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
