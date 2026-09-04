import React, { useState, useMemo, useEffect } from 'react';
import { CARS_DATA } from './data/cars';
import { DEALERSHIP_INFO } from './data/dealership';
import { Car, FilterState } from './types';
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

export default function App() {
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

  // Available brands in stock
  const availableBrands = useMemo(() => {
    const brandsSet = new Set<string>();
    CARS_DATA.forEach((c) => brandsSet.add(c.brand));
    return Array.from(brandsSet).sort();
  }, []);

  // Filtered & Sorted cars
  const filteredCars = useMemo(() => {
    return CARS_DATA.filter((car) => {
      // Search query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesBrand = car.brand.toLowerCase().includes(query);
        const matchesModel = car.model.toLowerCase().includes(query);
        const matchesEdition = car.edition?.toLowerCase().includes(query) || false;
        const matchesFuel = car.fuel.toLowerCase().includes(query);
        const matchesColor = car.color.toLowerCase().includes(query);
        const matchesOptions = car.options.some((o) => o.toLowerCase().includes(query));

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
  }, [filters]);

  // Handlers
  const handleToggleFavorite = (carId: string) => {
    setFavorites((prev) => 
      prev.includes(carId) ? prev.filter((id) => id !== carId) : [...prev, carId]
    );
  };

  const handleOpenTestDriveModal = (car?: Car) => {
    setSelectedCarForTestDrive(car || filteredCars[0] || CARS_DATA[0]);
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
      {/* Navigation Bar */}
      <Navbar
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesDrawerOpen(true)}
        onOpenTestDrive={() => handleOpenTestDriveModal()}
        onNavigate={handleNavigate}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with Live Stock Finder */}
        <Hero
          onExploreStock={() => handleNavigate('stock')}
          onOpenValuation={() => handleNavigate('overname')}
          onApplyQuickFilter={handleApplyQuickFilter}
          availableBrands={availableBrands}
          totalCarsCount={CARS_DATA.length}
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
        />

        {/* "Wij Kopen Uw Auto" 3-Step Valuation Wizard */}
        <CarValuationSection />

        {/* Financing & Leasing Calculator */}
        <FinancingCalculator />

        {/* Traxio Kwaliteitsgarantie & 25-Year Heritage */}
        <AboutSection
          onExploreStock={() => handleNavigate('stock')}
          onOpenValuation={() => handleNavigate('overname')}
        />

        {/* Google Reviews & Antwerp Location with Google Maps embed */}
        <ReviewsAndLocation />
      </main>

      {/* Modern Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Modals & Slide-overs */}
      <CarDetailModal
        car={selectedCarForDetail}
        isOpen={!!selectedCarForDetail}
        onClose={() => setSelectedCarForDetail(null)}
        isFavorite={selectedCarForDetail ? favorites.includes(selectedCarForDetail.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onRequestTestDrive={(car) => handleOpenTestDriveModal(car)}
        onNavigateToValuation={() => handleNavigate('overname')}
      />

      <TestDriveModal
        isOpen={isTestDriveModalOpen}
        onClose={() => setIsTestDriveModalOpen(false)}
        selectedCar={selectedCarForTestDrive}
        allCars={CARS_DATA}
      />

      <FavoritesDrawer
        isOpen={isFavoritesDrawerOpen}
        onClose={() => setIsFavoritesDrawerOpen(false)}
        favorites={favorites}
        allCars={CARS_DATA}
        onRemoveFavorite={handleToggleFavorite}
        onSelectCar={(car) => setSelectedCarForDetail(car)}
        onRequestTestDrive={(car) => handleOpenTestDriveModal(car)}
      />
    </div>
  );
}
