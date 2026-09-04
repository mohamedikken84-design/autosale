import { CustomerReview } from '../types';

export const DEALERSHIP_INFO = {
  name: 'Auto Sale',
  legalName: 'Auto Sale NV',
  owner: 'Michel Primack',
  vatNumber: 'BE 0465.248.919',
  slogan: 'Excellent condition. Extreme selectivity. Competitive prices.',
  sloganNl: 'Uitmuntende staat. Extreme selectiviteit. Scherpe prijzen.',
  foundedYear: 1999,
  address: {
    street: 'Sint-Bernardsesteenweg 733-735',
    postalCode: '2660',
    city: 'Antwerpen (Hoboken)',
    country: 'België',
    full: 'Sint-Bernardsesteenweg 733-735, 2660 Antwerpen (Hoboken), België',
    googleMapsUrl: 'https://share.google/PcuwSy0sGdtxq9OSs',
    googleMapsEmbedUrl: 'https://www.google.com/maps?q=Sint-Bernardsesteenweg+733,+2660+Antwerpen&output=embed',
    coordinates: {
      lat: 51.1824,
      lng: 4.3732
    }
  },
  contact: {
    phone: '+32 (0)3 647 33 39',
    phoneRaw: '+3236473339',
    whatsapp: '+3236473339',
    whatsappUrl: 'https://wa.me/3236473339?text=Hallo%20Auto%20Sale%2C%20ik%20heb%20interesse%20in%20een%20wagen.',
    email: 'info@auto-sale.be',
    salesEmail: 'sales@auto-sale.be'
  },
  hours: [
    { days: 'Maandag - Donderdag', hours: '10:00 - 19:00', open: true },
    { days: 'Vrijdag', hours: '10:00 - 16:30', open: true },
    { days: 'Zaterdag', hours: 'Op afspraak', open: false, appointmentOnly: true },
    { days: 'Zondag', hours: 'Gesloten', open: false }
  ],
  stats: [
    { label: 'Jaren Ervaring', value: '25+', subtext: 'Opgericht in 1999' },
    { label: 'Tevreden Klanten', value: '3.500+', subtext: 'Particulier & zakelijk' },
    { label: 'Inspectiepunten', value: '113', subtext: 'Traxio gecertificeerd' },
    { label: 'Google Rating', value: '4.7 ★', subtext: 'Uitstekende reputatie' }
  ],
  guarantees: [
    {
      title: 'Traxio Kwaliteitsgarantie',
      description: 'Als erkend Traxio lid voldoen alle voertuigen aan de strengste Belgische kwaliteits- en veiligheidsnormen, met minimaal 12 tot 24 maanden garantie.',
      icon: 'ShieldCheck'
    },
    {
      title: 'Officiële Car-Pass & Historiek',
      description: 'Elke wagen wordt geleverd met een gecertificeerde Car-Pass kilometerhistoriek en volledig onderhoudsboekje van erkende merkdealers.',
      icon: 'FileCheck'
    },
    {
      title: '113-Punten Technische Controle',
      description: 'Grondige inspectie van motor, remmen, ophanging, lakdikte, elektronica en interieur vóór de wagen onze showroom betreedt.',
      icon: 'CheckCircle2'
    },
    {
      title: 'Wereldwijde Export & Transit',
      description: 'Snelle administratieve afhandeling met transitplaten, douaneformaliteiten (EX-A) en professioneel transport voor binnen- en buitenland.',
      icon: 'Globe'
    }
  ]
};

export const REVIEWS_DATA: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'Marc Van den Bossche',
    rating: 5,
    date: 'Recent',
    carPurchased: 'Land Rover Range Rover Sport P440e',
    content: 'Fantastische ervaring bij Michel en het team van Auto Sale. De wagen stond er piekfijn bij, exact zoals op de foto\'s omschreven. Car-Pass en onderhoudshistoriek waren 100% sluitend. Professionele overname van mijn vorige wagen tegen een correcte marktconforme prijs!',
    verified: true,
    source: 'Google Reviews'
  },
  {
    id: 'rev-2',
    author: 'Karim Benali',
    rating: 5,
    date: '2 maanden geleden',
    carPurchased: 'Mercedes-Benz E300e AMG Line',
    content: 'Eerlijke en betrouwbare garage aan de Sint-Bernardsesteenweg. Zeer transparante communicatie over opties en BTW aftrekbaarheid voor mijn vennootschap. Binnen 3 dagen gekeurd voor verkoop en rijklaar afgeleverd. Aanrader voor wie een kwalitatieve premium wagen zoekt.',
    verified: true,
    source: 'Google Reviews'
  },
  {
    id: 'rev-3',
    author: 'Stefan De Smet',
    rating: 5,
    date: '3 maanden geleden',
    carPurchased: 'Audi RS Q8 Performance',
    content: 'Auto Sale onderscheidt zich echt door de extreme selectiviteit van hun stock. Geen doorsnee auto\'s, maar stuk voor stuk luxueuze wagens in topconditie. Michel geeft deskundig advies zonder opdringerig te zijn.',
    verified: true,
    source: 'Google Reviews'
  },
  {
    id: 'rev-4',
    author: 'Jean-Pierre Laurent',
    rating: 5,
    date: '5 maanden geleden',
    carPurchased: 'Bentley Bentayga Mulliner PHEV',
    content: 'Service impeccable. Documentation complète, démarche d\'immatriculation rapide et véhicule dans un état concours irréprochable. Grand professionnalisme de toute l\'équipe d\'Auto Sale à Anvers.',
    verified: true,
    source: 'Mobile.de'
  }
];
