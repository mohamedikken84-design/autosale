import { FuelType, TransmissionType, BodyType } from '../types';

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
}

const COMMON_BRANDS = [
  'Mercedes-Benz', 'BMW', 'Audi', 'Porsche', 'Volkswagen', 'Volvo',
  'Land Rover', 'Range Rover', 'Jaguar', 'Ferrari', 'Maserati', 'Bentley',
  'Lamborghini', 'Aston Martin', 'Tesla', 'Alfa Romeo', 'Mini', 'Lexus',
  'Ford', 'Peugeot', 'Renault', 'Toyota', 'Hyundai', 'Kia', 'Skoda', 'Seat', 'Cupra'
];

function decodeHtmlEntities(str: string): string {
  if (!str) return '';
  return str
    .replace(/<br\s*[\/]?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/?[^>]+(>|$)/g, '')
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&eacute;/g, 'é')
    .replace(/&egrave;/g, 'è')
    .replace(/&agrave;/g, 'à')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

function normalizeFuel(fuelStr: string): FuelType {
  const f = (fuelStr || '').toLowerCase();
  if (f.includes('diesel')) return 'Diesel';
  if (f.includes('plug-in') || f.includes('phev')) return 'Plug-in Hybride';
  if (f.includes('elektrisch') || f.includes('electric') || f.includes('électrique')) return 'Elektrisch';
  if (f.includes('hybride') || f.includes('hybrid')) return 'Mild Hybride';
  return 'Benzine';
}

function normalizeTransmission(transStr: string): TransmissionType {
  const t = (transStr || '').toLowerCase();
  if (t.includes('man') || t.includes('hand')) return 'Manueel';
  return 'Automaat';
}

function normalizeBodyType(bodyStr: string): BodyType {
  const b = (bodyStr || '').toLowerCase();
  if (b.includes('suv') || b.includes('terrein') || b.includes('4x4')) return 'SUV / 4x4';
  if (b.includes('break') || b.includes('station') || b.includes('kombi') || b.includes('touring') || b.includes('avant')) return 'Break';
  if (b.includes('coup') || b.includes('cabrio')) return 'Coupé';
  if (b.includes('monovolume') || b.includes('mpv') || b.includes('bestel') || b.includes('camper')) return 'Camper';
  return 'Berline';
}

/**
 * Primary Real AutoScout24 Listing Scraper (Async)
 * Direct API call to backend scraper which fetches the exact advertisement HTML,
 * parses the authoritative __NEXT_DATA__ JSON payload and delivers the exact
 * car specs, real ad description, and genuine listing photos from AutoScout24.
 * 
 * STRICT MANDATE: NO stock photos. Real photos from the ad only!
 */
export async function fetchAndParseAutoScout(input: string): Promise<ParsedCarDraft> {
  const trimmed = input.trim();

  // Check if input contains a URL
  const urlMatch = trimmed.match(/https?:\/\/[^\s"'<>]+/i);
  const targetUrl = urlMatch ? urlMatch[0] : (trimmed.includes('autoscout24.') ? `https://${trimmed}` : '');

  // 1. Try server-side live scrape endpoint
  try {
    const res = await fetch('/api/scrape-autoscout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: targetUrl,
        rawText: trimmed.length > 300 ? trimmed : undefined
      })
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        const d = json.data;
        return {
          brand: d.brand || 'Onbekend',
          model: d.model || '',
          edition: d.edition || '',
          year: Number(d.year) || new Date().getFullYear(),
          mileage: Number(d.mileage) || 0,
          price: Number(d.price) || 0,
          priceType: d.priceType === 'BTW Aftrekbaar' ? 'BTW Aftrekbaar' : 'Marge',
          fuel: normalizeFuel(d.fuel),
          transmission: normalizeTransmission(d.transmission),
          powerHp: Number(d.powerHp) || 150,
          color: d.color || 'Zwart metallic',
          interior: d.interior || 'Leder',
          bodyType: normalizeBodyType(d.bodyType),
          description: d.description || '',
          options: Array.isArray(d.options) ? d.options : [],
          images: Array.isArray(d.images) ? d.images : [],
          carPassId: d.carPassId || '',
          sourceUrl: d.sourceUrl || targetUrl
        };
      }
    }
  } catch (apiErr) {
    console.warn('Backend scrape API unreachable, falling back to client-side parsing:', apiErr);
  }

  // 2. Client-side fallback parsing (in case of raw HTML pasted or API fallback)
  return parseAutoScoutInput(trimmed);
}

