import React, { useState, useMemo, useEffect } from 'react';
import { CARS_DATA, SAMPLE_CARS_FOR_TESTING } from './data/cars';
import { DEALERSHIP_INFO } from './data/dealership';
import { Car, FilterState, Language, Currency, DealershipSettings, UserRole, LeadInquiry, ValuationFormState, TestDriveBooking } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InventoryGrid } from './components/InventoryGrid';
import { CarDetailModal } from './components/CarDetailModal';
import { CarValuationSection } from './components/CarValuationSection';
import { FinancingCalculator } from './components/FinancingCalculator';
import { AboutSection } from './components/AboutSection';
import { ReviewsAndLocation } from './components/ReviewsAndLocation';
import { TestDriveModal } from './components/TestDriveModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { DealerLoginModal } from './components/DealerDashboard/DealerLoginModal';
import { DealerDashboardModal } from './components/DealerDashboard/DealerDashboardModal';
import { detectVisitorLanguage, saveVisitorLanguage } from './utils/languageDetector';

const CARS_STORAGE_KEY = 'auto_sale_cars_v2';
const SETTINGS_STORAGE_KEY = 'auto_sale_settings';
const AUTH_STORAGE_KEY = 'auto_sale_dealer_user';
const CURRENCY_STORAGE_KEY = 'auto_sale_currency';
const LEADS_STORAGE_KEY = 'auto_sale_leads_v2';
const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;

