import React, { useState, useRef, DragEvent } from 'react';
import { CollegeEvent, EventCategory, EventPhoto } from '../types';
import { processImageFile, saveEvent } from '../utils/eventStorage';
import { 
  X, 
  UploadCloud, 
  Image as ImageIcon, 
  Trash2, 
  Calendar, 
  MapPin, 
  Building2, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  Plus
} from 'lucide-react';
import { motion } from 'motion/react';

interface EventUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEventUploaded: (event: CollegeEvent) => void;
  existingEvents?: CollegeEvent[];
  initialEventId?: string;
}

interface StagedFile {
  file: File;
  previewUrl: string;
  caption: string;
}

export const EventUploadModal: React.FC<EventUploadModalProps> = ({
  isOpen,
  onClose,
  onEventUploaded,
  existingEvents = [],
  initialEventId
}) => {
  const [mode, setMode] = useState<'new' | 'existing'>(initialEventId ? 'existing' : 'new');
  const [selectedExistingId, setSelectedExistingId] = useState<string>(initialEventId || (existingEvents[0]?.id || ''));

  // Form Fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CollegeEvent['category']>('academic');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [venue, setVenue] = useState('RDCCPS Main Campus, Vijayamangalam, Erode');
  const [organizer, setOrganizer] = useState('RDCCPS Events & Cultural Committee');
  const [description, setDescription] = useState('');

  // Staged Photos
  const [stagedFiles, setStagedFiles] = useState<StagedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      appendFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      appendFiles(Array.from(e.target.files));
    }
  };

  const appendFiles = (incoming: File[]) => {
    setErrorMsg(null);
    const validImageFiles = incoming.filter(f => f.type.startsWith('image/'));

    if (validImageFiles.length === 0) {
      setErrorMsg('Please select valid image files (JPG, PNG, WEBP, etc.)');
      return;
    }

    const newStaged: StagedFile[] = validImageFiles.map(file => ({
      file,
      previewUrl: URL.createObjectURL(file),
      caption: ''
    }));

    setStagedFiles(prev => [...prev, ...newStaged]);
  };

  const removeStagedFile = (index: number) => {
    setStagedFiles(prev => {
      const copy = [...prev];
      URL.revokeObjectURL(copy[index].previewUrl);
      copy.splice(index, 1);
      return copy;
    });
  };

  const updateCaption = (index: number, caption: string) => {
    setStagedFiles(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], caption };
      return copy;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (stagedFiles.length === 0) {
      setErrorMsg('Please select or drop at least one college event image to upload.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Process all images to optimized data URLs
      const processedPhotos: EventPhoto[] = [];
      for (let i = 0; i < stagedFiles.length; i++) {
        const item = stagedFiles[i];
        const dataUrl = await processImageFile(item.file, 1600, 1600);
        processedPhotos.push({
          id: `photo-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 7)}`,
          url: dataUrl,
          caption: item.caption.trim() || undefined,
          uploadedAt: new Date().toISOString().split('T')[0],
          size: item.file.size
        });
      }

      let targetEvent: CollegeEvent;

      if (mode === 'existing' && selectedExistingId) {
        const found = existingEvents.find(ev => ev.id === selectedExistingId);
        if (!found) {
          throw new Error('Target event not found');
        }
        targetEvent = {
          ...found,
          photos: [...found.photos, ...processedPhotos],
          isUserUploaded: true
        };
      } else {
        if (!title.trim()) {
          setErrorMsg('Please enter an event title (e.g., Annual Sports Day, Commerce Conclave)');
          setIsSubmitting(false);
          return;
        }

        targetEvent = {
          id: `event-user-${Date.now()}`,
          title: title.trim(),
          category,
          date: date || new Date().toISOString().split('T')[0],
          venue: venue.trim() || 'RDCCPS Campus, Vijayamangalam, Erode',
          organizer: organizer.trim() || 'RDCCPS Events Council',
          description: description.trim() || `College function and celebration organized at RD College of Commerce and Professional Studies.`,
          photos: processedPhotos,
          isUserUploaded: true,
          createdAt: Date.now()
        };
      }

      await saveEvent(targetEvent);
      setSuccessMsg(`Successfully uploaded ${processedPhotos.length} photo(s) to "${targetEvent.title}"!`);

      // Notify parent to refresh list
      onEventUploaded(targetEvent);

      setTimeout(() => {
        onClose();
      }, 1200);

    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to upload event photos. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-sm overflow-y-auto"
      id="event-upload-modal-overlay"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full my-auto overflow-hidden text-slate-800 relative"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white p-5 sm:p-6 border-b border-slate-800 flex items-start justify-between relative">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Campus Memories &amp; Functions</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-tight">
              Upload College Event Photos
            </h3>
            <p className="text-xs text-slate-300">
              Share photographs from RDCCPS annual days, sports meets, conclaves, seminars, and student functions.
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Mode Switch (New Event vs Add to Existing) */}
          {existingEvents.length > 0 && (
            <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-semibold text-slate-600">
              <button
                type="button"
                onClick={() => setMode('new')}
                className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${mode === 'new' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'hover:text-slate-900'}`}
              >
                + Create New Event Gallery
              </button>
              <button
                type="button"
                onClick={() => setMode('existing')}
                className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${mode === 'existing' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'hover:text-slate-900'}`}
              >
                Add Photos to Existing Event ({existingEvents.length})
              </button>
            </div>
          )}

          {/* Target Existing Event Selector */}
          {mode === 'existing' && (
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Select College Event <span className="text-rose-500">*</span>
              </label>
              <select
                value={selectedExistingId}
                onChange={(e) => setSelectedExistingId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none bg-slate-50"
              >
                {existingEvents.map((ev) => (
                  <option key={ev.id} value={ev.id}>
                    {ev.title} ({ev.date}) • {ev.photos.length} photos
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* New Event Fields */}
          {mode === 'new' && (
            <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Event / Function Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Annual Day 2026, Pongal Vizha, National Commerce Conclave"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Event Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CollegeEvent['category'])}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                  >
                    <option value="academic">Academic &amp; Conclave</option>
                    <option value="cultural">Cultural &amp; Arts Fest</option>
                    <option value="sports">Sports &amp; Athletics</option>
                    <option value="celebration">Traditional Celebrations</option>
                    <option value="workshop">Workshop &amp; Lab Training</option>
                    <option value="orientation">Induction &amp; Orientation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Event Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Venue / Campus Location
                  </label>
                  <input
                    type="text"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    placeholder="e.g. Main Auditorium, Sports Grounds, Seminar Hall"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Organized By / Club
                  </label>
                  <input
                    type="text"
                    value={organizer}
                    onChange={(e) => setOrganizer(e.target.value)}
                    placeholder="e.g. Student Welfare Club, ICAI Chapter, Commerce Dept"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Event Highlights / Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Key moments, chief guests, award winners, and celebrations..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white resize-none"
                />
              </div>
            </div>
          )}

          {/* Upload Dropzone (Supports both drag-and-drop and click selection) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700">
                Select or Drop Event Images <span className="text-rose-500">*</span>
              </label>
              <span className="text-[11px] text-slate-500">Supports JPG, PNG, WEBP (Multiple files allowed)</span>
            </div>

            <div
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                isDragging 
                  ? 'border-amber-500 bg-amber-50/70 scale-[0.99]' 
                  : 'border-slate-300 hover:border-amber-400 bg-slate-50/60 hover:bg-amber-50/20'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />

              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shadow-xs">
                  <UploadCloud className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    <span className="text-amber-600 underline">Click to browse</span> or drag &amp; drop photos here
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    High-resolution photos will be automatically optimized and archived.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Staged Image Previews */}
          {stagedFiles.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>Selected Photos ({stagedFiles.length})</span>
                <button
                  type="button"
                  onClick={() => setStagedFiles([])}
                  className="text-rose-600 hover:text-rose-700 font-semibold cursor-pointer"
                >
                  Clear All
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-56 overflow-y-auto p-1 bg-slate-100/60 rounded-xl">
                {stagedFiles.map((staged, idx) => (
                  <div key={idx} className="relative group bg-white rounded-lg p-1.5 border border-slate-200 shadow-xs space-y-1">
                    <div className="h-24 w-full rounded overflow-hidden relative bg-slate-100">
                      <img
                        src={staged.previewUrl}
                        alt={`Preview ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeStagedFile(idx)}
                        className="absolute top-1 right-1 p-1 rounded-full bg-slate-950/70 text-white hover:bg-rose-600 transition-colors"
                        title="Remove photo"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Add caption..."
                      value={staged.caption}
                      onChange={(e) => updateCaption(idx, e.target.value)}
                      className="w-full text-[11px] px-1.5 py-1 rounded border border-slate-200 focus:outline-none focus:border-amber-500 bg-slate-50"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          {errorMsg && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 border-t border-slate-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting || stagedFiles.length === 0}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1.5"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Processing &amp; Saving...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-4 h-4" />
                  <span>Upload {stagedFiles.length > 0 ? `(${stagedFiles.length} Photos)` : ''}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
