/**
 * Shared AutoScout24 HTML & Structured Data Parser
 * Used by client, Express server, and Netlify Functions.
 */

export interface ScrapedAutoScoutData {
  brand: string;
  model: string;
  edition: string;
  price: number;
  priceType: 'BTW Aftrekbaar' | 'Marge';
  year: number;
  mileage: number;
  fuel: string;
  transmission: string;
  powerHp: number;
  engineSize?: string;
  co2?: number;
  euroStandard?: string;
  color: string;
  interior: string;
  bodyType: string;
  images: string[];
  options: string[];
  description: string;
  carPassId: string;
  sourceUrl: string;
}

export function decodeHtmlEntities(str: string): string {
  if (!str) return '';
  return str
    .replace(/<br\s*[\/]?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<\/?[^>]+(>|$)/g, '')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&eacute;/g, 'é')
    .replace(/&egrave;/g, 'è')
    .replace(/&agrave;/g, 'à')
    .replace(/&euro;/g, '€')
    .replace(/&nbsp;/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function formatOptionName(raw: string): string {
  const cleaned = raw.trim();
  if (!cleaned) return '';
  // Convert snake_case or kebab-case IDs if no formatted label was present
  if (/^[a-z0-9_-]+$/.test(cleaned) && (cleaned.includes('_') || cleaned.includes('-'))) {
    return cleaned
      .replace(/[_-]+/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }
  return cleaned;
}

export function normalizeFuel(fuelStr: string): string {
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

export function normalizeTransmission(transStr: string): string {
  const t = (transStr || '').toLowerCase();
  if (t.includes('man') || t.includes('hand') || t.includes('schalt') || t.includes('boîte manuelle')) {
    return 'Manueel';
  }
  return 'Automaat';
}

export function normalizeBodyType(bodyStr: string): string {
  const b = (bodyStr || '').toLowerCase();
  if (b.includes('suv') || b.includes('terrein') || b.includes('4x4') || b.includes('gelände') || b.includes('off-road')) {
    return 'SUV / 4x4';
  }
  if (b.includes('break') || b.includes('station') || b.includes('kombi') || b.includes('touring') || b.includes('avant')) {
    return 'Break';
  }
  if (b.includes('cabrio') || b.includes('convertible') || b.includes('roadster')) {
    return 'Cabriolet';
  }
  if (b.includes('coup')) return 'Coupé';
  if (b.includes('sport')) return 'Sportwagen';
  if (b.includes('monovolume') || b.includes('mpv') || b.includes('bestel') || b.includes('camper') || b.includes('van')) {
    return 'Camper';
  }
  return 'Berline';
}

function cleanAndUpgradeImages(rawImages: string[]): string[] {
  const byBaseKey = new Map<string, string>();

  for (const raw of rawImages) {
    if (typeof raw !== 'string') continue;
    const url = raw.trim().replace(/\\u002F/g, '/');
    if (!url.startsWith('http')) continue;

    const lower = url.toLowerCase();
    if (
      lower.includes('logo') ||
      lower.includes('icon') ||
      lower.includes('avatar') ||
      lower.includes('badge') ||
      lower.includes('dealer') ||
      lower.includes('static.') ||
      lower.endsWith('.svg')
    ) {
      continue;
    }

    // Upgrade AutoScout24 resolution to crisp 1280x960.webp
    const upgraded = url.replace(/\/[0-9]{2,4}x[0-9]{2,4}\.(webp|jpg|jpeg)/i, '/1280x960.webp');

    // Deduplicate identical photos that appeared in multiple sizes
    const baseKey = upgraded
      .replace(/\/1280x960\.(webp|jpg|jpeg).*$/i, '')
      .split('?')[0];

    if (!byBaseKey.has(baseKey)) {
      byBaseKey.set(baseKey, upgraded);
    }
  }

  return Array.from(byBaseKey.values());
}

function findListingDetails(parsedData: any): any | null {
  if (!parsedData) return null;
  if (parsedData?.props?.pageProps?.listingDetails) {
    return parsedData.props.pageProps.listingDetails;
  }
  if (parsedData?.props?.pageProps?.listing) {
    return parsedData.props.pageProps.listing;
  }
  // Check dehydrated React Query state if present
  const queries = parsedData?.props?.pageProps?.dehydratedState?.queries;
  if (Array.isArray(queries)) {
    for (const q of queries) {
      const data = q?.state?.data;
      if (data && (data.vehicle || data.prices) && data.images) {
        return data;
      }
    }
  }
  return null;
}

export function parseAutoScoutHtml(html: string, url: string = ''): ScrapedAutoScoutData {
  if (!html || html.length < 20) {
    throw new Error('Geen geldige HTML data ontvangen.');
  }

  // METHOD 1: Parse __NEXT_DATA__
  const nextDataMatch = html.match(/<script id="__NEXT_DATA__"[^>]*>(.*?)<\/script>/s);
  if (nextDataMatch) {
    try {
      const parsedData = JSON.parse(nextDataMatch[1]);
      const ld = findListingDetails(parsedData);

      if (ld && (ld.vehicle || ld.prices)) {
        const v = ld.vehicle || {};
        const prices = ld.prices || {};

        let rawImages: string[] = [];
        if (Array.isArray(ld.images)) {
          rawImages = ld.images.map((img: any) =>
            typeof img === 'string' ? img : img?.url || img?.src || ''
          );
        }
        // Fallback: also capture any listing-images URLs in JSON if ld.images was nested
        if (rawImages.length === 0) {
          const cdnMatches = nextDataMatch[1].match(/https:\\?\/\\?\/prod\.pictures\.autoscout24\.net\\?\/listing-images\\?\/[^\s"'<>]+/g);
          if (cdnMatches) rawImages = cdnMatches;
        }

        const realImages = cleanAndUpgradeImages(rawImages);

        const optionsList: string[] = [];
        const eq = v.equipment || {};
        for (const catKey of Object.keys(eq)) {
          const items = eq[catKey];
          if (Array.isArray(items)) {
            for (const item of items) {
              const label =
                typeof item === 'string'
                  ? item
                  : item?.formatted || item?.name || item?.label || item?.id;
              if (label && typeof label === 'string') {
                const formatted = formatOptionName(label);
                if (formatted) optionsList.push(formatted);
              }
            }
          }
        }

        const rawDesc = v.description || ld.description || '';
        const cleanedDesc = decodeHtmlEntities(rawDesc);

        let yearNum = new Date().getFullYear();
        if (v.firstRegistrationDateRaw) {
          yearNum = parseInt(String(v.firstRegistrationDateRaw).slice(0, 4), 10) || yearNum;
        } else if (v.firstRegistrationDate) {
          const parts = String(v.firstRegistrationDate).split(/[-/]/);
          const candidate = parts.find((p: string) => p.length === 4);
          if (candidate) yearNum = parseInt(candidate, 10);
        }

        const priceNum =
          Number(prices.public?.priceRaw) ||
          Number(prices.dealer?.priceRaw) ||
          Number(String(prices.public?.price || '').replace(/[^0-9]/g, '')) ||
          0;
        const isTaxDeductible = !!prices.public?.taxDeductible || !!prices.public?.vatDeductible;

        const powerHp =
          Number(v.rawPowerInHp) ||
          (v.powerInHp ? parseInt(String(v.powerInHp).replace(/[^0-9]/g, ''), 10) : 0) ||
          (v.rawPowerInKw ? Math.round(Number(v.rawPowerInKw) * 1.35962) : 150);

        const engineSize = v.cubicCapacity
          ? `${(Number(v.cubicCapacity) / 1000).toFixed(1)}L`
          : v.displacement || undefined;

        const co2Val = v.co2emissionInGramPerKm?.raw || v.co2EmissionRaw;
        const co2 = co2Val ? parseInt(String(co2Val), 10) : undefined;

        return {
          brand: v.make || v.rawData?.classification?.make?.formatted || 'Onbekend',
          model: v.model || v.rawData?.classification?.model?.formatted || '',
          edition: v.modelVersionInput || v.motorTypeName || '',
          price: priceNum,
          priceType: isTaxDeductible ? 'BTW Aftrekbaar' : 'Marge',
          year: yearNum,
          mileage:
            Number(v.mileageInKmRaw) ||
            (v.mileageInKm ? parseInt(String(v.mileageInKm).replace(/[^0-9]/g, ''), 10) : 0),
          fuel: normalizeFuel(v.fuelCategory?.formatted || v.primaryFuel?.formatted || ''),
          transmission: normalizeTransmission(v.transmissionType || ''),
          powerHp,
          engineSize,
          co2: isNaN(co2 as number) ? undefined : co2,
          euroStandard: v.emissionStandard || undefined,
          color: v.bodyColor || v.bodyColorRaw || 'Zwart metallic',
          interior: v.upholstery || v.interiorColor || 'Leder',
          bodyType: normalizeBodyType(v.bodyType || ''),
          images: realImages,
          options: Array.from(new Set(optionsList)),
          description: cleanedDesc,
          carPassId:
            v.rawData?.condition?.carpassMileageUrl ||
            (ld.id ? `AS-${String(ld.id).slice(0, 8).toUpperCase()}` : ''),
          sourceUrl: url || ld.webPage || '',
        };
      }
    } catch (err) {
      console.warn('Failed parsing __NEXT_DATA__ JSON:', err);
    }
  }

  // METHOD 2: Fallback to JSON-LD Schema
  const jsonLdMatches = html.matchAll(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs);
  for (const m of jsonLdMatches) {
    try {
      const parsed = JSON.parse(m[1]);
      const obj = Array.isArray(parsed) ? parsed[0] : parsed;
      if (obj && (obj['@type'] === 'Car' || obj['@type'] === 'Vehicle' || obj['@type'] === 'Product')) {
        let rawImages: string[] = [];
        if (Array.isArray(obj.image)) {
          rawImages = obj.image.filter((img: string) => typeof img === 'string');
        } else if (typeof obj.image === 'string') {
          rawImages = [obj.image];
        }

        // Also grab any listing images found directly in HTML
        const htmlListingImgs =
          html.match(/https:\/\/prod\.pictures\.autoscout24\.net\/listing-images\/[^\s"'<>]+/g) || [];
        const realImages = cleanAndUpgradeImages([...rawImages, ...htmlListingImgs]);

        const price =
          typeof obj.offers?.price === 'number'
            ? obj.offers.price
            : parseInt(String(obj.offers?.price || '0').replace(/[^0-9]/g, ''), 10);
        const mileage = parseInt(String(obj.mileageFromOdometer?.value || '0').replace(/[^0-9]/g, ''), 10);
        const year = parseInt(String(obj.productionDate || obj.modelDate || new Date().getFullYear()), 10);

        return {
          brand: obj.brand?.name || obj.brand || 'Onbekend',
          model: obj.model || obj.name || '',
          edition: obj.vehicleConfiguration || '',
          price: price || 0,
          priceType: /btw aftrekbaar|vat deductible|tva/i.test(html) ? 'BTW Aftrekbaar' : 'Marge',
          year: year || new Date().getFullYear(),
          mileage: mileage || 0,
          fuel: normalizeFuel(obj.fuelType || ''),
          transmission: normalizeTransmission(obj.vehicleTransmission || ''),
          powerHp: 150,
          color: obj.color || 'Zwart metallic',
          interior: 'Leder',
          bodyType: normalizeBodyType(obj.bodyType || ''),
          images: realImages,
          options: [],
          description: decodeHtmlEntities(obj.description || ''),
          carPassId: '',
          sourceUrl: url,
        };
      }
    } catch {
      // continue
    }
  }

  // METHOD 3: HTML Regex Fallback
  const regexImages = cleanAndUpgradeImages(
    html.match(/https:\/\/prod\.pictures\.autoscout24\.net\/listing-images\/[^\s"'<>]+/g) || []
  );

  const priceMatch = html.match(/€\s*([0-9.,]+)/) || html.match(/([0-9.,]+)\s*€/);
  const price = priceMatch ? parseInt(priceMatch[1].replace(/[^0-9]/g, ''), 10) : 0;

  const kmMatch = html.match(/([0-9.,]+)\s*km/i);
  const mileage = kmMatch ? parseInt(kmMatch[1].replace(/[^0-9]/g, ''), 10) : 0;

  const yearMatch = html.match(/\b(19\d\d|20[012]\d)\b/);
  const year = yearMatch ? parseInt(yearMatch[1], 10) : new Date().getFullYear();

  const titleMatch = html.match(/<h1[^>]*>(.*?)<\/h1>/s) || html.match(/<title>(.*?)<\/title>/s);
  const rawTitle = titleMatch ? decodeHtmlEntities(titleMatch[1]) : '';
  const titleWords = rawTitle.replace(/\s*-\s*AutoScout24.*$/i, '').split(/\s+/).filter(Boolean);
  const brand = titleWords[0] || '';
  const model = titleWords.slice(1, 3).join(' ') || '';

  return {
    brand,
    model,
    edition: titleWords.slice(3, 8).join(' '),
    price,
    priceType: /btw aftrekbaar|vat deductible|tva/i.test(html) ? 'BTW Aftrekbaar' : 'Marge',
    year,
    mileage,
    fuel: normalizeFuel(html),
    transmission: normalizeTransmission(html),
    powerHp: 150,
    color: 'Zwart metallic',
    interior: 'Leder',
    bodyType: normalizeBodyType(html),
    images: regexImages,
    options: [],
    description: decodeHtmlEntities(rawTitle),
    carPassId: '',
    sourceUrl: url,
  };
}
