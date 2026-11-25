import { FuelType, TransmissionType, BodyType } from '../types';
import {
  parseAutoScoutHtml,
  ScrapedAutoScoutData,
  normalizeBodyType as normBody,
  normalizeTransmission as normTrans,
} from './autoscoutHtmlParser';

export interface ParsedCarDraft {
  brand: string;
  model: string;
  edition: string;
  year: number;
  mileage: number;
  price: number;
  priceType: 'Marge' | 'BTW Aftrekbaar' | 'Export';
  fuel: FuelType;
  transmission: TransmissionType;
  powerHp: number;
  engineSize?: string;
  co2?: number;
  euroStandard?: string;
  color: string;
  interior: string;
  bodyType: BodyType;
  description: string;
  options: string[];
  images: string[];
  licensePlate?: string;
  videoUrl?: string;
  carPassId?: string;
  sourceUrl?: string;
  highlightSpecs?: string[];
}

export interface AutoScoutImportResult {
  draft: ParsedCarDraft;
  method: 'html' | 'live-url' | 'text' | 'url-slug';
  blockedByCloudflare?: boolean;
  message?: string;
}

const COMMON_BRANDS = [
  'Mercedes-Benz', 'Land Rover', 'Range Rover', 'Aston Martin', 'Alfa Romeo',
  'BMW', 'Audi', 'Porsche', 'Volkswagen', 'Volvo', 'Jaguar', 'Ferrari',
  'Maserati', 'Bentley', 'Lamborghini', 'Tesla', 'Mini', 'Lexus', 'Polestar',
  'Ford', 'Peugeot', 'Renault', 'Toyota', 'Hyundai', 'Kia', 'Skoda', 'Seat', 'Cupra',
  'Mazda', 'Nissan', 'Opel', 'Citroen', 'DS', 'Jeep', 'Fiat', 'Suzuki', 'Honda'
];

function normalizeFuel(fuelStr: string): FuelType {
  const f = (fuelStr || '').toLowerCase();
  if (f.includes('diesel')) return 'Diesel';
  if (f.includes('plug-in') || f.includes('phev') || (f.includes('hybride') && f.includes('elektrisch'))) {
    return 'Plug-in Hybride';
  }
  if (f.includes('mild') || f.includes('mhev')) return 'Mild Hybride';
  if (f.includes('elektrisch') || f.includes('electric') || f.includes('électrique') || f.includes('elektro')) {
    return 'Elektrisch';
  }
  if (f.includes('hybride') || f.includes('hybrid')) return 'Plug-in Hybride';
  return 'Benzine';
}

function normalizeTransmission(transStr: string): TransmissionType {
  return normTrans(transStr) as TransmissionType;
}

function normalizeBodyType(bodyStr: string): BodyType {
  const b = normBody(bodyStr);
  const valid: BodyType[] = ['SUV / 4x4', 'Berline', 'Coupé', 'Break', 'Cabriolet', 'Sportwagen', 'Camper'];
  return valid.includes(b as BodyType) ? (b as BodyType) : 'Berline';
}

function extractHintsFromUrlSlug(url: string): Partial<ParsedCarDraft> {
  try {
    const u = new URL(url);
    const slug = u.pathname.split('/').pop() || '';
    const cleaned = slug
      .replace(/-[0-9a-f]{8}-[0-9a-f]{4}-.*$/i, '')
      .replace(/-/g, ' ');

    let detectedBrand = '';
    for (const b of COMMON_BRANDS) {
      if (new RegExp(`\\b${b.replace('-', ' ')}\\b`, 'i').test(cleaned)) {
        detectedBrand = b;
        break;
      }
    }

    let modelGuess = '';
    if (detectedBrand) {
      const idx = cleaned.toLowerCase().indexOf(detectedBrand.toLowerCase().replace('-', ' '));
      const afterBrand = cleaned.slice(idx + detectedBrand.length).trim();
      const words = afterBrand.split(/\s+/).filter((w) => w.length > 0);
      modelGuess = words.slice(0, 2).join(' ').replace(/\b\w/g, (c) => c.toUpperCase());
    }

    return {
      brand: detectedBrand,
      model: modelGuess,
      fuel: normalizeFuel(cleaned),
      sourceUrl: url,
    };
  } catch {
    return { sourceUrl: url };
  }
}

/**
 * Primary AutoScout24 Listing Importer (Async)
 * Supports:
 * 1. Pasted HTML / Page Source (Ctrl+U) or dropped .html file (100% reliable)
 * 2. Live server / Netlify serverless scrape endpoint for URLs
 * 3. Smart plain-text parser (Ctrl+A -> Ctrl+C on an AutoScout24 page)
 */
