import React, { useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { Language, Currency } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { formatCurrencyPrice, getCurrencySymbol } from '../utils/currency';

interface FinancingCalculatorProps {
  language?: Language;
  currency?: Currency;
  onFinancingSubmit?: (req: {
    name: string;
    phone: string;
    carPrice: number;
    downPaymentAmount: number;
    months: number;
    balloonAmount: number;
    monthlyPayment: number;
  }) => void;
}

export const FinancingCalculator: React.FC<FinancingCalculatorProps> = ({
  language = 'nl',
  currency = 'EUR' as Currency,
  onFinancingSubmit,
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

  const cleanLabel = (text: string) => text.replace(/\(€\)/g, `(${currSymbol})`);

  const annualInterestRate = 0.0599;
  const monthlyRate = annualInterestRate / 12;

  const downPaymentAmount = Math.round(carPrice * (downPaymentPercent / 100));
  const balloonAmount = Math.round(carPrice * (balloonPercent / 100));
  const principal = carPrice - downPaymentAmount;

  const calculateMonthly = () => {
    if (principal <= 0) return 0;
    const pmt =
      (principal - balloonAmount / Math.pow(1 + monthlyRate, months)) *
        (monthlyRate / (1 - Math.pow(1 + monthlyRate, -months))) +
      balloonAmount * monthlyRate;
    return Math.round(pmt);
  };

  const monthlyPayment = calculateMonthly();

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (onFinancingSubmit) {
      onFinancingSubmit({
        name: applicantName,
        phone: applicantPhone,
        carPrice,
        downPaymentAmount,
        months,
        balloonAmount,
        monthlyPayment,
      });
    }
    setFormSubmitted(true);
  };

  return (
    <section id="financiering" className="py-10 sm:py-16 lg:py-20 bg-zinc-50 border-y border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-7 sm:mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#FF6B00] mb-1">
            {t.badge}
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-950 font-['Outfit',sans-serif] tracking-tight">
            {t.title}
          </h2>
          <p className="mt-2 text-sm text-zinc-500">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
          {/* Sliders and Controls */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-8 border border-zinc-200 space-y-5 sm:space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-zinc-700">
                  {cleanLabel(t.carPrice)}
                </label>
                <span className="text-lg sm:text-xl font-extrabold text-zinc-950 font-['Outfit',sans-serif] tabular-nums">
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
                className="w-full accent-[#FF6B00] cursor-pointer h-2.5 bg-zinc-200 rounded-lg"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-zinc-700">
                  {cleanLabel(t.downPayment)} ({downPaymentPercent}%)
                </label>
                <span className="text-sm font-bold text-zinc-950 tabular-nums">
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
                className="w-full accent-[#FF6B00] cursor-pointer h-2.5 bg-zinc-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-2">
                {t.duration}
              </label>
              <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
                {[24, 36, 48, 60].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMonths(m)}
                    className={`min-h-[44px] py-2.5 px-1.5 sm:px-2 rounded-xl text-center border font-bold text-xs sm:text-sm transition-colors cursor-pointer tabular-nums ${
                      months === m
                        ? 'border-[#FF6B00] bg-[#FF6B00] text-white'
                        : 'border-zinc-200 bg-zinc-50 text-zinc-800 hover:bg-zinc-100'
                    }`}
                  >
                    {m} {t.months}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-zinc-700">
                  {cleanLabel(t.balloonLabel)} ({balloonPercent}%)
                </label>
                <span className="text-sm font-bold text-zinc-950 tabular-nums">
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
                className="w-full accent-[#FF6B00] cursor-pointer h-2.5 bg-zinc-200 rounded-lg"
              />
            </div>
          </div>

          {/* Result & Lead Form */}
          <div className="lg:col-span-5 bg-[#141416] text-white rounded-2xl p-5 sm:p-8 space-y-5 sm:space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#FF6B00]">
                {t.monthlyEstTitle}
              </p>
              <div className="text-3xl sm:text-4xl font-extrabold font-['Outfit',sans-serif] text-white mt-1 tabular-nums">
                {formatCurrencyPrice(monthlyPayment, activeCurrency)}{' '}
                <span className="text-sm font-normal text-zinc-400">/ {t.months}</span>
              </div>
              <p className="text-xs text-zinc-400 mt-1.5">
                {t.interestNote} · {months} {t.months}
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-800 space-y-2 text-xs tabular-nums">
              <div className="flex justify-between text-zinc-400">
                <span>{cleanLabel(t.carPrice)}</span>
                <span className="font-semibold text-white">{formatCurrencyPrice(carPrice, activeCurrency)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>{cleanLabel(t.downPayment)}</span>
                <span className="font-semibold text-white">{formatCurrencyPrice(downPaymentAmount, activeCurrency)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>{cleanLabel(t.totalCost)}</span>
                <span className="font-semibold text-white">{formatCurrencyPrice(principal, activeCurrency)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>{cleanLabel(t.balloonLabel)}</span>
                <span className="font-semibold text-white">{formatCurrencyPrice(balloonAmount, activeCurrency)}</span>
              </div>
            </div>

            {!formSubmitted ? (
              <form onSubmit={handleApply} className="space-y-3 pt-2 border-t border-zinc-800">
                <div className="text-xs font-semibold text-zinc-300 pt-1">
                  {t.applyTitle}
                </div>
                <input
                  type="text"
                  required
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder={t.name}
                  className="w-full min-h-[44px] bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#FF6B00]"
                />
                <input
                  type="tel"
                  required
                  value={applicantPhone}
                  onChange={(e) => setApplicantPhone(e.target.value)}
                  placeholder={t.phone}
                  className="w-full min-h-[44px] bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#FF6B00]"
                />

                <button
                  type="submit"
                  className="w-full min-h-[46px] flex items-center justify-center gap-2 bg-[#FF6B00] hover:bg-orange-600 text-white font-bold uppercase text-xs tracking-wider py-3 px-4 rounded-xl transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.sendApplication}</span>
                </button>
              </form>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-1.5">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">{t.appSubmitted}</h4>
                <p className="text-xs text-zinc-300">{applicantName}</p>
              </div>
            )}

            <p className="text-[11px] text-zinc-400 leading-relaxed">{t.disclaimer}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
