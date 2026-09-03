import React, { useEffect } from 'react';
import { EventPhoto } from '../types';
import { X, ChevronLeft, ChevronRight, Download, Calendar, MapPin, Tag, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface GalleryPhotoItem {
  photo: EventPhoto;
  eventId: string;
  eventTitle: string;
  eventCategory: string;
  eventDate: string;
  eventVenue: string;
  isUserUploaded?: boolean;
}

interface EventLightboxModalProps {
  items: GalleryPhotoItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSelectIndex?: (index: number) => void;
}

export const EventLightboxModal: React.FC<EventLightboxModalProps> = ({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
  onSelectIndex
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || items.length === 0) return null;

  const currentItem: GalleryPhotoItem = items[currentIndex] || items[0];
  const { photo, eventTitle, eventCategory, eventDate, eventVenue } = currentItem;
  const totalPhotos = items.length;

  const handleDownload = () => {
    if (!photo?.url) return;
    const a = document.createElement('a');
    a.href = photo.url;
    a.download = `RDCCPS_${eventTitle.replace(/\s+/g, '_')}_${currentIndex + 1}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-md select-none overflow-hidden"
      id="event-lightbox-overlay"
    >
      {/* Top Bar */}
      <div className="absolute top-0 inset-x-0 p-4 sm:p-6 flex items-center justify-between text-white z-20 bg-gradient-to-b from-slate-950/90 via-slate-950/40 to-transparent">
        <div className="space-y-0.5 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950">
              {eventCategory}
            </span>
            <span className="text-xs text-slate-300 font-medium">
              Photo {currentIndex + 1} of {totalPhotos}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white truncate">
            {eventTitle}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors cursor-pointer"
            title="Download image"
            aria-label="Download image"
          >
            <Download className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors cursor-pointer"
            title="Close viewer (Esc)"
            aria-label="Close viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Frame */}
      <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-12">
        <AnimatePresence mode="wait">
          <motion.img
            key={photo.id || currentIndex}
            src={photo.url}
            alt={photo.caption || eventTitle}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="max-h-[80vh] max-w-[92vw] object-contain rounded-xl shadow-2xl"
          />
        </AnimatePresence>

        {/* Previous Button */}
        {totalPhotos > 1 && (
          <button
            onClick={onPrev}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/70 hover:bg-slate-900/95 text-white border border-white/15 transition-all hover:scale-105 cursor-pointer z-20 shadow-lg"
            title="Previous Photo (Left Arrow)"
            aria-label="Previous Photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Button */}
        {totalPhotos > 1 && (
          <button
            onClick={onNext}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/70 hover:bg-slate-900/95 text-white border border-white/15 transition-all hover:scale-105 cursor-pointer z-20 shadow-lg"
            title="Next Photo (Right Arrow)"
            aria-label="Next Photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Info Bar */}
      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-transparent text-white z-20">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            {photo.caption ? (
              <p className="text-sm sm:text-base font-semibold text-slate-100">
                "{photo.caption}"
              </p>
            ) : (
              <p className="text-xs text-slate-400 italic">
                RD College of Commerce and Professional Studies • Campus Event Archives
              </p>
            )}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1 font-medium">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                {eventDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                {eventVenue}
              </span>
            </div>
          </div>

          {/* Thumbnail navigation strip */}
          {totalPhotos > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-sm sm:max-w-md scrollbar-none">
              {items.map((it, idx) => (
                <button
                  key={it.photo.id || idx}
                  onClick={() => onSelectIndex ? onSelectIndex(idx) : undefined}
                  className={`relative flex-shrink-0 w-11 h-11 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    idx === currentIndex
                      ? 'border-amber-400 scale-105 shadow-md shadow-amber-500/20'
                      : 'border-white/20 opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`Jump to photo ${idx + 1}`}
                >
                  <img
                    src={it.photo.url}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