export async function fetchAndParseAutoScout(input: string): Promise<AutoScoutImportResult> {
  const trimmed = input.trim();

  // 1. Check if raw HTML / __NEXT_DATA__ was pasted or uploaded
  const looksLikeHtml =
    trimmed.startsWith('<!') ||
    trimmed.startsWith('<html') ||
    trimmed.includes('__NEXT_DATA__') ||
    trimmed.includes('<body') ||
    (trimmed.includes('<div') && trimmed.length > 500);

  if (looksLikeHtml) {
    const scraped = parseAutoScoutHtml(trimmed);
    const draft = mapScrapedToDraft(scraped);
    return {
      draft,
      method: 'html',
      message: `${draft.images.length} originele foto's en voertuiggegevens uit de paginabron ingeladen.`,
    };
  }

  // 2. Check if input is primarily a URL
  const urlMatch = trimmed.match(/https?:\/\/[^\s"'<>]+/i);
  const isPureUrl =
    !!urlMatch && trimmed.replace(urlMatch[0], '').trim().length < 20;
  const targetUrl = urlMatch
    ? urlMatch[0]
    : trimmed.includes('autoscout24.') && trimmed.length < 240
    ? `https://${trimmed}`
    : '';

  if (targetUrl && (isPureUrl || trimmed.length < 260)) {
    let serverErrorMsg = '';
    let blockedByCloudflare = false;

    try {
      const res = await fetch('/api/scrape-autoscout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl }),
      });

      const json = await res.json().catch(() => null);

      if (res.ok && json?.success && json?.data) {
        const draft = mapScrapedToDraft(json.data);
        if (draft.images.length > 0 || draft.price > 0) {
          return {
            draft,
            method: 'live-url',
            message: `Live opgehaald van AutoScout24: ${draft.images.length} foto's gevonden.`,
          };
        }
      } else if (json) {
        blockedByCloudflare = !!json.blocked;
        serverErrorMsg = json.error || '';
      }
    } catch {
      serverErrorMsg = 'De scrape-server is op dit moment niet bereikbaar.';
    }

    // URL could not be scraped directly -> return clean partial URL hints without fake data
    const hints = extractHintsFromUrlSlug(targetUrl);
    return {
      draft: {
        brand: hints.brand || '',
        model: hints.model || '',
        edition: '',
        year: new Date().getFullYear(),
        mileage: 0,
        price: 0,
        priceType: 'Marge',
        fuel: hints.fuel || 'Benzine',
        transmission: 'Automaat',
        powerHp: 150,
        color: '',
        interior: '',
        bodyType: 'SUV / 4x4',
        description: '',
        options: [],
        images: [],
        sourceUrl: targetUrl,
      },
      method: 'url-slug',
      blockedByCloudflare,
      message:
        serverErrorMsg ||
        'AutoScout24 blokkeert directe downloads via de server. Open de advertentie in uw browser, druk op Ctrl+U -> Ctrl+A -> Ctrl+C en plak de broncode hier (of upload de opgeslagen .html pagina).',
    };
  }

  // 3. Plain copied page text fallback
  const draft = parseAutoScoutInput(trimmed);
  return {
    draft,
    method: 'text',
    message:
      draft.brand || draft.price > 0
        ? 'Advertentietekst geanalyseerd. Controleer de velden hieronder en voeg eventueel foto’s toe.'
        : 'Kon weinig velden herkennen uit de tekst. Gebruik bij voorkeur Paginabron (Ctrl+U) of een opgeslagen .html bestand.',
  };
}

function mapScrapedToDraft(d: ScrapedAutoScoutData): ParsedCarDraft {
  const power = Number(d.powerHp) || 150;
  const trans = normalizeTransmission(d.transmission);
  const fuel = normalizeFuel(d.fuel);

  return {
    brand: d.brand && d.brand !== 'Onbekend' ? d.brand : '',
    model: d.model || '',
    edition: d.edition || '',
    year: Number(d.year) || new Date().getFullYear(),
    mileage: Number(d.mileage) || 0,
    price: Number(d.price) || 0,
    priceType: d.priceType === 'BTW Aftrekbaar' ? 'BTW Aftrekbaar' : 'Marge',
    fuel,
    transmission: trans,
    powerHp: power,
    engineSize: d.engineSize,
    co2: d.co2,
    euroStandard: d.euroStandard,
    color: d.color || 'Zwart metallic',
    interior: d.interior || 'Leder',
    bodyType: normalizeBodyType(d.bodyType),
    description: d.description || '',
    options: Array.isArray(d.options) ? d.options : [],
    images: Array.isArray(d.images) ? d.images : [],
    carPassId: d.carPassId || '',
    sourceUrl: d.sourceUrl || '',
    highlightSpecs: [
      `${power} PK`,
      trans,
      fuel,
      ...(d.options?.slice(0, 2) || []),
    ].slice(0, 4),
  };
}

/**
 * Client-Side AutoScout24 Parser
 * Analyzes pasted HTML or plain text copied from an AutoScout24 advertisement.
 */
export function parseAutoScoutInput(rawInput: string): ParsedCarDraft {
  const input = rawInput.trim();

  if (
    input.includes('<') &&
    (input.includes('__NEXT_DATA__') ||
      input.includes('prod.pictures.autoscout24.net') ||
      input.includes('listingDetails'))
  ) {
    try {
      const scraped = parseAutoScoutHtml(input);
      return mapScrapedToDraft(scraped);
    } catch {
      // Continue to heuristic regex
    }
  }

  const draft: ParsedCarDraft = {
    brand: '',
    model: '',
    edition: '',
    year: new Date().getFullYear(),
    mileage: 0,
    price: 0,
    priceType: 'Marge',
    fuel: 'Benzine',
    transmission: 'Automaat',
    powerHp: 150,
    color: 'Zwart metallic',
    interior: 'Leder',
    bodyType: 'Berline',
    description: '',
    options: [],
    images: [],
  };

  // 1. Extract genuine AutoScout24 images if present
  const as24CdnMatches = input.match(
    /https?:\/\/(?:prod\.pictures\.autoscout24\.net|images\.autoscout24\.[a-z]+)[^\s"'<>\\]+/gi
  );
  if (as24CdnMatches) {
    const upgraded = as24CdnMatches.map((img) =>
      img.replace(/\/[0-9]+x[0-9]+\.(webp|jpg|jpeg)/i, '/1280x960.webp')
    );
    draft.images = Array.from(new Set(upgraded));
  }

  // 2. Price
  const priceMatch =
    input.match(/€\s*([0-9]{1,3}(?:[.,][0-9]{3})+)/i) ||
    input.match(/([0-9]{1,3}(?:[.,][0-9]{3})+)\s*€/i) ||
    input.match(/€\s*([0-9]+)/i);
  if (priceMatch && priceMatch[1]) {
    const cleanNumber = parseInt(priceMatch[1].replace(/[.,-]/g, ''), 10);
    if (cleanNumber > 500 && cleanNumber < 1000000) {
      draft.price = cleanNumber;
    }
  }

  // 3. Mileage
  const kmMatch =
    input.match(/(?:Kilometerstand|Kilométrage|Mileage)[\s:]+([0-9.,]+)\s*km/i) ||
    input.match(/([0-9]{1,3}(?:[.,][0-9]{3})+)\s*km/i) ||
    input.match(/([0-9]+)\s*km/i);
  if (kmMatch && kmMatch[1]) {
    const cleanKm = parseInt(kmMatch[1].replace(/[.,]/g, ''), 10);
    if (cleanKm >= 0 && cleanKm < 900000) {
      draft.mileage = cleanKm;
    }
  }

  // 4. Year
  const yearMatch =
    input.match(/(?:Bouwjaar|Eerste inschrijving|Inschrijving|Année)[\s:]+(?:[0-9]{1,2}[\/-])?([12][0-9]{3})/i) ||
    input.match(/\b(0?[1-9]|1[0-2])\/(19\d\d|20[012]\d)\b/) ||
    input.match(/\b(19\d\d|20[012]\d)\b/);
  if (yearMatch) {
    const yrStr = yearMatch[2] || yearMatch[1];
    const yr = parseInt(yrStr, 10);
    if (yr >= 1990 && yr <= 2027) {
      draft.year = yr;
    }
  }

  // 5. Fuel, Transmission, Body
  draft.fuel = normalizeFuel(input);
  draft.transmission = normalizeTransmission(input);
  draft.bodyType = normalizeBodyType(input);

  // 6. Power
  const hpMatch =
    input.match(/([0-9]{2,4})\s*(?:pk|hp|ch|ps)\b/i) ||
    input.match(/Vermogen[\s:]+([0-9]{2,4})/i);
  if (hpMatch && hpMatch[1]) {
    const hp = parseInt(hpMatch[1], 10);
    if (hp > 40 && hp < 1500) {
      draft.powerHp = hp;
    }
  }

  // 7. Brand + model guess from matching line
  for (const b of COMMON_BRANDS) {
    const regex = new RegExp(`\\b${b}\\b`, 'i');
    if (regex.test(input)) {
      draft.brand = b;
      const lines = input.split('\n');
      const brandLine = lines.find((l) => regex.test(l) && l.trim().length < 90);
      if (brandLine) {
        const after = brandLine.replace(regex, '').trim();
        const words = after.split(/\s+/).filter(Boolean);
        if (words.length > 0) {
          draft.model = words.slice(0, 2).join(' ');
          draft.edition = words.slice(2, 6).join(' ');
        }
      }
      break;
    }
  }

  // 8. Price Type (BTW vs Marge)
  if (/btw aftrekbaar|vat deductible|mwst|tva déductible/i.test(input)) {
    draft.priceType = 'BTW Aftrekbaar';
  } else {
    draft.priceType = 'Marge';
  }

  // 9. Description
  const descLines = input
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 25 && !l.startsWith('http') && !l.includes('{'));
  if (descLines.length > 0) {
    draft.description = descLines.slice(0, 12).join('\n\n');
  }

  return draft;
}
