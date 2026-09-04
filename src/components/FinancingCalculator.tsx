import React, { useState } from 'react';
import { 
  Calculator, 
  CreditCard, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  Send
} from 'lucide-react';
import { DEALERSHIP_INFO } from '../data/dealership';

export const FinancingCalculator: React.FC = () => {
  const [carPrice, setCarPrice] = useState<number>(65000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(15);
  const [months, setMonths] = useState<number>(60);
  const [balloonPercent, setBalloonPercent] = useState<number>(15);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');

  // Fixed indicative annual percentage rate (JKP) in Belgium for young pre-owned cars
  const annualInterestRate = 0.0599; 
  const monthlyRate = annualInterestRate / 12;

  const downPaymentAmount = Math.round(carPrice * (downPaymentPercent / 100));
  const balloonAmount = Math.round(carPrice * (balloonPercent / 100));
  const principal = carPrice - downPaymentAmount;

  // Monthly payment calculation with residual value (balloon)
  // PMT = (P - B/(1+r)^n) * (r / (1 - (1+r)^(-n))) + (B * r)
  const calculateMonthly = () => {
    if (principal <= 0) return 0;
    const pmt = 
      (principal - balloonAmount / Math.pow(1 + monthlyRate, months)) *
      (monthlyRate / (1 - Math.pow(1 + monthlyRate, -months))) +
      balloonAmount * monthlyRate;
    return Math.round(pmt);
  };

  const monthlyPayment = calculateMonthly();
  const totalFinanced = monthlyPayment * months + downPaymentAmount + balloonAmount;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section id="financiering" className="py-16 lg:py-24 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF6B00] text-white text-xs font-bold uppercase tracking-widest mb-3 shadow-xs">
            <Calculator className="w-3.5 h-3.5" />
            <span>Financiering & Leasing</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#1A1A1A] font-['Outfit',sans-serif] tracking-tighter">
            Bereken Uw Maandelijkse Afbetaling
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-500 max-w-2xl mx-auto">
            Of u nu particulier koopt of zakelijk least: wij bieden flexibele formules op maat met of zonder voorschot, en met mogelijkheid tot een restwaarde (ballon).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Sliders and Controls (7 cols) */}
          <div className="lg:col-span-7 bg-[#F8F8F8] rounded-3xl p-6 sm:p-8 border border-gray-200 space-y-6">
            {/* 1. Car Price Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Aankoopprijs Voertuig
                </label>
                <span className="text-2xl font-black text-[#1A1A1A] font-['Outfit',sans-serif] tracking-tight">
                  €{carPrice.toLocaleString('nl-BE')}
                </span>
              </div>
              <input
                type="range"
                min="15000"
                max="180000"
                step="2500"
                value={carPrice}
                onChange={(e) => setCarPrice(Number(e.target.value))}
                className="w-full accent-[#FF6B00] cursor-pointer h-2 bg-gray-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mt-1 font-semibold">
                <span>€15.000</span>
                <span>€100.000</span>
                <span>€180.000</span>
              </div>
            </div>

            {/* 2. Down Payment Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Voorschot ({downPaymentPercent}%)
                </label>
                <span className="text-base font-bold text-[#1A1A1A]">
                  €{downPaymentAmount.toLocaleString('nl-BE')}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full accent-[#FF6B00] cursor-pointer h-2 bg-gray-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mt-1 font-semibold">
                <span>0% (Geen voorschot)</span>
                <span>20%</span>
                <span>40%</span>
              </div>
            </div>

            {/* 3. Duration Buttons */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                Looptijd van het Krediet
              </label>
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {[24, 36, 48, 60].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMonths(m)}
                    className={`py-3 px-2 rounded-2xl text-center border font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                      months === m
                        ? 'border-[#FF6B00] bg-[#FF6B00] text-white shadow-sm'
                        : 'border-gray-200 bg-white text-[#1A1A1A] hover:bg-gray-100'
                    }`}
                  >
                    <div>{m} mnd</div>
                    <div className={`text-[10px] font-semibold mt-0.5 ${months === m ? 'text-white/80' : 'text-gray-400'}`}>{m / 12} jaar</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Ballon / Restwaarde */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Restwaarde / Slottermijn ({balloonPercent}%)
                </label>
                <span className="text-base font-bold text-[#1A1A1A]">
                  €{balloonAmount.toLocaleString('nl-BE')}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="5"
                value={balloonPercent}
                onChange={(e) => setBalloonPercent(Number(e.target.value))}
                className="w-full accent-[#FF6B00] cursor-pointer h-2 bg-gray-200 rounded-lg"
              />
              <p className="text-[11px] text-gray-500 mt-1 font-medium">
                Een hogere restwaarde verlaagt uw maandbedrag aanzienlijk. Aan het einde kunt u de wagen inruilen of overnemen.
              </p>
            </div>
          </div>

          {/* Result & Proposal Card (5 cols) */}
          <div className="lg:col-span-5 bg-[#1A1A1A] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-zinc-800 space-y-6">
            <div>
              <span className="text-xs font-black tracking-widest uppercase text-[#FF6B00]">
                Geschat Maandbedrag
              </span>
              <div className="text-4xl sm:text-5xl font-black font-['Outfit',sans-serif] text-white mt-1">
                €{monthlyPayment} <span className="text-sm font-normal text-gray-400">/ maand</span>
              </div>
              <p className="text-xs text-gray-400 mt-2 font-medium">
                Gebaseerd op een indicatieve JKP van 5,99% met {months} maandelijkse termijnen.
              </p>
            </div>

            {/* Calculation summary */}
            <div className="p-4 rounded-2xl bg-black/50 border border-zinc-800 space-y-2.5 text-xs">
              <div className="flex justify-between text-gray-400">
                <span>Voertuigprijs:</span>
                <span className="font-bold text-white">€{carPrice.toLocaleString('nl-BE')}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Voorschot:</span>
                <span className="font-bold text-white">€{downPaymentAmount.toLocaleString('nl-BE')}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Te financieren kapitaal:</span>
                <span className="font-bold text-white">€{principal.toLocaleString('nl-BE')}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Laatste verhoogde aflossing:</span>
                <span className="font-bold text-white">€{balloonAmount.toLocaleString('nl-BE')}</span>
              </div>
            </div>

            {/* Quick Proposal Form */}
            {!formSubmitted ? (
              <form onSubmit={handleApply} className="space-y-3 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-gray-300">
                  Vraag Vrijblijvende Goedkeuring Aan
                </div>
                <input
                  type="text"
                  required
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="Uw naam"
                  className="w-full bg-black/60 border border-zinc-700 rounded-2xl px-4 py-3 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                />
                <input
                  type="tel"
                  required
                  value={applicantPhone}
                  onChange={(e) => setApplicantPhone(e.target.value)}
                  placeholder="Uw telefoonnummer (+32...)"
                  className="w-full bg-black/60 border border-zinc-700 rounded-2xl px-4 py-3 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                />

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#FF6B00] hover:bg-orange-600 text-white font-bold uppercase text-xs tracking-wider py-4 px-6 rounded-2xl shadow-md transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Vrijblijvend Voorstel Ontvangen</span>
                </button>
              </form>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-2">
                <CheckCircle2 className="w-7 h-7 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">Aanvraag Verzonden!</h4>
                <p className="text-xs text-zinc-300">
                  Bedankt <strong>{applicantName}</strong>. Onze financieringsexpert neemt binnen enkele uren contact met u op.
                </p>
              </div>
            )}

            {/* Legal notice requirement for Belgium */}
            <div className="pt-2 border-t border-zinc-800/80 text-[10px] text-zinc-400 leading-tight">
              * Let op, geld lenen kost ook geld. Lening op afbetaling onder voorbehoud van aanvaarding van uw dossier door onze erkende financiële partners.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
