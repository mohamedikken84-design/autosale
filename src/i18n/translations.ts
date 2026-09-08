import { Language } from '../types';

export interface TranslationSchema {
  nav: {
    stock: string;
    valuation: string;
    financing: string;
    warranty: string;
    about: string;
    contact: string;
    dealerLogin: string;
    testDrive: string;
    favorites: string;
  };
  hero: {
    badge: string;
    titleHighlight: string;
    titleRest: string;
    subtitle: string;
    viewStock: string;
    sellCar: string;
    filterTitle: string;
    brand: string;
    allBrands: string;
    budget: string;
    fuel: string;
    allFuels: string;
    searchButton: string;
    guaranteesTitle: string;
    statYears: string;
    statRating: string;
    statChecks: string;
    statWarranty: string;
    showroomOpen: string;
    hoursText: string;
    traxioHeader: string;
    carPass100: string;
    checks113: string;
    googleScore: string;
    directTakeover: string;
    noLimit: string;
    upTo: string;
    petrol: string;
    diesel: string;
    hybrid: string;
    electric: string;
  };
  inventory: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    tabAll: string;
    tabPremium: string;
    tabEco: string;
    tabExport: string;
    filterToggle: string;
    resetFilters: string;
    sortBy: string;
    sortFeatured: string;
    sortPriceAsc: string;
    sortPriceDesc: string;
    sortYearDesc: string;
    sortKmAsc: string;
    resultsCount: string;
    soldBadge: string;
    reservedBadge: string;
    availableBadge: string;
    vatDeductible: string;
    marginCar: string;
    exportPrice: string;
    perMonth: string;
    detailsButton: string;
    testDriveButton: string;
    emptyTitle: string;
    emptyText: string;
    emptyContact: string;
    emptyDealerHint: string;
    similarCars: string;
    exportNotice: string;
    currentStock: string;
    soldStock: string;
    soldTitle: string;
    soldSubtitle: string;
    fuelType: string;
    transmission: string;
    allTransmissions: string;
    automatic: string;
    manual: string;
    maxBudget: string;
    conciergeTitle: string;
    conciergeSubtitle: string;
    conciergeSubmit: string;
    conciergeSuccess: string;
    loadSamples: string;
  };
  carCard: {
    warranty: string;
    from: string;
    notAvailable: string;
    saveFavorite: string;
    removeFavorite: string;
    featured: string;
  };
  carDetail: {
    specs: string;
    options: string;
    description: string;
    watchVideo: string;
    viewAllPhotos: string;
    carPassVerified: string;
    warrantyBanner: string;
    monthlyEst: string;
    planTestDrive: string;
    whatsappSeller: string;
    callDirect: string;
    tradeInCta: string;
    soldMessage: string;
    shareCar: string;
    copied: string;
    photo: string;
    of: string;
    warrantyNotice: string;
    vatRecoverableNotice: string;
    builtYear: string;
    mileageLabel: string;
    transmissionLabel: string;
    fuelLabel: string;
    powerLabel: string;
    similarCarsTitle: string;
  };
  valuation: {
    title: string;
    subtitle: string;
    badge: string;
    step1: string;
    step2: string;
    step3: string;
    step1Title: string;
    step2Title: string;
    step3Title: string;
    plate: string;
    brandModel: string;
    model: string;
    year: string;
    mileage: string;
    fuel: string;
    transmission: string;
    condition: string;
    conditionExcellent: string;
    conditionGood: string;
    conditionFair: string;
    expectedPrice: string;
    notes: string;
    name: string;
    phone: string;
    email: string;
    submit: string;
    nextStep: string;
    previousStep: string;
    successTitle: string;
    successText: string;
    benefit1: string;
    benefit2: string;
    benefit3: string;
  };
  financing: {
    title: string;
    subtitle: string;
    badge: string;
    calculateTitle: string;
    calculateSubtitle: string;
    carPrice: string;
    downPayment: string;
    balloonLabel: string;
    duration: string;
    months: string;
    monthlyPayment: string;
    monthlyEstTitle: string;
    totalCost: string;
    interestNote: string;
    disclaimer: string;
    applyTitle: string;
    name: string;
    phone: string;
    sendApplication: string;
    appSubmitted: string;
  };
  about: {
    badge: string;
    title: string;
    description: string;
    bullet1: string;
    bullet2: string;
    bullet3: string;
    bullet4: string;
    historyTitle: string;
    historyText: string;
    quote: string;
    exploreBtn: string;
    valuationBtn: string;
  };
  reviews: {
    badge: string;
    title: string;
    score: string;
    contactTitle: string;
    contactSubtitle: string;
    openingHoursTitle: string;
    monThu: string;
    friday: string;
    saturday: string;
    sunday: string;
    sendMessage: string;
    messageSent: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    directions: string;
    callNow: string;
    whatsappDirect: string;
  };
  testDrive: {
    title: string;
    subtitle: string;
    selectCar: string;
    date: string;
    time: string;
    fullName: string;
    phone: string;
    email: string;
    drivingLicense: string;
    remarks: string;
    submit: string;
    successTitle: string;
    successText: string;
    close: string;
  };
  favorites: {
    title: string;
    subtitle: string;
    emptyTitle: string;
    emptyText: string;
    clearAll: string;
    requestTestDrive: string;
    viewCar: string;
  };
  cookie: {
    title: string;
    text: string;
    accept: string;
    decline: string;
  };
  footer: {
    aboutText: string;
    rights: string;
    dealerPortal: string;
    exportInfo: string;
    navigation: string;
    stock: string;
    valuation: string;
    financing: string;
    warranty: string;
    about: string;
    openingHours: string;
    contactDirections: string;
    traxioCertified: string;
    carPassPartner: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationSchema> = {
  nl: {
    nav: {
      stock: 'Onze Wagens',
      valuation: 'Auto Verkopen / Overname',
      financing: 'Financiering',
      warranty: 'Traxio Garantie',
      about: 'Over Ons',
      contact: 'Contact & Route',
      dealerLogin: 'Dealer Portaal',
      testDrive: 'Proefrit Aanvragen',
      favorites: 'Favorieten',
    },
    hero: {
      badge: 'Erkend Traxio Concessiehouder • Sinds 1999',
      titleHighlight: 'EXCLUSIEVE WAGENS',
      titleRest: 'MET 100% TRANSPARANTIE',
      subtitle: 'Al 25 jaar uw toonaangevende specialist in zorgvuldig geselecteerde, jonge premium tweedehandswagens in Antwerpen. Inclusief officiële Car-Pass & 12 tot 24 maanden waarborg.',
      viewStock: 'Bekijk Onze Wagens',
      sellCar: 'Auto Inruilen / Taxatie',
      filterTitle: 'Vind Uw Droomwagen',
      brand: 'Merk',
      allBrands: 'Alle Merken',
      budget: 'Budget tot',
      fuel: 'Brandstof',
      allFuels: 'Alle Brandstoffen',
      searchButton: 'Zoek Wagens',
      guaranteesTitle: 'Onze Zekerheden',
      statYears: 'Jaar Ervaring',
      statRating: 'Google Score',
      statChecks: 'Punten Controle',
      statWarranty: 'Traxio Waarborg',
      showroomOpen: 'Showroom Geopend',
      hoursText: 'Ma-Do 10:00-19:00 | Vr tot 16:30',
      traxioHeader: 'Erkend Traxio Concessiehouder • 25+ Jaar',
      carPass100: '100% Car-Pass Historiek',
      checks113: '113 Traxio Controlepunten',
      googleScore: '4.9 / 5 Google Score (280+ reviews)',
      directTakeover: 'Directe Overname binnen 24u',
      noLimit: 'Geen limiet',
      upTo: 'Tot',
      petrol: 'Benzine',
      diesel: 'Diesel',
      hybrid: 'Hybride',
      electric: '100% Elektrisch',
    },
    inventory: {
      title: 'Huidige Voorraad',
      subtitle: 'Elk voertuig is direct leverbaar, gekeurd voor verkoop met Car-Pass en voorzien van minimaal 12 maanden garantie.',
      searchPlaceholder: 'Zoek op merk, model, optie...',
      tabAll: 'Alle Wagens',
      tabPremium: 'Premium Selectie',
      tabEco: 'Hybride & Elektrisch',
      tabExport: 'Export / B2B',
      filterToggle: 'Filters',
      resetFilters: 'Filters Wissen',
      sortBy: 'Sorteer op',
      sortFeatured: 'Aanbevolen',
      sortPriceAsc: 'Prijs: Laag naar Hoog',
      sortPriceDesc: 'Prijs: Hoog naar Laag',
      sortYearDesc: 'Bouwjaar: Nieuwste eerst',
      sortKmAsc: 'Kilometerstand: Laagste eerst',
      resultsCount: 'voertuigen gevonden',
      soldBadge: 'VERKOCHT',
      reservedBadge: 'GERESERVEERD',
      availableBadge: 'BESCHIKBAAR',
      vatDeductible: 'BTW Recuperabel',
      marginCar: 'Marge Wagen',
      exportPrice: 'Export / B2B',
      perMonth: 'p/mnd',
      detailsButton: 'Bekijk Details',
      testDriveButton: 'Proefrit',
      emptyTitle: 'Momenteel Geen Wagens in Deze Selectie',
      emptyText: 'Onze exclusieve showroomcollectie wordt doorlopend aangevuld. Heeft u een specifieke zoekopdracht of wenst u een auto op maat te importeren?',
      emptyContact: 'Contacteer Onze Verkoopadviseurs',
      emptyDealerHint: 'Bent u de beheerder? Voeg wagens toe of importeer via het Dealer Dashboard.',
      similarCars: 'Vergelijkbare Voertuigen',
      exportNotice: 'Internationale Koper? Exportkentekens, documenten en netto facturatie mogelijk.',
      currentStock: 'Actueel',
      soldStock: 'Verkocht',
      soldTitle: 'Recent Verkochte Wagens',
      soldSubtitle: 'Bekijk de exclusieve wagens die recent door Auto Sale NV zijn geleverd aan tevreden eigenaars.',
      fuelType: 'Brandstoftype',
      transmission: 'Transmissie',
      allTransmissions: 'Alle Transmissies',
      automatic: 'Automaat',
      manual: 'Handgeschakeld',
      maxBudget: 'Budget tot',
      conciergeTitle: 'Persoonlijke Zoekopdracht',
      conciergeSubtitle: 'Niet de exacte wagen gevonden? Vertel ons uw wensen en wij vinden hem voor u.',
      conciergeSubmit: 'Verstuur Zoekopdracht',
      conciergeSuccess: 'Uw zoekopdracht is succesvol ontvangen! We contacteren u binnenkort.',
      loadSamples: 'Laad Test Voorbeeldwagens',
    },
    carCard: {
      warranty: 'mnd Garantie',
      from: 'Vanaf',
      notAvailable: 'Niet meer beschikbaar',
      saveFavorite: 'Opslaan in favorieten',
      removeFavorite: 'Verwijder uit favorieten',
      featured: 'Aanbevolen',
    },
    carDetail: {
      specs: 'Technische Specificaties',
      options: 'Opties & Uitrusting',
      description: 'Voertuigbeschrijving',
      watchVideo: 'Bekijk Video',
      viewAllPhotos: 'Bekijk alle foto’s fullscreen',
      carPassVerified: 'Officiële Car-Pass Geverifieerd',
      warrantyBanner: 'Maanden Volledige Traxio Garantie',
      monthlyEst: 'Leasing / Financieringsindicatie',
      planTestDrive: 'Plan een Vrijblijvende Proefrit',
      whatsappSeller: 'Stel een Vraag via WhatsApp',
      callDirect: 'Bel Onze Showroom',
      tradeInCta: 'Wilt u uw huidige wagen inruilen? Bereken de overnameprijs →',
      soldMessage: 'Dit voertuig is verkocht en niet langer beschikbaar.',
      shareCar: 'Deel Wagen',
      copied: 'Link gekopieerd!',
      photo: 'Foto',
      of: 'van',
      warrantyNotice: 'Dit voertuig is conform de Traxio kwaliteitsnormen gekeurd op 113 punten en voorzien van een officiële Belgische Car-Pass kilometerhistoriek.',
      vatRecoverableNotice: 'BTW 21% recuperabel voor bedrijven & zelfstandigen',
      builtYear: 'Bouwjaar',
      mileageLabel: 'Kilometerstand',
      transmissionLabel: 'Transmissie',
      fuelLabel: 'Brandstof',
      powerLabel: 'Vermogen',
      similarCarsTitle: 'Vergelijkbare Wagens',
    },
    valuation: {
      title: 'Auto Verkopen of Inruilen?',
      subtitle: 'Krijg binnen 24 uur een marktconform en bindend overnamevoorstel zonder gedoe.',
      badge: 'Directe Overname & Taxatie',
      step1: '1. Gegevens Wagen',
      step2: '2. Staat & Foto’s',
      step3: '3. Contact & Bod',
      step1Title: 'Gegevens Voertuig',
      step2Title: 'Staat & Specificaties',
      step3Title: 'Contactgegevens voor Bod',
      plate: 'Nummerplaat (optioneel)',
      brandModel: 'Merk & Model',
      model: 'Model',
      year: 'Bouwjaar',
      mileage: 'Kilometerstand (km)',
      fuel: 'Brandstof',
      transmission: 'Transmissie',
      condition: 'Algemene Staat',
      conditionExcellent: 'Uitstekend (zonder schade)',
      conditionGood: 'Goed (normale gebruikerssporen)',
      conditionFair: 'Redelijk / Enkele beschadigingen',
      expectedPrice: 'Verwachte Vraagprijs (€ - optioneel)',
      notes: 'Eventuele opmerkingen of opties',
      name: 'Uw Naam',
      phone: 'Telefoonnummer',
      email: 'E-mailadres',
      submit: 'Vrijblijvend Overnamevoorstel Aanvragen',
      nextStep: 'Volgende Stap',
      previousStep: 'Vorige Stap',
      successTitle: 'Aanvraag Succesvol Ontvangen!',
      successText: 'Onze inkoper neemt binnen 24 uur contact met u op met een eerlijk en transparant voorstel.',
      benefit1: 'Binnen 24u een bindend bod',
      benefit2: 'Directe bankoverschrijving & afhandeling',
      benefit3: 'Vrijblijvend en zonder verkoopstress',
    },
    financing: {
      title: 'Financieringscalculator',
      subtitle: 'Bereken eenvoudig uw indicatieve maandlasten voor een krediet of financiële leasing.',
      badge: 'Financiering & Leasing',
      calculateTitle: 'Bereken Uw Maandelijkse Afbetaling',
      calculateSubtitle: 'Of u nu particulier koopt of zakelijk least: wij bieden flexibele formules op maat met of zonder voorschot en restwaarde.',
      carPrice: 'Aankoopprijs Voertuig (€)',
      downPayment: 'Aanbetaling / Inruilwaarde (€)',
      balloonLabel: 'Restwaarde / Ballonbedrag (€)',
      duration: 'Looptijd (maanden)',
      months: 'maanden',
      monthlyPayment: 'Indicatief Maandbedrag',
      monthlyEstTitle: 'Uw Maandlast',
      totalCost: 'Totale Financieringskost',
      interestNote: 'Vaste rentevoet (JKP / TAEG)',
      disclaimer: 'Let op: Geld lenen kost ook geld. Dit is een louter indicatieve berekening onder voorbehoud van aanvaarding van het dossier.',
      applyTitle: 'Vrijblijvende Kredietaanvraag',
      name: 'Uw Naam',
      phone: 'Telefoonnummer',
      sendApplication: 'Aanvraag Verzenden',
      appSubmitted: 'Aanvraag Ontvangen! Wij nemen snel contact met u op.',
    },
    about: {
      badge: 'Traxio Label & Car-Pass',
      title: 'Zorgeloos Rijden met Maximale Zekerheid',
      description: 'Als erkend lid van de Belgische automobielfederatie Traxio hanteren wij de strengste kwaliteitsnormen. Elk voertuig ondergaat een diepgaande inspectie op 113 controlepunten en wordt afgeleverd met een officiële Car-Pass kilometergarantie en blanco keuring voor verkoop.',
      bullet1: '12 tot 24 Maanden Garantie',
      bullet2: '100% Car-Pass Kilometergarantie',
      bullet3: '113 Controlepunten Gekeurd',
      bullet4: 'Blanco Keuring voor Verkoop',
      historyTitle: '25+ Jaar Ervaring in Antwerpen',
      historyText: 'Sinds 1999 staat Auto Sale NV synoniem voor passie voor auto’s, betrouwbaarheid en persoonlijke service. Wij ontvangen u graag in onze ruime showroom te Hoboken (Antwerpen).',
      quote: '"Kwaliteit is geen toeval, maar het resultaat van passie en strenge selectie."',
      exploreBtn: 'Bekijk Onze Wagens',
      valuationBtn: 'Auto Verkopen / Inruilen',
    },
    reviews: {
      badge: 'Google Beoordelingen',
      title: 'Wat Onze Klanten Zeggen',
      score: '4.9 van 5 Sterren (280+ geverifieerde reviews)',
      contactTitle: 'Contacteer Ons',
      contactSubtitle: 'Kom langs in onze showroom of stuur ons een bericht. Wij helpen u graag verder.',
      openingHoursTitle: 'Openingsuren Showroom',
      monThu: 'Maandag - Donderdag: 10:00 - 19:00',
      friday: 'Vrijdag: 10:00 - 16:30',
      saturday: 'Zaterdag: 10:00 - 18:00',
      sunday: 'Zondag: Gesloten (of op afspraak)',
      sendMessage: 'Bericht Verzenden',
      messageSent: 'Bericht Verzonden! Wij reageren binnen enkele uren.',
      name: 'Uw Naam',
      email: 'E-mailadres',
      phone: 'Telefoonnummer',
      subject: 'Onderwerp',
      message: 'Uw Bericht',
      directions: 'Route Beschrijving',
      callNow: 'Bel Direct',
      whatsappDirect: 'WhatsApp Ons',
    },
    testDrive: {
      title: 'Plan een Vrijblijvende Proefrit',
      subtitle: 'Ervaar het rijcomfort en de prestaties van uw gekozen wagen zelf op de weg.',
      selectCar: 'Geselecteerde Wagen',
      date: 'Gewenste Datum',
      time: 'Tijdstip',
      fullName: 'Volledige Naam',
      phone: 'Telefoonnummer',
      email: 'E-mailadres',
      drivingLicense: 'Ik beschik over een geldig rijbewijs B',
      remarks: 'Eventuele opmerkingen of vragen',
      submit: 'Bevestig Proefrit Aanvraag',
      successTitle: 'Proefrit Aanvraag Bevestigd!',
      successText: 'Wij hebben uw aanvraag goed ontvangen en nemen spoedig contact op om de afspraak te bevestigen.',
      close: 'Sluiten',
    },
    favorites: {
      title: 'Opgeslagen Wagens',
      subtitle: 'Vergelijk uw favoriete modellen',
      emptyTitle: 'Nog Geen Favorieten',
      emptyText: 'Klik op het hartje bij een wagen om deze op te slaan in uw verlanglijst.',
      clearAll: 'Alles Wissen',
      requestTestDrive: 'Proefrit Aanvragen',
      viewCar: 'Bekijk Details',
    },
    cookie: {
      title: 'Privacy & Cookie-instellingen',
      text: 'Auto Sale NV respecteert uw privacy. We gebruiken functionele en analytische cookies om uw ervaring te optimaliseren (zoals taalkeuze en favorieten). Conform GDPR / AVG.',
      accept: 'Alles Accepteren',
      decline: 'Alleen Noodzakelijk',
    },
    footer: {
      aboutText: 'Al meer dan 25 jaar uw toonaangevende specialist in exclusieve, jonge tweedehandswagens in Antwerpen. Erkend Traxio lid met 100% Car-Pass kwaliteitsgarantie.',
      rights: 'Alle rechten voorbehouden.',
      dealerPortal: 'Dealer Portaal',
      exportInfo: 'Export & B2B Levering',
      navigation: 'Navigatie',
      stock: 'Onze Wagens (Stock)',
      valuation: 'Auto Verkopen / Overname',
      financing: 'Financieringscalculator',
      warranty: 'Traxio Garantie (12-24 mnd)',
      about: 'Over Auto Sale (1999)',
      openingHours: 'Openingsuren',
      contactDirections: 'Contact & Route',
      traxioCertified: 'Traxio Gecertificeerd',
      carPassPartner: 'Car-Pass Partner',
    }
  },

  en: {
    nav: {
      stock: 'Our Cars',
      valuation: 'Sell Your Car / Trade-In',
      financing: 'Financing',
      warranty: 'Traxio Warranty',
      about: 'About Us',
      contact: 'Contact & Directions',
      dealerLogin: 'Dealer Portal',
      testDrive: 'Book Test Drive',
      favorites: 'Favorites',
    },
    hero: {
      badge: 'Certified Traxio Dealer • Established in 1999',
      titleHighlight: 'EXCLUSIVE VEHICLES',
      titleRest: 'WITH 100% TRANSPARENCY',
      subtitle: 'For over 25 years your leading specialist in rigorously inspected, premium pre-owned cars in Antwerp. Complete with official Car-Pass & 12 to 24 months warranty.',
      viewStock: 'Explore Vehicles',
      sellCar: 'Trade-In / Valuation',
      filterTitle: 'Find Your Dream Car',
      brand: 'Make',
      allBrands: 'All Makes',
      budget: 'Budget up to',
      fuel: 'Fuel Type',
      allFuels: 'All Fuels',
      searchButton: 'Search Cars',
      guaranteesTitle: 'Our Commitments',
      statYears: 'Years Experience',
      statRating: 'Google Rating',
      statChecks: 'Checkpoints',
      statWarranty: 'Traxio Warranty',
      showroomOpen: 'Showroom Open',
      hoursText: 'Mon-Thu 10:00-19:00 | Fri until 16:30',
      traxioHeader: 'Certified Traxio Dealer • 25+ Years',
      carPass100: '100% Car-Pass History',
      checks113: '113 Traxio Checkpoints',
      googleScore: '4.9 / 5 Google Score (280+ reviews)',
      directTakeover: 'Direct Purchase within 24h',
      noLimit: 'No limit',
      upTo: 'Up to',
      petrol: 'Petrol',
      diesel: 'Diesel',
      hybrid: 'Hybrid',
      electric: '100% Electric',
    },
    inventory: {
      title: 'Current Inventory',
      subtitle: 'Every vehicle is immediately available, inspected for delivery with certified Car-Pass and minimum 12 months warranty.',
      searchPlaceholder: 'Search by make, model, feature...',
      tabAll: 'All Vehicles',
      tabPremium: 'Premium Selection',
      tabEco: 'Hybrid & Electric',
      tabExport: 'Export / B2B',
      filterToggle: 'Filters',
      resetFilters: 'Reset Filters',
      sortBy: 'Sort by',
      sortFeatured: 'Featured',
      sortPriceAsc: 'Price: Low to High',
      sortPriceDesc: 'Price: High to Low',
      sortYearDesc: 'Year: Newest first',
      sortKmAsc: 'Mileage: Lowest first',
      resultsCount: 'vehicles found',
      soldBadge: 'SOLD',
      reservedBadge: 'RESERVED',
      availableBadge: 'AVAILABLE',
      vatDeductible: 'VAT Deductible',
      marginCar: 'Margin Car',
      exportPrice: 'Export / Netto',
      perMonth: 'p/mo',
      detailsButton: 'View Details',
      testDriveButton: 'Test Drive',
      emptyTitle: 'No Vehicles Currently in This Selection',
      emptyText: 'Our exclusive showroom inventory is continuously updated. Are you looking for a specific model or custom vehicle import?',
      emptyContact: 'Contact Our Sales Advisors',
      emptyDealerHint: 'Are you the dealership admin? Add cars or import via the Dealer Dashboard.',
      similarCars: 'Similar Vehicles',
      exportNotice: 'International Buyer? Export plates, customs documents and net intra-community invoicing available.',
      currentStock: 'Available',
      soldStock: 'Sold',
      soldTitle: 'Recently Sold Vehicles',
      soldSubtitle: 'Discover the exclusive vehicles recently delivered by Auto Sale NV to delighted drivers.',
      fuelType: 'Fuel Type',
      transmission: 'Transmission',
      allTransmissions: 'All Transmissions',
      automatic: 'Automatic',
      manual: 'Manual',
      maxBudget: 'Budget up to',
      conciergeTitle: 'Custom Vehicle Sourcing',
      conciergeSubtitle: 'Looking for a specific model or color? We source your desired car across Europe.',
      conciergeSubmit: 'Submit Request',
      conciergeSuccess: 'Your request has been received! Our team will contact you shortly.',
      loadSamples: 'Load Demo Inventory',
    },
    carCard: {
      warranty: 'mos Warranty',
      from: 'From',
      notAvailable: 'No longer available',
      saveFavorite: 'Save to favorites',
      removeFavorite: 'Remove from favorites',
      featured: 'Featured',
    },
    carDetail: {
      specs: 'Technical Specifications',
      options: 'Options & Features',
      description: 'Vehicle Description',
      watchVideo: 'Watch Video',
      viewAllPhotos: 'View all photos fullscreen',
      carPassVerified: 'Certified Car-Pass Verified',
      warrantyBanner: 'Months Full Traxio Warranty',
      monthlyEst: 'Leasing / Financing estimate',
      planTestDrive: 'Book a Test Drive',
      whatsappSeller: 'Chat via WhatsApp',
      callDirect: 'Call Our Showroom',
      tradeInCta: 'Looking to trade in your current vehicle? Calculate trade-in value →',
      soldMessage: 'This vehicle has been sold and is no longer available.',
      shareCar: 'Share Vehicle',
      copied: 'Link copied!',
      photo: 'Photo',
      of: 'of',
      warrantyNotice: 'This vehicle is certified according to strict Traxio quality standards with a 113-point inspection and official Car-Pass history.',
      vatRecoverableNotice: 'VAT 21% deductible for business owners & companies',
      builtYear: 'Year',
      mileageLabel: 'Mileage',
      transmissionLabel: 'Transmission',
      fuelLabel: 'Fuel',
      powerLabel: 'Power',
      similarCarsTitle: 'Similar Vehicles',
    },
    valuation: {
      title: 'Sell or Trade-In Your Car?',
      subtitle: 'Receive a competitive, binding purchase offer within 24 hours without hassle.',
      badge: 'Direct Purchase & Valuation',
      step1: '1. Vehicle Details',
      step2: '2. Condition & Photos',
      step3: '3. Contact & Offer',
      step1Title: 'Vehicle Details',
      step2Title: 'Condition & Specifications',
      step3Title: 'Contact for Your Offer',
      plate: 'License Plate (optional)',
      brandModel: 'Make & Model',
      model: 'Model',
      year: 'Year',
      mileage: 'Mileage (km)',
      fuel: 'Fuel',
      transmission: 'Transmission',
      condition: 'General Condition',
      conditionExcellent: 'Excellent (no defects)',
      conditionGood: 'Good (normal wear)',
      conditionFair: 'Fair / Minor damage',
      expectedPrice: 'Expected Price (€ - optional)',
      notes: 'Any additional notes or options',
      name: 'Full Name',
      phone: 'Phone Number',
      email: 'Email Address',
      submit: 'Request Non-Binding Offer',
      nextStep: 'Next Step',
      previousStep: 'Previous Step',
      successTitle: 'Inquiry Successfully Received!',
      successText: 'Our procurement team will contact you within 24 hours with a transparent offer.',
      benefit1: 'Binding purchase offer within 24h',
      benefit2: 'Instant bank transfer & paperless transfer',
      benefit3: 'Zero stress and no obligation',
    },
    financing: {
      title: 'Financing Calculator',
      subtitle: 'Quickly estimate your monthly payments for credit or financial leasing.',
      badge: 'Financing & Leasing',
      calculateTitle: 'Calculate Your Monthly Payment',
      calculateSubtitle: 'Whether purchasing privately or leasing through your business, we provide flexible financing options.',
      carPrice: 'Vehicle Price (€)',
      downPayment: 'Down Payment / Trade-In (€)',
      balloonLabel: 'Residual Value / Balloon (€)',
      duration: 'Duration (months)',
      months: 'months',
      monthlyPayment: 'Estimated Monthly Payment',
      monthlyEstTitle: 'Estimated Payment',
      totalCost: 'Total Financed Cost',
      interestNote: 'Fixed annual rate (APR / JKP)',
      disclaimer: 'Notice: Borrowing money also costs money. Indicative calculation subject to credit approval.',
      applyTitle: 'Non-Binding Credit Application',
      name: 'Your Name',
      phone: 'Phone Number',
      sendApplication: 'Submit Application',
      appSubmitted: 'Application Received! We will get in touch with you shortly.',
    },
    about: {
      badge: 'Traxio Label & Car-Pass',
      title: 'Worry-Free Driving with Maximum Assurance',
      description: 'As a certified member of the Belgian automobile federation Traxio, we adhere to the strictest quality standards. Every vehicle undergoes a 113-point inspection and comes with an official Car-Pass mileage certificate and clean technical inspection.',
      bullet1: '12 to 24 Months Comprehensive Warranty',
      bullet2: '100% Car-Pass Mileage Guarantee',
      bullet3: '113-Point Quality Inspection',
      bullet4: 'Passed Roadworthiness Inspection for Sale',
      historyTitle: '25+ Years of Heritage in Antwerp',
      historyText: 'Since 1999, Auto Sale NV has been synonym for automotive passion, transparency, and tailored customer care. Visit our modern showroom in Hoboken (Antwerp).',
      quote: '"Quality is never an accident; it is always the result of passion and rigorous selection."',
      exploreBtn: 'Explore Vehicles',
      valuationBtn: 'Sell / Trade-In Car',
    },
    reviews: {
      badge: 'Google Reviews',
      title: 'What Our Clients Say',
      score: '4.9 out of 5 Stars (280+ verified reviews)',
      contactTitle: 'Contact Us',
      contactSubtitle: 'Visit our showroom or send us a message. We are delighted to assist you.',
      openingHoursTitle: 'Showroom Opening Hours',
      monThu: 'Monday - Thursday: 10:00 - 19:00',
      friday: 'Friday: 10:00 - 16:30',
      saturday: 'Saturday: 10:00 - 18:00',
      sunday: 'Sunday: Closed (or by appointment)',
      sendMessage: 'Send Message',
      messageSent: 'Message Sent! We will reply within a few hours.',
      name: 'Your Name',
      email: 'Email Address',
      phone: 'Phone Number',
      subject: 'Subject',
      message: 'Your Message',
      directions: 'Get Directions',
      callNow: 'Call Showroom',
      whatsappDirect: 'WhatsApp Us',
    },
    testDrive: {
      title: 'Book a Test Drive',
      subtitle: 'Experience the comfort, handling, and thrill of your chosen vehicle on the road.',
      selectCar: 'Selected Vehicle',
      date: 'Preferred Date',
      time: 'Time Slot',
      fullName: 'Full Name',
      phone: 'Phone Number',
      email: 'Email Address',
      drivingLicense: 'I hold a valid European driving license',
      remarks: 'Any specific remarks or questions',
      submit: 'Confirm Test Drive Booking',
      successTitle: 'Test Drive Booked!',
      successText: 'We have received your booking and will contact you promptly to finalize your appointment.',
      close: 'Close',
    },
    favorites: {
      title: 'Saved Vehicles',
      subtitle: 'Compare your favorite models',
      emptyTitle: 'No Saved Cars Yet',
      emptyText: 'Click the heart icon on any vehicle to add it to your saved wishlist.',
      clearAll: 'Clear All',
      requestTestDrive: 'Book Test Drive',
      viewCar: 'View Vehicle',
    },
    cookie: {
      title: 'Privacy & Cookie Settings',
      text: 'Auto Sale NV respects your privacy. We use functional and analytical cookies to remember your preferences (language and favorites). Fully compliant with GDPR.',
      accept: 'Accept All',
      decline: 'Essential Only',
    },
    footer: {
      aboutText: 'For over 25 years your premier specialist in exclusive pre-owned vehicles in Antwerp. Certified Traxio member with 100% Car-Pass guarantee.',
      rights: 'All rights reserved.',
      dealerPortal: 'Dealer Portal',
      exportInfo: 'Export & EU Delivery',
      navigation: 'Navigation',
      stock: 'Our Cars (Stock)',
      valuation: 'Sell Your Car / Trade-In',
      financing: 'Financing Calculator',
      warranty: 'Traxio Warranty (12-24 mos)',
      about: 'About Auto Sale (1999)',
      openingHours: 'Opening Hours',
      contactDirections: 'Contact & Directions',
      traxioCertified: 'Certified Traxio',
      carPassPartner: 'Car-Pass Partner',
    }
  },

  fr: {
    nav: {
      stock: 'Nos Véhicules',
      valuation: 'Vendre / Reprise',
      financing: 'Financement',
      warranty: 'Garantie Traxio',
      about: 'À Propos',
      contact: 'Contact & Accès',
      dealerLogin: 'Espace Pro',
      testDrive: 'Essai Routier',
      favorites: 'Favoris',
    },
    hero: {
      badge: 'Concessionnaire Agréé Traxio • Depuis 1999',
      titleHighlight: 'VÉHICULES EXCLUSIFS',
      titleRest: '100% TRANSPARENCE',
      subtitle: 'Depuis plus de 25 ans votre spécialiste de référence en voitures d’occasion haut de gamme à Anvers. Certifié Car-Pass officiel avec garantie de 12 à 24 mois.',
      viewStock: 'Voir le Stock',
      sellCar: 'Estimation / Reprise',
      filterTitle: 'Trouvez Votre Voiture',
      brand: 'Marque',
      allBrands: 'Toutes les Marques',
      budget: 'Budget jusqu’à',
      fuel: 'Carburant',
      allFuels: 'Tous Carburants',
      searchButton: 'Rechercher',
      guaranteesTitle: 'Nos Engagements',
      statYears: 'Ans d’Expérience',
      statRating: 'Avis Google',
      statChecks: 'Points de Contrôle',
      statWarranty: 'Garantie Traxio',
      showroomOpen: 'Showroom Ouvert',
      hoursText: 'Lun-Jeu 10:00-19:00 | Ven jusqu’à 16:30',
      traxioHeader: 'Concessionnaire Traxio Agréé • 25+ Ans',
      carPass100: '100% Historique Car-Pass',
      checks113: '113 Points de Contrôle Traxio',
      googleScore: '4.9 / 5 Note Google (280+ avis)',
      directTakeover: 'Rachat Direct sous 24h',
      noLimit: 'Sans limite',
      upTo: 'Jusqu’à',
      petrol: 'Essence',
      diesel: 'Diesel',
      hybrid: 'Hybride',
      electric: '100% Électrique',
    },
    inventory: {
      title: 'Stock Actuel',
      subtitle: 'Tous nos véhicules sont disponibles immédiatement, contrôlés pour la vente avec Car-Pass et garantis au moins 12 mois.',
      searchPlaceholder: 'Rechercher marque, modèle, option...',
      tabAll: 'Tous les Véhicules',
      tabPremium: 'Sélection Premium',
      tabEco: 'Hybride & Électrique',
      tabExport: 'Export / B2B',
      filterToggle: 'Filtres',
      resetFilters: 'Réinitialiser',
      sortBy: 'Trier par',
      sortFeatured: 'Recommandés',
      sortPriceAsc: 'Prix : Croissant',
      sortPriceDesc: 'Prix : Décroissant',
      sortYearDesc: 'Année : Plus récent',
      sortKmAsc: 'Kilométrage : Plus bas',
      resultsCount: 'véhicules trouvés',
      soldBadge: 'VENDU',
      reservedBadge: 'RÉSERVÉ',
      availableBadge: 'DISPONIBLE',
      vatDeductible: 'TVA Récupérable',
      marginCar: 'Régime de la Marge',
      exportPrice: 'Export / Hors Taxe',
      perMonth: '/mois',
      detailsButton: 'Voir Détails',
      testDriveButton: 'Essai',
      emptyTitle: 'Aucun Véhicule dans cette Sélection',
      emptyText: 'Notre collection est mise à jour continuellement. Vous recherchez un véhicule précis ou un modèle particulier ?',
      emptyContact: 'Contactez Nos Conseillers',
      emptyDealerHint: 'Vous êtes l’administrateur ? Ajoutez des véhicules via le Tableau de Bord Concessionnaire.',
      similarCars: 'Véhicules Similaires',
      exportNotice: 'Acheteur International ? Plaques de transit, documents de douane et facturation intracommunautaire disponibles.',
      currentStock: 'Disponible',
      soldStock: 'Vendu',
      soldTitle: 'Véhicules Récemment Vendus',
      soldSubtitle: 'Découvrez les voitures exclusives récemment livrées par Auto Sale NV à des clients satisfaits.',
      fuelType: 'Type de carburant',
      transmission: 'Boîte de vitesse',
      allTransmissions: 'Toutes les boîtes',
      automatic: 'Automatique',
      manual: 'Manuelle',
      maxBudget: 'Budget jusqu’à',
      conciergeTitle: 'Recherche Personnalisée',
      conciergeSubtitle: 'Vous ne trouvez pas la voiture idéale ? Nous recherchons votre modèle dans notre réseau européen.',
      conciergeSubmit: 'Envoyer la Demande',
      conciergeSuccess: 'Demande reçue avec succès ! Nous vous recontacterons très vite.',
      loadSamples: 'Charger Véhicules Exemples',
    },
    carCard: {
      warranty: 'mois de Garantie',
      from: 'À partir de',
      notAvailable: 'Plus disponible',
      saveFavorite: 'Enregistrer en favoris',
      removeFavorite: 'Retirer des favoris',
      featured: 'En vedette',
    },
    carDetail: {
      specs: 'Caractéristiques Techniques',
      options: 'Options & Équipements',
      description: 'Description du Véhicule',
      watchVideo: 'Voir la Vidéo',
      viewAllPhotos: 'Voir toutes les photos en plein écran',
      carPassVerified: 'Certifié Car-Pass Officiel',
      warrantyBanner: 'Mois de Garantie Totale Traxio',
      monthlyEst: 'Estimation leasing / financement',
      planTestDrive: 'Réserver un Essai Routier',
      whatsappSeller: 'Poser une Question sur WhatsApp',
      callDirect: 'Appeler le Showroom',
      tradeInCta: 'Vous souhaitez faire reprendre votre voiture ? Calculez la reprise →',
      soldMessage: 'Ce véhicule est vendu et n’est plus disponible.',
      shareCar: 'Partager',
      copied: 'Lien copié !',
      photo: 'Photo',
      of: 'sur',
      warrantyNotice: 'Ce véhicule est certifié selon les normes strictes Traxio avec 113 points de contrôle et un historique Car-Pass garanti.',
      vatRecoverableNotice: 'TVA 21% récupérable pour les entreprises et indépendants',
      builtYear: 'Année',
      mileageLabel: 'Kilométrage',
      transmissionLabel: 'Boîte',
      fuelLabel: 'Carburant',
      powerLabel: 'Puissance',
      similarCarsTitle: 'Véhicules Similaires',
    },
    valuation: {
      title: 'Vendre ou Faire Reprendre Votre Voiture ?',
      subtitle: 'Recevez une offre de rachat ferme et conforme au marché sous 24h en toute simplicité.',
      badge: 'Rachat Direct & Estimation',
      step1: '1. Informations Véhicule',
      step2: '2. État & Photos',
      step3: '3. Contact & Offre',
      step1Title: 'Données du Véhicule',
      step2Title: 'État & Spécifications',
      step3Title: 'Vos Coordonnées',
      plate: 'Immatriculation (facultatif)',
      brandModel: 'Marque & Modèle',
      model: 'Modèle',
      year: 'Année',
      mileage: 'Kilométrage (km)',
      fuel: 'Carburant',
      transmission: 'Boîte de vitesse',
      condition: 'État Général',
      conditionExcellent: 'Excellent (aucun défaut)',
      conditionGood: 'Bon (usure normale)',
      conditionFair: 'Moyen / Quelques retouches',
      expectedPrice: 'Prix souhaité (€ - facultatif)',
      notes: 'Remarques ou options spécifiques',
      name: 'Nom & Prénom',
      phone: 'Téléphone',
      email: 'Adresse E-mail',
      submit: 'Demander une Offre de Rachat',
      nextStep: 'Étape Suivante',
      previousStep: 'Étape Précédente',
      successTitle: 'Demande Reçue avec Succès !',
      successText: 'Notre équipe vous contactera dans les 24 heures avec une proposition honnête et claire.',
      benefit1: 'Offre ferme garantie sous 24h',
      benefit2: 'Paiement direct par virement bancaire',
      benefit3: 'Sans engagement et sans tracas',
    },
    financing: {
      title: 'Calculateur de Financement',
      subtitle: 'Estimez vos mensualités indicatives pour un crédit auto ou un leasing financier.',
      badge: 'Financement & Leasing',
      calculateTitle: 'Calculez Vos Mensualités',
      calculateSubtitle: 'Que vous achetiez à titre privé ou professionnel : formules flexibles avec ou sans apport et avec valeur résiduelle.',
      carPrice: 'Prix du Véhicule (€)',
      downPayment: 'Acompte / Reprise (€)',
      balloonLabel: 'Valeur Résiduelle / Ballon (€)',
      duration: 'Durée (mois)',
      months: 'mois',
      monthlyPayment: 'Mensualité Estimée',
      monthlyEstTitle: 'Mensualité Indicative',
      totalCost: 'Coût Total du Financement',
      interestNote: 'Taux annuel fixe (TAEG / JKP)',
      disclaimer: 'Attention : emprunter de l’argent coûte aussi de l’argent. Calcul indicatif sous réserve d’acceptation.',
      applyTitle: 'Demande de Financement Sans Engagement',
      name: 'Votre Nom',
      phone: 'Numéro de Téléphone',
      sendApplication: 'Envoyer la Demande',
      appSubmitted: 'Demande Reçue ! Nous vous contacterons dans la journée.',
    },
    about: {
      badge: 'Label Traxio & Car-Pass',
      title: 'Conduite en Toute Sérénité avec Garantie Maximale',
      description: 'En tant que membre officiel de la fédération automobile belge Traxio, nous appliquons les normes de qualité les plus rigoureuses. Chaque véhicule subit une inspection approfondie sur 113 points de contrôle avec Car-Pass officiel.',
      bullet1: 'Garantie Complète de 12 à 24 Mois',
      bullet2: '100% Garantie Kilométrique Car-Pass',
      bullet3: '113 Points de Contrôle Certifiés',
      bullet4: 'Contrôle Technique Vierge pour la Vente',
      historyTitle: 'Plus de 25 Ans d’Expérience à Anvers',
      historyText: 'Depuis 1999, Auto Sale NV est synonyme de passion automobile, de transparence et d’un service personnalisé. Venez découvrir notre showroom à Hoboken (Anvers).',
      quote: '"La qualité n’est pas le fruit du hasard, mais celui de la rigueur et de la passion."',
      exploreBtn: 'Découvrir Nos Véhicules',
      valuationBtn: 'Vendre ou Faire Reprendre',
    },
    reviews: {
      badge: 'Avis Google',
      title: 'Ce Que Disent Nos Clients',
      score: '4.9 sur 5 Étoiles (280+ avis certifiés)',
      contactTitle: 'Contactez-Nous',
      contactSubtitle: 'Rendez-nous visite au showroom ou envoyez-nous un message. Nous vous répondons avec plaisir.',
      openingHoursTitle: 'Horaires d’Ouverture Showroom',
      monThu: 'Lundi - Jeudi : 10:00 - 19:00',
      friday: 'Vendredi : 10:00 - 16:30',
      saturday: 'Samedi : 10:00 - 18:00',
      sunday: 'Dimanche : Fermé (ou sur rendez-vous)',
      sendMessage: 'Envoyer le Message',
      messageSent: 'Message Envoyé ! Nous vous répondrons d’ici quelques heures.',
      name: 'Votre Nom',
      email: 'Adresse E-mail',
      phone: 'Numéro de Téléphone',
      subject: 'Objet',
      message: 'Votre Message',
      directions: 'Itinéraire & Accès',
      callNow: 'Appeler Maintenant',
      whatsappDirect: 'WhatsApp Direct',
    },
    testDrive: {
      title: 'Réserver un Essai Routier',
      subtitle: 'Découvrez le confort et la dynamique de conduite de votre future voiture en conditions réelles.',
      selectCar: 'Véhicule Sélectionné',
      date: 'Date Souhaitée',
      time: 'Créneau Horaire',
      fullName: 'Nom & Prénom',
      phone: 'Numéro de Téléphone',
      email: 'Adresse E-mail',
      drivingLicense: 'Je suis titulaire d’un permis de conduire valide',
      remarks: 'Remarques ou questions particulières',
      submit: 'Confirmer la Demande d’Essai',
      successTitle: 'Demande d’Essai Confirmée !',
      successText: 'Nous avons bien reçu votre demande et vous recontacterons très vite pour finaliser l’horaire.',
      close: 'Fermer',
    },
    favorites: {
      title: 'Véhicules Enregistrés',
      subtitle: 'Comparez vos modèles favoris',
      emptyTitle: 'Aucun Véhicule Enregistré',
      emptyText: 'Cliquez sur le cœur d’une voiture pour l’ajouter à votre liste de favoris.',
      clearAll: 'Tout Effacer',
      requestTestDrive: 'Demander un Essai',
      viewCar: 'Voir le Véhicule',
    },
    cookie: {
      title: 'Paramètres de Confidentialité & Cookies',
      text: 'Auto Sale NV respecte votre vie privée. Nous utilisons des cookies pour mémoriser vos préférences (langue et favoris). Conforme au RGPD.',
      accept: 'Tout Accepter',
      decline: 'Essentiels Seulement',
    },
    footer: {
      aboutText: 'Depuis plus de 25 ans votre concessionnaire spécialisé en voitures d’occasion haut de gamme à Anvers. Membre Traxio avec garantie Car-Pass 100%.',
      rights: 'Tous droits réservés.',
      dealerPortal: 'Espace Concessionnaire',
      exportInfo: 'Export & Vente UE',
      navigation: 'Navigation',
      stock: 'Nos Véhicules (Stock)',
      valuation: 'Vendre / Reprise',
      financing: 'Calculateur de Financement',
      warranty: 'Garantie Traxio (12-24 mois)',
      about: 'À Propos d’Auto Sale (1999)',
      openingHours: 'Horaires d’Ouverture',
      contactDirections: 'Contact & Accès',
      traxioCertified: 'Certifié Traxio',
      carPassPartner: 'Partenaire Car-Pass',
    }
  },

  de: {
    nav: {
      stock: 'Unsere Fahrzeuge',
      valuation: 'Auto Verkaufen / Inzahlungnahme',
      financing: 'Finanzierung',
      warranty: 'Traxio Garantie',
      about: 'Über Uns',
      contact: 'Kontakt & Anfahrt',
      dealerLogin: 'Händler-Login',
      testDrive: 'Probefahrt',
      favorites: 'Favoriten',
    },
    hero: {
      badge: 'Zertifizierter Traxio Händler • Gegründet 1999',
      titleHighlight: 'EXKLUSIVE FAHRZEUGE',
      titleRest: 'MIT 100% TRANSPARENZ',
      subtitle: 'Seit über 25 Jahren Ihr führender Partner für erstklassige, geprüfte Gebrauchtwagen in Antwerpen. Inklusive amtlichem Car-Pass & 12 bis 24 Monaten Garantie.',
      viewStock: 'Fahrzeuge Entdecken',
      sellCar: 'Auto Inzahlungnahme',
      filterTitle: 'Traumwagen Finden',
      brand: 'Marke',
      allBrands: 'Alle Marken',
      budget: 'Budget bis',
      fuel: 'Kraftstoff',
      allFuels: 'Alle Kraftstoffe',
      searchButton: 'Fahrzeuge Suchen',
      guaranteesTitle: 'Unsere Garantien',
      statYears: 'Jahre Erfahrung',
      statRating: 'Google Bewertung',
      statChecks: 'Prüfpunkte',
      statWarranty: 'Traxio Garantie',
      showroomOpen: 'Showroom Geöffnet',
      hoursText: 'Mo-Do 10:00-19:00 | Fr bis 16:30',
      traxioHeader: 'Zertifizierter Traxio Partner • 25+ Jahre',
      carPass100: '100% Car-Pass Historie',
      checks113: '113 Traxio Prüfpunkte',
      googleScore: '4.9 / 5 Google Score (280+ Bewertungen)',
      directTakeover: 'Direktankauf innerhalb von 24h',
      noLimit: 'Keine Grenze',
      upTo: 'Bis',
      petrol: 'Benzin',
      diesel: 'Diesel',
      hybrid: 'Hybrid',
      electric: '100% Elektrisch',
    },
    inventory: {
      title: 'Aktueller Fahrzeugbestand',
      subtitle: 'Alle Fahrzeuge sind sofort verfügbar, verkaufsgeprüft mit offiziellem Car-Pass und mindestens 12 Monaten Garantie.',
      searchPlaceholder: 'Nach Marke, Modell, Ausstattung suchen...',
      tabAll: 'Alle Fahrzeuge',
      tabPremium: 'Premium Auswahl',
      tabEco: 'Hybrid & Elektro',
      tabExport: 'Export / B2B',
      filterToggle: 'Filter',
      resetFilters: 'Filter Zurücksetzen',
      sortBy: 'Sortieren nach',
      sortFeatured: 'Empfohlen',
      sortPriceAsc: 'Preis: Aufsteigend',
      sortPriceDesc: 'Preis: Absteigend',
      sortYearDesc: 'Baujahr: Neueste zuerst',
      sortKmAsc: 'Kilometerstand: Niedrigste',
      resultsCount: 'Fahrzeuge gefunden',
      soldBadge: 'VERKAUFT',
      reservedBadge: 'RESERVIERT',
      availableBadge: 'VERFÜGBAR',
      vatDeductible: 'MwSt. Ausweisbar',
      marginCar: 'Differenzbesteuert',
      exportPrice: 'Export / Netto',
      perMonth: '/Monat',
      detailsButton: 'Details Ansehen',
      testDriveButton: 'Probefahrt',
      emptyTitle: 'Keine Fahrzeuge in dieser Auswahl',
      emptyText: 'Unser Bestand wird kontinuierlich aktualisiert. Suchen Sie ein bestimmtes Modell?',
      emptyContact: 'Verkaufsberater Kontaktieren',
      emptyDealerHint: 'Sind Sie der Verwalter? Fahrzeuge über das Händler-Dashboard hinzufügen.',
      similarCars: 'Ähnliche Fahrzeuge',
      exportNotice: 'Internationaler Käufer? Ausfuhrkennzeichen, Zollpapiere und Netto-Rechnungen verfügbar.',
      currentStock: 'Verfügbar',
      soldStock: 'Verkauft',
      soldTitle: 'Kürzlich Verkaufte Fahrzeuge',
      soldSubtitle: 'Entdecken Sie die Premium-Fahrzeuge, die vor kurzem durch Auto Sale NV übergeben wurden.',
      fuelType: 'Kraftstoffart',
      transmission: 'Getriebe',
      allTransmissions: 'Alle Getriebe',
      automatic: 'Automatik',
      manual: 'Schaltgetriebe',
      maxBudget: 'Budget bis',
      conciergeTitle: 'Fahrzeug-Suchauftrag',
      conciergeSubtitle: 'Nicht das passende Auto gefunden? Wir finden Ihr Wunschfahrzeug in unserem europäischen Netzwerk.',
      conciergeSubmit: 'Suchauftrag Senden',
      conciergeSuccess: 'Suchauftrag erfolgreich empfangen! Wir melden uns in Kürze.',
      loadSamples: 'Beispiel-Fahrzeuge Laden',
    },
    carCard: {
      warranty: 'Mon. Garantie',
      from: 'Ab',
      notAvailable: 'Nicht mehr verfügbar',
      saveFavorite: 'Als Favorit speichern',
      removeFavorite: 'Aus Favoriten entfernen',
      featured: 'Empfehlung',
    },
    carDetail: {
      specs: 'Technische Daten',
      options: 'Ausstattung & Extras',
      description: 'Fahrzeugbeschreibung',
      watchVideo: 'Video Ansehen',
      viewAllPhotos: 'Alle Fotos im Vollbildmodus',
      carPassVerified: 'Offizieller Car-Pass Geprüft',
      warrantyBanner: 'Monate Volle Traxio Garantie',
      monthlyEst: 'Leasing / Finanzierungsrate',
      planTestDrive: 'Probefahrt Vereinbaren',
      whatsappSeller: 'Frage via WhatsApp Stellen',
      callDirect: 'Showroom Anrufen',
      tradeInCta: 'Möchten Sie Ihr aktuelles Auto in Zahlung geben? Wert berechnen →',
      soldMessage: 'Dieses Fahrzeug wurde verkauft und ist nicht mehr verfügbar.',
      shareCar: 'Teilen',
      copied: 'Link kopiert!',
      photo: 'Foto',
      of: 'von',
      warrantyNotice: 'Dieses Fahrzeug erfüllt alle Traxio-Qualitätskriterien mit 113 Kontrollpunkten und amtlichem Car-Pass.',
      vatRecoverableNotice: 'MwSt. 21% ausweisbar für Gewerbekunden & Unternehmen',
      builtYear: 'Baujahr',
      mileageLabel: 'Kilometerstand',
      transmissionLabel: 'Getriebe',
      fuelLabel: 'Kraftstoff',
      powerLabel: 'Leistung',
      similarCarsTitle: 'Ähnliche Fahrzeuge',
    },
    valuation: {
      title: 'Auto Verkaufen oder In Zahlung Geben?',
      subtitle: 'Erhalten Sie innerhalb von 24 Stunden ein verbindliches, marktgerechtes Kaufangebot.',
      badge: 'Direktankauf & Bewertung',
      step1: '1. Fahrzeugdaten',
      step2: '2. Zustand & Fotos',
      step3: '3. Kontakt & Angebot',
      step1Title: 'Fahrzeuginformationen',
      step2Title: 'Zustand & Details',
      step3Title: 'Kontaktdaten',
      plate: 'Kennzeichen (optional)',
      brandModel: 'Marke & Modell',
      model: 'Modell',
      year: 'Baujahr',
      mileage: 'Kilometerstand (km)',
      fuel: 'Kraftstoff',
      transmission: 'Getriebe',
      condition: 'Gesamtzustand',
      conditionExcellent: 'Hervorragend (keine Schäden)',
      conditionGood: 'Gut (normale Gebrauchsspuren)',
      conditionFair: 'Befriedigend / Leichte Mängel',
      expectedPrice: 'Wunschpreis (€ - optional)',
      notes: 'Besondere Bemerkungen oder Extras',
      name: 'Ihr Name',
      phone: 'Telefonnummer',
      email: 'E-Mail-Adresse',
      submit: 'Unverbindliches Angebot Anfordern',
      nextStep: 'Nächster Schritt',
      previousStep: 'Vorheriger Schritt',
      successTitle: 'Anfrage Erfolgreich Erhalten!',
      successText: 'Unser Einkaufsteam kontaktiert Sie innerhalb von 24 Stunden mit einem fairen Angebot.',
      benefit1: 'Verbindliches Angebot innerhalb von 24h',
      benefit2: 'Sofortige Überweisung & Abwicklung',
      benefit3: 'Unverbindlich und ohne Verkaufsstress',
    },
    financing: {
      title: 'Finanzierungsrechner',
      subtitle: 'Berechnen Sie schnell Ihre monatliche Rate für Autokredit oder Leasing.',
      badge: 'Finanzierung & Leasing',
      calculateTitle: 'Berechnen Sie Ihre Monatsrate',
      calculateSubtitle: 'Ob Privatkauf oder gewerbliches Leasing: Wir bieten maßgeschneiderte Lösungen mit oder ohne Anzahlung.',
      carPrice: 'Fahrzeugkaufpreis (€)',
      downPayment: 'Anzahlung / Inzahlungnahme (€)',
      balloonLabel: 'Schlussrate / Restwert (€)',
      duration: 'Laufzeit (Monate)',
      months: 'Monate',
      monthlyPayment: 'Geschätzte Monatsrate',
      monthlyEstTitle: 'Monatliche Rate',
      totalCost: 'Gesamtkosten',
      interestNote: 'Fester Jahreszins (effektiver Jahreszins)',
      disclaimer: 'Hinweis: Kreditvergabe vorbehaltlich Bonitätsprüfung. Unverbindliche Beispielrechnung.',
      applyTitle: 'Unverbindliche Kreditanfrage',
      name: 'Ihr Name',
      phone: 'Telefonnummer',
      sendApplication: 'Anfrage Absenden',
      appSubmitted: 'Anfrage Eingegangen! Wir setzen uns umgehend mit Ihnen in Verbindung.',
    },
    about: {
      badge: 'Traxio Gütesiegel & Car-Pass',
      title: 'Sorgenfreies Fahren mit Höchster Sicherheit',
      description: 'Als zertifiziertes Mitglied des belgischen Automobilverbandes Traxio garantieren wir höchste Standards. Jedes Auto durchläuft eine 113-Punkte-Inspektion mit Car-Pass und TÜV.',
      bullet1: '12 bis 24 Monate Umfassende Garantie',
      bullet2: '100% Car-Pass Kilometergarantie',
      bullet3: '113 Qualitätsprüfpunkte Bestanden',
      bullet4: 'Mängelfreie Hauptuntersuchung für den Verkauf',
      historyTitle: 'Über 25 Jahre Erfahrung in Antwerpen',
      historyText: 'Seit 1999 steht Auto Sale NV für automobile Leidenschaft, Ehrlichkeit und erstklassigen Service. Besuchen Sie unseren Showroom in Hoboken (Antwerpen).',
      quote: '"Qualität ist kein Zufall, sondern das Ergebnis von Leidenschaft und strenger Selektion."',
      exploreBtn: 'Fahrzeuge Ansehen',
      valuationBtn: 'Auto Verkaufen / Eintauschen',
    },
    reviews: {
      badge: 'Google Bewertungen',
      title: 'Kundenstimmen & Erfahrungen',
      score: '4.9 von 5 Sternen (280+ verifizierte Bewertungen)',
      contactTitle: 'Kontaktieren Sie Uns',
      contactSubtitle: 'Besuchen Sie uns im Showroom oder schreiben Sie uns. Wir helfen Ihnen gerne weiter.',
      openingHoursTitle: 'Öffnungszeiten Showroom',
      monThu: 'Montag - Donnerstag: 10:00 - 19:00',
      friday: 'Freitag: 10:00 - 16:30',
      saturday: 'Samstag: 10:00 - 18:00',
      sunday: 'Sonntag: Geschlossen (oder nach Vereinbarung)',
      sendMessage: 'Nachricht Senden',
      messageSent: 'Nachricht Gesendet! Wir antworten innerhalb weniger Stunden.',
      name: 'Ihr Name',
      email: 'E-Mail-Adresse',
      phone: 'Telefonnummer',
      subject: 'Betreff',
      message: 'Ihre Nachricht',
      directions: 'Anfahrt & Route',
      callNow: 'Jetzt Anrufen',
      whatsappDirect: 'WhatsApp Chat',
    },
    testDrive: {
      title: 'Probefahrt Vereinbaren',
      subtitle: 'Erleben Sie Fahrdynamik und Komfort Ihres Wunschautos direkt auf der Straße.',
      selectCar: 'Ausgewähltes Fahrzeug',
      date: 'Wunschdatum',
      time: 'Uhrzeit',
      fullName: 'Vollständiger Name',
      phone: 'Telefonnummer',
      email: 'E-Mail-Adresse',
      drivingLicense: 'Ich besitze einen gültigen Führerschein',
      remarks: 'Besondere Wünsche oder Fragen',
      submit: 'Probefahrt Verbindlich Anfragen',
      successTitle: 'Probefahrt Angefragt!',
      successText: 'Wir haben Ihre Anfrage erhalten und melden uns kurzfristig zur Bestätigung des Termins.',
      close: 'Schließen',
    },
    favorites: {
      title: 'Gespeicherte Fahrzeuge',
      subtitle: 'Vergleichen Sie Ihre Favoriten',
      emptyTitle: 'Noch Keine Favoriten',
      emptyText: 'Klicken Sie auf das Herz-Symbol, um Fahrzeuge zu Ihrer Merkliste hinzuzufügen.',
      clearAll: 'Alle Löschen',
      requestTestDrive: 'Probefahrt Anfragen',
      viewCar: 'Fahrzeug Ansehen',
    },
    cookie: {
      title: 'Datenschutz & Cookie-Einstellungen',
      text: 'Auto Sale NV respektiert Ihre Privatsphäre. Wir nutzen funktionale Cookies, um Sprache und Favoriten zu speichern. DSGVO-konform.',
      accept: 'Alle Akzeptieren',
      decline: 'Nur Notwendige',
    },
    footer: {
      aboutText: 'Seit über 25 Jahren Ihr führender Spezialist für exklusive Gebrauchtwagen in Antwerpen. Traxio-Mitglied mit 100% Car-Pass Qualitätsgarantie.',
      rights: 'Alle Rechte vorbehalten.',
      dealerPortal: 'Händler-Login',
      exportInfo: 'Export & EU-Lieferung',
      navigation: 'Navigation',
      stock: 'Unsere Fahrzeuge (Bestand)',
      valuation: 'Auto Verkaufen / Inzahlungnahme',
      financing: 'Finanzierungsrechner',
      warranty: 'Traxio Garantie (12-24 Monate)',
      about: 'Über Auto Sale (1999)',
      openingHours: 'Öffnungszeiten',
      contactDirections: 'Kontakt & Anfahrt',
      traxioCertified: 'Traxio Zertifiziert',
      carPassPartner: 'Car-Pass Partner',
    }
  },

  es: {
    nav: {
      stock: 'Nuestros Vehículos',
      valuation: 'Vender Coche / Tasación',
      financing: 'Financiación',
      warranty: 'Garantía Traxio',
      about: 'Sobre Nosotros',
      contact: 'Contacto y Ubicación',
      dealerLogin: 'Portal Concesionario',
      testDrive: 'Prueba de Conducción',
      favorites: 'Favoritos',
    },
    hero: {
      badge: 'Concesionario Homologado Traxio • Desde 1999',
      titleHighlight: 'VEHÍCULOS EXCLUSIVOS',
      titleRest: 'CON 100% TRANSPARENCIA',
      subtitle: 'Más de 25 años como líder en vehículos seminuevos premium seleccionados en Amberes. Con Car-Pass oficial y hasta 24 meses de garantía.',
      viewStock: 'Ver Vehículos',
      sellCar: 'Tasación / Vender Coche',
      filterTitle: 'Encuentre su Coche Ideal',
      brand: 'Marca',
      allBrands: 'Todas las Marcas',
      budget: 'Presupuesto hasta',
      fuel: 'Combustible',
      allFuels: 'Todos los Combustibles',
      searchButton: 'Buscar Coches',
      guaranteesTitle: 'Nuestras Garantías',
      statYears: 'Años de Experiencia',
      statRating: 'Puntuación Google',
      statChecks: 'Puntos de Control',
      statWarranty: 'Garantía Traxio',
      showroomOpen: 'Exposición Abierta',
      hoursText: 'Lun-Jue 10:00-19:00 | Vie hasta 16:30',
      traxioHeader: 'Concesionario Certificado Traxio • 25+ Años',
      carPass100: '100% Historial Car-Pass',
      checks113: '113 Puntos de Control Traxio',
      googleScore: '4.9 / 5 Valoración Google (280+ reseñas)',
      directTakeover: 'Compra Directa en 24h',
      noLimit: 'Sin límite',
      upTo: 'Hasta',
      petrol: 'Gasolina',
      diesel: 'Diésel',
      hybrid: 'Híbrido',
      electric: '100% Eléctrico',
    },
    inventory: {
      title: 'Stock Actual',
      subtitle: 'Todos los vehículos están disponibles de inmediato, revisados con Car-Pass y mínimo 12 meses de garantía.',
      searchPlaceholder: 'Buscar por marca, modelo, equipamiento...',
      tabAll: 'Todos los Coches',
      tabPremium: 'Selección Premium',
      tabEco: 'Híbridos y Eléctricos',
      tabExport: 'Exportación / B2B',
      filterToggle: 'Filtros',
      resetFilters: 'Borrar Filtros',
      sortBy: 'Ordenar por',
      sortFeatured: 'Destacados',
      sortPriceAsc: 'Precio: Menor a Mayor',
      sortPriceDesc: 'Precio: Mayor a Menor',
      sortYearDesc: 'Año: Más recientes primero',
      sortKmAsc: 'Kilometraje: Menor primero',
      resultsCount: 'vehículos encontrados',
      soldBadge: 'VENDIDO',
      reservedBadge: 'RESERVADO',
      availableBadge: 'DISPONIBLE',
      vatDeductible: 'IVA Deducible',
      marginCar: 'Régimen Especial',
      exportPrice: 'Exportación / Neto',
      perMonth: '/mes',
      detailsButton: 'Ver Detalles',
      testDriveButton: 'Prueba',
      emptyTitle: 'No Hay Vehículos en Esta Selección',
      emptyText: 'Nuestro inventario se actualiza constantemente. ¿Busca un modelo en concreto?',
      emptyContact: 'Contactar Asesor de Ventas',
      emptyDealerHint: '¿Es el administrador? Añada vehículos desde el panel de gestión.',
      similarCars: 'Vehículos Similares',
      exportNotice: '¿Comprador Internacional? Matrículas de exportación y facturación intracomunitaria sin IVA.',
      currentStock: 'Disponible',
      soldStock: 'Vendido',
      soldTitle: 'Vehículos Vendidos Recientemente',
      soldSubtitle: 'Descubra los vehículos exclusivos entregados recientemente por Auto Sale NV.',
      fuelType: 'Tipo de combustible',
      transmission: 'Transmisión',
      allTransmissions: 'Todas las transmisiones',
      automatic: 'Automático',
      manual: 'Manual',
      maxBudget: 'Presupuesto hasta',
      conciergeTitle: 'Búsqueda a Medida',
      conciergeSubtitle: '¿No encuentra el coche que busca? Lo localizamos para usted en nuestra red europea.',
      conciergeSubmit: 'Enviar Solicitud',
      conciergeSuccess: '¡Solicitud recibida con éxito! Nos pondremos en contacto pronto.',
      loadSamples: 'Cargar Coches de Prueba',
    },
    carCard: {
      warranty: 'meses de Garantía',
      from: 'Desde',
      notAvailable: 'Ya no disponible',
      saveFavorite: 'Guardar en favoritos',
      removeFavorite: 'Quitar de favoritos',
      featured: 'Destacado',
    },
    carDetail: {
      specs: 'Especificaciones Técnicas',
      options: 'Opciones y Equipamiento',
      description: 'Descripción del Vehículo',
      watchVideo: 'Ver Vídeo',
      viewAllPhotos: 'Ver fotos en pantalla completa',
      carPassVerified: 'Car-Pass Oficial Verificado',
      warrantyBanner: 'Meses de Garantía Total Traxio',
      monthlyEst: 'Cuota de Leasing / Financiación',
      planTestDrive: 'Reservar Prueba de Conducción',
      whatsappSeller: 'Preguntar por WhatsApp',
      callDirect: 'Llamar al Concesionario',
      tradeInCta: '¿Desea entregar su coche actual como parte de pago? Calcule el valor →',
      soldMessage: 'Este vehículo ha sido vendido y ya no está disponible.',
      shareCar: 'Compartir Vehículo',
      copied: '¡Enlace copiado!',
      photo: 'Foto',
      of: 'de',
      warrantyNotice: 'Vehículo certificado bajo rigurosos estándares Traxio con inspección de 113 puntos y Car-Pass.',
      vatRecoverableNotice: 'IVA 21% deducible para empresas y autónomos',
      builtYear: 'Año',
      mileageLabel: 'Kilometraje',
      transmissionLabel: 'Caja de cambios',
      fuelLabel: 'Combustible',
      powerLabel: 'Potencia',
      similarCarsTitle: 'Vehículos Similares',
    },
    valuation: {
      title: '¿Vender o Cambiar su Coche?',
      subtitle: 'Reciba una oferta de compra vinculante y a precio de mercado en 24 horas sin complicaciones.',
      badge: 'Compra Directa y Tasación',
      step1: '1. Datos del Coche',
      step2: '2. Estado y Fotos',
      step3: '3. Contacto y Oferta',
      step1Title: 'Información del Vehículo',
      step2Title: 'Estado y Detalles',
      step3Title: 'Datos de Contacto',
      plate: 'Matrícula (opcional)',
      brandModel: 'Marca y Modelo',
      model: 'Modelo',
      year: 'Año',
      mileage: 'Kilometraje (km)',
      fuel: 'Combustible',
      transmission: 'Transmisión',
      condition: 'Estado General',
      conditionExcellent: 'Excelente (sin desperfectos)',
      conditionGood: 'Bueno (desgaste normal)',
      conditionFair: 'Aceptable / Pequeños detalles',
      expectedPrice: 'Precio deseado (€ - opcional)',
      notes: 'Observaciones o equipamiento adicional',
      name: 'Nombre y Apellidos',
      phone: 'Teléfono de Contacto',
      email: 'Correo Electrónico',
      submit: 'Solicitar Oferta Sin Compromiso',
      nextStep: 'Siguiente Paso',
      previousStep: 'Paso Anterior',
      successTitle: '¡Solicitud Recibida Correctamente!',
      successText: 'Nuestro equipo de compras le contactará en menos de 24 horas con una oferta transparente.',
      benefit1: 'Oferta firme garantizada en 24h',
      benefit2: 'Pago inmediato por transferencia bancaria',
      benefit3: 'Sin compromiso y sin complicaciones',
    },
    financing: {
      title: 'Calculadora de Financiación',
      subtitle: 'Calcule cómodamente sus cuotas mensuales para préstamo o leasing.',
      badge: 'Financiación y Leasing',
      calculateTitle: 'Calcule su Cuota Mensual',
      calculateSubtitle: 'Tanto para particulares como empresas: fórmulas flexibles con o sin entrada y valor residual.',
      carPrice: 'Precio del Vehículo (€)',
      downPayment: 'Entrada / Valor de Entrega (€)',
      balloonLabel: 'Valor Residual / Cuota Final (€)',
      duration: 'Plazo (meses)',
      months: 'meses',
      monthlyPayment: 'Cuota Mensual Estimada',
      monthlyEstTitle: 'Cuota Estimada',
      totalCost: 'Coste Total Financiado',
      interestNote: 'Tipo de interés fijo (TIN / TAE)',
      disclaimer: 'Aviso: La concesión está sujeta a aprobación crediticia. Cálculo meramente orientativo.',
      applyTitle: 'Solicitud de Financiación Sin Compromiso',
      name: 'Su Nombre',
      phone: 'Número de Teléfono',
      sendApplication: 'Enviar Solicitud',
      appSubmitted: '¡Solicitud Recibida! Nos pondremos en contacto hoy mismo.',
    },
    about: {
      badge: 'Sello Traxio y Car-Pass',
      title: 'Conducción Tranquila con la Máxima Seguridad',
      description: 'Como miembro homologado de la federación automovilística belga Traxio, cumplimos los controles más estrictos. Cada vehículo se somete a una inspección de 113 puntos de control y cuenta con Car-Pass.',
      bullet1: '12 a 24 Meses de Garantía Completa',
      bullet2: '100% Garantía de Kilometraje Car-Pass',
      bullet3: '113 Puntos de Control Superados',
      bullet4: 'ITV Limpia Lista para Entrega',
      historyTitle: 'Más de 25 Años de Historia en Amberes',
      historyText: 'Desde 1999, Auto Sale NV es sinónimo de pasión por el motor, honestidad y atención personalizada. Le esperamos en nuestra moderna exposición en Hoboken (Amberes).',
      quote: '"La calidad no es fruto de la casualidad, sino de la pasión y la rigurosa selección."',
      exploreBtn: 'Ver Nuestros Coches',
      valuationBtn: 'Tasación / Vender Coche',
    },
    reviews: {
      badge: 'Opiniones en Google',
      title: 'Lo Que Opinan Nuestros Clientes',
      score: '4.9 sobre 5 Estrellas (280+ valoraciones reales)',
      contactTitle: 'Contáctenos',
      contactSubtitle: 'Venga a visitarnos a nuestra exposición o envíenos un mensaje.',
      openingHoursTitle: 'Horario de Exposición',
      monThu: 'Lunes - Jueves: 10:00 - 19:00',
      friday: 'Viernes: 10:00 - 16:30',
      saturday: 'Sábado: 10:00 - 18:00',
      sunday: 'Domingo: Cerrado (o con cita previa)',
      sendMessage: 'Enviar Mensaje',
      messageSent: '¡Mensaje Enviado! Le responderemos en pocas horas.',
      name: 'Su Nombre',
      email: 'Correo Electrónico',
      phone: 'Teléfono',
      subject: 'Asunto',
      message: 'Su Mensaje',
      directions: 'Cómo Llegar',
      callNow: 'Llamar al Concesionario',
      whatsappDirect: 'WhatsApp Directo',
    },
    testDrive: {
      title: 'Reservar Prueba de Conducción',
      subtitle: 'Compruebe usted mismo las sensaciones y el confort de su coche elegido en carretera.',
      selectCar: 'Vehículo Seleccionado',
      date: 'Fecha Deseada',
      time: 'Franja Horaria',
      fullName: 'Nombre y Apellidos',
      phone: 'Teléfono de Contacto',
      email: 'Correo Electrónico',
      drivingLicense: 'Dispongo de carnet de conducir en vigor',
      remarks: 'Observaciones o preguntas',
      submit: 'Confirmar Reserva de Prueba',
      successTitle: '¡Prueba Reservada con Éxito!',
      successText: 'Hemos recibido su solicitud y le contactaremos rápidamente para coordinar la hora exacta.',
      close: 'Cerrar',
    },
    favorites: {
      title: 'Vehículos Guardados',
      subtitle: 'Compare sus modelos favoritos',
      emptyTitle: 'Sin Favoritos Todavía',
      emptyText: 'Haga clic en el corazón de cualquier coche para guardarlo en su lista.',
      clearAll: 'Borrar Todo',
      requestTestDrive: 'Pedir Prueba',
      viewCar: 'Ver Vehículo',
    },
    cookie: {
      title: 'Privacidad y Ajustes de Cookies',
      text: 'Auto Sale NV respeta su privacidad. Empleamos cookies para guardar sus preferencias de idioma y coches guardados conforme al RGPD.',
      accept: 'Aceptar Todo',
      decline: 'Solo Esenciales',
    },
    footer: {
      aboutText: 'Más de 25 años como su especialista de referencia en seminuevos exclusivos en Amberes. Miembro Traxio con garantía Car-Pass 100%.',
      rights: 'Todos los derechos reservados.',
      dealerPortal: 'Acceso Concesionario',
      exportInfo: 'Exportación y Entrega en la UE',
      navigation: 'Navegación',
      stock: 'Nuestros Coches (Stock)',
      valuation: 'Vender Coche / Tasación',
      financing: 'Calculadora de Financiación',
      warranty: 'Garantía Traxio (12-24 meses)',
      about: 'Sobre Auto Sale (1999)',
      openingHours: 'Horarios de Atención',
      contactDirections: 'Contacto y Ubicación',
      traxioCertified: 'Certificado Traxio',
      carPassPartner: 'Socio Car-Pass',
    }
  },

  pl: {
    nav: {
      stock: 'Nasze Samochody',
      valuation: 'Sprzedaj Auto / Wycena',
      financing: 'Finansowanie',
      warranty: 'Gwarancja Traxio',
      about: 'O Nas',
      contact: 'Kontakt i Dojazd',
      dealerLogin: 'Strefa Dealera',
      testDrive: 'Jazda Próbna',
      favorites: 'Ulubione',
    },
    hero: {
      badge: 'Certyfikowany Dealer Traxio • Od 1999 roku',
      titleHighlight: 'EKSKLUZYWNE SAMOCHODY',
      titleRest: '100% PRZEJRZYSTOŚCI',
      subtitle: 'Od ponad 25 lat Twój zaufany salon starannie wyselekcjonowanych aut używanych klasy premium w Antwerpii. Pełny certyfikat Car-Pass i gwarancja do 24 miesięcy.',
      viewStock: 'Zobacz Samochody',
      sellCar: 'Sprzedaj / Wycena Auta',
      filterTitle: 'Znajdź Wymarzone Auto',
      brand: 'Marka',
      allBrands: 'Wszystkie Marki',
      budget: 'Budżet do',
      fuel: 'Paliwo',
      allFuels: 'Wszystkie Paliwa',
      searchButton: 'Szukaj Samochodów',
      guaranteesTitle: 'Nasze Gwarancje',
      statYears: 'Lat Doświadczenia',
      statRating: 'Ocena Google',
      statChecks: 'Punktów Kontroli',
      statWarranty: 'Gwarancja Traxio',
      showroomOpen: 'Salon Otwarty',
      hoursText: 'Pon-Czw 10:00-19:00 | Pt do 16:30',
      traxioHeader: 'Certyfikowany Dealer Traxio • 25+ Lat',
      carPass100: '100% Historia Car-Pass',
      checks113: '113 Punktów Kontroli Traxio',
      googleScore: '4.9 / 5 Ocena Google (280+ opinii)',
      directTakeover: 'Szybki Skup Aut w 24h',
      noLimit: 'Bez limitu',
      upTo: 'Do',
      petrol: 'Benzyna',
      diesel: 'Diesel',
      hybrid: 'Hybryda',
      electric: '100% Elektryczny',
    },
    inventory: {
      title: 'Dostępne Samochody',
      subtitle: 'Każdy pojazd jest gotowy do odbioru, sprawdzony przed sprzedażą z Car-Pass i objęty minimum 12-miesięczną gwarancją.',
      searchPlaceholder: 'Szukaj marki, modelu, wyposażenia...',
      tabAll: 'Wszystkie Auta',
      tabPremium: 'Klasa Premium',
      tabEco: 'Hybrydy i Elektryczne',
      tabExport: 'Eksport / B2B',
      filterToggle: 'Filtry',
      resetFilters: 'Wyczyść Filtry',
      sortBy: 'Sortuj według',
      sortFeatured: 'Polecane',
      sortPriceAsc: 'Cena: Od najniższej',
      sortPriceDesc: 'Cena: Od najwyższej',
      sortYearDesc: 'Rok: Od najnowszego',
      sortKmAsc: 'Przebieg: Od najniższego',
      resultsCount: 'znalezionych aut',
      soldBadge: 'SPRZEDANY',
      reservedBadge: 'ZAREZERWOWANY',
      availableBadge: 'DOSTĘPNY',
      vatDeductible: 'Faktura VAT 21%',
      marginCar: 'VAT Marża',
      exportPrice: 'Eksport / Netto',
      perMonth: '/mies.',
      detailsButton: 'Zobacz Szczegóły',
      testDriveButton: 'Jazda Próbna',
      emptyTitle: 'Brak Aut w Tej Kategorii',
      emptyText: 'Nasza kolekcja jest na bieżąco uzupełniana. Szukasz konkretnego modelu na zamówienie?',
      emptyContact: 'Skontaktuj się z Doradcą',
      emptyDealerHint: 'Jesteś administratorem? Dodaj auta w Panelu Dealera.',
      similarCars: 'Podobne Samochody',
      exportNotice: 'Kupujący z Zagranicy? Tablice wywozowe, odprawa celna i faktury wewnątrzwspólnotowe 0% VAT.',
      currentStock: 'Dostępne',
      soldStock: 'Sprzedane',
      soldTitle: 'Ostatnio Sprzedane Samochody',
      soldSubtitle: 'Zobacz wyjątkowe auta, które niedawno trafiły do zadowolonych kierowców.',
      fuelType: 'Rodzaj paliwa',
      transmission: 'Skrzynia biegów',
      allTransmissions: 'Wszystkie skrzynie',
      automatic: 'Automatyczna',
      manual: 'Manualna',
      maxBudget: 'Budżet do',
      conciergeTitle: 'Wyszukiwanie na Zamówienie',
      conciergeSubtitle: 'Nie znalazłeś idealnego auta? Sprowadzimy wymarzony model z naszej sieci w Europie.',
      conciergeSubmit: 'Wyślij Zapytanie',
      conciergeSuccess: 'Zapytanie zostało wysłane! Wkrótce się z Tobą skontaktujemy.',
      loadSamples: 'Załaduj Przykładowe Auta',
    },
    carCard: {
      warranty: 'mies. Gwarancji',
      from: 'Od',
      notAvailable: 'Niedostępny',
      saveFavorite: 'Dodaj do ulubionych',
      removeFavorite: 'Usuń z ulubionych',
      featured: 'Polecany',
    },
    carDetail: {
      specs: 'Specyfikacja Techniczna',
      options: 'Wyposażenie i Opcje',
      description: 'Opis Pojazdu',
      watchVideo: 'Obejrzyj Wideo',
      viewAllPhotos: 'Wszystkie zdjęcia na pełnym ekranie',
      carPassVerified: 'Zweryfikowany Car-Pass',
      warrantyBanner: 'Miesięcy Pełnej Gwarancji Traxio',
      monthlyEst: 'Rata Leasingu / Kredytu',
      planTestDrive: 'Umów się na Jazdę Próbną',
      whatsappSeller: 'Zapytaj przez WhatsApp',
      callDirect: 'Zadzwoń do Salonu',
      tradeInCta: 'Chcesz zostawić swoje auto w rozliczeniu? Oblicz wartość →',
      soldMessage: 'Ten samochód został sprzedany i nie jest już dostępny.',
      shareCar: 'Udostępnij',
      copied: 'Link skopiowany!',
      photo: 'Zdjęcie',
      of: 'z',
      warrantyNotice: 'Samochód certyfikowany według surowych norm Traxio po weryfikacji 113 punktów z pewnym przebiegiem Car-Pass.',
      vatRecoverableNotice: 'Możliwość odliczenia 21% VAT dla firm i przedsiębiorców',
      builtYear: 'Rok produkcji',
      mileageLabel: 'Przebieg',
      transmissionLabel: 'Skrzynia',
      fuelLabel: 'Paliwo',
      powerLabel: 'Moc',
      similarCarsTitle: 'Podobne Samochody',
    },
    valuation: {
      title: 'Sprzedaj lub Zamień Swoje Auto',
      subtitle: 'Otrzymaj wiążącą, rynkową ofertę odkupu w ciągu 24 godzin bez zbędnych formalności.',
      badge: 'Szybki Skup i Wycena',
      step1: '1. Dane Pojazdu',
      step2: '2. Stan i Zdjęcia',
      step3: '3. Kontakt i Oferta',
      step1Title: 'Dane Samochodu',
      step2Title: 'Stan i Wyposażenie',
      step3Title: 'Dane Kontaktowe',
      plate: 'Numer rejestracyjny (opcjonalnie)',
      brandModel: 'Marka i Model',
      model: 'Model',
      year: 'Rok produkcji',
      mileage: 'Przebieg (km)',
      fuel: 'Paliwo',
      transmission: 'Skrzynia biegów',
      condition: 'Stan Ogólny',
      conditionExcellent: 'Idealny (brak uszkodzeń)',
      conditionGood: 'Dobry (normalne ślady użytkowania)',
      conditionFair: 'Średni / Drobne uszkodzenia',
      expectedPrice: 'Oczekiwana cena (€ - opcjonalnie)',
      notes: 'Dodatkowe uwagi lub opcje wyposażenia',
      name: 'Imię i Nazwisko',
      phone: 'Numer Telefonu',
      email: 'Adres E-mail',
      submit: 'Poproś o Niezobowiązującą Wycenę',
      nextStep: 'Następny Krok',
      previousStep: 'Poprzedni Krok',
      successTitle: 'Zgłoszenie Zostało Wysłane!',
      successText: 'Nasz dział skupu skontaktuje się z Tobą w ciągu 24 godzin z uczciwą ofertą cenową.',
      benefit1: 'Wiążąca wycena w 24 godziny',
      benefit2: 'Błyskawiczny przelew bankowy',
      benefit3: 'Bezpiecznie i bez stresu sprzedażowego',
    },
    financing: {
      title: 'Kalkulator Finansowania',
      subtitle: 'Oblicz orientacyjną miesięczną ratę kredytu lub leasingu samochodowego.',
      badge: 'Finansowanie i Leasing',
      calculateTitle: 'Oblicz Swoją Miesięczną Ratę',
      calculateSubtitle: 'Dla klientów indywidualnych oraz firm: elastyczne plany z wpłatą własną lub bez oraz z wykupem.',
      carPrice: 'Cena Samochodu (€)',
      downPayment: 'Wpłata Własna / Wartość Auta (€)',
      balloonLabel: 'Wartość Wykupu / Ostatnia Rata (€)',
      duration: 'Okres Finansowania (miesiące)',
      months: 'miesięcy',
      monthlyPayment: 'Szacunkowa Rata Miesięczna',
      monthlyEstTitle: 'Szacunkowa Rata',
      totalCost: 'Całkowity Koszt Finansowania',
      interestNote: 'Stałe oprocentowanie roczne (RRSO)',
      disclaimer: 'Uwaga: Oferta ma charakter poglądowy i zależy od pozytywnej oceny zdolności kredytowej.',
      applyTitle: 'Niezobowiązujący Wniosek o Finansowanie',
      name: 'Twoje Imię i Nazwisko',
      phone: 'Numer Telefonu',
      sendApplication: 'Wyślij Wniosek',
      appSubmitted: 'Wniosek Przyjęty! Skontaktujemy się z Tobą jeszcze dzisiaj.',
    },
    about: {
      badge: 'Certyfikat Traxio i Car-Pass',
      title: 'Bezpieczna Jazda z Najwyższą Gwarancją Jakości',
      description: 'Jako oficjalny członek belgijskiej federacji motoryzacyjnej Traxio stosujemy najbardziej rygorystyczne normy. Każdy pojazd przechodzi 113-punktowy przegląd techniczny z certyfikatem Car-Pass.',
      bullet1: 'Pełna Gwarancja od 12 do 24 Miesięcy',
      bullet2: '100% Pewny Przebieg z Certyfikatem Car-Pass',
      bullet3: '113 Punktów Kontroli Jakości',
      bullet4: 'Czysty Belgijski Przegląd Techniczny',
      historyTitle: 'Ponad 25 Lat Doświadczenia w Antwerpii',
      historyText: 'Od 1999 roku Auto Sale NV to synonim pasji do motoryzacji, uczciwości i indywidualnego podejścia. Zapraszamy do naszego przestronnego salonu w Hoboken (Antwerpia).',
      quote: '"Jakość to nie przypadek, lecz wynik pasji i rygorystycznej selekcji."',
      exploreBtn: 'Zobacz Samochody',
      valuationBtn: 'Wycena / Sprzedaj Auto',
    },
    reviews: {
      badge: 'Opinie Google',
      title: 'Co Mówią Nasi Klienci',
      score: '4.9 na 5 Gwiazdek (ponad 280 opinii)',
      contactTitle: 'Skontaktuj się z Nami',
      contactSubtitle: 'Odwiedź nasz salon w Antwerpii lub napisz do nas. Z przyjemnością pomożemy.',
      openingHoursTitle: 'Godziny Otwarcia Salonu',
      monThu: 'Poniedziałek - Czwartek: 10:00 - 19:00',
      friday: 'Piątek: 10:00 - 16:30',
      saturday: 'Sobota: 10:00 - 18:00',
      sunday: 'Niedziela: Zamknięte (lub po umówieniu)',
      sendMessage: 'Wyślij Wiadomość',
      messageSent: 'Wiadomość Wysłana! Odpowiemy w ciągu kilku godzin.',
      name: 'Twoje Imię',
      email: 'Adres E-mail',
      phone: 'Numer Telefonu',
      subject: 'Temat',
      message: 'Treść Wiadomości',
      directions: 'Jak Dojechać',
      callNow: 'Zadzwoń Teraz',
      whatsappDirect: 'Napisz na WhatsApp',
    },
    testDrive: {
      title: 'Zarezerwuj Jazdę Próbną',
      subtitle: 'Poczuj komfort, dynamikę i precyzję prowadzenia wybranego auta na drodze.',
      selectCar: 'Wybrany Samochód',
      date: 'Preferowana Data',
      time: 'Godzina',
      fullName: 'Imię i Nazwisko',
      phone: 'Numer Telefonu',
      email: 'Adres E-mail',
      drivingLicense: 'Posiadam ważne prawo jazdy kat. B',
      remarks: 'Dodatkowe uwagi lub pytania',
      submit: 'Potwierdź Rezerwację Jazdy',
      successTitle: 'Jazda Próbna Zarezerwowana!',
      successText: 'Otrzymaliśmy Twoje zgłoszenie. Skontaktujemy się niezwłocznie, aby potwierdzić termin.',
      close: 'Zamknij',
    },
    favorites: {
      title: 'Zapisane Samochody',
      subtitle: 'Porównaj swoje ulubione modele',
      emptyTitle: 'Brak Zapisanych Aut',
      emptyText: 'Kliknij ikonę serduszka przy dowolnym aucie, aby dodać je do listy ulubionych.',
      clearAll: 'Wyczyść Wszystko',
      requestTestDrive: 'Poproś o Jazdę Próbną',
      viewCar: 'Zobacz Samochód',
    },
    cookie: {
      title: 'Ustawienia Prywatności i Plików Cookie',
      text: 'Auto Sale NV szanuje Twoją prywatność. Używamy plików cookie w celu zapamiętania preferencji językowych oraz zapisanych aut. Zgodnie z RODO.',
      accept: 'Zaakceptuj Wszystkie',
      decline: 'Tylko Niezbędne',
    },
    footer: {
      aboutText: 'Od ponad 25 lat Twój wiodący salon ekskluzywnych aut używanych w Antwerpii. Certyfikowany członek Traxio z gwarancją Car-Pass.',
      rights: 'Wszelkie prawa zastrzeżone.',
      dealerPortal: 'Strefa Dealera',
      exportInfo: 'Eksport i Dostawa w UE',
      navigation: 'Nawigacja',
      stock: 'Nasze Samochody (Stock)',
      valuation: 'Sprzedaj Auto / Wycena',
      financing: 'Kalkulator Finansowania',
      warranty: 'Gwarancja Traxio (12-24 mies.)',
      about: 'O Auto Sale (1999)',
      openingHours: 'Godziny Otwarcia',
      contactDirections: 'Kontakt i Dojazd',
      traxioCertified: 'Certyfikat Traxio',
      carPassPartner: 'Partner Car-Pass',
    }
  },

  it: {
    nav: {
      stock: 'I Nostri Veicoli',
      valuation: 'Vendere Auto / Permuta',
      financing: 'Finanziamento',
      warranty: 'Garanzia Traxio',
      about: 'Chi Siamo',
      contact: 'Contatto & Sede',
      dealerLogin: 'Portale Concessionario',
      testDrive: 'Prenota Test Drive',
      favorites: 'Preferiti',
    },
    hero: {
      badge: 'Concessionario Certificato Traxio • Dal 1999',
      titleHighlight: 'VEICOLI ESCLUSIVI',
      titleRest: 'CON IL 100% DI TRASPARENZA',
      subtitle: 'Da oltre 25 anni il vostro specialista di riferimento per veicoli usati premium accuratamente selezionati ad Anversa. Include certificato ufficiale Car-Pass e garanzia Traxio da 12 a 24 mesi.',
      viewStock: 'Vedi I Nostri Veicoli',
      sellCar: 'Permuta Auto / Valutazione',
      filterTitle: 'Trova La Tua Auto Ideale',
      brand: 'Marca',
      allBrands: 'Tutte le Marche',
      budget: 'Budget fino a',
      fuel: 'Carburante',
      allFuels: 'Tutti i Carburanti',
      searchButton: 'Cerca Veicoli',
      guaranteesTitle: 'Le Nostre Garanzie',
      statYears: 'Anni di Esperienza',
      statRating: 'Punteggio Google',
      statChecks: 'Punti di Controllo',
      statWarranty: 'Garanzia Traxio',
      showroomOpen: 'Showroom Aperto',
      hoursText: 'Lun-Gio 10:00-19:00 | Ven fino alle 16:30',
      traxioHeader: 'Membro Ufficiale Traxio • 25+ Anni',
      carPass100: 'Storico Car-Pass 100% Verificato',
      checks113: '113 Punti di Controllo Traxio',
      googleScore: '4.9 / 5 Recensioni Google (280+ clienti)',
      directTakeover: 'Acquisto Diretto entro 24 ore',
      noLimit: 'Nessun limite',
      upTo: 'Fino a',
      petrol: 'Benzina',
      diesel: 'Diesel',
      hybrid: 'Ibrido',
      electric: '100% Elettrico',
    },
    inventory: {
      title: 'Parco Auto Disponibile',
      subtitle: 'Tutti i veicoli sono controllati minuziosamente su 113 punti tecnici e immediatamente disponibili per un giro di prova.',
      searchPlaceholder: 'Cerca per marca, modello, allestimento o parola chiave...',
      tabAll: 'Tutti i Veicoli',
      tabPremium: 'Prestige & Sport',
      tabEco: 'Ibrido & Elettrico',
      tabExport: 'Export & Commercianti',
      filterToggle: 'Filtri Avanzati',
      resetFilters: 'Ripristina Filtri',
      sortBy: 'Ordina per',
      sortFeatured: 'In Evidenza (Raccomandati)',
      sortPriceAsc: 'Prezzo: dal più basso',
      sortPriceDesc: 'Prezzo: dal più alto',
      sortYearDesc: 'Anno: dal più recente',
      sortKmAsc: 'Chilometraggio: dal più basso',
      resultsCount: 'veicoli disponibili',
      soldBadge: 'VENDUTO',
      reservedBadge: 'RISERVATO',
      availableBadge: 'DISPONIBILE',
      vatDeductible: 'IVA Deducibile',
      marginCar: 'Margine (IVA inclusa)',
      exportPrice: 'Prezzo Export Netto',
      perMonth: 'al mese',
      detailsButton: 'Scheda Completa',
      testDriveButton: 'Test Drive',
      emptyTitle: 'Nessun veicolo trovato con questi filtri',
      emptyText: 'Modifica i filtri di ricerca o richiedi il nostro servizio concierge personalizzato.',
      emptyContact: 'Contatta il nostro team di vendita',
      emptyDealerHint: 'Consiglio concessionario: aggiungi veicoli o importa tramite AutoScout24 nel pannello gestionale.',
      similarCars: 'Veicoli Simili Disponibili',
      exportNotice: 'Prezzo netto B2B per esportazione intracomunitaria o commercianti con partita IVA valida.',
      currentStock: 'Veicoli in Vendita',
      soldStock: 'Archivio Veicoli Venduti',
      soldTitle: 'I Nostri Successi di Vendita Recenti',
      soldSubtitle: 'Una selezione di splendide auto consegnate recentemente a clienti soddisfatti in Belgio e all\'estero.',
      fuelType: 'Alimentazione',
      transmission: 'Cambio',
      allTransmissions: 'Tutti i Cambi',
      automatic: 'Automatico',
      manual: 'Manuale',
      maxBudget: 'Budget Massimo',
      conciergeTitle: 'Cerchi un modello specifico?',
      conciergeSubtitle: 'Troviamo l\'auto dei tuoi sogni entro 7 giorni attraverso la nostra rete premium europea.',
      conciergeSubmit: 'Richiedi Ricerca Dedicata',
      conciergeSuccess: 'Richiesta ricevuta! Il nostro specialista ti contatterà al più presto.',
      loadSamples: 'Carica Esempio Stock',
    },
    carCard: {
      warranty: 'Garanzia Traxio Inclusa',
      from: 'Da',
      notAvailable: 'Non disponibile',
      saveFavorite: 'Aggiungi ai Preferiti',
      removeFavorite: 'Rimuovi dai Preferiti',
      featured: 'In Evidenza',
    },
    carDetail: {
      specs: 'Specifiche Tecniche',
      options: 'Opzioni & Equipaggiamento',
      description: 'Descrizione del Veicolo',
      watchVideo: 'Guarda Video Tour HD',
      viewAllPhotos: 'Apri Galleria a Schermo Intero & Zoom',
      carPassVerified: 'Car-Pass Autentico con Storico Completo del Chilometraggio',
      warrantyBanner: 'Copertura di Garanzia Traxio Ufficiale da 12 a 24 Mesi',
      monthlyEst: 'Rata Mensile Stimata',
      planTestDrive: 'Prenota un Test Drive Senza Impegno',
      whatsappSeller: 'Chatta Direttamente su WhatsApp',
      callDirect: 'Chiama il Nostro Ufficio Vendite',
      tradeInCta: 'Vuoi permutare la tua auto attuale? Richiedi una valutazione immediata!',
      soldMessage: 'Questo veicolo è stato venduto con successo. Esplora i nostri modelli simili.',
      shareCar: 'Condividi Annuncio',
      copied: 'Link copiato negli appunti!',
      photo: 'Foto',
      of: 'di',
      warrantyNotice: 'Questo veicolo viene consegnato con tagliando completo, pulizia approfondita e certificato ufficiale Car-Pass.',
      vatRecoverableNotice: 'Veicolo con IVA deducibile per aziende e professionisti registrati.',
      builtYear: 'Anno di Costruzione',
      mileageLabel: 'Chilometraggio',
      transmissionLabel: 'Tipo di Cambio',
      fuelLabel: 'Carburante',
      powerLabel: 'Potenza del Motore',
      similarCarsTitle: 'Potrebbero Interessarti Anche',
    },
    valuation: {
      title: 'Vendi la Tua Auto / Permuta',
      subtitle: 'Ricevi un\'offerta ufficiale e garantita entro 24 ore. Senza intermediari, pagamento immediato tramite bonifico bancario.',
      badge: 'Acquisto Diretto e Sicuro al 100%',
      step1: '1. Dati Veicolo',
      step2: '2. Condizioni',
      step3: '3. Contatti',
      step1Title: 'Inserisci le informazioni del tuo veicolo',
      step2Title: 'Stato d\'uso e prezzo desiderato',
      step3Title: 'I tuoi dati di contatto per l\'offerta',
      plate: 'Targa (opzionale)',
      brandModel: 'Marca & Modello',
      model: 'Allestimento / Motore',
      year: 'Anno di Immatricolazione',
      mileage: 'Chilometri Attuali (km)',
      fuel: 'Carburante',
      transmission: 'Cambio',
      condition: 'Condizioni Generali',
      conditionExcellent: 'Eccellenti (Come nuova, storico tagliandi completo)',
      conditionGood: 'Molto Buone (Normali segni d\'usura per età)',
      conditionFair: 'Sufficienti (Lavori di carrozzeria o meccanica necessari)',
      expectedPrice: 'Prezzo Desiderato (€)',
      notes: 'Opzioni speciali o note aggiuntive',
      name: 'Nome e Cognome',
      phone: 'Numero di Telefono',
      email: 'Indirizzo E-mail',
      submit: 'Richiedi Valutazione Gratuita',
      nextStep: 'Passaggio Successivo',
      previousStep: 'Indietro',
      successTitle: 'Richiesta di Valutazione Inviata!',
      successText: 'Grazie! Il nostro responsabile acquisti analizzerà i dati e ti contatterà entro 24 ore con un\'offerta trasparente.',
      benefit1: 'Pagamento rapido e garantito',
      benefit2: 'Ritiro a domicilio disponibile',
      benefit3: 'Disbrigo pratiche burocratiche gratuito',
    },
    financing: {
      title: 'Simulatore di Finanziamento & Leasing',
      subtitle: 'Calcola in modo chiaro e flessibile la rata mensile ideale per la tua prossima auto.',
      badge: 'Tasso Agevolato & Flessibilità',
      calculateTitle: 'Personalizza i Tuoi Parametri',
      calculateSubtitle: 'Regola l\'anticipo, la durata e il valore residuo in base alle tue esigenze.',
      carPrice: 'Prezzo del Veicolo',
      downPayment: 'Anticipo Iniziale',
      balloonLabel: 'Valore Residuo (Maxi Rata Finale)',
      duration: 'Durata del Finanziamento',
      months: 'mesi',
      monthlyPayment: 'Rata Mensile Stimata',
      monthlyEstTitle: 'Rata Mensile Stimata',
      totalCost: 'Capitale Finanziato',
      interestNote: 'Calcolo indicativo a tasso promozionale fisso',
      disclaimer: 'Attenzione: prendere in prestito denaro costa denaro. Simulazione a titolo informativo non vincolante subordinata all\'approvazione dell\'ente finanziario erogante.',
      applyTitle: 'Richiedi un Preventivo Ufficiale',
      name: 'Nome e Cognome',
      phone: 'Numero di Telefono',
      sendApplication: 'Invia Richiesta di Finanziamento',
      appSubmitted: 'Richiesta di Finanziamento Inviata!',
    },
    about: {
      badge: 'Chi Siamo • 25 Anni di Passione',
      title: 'Passione per i Motori, Garanzia di Trasparenza',
      description: 'Fondata nel 1999 ad Anversa, Auto Sale NV è cresciuta fino a diventare uno dei punti di riferimento più stimati in Belgio per la vendita di veicoli premium usati accuratamente controllati.',
      bullet1: 'Membro ufficiale certificato Traxio da oltre 25 anni',
      bullet2: 'Controllo tecnico approfondito su 113 punti chiave prima della consegna',
      bullet3: 'Certificato ufficiale Car-Pass con chilometraggio garantito al 100%',
      bullet4: 'Garanzia Traxio scritta da 12 a 24 mesi con assistenza europea',
      historyTitle: 'La Nostra Storia',
      historyText: 'Ogni auto nel nostro showroom è stata selezionata personalmente con criteri di qualità rigorosi, garantendo ai nostri clienti la massima serenità nell\'acquisto.',
      quote: '"La fiducia dei nostri clienti si costruisce con l\'onestà, la qualità e un servizio post-vendita impeccabile."',
      exploreBtn: 'Scopri il Nostro Stock',
      valuationBtn: 'Valuta la Tua Auto Attuale',
    },
    reviews: {
      badge: 'Recensioni & Dove Trovarci',
      title: 'La Soddisfazione dei Nostri Clienti',
      score: '4.9 su 5 stelle basato su oltre 280 recensioni verificate',
      contactTitle: 'Vieni a Trovarci ad Anversa',
      contactSubtitle: 'Il nostro showroom si trova a breve distanza dalle principali arterie autostradali, con ampio parcheggio riservato ai clienti.',
      openingHoursTitle: 'Orari di Apertura Showroom',
      monThu: 'Lunedì - Giovedì: 10:00 - 19:00',
      friday: 'Venerdì: 10:00 - 16:30',
      saturday: 'Sabato: Su appuntamento',
      sunday: 'Domenica: Chiuso',
      sendMessage: 'Invia un Messaggio',
      messageSent: 'Messaggio inviato con successo! Ti risponderemo a breve.',
      name: 'Nome e Cognome',
      email: 'Indirizzo E-mail',
      phone: 'Numero di Telefono',
      subject: 'Oggetto della Richiesta',
      message: 'Il tuo messaggio...',
      directions: 'Ottieni Indicazioni Stradali',
      callNow: 'Chiama Ora',
      whatsappDirect: 'Scrivici su WhatsApp',
    },
    testDrive: {
      title: 'Prenota un Test Drive',
      subtitle: 'Vivi di persona l\'esperienza di guida del tuo veicolo preferito senza alcun impegno.',
      selectCar: 'Veicolo Selezionato',
      date: 'Data Preferita',
      time: 'Orario Preferito',
      fullName: 'Nome e Cognome',
      phone: 'Numero di Telefono',
      email: 'Indirizzo E-mail',
      drivingLicense: 'Confermo di possedere una patente di guida valida (cat. B)',
      remarks: 'Note aggiuntive o richieste particolari',
      submit: 'Conferma Prenotazione Test Drive',
      successTitle: 'Richiesta di Test Drive Inviata!',
      successText: 'Abbiamo ricevuto la tua richiesta. Ti contatteremo a breve per confermare data e orario dell\'appuntamento.',
      close: 'Chiudi',
    },
    favorites: {
      title: 'I Tuoi Veicoli Salvati',
      subtitle: 'Confronta comodamente i tuoi modelli preferiti',
      emptyTitle: 'Nessun veicolo salvato nei preferiti',
      emptyText: 'Clicca sull\'icona a forma di cuore su qualsiasi scheda per salvare l\'auto in questa lista.',
      clearAll: 'Svuota Lista',
      requestTestDrive: 'Richiedi Test Drive',
      viewCar: 'Vedi Dettagli Auto',
    },
    cookie: {
      title: 'Gestione della Privacy e Cookie',
      text: 'Auto Sale NV rispetta la tua privacy. Utilizziamo i cookie per ricordare la lingua scelta e i veicoli preferiti, in conformità con il regolamento GDPR.',
      accept: 'Accetta Tutti i Cookie',
      decline: 'Solo Cookie Necessari',
    },
    footer: {
      aboutText: 'Da oltre 25 anni il vostro concessionario di riferimento per auto usate premium ad Anversa. Membro certificato Traxio con certificazione ufficiale Car-Pass.',
      rights: 'Tutti i diritti riservati.',
      dealerPortal: 'Area Concessionario',
      exportInfo: 'Servizio Export e Consegna in tutta Europa',
      navigation: 'Navigazione',
      stock: 'I Nostri Veicoli Disponibili',
      valuation: 'Vendi Auto / Permuta',
      financing: 'Calcolatore di Finanziamento',
      warranty: 'Garanzia Traxio (12-24 Mesi)',
      about: 'Chi Siamo (Dal 1999)',
      openingHours: 'Orari di Apertura',
      contactDirections: 'Contatti & Posizione',
      traxioCertified: 'Certificato Traxio',
      carPassPartner: 'Partner Ufficiale Car-Pass',
    }
  }
};

export function getInitialLanguage(): Language {
  try {
    const saved = localStorage.getItem('auto_sale_language') || localStorage.getItem('auto_sale_lang');
    if (saved && ['nl', 'en', 'fr', 'de', 'es', 'it', 'pl'].includes(saved)) {
      return saved as Language;
    }
  } catch {
    // ignore
  }

  if (typeof navigator !== 'undefined') {
    const navLang = navigator.language?.toLowerCase() || '';
    if (navLang.startsWith('it')) return 'it';
    if (navLang.startsWith('es')) return 'es';
    if (navLang.startsWith('pl')) return 'pl';
    if (navLang.startsWith('nl')) return 'nl';
    if (navLang.startsWith('fr')) return 'fr';
    if (navLang.startsWith('de')) return 'de';
    if (navLang.startsWith('en')) return 'en';
  }

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone.toLowerCase();
    if (tz.includes('rome') || tz.includes('milan')) return 'it';
    if (tz.includes('warsaw') || tz.includes('poland')) return 'pl';
    if (tz.includes('madrid') || tz.includes('canary') || tz.includes('bogota') || tz.includes('mexico')) return 'es';
  } catch {
    // ignore
  }

  return 'nl';
}

export async function detectLanguageFromGeoIP(): Promise<Language | null> {
  try {
    const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(2000) });
    if (!res.ok) return null;
    const data = await res.json();
    const country = (data.country_code || '').toUpperCase();

    if (['ES', 'MX', 'AR', 'CO', 'CL', 'PE', 'VE', 'EC', 'GT', 'CU', 'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PR', 'UY', 'PA'].includes(country)) {
      return 'es';
    }
    if (country === 'IT' || country === 'SM' || country === 'VA') return 'it';
    if (country === 'PL') return 'pl';
    if (country === 'BE' || country === 'NL') {
      if (typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('fr')) return 'fr';
      return 'nl';
    }
    if (country === 'FR' || country === 'LU' || country === 'MC') return 'fr';
    if (country === 'DE' || country === 'AT' || country === 'CH') return 'de';
    if (country === 'GB' || country === 'US' || country === 'IE' || country === 'CA' || country === 'AU') return 'en';

    return null;
  } catch {
    return null;
  }
}