/**
 * Client-Side AutoScout24 Parser
 * Analyzes pasted HTML or text from an AutoScout24 advertisement.
 * Extracts:
 * - __NEXT_DATA__ JSON if present in pasted HTML
 * - Genuine prod.pictures.autoscout24.net image URLs
 * - Actual price, km, year, brand, model, description
 * 
 * STRICT MANDATE: NO stock photos.
 */
export function parseAutoScoutInput(rawInput: string): ParsedCarDraft {
  const input = rawInput.trim();

  // If input contains __NEXT_DATA__, parse it directly!
  const nextDataMatch = input.match(/<script id="__NEXT_DATA__"[^>]*>(.*?)<\/script>/s);
  if (nextDataMatch) {
    try {
      const parsedData = JSON.parse(nextDataMatch[1]);
      const ld = parsedData?.props?.pageProps?.listingDetails;
      if (ld && (ld.vehicle || ld.prices)) {
        const v = ld.vehicle || {};
        const prices = ld.prices || {};

        let realImages: string[] = [];
        if (Array.isArray(ld.images)) {
          realImages = ld.images
            .filter((img: any) => typeof img === 'string' && img.includes('prod.pictures.autoscout24.net'))
            .map((img: string) => img.replace(/\/[0-9]+x[0-9]+\.(webp|jpg|jpeg)/i, '/1280x960.webp'));
        }

        realImages = Array.from(new Set(realImages));

        const optionsList: string[] = [];
        const eq = v.equipment || {};
        for (const catKey of Object.keys(eq)) {
          const items = eq[catKey];
          if (Array.isArray(items)) {
            for (const item of items) {
              const name = typeof item === 'string' ? item : (item.id || item.formatted || item.name);
              if (name && typeof name === 'string' && name.trim()) {
                optionsList.push(name.trim());
              }
            }
          }
        }

        let yearNum = new Date().getFullYear();
        if (v.firstRegistrationDateRaw) {
          yearNum = parseInt(v.firstRegistrationDateRaw.slice(0, 4), 10) || yearNum;
        } else if (v.firstRegistrationDate) {
          const parts = v.firstRegistrationDate.split(/[-/]/);
          const candidate = parts.find((p: string) => p.length === 4);
          if (candidate) yearNum = parseInt(candidate, 10);
        }

        return {
          brand: v.make || 'Mercedes-Benz',
          model: v.model || '',
          edition: v.modelVersionInput || '',
          price: prices.public?.priceRaw || 0,
          priceType: prices.public?.taxDeductible ? 'BTW Aftrekbaar' : 'Marge',
          year: yearNum,
          mileage: v.mileageInKmRaw || 0,
          fuel: normalizeFuel(v.fuelCategory?.formatted || v.primaryFuel?.formatted || ''),
          transmission: normalizeTransmission(v.transmissionType || ''),
          powerHp: v.rawPowerInHp || 150,
          color: v.bodyColor || 'Zwart',
          interior: v.upholstery || 'Leder',
          bodyType: normalizeBodyType(v.bodyType || ''),
          images: realImages,
          options: Array.from(new Set(optionsList)),
          description: decodeHtmlEntities(v.description || ld.description || ''),
          carPassId: v.rawData?.condition?.carpassMileageUrl || ''
        };
      }
    } catch {
      // Continue to regex
    }
  }

  // Regex fallback:
  const draft: ParsedCarDraft = {
    brand: 'Mercedes-Benz',
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
    images: []
  };

  // 1. Extract genuine AutoScout24 images
  const as24CdnMatches = input.match(/https?:\/\/(?:prod\.pictures\.autoscout24\.net|images\.autoscout24\.[a-z]+)[^\s"'<>\\]+/gi);
  if (as24CdnMatches) {
    const upgraded = as24CdnMatches.map((img) => 
      img.replace(/\/[0-9]+x[0-9]+\.(webp|jpg|jpeg)/i, '/1280x960.webp')
    );
    draft.images = Array.from(new Set(upgraded));
  } else {
    // Check for any direct image URLs in the text
    const directImgMatches = input.match(/https?:\/\/[^\s"'<>\\]+?\.(?:jpg|jpeg|png|webp)(?:\?[^\s"'<>\\]*)?/gi);
    if (directImgMatches) {
      draft.images = Array.from(new Set(directImgMatches)).filter(
        (url) => !url.includes('logo') && !url.includes('icon') && !url.includes('avatar')
      );
    }
  }

  // 2. Price
  const priceMatch = input.match(/€\s*([0-9.,]+)/i) || input.match(/([0-9.,]+)\s*€/i);
  if (priceMatch && priceMatch[1]) {
    const cleanNumber = parseInt(priceMatch[1].replace(/[.,-]/g, ''), 10);
    if (cleanNumber > 500 && cleanNumber < 1000000) {
      draft.price = cleanNumber;
    }
  }

  // 3. Mileage
  const kmMatch = input.match(/([0-9.,]+)\s*km/i) || input.match(/Kilometerstand[:\s]+([0-9.,]+)/i);
  if (kmMatch && kmMatch[1]) {
    const cleanKm = parseInt(kmMatch[1].replace(/[.,]/g, ''), 10);
    if (cleanKm >= 0 && cleanKm < 900000) {
      draft.mileage = cleanKm;
    }
  }

  // 4. Year
  const yearMatch = input.match(/(?:Bouwjaar|Inschrijving|Datum)[:\s]+(?:[0-9]{1,2}[\/-])?([12][0-9]{3})/i) 
    || input.match(/\b(19\d\d|20[012][0-9])\b/);
  if (yearMatch && yearMatch[1]) {
    const yr = parseInt(yearMatch[1], 10);
    if (yr >= 1990 && yr <= 2027) {
      draft.year = yr;
    }
  }

  // 5. Fuel
  draft.fuel = normalizeFuel(input);

  // 6. Transmission
  draft.transmission = normalizeTransmission(input);

  // 7. Power
  const hpMatch = input.match(/([0-9]{2,4})\s*(?:pk|hp|ch)/i) || input.match(/Vermogen[:\s]+([0-9]{2,4})/i);
  if (hpMatch && hpMatch[1]) {
    const hp = parseInt(hpMatch[1], 10);
    if (hp > 40 && hp < 1500) {
      draft.powerHp = hp;
    }
  }

  // 8. Brand
  for (const b of COMMON_BRANDS) {
    if (new RegExp(`\\b${b}\\b`, 'i').test(input)) {
      draft.brand = b;
      break;
    }
  }

  // 9. Price Type (BTW vs Marge)
  if (/btw aftrekbaar|vat deductible|mwst|tva/i.test(input)) {
    draft.priceType = 'BTW Aftrekbaar';
  } else {
    draft.priceType = 'Marge';
  }

  // 10. Title / Model extraction if URL or header present
  const titleMatch = input.match(/<h1[^>]*>(.*?)<\/h1>/s) || input.match(/<title>(.*?)<\/title>/s);
  if (titleMatch) {
    const cleanedTitle = decodeHtmlEntities(titleMatch[1]);
    const words = cleanedTitle.split(/\s+/).filter(Boolean);
    if (words.length > 1) {
      draft.model = words.slice(1, 3).join(' ');
      draft.edition = words.slice(3, 8).join(' ');
    }
  }

  // Description
  const lines = input.split('\n').map((l) => l.trim()).filter((l) => l.length > 20 && !l.startsWith('http') && !l.includes('{'));
  if (lines.length > 0) {
    draft.description = lines.join('\n\n');
  }

  return draft;
}
