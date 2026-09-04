export type FuelType = 'Benzine' | 'Diesel' | 'Plug-in Hybride' | 'Elektrisch' | 'Mild Hybride';
export type TransmissionType = 'Automaat' | 'Manueel';
export type BodyType = 'SUV / 4x4' | 'Berline' | 'Coupé' | 'Break' | 'Camper';
export type Category = 'premium' | 'hybrid-electric' | 'export-handelaar' | 'all';

export interface Car {
  id: string;
  brand: string;
  model: string;
  edition?: string;
  year: number;
  mileage: number; // in km
  price: number; // in EUR
  monthlyPrice: number; // estimated leasing/financing per month
  priceType: 'Marge' | 'BTW Aftrekbaar' | 'Export';
  vatDeductible?: boolean;
  fuel: FuelType;
  transmission: TransmissionType;
  powerHp: number; // PK / HP
  engineSize?: string; // e.g. 3.0 V6, 4.0 V8
  color: string;
  interior: string;
  bodyType: BodyType;
  co2?: number; // g/km
  euroStandard?: string; // e.g. Euro 6d-ISC-FCM
  images: string[];
  featured?: boolean;
  category: Category;
  carPassId: string;
  warrantyMonths: number;
  highlightSpecs: string[];
  options: string[];
  description: string;
  status: 'available' | 'reserved' | 'sold';
}

export interface FilterState {
  searchQuery: string;
  brand: string;
  category: Category;
  fuel: string;
  transmission: string;
  bodyType: string;
  maxPrice: number;
  maxMileage: number;
  minYear: number;
  sortBy: 'price-asc' | 'price-desc' | 'year-desc' | 'mileage-asc' | 'featured';
}

export interface ValuationFormState {
  licensePlate: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  fuel: string;
  transmission: string;
  condition: 'uitstekend' | 'goed' | 'gebruikt' | 'schade';
  expectedPrice?: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
}

export interface TestDriveBooking {
  carId?: string;
  carTitle?: string;
  date: string;
  timeSlot: string;
  fullName: string;
  phone: string;
  email: string;
  drivingLicenseConfirmed: boolean;
  remarks?: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  carPurchased?: string;
  content: string;
  verified: boolean;
  source: 'Google Reviews' | 'Mobile.de' | 'AutoScout24';
}
