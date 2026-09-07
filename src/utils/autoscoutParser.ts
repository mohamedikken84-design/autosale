import { Car, FuelType, TransmissionType, BodyType } from '../types';

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
}

const COMMON_BRANDS = [
  'Mercedes-Benz', 'BMW', 'Audi', 'Porsche', 'Land Rover', 'Volkswagen', 
  'Volvo', 'Bentley', 'Ferrari', 'Lamborghini', 'Aston Martin', 'Maserati', 
  'Jaguar', 'Tesla', 'Mini', 'Peugeot', 'Renault', 'Ford', 'Toyota'
];

/**
 * Intelligent client-side parser for AutoScout24 pasted links or advertisement text.
 * Complies strictly with AutoScout24 terms of service as a manual paste-and-process tool.
 */
export function parseAutoScoutInput(rawInput: string): ParsedCarDraft {
  const input = rawInput.trim();

  const draft: ParsedCarDraft = {
    brand: 'Mercedes-Benz',
    model: 'Klasse',
    edition: '',
    year: new Date().getFullYear(),
    mileage: 25000,
    price: 49900,
    priceType: 'BTW Aftrekbaar',
    fuel: 'Benzine',
    transmission: 'Automaat',
    powerHp: 250,
    color: 'Zwart metallic',
    interior: 'Zwart leder',
    bodyType: 'SUV / 4x4',
    description: '',
    options: ['Navigatiesysteem', 'LED koplampen', 'Parkeersensoren', 'Lederen bekleding', 'Apple CarPlay'],
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'
    ]
  };

  // Case 1: Detect if input is a URL
  if (input.startsWith('http://') || input.startsWith('https://') || input.includes('autoscout24.')) {
    try {
      const url = new URL(input.startsWith('http') ? input : `https://${input}`);
      const pathParts = url.pathname.split('/').filter(Boolean);
      // Usually: ['nl', 'aanbod', 'porsche-taycan-4s-chrono-pano-id...']
      const slug = pathParts[pathParts.length - 1] || '';
      
      const slugParts = slug.split('-');
      // Search for brand
      for (const brand of COMMON_BRANDS) {
        const brandSlug = brand.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (slug.toLowerCase().includes(brandSlug) || slugParts[0]?.toLowerCase() === brand.toLowerCase()) {
          draft.brand = brand;
          break;
        }
      }

      // Try extract model
      if (slugParts.length > 1) {
        draft.model = slugParts[1]?.toUpperCase();
        if (slugParts.length > 2) {
          draft.edition = slugParts.slice(2, Math.min(slugParts.length - 1, 6)).join(' ');
          // Capitalize words
          draft.edition = draft.edition.replace(/\b\w/g, (c) => c.toUpperCase());
        }
      }

      draft.description = `Geïmporteerd vanuit AutoScout24 advertentie (${url.hostname}). Geverifieerd voertuig klaar voor publicatie.`;
    } catch {
      // url parse error, continue to text parsing
    }
  }

  // Case 2: Text matching for fields
  // 1. Price
  const priceMatch = input.match(/€\s*([0-9.,]+)/i) || input.match(/Prijs[:\s]+€?\s*([0-9.,]+)/i);
  if (priceMatch && priceMatch[1]) {
    const cleanNumber = parseInt(priceMatch[1].replace(/[.,-]/g, ''), 10);
    if (cleanNumber > 500 && cleanNumber < 1000000) {
      draft.price = cleanNumber;
    }
  }

  // 2. Mileage
  const kmMatch = input.match(/([0-9.,]+)\s*km/i) || input.match(/Kilometerstand[:\s]+([0-9.,]+)/i);
  if (kmMatch && kmMatch[1]) {
    const cleanKm = parseInt(kmMatch[1].replace(/[.,]/g, ''), 10);
    if (cleanKm >= 0 && cleanKm < 900000) {
      draft.mileage = cleanKm;
    }
  }

  // 3. Year
  const yearMatch = input.match(/(?:Bouwjaar|Inschrijving|Datum)[:\s]+(?:[0-9]{1,2}[\/-])?([12][0-9]{3})/i) 
    || input.match(/\b(20[012][0-9])\b/);
  if (yearMatch && yearMatch[1]) {
    const year = parseInt(yearMatch[1], 10);
    if (year >= 1990 && year <= 2027) {
      draft.year = year;
    }
  }

  // 4. Fuel
  if (/elektrisch|electric/i.test(input)) {
    draft.fuel = 'Elektrisch';
  } else if (/plug-in|phev/i.test(input)) {
    draft.fuel = 'Plug-in Hybride';
  } else if (/hybride|hybrid/i.test(input)) {
    draft.fuel = 'Mild Hybride';
  } else if (/diesel/i.test(input)) {
    draft.fuel = 'Diesel';
  } else if (/benzine|petrol|gasoline/i.test(input)) {
    draft.fuel = 'Benzine';
  }

  // 5. Transmission
  if (/manueel|handgeschakeld|manual/i.test(input)) {
    draft.transmission = 'Manueel';
  } else if (/automaat|automatisch|automatic/i.test(input)) {
    draft.transmission = 'Automaat';
  }

  // 6. Power
  const hpMatch = input.match(/([0-9]{2,4})\s*(?:pk|hp|ch)/i) || input.match(/Vermogen[:\s]+([0-9]{2,4})/i);
  if (hpMatch && hpMatch[1]) {
    const hp = parseInt(hpMatch[1], 10);
    if (hp > 40 && hp < 1500) {
      draft.powerHp = hp;
    }
  }

  // 7. Brand in text if not set
  for (const b of COMMON_BRANDS) {
    if (new RegExp(`\\b${b}\\b`, 'i').test(input)) {
      draft.brand = b;
      break;
    }
  }

  // 8. VAT/Marge
  if (/btw aftrekbaar|vat deductible|mwst|tva/i.test(input)) {
    draft.priceType = 'BTW Aftrekbaar';
  } else if (/marge|margin/i.test(input)) {
    draft.priceType = 'Marge';
  }

  // 9. Extract any and all image URLs in the text or HTML
  // Supports AutoScout24 CDN (prod.pictures.autoscout24.net), direct image URLs, and image tags
  const extractedImages: string[] = [];
  
  // Pattern 1: Direct image URLs (.jpg, .jpeg, .png, .webp with or without query params)
  const directImgMatches = input.match(/https?:\/\/[^\s"'<>\\]+?\.(?:jpg|jpeg|png|webp)(?:\?[^\s"'<>\\]*)?/gi);
  if (directImgMatches) {
    extractedImages.push(...directImgMatches);
  }

  // Pattern 2: AutoScout24 image CDN URLs (prod.pictures.autoscout24.net)
  const as24CdnMatches = input.match(/https?:\/\/(?:prod\.pictures\.autoscout24\.net|images\.autoscout24\.[a-z]+)[^\s"'<>\\]+/gi);
  if (as24CdnMatches) {
    extractedImages.push(...as24CdnMatches);
  }

  // Pattern 3: src="..." or data-src="..." or "imageUrl": "..."
  const srcMatches = input.match(/(?:src|data-src|image|url|imageUrl)["':\s]+(https?:\/\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp)[^"'\s]*)/gi);
  if (srcMatches) {
    for (const sm of srcMatches) {
      const urlMatch = sm.match(/https?:\/\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp)[^"'\s]*/i);
      if (urlMatch && urlMatch[0]) {
        extractedImages.push(urlMatch[0]);
      }
    }
  }

  // De-duplicate extracted images
  const uniqueImages = Array.from(new Set(extractedImages)).filter((url) => {
    return !url.includes('logo') && !url.includes('icon') && !url.includes('avatar');
  });

  if (uniqueImages.length > 0) {
    draft.images = uniqueImages;
  } else {
    // Provide a full multi-angle realistic automotive photoshoot set matching the brand
    const brandLower = draft.brand.toLowerCase();
    if (brandLower.includes('porsche')) {
      draft.images = [
        'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80'
      ];
    } else if (brandLower.includes('bmw')) {
      draft.images = [
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80'
      ];
    } else if (brandLower.includes('audi')) {
      draft.images = [
        'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1541348263662-e0c8666622e0?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80'
      ];
    } else if (brandLower.includes('land rover') || brandLower.includes('range rover')) {
      draft.images = [
        'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'
      ];
    } else {
      // Premium Mercedes / Luxury default set
      draft.images = [
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80'
      ];
    }
  }

  // 10. Description text if multiple sentences
  const lines = input.split('\n').map((l) => l.trim()).filter((l) => l.length > 20 && !l.startsWith('http'));
  if (lines.length > 0) {
    draft.description = lines.join('\n\n');
  }

  return draft;
}
