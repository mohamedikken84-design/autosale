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
import { Language, Currency } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { formatCurrencyPrice, getCurrencySymbol } from '../utils/currency';

interface FinancingCalculatorProps {
  language?: Language;
  currency?: Currency;
}

export const FinancingCalculator: React.FC<FinancingCalculatorProps> = ({ 
  language = 'nl',
  currency = 'EUR' as Currency
}) => {
  const activeCurrency: Currency = currency;
  const [carPrice, setCarPrice] = useState<number>(65000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(15);
  const [months, setMonths] = useState<number>(60);
  const [balloonPercent, setBalloonPercent] = useState<number>(15);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');

  const t = TRANSLATIONS[language]?.financing || TRANSLATIONS.nl.financing;
  const currSymbol = getCurrencySymbol(activeCurrency).trim();

  // Helper to clean up currency symbol in labels like "(€)"
  const cleanLabel = (text: string) => {
    return text.replace(/\(€\)/g, `(${currSymbol})`);
  };

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
    <section id="financiering" className="py-12 sm:py-16 bg-[#F8F9FA] border-y border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF6B00] text-white text-xs font-bold uppercase tracking-widest mb-3 shadow-xs">
            <Calculator className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#1A1A1A] font-['Outfit',sans-serif] tracking-tighter">
            {t.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-500 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Sliders and Controls (7 cols) */}
          <div className="lg:col-span-7 bg-[#F8F8F8] rounded-3xl p-6 sm:p-8 border border-gray-200 space-y-6">
            {/* 1. Car Price Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  {cleanLabel(t.carPrice)}
                </label>
                <span className="text-2xl font-black text-[#1A1A1A] font-['Outfit',sans-serif] tracking-tight">
                  {formatCurrencyPrice(carPrice, activeCurrency)}
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
                <span>{formatCurrencyPrice(15000, activeCurrency)}</span>
                <span>{formatCurrencyPrice(100000, activeCurrency)}</span>
                <span>{formatCurrencyPrice(180000, activeCurrency)}</span>
              </div>
            </div>

            {/* 2. Down Payment Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  {cleanLabel(t.downPayment)} ({downPaymentPercent}%)
                </label>
                <span className="text-base font-bold text-[#1A1A1A]">
                  {formatCurrencyPrice(downPaymentAmount, activeCurrency)}
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
                <span>0%</span>
                <span>20%</span>
                <span>40%</span>
              </div>
            </div>

            {/* 3. Duration Buttons */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                {t.duration}
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
                    <div>{m} {t.months}</div>
                    <div className={`text-[10px] font-semibold mt-0.5 ${months === m ? 'text-white/80' : 'text-gray-400'}`}>{m / 12} {t.years}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Ballon / Restwaarde */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  {cleanLabel(t.balloonLabel)} ({balloonPercent}%)
                </label>
                <span className="text-base font-bold text-[#1A1A1A]">
                  {formatCurrencyPrice(balloonAmount, activeCurrency)}
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
            </div>
          </div>

          {/* Result & Proposal Card (5 cols) */}
          <div className="lg:col-span-5 bg-[#1A1A1A] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-zinc-800 space-y-6">
            <div>
              <span className="text-xs font-black tracking-widest uppercase text-[#FF6B00]">
                {t.monthlyEstTitle}
              </span>
              <div className="text-4xl sm:text-5xl font-black font-['Outfit',sans-serif] text-white mt-1">
                {formatCurrencyPrice(monthlyPayment, activeCurrency)} <span className="text-sm font-normal text-gray-400">/ {t.months}</span>
              </div>
              <p className="text-xs text-gray-400 mt-2 font-medium">
                {t.interestNote} • {months} {t.months}
              </p>
            </div>

            {/* Calculation summary */}
            <div className="p-4 rounded-2xl bg-black/50 border border-zinc-800 space-y-2.5 text-xs">
              <div className="flex justify-between text-gray-400">
                <span>{cleanLabel(t.carPrice)}:</span>
                <span className="font-bold text-white">{formatCurrencyPrice(carPrice, activeCurrency)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>{cleanLabel(t.downPayment)}:</span>
                <span className="font-bold text-white">{formatCurrencyPrice(downPaymentAmount, activeCurrency)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>{cleanLabel(t.totalCost)}:</span>
                <span className="font-bold text-white">{formatCurrencyPrice(principal, activeCurrency)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>{cleanLabel(t.balloonLabel)}:</span>
                <span className="font-bold text-white">{formatCurrencyPrice(balloonAmount, activeCurrency)}</span>
              </div>
            </div>

            {/* Quick Proposal Form */}
            {!formSubmitted ? (
              <form onSubmit={handleApply} className="space-y-3 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-gray-300">
                  {t.applyTitle}
                </div>
                <input
                  type="text"
                  required
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder={t.name}
                  className="w-full bg-black/60 border border-zinc-700 rounded-2xl px-4 py-3 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                />
                <input
                  type="tel"
                  required
                  value={applicantPhone}
                  onChange={(e) => setApplicantPhone(e.target.value)}
                  placeholder={t.phone}
                  className="w-full bg-black/60 border border-zinc-700 rounded-2xl px-4 py-3 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                />

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#FF6B00] hover:bg-orange-600 text-white font-bold uppercase text-xs tracking-wider py-4 px-6 rounded-2xl shadow-md transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.sendApplication}</span>
                </button>
              </form>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-2">
                <CheckCircle2 className="w-7 h-7 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">{t.appSubmitted}</h4>
                <p className="text-xs text-zinc-300">
                  {applicantName}
                </p>
              </div>
            )}

            {/* Legal notice requirement for Belgium */}
            <div className="pt-2 border-t border-zinc-800/80 text-[10px] text-zinc-400 leading-tight">
              {t.disclaimer}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