export default function App() {
  // Dealership Settings (persisted)
  const [dealershipSettings, setDealershipSettings] = useState<DealershipSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      name: DEALERSHIP_INFO.name,
      address: DEALERSHIP_INFO.address.street,
      city: DEALERSHIP_INFO.address.city,
      zipCode: DEALERSHIP_INFO.address.postalCode,
      phone: DEALERSHIP_INFO.contact.phone,
      phoneRaw: DEALERSHIP_INFO.contact.phoneRaw,
      whatsapp: DEALERSHIP_INFO.contact.whatsapp,
      email: DEALERSHIP_INFO.contact.email,
      googleMapsUrl: DEALERSHIP_INFO.address.googleMapsUrl,
      facebookUrl: 'https://www.facebook.com/autosaleantwerpen',
      instagramUrl: 'https://www.instagram.com/autosaleantwerpen',
      autoscoutDealerUrl: 'https://www.autoscout24.be/nl/verkopers/auto-sale-antwerpen',
    };
  });

  // Multilingual state (IP / Browser detection with manual override)
  const [language, setLanguage] = useState<Language>('nl');

  useEffect(() => {
    detectVisitorLanguage().then((detected) => {
      setLanguage(detected);
    });
  }, []);

  const handleSelectLanguage = (lang: Language) => {
    setLanguage(lang);
    saveVisitorLanguage(lang);
  };

  // Currency state
  const [currency, setCurrency] = useState<Currency>(() => {
    try {
      const saved = localStorage.getItem(CURRENCY_STORAGE_KEY);
      if (saved && ['EUR', 'USD', 'GBP'].includes(saved)) {
        return saved as Currency;
      }
    } catch {
      // ignore
    }
    return 'EUR';
  });

  const handleSelectCurrency = (curr: Currency) => {
    setCurrency(curr);
    try {
      localStorage.setItem(CURRENCY_STORAGE_KEY, curr);
    } catch {
      // ignore
    }
  };

  // Car Database State (Empty start, persisted in localStorage)
  const [cars, setCars] = useState<Car[]>(() => {
    try {
      const saved = localStorage.getItem(CARS_STORAGE_KEY);
      if (saved) {
        const parsed: Car[] = JSON.parse(saved);
        // Soft delete auto-purge on initial load: remove cars deleted > 3 days ago
        const now = Date.now();
        return parsed.filter((c) => {
          if (!c.deletedAt) return true;
          return now - new Date(c.deletedAt).getTime() <= THREE_DAYS_MS;
        });
      }
    } catch {
      // ignore
    }
    return CARS_DATA; // starts empty as requested
  });

  // Save cars and auto-purge expired trash items
  useEffect(() => {
    try {
      localStorage.setItem(CARS_STORAGE_KEY, JSON.stringify(cars));
    } catch {
      // ignore
    }
  }, [cars]);

  // Dealer Auth State
  const [currentUser, setCurrentUser] = useState<UserRole | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isDealerLoginOpen, setIsDealerLoginOpen] = useState(false);
  const [isDealerDashboardOpen, setIsDealerDashboardOpen] = useState(false);

  const handleLoginSuccess = (user: UserRole) => {
    setCurrentUser(user);
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } catch {
      // ignore
    }
    setIsDealerLoginOpen(false);
    setIsDealerDashboardOpen(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {
      // ignore
    }
    setIsDealerDashboardOpen(false);
  };

  // Car Management Handlers
  const handleSaveCar = (carToSave: Car) => {
    setCars((prev) => {
      const index = prev.findIndex((c) => c.id === carToSave.id);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = carToSave;
        return updated;
      }
      return [carToSave, ...prev];
    });
  };

  const handleDeleteCar = (carId: string, soft: boolean = true) => {
    setCars((prev) => {
      if (soft) {
        return prev.map((c) => 
          c.id === carId ? { ...c, deletedAt: new Date().toISOString() } : c
        );
      }
      return prev.filter((c) => c.id !== carId);
    });
  };

  const handleRestoreCar = (carId: string) => {
    setCars((prev) => 
      prev.map((c) => {
        if (c.id === carId) {
          const { deletedAt, ...rest } = c;
          return rest as Car;
        }
        return c;
      })
    );
  };

  const handleToggleSold = (carId: string) => {
    setCars((prev) =>
      prev.map((c) =>
        c.id === carId
          ? { ...c, status: c.status === 'sold' ? 'available' : 'sold' }
          : c
      )
    );
  };

  const handlePermanentDeleteCar = (carId: string) => {
    setCars((prev) => prev.filter((c) => c.id !== carId));
  };

  const handleLoadSampleCars = () => {
    setCars(SAMPLE_CARS_FOR_TESTING);
  };

  const handleImportBackup = (importedCars: Car[]) => {
    if (Array.isArray(importedCars)) {
      setCars(importedCars);
    }
  };

  const handleSaveSettings = (newSettings: DealershipSettings) => {
    setDealershipSettings(newSettings);
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(newSettings));
    } catch {
      // ignore
    }
  };

  // Leads & Inquiries persisted in localStorage
  const [leads, setLeads] = useState<LeadInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(LEADS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
    } catch {
      // ignore
    }
  }, [leads]);

  const handleUpdateLeadStatus = (leadId: string, status: 'new' | 'contacted' | 'closed') => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === leadId ? { ...lead, status } : lead))
    );
  };

  const handleConciergeInquiry = (req: { brand: string; model: string; maxBudget: string; name: string; phone: string; email: string }) => {
    const newLead: LeadInquiry = {
      id: 'lead-' + Date.now(),
      date: new Date().toLocaleDateString('nl-BE') + ' ' + new Date().toLocaleTimeString('nl-BE', { hour: '2-digit', minute: '2-digit' }),
      type: 'contact',
      name: req.name,
      email: req.email,
      phone: req.phone,
      carTitle: `Zoekopdracht: ${req.brand} ${req.model}`,
      message: `Klant zoekt: ${req.brand} ${req.model} met richtbudget ${req.maxBudget}. Tel: ${req.phone}, E-mail: ${req.email}`,
      status: 'new'
    };
    setLeads((prev) => [newLead, ...prev]);
  };

  const handleTestDriveSuccess = (booking: TestDriveBooking) => {
    const newLead: LeadInquiry = {
      id: 'lead-' + Date.now(),
      date: new Date().toLocaleDateString('nl-BE') + ' ' + new Date().toLocaleTimeString('nl-BE', { hour: '2-digit', minute: '2-digit' }),
      type: 'test-drive',
      carId: booking.carId,
      carTitle: booking.carTitle || 'Proefritaanvraag',
      name: booking.fullName,
      email: booking.email,
      phone: booking.phone,
      message: `Datum: ${booking.date} om ${booking.timeSlot}. Notities: ${booking.remarks || 'Geen extra opmerkingen'}`,
      status: 'new'
    };
    setLeads((prev) => [newLead, ...prev]);
  };

  const handleValuationSuccess = (data: ValuationFormState, referenceNumber: string) => {
    const newLead: LeadInquiry = {
      id: 'lead-' + Date.now(),
      date: new Date().toLocaleDateString('nl-BE') + ' ' + new Date().toLocaleTimeString('nl-BE', { hour: '2-digit', minute: '2-digit' }),
      type: 'valuation',
      name: data.name,
      email: data.email,
      phone: data.phone,
      carTitle: `${data.brand} ${data.model} (${data.year})`,
      message: `Ref: ${referenceNumber} | Km: ${data.mileage.toLocaleString()} | Brandstof: ${data.fuel} | Staat: ${data.condition} | Verwacht: ${data.expectedPrice || 'Niet opgegeven'}. Notitie: ${data.notes || 'Geen'}`,
      status: 'new'
    };
    setLeads((prev) => [newLead, ...prev]);
  };

  const handleGeneralContactSubmit = (lead: { name: string; email: string; phone: string; subject: string; message: string }) => {
    const newLead: LeadInquiry = {
      id: 'lead-' + Date.now(),
      date: new Date().toLocaleDateString('nl-BE') + ' ' + new Date().toLocaleTimeString('nl-BE', { hour: '2-digit', minute: '2-digit' }),
      type: 'contact',
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      carTitle: lead.subject || 'Algemeen Contactformulier',
      message: lead.message,
      status: 'new'
    };
    setLeads((prev) => [newLead, ...prev]);
  };

  // Favorites persisted in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('auto_sale_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('auto_sale_favorites', JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  // Modals & Drawers state
  const [selectedCarForDetail, setSelectedCarForDetail] = useState<Car | null>(null);
  const [selectedCarForTestDrive, setSelectedCarForTestDrive] = useState<Car | null>(null);
  const [isTestDriveModalOpen, setIsTestDriveModalOpen] = useState(false);
  const [isFavoritesDrawerOpen, setIsFavoritesDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Filter & Search State
  const initialFilters: FilterState = {
    searchQuery: '',
    brand: '',
    category: 'all',
    fuel: '',
    transmission: '',
    bodyType: '',
    maxPrice: 250000,
    maxMileage: 200000,
    minYear: 2015,
    sortBy: 'featured'
  };

  const [filters, setFilters] = useState<FilterState>(initialFilters);

  // Active public cars (excluding soft-deleted cars)
  const publicCars = useMemo(() => {
    return cars.filter((c) => !c.deletedAt);
  }, [cars]);

  // Featured cars for hero spotlight
  const featuredCars = useMemo(() => {
    return publicCars.filter((c) => c.featured && c.status !== 'sold').slice(0, 2);
  }, [publicCars]);

  // Available brands in stock
  const availableBrands = useMemo(() => {
    const brandsSet = new Set<string>();
    publicCars.forEach((c) => brandsSet.add(c.brand));
    return Array.from(brandsSet).sort();
  }, [publicCars]);

  // Filtered & Sorted cars for display in InventoryGrid
  const filteredCars = useMemo(() => {
    return publicCars.filter((car) => {
      // Search query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesBrand = car.brand.toLowerCase().includes(query);
        const matchesModel = car.model.toLowerCase().includes(query);
        const matchesEdition = car.edition?.toLowerCase().includes(query) || false;
        const matchesFuel = car.fuel.toLowerCase().includes(query);
        const matchesColor = car.color.toLowerCase().includes(query);
        const matchesOptions = car.options?.some((o) => o.toLowerCase().includes(query)) || false;

        if (!matchesBrand && !matchesModel && !matchesEdition && !matchesFuel && !matchesColor && !matchesOptions) {
          return false;
        }
      }

      // Category tab
      if (filters.category !== 'all') {
        if (filters.category === 'hybrid-electric') {
          if (car.fuel !== 'Plug-in Hybride' && car.fuel !== 'Elektrisch') return false;
        } else if (car.category !== filters.category) {
          return false;
        }
      }

      // Brand dropdown
      if (filters.brand && car.brand !== filters.brand) {
        return false;
      }

      // Fuel dropdown
      if (filters.fuel && car.fuel !== filters.fuel) {
        return false;
      }

      // Transmission dropdown
      if (filters.transmission && car.transmission !== filters.transmission) {
        return false;
      }

      // Max price
      if (car.price > filters.maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'year-desc') return b.year - a.year;
      if (filters.sortBy === 'mileage-asc') return a.mileage - b.mileage;
      // Default: featured first, then newest
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.year - a.year;
    });
  }, [publicCars, filters]);

  // Handlers
  const handleToggleFavorite = (carId: string) => {
    setFavorites((prev) => 
      prev.includes(carId) ? prev.filter((id) => id !== carId) : [...prev, carId]
    );
  };

  const handleOpenTestDriveModal = (car?: Car) => {
    setSelectedCarForTestDrive(car || filteredCars[0] || publicCars[0] || null);
    setIsTestDriveModalOpen(true);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyQuickFilter = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col selection:bg-orange-500 selection:text-white">
      {/* Navigation Bar with Multilingual, Currency & Dealer Access */}
      <Navbar
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesDrawerOpen(true)}
        onOpenTestDrive={() => handleOpenTestDriveModal()}
        onNavigate={handleNavigate}
        activeSection={activeSection}
        currentLang={language}
        onSelectLanguage={handleSelectLanguage}
        currentCurrency={currency}
        onSelectCurrency={handleSelectCurrency}
        dealershipSettings={dealershipSettings}
        onOpenDealerLogin={() => setIsDealerLoginOpen(true)}
        isLoggedIn={!!currentUser}
        onOpenDashboard={() => setIsDealerDashboardOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with Live Stock Finder */}
        <Hero
          onExploreStock={() => handleNavigate('stock')}
          onOpenValuation={() => handleNavigate('overname')}
          onApplyQuickFilter={handleApplyQuickFilter}
          availableBrands={availableBrands}
          totalCarsCount={publicCars.length}
          language={language}
          featuredCars={featuredCars}
          dealershipSettings={dealershipSettings}
          onSelectCar={(car) => setSelectedCarForDetail(car)}
        />

        {/* Vehicle Inventory & Interactive Filter Grid */}
        <InventoryGrid
          cars={filteredCars}
          filterState={filters}
          onFilterChange={(newFilters) => setFilters((prev) => ({ ...prev, ...newFilters }))}
          onResetFilters={handleResetFilters}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onSelectCar={(car) => setSelectedCarForDetail(car)}
          onRequestTestDrive={(car) => handleOpenTestDriveModal(car)}
          availableBrands={availableBrands}
          language={language}
          currency={currency}
          dealershipSettings={dealershipSettings}
          onOpenDealerLogin={() => setIsDealerLoginOpen(true)}
          onLoadSampleCars={handleLoadSampleCars}
          onConciergeSubmit={handleConciergeInquiry}
        />

        {/* "Wij Kopen Uw Auto" 3-Step Valuation Wizard */}
        <CarValuationSection onValuationSubmit={handleValuationSuccess} />

        {/* Financing & Leasing Calculator */}
        <FinancingCalculator />

        {/* Traxio Kwaliteitsgarantie & 25-Year Heritage */}
        <AboutSection
          onExploreStock={() => handleNavigate('stock')}
          onOpenValuation={() => handleNavigate('overname')}
          showroomImageUrl={dealershipSettings.showroomImageUrl}
        />

        {/* Google Reviews & Antwerp Location with Google Maps embed */}
        <ReviewsAndLocation
          dealershipSettings={dealershipSettings}
          onContactSubmit={handleGeneralContactSubmit}
        />
      </main>

      {/* Modern Footer */}
      <Footer
        onNavigate={handleNavigate}
        dealershipSettings={dealershipSettings}
      />

      {/* GDPR Cookie Consent Banner */}
      <CookieBanner language={language} />

      {/* Modals & Slide-overs */}
      <CarDetailModal
        car={selectedCarForDetail}
        isOpen={!!selectedCarForDetail}
        onClose={() => setSelectedCarForDetail(null)}
        isFavorite={selectedCarForDetail ? favorites.includes(selectedCarForDetail.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onRequestTestDrive={(car) => handleOpenTestDriveModal(car)}
        onNavigateToValuation={() => handleNavigate('overname')}
        language={language}
        currency={currency}
        dealershipSettings={dealershipSettings}
        allCars={publicCars}
        onSelectCar={(car) => setSelectedCarForDetail(car)}
      />

      <TestDriveModal
        isOpen={isTestDriveModalOpen}
        onClose={() => setIsTestDriveModalOpen(false)}
        selectedCar={selectedCarForTestDrive}
        allCars={publicCars}
        onBookingSuccess={handleTestDriveSuccess}
      />

      <FavoritesDrawer
        isOpen={isFavoritesDrawerOpen}
        onClose={() => setIsFavoritesDrawerOpen(false)}
        favorites={favorites}
        allCars={publicCars}
        onRemoveFavorite={handleToggleFavorite}
        onSelectCar={(car) => setSelectedCarForDetail(car)}
        onRequestTestDrive={(car) => handleOpenTestDriveModal(car)}
      />

      {/* Dealer Login Modal */}
      <DealerLoginModal
        isOpen={isDealerLoginOpen}
        onClose={() => setIsDealerLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Full Dealer Management Dashboard Modal */}
      <DealerDashboardModal
        isOpen={isDealerDashboardOpen}
        onClose={() => setIsDealerDashboardOpen(false)}
        role={currentUser || 'admin'}
        user={currentUser}
        username={currentUser === 'admin' ? 'Michel / Beheerder' : 'Verkoper'}
        onLogout={handleLogout}
        cars={cars}
        onSaveCar={handleSaveCar}
        onDeleteCar={handleDeleteCar}
        onRestoreCar={handleRestoreCar}
        onPermanentDeleteCar={handlePermanentDeleteCar}
        onToggleSold={handleToggleSold}
        onLoadSampleCars={handleLoadSampleCars}
        onImportBackup={handleImportBackup}
        dealershipSettings={dealershipSettings}
        onSaveDealershipSettings={handleSaveSettings}
        onSaveSettings={handleSaveSettings}
        leads={leads}
        onUpdateLeadStatus={handleUpdateLeadStatus}
      />
    </div>
  );
}
