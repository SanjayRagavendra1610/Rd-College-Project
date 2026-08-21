import React from 'react';
import { CAMPUS_FACILITIES } from '../data/coursesData';
import { 
  Monitor, 
  BookOpen, 
  Layers, 
  Home, 
  Bus, 
  Trophy, 
  Building2, 
  CheckCircle2, 
  Sparkles,
  Wifi,
  Shield
} from 'lucide-react';
import { motion } from 'motion/react';

export const AcademicFacilities: React.FC = () => {
  const getFacilityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Monitor': return <Monitor className="w-5 h-5 text-blue-600" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-amber-600" />;
      case 'Layers': return <Layers className="w-5 h-5 text-purple-600" />;
      case 'Home': return <Home className="w-5 h-5 text-emerald-600" />;
      case 'Bus': return <Bus className="w-5 h-5 text-sky-600" />;
      case 'Trophy': return <Trophy className="w-5 h-5 text-orange-600" />;
      default: return <Building2 className="w-5 h-5 text-slate-600" />;
    }
  };

  return (
    <section id="campus-facilities-section" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-amber-400">
            <Building2 className="w-3.5 h-3.5" />
            <span>Campus Infrastructure & Student Life</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            World-Class Facilities Engineered for Finance Aspirants
          </h2>

          <p className="text-xs sm:text-sm text-slate-300">
            From specialized digital accounting labs to peaceful late-night study halls, RDCCPS provides the physical and intellectual ecosystem required for rigorous professional study.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAMPUS_FACILITIES.map((fac, idx) => (
            <motion.div
              key={fac.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700 hover:border-slate-600 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-slate-700/80 flex items-center justify-center border border-slate-600 group-hover:scale-105 transition-transform">
                    {getFacilityIcon(fac.icon)}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    {fac.highlight}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                  {fac.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {fac.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-700/60 flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Available to all enrolled commerce students</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Transport & Location Highlight Card */}
        <div className="mt-12 bg-gradient-to-r from-blue-950/80 to-slate-950/90 rounded-3xl p-6 sm:p-8 border border-blue-900/60 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Campus Location & Connectivity
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Centrally Located in Perundurai (Erode District) with 50+ Bus Routes
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              6/232 Pulavarpalayam, Uthukuli Road, Vijayamangalam, Perundurai. Convenient daily bus connections for day scholars from Erode Central, Tirupur, Coimbatore, Kangeyam, Chennimalai, Bhavani, and Gobichettipalayam.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0 w-full lg:w-auto">
            <a 
              href="https://maps.google.com/?q=RD+College+of+Commerce+and+Professional+Studies+Perundurai+Erode"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-bold bg-white text-slate-900 hover:bg-slate-100 flex items-center justify-center gap-2 transition-colors"
            >
              <span>Open in Google Maps</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
