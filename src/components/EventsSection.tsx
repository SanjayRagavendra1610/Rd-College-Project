import React, { useState, useEffect, useMemo } from 'react';
import { CollegeEvent, EventPhoto } from '../types';
import { fetchAllEvents, deleteEvent } from '../utils/eventStorage';
import { EventUploadModal } from './EventUploadModal';
import { EventLightboxModal, GalleryPhotoItem } from './EventLightboxModal';
import { 
  Camera, 
  UploadCloud, 
  Search, 
  Sparkles, 
  Trash2, 
  Plus, 
  Images, 
  LayoutGrid, 
  FolderKanban, 
  Eye, 
  Download, 
  Calendar, 
  MapPin, 
  ChevronRight,
  Filter,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface EventsSectionProps {
  onOpenApply?: () => void;
}

type ViewMode = 'all-photos' | 'albums';

export const EventsSection: React.FC<EventsSectionProps> = ({ onOpenApply }) => {
  const [events, setEvents] = useState<CollegeEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('all-photos');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAlbumFilter, setActiveAlbumFilter] = useState<string | null>(null);

  // Upload modal state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [targetEventForUpload, setTargetEventForUpload] = useState<string | undefined>(undefined);

  // Lightbox state
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxItems, setLightboxItems] = useState<GalleryPhotoItem[]>([]);
  const [lightboxCurrentIndex, setLightboxCurrentIndex] = useState(0);

  // Load events from storage
  const loadEvents = async () => {
    setLoading(true);
    try {
      const data = await fetchAllEvents();
      setEvents(data);
    } catch (err) {
      console.error('Failed to load events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  // Flatten all photos from all events into a unified gallery collection
  const allGalleryItems = useMemo<GalleryPhotoItem[]>(() => {
    const items: GalleryPhotoItem[] = [];
    events.forEach(ev => {
      ev.photos.forEach(photo => {
        items.push({
          photo,
          eventId: ev.id,
          eventTitle: ev.title,
          eventCategory: ev.category,
          eventDate: ev.date,
          eventVenue: ev.venue,
          isUserUploaded: ev.isUserUploaded
        });
      });
    });
    return items;
  }, [events]);

  // Filtered gallery items
  const filteredGalleryItems = useMemo(() => {
    return allGalleryItems.filter(item => {
      // Category filter
      const matchesCategory = 
        selectedCategory === 'all' 
          ? true 
          : selectedCategory === 'user' 
            ? item.isUserUploaded 
            : item.eventCategory === selectedCategory;

      if (!matchesCategory) return false;

      // Album filter
      if (activeAlbumFilter && item.eventId !== activeAlbumFilter) {
        return false;
      }

      // Search query filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const titleMatch = item.eventTitle.toLowerCase().includes(q);
      const captionMatch = (item.photo.caption || '').toLowerCase().includes(q);
      const venueMatch = item.eventVenue.toLowerCase().includes(q);
      const dateMatch = item.eventDate.toLowerCase().includes(q);
      const catMatch = item.eventCategory.toLowerCase().includes(q);

      return titleMatch || captionMatch || venueMatch || dateMatch || catMatch;
    });
  }, [allGalleryItems, selectedCategory, activeAlbumFilter, searchQuery]);

  // Filtered events for albums view
  const filteredEvents = useMemo(() => {
    return events.filter(ev => {
      const matchesCategory = 
        selectedCategory === 'all' 
          ? true 
          : selectedCategory === 'user' 
            ? ev.isUserUploaded 
            : ev.category === selectedCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        ev.title.toLowerCase().includes(q) ||
        ev.description.toLowerCase().includes(q) ||
        ev.venue.toLowerCase().includes(q) ||
        ev.date.toLowerCase().includes(q) ||
        ev.category.toLowerCase().includes(q)
      );
    });
  }, [events, selectedCategory, searchQuery]);

  // Stats
  const totalPhotosCount = allGalleryItems.length;
  const userUploadedCount = useMemo(() => {
    return events.filter(ev => ev.isUserUploaded).length;
  }, [events]);

  // Handlers for Lightbox
  const openLightboxWithItems = (items: GalleryPhotoItem[], startIndex = 0) => {
    setLightboxItems(items);
    setLightboxCurrentIndex(startIndex);
    setIsLightboxOpen(true);
  };

  const handleNextPhoto = () => {
    if (lightboxItems.length === 0) return;
    setLightboxCurrentIndex(prev => (prev + 1) % lightboxItems.length);
  };

  const handlePrevPhoto = () => {
    if (lightboxItems.length === 0) return;
    setLightboxCurrentIndex(prev => (prev - 1 + lightboxItems.length) % lightboxItems.length);
  };

  const handleDeleteEvent = async (eventId: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete photos from "${title}"?`)) {
      await deleteEvent(eventId);
      await loadEvents();
    }
  };

  const handleDownloadSingle = (photoUrl: string, title: string) => {
    const a = document.createElement('a');
    a.href = photoUrl;
    a.download = `RDCCPS_${title.replace(/\s+/g, '_')}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'academic':
        return 'bg-sky-500/10 text-sky-700 border-sky-300/60';
      case 'sports':
        return 'bg-emerald-500/10 text-emerald-700 border-emerald-300/60';
      case 'cultural':
        return 'bg-purple-500/10 text-purple-700 border-purple-300/60';
      case 'celebration':
        return 'bg-amber-500/10 text-amber-800 border-amber-300/60';
      case 'workshop':
        return 'bg-indigo-500/10 text-indigo-700 border-indigo-300/60';
      case 'orientation':
        return 'bg-rose-500/10 text-rose-700 border-rose-300/60';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="flex-1 bg-slate-50 text-slate-900 min-h-screen py-8 sm:py-12" id="event-photo-gallery-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Hero Banner with Photo Gallery Identity */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
                <Camera className="w-3.5 h-3.5 text-amber-400" />
                <span>RDCCPS Campus Photo Gallery</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight leading-tight">
                Event &amp; Campus Photo Gallery
              </h1>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                A high-resolution visual archive capturing the vibrant celebrations, commerce symposiums, sports meets, traditional fests, and student memories at RD College of Commerce and Professional Studies.
              </p>

              {/* Gallery Metrics */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-5 text-xs text-slate-300">
                <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-1.5 rounded-xl border border-slate-800">
                  <Images className="w-4 h-4 text-amber-400" />
                  <span><strong>{totalPhotosCount}</strong> Gallery Photos</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-1.5 rounded-xl border border-slate-800">
                  <FolderKanban className="w-4 h-4 text-sky-400" />
                  <span><strong>{events.length}</strong> Event Albums</span>
                </div>
                {userUploadedCount > 0 && (
                  <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-1.5 rounded-xl border border-slate-800">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span><strong>{userUploadedCount}</strong> Custom Uploads</span>
                  </div>
                )}
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0">
              <button
                id="btn-upload-photos-header"
                onClick={() => {
                  setTargetEventForUpload(undefined);
                  setIsUploadModalOpen(true);
                }}
                className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 group"
              >
                <UploadCloud className="w-5 h-5 text-slate-950 group-hover:scale-110 transition-transform" />
                <span>Upload Photos</span>
              </button>

              {onOpenApply && (
                <button
                  onClick={onOpenApply}
                  className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/15 transition-all text-center cursor-pointer"
                >
                  Join 2026 Academic Batch
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Gallery Interactive Control Toolbar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* View Mode Toggle: All Photos Grid vs Albums */}
            <div className="flex items-center rounded-xl bg-slate-100 p-1 text-xs font-semibold text-slate-600 w-full md:w-auto">
              <button
                id="tab-view-all-photos"
                onClick={() => {
                  setViewMode('all-photos');
                  setActiveAlbumFilter(null);
                }}
                className={`flex-1 md:flex-initial px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  viewMode === 'all-photos' 
                    ? 'bg-white text-slate-950 shadow-xs font-bold' 
                    : 'hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-4 h-4 text-amber-500" />
                <span>All Photos ({allGalleryItems.length})</span>
              </button>

              <button
                id="tab-view-albums"
                onClick={() => setViewMode('albums')}
                className={`flex-1 md:flex-initial px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  viewMode === 'albums' 
                    ? 'bg-white text-slate-950 shadow-xs font-bold' 
                    : 'hover:text-slate-900'
                }`}
              >
                <FolderKanban className="w-4 h-4 text-sky-500" />
                <span>Event Albums ({events.length})</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search photos, functions, dates, captions..."
                className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none bg-slate-50 focus:bg-white text-slate-800 placeholder-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full hover:bg-slate-200 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-1 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1 flex-shrink-0">
              <Filter className="w-3 h-3" /> Filter:
            </span>
            {[
              { id: 'all', label: 'All Categories' },
              { id: 'academic', label: 'Academic & Conclaves' },
              { id: 'sports', label: 'Sports & Athletics' },
              { id: 'celebration', label: 'Festivals & Celebrations' },
              { id: 'cultural', label: 'Cultural & Arts' },
              { id: 'workshop', label: 'Hands-on Workshops' },
              { id: 'orientation', label: 'Inductions' },
              ...(userUploadedCount > 0 ? [{ id: 'user', label: `My Uploads (${userUploadedCount})` }] : [])
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-xs font-bold'
                    : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}

            {activeAlbumFilter && (
              <button
                onClick={() => setActiveAlbumFilter(null)}
                className="ml-auto px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 text-[11px] font-bold hover:bg-amber-200 flex items-center gap-1 flex-shrink-0 cursor-pointer"
              >
                <span>Clear Album Filter</span>
                <span>×</span>
              </button>
            )}
          </div>
        </div>

        {/* Gallery Content Area */}
        {loading ? (
          <div className="py-24 text-center space-y-3">
            <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-500 font-medium">Loading college photos...</p>
          </div>
        ) : viewMode === 'all-photos' ? (
          /* ================================================================ */
          /* 1. PHOTO GRID (TRUE PHOTO GALLERY VIEW)                          */
          /* ================================================================ */
          filteredGalleryItems.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-4 max-w-md mx-auto">
              <Images className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">
                No gallery photos match your filter
              </h3>
              <p className="text-xs text-slate-500">
                Try searching for different keywords, resetting category filters, or upload your own college photos.
              </p>
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                    setActiveAlbumFilter(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                >
                  Reset Filters
                </button>
                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors cursor-pointer"
                >
                  Upload Photos
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
                <span>Showing <strong>{filteredGalleryItems.length}</strong> photographs</span>
                <span className="italic">Click any photo to view full-size</span>
              </div>

              {/* Responsive Photo Gallery Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {filteredGalleryItems.map((item, index) => {
                  return (
                    <motion.div
                      key={item.photo.id || index}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: Math.min(index * 0.03, 0.3) }}
                      className="group relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
                    >
                      {/* Photo Image Container */}
                      <div 
                        onClick={() => openLightboxWithItems(filteredGalleryItems, index)}
                        className="relative w-full aspect-[4/3] overflow-hidden cursor-pointer"
                      >
                        <img
                          src={item.photo.url}
                          alt={item.photo.caption || item.eventTitle}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                          loading="lazy"
                        />

                        {/* Top Gradient & Category Badge */}
                        <div className="absolute top-0 inset-x-0 p-3 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-950/75 backdrop-blur-xs text-white border border-white/20">
                            {item.eventCategory}
                          </span>

                          <span className="p-1 rounded-full bg-slate-950/60 backdrop-blur-xs text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 px-2">
                            <Eye className="w-3 h-3 text-amber-400" />
                            <span>View</span>
                          </span>
                        </div>

                        {/* Bottom Overlay with Caption */}
                        <div className="absolute bottom-0 inset-x-0 p-3.5 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent text-white flex flex-col justify-end pointer-events-none">
                          <p className="text-xs font-bold text-white line-clamp-1 leading-snug drop-shadow-sm">
                            {item.photo.caption || item.eventTitle}
                          </p>
                          <div className="flex items-center justify-between text-[10.5px] text-slate-300 mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-amber-400" />
                              {item.eventDate}
                            </span>
                            <span className="text-slate-400 truncate max-w-[120px]">
                              {item.eventVenue.split(',')[0]}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Photo Bottom Bar for Quick Actions */}
                      <div className="bg-white p-2.5 flex items-center justify-between border-t border-slate-100 text-xs">
                        <span 
                          onClick={() => {
                            setActiveAlbumFilter(item.eventId);
                            setViewMode('all-photos');
                          }}
                          className="font-medium text-slate-600 hover:text-amber-600 transition-colors truncate max-w-[180px] cursor-pointer"
                          title={`Filter to album: ${item.eventTitle}`}
                        >
                          {item.eventTitle}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleDownloadSingle(item.photo.url, item.eventTitle)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                            title="Download Photo"
                            aria-label="Download Photo"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => openLightboxWithItems(filteredGalleryItems, index)}
                            className="p-1.5 rounded-lg text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer"
                            title="Open in Viewer"
                            aria-label="Open in Viewer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )
        ) : (
          /* ================================================================ */
          /* 2. ALBUMS / EVENTS VIEW                                          */
          /* ================================================================ */
          filteredEvents.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-4 max-w-md mx-auto">
              <FolderKanban className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">
                No event albums found
              </h3>
              <p className="text-xs text-slate-500">
                No albums matched your current search or category filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => {
                const coverPhoto = event.photos[0];
                const totalPhotos = event.photos.length;

                // Create gallery items for this specific event
                const eventGalleryItems: GalleryPhotoItem[] = event.photos.map(p => ({
                  photo: p,
                  eventId: event.id,
                  eventTitle: event.title,
                  eventCategory: event.category,
                  eventDate: event.date,
                  eventVenue: event.venue,
                  isUserUploaded: event.isUserUploaded
                }));

                return (
                  <div
                    key={event.id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group"
                  >
                    {/* Album Cover & Stack Visual */}
                    <div 
                      onClick={() => openLightboxWithItems(eventGalleryItems, 0)}
                      className="relative h-56 w-full overflow-hidden bg-slate-900 cursor-pointer"
                    >
                      {coverPhoto && (
                        <img
                          src={coverPhoto.url}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />

                      <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-xs bg-white/95 text-slate-900 border-slate-200`}>
                          {event.category}
                        </span>

                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/80 text-white text-xs font-bold border border-white/20">
                          <Images className="w-3 h-3 text-amber-400" />
                          <span>{totalPhotos} Photos</span>
                        </span>
                      </div>

                      <div className="absolute bottom-3 inset-x-3 text-white">
                        <div className="flex items-center gap-1.5 text-xs text-slate-300">
                          <Calendar className="w-3.5 h-3.5 text-amber-400" />
                          <span>{event.date}</span>
                          <span>•</span>
                          <span className="truncate">{event.venue}</span>
                        </div>
                      </div>
                    </div>

                    {/* Album Details */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h3 
                          onClick={() => openLightboxWithItems(eventGalleryItems, 0)}
                          className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors cursor-pointer font-serif line-clamp-2"
                        >
                          {event.title}
                        </h3>

                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {event.description}
                        </p>
                      </div>

                      {/* Album Thumbnails Strip */}
                      {totalPhotos > 1 && (
                        <div className="grid grid-cols-4 gap-2 pt-1">
                          {event.photos.slice(0, 4).map((p, idx) => (
                            <button
                              key={p.id || idx}
                              onClick={() => openLightboxWithItems(eventGalleryItems, idx)}
                              className="relative h-12 rounded-lg overflow-hidden border border-slate-200 hover:border-amber-500 transition-colors group/thumb cursor-pointer bg-slate-100"
                              title={p.caption || `Photo ${idx + 1}`}
                            >
                              <img
                                src={p.url}
                                alt=""
                                className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform"
                                loading="lazy"
                              />
                              {idx === 3 && totalPhotos > 4 && (
                                <div className="absolute inset-0 bg-slate-950/70 text-white flex items-center justify-center text-xs font-bold">
                                  +{totalPhotos - 4}
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Album Footer Actions */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <button
                          onClick={() => {
                            setActiveAlbumFilter(event.id);
                            setViewMode('all-photos');
                          }}
                          className="font-bold text-amber-700 hover:text-amber-800 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span>Open Album Photos</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setTargetEventForUpload(event.id);
                              setIsUploadModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer"
                            title="Add photos to this album"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          {event.isUserUploaded && (
                            <button
                              onClick={() => handleDeleteEvent(event.id, event.title)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Delete album"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}

        {/* Quick Dropzone & Upload Banner at Bottom */}
        <div 
          onClick={() => {
            setTargetEventForUpload(undefined);
            setIsUploadModalOpen(true);
          }}
          className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-dashed border-amber-300 hover:border-amber-500 bg-amber-50/20 hover:bg-amber-50/40 transition-all cursor-pointer shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6 group"
        >
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-xs">
              <UploadCloud className="w-7 h-7 text-amber-600" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Share Photos from Recent Functions or Festivities
              </h3>
              <p className="text-xs text-slate-600 mt-1 max-w-xl">
                Contribute photos from Commerce Conclaves, Cultural Fests, Sports Meets, or Academic Inductions. Multiple images with drag-and-drop support.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="px-5 py-3 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-sm flex items-center gap-2 flex-shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Upload New Photos</span>
          </button>
        </div>

      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {isUploadModalOpen && (
          <EventUploadModal
            isOpen={isUploadModalOpen}
            onClose={() => {
              setIsUploadModalOpen(false);
              setTargetEventForUpload(undefined);
            }}
            onEventUploaded={async () => {
              await loadEvents();
            }}
            existingEvents={events}
            initialEventId={targetEventForUpload}
          />
        )}
      </AnimatePresence>

      {/* Lightbox Slideshow Modal */}
      <EventLightboxModal
        isOpen={isLightboxOpen}
        items={lightboxItems}
        currentIndex={lightboxCurrentIndex}
        onClose={() => setIsLightboxOpen(false)}
        onNext={handleNextPhoto}
        onPrev={handlePrevPhoto}
        onSelectIndex={(index) => setLightboxCurrentIndex(index)}
      />
    </div>
  );
};
