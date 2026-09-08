import React, { useEffect, useCallback, useState, useRef } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Move
} from 'lucide-react';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  carTitle: string;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onIndexChange,
  carTitle,
}) => {
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const positionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Keep ref synced
  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  // Reset zoom and pan when image changes or modal closes
  const resetZoom = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    resetZoom();
  }, [currentIndex, isOpen, resetZoom]);

  const handlePrev = useCallback(() => {
    resetZoom();
    onIndexChange((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onIndexChange, resetZoom]);

  const handleNext = useCallback(() => {
    resetZoom();
    onIndexChange((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onIndexChange, resetZoom]);

  const zoomIn = () => {
    setScale((prev) => Math.min(4, Math.round((prev + 0.5) * 10) / 10));
  };

  const zoomOut = () => {
    setScale((prev) => {
      const next = Math.max(1, Math.round((prev - 0.5) * 10) / 10);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleDoubleClick = () => {
    if (scale > 1) {
      resetZoom();
    } else {
      setScale(2.5);
    }
  };

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
    if (e.deltaY < 0) {
      setScale((prev) => Math.min(4, Math.round((prev + 0.25) * 100) / 100));
    } else {
      setScale((prev) => {
        const next = Math.max(1, Math.round((prev - 0.25) * 100) / 100);
        if (next === 1) setPosition({ x: 0, y: 0 });
        return next;
      });
    }
  };

  // Drag panning when zoomed
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - positionRef.current.x,
      y: e.clientY - positionRef.current.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || scale <= 1) return;
    const newX = e.clientX - dragStartRef.current.x;
    const newY = e.clientY - dragStartRef.current.y;
    // Bound movement according to scale
    const maxBound = (scale - 1) * 350;
    const clampedX = Math.max(-maxBound, Math.min(maxBound, newX));
    const clampedY = Math.max(-maxBound, Math.min(maxBound, newY));
    setPosition({ x: clampedX, y: clampedY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch drag support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (scale <= 1 || e.touches.length !== 1) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.touches[0].clientX - positionRef.current.x,
      y: e.touches[0].clientY - positionRef.current.y,
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || scale <= 1 || e.touches.length !== 1) return;
    const newX = e.touches[0].clientX - dragStartRef.current.x;
    const newY = e.touches[0].clientY - dragStartRef.current.y;
    const maxBound = (scale - 1) * 350;
    const clampedX = Math.max(-maxBound, Math.min(maxBound, newX));
    const clampedY = Math.max(-maxBound, Math.min(maxBound, newY));
    setPosition({ x: clampedX, y: clampedY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && scale === 1) handlePrev();
      if (e.key === 'ArrowRight' && scale === 1) handleNext();
      if (e.key === '+' || e.key === '=') zoomIn();
      if (e.key === '-') zoomOut();
      if (e.key === '0') resetZoom();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext, scale, resetZoom]);

  if (!isOpen || images.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between select-none"
      onClick={onClose}
    >
      {/* Top Bar with Zoom Toolbar */}
      <div
        className="flex items-center justify-between px-4 sm:px-6 py-3.5 text-white z-20 bg-black/40 backdrop-blur-sm border-b border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <Maximize2 className="w-4 h-4 text-[#FF6B00]" />
          <span className="text-xs sm:text-sm font-bold truncate max-w-[140px] sm:max-w-md">
            {carTitle}
          </span>
          <span className="text-xs text-gray-400 font-mono">
            ({currentIndex + 1} / {images.length})
          </span>
        </div>

        {/* Zoom Controls Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex items-center bg-white/10 rounded-2xl p-1 border border-white/10">
            <button
              onClick={zoomOut}
              disabled={scale <= 1}
              className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                scale <= 1 
                  ? 'text-white/30 cursor-not-allowed' 
                  : 'text-white hover:bg-white/20 active:scale-95'
              }`}
              title="Uitzoomen (-)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            {/* Scale percentage pill / reset button */}
            <button
              onClick={resetZoom}
              className={`px-2 py-0.5 text-[11px] font-mono font-bold rounded-lg transition-all cursor-pointer ${
                scale > 1 ? 'text-[#FF6B00] hover:bg-white/10' : 'text-zinc-400'
              }`}
              title="Dubbelklik op foto of klik hier om te resetten"
            >
              {Math.round(scale * 100)}%
            </button>

            <button
              onClick={zoomIn}
              disabled={scale >= 4}
              className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                scale >= 4 
                  ? 'text-white/30 cursor-not-allowed' 
                  : 'text-white hover:bg-white/20 active:scale-95'
              }`}
              title="Inzoomen (+)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            {scale > 1 && (
              <button
                onClick={resetZoom}
                className="p-1.5 rounded-xl text-[#FF6B00] hover:bg-white/20 transition-all cursor-pointer ml-0.5"
                title="Reset zoom (0)"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer ml-1 sm:ml-2"
            aria-label="Sluiten"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>

      {/* Main Image Display Area with Pan & Zoom */}
      <div
        className="relative flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onWheel={handleWheel}
      >
        {/* Previous Button */}
        {images.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-[#FF6B00] text-white flex items-center justify-center transition-all cursor-pointer z-30 shadow-lg backdrop-blur-sm border border-white/10"
            aria-label="Vorige foto"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
        )}

        {/* Current Photo Container with interactive zoom & pan */}
        <div
          className="relative max-h-[76vh] max-w-[92vw] flex items-center justify-center transition-transform duration-75"
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={images[currentIndex]}
            alt={`${carTitle} - Foto ${currentIndex + 1}`}
            onDoubleClick={handleDoubleClick}
            style={{
              transform: `scale(${scale})`,
              cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
            }}
            className="max-h-[76vh] max-w-[92vw] object-contain rounded-xl shadow-2xl transition-transform duration-150 select-none pointer-events-auto"
            draggable={false}
          />
        </div>

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-[#FF6B00] text-white flex items-center justify-center transition-all cursor-pointer z-30 shadow-lg backdrop-blur-sm border border-white/10"
            aria-label="Volgende foto"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
        )}

        {/* Helper Badge when zoomed in or at 1x */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[11px] text-zinc-300 pointer-events-none flex items-center gap-1.5 shadow-md">
          {scale > 1 ? (
            <>
              <Move className="w-3 h-3 text-[#FF6B00]" />
              <span>Sleep om rond te kijken • Dubbelklik om te resetten</span>
            </>
          ) : (
            <>
              <ZoomIn className="w-3 h-3 text-[#FF6B00]" />
              <span>Klik op + of dubbelklik op de foto om verder in te zoomen</span>
            </>
          )}
        </div>
      </div>

      {/* Bottom Thumbnail Strip */}
      {images.length > 1 && (
        <div
          className="p-3 flex items-center justify-center gap-2 overflow-x-auto max-w-5xl mx-auto z-20 bg-black/30 backdrop-blur-sm rounded-t-2xl border-t border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => onIndexChange(idx)}
              className={`relative shrink-0 w-14 h-10 sm:w-16 sm:h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                currentIndex === idx
                  ? 'border-[#FF6B00] scale-105 shadow-md'
                  : 'border-transparent opacity-50 hover:opacity-100'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

