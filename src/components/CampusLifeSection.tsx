import React, { useState } from 'react';
import { CAMPUS_FACILITIES_FULL, STUDENT_CLUBS, RDCCPS_CORE_PROFILE } from '../data/rdccpsFullData';
import { 
  Building2, 
  Monitor, 
  Cpu, 
  BookOpen, 
  Users, 
  Bus, 
  Home, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  MapPin, 
  ArrowRight,
  ShieldCheck,
  Camera
} from 'lucide-react';
import { motion } from 'motion/react';
import rdCollegeCampus from '../assets/images/rd_college_campus.jpg';

interface CampusLifeSectionProps {
  onOpenApply?: () => void;
  onOpenVisit?: () => void;
}

export const CampusLifeSection: React.FC<CampusLifeSectionProps> = ({ onOpenApply, onOpenVisit }) => {
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'Academic' | 'Technology' | 'Student Life' | 'Logistics'>('ALL');

  const filteredFacilities = CAMPUS_FACILITIES_FULL.filter((f) => {
    return activeCategory === 'ALL' || f.category === activeCategory;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Monitor': return <Monitor className="w-6 h-6" />;
      case 'Cpu': return <Cpu className="w-6 h-6" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6" />;
      case 'Users': return <Users className="w-6 h-6" />;
      case 'Bus': return <Bus className="w-6 h-6" />;
      case 'Home': return <Home className="w-6 h-6" />;
      default: return <Building2 className="w-6 h-6" />;
    }
  };

  return (
    <section id="campus-life-section" className="py-16 sm:py-24 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 text-amber-900 text-xs font-bold border border-amber-200">
            <Building2 className="w-3.5 h-3.5 text-amber-800" />
            <span>Infrastructure &amp; Campus Life</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-serif">
            A Distraction-Free Ecosystem Designed for High-Achieving Commerce Scholars
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Located in Vijayamangalam, Perundurai (Erode) along the Uthukuli corridor, RDCCPS provides state-of-the-art academic infrastructure, smart AC lecture halls, and secure residential amenities.
          </p>
        </div>

        {/* Featured Campus Visual Panorama Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-950 group"
        >
          <div className="relative aspect-[21/9] min-h-[300px] sm:min-h-[380px] w-full overflow-hidden">
            <img 
              src={rdCollegeCampus} 
              alt="RD College of Commerce and Professional Studies Campus Building" 
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
              referrerPolicy="no-referrer"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/40" />

            {/* Floating Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-10">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/90 text-slate-950 text-xs font-extrabold shadow-sm">
                  <Camera className="w-3.5 h-3.5" />
                  <span>Campus Architectural Facade</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-serif tracking-tight">
                  RD College of Commerce and Professional Studies
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  Pristine, distraction-free environment in Vijayamangalam, Erode with manicured lawns, state-of-the-art air-conditioned lecture halls, ICAI study pods, and on-campus hostel.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <span className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white font-medium backdrop-blur-md">
                  10+ Acre Campus
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-amber-300 font-medium backdrop-blur-md">
                  NH-544 Connectivity
                </span>
                {onOpenApply && (
                  <button
                    onClick={onOpenApply}
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-lg transition-all cursor-pointer"
                  >
                    Schedule Campus Visit
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Facility Category Filter */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200 shadow-xs max-w-full overflow-x-auto">
            {(['ALL', 'Academic', 'Technology', 'Student Life', 'Logistics'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer text-nowrap ${
                  activeCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat === 'ALL' ? 'All Infrastructure' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFacilities.map((facility, idx) => (
            <motion.div
              key={facility.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200/80 flex items-center justify-center">
                    {getIcon(facility.iconName)}
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                    {facility.tag}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-xl font-bold text-slate-900 font-serif">{facility.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{facility.description}</p>
                </div>

                {/* Features List */}
                <div className="space-y-2 pt-3 border-t border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Key Highlights:</span>
                  <ul className="space-y-1.5">
                    {facility.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Category: {facility.category}</span>
                <span className="text-amber-600 font-bold">Verified Facility</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Student Clubs & Extra-Curricular Life */}
        <div className="space-y-8 bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">Holistic Growth</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
              Student Commerce Clubs &amp; Activities
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Beyond the classroom: Active forums fostering leadership, public speaking, mock trading, and tax compliance skills.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {STUDENT_CLUBS.map((club, cIdx) => (
              <div key={cIdx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-slate-900 font-serif">{club.name}</h4>
                    <span className="text-[10px] font-extrabold bg-blue-50 text-blue-800 px-2 py-0.5 rounded-full border border-blue-200/50">
                      {club.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{club.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transport Connectivity Card */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold">
              <Bus className="w-4 h-4" />
              <span>Extensive 4-District Bus Connectivity</span>
            </div>
            <h4 className="text-2xl font-bold font-serif">
              Safe &amp; Punctual College Bus Transport
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Operating daily routes across Erode, Tirupur, Coimbatore, Perundurai, Uthukuli, Vijayamangalam, and Kangeyam. Coordinated with morning and evening coaching schedules for zero student fatigue.
            </p>
          </div>
          {onOpenApply && (
            <button
              onClick={onOpenApply}
              className="px-6 py-3.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors shadow-md cursor-pointer shrink-0"
            >
              Enquire Transport &amp; Admissions
            </button>
          )}
        </div>

      </div>
    </section>
  );
};
