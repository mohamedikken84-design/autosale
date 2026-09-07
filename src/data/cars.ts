import { Car } from '../types';

/**
 * Auto Sale NV - Live Car Database
 * Per user specification: All previous car listings have been cleared.
 * Database starts completely clean & empty.
 * Cars can be added via the Dealer Dashboard or imported via AutoScout24.
 */
export const CARS_DATA: Car[] = [];

/**
 * Sample cars that can be loaded in 1-click from the Dealer Dashboard or from
 * the empty inventory state to preview the showroom filled with cars.
 */
export const SAMPLE_CARS_FOR_TESTING: Car[] = [
  {
    id: 'sample-car-1',
    brand: 'Porsche',
    model: 'Taycan 4S',
    edition: 'Performance Battery Plus • Sport Chrono • Panoramadak',
    year: 2023,
    mileage: 18500,
    price: 89900,
    monthlyPrice: 980,
    priceType: 'BTW Aftrekbaar',
    vatDeductible: true,
    fuel: 'Elektrisch',
    transmission: 'Automaat',
    powerHp: 530,
    color: 'Carrara White Metallic',
    interior: 'Zwart Volleder met contrasterende stiksels',
    bodyType: 'Berline',
    co2: 0,
    euroStandard: 'Euro 6',
    images: [
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=k1tU_0N3XmE',
    licensePlate: '2-XYZ-456',
    featured: true,
    category: 'hybrid-electric',
    carPassId: 'CP-SAMPLE-01',
    warrantyMonths: 24,
    highlightSpecs: ['530 PK Elektromotor', '504 km WLTP bereik', 'Luchtvering PASM', 'Sport Chrono Pakket'],
    options: [
      'Porsche Surface Coated Brake (PSCB)',
      'Panoramisch vast glazen dak',
      'Adaptieve Sportstoelen Plus 18-voudig',
      'BOSE Surround Sound System',
      'Warmtepomp & snellader 270 kW'
    ],
    description: 'Schitterende Porsche Taycan 4S in nieuwstaat. 100% BTW aftrekbaar voor zelfstandigen en vennootschappen. Volledige officiële Porsche historiek en Car-Pass attest.',
    status: 'available',
    viewsCount: 142
  },
  {
    id: 'sample-car-2',
    brand: 'Mercedes-Benz',
    model: 'G 63 AMG',
    edition: 'V8 Biturbo • Night Package • Burmester 3D',
    year: 2022,
    mileage: 32000,
    price: 169900,
    monthlyPrice: 1850,
    priceType: 'BTW Aftrekbaar',
    vatDeductible: true,
    fuel: 'Benzine',
    transmission: 'Automaat',
    powerHp: 585,
    color: 'Obsidian Black Metallic',
    interior: 'Designo Nappa Leder Zwart/Rood',
    bodyType: 'SUV / 4x4',
    co2: 335,
    euroStandard: 'Euro 6d',
    images: [
      'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    category: 'premium',
    carPassId: 'CP-SAMPLE-02',
    warrantyMonths: 12,
    highlightSpecs: ['4.0L V8 Biturbo 585 PK', 'AMG Performance Uitlaatsysteem', '22 inch AMG Gesmede Velgen', '360° Camera'],
    options: [
      'AMG Night Pakket II met verduisterde elementen',
      'Burmester Surround Sound Systeem',
      'Schuifdak elektrisch glazen uitvoering',
      'Multi-contour stoelen met massagefunctie'
    ],
    description: 'Iconische Mercedes-Benz G63 AMG. In onberispelijke staat met complete dealer-onderhoudshistoriek. Officiële Car-Pass en blanco keuring.',
    status: 'available',
    viewsCount: 289
  },
  {
    id: 'sample-car-3',
    brand: 'BMW',
    model: 'M4 Competition',
    edition: 'xDrive M-Steptronic • Carbon Pack • Harman Kardon',
    year: 2023,
    mileage: 14200,
    price: 84900,
    monthlyPrice: 920,
    priceType: 'Marge',
    vatDeductible: false,
    fuel: 'Benzine',
    transmission: 'Automaat',
    powerHp: 510,
    color: 'Isle of Man Green Metallic',
    interior: 'Merino Leder Kyalami Oranje/Zwart',
    bodyType: 'Coupé',
    co2: 228,
    euroStandard: 'Euro 6d',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    category: 'premium',
    carPassId: 'CP-SAMPLE-03',
    warrantyMonths: 24,
    highlightSpecs: ['510 PK TwinPower Turbo', 'M xDrive Vierwielaandrijving', 'M Carbon Kuipstoelen', 'Laserlight'],
    options: [
      'M Carbon Exterieur Pakket',
      'Head-Up Display met M weergave',
      'Driving Assistant Professional',
      'Harman Kardon Surround Sound'
    ],
    description: 'Verbluffende BMW M4 Competition Coupe in het zeldzame Isle of Man Green. Belgische wagen, 1e eigenaar, schadevrij met Car-Pass.',
    status: 'available',
    viewsCount: 310
  },
  {
    id: 'sample-car-4',
    brand: 'Audi',
    model: 'RS6 Avant',
    edition: 'Dynamic Plus • RS Sportuitlaat • Panoramadak',
    year: 2022,
    mileage: 29500,
    price: 118900,
    monthlyPrice: 1290,
    priceType: 'BTW Aftrekbaar',
    vatDeductible: true,
    fuel: 'Benzine',
    transmission: 'Automaat',
    powerHp: 600,
    color: 'Nardo Grey',
    interior: 'Valcona Leder Zwart met honingraatmotief',
    bodyType: 'Break',
    co2: 268,
    euroStandard: 'Euro 6',
    images: [
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    category: 'premium',
    carPassId: 'CP-SAMPLE-04',
    warrantyMonths: 12,
    highlightSpecs: ['4.0 TFSI V8 Mild-Hybrid 600 PK', 'Top 305 km/u (Dynamic Plus)', 'Keramische Remmen', 'Bang & Olufsen 3D'],
    options: [
      'RS Dynamic Pakket Plus met vierwielbesturing',
      'Matrix LED koplampen met laserlicht',
      'HD Matrix LED met Audi laser light',
      'Elektrisch bedienbaar glazen panoramadak'
    ],
    description: 'De ultieme sports estate. Nardo Grey lakwerk in combinatie met het optische zwarte stylingpakket. Volledige Audi dealerhistoriek.',
    status: 'available',
    viewsCount: 412
  },
  {
    id: 'sample-car-5',
    brand: 'Land Rover',
    model: 'Range Rover Sport',
    edition: 'D300 Dynamic SE • Luchtvering • Black Pack',
    year: 2023,
    mileage: 21000,
    price: 94500,
    monthlyPrice: 1020,
    priceType: 'BTW Aftrekbaar',
    vatDeductible: true,
    fuel: 'Diesel',
    transmission: 'Automaat',
    powerHp: 300,
    color: 'Santorini Black Metallic',
    interior: 'Semi-aniline geperforeerd leder Ebony',
    bodyType: 'SUV / 4x4',
    co2: 198,
    euroStandard: 'Euro 6d-Final',
    images: [
      'https://images.unsplash.com/photo-1541348263662-e0c824309e3a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: false,
    category: 'premium',
    carPassId: 'CP-SAMPLE-05',
    warrantyMonths: 24,
    highlightSpecs: ['3.0D 6-cilinder 300 PK', 'Elektronische Luchtvering met Dynamic Response', 'Pixel LED Koplampen', 'Meridian Sound System'],
    options: [
      'Black Design Pakket met 22 inch hoogglans zwarte velgen',
      'Glazen panoramisch schuif-/kanteldak',
      '3D Surround Camera met ClearSight Ground View',
      'Verwarmde en gekoelde voorstoelen met geheugen'
    ],
    description: 'Nieuw model Range Rover Sport in uitzonderlijke Dynamic SE uitvoering. Eerste eigenaar, 100% Belgische wagen met Car-Pass.',
    status: 'available',
    viewsCount: 195
  }
];
