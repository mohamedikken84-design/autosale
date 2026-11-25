import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  Plus,
  Trash2,
  Edit,
  Sparkles,
  Upload,
  Eye,
  RefreshCw,
  Download,
  Building,
  CheckCircle2,
  ArrowLeft,
  Car as CarIcon,
  Video,
  MessageCircle,
  Phone,
  Mail,
  Share2,
  Camera,
  RotateCcw,
  Star,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Tag,
  Clock,
  Instagram,
  Facebook,
  Link as LinkIcon,
  Save,
  CheckCheck,
  GripVertical,
  Loader2,
  AlertCircle,
  FileCode
} from 'lucide-react';
import {
  Car,
  UserRole,
  DealershipSettings,
  LeadInquiry,
  FuelType,
  TransmissionType,
  BodyType
} from '../../types';
import { fetchAndParseAutoScout } from '../../utils/autoscoutParser';
import { compressImage } from '../../utils/imageCompression';
import { formatCurrencyPrice } from '../../utils/currency';

interface DealerDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  role?: UserRole;
  user?: UserRole;
  username?: string;
  onLogout: () => void;
  cars: Car[];
  onSaveCar: (car: Car) => void;
  onDeleteCar: (carId: string, soft?: boolean) => void;
  onRestoreCar?: (carId: string) => void;
  onPermanentDeleteCar?: (carId: string) => void;
  onToggleSold: (carId: string) => void;
  onImportBackup?: (cars: Car[]) => void;
  dealershipSettings: DealershipSettings;
  onSaveDealershipSettings?: (settings: DealershipSettings) => void;
  onSaveSettings?: (settings: DealershipSettings) => void;
  leads?: LeadInquiry[];
  onUpdateLeadStatus?: (leadId: string, status: 'new' | 'contacted' | 'closed') => void;
  onDeleteLead?: (leadId: string) => void;
  onClearAllLeads?: () => void;
}

type TabType = 'stock' | 'sold' | 'add' | 'autoscout' | 'leads' | 'settings' | 'trash';

