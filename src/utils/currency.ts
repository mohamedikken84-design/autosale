import { Currency } from '../types';

// Approximate live conversion rates vs EUR
const RATES: Record<Currency, number> = {
  EUR: 1.0,
  GBP: 0.86,
  CHF: 0.96,
  USD: 1.08,
};

const SYMBOLS: Record<Currency, string> = {
  EUR: '€',
  GBP: '£',
  CHF: 'CHF ',
  USD: '$',
};

export function getCurrencySymbol(currency: Currency = 'EUR'): string {
  return SYMBOLS[currency] || '€';
}

export function convertPrice(amountInEur: number, targetCurrency: Currency): number {
  const rate = RATES[targetCurrency] || 1;
  return Math.round(amountInEur * rate);
}

export function formatCurrencyPrice(amountInEur: number, currency: Currency = 'EUR'): string {
  if (amountInEur === 0) return 'Prijs op aanvraag';
  const converted = convertPrice(amountInEur, currency);
  const symbol = SYMBOLS[currency] || '€';

  if (currency === 'EUR') {
    return `€ ${amountInEur.toLocaleString('nl-BE')}`;
  } else if (currency === 'GBP') {
    return `£ ${converted.toLocaleString('en-GB')}`;
  } else if (currency === 'USD') {
    return `$ ${converted.toLocaleString('en-US')}`;
  } else {
    return `CHF ${converted.toLocaleString('de-CH')}`;
  }
}
