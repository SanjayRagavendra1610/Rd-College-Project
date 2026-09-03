import React, { useState } from 'react';
import { RDCCPS_CORE_PROFILE } from '../data/rdccpsFullData';
import { 
  ShieldCheck, 
  Target, 
  Sparkles, 
  GraduationCap, 
  Award, 
  Users, 
  Building2, 
  CheckCircle2, 
  BookOpen, 
  Compass, 
  Scale, 
  ArrowRight,
  Maximize2,
  X,
  Camera,
  Eye,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RdccpsShieldCrest } from './Logo';

const DEFAULT_CHAIRMAN_IMAGE = '/chairman_photo.jpg';

interface AboutUsSectionProps {
  onOpenApply: () => void;
  onOpenBrochure: () => void;
  onExplorePrograms: () => void;
}

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({
  onOpenApply,
  onOpenBrochure,
  onExplorePrograms
}) => {
  const { founderAndLeadership, vision, mission, corePillars } = RDCCPS_CORE_PROFILE;
  
  // Custom or default chairman image state
  const [chairmanImage, setChairmanImage] = useState<string>(() => {
    try {
      return localStorage.getItem('rdccps_chairman_photo') || DEFAULT_CHAIRMAN_IMAGE;
    } catch {
      return DEFAULT_CHAIRMAN_IMAGE;
    }
  });

  const [isChairmanModalOpen, setIsChairmanModalOpen] = useState(false);

  // Allow user to upload/swap custom image directly from their device
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setChairmanImage(dataUrl);
        try {
          localStorage.setItem('rdccps_chairman_photo', dataUrl);
        } catch (err) {
          console.warn('Unable to persist photo in localStorage:', err);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetPhoto = () => {
    setChairmanImage(DEFAULT_CHAIRMAN_IMAGE);
    try {
      localStorage.removeItem('rdccps_chairman_photo');
    } catch (err) {
      console.warn('Unable to remove photo from localStorage:', err);
    }
  };

  return (
    <section id="about-us-section" className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 text-amber-900 text-xs font-bold border border-amber-200">
            <RdccpsShieldCrest size={18} />
            <span>About RDCCPS • Institutional Heritage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-serif">
            A Paradigm Shift in Commerce &amp; Professional Education
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            RD College of Commerce &amp; Professional Studies (RDCCPS) was established with a singular vision: to bridge the historic divide between conventional university degree education and rigorous professional qualifications like CA, ACCA, and CMA.
          </p>
        </div>

        {/* Founder & Leadership Spotlight Banner with Chairman Image in Circle Space */}
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white p-6 sm:p-10 lg:p-12 border border-slate-800 shadow-2xl overflow-hidden">
          {/* Subtle gold background accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Chairman Circular Image & Distinguished Leadership Column */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
              
              {/* Chairman in Circular Space */}
              <div className="relative shrink-0 flex flex-col items-center">
                <div className="relative group">
                  {/* Subtle radiant golden halo glow */}
                  <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500/40 via-yellow-400/20 to-amber-600/40 rounded-full blur-md opacity-80 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
                  
                  {/* Circular Image Container with double gold ring and depth */}
                  <div 
                    onClick={() => setIsChairmanModalOpen(true)}
                    className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full p-1.5 bg-gradient-to-br from-amber-300 via-amber-500 to-amber-600 shadow-2xl shadow-amber-500/30 ring-4 ring-amber-400/25 ring-offset-4 ring-offset-slate-950 cursor-pointer overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
                    title="Click to view full portrait"
                  >
                    <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-2 border-slate-950 relative">
                      <img
                        src={chairmanImage}
                        alt="Chairman & Founder - RD College of Commerce & Professional Studies"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.src.includes('DSC01929')) {
                            target.src = '/DSC01929.jpg';
                          }
                        }}
                      />
                      {/* Zoom hint overlay on hover */}
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Maximize2 className="w-6 h-6 text-amber-300 drop-shadow-md" />
                      </div>
                    </div>
                  </div>

                  {/* Chairman Pill Badge Under Circle */}
                  <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full bg-slate-950 text-amber-300 text-[11px] font-extrabold border border-amber-400/70 shadow-lg tracking-wider flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>CHAIRMAN</span>
                  </div>
                </div>

                {/* Quick actions: View Photo & Change / Reset */}
                <div className="mt-5 flex items-center gap-2">
                  <button
                    onClick={() => setIsChairmanModalOpen(true)}
                    className="text-[11px] font-medium text-amber-300 hover:text-amber-200 flex items-center gap-1 bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-lg border border-white/10 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3 h-3" />
                    <span>View Photo</span>
                  </button>
                  <label className="text-[11px] font-medium text-slate-300 hover:text-white flex items-center gap-1 bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-lg border border-white/10 transition-colors cursor-pointer" title="Upload custom photo">
                    <Camera className="w-3 h-3" />
                    <span>Upload</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handlePhotoUpload} 
                    />
                  </label>
                </div>
              </div>

              {/* Leadership Details */}
              <div className="space-y-3 flex-1 pt-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Distinguished Leadership</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-serif tracking-tight">
                  {founderAndLeadership.title}
                </h3>
                <div className="space-y-1.5 text-xs text-slate-300 font-mono">
                  <p className="font-bold text-amber-400 leading-snug">{founderAndLeadership.qualifications}</p>
                  <p className="text-slate-300 leading-snug">{founderAndLeadership.distinction}</p>
                  <p className="text-slate-400 leading-relaxed font-sans text-xs">{founderAndLeadership.experience}</p>
                </div>
              </div>
            </div>

            {/* Founding Philosophy & Visionary Message Block */}
            <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md space-y-4">
              <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>Founding Philosophy &amp; Visionary Message</span>
              </div>
              <blockquote className="text-sm sm:text-base text-slate-200 leading-relaxed italic">
                "{founderAndLeadership.message}"
              </blockquote>
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400 border-t border-white/10">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" /> Affiliated to Bharathiar University
                </span>
                <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" /> Capped Cohort of 300 Students
                </span>
                <span className="flex items-center gap-1.5 text-sky-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" /> On-Campus Professional Mentoring
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Vision & Mission Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vision Card */}
          <div className="rounded-3xl bg-white p-8 sm:p-10 border border-slate-200/80 shadow-md space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                <Target className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Strategic Direction</span>
                <h3 className="text-2xl font-bold text-slate-900 font-serif">Our Institutional Vision</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {vision}
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center gap-3 text-xs text-slate-700 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>Committed to Global Accounting, Auditing &amp; Tax Leadership</span>
            </div>
          </div>

          {/* Mission Card */}
          <div className="rounded-3xl bg-white p-8 sm:p-10 border border-slate-200/80 shadow-md space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
                <Compass className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-800">Core Objectives</span>
                <h3 className="text-2xl font-bold text-slate-900 font-serif">Our Educational Mission</h3>
              </div>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              {mission.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <div className="mt-1 w-4 h-4 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[10px] font-bold shrink-0">
                    {idx + 1}
                  </div>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 5 Core Pillars of RDCCPS */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
              Why Choose RDCCPS?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              The foundational pillars that make RD College of Commerce &amp; Professional Studies unique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {corePillars.map((pillar, index) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 font-black flex items-center justify-center text-sm font-serif">
                    0{index + 1}
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">{pillar.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{pillar.description}</p>
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-blue-900 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-block">
                    ✓ {pillar.highlight}
                  </span>
                </div>
              </motion.div>
            ))}

            {/* Quick Action Card */}
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 text-slate-950 shadow-md space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-black uppercase tracking-wider bg-slate-950 text-amber-400 px-2.5 py-0.5 rounded-full inline-block">
                  Admissions 2026-27
                </span>
                <h4 className="text-xl font-extrabold text-slate-950 font-serif">
                  Begin Your Professional Journey
                </h4>
                <p className="text-xs text-slate-900/90 leading-relaxed font-medium">
                  Enroll in one of our 5 integrated B.Com streams with CA, ACCA, or CMA coaching today.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  onClick={onOpenApply}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 text-white font-bold text-xs hover:bg-slate-900 transition-colors shadow-sm cursor-pointer"
                >
                  Apply Online Now
                </button>
                <button
                  onClick={onOpenBrochure}
                  className="w-full px-4 py-2.5 rounded-xl bg-white text-slate-950 font-bold text-xs hover:bg-slate-100 transition-colors shadow-sm cursor-pointer"
                >
                  Download Prospectus
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Chairman Full Portrait Lightbox Modal */}
      <AnimatePresence>
        {isChairmanModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md"
            onClick={() => setIsChairmanModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden text-white flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <span className="text-sm font-bold text-slate-200">Executive Leadership Portrait</span>
                </div>
                <button
                  onClick={() => setIsChairmanModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-8">
                {/* Circular Portrait with Prestige Rings */}
                <div className="relative shrink-0">
                  <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full p-2 bg-gradient-to-tr from-amber-400 via-amber-300 to-amber-500 shadow-2xl ring-4 ring-amber-400/30 ring-offset-4 ring-offset-slate-900">
                    <div className="w-full h-full rounded-full overflow-hidden bg-slate-950 border-2 border-slate-900">
                      <img
                        src={chairmanImage}
                        alt="Chairman & Founder"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full bg-slate-950 text-amber-300 text-xs font-bold border border-amber-400/80 shadow-lg tracking-wider flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>CHAIRMAN</span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4 text-center sm:text-left flex-1">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-2">
                      <span>Institutional Founder</span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-white font-serif">
                      {founderAndLeadership.title}
                    </h3>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-300 font-mono bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                    <p className="font-bold text-amber-400 leading-snug">{founderAndLeadership.qualifications}</p>
                    <p className="text-slate-300 leading-snug">{founderAndLeadership.distinction}</p>
                    <p className="text-slate-400 font-sans text-xs leading-relaxed">{founderAndLeadership.experience}</p>
                  </div>

                  <blockquote className="text-xs sm:text-sm text-slate-300 italic border-l-2 border-amber-400 pl-3 leading-relaxed">
                    "{founderAndLeadership.message.slice(0, 180)}..."
                  </blockquote>

                  {/* Photo Replacement / Reset Controls */}
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <label className="px-3.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm">
                      <Camera className="w-3.5 h-3.5" />
                      <span>Upload New Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoUpload}
                      />
                    </label>

                    {chairmanImage !== DEFAULT_CHAIRMAN_IMAGE && (
                      <button
                        onClick={handleResetPhoto}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 border border-slate-700"
                        title="Reset to default photo"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset Photo</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3 bg-slate-950/80 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setIsChairmanModalOpen(false)}
                  className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