export const DealerDashboardModal: React.FC<DealerDashboardModalProps> = ({
  isOpen,
  onClose,
  role,
  user,
  username,
  onLogout,
  cars,
  onSaveCar,
  onDeleteCar,
  onRestoreCar,
  onPermanentDeleteCar,
  onToggleSold,
  onImportBackup,
  dealershipSettings,
  onSaveDealershipSettings,
  onSaveSettings,
  leads = [],
  onUpdateLeadStatus,
  onDeleteLead,
  onClearAllLeads,
}) => {
  const effectiveRole: UserRole = 'admin';
  const effectiveUsername: string = username || 'Michel / Beheerder';
  const safeLeads = leads || [];
  const handleSaveSettings = onSaveDealershipSettings || onSaveSettings || (() => {});
  const handlePermanentDelete = onPermanentDeleteCar || ((id: string) => onDeleteCar(id, false));
  const handleRestore = onRestoreCar || (() => {});
  const handleImportBackup = onImportBackup || (() => {});

  const [activeTab, setActiveTab] = useState<TabType>('stock');
  const [editingCarId, setEditingCarId] = useState<string | null>(null);

  // New car form state
  const defaultCarForm: Partial<Car> = {
    brand: '',
    model: '',
    edition: '',
    year: new Date().getFullYear(),
    mileage: 0,
    price: 0,
    monthlyPrice: 0,
    priceType: 'BTW Aftrekbaar',
    vatDeductible: true,
    fuel: 'Benzine' as FuelType,
    transmission: 'Automaat' as TransmissionType,
    powerHp: 150,
    color: '',
    interior: '',
    bodyType: 'SUV / 4x4' as BodyType,
    images: [],
    videoUrl: '',
    licensePlate: '',
    featured: false,
    category: 'premium',
    carPassId: `CP-${Math.floor(10000000 + Math.random() * 90000000)}`,
    warrantyMonths: 12,
    highlightSpecs: [],
    options: ['LED Koplampen', 'Navigatiesysteem', 'Parkeersensoren'],
    description: '',
    status: 'available',
  };

  const [carForm, setCarForm] = useState<Partial<Car>>(defaultCarForm);
  const [formError, setFormError] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [newOptionInput, setNewOptionInput] = useState('');
  const [urlPasteInput, setUrlPasteInput] = useState('');

  // AutoScout import state
  const [autoscoutInput, setAutoscoutInput] = useState('');
  const [uploadedHtmlName, setUploadedHtmlName] = useState<string | null>(null);
  const [isDraggingHtmlFile, setIsDraggingHtmlFile] = useState(false);
  const [newPreviewOption, setNewPreviewOption] = useState('');
  const [importStatus, setImportStatus] = useState<{
    type: 'success' | 'warning' | 'error';
    text: string;
    detail?: string;
  } | null>(null);
  const [parsedPreviewCar, setParsedPreviewCar] = useState<Partial<Car> | null>(null);
  const [isLoadingImport, setIsLoadingImport] = useState(false);

  // Drag and Drop state for Car Form Images
  const [draggedFormIdx, setDraggedFormIdx] = useState<number | null>(null);
  const [dragOverFormIdx, setDragOverFormIdx] = useState<number | null>(null);

  // Drag and Drop state for AutoScout Preview Images
  const [draggedPreviewIdx, setDraggedPreviewIdx] = useState<number | null>(null);
  const [dragOverPreviewIdx, setDragOverPreviewIdx] = useState<number | null>(null);

  // Settings form
  const [settingsForm, setSettingsForm] = useState<DealershipSettings>(dealershipSettings);
  const [settingsSavedToast, setSettingsSavedToast] = useState(false);

  // Search in stock/sold
  const [searchStock, setSearchStock] = useState('');
  const [stockBrandFilter, setStockBrandFilter] = useState('');

  // Leads delete confirmation states (in-UI to avoid window.confirm blocked by browser iframes)
  const [confirmDeleteLeadId, setConfirmDeleteLeadId] = useState<string | null>(null);
  const [confirmClearAllLeads, setConfirmClearAllLeads] = useState(false);

  useEffect(() => {
    setSettingsForm(dealershipSettings);
  }, [dealershipSettings]);

  if (!isOpen) return null;

  // Split cars into active vs trash
  const activeCars = cars.filter((c) => !c.deletedAt);
  const availableCars = activeCars.filter((c) => c.status !== 'sold');
  const soldCars = activeCars.filter((c) => c.status === 'sold');
  const trashedCars = cars.filter((c) => !!c.deletedAt);

  // Filtered lists
  const filteredAvailableCars = availableCars.filter((c) => {
    const matchesSearch =
      `${c.brand} ${c.model} ${c.edition || ''}`.toLowerCase().includes(searchStock.toLowerCase());
    const matchesBrand = stockBrandFilter ? c.brand === stockBrandFilter : true;
    return matchesSearch && matchesBrand;
  });

  const filteredSoldCars = soldCars.filter((c) => {
    return `${c.brand} ${c.model} ${c.edition || ''}`.toLowerCase().includes(searchStock.toLowerCase());
  });

  // Calculate total sold value
  const totalSoldValue = soldCars.reduce((acc, c) => acc + (c.price || 0), 0);

  // Image Management Helpers
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsCompressing(true);
    const newImages: string[] = [];

    for (let i = 0; i < files.length; i++) {
      try {
        const compressed = await compressImage(files[i]);
        newImages.push(compressed);
      } catch (err) {
        console.error('Fout bij verwerken van afbeelding:', err);
      }
    }

    setCarForm((prev) => ({
      ...prev,
      images: [...(prev.images || []), ...newImages],
    }));
    setIsCompressing(false);
  };

  const handleAddImageUrls = () => {
    if (!urlPasteInput.trim()) return;
    const urls = urlPasteInput
      .split(/[\n,]/)
      .map((u) => u.trim())
      .filter((u) => u.startsWith('http'));

    if (urls.length > 0) {
      setCarForm((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...urls],
      }));
      setUrlPasteInput('');
    }
  };

  const handleSetMainImage = (index: number) => {
    const current = [...(carForm.images || [])];
    if (index === 0 || index >= current.length) return;
    const [selected] = current.splice(index, 1);
    current.unshift(selected);
    setCarForm((prev) => ({ ...prev, images: current }));
  };

  const handleMoveImage = (index: number, direction: 'left' | 'right') => {
    const current = [...(carForm.images || [])];
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= current.length) return;
    const temp = current[index];
    current[index] = current[targetIndex];
    current[targetIndex] = temp;
    setCarForm((prev) => ({ ...prev, images: current }));
  };

  const handleRemoveImage = (index: number) => {
    setCarForm((prev) => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index),
    }));
  };

  // Preview Image Helpers for AutoScout Preview
  const handlePreviewSetMainImage = (index: number) => {
    if (!parsedPreviewCar || !parsedPreviewCar.images) return;
    const current = [...parsedPreviewCar.images];
    if (index === 0 || index >= current.length) return;
    const [selected] = current.splice(index, 1);
    current.unshift(selected);
    setParsedPreviewCar({ ...parsedPreviewCar, images: current });
  };

  const handlePreviewMoveImage = (index: number, direction: 'left' | 'right') => {
    if (!parsedPreviewCar || !parsedPreviewCar.images) return;
    const current = [...parsedPreviewCar.images];
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= current.length) return;
    const temp = current[index];
    current[index] = current[targetIndex];
    current[targetIndex] = temp;
    setParsedPreviewCar({ ...parsedPreviewCar, images: current });
  };

  const handlePreviewRemoveImage = (index: number) => {
    if (!parsedPreviewCar || !parsedPreviewCar.images) return;
    setParsedPreviewCar({
      ...parsedPreviewCar,
      images: parsedPreviewCar.images.filter((_, i) => i !== index),
    });
  };

  // Drag and Drop handlers for Car Form Images
  const handleFormDragStart = (e: React.DragEvent, index: number) => {
    setDraggedFormIdx(index);
    e.dataTransfer.setData('text/plain', String(index));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleFormDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverFormIdx !== index) {
      setDragOverFormIdx(index);
    }
  };

  const handleFormDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    const sourceIndex = draggedFormIdx !== null ? draggedFormIdx : parseInt(e.dataTransfer.getData('text/plain'), 10);
    if (!isNaN(sourceIndex) && sourceIndex !== targetIndex) {
      const current = [...(carForm.images || [])];
      const [item] = current.splice(sourceIndex, 1);
      current.splice(targetIndex, 0, item);
      setCarForm((prev) => ({ ...prev, images: current }));
    }
    setDraggedFormIdx(null);
    setDragOverFormIdx(null);
  };

  const handleFormDragEnd = () => {
    setDraggedFormIdx(null);
    setDragOverFormIdx(null);
  };

  // Drag and Drop handlers for AutoScout Preview Images
  const handlePreviewDragStart = (e: React.DragEvent, index: number) => {
    setDraggedPreviewIdx(index);
    e.dataTransfer.setData('text/plain', String(index));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handlePreviewDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverPreviewIdx !== index) {
      setDragOverPreviewIdx(index);
    }
  };

  const handlePreviewDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (!parsedPreviewCar || !parsedPreviewCar.images) return;
    const sourceIndex = draggedPreviewIdx !== null ? draggedPreviewIdx : parseInt(e.dataTransfer.getData('text/plain'), 10);
    if (!isNaN(sourceIndex) && sourceIndex !== targetIndex) {
      const current = [...parsedPreviewCar.images];
      const [item] = current.splice(sourceIndex, 1);
      current.splice(targetIndex, 0, item);
      setParsedPreviewCar({ ...parsedPreviewCar, images: current });
    }
    setDraggedPreviewIdx(null);
    setDragOverPreviewIdx(null);
  };

  const handlePreviewDragEnd = () => {
    setDraggedPreviewIdx(null);
    setDragOverPreviewIdx(null);
  };

  // Handle Save Car Form
  const handleSubmitCarForm = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!carForm.brand?.trim() || !carForm.model?.trim()) {
      setFormError('Vul a.u.b. ten minste het merk en model in.');
      return;
    }

    const price = Number(carForm.price) || 0;
    const monthlyPrice = Math.round(price * 0.0125) || 299;

    const carToSave: Car = {
      id: editingCarId || `car-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      brand: carForm.brand.trim(),
      model: carForm.model.trim(),
      edition: carForm.edition?.trim() || '',
      year: Number(carForm.year) || new Date().getFullYear(),
      mileage: Number(carForm.mileage) || 0,
      price: price,
      monthlyPrice: monthlyPrice,
      priceType: carForm.priceType || 'BTW Aftrekbaar',
      vatDeductible: carForm.priceType === 'BTW Aftrekbaar',
      fuel: (carForm.fuel as FuelType) || 'Benzine',
      transmission: (carForm.transmission as TransmissionType) || 'Automaat',
      powerHp: Number(carForm.powerHp) || 150,
      color: carForm.color?.trim() || 'Zwart metallic',
      interior: carForm.interior?.trim() || 'Leder',
      bodyType: (carForm.bodyType as BodyType) || 'SUV / 4x4',
      images: carForm.images && carForm.images.length > 0 
        ? carForm.images 
        : ['/logo2.png'],
      videoUrl: carForm.videoUrl?.trim() || '',
      licensePlate: carForm.licensePlate?.trim() || '',
      featured: carForm.featured || false,
      category: carForm.category || 'premium',
      carPassId: carForm.carPassId || `CP-${Math.floor(10000000 + Math.random() * 90000000)}`,
      warrantyMonths: Number(carForm.warrantyMonths) || 12,
      highlightSpecs: carForm.highlightSpecs || [`${carForm.powerHp} PK`, `${carForm.transmission}`],
      options: carForm.options || [],
      description: carForm.description || '',
      status: carForm.status || 'available',
      viewsCount: carForm.viewsCount || 0,
      branchId: carForm.branchId || 'main',
    };

    onSaveCar(carToSave);
    setCarForm(defaultCarForm);
    setEditingCarId(null);
    setFormError(null);
    setActiveTab(carToSave.status === 'sold' ? 'sold' : 'stock');
  };

  // Start editing car
  const handleStartEditCar = (car: Car) => {
    setFormError(null);
    setCarForm(car);
    setEditingCarId(car.id);
    setActiveTab('add');
  };

  // AutoScout Import handler
  const handleAutoScoutParse = async (overrideRaw?: string) => {
    const raw = (overrideRaw ?? autoscoutInput).trim();
    if (!raw) {
      setImportStatus({
        type: 'error',
        text: 'Plak eerst een AutoScout24 link, een paginabron (Ctrl+U), of sleep een opgeslagen .html bestand hierheen.',
      });
      return;
    }

    setIsLoadingImport(true);
    setImportStatus(null);
    try {
      const result = await fetchAndParseAutoScout(raw);
      const parsed = result.draft;
      const hasImages = parsed.images && parsed.images.length > 0;
      const hasPrice = parsed.price && parsed.price > 0;

      if (result.blockedByCloudflare || result.method === 'url-slug' || (!hasImages && !hasPrice)) {
        setImportStatus({
          type: 'warning',
          text:
            result.message ||
            'AutoScout24 blokkeert directe server-downloads vanaf Netlify (Cloudflare-beveiliging).',
          detail:
            'Snelste oplossing (100% succes): Open de AutoScout24-advertentie in uw browser, druk op Ctrl+U (Paginabron) -> Ctrl+A -> Ctrl+C en plak het hierboven — óf sla de pagina op (Ctrl+S) en sleep het .html bestand hieronder.',
        });
      } else {
        setImportStatus({
          type: 'success',
          text:
            result.message ||
            `Succesvol opgehaald: ${parsed.brand} ${parsed.model} met ${parsed.images.length} originele foto's.`,
          detail: 'Controleer de gegevens, pas eventueel de prijs of hoofdfoto aan en klik op Publiceren.',
        });
      }

      setParsedPreviewCar({
        ...defaultCarForm,
        ...parsed,
        vatDeductible: parsed.priceType === 'BTW Aftrekbaar',
        status: 'available',
      });
    } catch (err: any) {
      setImportStatus({
        type: 'error',
        text: `Fout bij analyseren: ${err?.message || 'Controleer de invoer of plak de paginabron (Ctrl+U).'}`,
      });
    } finally {
      setIsLoadingImport(false);
    }
  };

  const handleAutoScoutHtmlFile = async (file: File) => {
    if (!file) return;
    setUploadedHtmlName(file.name);
    try {
      const text = await file.text();
      await handleAutoScoutParse(text);
    } catch {
      setImportStatus({
        type: 'error',
        text: `Kon het bestand "${file.name}" niet uitlezen.`,
      });
    }
  };

  const handlePublishAutoScoutDirect = () => {
    if (!parsedPreviewCar || !parsedPreviewCar.brand) return;
    const price = Number(parsedPreviewCar.price) || 0;
    const carToSave: Car = {
      id: `car-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      brand: parsedPreviewCar.brand.trim(),
      model: parsedPreviewCar.model?.trim() || '',
      edition: parsedPreviewCar.edition?.trim() || '',
      year: Number(parsedPreviewCar.year) || new Date().getFullYear(),
      mileage: Number(parsedPreviewCar.mileage) || 0,
      price: price,
      monthlyPrice: Math.round(price * 0.0125) || 299,
      priceType: parsedPreviewCar.priceType || 'BTW Aftrekbaar',
      vatDeductible: parsedPreviewCar.priceType === 'BTW Aftrekbaar',
      fuel: (parsedPreviewCar.fuel as FuelType) || 'Benzine',
      transmission: (parsedPreviewCar.transmission as TransmissionType) || 'Automaat',
      powerHp: Number(parsedPreviewCar.powerHp) || 150,
      color: parsedPreviewCar.color || 'Zwart metallic',
      interior: parsedPreviewCar.interior || 'Leder',
      bodyType: (parsedPreviewCar.bodyType as BodyType) || 'SUV / 4x4',
      images: parsedPreviewCar.images && parsedPreviewCar.images.length > 0 
        ? parsedPreviewCar.images 
        : ['/logo2.png'],
      videoUrl: parsedPreviewCar.videoUrl || '',
      licensePlate: '',
      featured: false,
      category: 'premium',
      carPassId: parsedPreviewCar.carPassId || `CP-${Math.floor(10000000 + Math.random() * 90000000)}`,
      warrantyMonths: 12,
      highlightSpecs: [`${parsedPreviewCar.powerHp || 150} PK`, `${parsedPreviewCar.transmission || 'Automaat'}`],
      options: parsedPreviewCar.options || ['LED Koplampen', 'Navigatie'],
      description: parsedPreviewCar.description || '',
      status: parsedPreviewCar.status || 'available',
      viewsCount: 0,
      branchId: 'main',
    };

    onSaveCar(carToSave);
    setParsedPreviewCar(null);
    setAutoscoutInput('');
    setImportStatus(null);
    setActiveTab(carToSave.status === 'sold' ? 'sold' : 'stock');
  };

  const handleTransferPreviewToForm = () => {
    if (!parsedPreviewCar) return;
    setCarForm(parsedPreviewCar);
    setEditingCarId(null);
    setActiveTab('add');
  };

  // Showroom photo upload for settings
  const handleShowroomPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImage(file);
      setSettingsForm((prev) => ({ ...prev, showroomImageUrl: compressed }));
    } catch (err) {
      console.error('Fout bij uploaden showroom foto:', err);
    }
  };

  // Save Settings
  const handleSaveAllSettings = (e: React.FormEvent) => {
    e.preventDefault();
    handleSaveSettings(settingsForm);
    setSettingsSavedToast(true);
    setTimeout(() => setSettingsSavedToast(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-0 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-7xl bg-[#141416] text-white sm:rounded-3xl border-0 sm:border border-zinc-800 shadow-2xl overflow-hidden flex flex-col h-full sm:h-auto sm:max-h-[92vh]">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-3.5 sm:px-8 py-3 sm:py-4 border-b border-zinc-800/90 bg-zinc-950/80 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 p-1 flex items-center justify-center shrink-0">
              <img src="/logo2.png" alt="Auto Sale" className="w-full h-full object-contain" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-black text-xs sm:text-base font-['Outfit',sans-serif] tracking-tight truncate">
                  Auto Sale NV • Beheerportaal
                </span>
                <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-[#FF6B00]/20 text-[#FF6B00] border border-[#FF6B00]/30 shrink-0">
                  Beheerder
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-gray-400 truncate">
                Aangemeld als: <strong className="text-gray-200">{effectiveUsername}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={onLogout}
              className="text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-xl border border-zinc-800 text-gray-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Uitloggen
            </button>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-xl sm:rounded-2xl text-gray-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              title="Sluiten"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-1.5 px-3 sm:px-6 py-2.5 bg-black/40 border-b border-zinc-800 overflow-x-auto text-xs font-bold scrollbar-none shrink-0 touch-pan-x">
          <button
            onClick={() => {
              setActiveTab('stock');
              setEditingCarId(null);
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'stock'
                ? 'bg-[#FF6B00] text-white shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <CarIcon className="w-4 h-4" />
            <span>Actieve Voorraad ({availableCars.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('sold');
              setEditingCarId(null);
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'sold'
                ? 'bg-[#FF6B00] text-white shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <CheckCheck className="w-4 h-4 text-emerald-400" />
            <span>Verkochte Wagens ({soldCars.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('add');
              if (!editingCarId) setCarForm(defaultCarForm);
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'add'
                ? 'bg-[#FF6B00] text-white shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>{editingCarId ? 'Wagen Bewerken' : 'Auto Toevoegen'}</span>
          </button>

          <button
            onClick={() => setActiveTab('autoscout')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'autoscout'
                ? 'bg-[#FF6B00] text-white shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>AutoScout24 Import</span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'leads'
                ? 'bg-[#FF6B00] text-white shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <Eye className="w-4 h-4 text-sky-400" />
            <span>Leads & Aanvragen ({safeLeads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-[#FF6B00] text-white shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Bedrijf & Social Media</span>
          </button>

          <button
            onClick={() => setActiveTab('trash')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'trash'
                ? 'bg-[#FF6B00] text-white shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <Trash2 className="w-4 h-4" />
            <span>Prullenbak ({trashedCars.length})</span>
          </button>
        </div>

        {/* Content Container */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 lg:p-8 space-y-6">

          {/* TAB 1: ACTIEVE VOORRAAD */}
          {activeTab === 'stock' && (
            <div className="space-y-4">
              {/* Controls Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-zinc-900/60 p-3.5 sm:p-4 rounded-2xl border border-zinc-800">
                <div className="flex items-center gap-2 flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Zoek op merk, model of uitvoering..."
                    value={searchStock}
                    onChange={(e) => setSearchStock(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#FF6B00]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setCarForm(defaultCarForm);
                      setEditingCarId(null);
                      setActiveTab('add');
                    }}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Nieuwe Wagen</span>
                  </button>
                </div>
              </div>

              {/* Mobile View: Car Cards */}
              <div className="md:hidden space-y-3">
                {filteredAvailableCars.length === 0 ? (
                  <div className="py-10 text-center text-gray-500 bg-zinc-900/40 rounded-2xl border border-zinc-800 p-4 text-xs">
                    Geen actieve wagens gevonden. Klik op "Nieuwe Wagen" of gebruik de AutoScout24 Importer.
                  </div>
                ) : (
                  filteredAvailableCars.map((car) => (
                    <div key={car.id} className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-3.5 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-20 h-16 rounded-xl overflow-hidden bg-black shrink-0 relative border border-zinc-700/50">
                          <img src={car.images[0]} alt="" className="w-full h-full object-cover" />
                          <span className="absolute bottom-0 right-0 bg-black/85 text-[8px] font-bold px-1 text-gray-300">
                            {car.images.length} foto's
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-1.5">
                            <span className="font-bold text-white text-xs truncate">
                              {car.brand} {car.model}
                            </span>
                            {car.status === 'reserved' ? (
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30 shrink-0">
                                Gereserveerd
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                                Te Koop
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-gray-400 truncate">
                            {car.edition || car.category}
                          </div>
                          <div className="text-[11px] text-gray-400 mt-0.5">
                            {car.year} • {car.mileage.toLocaleString('nl-BE')} km • {car.fuel}
                          </div>
                          <div className="text-sm font-extrabold text-[#FF6B00] mt-0.5">
                            {formatCurrencyPrice(car.price, 'EUR')}
                          </div>
                        </div>
                      </div>

                      {/* Mobile Action Buttons */}
                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-800/80">
                        <button
                          onClick={() => handleStartEditCar(car)}
                          className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition-colors cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5 text-[#FF6B00]" />
                          <span>Bewerken</span>
                        </button>
                        <button
                          onClick={() => onToggleSold(car.id)}
                          className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-emerald-950/50 hover:bg-emerald-600/30 text-emerald-400 text-xs font-bold border border-emerald-600/40 transition-colors cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Verkocht</span>
                        </button>
                        <button
                          onClick={() => onDeleteCar(car.id, true)}
                          className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-zinc-800 hover:bg-red-900/40 text-gray-400 hover:text-red-400 text-xs font-bold transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Wissen</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Desktop View: Cars Table */}
              <div className="hidden md:block rounded-2xl border border-zinc-800 overflow-hidden bg-zinc-900/40 overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[700px]">
                  <thead className="bg-zinc-900/90 text-gray-400 uppercase font-black tracking-wider text-[10px] border-b border-zinc-800">
                    <tr>
                      <th className="py-3 px-4">Voertuig</th>
                      <th className="py-3 px-3">Bouwjaar</th>
                      <th className="py-3 px-3">Kilometerstand</th>
                      <th className="py-3 px-3">Brandstof</th>
                      <th className="py-3 px-3">Vraagprijs</th>
                      <th className="py-3 px-3 text-center">Status</th>
                      <th className="py-3 px-4 text-right">Acties</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {filteredAvailableCars.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-gray-500">
                          Geen actieve wagens gevonden. Klik op "Nieuwe Wagen" of gebruik de AutoScout24 Importer.
                        </td>
                      </tr>
                    ) : (
                      filteredAvailableCars.map((car) => (
                        <tr key={car.id} className="hover:bg-zinc-800/40 transition-colors">
                          <td className="py-3 px-4 flex items-center gap-3">
                            <div className="w-14 h-10 rounded-lg overflow-hidden bg-black shrink-0 relative border border-zinc-700/50">
                              <img src={car.images[0]} alt="" className="w-full h-full object-cover" />
                              <span className="absolute bottom-0 right-0 bg-black/80 text-[8px] font-bold px-1 text-gray-300">
                                {car.images.length} foto's
                              </span>
                            </div>
                            <div>
                              <div className="font-bold text-white text-xs">
                                {car.brand} {car.model}
                              </div>
                              <div className="text-[11px] text-gray-400 truncate max-w-xs">
                                {car.edition || car.category}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-3 font-semibold text-gray-300">{car.year}</td>
                          <td className="py-3 px-3 font-semibold text-gray-300">
                            {car.mileage.toLocaleString('nl-BE')} km
                          </td>
                          <td className="py-3 px-3 text-gray-300">{car.fuel}</td>
                          <td className="py-3 px-3 font-bold text-[#FF6B00]">
                            {formatCurrencyPrice(car.price, 'EUR')}
                          </td>
                          <td className="py-3 px-3 text-center">
                            {car.status === 'reserved' ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">
                                Gereserveerd
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                Te Koop
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => onToggleSold(car.id)}
                                title="Markeer als verkocht"
                                className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-emerald-600/30 text-emerald-400 hover:text-emerald-300 text-[11px] font-bold transition-colors cursor-pointer border border-zinc-700"
                              >
                                Verkocht
                              </button>
                              <button
                                onClick={() => handleStartEditCar(car)}
                                title="Bewerken"
                                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-gray-300 hover:text-white transition-colors cursor-pointer"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => onDeleteCar(car.id, true)}
                                title="Naar prullenbak"
                                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-red-900/40 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: VERKOCHTE WAGENS (APART STUK VOOR VERKOCHTE AUTOS) */}
          {activeTab === 'sold' && (
            <div className="space-y-6">
              {/* Sold Stats Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-zinc-900/60 p-4 sm:p-5 rounded-2xl border border-zinc-800">
                  <span className="text-[11px] uppercase font-bold text-gray-400 block mb-1">
                    Totaal Verkochte Wagens
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-['Outfit',sans-serif]">
                    {soldCars.length} voertuigen
                  </div>
                  <span className="text-[11px] text-gray-500 mt-1 block">
                    Gearchiveerd als geleverd aan klanten
                  </span>
                </div>

                <div className="bg-zinc-900/60 p-4 sm:p-5 rounded-2xl border border-zinc-800">
                  <span className="text-[11px] uppercase font-bold text-gray-400 block mb-1">
                    Gerealiseerd Verkoopvolume
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-white font-['Outfit',sans-serif]">
                    {formatCurrencyPrice(totalSoldValue, 'EUR')}
                  </div>
                  <span className="text-[11px] text-gray-500 mt-1 block">
                    Cumulatieve waarde verkochte stock
                  </span>
                </div>

                <div className="bg-zinc-900/60 p-4 sm:p-5 rounded-2xl border border-zinc-800">
                  <span className="text-[11px] uppercase font-bold text-gray-400 block mb-1">
                    Publieke Weergave
                  </span>
                  <div className="text-sm font-bold text-gray-200 mt-2">
                    Zichtbaar met "VERKOCHT" label
                  </div>
                  <span className="text-[11px] text-gray-500 mt-1 block">
                    Verhoogt vertrouwen & verkoopritme bij bezoekers
                  </span>
                </div>
              </div>

              {/* Mobile View: Sold Car Cards */}
              <div className="md:hidden space-y-3">
                {filteredSoldCars.length === 0 ? (
                  <div className="py-10 text-center text-gray-500 bg-zinc-900/40 rounded-2xl border border-zinc-800 p-4 text-xs">
                    Er staan momenteel geen wagens gemarkeerd als verkocht. Klik in de Actieve Voorraad op "Verkocht" om een wagen hierheen te verplaatsen.
                  </div>
                ) : (
                  filteredSoldCars.map((car) => (
                    <div key={car.id} className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-3.5 space-y-3 opacity-95">
                      <div className="flex items-start gap-3">
                        <div className="w-20 h-16 rounded-xl overflow-hidden bg-black shrink-0 relative border border-zinc-700/50 grayscale">
                          <img src={car.images[0]} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-1.5">
                            <span className="font-bold text-white text-xs truncate line-through decoration-gray-500">
                              {car.brand} {car.model}
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-red-500/20 text-red-400 border border-red-500/30 shrink-0">
                              VERKOCHT
                            </span>
                          </div>
                          <div className="text-[11px] text-gray-400 truncate">
                            {car.edition || car.category}
                          </div>
                          <div className="text-[11px] text-gray-400 mt-0.5">
                            {car.year} • {car.mileage.toLocaleString('nl-BE')} km
                          </div>
                          <div className="text-sm font-extrabold text-gray-300 mt-0.5">
                            {formatCurrencyPrice(car.price, 'EUR')}
                          </div>
                        </div>
                      </div>

                      {/* Mobile Action Buttons */}
                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-800/80">
                        <button
                          onClick={() => onToggleSold(car.id)}
                          className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-zinc-800 hover:bg-[#FF6B00] text-white text-xs font-bold transition-colors cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Herstel</span>
                        </button>
                        <button
                          onClick={() => handleStartEditCar(car)}
                          className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-gray-300 hover:text-white text-xs font-bold transition-colors cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Bewerk</span>
                        </button>
                        <button
                          onClick={() => onDeleteCar(car.id, true)}
                          className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-zinc-800 hover:bg-red-900/40 text-gray-400 hover:text-red-400 text-xs font-bold transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Wissen</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Desktop View: Sold Cars Table */}
              <div className="hidden md:block rounded-2xl border border-zinc-800 overflow-hidden bg-zinc-900/40 overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[700px]">
                  <thead className="bg-zinc-900/90 text-gray-400 uppercase font-black tracking-wider text-[10px] border-b border-zinc-800">
                    <tr>
                      <th className="py-3 px-4">Verkocht Voertuig</th>
                      <th className="py-3 px-3">Bouwjaar</th>
                      <th className="py-3 px-3">Kilometerstand</th>
                      <th className="py-3 px-3">Verkoopprijs</th>
                      <th className="py-3 px-3 text-center">Status</th>
                      <th className="py-3 px-4 text-right">Acties</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {filteredSoldCars.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-gray-500">
                          Er staan momenteel geen wagens gemarkeerd als verkocht. Klik in de Actieve Voorraad op "Verkocht" om een wagen hierheen te verplaatsen.
                        </td>
                      </tr>
                    ) : (
                      filteredSoldCars.map((car) => (
                        <tr key={car.id} className="hover:bg-zinc-800/40 transition-colors opacity-90">
                          <td className="py-3 px-4 flex items-center gap-3">
                            <div className="w-14 h-10 rounded-lg overflow-hidden bg-black shrink-0 relative border border-zinc-700/50 grayscale">
                              <img src={car.images[0]} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <div className="font-bold text-white text-xs line-through decoration-gray-500">
                                {car.brand} {car.model}
                              </div>
                              <div className="text-[11px] text-gray-400 truncate max-w-xs">
                                {car.edition || car.category}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-gray-400">{car.year}</td>
                          <td className="py-3 px-3 text-gray-400">
                            {car.mileage.toLocaleString('nl-BE')} km
                          </td>
                          <td className="py-3 px-3 font-bold text-gray-300">
                            {formatCurrencyPrice(car.price, 'EUR')}
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                              VERKOCHT
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => onToggleSold(car.id)}
                                title="Zet terug in actieve voorraad"
                                className="px-3 py-1 rounded-lg bg-zinc-800 hover:bg-[#FF6B00] text-white text-[11px] font-bold transition-all cursor-pointer border border-zinc-700 flex items-center gap-1.5"
                              >
                                <RotateCcw className="w-3 h-3" />
                                <span>Terug in Stock</span>
                              </button>
                              <button
                                onClick={() => handleStartEditCar(car)}
                                title="Bewerken"
                                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-gray-300 hover:text-white transition-colors cursor-pointer"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => onDeleteCar(car.id, true)}
                                title="Verwijderen"
                                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-red-900/40 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: WAGEN TOEVOEGEN / BEWERKEN (MET SORTEERBARE FOTO'S & HOOFDFOTO KIEZEN) */}
          {activeTab === 'add' && (
            <form onSubmit={handleSubmitCarForm} className="space-y-6 max-w-5xl mx-auto">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                <h3 className="text-lg font-black font-['Outfit',sans-serif]">
                  {editingCarId ? `Wagen Bewerken: ${carForm.brand} ${carForm.model}` : 'Nieuwe Wagen Aanmaken'}
                </h3>
                <span className="text-xs text-gray-400">
                  Alle velden zijn direct bewerkbaar
                </span>
              </div>

              {/* Basis Gegevens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-300 mb-1">Merk *</label>
                  <input
                    type="text"
                    required
                    placeholder="bv. Porsche, BMW, Mercedes-Benz"
                    value={carForm.brand || ''}
                    onChange={(e) => setCarForm({ ...carForm, brand: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-300 mb-1">Model *</label>
                  <input
                    type="text"
                    required
                    placeholder="bv. 911 Carrera 4 GTS of X5 xDrive45e"
                    value={carForm.model || ''}
                    onChange={(e) => setCarForm({ ...carForm, model: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-300 mb-1">Uitvoering / Pakket</label>
                  <input
                    type="text"
                    placeholder="bv. M-Sport / AMG Line / Panodak"
                    value={carForm.edition || ''}
                    onChange={(e) => setCarForm({ ...carForm, edition: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-300 mb-1">Bouwjaar</label>
                  <input
                    type="number"
                    value={carForm.year || new Date().getFullYear()}
                    onChange={(e) => setCarForm({ ...carForm, year: Number(e.target.value) })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-300 mb-1">Kilometerstand (km)</label>
                  <input
                    type="number"
                    value={carForm.mileage || 0}
                    onChange={(e) => setCarForm({ ...carForm, mileage: Number(e.target.value) })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-300 mb-1">Vraagprijs (€)</label>
                  <input
                    type="number"
                    required
                    value={carForm.price || 0}
                    onChange={(e) => setCarForm({ ...carForm, price: Number(e.target.value) })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-white font-bold text-[#FF6B00]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-300 mb-1">Prijsregeling</label>
                  <select
                    value={carForm.priceType || 'BTW Aftrekbaar'}
                    onChange={(e) =>
                      setCarForm({
                        ...carForm,
                        priceType: e.target.value as any,
                        vatDeductible: e.target.value === 'BTW Aftrekbaar',
                      })
                    }
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-white"
                  >
                    <option value="BTW Aftrekbaar">BTW Aftrekbaar (21% Recupereerbaar)</option>
                    <option value="Marge">Marge (Geen BTW aftrekbaar)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-300 mb-1">Brandstof</label>
                  <select
                    value={carForm.fuel || 'Benzine'}
                    onChange={(e) => setCarForm({ ...carForm, fuel: e.target.value as any })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-white"
                  >
                    <option value="Benzine">Benzine</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Plug-in Hybride">Plug-in Hybride</option>
                    <option value="Mild Hybride">Mild Hybride</option>
                    <option value="Elektrisch">Elektrisch</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-300 mb-1">Transmissie</label>
                  <select
                    value={carForm.transmission || 'Automaat'}
                    onChange={(e) => setCarForm({ ...carForm, transmission: e.target.value as any })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-white"
                  >
                    <option value="Automaat">Automaat</option>
                    <option value="Manueel">Manueel (Handgeschakeld)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-300 mb-1">Vermogen (PK / HP)</label>
                  <input
                    type="number"
                    value={carForm.powerHp || 150}
                    onChange={(e) => setCarForm({ ...carForm, powerHp: Number(e.target.value) })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-300 mb-1">Carrosserietype</label>
                  <select
                    value={carForm.bodyType || 'SUV / 4x4'}
                    onChange={(e) => setCarForm({ ...carForm, bodyType: e.target.value as any })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-white"
                  >
                    <option value="SUV / 4x4">SUV / 4x4</option>
                    <option value="Berline">Berline / Sedan</option>
                    <option value="Break">Break / Station</option>
                    <option value="Coupé">Coupé</option>
                    <option value="Cabriolet">Cabriolet</option>
                    <option value="Sportwagen">Sportwagen</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-300 mb-1">Status van de wagen</label>
                  <select
                    value={carForm.status || 'available'}
                    onChange={(e) => setCarForm({ ...carForm, status: e.target.value as any })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-white font-bold"
                  >
                    <option value="available">Te Koop (Direct beschikbaar in showroom)</option>
                    <option value="reserved">Gereserveerd</option>
                    <option value="sold">VERKOCHT</option>
                  </select>
                </div>
              </div>

              {/* FOTOBEHEER & DRAG-AND-DROP SORTERING */}
              <div className="bg-zinc-900/70 p-5 rounded-3xl border border-zinc-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-sm text-white flex items-center gap-2">
                      <Camera className="w-4 h-4 text-[#FF6B00]" />
                      <span>Fotogalerij & Volgorde Aanpassen ({carForm.images?.length || 0} foto's)</span>
                    </h4>
                    <p className="text-[11px] text-gray-400">
                      <strong>Versleep foto's (drag-and-drop)</strong> om de volgorde direct aan te passen. De eerste foto is automatisch de <strong>Hoofdfoto</strong>.
                    </p>
                  </div>

                  <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white font-bold text-xs cursor-pointer shadow-xs transition-colors self-start sm:self-auto">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isCompressing ? 'Foto’s verwerken...' : 'Nieuwe Foto’s Uploaden'}</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isCompressing}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Snel URLs plakken box */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Of plak directe foto URL(s) (gescheiden door komma)..."
                    value={urlPasteInput}
                    onChange={(e) => setUrlPasteInput(e.target.value)}
                    className="flex-1 bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white placeholder:text-zinc-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageUrls}
                    className="px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Toevoegen
                  </button>
                </div>

                {/* Interactive Drag & Drop Photo Grid */}
                {carForm.images && carForm.images.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 pt-2">
                    {carForm.images.map((img, idx) => (
                      <div
                        key={idx}
                        draggable
                        onDragStart={(e) => handleFormDragStart(e, idx)}
                        onDragOver={(e) => handleFormDragOver(e, idx)}
                        onDrop={(e) => handleFormDrop(e, idx)}
                        onDragEnd={handleFormDragEnd}
                        className={`relative rounded-2xl overflow-hidden group bg-black border-2 transition-all cursor-grab active:cursor-grabbing select-none ${
                          dragOverFormIdx === idx
                            ? 'border-[#FF6B00] ring-4 ring-[#FF6B00]/40 scale-102 z-20 shadow-2xl'
                            : draggedFormIdx === idx
                            ? 'opacity-30 border-dashed border-gray-500'
                            : idx === 0
                            ? 'border-[#FF6B00] shadow-md ring-2 ring-[#FF6B00]/20'
                            : 'border-zinc-800 hover:border-zinc-600'
                        }`}
                        title="Versleep deze foto naar een andere positie"
                      >
                        <div className="aspect-[4/3] w-full relative">
                          <img src={img} alt="" className="w-full h-full object-cover pointer-events-none" />
                        </div>

                        {/* Top Badge: Number / Main + Drag Grip Icon */}
                        <div className="absolute top-1.5 left-1.5 z-10 flex items-center gap-1">
                          <div className="p-1 rounded-md bg-black/80 text-white/90 shadow-xs flex items-center justify-center">
                            <GripVertical className="w-3 h-3" />
                          </div>
                          {idx === 0 ? (
                            <span className="px-2 py-0.5 rounded-md bg-[#FF6B00] text-white text-[9px] font-black uppercase tracking-wider flex items-center gap-1 shadow-sm">
                              <Star className="w-2.5 h-2.5 fill-white" />
                              Hoofd
                            </span>
                          ) : (
                            <span className="px-1.5 py-0.5 rounded-md bg-black/70 text-gray-300 text-[10px] font-bold">
                              #{idx + 1}
                            </span>
                          )}
                        </div>

                        {/* Delete Button */}
                        <div className="absolute top-1.5 right-1.5 z-10">
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            title="Foto verwijderen"
                            className="p-1.5 rounded-full bg-red-600/90 hover:bg-red-600 text-white transition-opacity cursor-pointer shadow-sm"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Action Toolbar on Bottom */}
                        <div className="p-1.5 bg-zinc-950/90 flex items-center justify-between gap-1 text-gray-300 border-t border-zinc-800">
                          <button
                            type="button"
                            onClick={() => handleMoveImage(idx, 'left')}
                            disabled={idx === 0}
                            title="Verplaats naar links"
                            className="p-1 rounded hover:bg-zinc-800 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>

                          {idx !== 0 && (
                            <button
                              type="button"
                              onClick={() => handleSetMainImage(idx)}
                              title="Maak dit de hoofdfoto"
                              className="px-1.5 py-0.5 rounded text-[9px] font-bold text-amber-400 hover:bg-amber-400/20 cursor-pointer"
                            >
                              Kies als Hoofd
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => handleMoveImage(idx, 'right')}
                            disabled={idx === (carForm.images?.length || 0) - 1}
                            title="Verplaats naar rechts"
                            className="p-1 rounded hover:bg-zinc-800 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center border-2 border-dashed border-zinc-800 rounded-2xl text-gray-500 text-xs">
                    Nog geen foto's toegevoegd. Upload afbeeldingen of importeer via AutoScout24.
                  </div>
                )}
              </div>

              {/* Opties & Extra Uitrusting */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-gray-300">Opties & Extra Uitrusting</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="bv. Panoramisch schuifdak, Harman Kardon audio..."
                    value={newOptionInput}
                    onChange={(e) => setNewOptionInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (newOptionInput.trim()) {
                          setCarForm({
                            ...carForm,
                            options: [...(carForm.options || []), newOptionInput.trim()],
                          });
                          setNewOptionInput('');
                        }
                      }
                    }}
                    className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newOptionInput.trim()) {
                        setCarForm({
                          ...carForm,
                          options: [...(carForm.options || []), newOptionInput.trim()],
                        });
                        setNewOptionInput('');
                      }
                    }}
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Toevoegen
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(carForm.options || []).map((opt, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-800 text-gray-200 text-xs border border-zinc-700"
                    >
                      <span>{opt}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setCarForm({
                            ...carForm,
                            options: carForm.options?.filter((_, idx) => idx !== i),
                          });
                        }}
                        className="hover:text-red-400 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Beschrijving */}
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Beschrijving van het voertuig</label>
                <textarea
                  rows={4}
                  placeholder="Vermeld onderhoudshistoriek, staat van de wagen, Car-Pass gegevens..."
                  value={carForm.description || ''}
                  onChange={(e) => setCarForm({ ...carForm, description: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-xs text-white"
                />
              </div>

              {formError && (
                <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-800 text-red-200 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Form Actieknoppen */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => {
                    setEditingCarId(null);
                    setCarForm(defaultCarForm);
                    setFormError(null);
                    setActiveTab('stock');
                  }}
                  className="px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-gray-300 font-bold text-xs cursor-pointer transition-colors"
                >
                  Annuleren
                </button>
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white font-bold uppercase tracking-wider text-xs shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingCarId ? 'Wijzigingen Opslaan' : 'Wagen Publiceren'}</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 4: AUTOSCOUT24 IMPORT */}
          {activeTab === 'autoscout' && (
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="bg-zinc-900/70 p-5 sm:p-6 rounded-2xl border border-zinc-800 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/15 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00] shrink-0">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold font-['Outfit',sans-serif] text-white">
                        AutoScout24 Advertentie Importeren
                      </h3>
                      <p className="text-xs text-zinc-400">
                        Zet een AutoScout24 zoekertje in seconden om naar uw eigen voorraad met alle foto&apos;s, opties en prijs.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3 Clear Input Methods */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-[11px] text-zinc-300">
                  <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800">
                    <span className="font-bold text-white block mb-0.5">1. Link plakken</span>
                    <span className="text-zinc-400">Plak de advertentie-URL (.be, .nl, .de, .fr).</span>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800">
                    <span className="font-bold text-[#FF6B00] block mb-0.5">2. Paginabron (Ctrl+U)</span>
                    <span className="text-zinc-400">Open advertentie → Ctrl+U → Ctrl+A → plak hier. Werkt 100% altijd.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800">
                    <span className="font-bold text-white block mb-0.5">3. HTML-bestand (Ctrl+S)</span>
                    <span className="text-zinc-400">Sla pagina op en sleep het .html bestand hieronder.</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <textarea
                    rows={4}
                    placeholder="Plak hier een AutoScout24 URL (https://www.autoscout24.be/...) of de gekopieerde HTML paginabron (Ctrl+U)..."
                    value={autoscoutInput}
                    onChange={(e) => setAutoscoutInput(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3.5 text-xs text-white font-mono focus:ring-2 focus:ring-[#FF6B00] focus:outline-none placeholder:text-zinc-600"
                  />

                  {/* HTML File Drag & Drop + File Picker + Action Button */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <label
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDraggingHtmlFile(true);
                      }}
                      onDragLeave={() => setIsDraggingHtmlFile(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDraggingHtmlFile(false);
                        const file = e.dataTransfer.files?.[0];
                        if (file) handleAutoScoutHtmlFile(file);
                      }}
                      className={`flex-1 flex items-center justify-center sm:justify-start gap-2.5 px-4 py-2.5 rounded-xl border border-dashed text-xs cursor-pointer transition-colors ${
                        isDraggingHtmlFile
                          ? 'border-[#FF6B00] bg-[#FF6B00]/10 text-white'
                          : 'border-zinc-700 bg-zinc-950/60 hover:border-zinc-500 text-zinc-300'
                      }`}
                    >
                      <FileCode className="w-4 h-4 text-[#FF6B00] shrink-0" />
                      <span className="truncate">
                        {uploadedHtmlName
                          ? `Bestand geladen: ${uploadedHtmlName}`
                          : 'Of sleep/kies opgeslagen .html bestand (Ctrl+S)'}
                      </span>
                      <input
                        type="file"
                        accept=".html,.htm,.txt"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleAutoScoutHtmlFile(file);
                          e.target.value = '';
                        }}
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => handleAutoScoutParse()}
                      disabled={isLoadingImport}
                      className="px-6 py-3 bg-[#FF6B00] hover:bg-orange-600 disabled:opacity-50 text-white font-bold uppercase tracking-wider text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shrink-0"
                    >
                      {isLoadingImport ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>Gegevens &amp; Foto&apos;s Ophalen...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>Advertentie Uitlezen</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {importStatus && (
                  <div
                    className={`p-4 rounded-xl border text-xs flex items-start gap-3 ${
                      importStatus.type === 'error'
                        ? 'bg-red-950/40 border-red-800/60 text-red-200'
                        : importStatus.type === 'warning'
                        ? 'bg-amber-950/40 border-amber-700/60 text-amber-100'
                        : 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200'
                    }`}
                  >
                    {importStatus.type === 'success' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle
                        className={`w-5 h-5 shrink-0 mt-0.5 ${
                          importStatus.type === 'error' ? 'text-red-400' : 'text-amber-400'
                        }`}
                      />
                    )}
                    <div className="space-y-1">
                      <p className="font-bold text-white">{importStatus.text}</p>
                      {importStatus.detail && (
                        <p className="text-[11px] text-zinc-300 leading-relaxed">{importStatus.detail}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Clean Editable Imported Preview */}
              {parsedPreviewCar && (
                <div className="bg-zinc-900/90 p-5 sm:p-6 rounded-2xl border border-[#FF6B00]/60 space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF6B00]">
                        Import Voorbeeld · {parsedPreviewCar.images?.length || 0} foto&apos;s gevonden
                      </span>
                      <h4 className="text-xl font-extrabold mt-1 font-['Outfit',sans-serif] text-white">
                        {parsedPreviewCar.brand || 'Merk'} {parsedPreviewCar.model || 'Model'}{' '}
                        <span className="font-normal text-zinc-400 text-base">{parsedPreviewCar.edition}</span>
                      </h4>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setParsedPreviewCar(null);
                          setImportStatus(null);
                          setUploadedHtmlName(null);
                        }}
                        className="px-3.5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold text-xs transition-colors cursor-pointer"
                      >
                        Wissen
                      </button>
                      <button
                        type="button"
                        onClick={handleTransferPreviewToForm}
                        className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs transition-colors cursor-pointer"
                      >
                        Volledig Formulier
                      </button>
                      <button
                        type="button"
                        onClick={handlePublishAutoScoutDirect}
                        disabled={!parsedPreviewCar.brand?.trim() || !parsedPreviewCar.model?.trim()}
                        className="px-5 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-orange-600 disabled:opacity-40 text-white font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        <span>Direct Publiceren</span>
                      </button>
                    </div>
                  </div>

                  {/* Complete Editable Specs Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs">
                    <div>
                      <label className="block font-semibold text-zinc-400 mb-1">Merk *</label>
                      <input
                        type="text"
                        value={parsedPreviewCar.brand || ''}
                        onChange={(e) => setParsedPreviewCar({ ...parsedPreviewCar, brand: e.target.value })}
                        placeholder="bv. BMW"
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-white font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-zinc-400 mb-1">Model *</label>
                      <input
                        type="text"
                        value={parsedPreviewCar.model || ''}
                        onChange={(e) => setParsedPreviewCar({ ...parsedPreviewCar, model: e.target.value })}
                        placeholder="bv. X5 xDrive45e"
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-white font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-zinc-400 mb-1">Uitvoering</label>
                      <input
                        type="text"
                        value={parsedPreviewCar.edition || ''}
                        onChange={(e) => setParsedPreviewCar({ ...parsedPreviewCar, edition: e.target.value })}
                        placeholder="bv. M-Sport"
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-zinc-400 mb-1">Vraagprijs (€)</label>
                      <input
                        type="number"
                        value={parsedPreviewCar.price || ''}
                        onChange={(e) => setParsedPreviewCar({ ...parsedPreviewCar, price: Number(e.target.value) })}
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-[#FF6B00] font-bold tabular-nums"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-zinc-400 mb-1">Bouwjaar</label>
                      <input
                        type="number"
                        value={parsedPreviewCar.year || ''}
                        onChange={(e) => setParsedPreviewCar({ ...parsedPreviewCar, year: Number(e.target.value) })}
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-white tabular-nums"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-zinc-400 mb-1">Kilometerstand (km)</label>
                      <input
                        type="number"
                        value={parsedPreviewCar.mileage || ''}
                        onChange={(e) => setParsedPreviewCar({ ...parsedPreviewCar, mileage: Number(e.target.value) })}
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-white tabular-nums"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-zinc-400 mb-1">Brandstof</label>
                      <select
                        value={parsedPreviewCar.fuel || 'Benzine'}
                        onChange={(e) => setParsedPreviewCar({ ...parsedPreviewCar, fuel: e.target.value as FuelType })}
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-white"
                      >
                        <option value="Benzine">Benzine</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Plug-in Hybride">Plug-in Hybride</option>
                        <option value="Mild Hybride">Mild Hybride</option>
                        <option value="Elektrisch">Elektrisch</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-semibold text-zinc-400 mb-1">Transmissie</label>
                      <select
                        value={parsedPreviewCar.transmission || 'Automaat'}
                        onChange={(e) => setParsedPreviewCar({ ...parsedPreviewCar, transmission: e.target.value as TransmissionType })}
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-white"
                      >
                        <option value="Automaat">Automaat</option>
                        <option value="Manueel">Manueel</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-zinc-400 mb-1">Vermogen (PK)</label>
                      <input
                        type="number"
                        value={parsedPreviewCar.powerHp || ''}
                        onChange={(e) => setParsedPreviewCar({ ...parsedPreviewCar, powerHp: Number(e.target.value) })}
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-white tabular-nums"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-zinc-400 mb-1">Prijsregeling</label>
                      <select
                        value={parsedPreviewCar.priceType || 'Marge'}
                        onChange={(e) =>
                          setParsedPreviewCar({
                            ...parsedPreviewCar,
                            priceType: e.target.value as any,
                            vatDeductible: e.target.value === 'BTW Aftrekbaar',
                          })
                        }
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-white"
                      >
                        <option value="BTW Aftrekbaar">BTW Aftrekbaar</option>
                        <option value="Marge">Marge</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-semibold text-zinc-400 mb-1">Kleur Exterieur</label>
                      <input
                        type="text"
                        value={parsedPreviewCar.color || ''}
                        onChange={(e) => setParsedPreviewCar({ ...parsedPreviewCar, color: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-zinc-400 mb-1">Status</label>
                      <select
                        value={parsedPreviewCar.status || 'available'}
                        onChange={(e) => setParsedPreviewCar({ ...parsedPreviewCar, status: e.target.value as any })}
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-white font-semibold"
                      >
                        <option value="available">Te Koop (Showroom)</option>
                        <option value="reserved">Gereserveerd</option>
                      </select>
                    </div>
                  </div>

                  {/* Description & Options Preview */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-semibold text-zinc-400 mb-1.5">Beschrijving</label>
                      <textarea
                        rows={4}
                        value={parsedPreviewCar.description || ''}
                        onChange={(e) => setParsedPreviewCar({ ...parsedPreviewCar, description: e.target.value })}
                        placeholder="Geen beschrijving gevonden — vul eventueel aan..."
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block font-semibold text-zinc-400">
                        Herkende Opties ({parsedPreviewCar.options?.length || 0})
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newPreviewOption}
                          onChange={(e) => setNewPreviewOption(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              if (newPreviewOption.trim()) {
                                setParsedPreviewCar({
                                  ...parsedPreviewCar,
                                  options: [...(parsedPreviewCar.options || []), newPreviewOption.trim()],
                                });
                                setNewPreviewOption('');
                              }
                            }
                          }}
                          placeholder="Optie toevoegen..."
                          className="flex-1 bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-white"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (newPreviewOption.trim()) {
                              setParsedPreviewCar({
                                ...parsedPreviewCar,
                                options: [...(parsedPreviewCar.options || []), newPreviewOption.trim()],
                              });
                              setNewPreviewOption('');
                            }
                          }}
                          className="px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pt-1">
                        {(parsedPreviewCar.options || []).map((opt, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-200 text-[11px] border border-zinc-700"
                          >
                            <span>{opt}</span>
                            <button
                              type="button"
                              onClick={() =>
                                setParsedPreviewCar({
                                  ...parsedPreviewCar,
                                  options: (parsedPreviewCar.options || []).filter((_, i) => i !== idx),
                                })
                              }
                              className="text-zinc-400 hover:text-red-400 cursor-pointer"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Photo Reorder Gallery for AutoScout Import with Drag & Drop */}
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h5 className="font-bold text-sm text-white flex items-center gap-2">
                          <Camera className="w-4 h-4 text-[#FF6B00]" />
                          <span>Advertentiefoto&apos;s ({parsedPreviewCar.images?.length || 0})</span>
                        </h5>
                        <p className="text-[11px] text-zinc-400">
                          Versleep foto&apos;s om de volgorde te wijzigen. Foto #1 wordt de hoofdfoto.
                        </p>
                      </div>
                    </div>

                    {parsedPreviewCar.images && parsedPreviewCar.images.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {parsedPreviewCar.images.map((img, idx) => (
                          <div
                            key={idx}
                            draggable
                            onDragStart={(e) => handlePreviewDragStart(e, idx)}
                            onDragOver={(e) => handlePreviewDragOver(e, idx)}
                            onDrop={(e) => handlePreviewDrop(e, idx)}
                            onDragEnd={handlePreviewDragEnd}
                            className={`relative rounded-xl overflow-hidden group bg-black border-2 transition-all cursor-grab active:cursor-grabbing select-none ${
                              dragOverPreviewIdx === idx
                                ? 'border-[#FF6B00] ring-2 ring-[#FF6B00]/40 z-20'
                                : draggedPreviewIdx === idx
                                ? 'opacity-30 border-dashed border-zinc-500'
                                : idx === 0
                                ? 'border-[#FF6B00]'
                                : 'border-zinc-800 hover:border-zinc-600'
                            }`}
                          >
                            <div className="aspect-[4/3] w-full relative">
                              <img
                                src={img}
                                alt=""
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).src = '/logo2.png';
                                }}
                                className="w-full h-full object-cover pointer-events-none"
                              />
                            </div>

                            <div className="absolute top-1.5 left-1.5 z-10 flex items-center gap-1">
                              <div className="p-1 rounded bg-black/80 text-white/90">
                                <GripVertical className="w-3 h-3" />
                              </div>
                              {idx === 0 ? (
                                <span className="px-1.5 py-0.5 rounded bg-[#FF6B00] text-white text-[9px] font-bold uppercase flex items-center gap-1">
                                  <Star className="w-2.5 h-2.5 fill-white" />
                                  Hoofd
                                </span>
                              ) : (
                                <span className="px-1.5 py-0.5 rounded bg-black/75 text-zinc-300 text-[10px] font-bold tabular-nums">
                                  #{idx + 1}
                                </span>
                              )}
                            </div>

                            <div className="absolute top-1.5 right-1.5 z-10">
                              <button
                                type="button"
                                onClick={() => handlePreviewRemoveImage(idx)}
                                title="Foto verwijderen"
                                className="p-1 rounded-full bg-red-600/90 hover:bg-red-600 text-white cursor-pointer"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>

                            <div className="p-1.5 bg-zinc-950/90 flex items-center justify-between gap-1 text-zinc-300 border-t border-zinc-800">
                              <button
                                type="button"
                                onClick={() => handlePreviewMoveImage(idx, 'left')}
                                disabled={idx === 0}
                                className="p-1 rounded hover:bg-zinc-800 disabled:opacity-20 cursor-pointer"
                              >
                                <ChevronLeft className="w-3.5 h-3.5" />
                              </button>

                              {idx !== 0 && (
                                <button
                                  type="button"
                                  onClick={() => handlePreviewSetMainImage(idx)}
                                  className="px-1.5 py-0.5 rounded text-[9px] font-bold text-amber-400 hover:bg-amber-400/20 cursor-pointer"
                                >
                                  Hoofdfoto
                                </button>
                              )}

                              <button
                                type="button"
                                onClick={() => handlePreviewMoveImage(idx, 'right')}
                                disabled={idx === (parsedPreviewCar.images?.length || 0) - 1}
                                className="p-1 rounded hover:bg-zinc-800 disabled:opacity-20 cursor-pointer"
                              >
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-6 text-center rounded-xl border border-dashed border-zinc-700 text-xs text-zinc-400">
                        Geen foto&apos;s gevonden via de URL. Plak de paginabron (Ctrl+U) of klik op &quot;Volledig Formulier&quot; om eigen foto&apos;s te uploaden.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: LEADS & AANVRAGEN (ECHT BINNENKOMENDE BERICHTEN) */}
          {activeTab === 'leads' && (
            <div className="space-y-4">
              <div className="bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-black flex items-center gap-2 font-['Outfit',sans-serif]">
                    <Eye className="w-5 h-5 text-sky-400" />
                    <span>Binnenkomende Aanvragen & Leads ({safeLeads.length})</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Automatische opschoning na 30 dagen • Handmatig beheren, direct contacteren of wissen
                  </p>
                </div>
                {safeLeads.length > 0 && onClearAllLeads && (
                  confirmClearAllLeads ? (
                    <div className="flex items-center gap-2 bg-red-950/80 border border-red-800 rounded-xl px-3 py-1.5 self-start sm:self-auto">
                      <span className="text-xs text-red-200 font-bold">Alles wissen?</span>
                      <button
                        type="button"
                        onClick={() => {
                          onClearAllLeads();
                          setConfirmClearAllLeads(false);
                        }}
                        className="px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                      >
                        Ja, wissen
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmClearAllLeads(false)}
                        className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-gray-300 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                      >
                        Annuleren
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmClearAllLeads(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-800/60 text-xs font-bold transition-colors cursor-pointer self-start sm:self-auto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Alle Leads Wissen</span>
                    </button>
                  )
                )}
              </div>

              {safeLeads.length === 0 ? (
                <div className="py-16 text-center border border-zinc-800 rounded-3xl bg-zinc-900/30">
                  <CheckCircle2 className="w-10 h-10 text-gray-500 mx-auto mb-2" />
                  <h4 className="font-bold text-sm text-gray-300">Geen onbeantwoorde aanvragen</h4>
                  <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                    Nieuwe aanvragen van bezoekers verschijnen direct hier in realtime.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {safeLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-colors space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              lead.status === 'new'
                                ? 'bg-[#FF6B00]/20 text-[#FF6B00] border border-[#FF6B00]/30'
                                : lead.status === 'contacted'
                                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            }`}
                          >
                            {lead.status === 'new' ? 'Nieuw' : lead.status === 'contacted' ? 'In Behandeling' : 'Afgerond'}
                          </span>
                          <span className="text-xs text-gray-400 font-mono">
                            {lead.date || (lead.createdAt ? new Date(lead.createdAt).toLocaleDateString('nl-BE', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            }) : 'Onlangs')}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Hallo%20${encodeURIComponent(lead.name)}%2C%20ik%20contacteer%20u%20vanuit%20Auto%20Sale%20Antwerpen.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>

                          <a
                            href={`tel:${lead.phone}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition-colors cursor-pointer border border-zinc-700"
                          >
                            <Phone className="w-3.5 h-3.5 text-[#FF6B00]" />
                            <span>Bellen</span>
                          </a>

                          {onUpdateLeadStatus && (
                            <select
                              value={lead.status}
                              onChange={(e) => onUpdateLeadStatus(lead.id, e.target.value as any)}
                              className="bg-zinc-950 border border-zinc-700 rounded-xl px-2.5 py-1 text-xs text-gray-300 font-bold"
                            >
                              <option value="new">Nieuw</option>
                              <option value="contacted">In Behandeling</option>
                              <option value="closed">Afgerond</option>
                            </select>
                          )}

                          {onDeleteLead && (
                            confirmDeleteLeadId === lead.id ? (
                              <div className="flex items-center gap-1.5 bg-red-950/80 border border-red-800 rounded-xl px-2 py-1">
                                <span className="text-[11px] text-red-200 font-bold whitespace-nowrap">Wissen?</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    onDeleteLead(lead.id);
                                    setConfirmDeleteLeadId(null);
                                  }}
                                  className="px-2 py-0.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-[11px] font-bold transition-colors cursor-pointer"
                                >
                                  Ja
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setConfirmDeleteLeadId(null)}
                                  className="px-2 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-gray-300 rounded-lg text-[11px] font-bold transition-colors cursor-pointer"
                                >
                                  Nee
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setConfirmDeleteLeadId(lead.id)}
                                title="Aanvraag verwijderen"
                                className="p-1.5 rounded-xl bg-zinc-800 hover:bg-red-900/50 text-gray-400 hover:text-red-400 transition-colors cursor-pointer border border-zinc-700"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <span className="text-gray-400 block text-[11px]">Klantnaam:</span>
                          <strong className="text-white text-sm">{lead.name}</strong>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[11px]">Telefoon & E-mail:</span>
                          <span className="text-gray-200">{lead.phone} • {lead.email}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[11px]">Onderwerp / Wagen:</span>
                          <span className="font-bold text-[#FF6B00]">{lead.subject || lead.carTitle || 'Algemeen'}</span>
                        </div>
                      </div>

                      {lead.message && (
                        <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800 text-xs text-gray-300 italic">
                          "{lead.message}"
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: INSTELLINGEN (BEDRIJF, SHOWROOM FOTO, SOCIAL MEDIA & AUTOSCOUT LINKS) */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveAllSettings} className="space-y-6 max-w-4xl mx-auto">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                <div>
                  <h3 className="text-base font-black font-['Outfit',sans-serif]">
                    Bedrijfsgegevens & Social Media Koppelingen
                  </h3>
                  <p className="text-xs text-gray-400">
                    Pas hier uw contactgegevens, showroomfoto en links naar AutoScout24, TikTok, Instagram en Facebook aan.
                  </p>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Opslaan</span>
                </button>
              </div>

              {settingsSavedToast && (
                <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Instellingen en social media links succesvol opgeslagen!</span>
                </div>
              )}

              {/* Showroom Foto Instellen */}
              <div className="bg-zinc-900/60 p-5 rounded-3xl border border-zinc-800 space-y-4">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#FF6B00] flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  <span>Showroom Foto (Bovenaan & Onderaan bij 25+ Jaar)</span>
                </h4>

                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="w-full sm:w-48 aspect-[16/10] rounded-2xl overflow-hidden bg-black border border-zinc-700 shrink-0">
                    <img
                      src={settingsForm.showroomImageUrl || '/assets/aistudio/unnamed_6b5d4ee5.jpg'}
                      alt="Showroom Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-2.5 w-full text-xs">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-300 mb-1">
                        Showroom Foto URL
                      </label>
                      <input
                        type="text"
                        placeholder="https://... of /assets/aistudio/unnamed_6b5d4ee5.jpg"
                        value={settingsForm.showroomImageUrl || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, showroomImageUrl: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white font-mono"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-gray-200 font-bold text-xs cursor-pointer border border-zinc-700 transition-colors">
                        <Upload className="w-3.5 h-3.5 text-[#FF6B00]" />
                        <span>Kies een nieuwe foto vanaf computer</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleShowroomPhotoUpload}
                          className="hidden"
                        />
                      </label>

                      {settingsForm.showroomImageUrl !== '/assets/aistudio/unnamed_6b5d4ee5.jpg' && (
                        <button
                          type="button"
                          onClick={() =>
                            setSettingsForm({
                              ...settingsForm,
                              showroomImageUrl: '/assets/aistudio/unnamed_6b5d4ee5.jpg',
                            })
                          }
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-semibold text-xs border border-zinc-700 cursor-pointer transition-colors"
                        >
                          <RotateCcw className="w-3.5 h-3.5 text-[#FF6B00]" />
                          <span>Standaardfoto herstellen</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media & AutoScout Links Beheren */}
              <div className="bg-zinc-900/60 p-5 rounded-3xl border border-zinc-800 space-y-4">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#FF6B00] flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  <span>Social Media & AutoScout24 Koppelingen</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-gray-300 mb-1 flex items-center gap-1.5">
                      <LinkIcon className="w-3.5 h-3.5 text-[#FF6B00]" />
                      <span>AutoScout24 Verkopersprofiel URL</span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://www.autoscout24.be/nl/verkopers/auto-sale-nv"
                      value={settingsForm.autoscoutUrl || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, autoscoutUrl: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-300 mb-1 flex items-center gap-1.5">
                      <Share2 className="w-3.5 h-3.5 text-pink-500" />
                      <span>TikTok Profiel URL</span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://www.tiktok.com/@autosaleantwerpen"
                      value={settingsForm.tiktokUrl || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, tiktokUrl: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-300 mb-1 flex items-center gap-1.5">
                      <Instagram className="w-3.5 h-3.5 text-purple-400" />
                      <span>Instagram Profiel URL</span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://www.instagram.com/autosaleantwerpen"
                      value={settingsForm.instagramUrl || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, instagramUrl: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-300 mb-1 flex items-center gap-1.5">
                      <Facebook className="w-3.5 h-3.5 text-blue-400" />
                      <span>Facebook Bedrijfspagina URL</span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://www.facebook.com/autosaleantwerpen"
                      value={settingsForm.facebookUrl || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, facebookUrl: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Algemene Contactgegevens */}
              <div className="bg-zinc-900/60 p-5 rounded-3xl border border-zinc-800 space-y-4">
                <h4 className="font-bold text-xs uppercase tracking-wider text-gray-300">
                  Contact & Vestigingsgegevens
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-gray-300 mb-1">Bedrijfsnaam</label>
                    <input
                      type="text"
                      value={settingsForm.name || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-300 mb-1">Telefoonnummer</label>
                    <input
                      type="text"
                      value={settingsForm.phone || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-300 mb-1">WhatsApp Nummer</label>
                    <input
                      type="text"
                      value={settingsForm.whatsapp || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-300 mb-1">E-mailadres</label>
                    <input
                      type="email"
                      value={settingsForm.email || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-300 mb-1">Straat & Huisnummer</label>
                    <input
                      type="text"
                      value={settingsForm.address || settingsForm.street || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value, street: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-300 mb-1">Stad / Gemeente</label>
                    <input
                      type="text"
                      value={settingsForm.city || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, city: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-300 mb-1">Postcode</label>
                    <input
                      type="text"
                      value={settingsForm.zipCode || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, zipCode: e.target.value })}
                      placeholder="2660"
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-300 mb-1">Google Maps Link</label>
                    <input
                      type="url"
                      value={settingsForm.googleMapsUrl || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, googleMapsUrl: e.target.value })}
                      placeholder="https://maps.google.com/..."
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white font-bold uppercase tracking-wider text-xs shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Alle Wijzigingen Opslaan</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 7: PRULLENBAK */}
          {activeTab === 'trash' && (
            <div className="space-y-4">
              <div className="bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black flex items-center gap-2">
                    <Trash2 className="w-5 h-5 text-amber-400" />
                    <span>Prullenbak ({trashedCars.length})</span>
                  </h3>
                  <p className="text-xs text-gray-400">
                    Wagens blijven hier bewaard en kunnen worden hersteld.
                  </p>
                </div>
              </div>

              {trashedCars.length === 0 ? (
                <div className="py-12 text-center text-gray-500 text-xs border border-zinc-800 rounded-2xl">
                  De prullenbak is leeg.
                </div>
              ) : (
                <div className="divide-y divide-zinc-800 border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-900/40 text-xs">
                  {trashedCars.map((car) => (
                    <div key={car.id} className="p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-9 rounded-lg overflow-hidden bg-black shrink-0">
                          <img src={car.images[0]} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-bold text-white">{car.brand} {car.model}</div>
                          <div className="text-[11px] text-gray-400">{car.year} • {formatCurrencyPrice(car.price, 'EUR')}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleRestore(car.id)}
                          className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-[#FF6B00] text-white font-bold text-xs transition-colors cursor-pointer"
                        >
                          Herstellen
                        </button>
                        <button
                          onClick={() => handlePermanentDelete(car.id)}
                          className="px-3 py-1.5 rounded-lg bg-red-900/40 hover:bg-red-600 text-red-300 hover:text-white font-bold text-xs transition-colors cursor-pointer"
                        >
                          Definitief Wissen
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
