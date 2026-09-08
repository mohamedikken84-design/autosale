import React, { useState } from 'react';
import { 
  Car, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Banknote, 
  Clock, 
  FileCheck, 
  Sparkles,
  ChevronRight,
  Send,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ValuationFormState, Language } from '../types';
import { DEALERSHIP_INFO } from '../data/dealership';
import { TRANSLATIONS } from '../i18n/translations';

interface CarValuationSectionProps {
  onValuationSubmit?: (data: ValuationFormState, referenceNumber: string) => void;
  language?: Language;
}

export const CarValuationSection: React.FC<CarValuationSectionProps> = ({
  onValuationSubmit,
  language = 'nl'
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
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep((prev) => (prev + 1) as any);
    } else {
      // Final submit
      const ref = 'AS-TAX-' + Math.floor(100000 + Math.random() * 900000);
      setReferenceNumber(ref);
      setIsSubmitted(true);
      if (onValuationSubmit) {
        onValuationSubmit(formData, ref);
      }
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
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
      notes: ''
    });
  };

  return (
    <section id="overname" className="py-16 lg:py-24 bg-[#1A1A1A] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Value Proposition & Trust Points (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF6B00] text-white text-xs font-bold uppercase tracking-widest shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black font-['Outfit',sans-serif] tracking-tighter leading-tight">
              {t.title}
            </h2>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {t.subtitle}
            </p>

            {/* Criteria Box */}
            <div className="p-5 rounded-3xl bg-black/40 border border-zinc-800 text-xs text-gray-300">
              <div className="font-bold text-white mb-1.5 flex items-center gap-2 text-sm uppercase tracking-wider">
                <AlertCircle className="w-4 h-4 text-[#FF6B00]" />
                <span>{t.benefit1 || 'Inkoop & Overname'}</span>
              </div>
              <p className="leading-relaxed">
                {t.subtitle}
              </p>
            </div>

            {/* 3 Inkoop Voordelen */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center shrink-0 border border-[#FF6B00]/20">
                  <Banknote className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{t.benefit1}</h4>
                  <p className="text-xs text-gray-400">{t.benefit2}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center shrink-0 border border-[#FF6B00]/20">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{t.benefit2}</h4>
                  <p className="text-xs text-gray-400">{t.benefit3}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center shrink-0 border border-[#FF6B00]/20">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{t.benefit3}</h4>
                  <p className="text-xs text-gray-400">{t.subtitle}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3-Step Valuation Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white text-[#1A1A1A] rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100">
              {!isSubmitted ? (
                <div>
                  {/* Step Indicators */}
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        step === 1 ? 'bg-[#FF6B00] text-white' : 'bg-gray-100 text-gray-700'
                      }`}>
                        1
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] hidden sm:inline">{t.step1}</span>
                    </div>

                    <div className="w-8 h-0.5 bg-gray-200" />

                    <div className="flex items-center gap-2">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        step === 2 ? 'bg-[#FF6B00] text-white' : 'bg-gray-100 text-gray-700'
                      }`}>
                        2
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] hidden sm:inline">{t.step2}</span>
                    </div>

                    <div className="w-8 h-0.5 bg-gray-200" />

                    <div className="flex items-center gap-2">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        step === 3 ? 'bg-[#FF6B00] text-white' : 'bg-gray-100 text-gray-700'
                      }`}>
                        3
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] hidden sm:inline">{t.step3}</span>
                    </div>
                  </div>

                  {/* Form Step 1: Vehicle Basics */}
                  {step === 1 && (
                    <form onSubmit={handleNext} className="space-y-4">
                      <h3 className="text-2xl font-black font-['Outfit',sans-serif] text-[#1A1A1A] tracking-tight">
                        {t.step1Title}
                      </h3>
                      <p className="text-xs text-gray-500 mb-4">
                        {t.step1Subtitle}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                            {t.licensePlate}
                          </label>
                          <input
                            type="text"
                            name="licensePlate"
                            value={formData.licensePlate}
                            onChange={handleChange}
                            placeholder="1-ABC-123"
                            className="w-full bg-[#F8F8F8] border border-gray-200 rounded-2xl px-4 py-3 text-xs font-bold uppercase focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                            {tHero.brand} *
                          </label>
                          <input
                            type="text"
                            name="brand"
                            required
                            value={formData.brand}
                            onChange={handleChange}
                            placeholder="Land Rover, Mercedes, BMW..."
                            className="w-full bg-[#F8F8F8] border border-gray-200 rounded-2xl px-4 py-3 text-xs font-bold focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                            {t.model} *
                          </label>
                          <input
                            type="text"
                            name="model"
                            required
                            value={formData.model}
                            onChange={handleChange}
                            placeholder="Range Rover Sport P440e..."
                            className="w-full bg-[#F8F8F8] border border-gray-200 rounded-2xl px-4 py-3 text-xs font-bold focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
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
                            placeholder="bv. 2021"
                            className="w-full bg-[#F8F8F8] border border-gray-200 rounded-2xl px-4 py-3 text-xs font-bold focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                            {t.mileage} *
                          </label>
                          <input
                            type="number"
                            name="mileage"
                            min="0"
                            required
                            value={formData.mileage}
                            onChange={handleChange}
                            placeholder="bv. 45000"
                            className="w-full bg-[#F8F8F8] border border-gray-200 rounded-2xl px-4 py-3 text-xs font-bold focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                            {tHero.fuel} *
                          </label>
                          <select
                            name="fuel"
                            value={formData.fuel}
                            onChange={handleChange}
                            className="w-full bg-[#F8F8F8] border border-gray-200 rounded-2xl px-4 py-3 text-xs font-bold focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                          >
                            <option value="Benzine">{tHero.petrol}</option>
                            <option value="Diesel">{tHero.diesel}</option>
                            <option value="Plug-in Hybride">{tHero.hybrid}</option>
                            <option value="Elektrisch">{tHero.electric}</option>
                          </select>
                        </div>
                      </div>

                      <div className="pt-4 flex justify-end">
                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 bg-[#FF6B00] hover:bg-orange-600 text-white font-bold uppercase text-xs tracking-wider py-3.5 px-6 rounded-2xl transition-all cursor-pointer shadow-md"
                        >
                          <span>{t.nextStep}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Form Step 2: Condition & Pricing */}
                  {step === 2 && (
                    <form onSubmit={handleNext} className="space-y-4">
                      <h3 className="text-xl font-bold font-['Outfit',sans-serif] text-zinc-950">
                        {t.step2Title}
                      </h3>
                      <p className="text-xs text-zinc-500 mb-4">
                        {t.step2Subtitle}
                      </p>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                            {t.condition} *
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            {[
                              { id: 'uitstekend', label: t.conditionExcellent, sub: '' },
                              { id: 'goed', label: t.conditionGood, sub: '' },
                              { id: 'gebruikt', label: t.conditionFair, sub: '' }
                            ].map((c) => (
                              <button
                                key={c.id}
                                type="button"
                                onClick={() => setFormData((prev) => ({ ...prev, condition: c.id as any }))}
                                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                                  formData.condition === c.id
                                    ? 'border-[#FF6B00] bg-orange-50/50 ring-2 ring-[#FF6B00]'
                                    : 'border-gray-200 hover:bg-gray-50'
                                }`}
                              >
                                <div className="font-bold text-xs uppercase tracking-wider text-[#1A1A1A]">{c.label}</div>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                            {t.expectedPrice}
                          </label>
                          <input
                            type="text"
                            name="expectedPrice"
                            value={formData.expectedPrice}
                            onChange={handleChange}
                            placeholder="€ 45.000"
                            className="w-full bg-[#F8F8F8] border border-gray-200 rounded-2xl px-4 py-3 text-xs font-bold focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                            {t.notes}
                          </label>
                          <textarea
                            name="notes"
                            rows={3}
                            value={formData.notes}
                            onChange={handleChange}
                            placeholder="..."
                            className="w-full bg-[#F8F8F8] border border-gray-200 rounded-2xl p-4 text-xs font-semibold focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="pt-4 flex justify-between">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="text-xs font-bold uppercase tracking-wider text-gray-600 hover:text-black py-3 px-4 cursor-pointer"
                        >
                          ← {t.previousStep}
                        </button>
                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 bg-[#FF6B00] hover:bg-orange-600 text-white font-bold uppercase text-xs tracking-wider py-3.5 px-6 rounded-2xl transition-all cursor-pointer shadow-md"
                        >
                          <span>{t.nextStep}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Form Step 3: Contact Details & Submit */}
                  {step === 3 && (
                    <form onSubmit={handleNext} className="space-y-4">
                      <h3 className="text-2xl font-black font-['Outfit',sans-serif] text-[#1A1A1A] tracking-tight">
                        {t.step3Title}
                      </h3>
                      <p className="text-xs text-gray-500 mb-4">
                        {t.step3Subtitle}
                      </p>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                            {t.yourName} *
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Alex..."
                            className="w-full bg-[#F8F8F8] border border-gray-200 rounded-2xl px-4 py-3 text-xs font-bold focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                            {t.phone} *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+32 4XX XX XX XX"
                            className="w-full bg-[#F8F8F8] border border-gray-200 rounded-2xl px-4 py-3 text-xs font-bold focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                            {t.email} *
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="alex@..."
                            className="w-full bg-[#F8F8F8] border border-gray-200 rounded-2xl px-4 py-3 text-xs font-bold focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="p-4 bg-[#F8F8F8] rounded-2xl text-xs text-gray-600 flex items-start gap-2 border border-gray-100">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>
                          {t.privacyNote}
                        </span>
                      </div>

                      <div className="pt-4 flex justify-between items-center">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="text-xs font-bold uppercase tracking-wider text-gray-600 hover:text-black py-3 px-4 cursor-pointer"
                        >
                          ← {t.previousStep}
                        </button>
                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#FF6B00] text-white font-bold uppercase text-xs tracking-wider py-4 px-8 rounded-2xl shadow-md transition-all cursor-pointer"
                        >
                          <Send className="w-4 h-4 text-[#FF6B00]" />
                          <span>{t.submit}</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              ) : (
                /* Success Screen */
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-['Outfit',sans-serif] text-zinc-950">
                    {t.successTitle}
                  </h3>
                  <div className="inline-block bg-zinc-100 px-4 py-1.5 rounded-lg text-xs font-mono font-bold text-zinc-700">
                    Ref: {referenceNumber}
                  </div>
                  <p className="text-sm text-zinc-600 max-w-md mx-auto leading-relaxed">
                    {t.successText}
                  </p>

                  <div className="pt-4 flex justify-center gap-3">
                    <button
                      onClick={handleReset}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
                    >
                      {t.badge}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
