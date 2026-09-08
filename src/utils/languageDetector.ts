import { Language } from '../types';

const STORAGE_KEY = 'auto_sale_language';

/**
 * Maps country code to a default language
 */
function countryToLanguage(countryCode: string): Language {
  const code = countryCode.toUpperCase();
  if (code === 'NL') return 'nl';
  if (code === 'FR' || code === 'MC') return 'fr';
  if (code === 'DE' || code === 'AT') return 'de';
  if (code === 'IT' || code === 'SM' || code === 'VA') return 'it';
  if (code === 'PL') return 'pl';
  if (['ES', 'MX', 'AR', 'CO', 'CL', 'PE', 'VE', 'EC', 'GT', 'CU', 'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PR', 'UY', 'PA'].includes(code)) {
    return 'es';
  }
  if (code === 'BE') {
    // For Belgium, check browser preference if FR, DE, ES, IT, PL, else NL
    const browserLang = navigator.language?.slice(0, 2).toLowerCase();
    if (browserLang === 'fr') return 'fr';
    if (browserLang === 'de') return 'de';
    if (browserLang === 'it') return 'it';
    if (browserLang === 'es') return 'es';
    if (browserLang === 'pl') return 'pl';
    return 'nl';
  }
  // Default for non-EU or other countries: browser language or English
  const browser = navigator.language?.slice(0, 2).toLowerCase();
  if (browser === 'nl' || browser === 'fr' || browser === 'de' || browser === 'es' || browser === 'it' || browser === 'pl') {
    return browser as Language;
  }
  return 'en';
}

/**
 * Gets currently saved language or detects from IP/browser
 */
export async function detectVisitorLanguage(): Promise<Language> {
  // 1. Manual user override in localStorage has highest priority
  try {
    const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('auto_sale_lang');
    if (saved && ['nl', 'fr', 'en', 'de', 'es', 'it', 'pl'].includes(saved)) {
      return saved as Language;
    }
  } catch {
    // ignore
  }

  // 2. Try lightweight IP geolocation
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2s timeout
    const res = await fetch('https://ipapi.co/json/', { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      if (data && data.country_code) {
        return countryToLanguage(data.country_code);
      }
    }
  } catch {
    // fallback if offline or blocked
  }

  // 3. Fallback to browser language
  const browserLang = navigator.language?.slice(0, 2).toLowerCase();
  if (browserLang === 'it') return 'it';
  if (browserLang === 'es') return 'es';
  if (browserLang === 'pl') return 'pl';
  if (browserLang === 'nl') return 'nl';
  if (browserLang === 'fr') return 'fr';
  if (browserLang === 'de') return 'de';

  // 4. Timezone fallback
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone.toLowerCase();
    if (tz.includes('rome') || tz.includes('milan')) return 'it';
    if (tz.includes('warsaw') || tz.includes('poland')) return 'pl';
    if (tz.includes('madrid') || tz.includes('canary') || tz.includes('bogota') || tz.includes('mexico')) return 'es';
  } catch {
    // ignore
  }

  return 'en';
}

/**
 * Save manual language choice
 */
export function saveVisitorLanguage(lang: Language) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
    document.cookie = `auto_sale_lang=${lang};path=/;max-age=31536000;SameSite=Lax`;
  } catch {
    // ignore
  }
}
