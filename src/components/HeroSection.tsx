import React from 'react';
import { RDCCPS_INFO } from '../data/coursesData';
import { 
  Award, 
  BookOpen, 
  ArrowRight, 
  Sparkles, 
  Compass, 
  ShieldCheck, 
  TrendingUp, 
  Download, 
  MapPin 
} from 'lucide-react';
import { motion } from 'motion/react';
import { CertificationType } from '../types';
import { AnimatedCounter } from './AnimatedCounter';
import { RdccpsShieldCrest } from './Logo';
import rdCollegeCampus from '../assets/images/rd_college_campus.jpg';

interface HeroSectionProps {
  onSelectCategory: (cat: CertificationType) => void;
  onOpenApply: () => void;
  onOpenCompass: () => void;
  onOpenBrochure: () => void;
  onOpenAIChatbot?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectCategory,
  onOpenApply,
  onOpenCompass,
  onOpenBrochure,
  onOpenAIChatbot
}) => {
  const scrollToCourses = () => {
    const el = document.getElementById('courses-grid-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero-section" className="relative overflow-hidden text-white pt-10 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-750 min-h-[680px] flex flex-col justify-center">
      {/* Real College Campus Background Image - Full Visibility */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={rdCollegeCampus}
          alt="RD College of Commerce and Professional Studies Campus Building"
          className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        
        {/* Rich cinematic gradient overlay matching the uploaded image tone & depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-slate-950/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-slate-950/60" />
      </div>

      <div className="relative max-w-7xl mx-auto z-10 w-full">
        {/* Header Breadcrumb / University Tag */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-6"
        >
          <motion.div 
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-950/80 border border-white/20 text-xs text-slate-200 backdrop-blur-md shadow-xl shadow-black/40"
          >
            <RdccpsShieldCrest size={22} className="flex-shrink-0" />
            <span className="font-bold text-white tracking-wide">RDCCPS Erode</span>
            <span className="text-slate-500">•</span>
            <span>Affiliated with Bharathiar University</span>
            <span className="text-slate-500">•</span>
            <span className="text-amber-400 font-bold">Admissions 2026-27</span>
          </motion.div>
        </motion.div>

        {/* Main Content - No container box, keeping the background image completely open and visible */}
        <div className="max-w-4xl mx-auto relative text-center px-2 sm:px-4">
          {/* Main Title */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-center space-y-4"
          >
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              Dual-Qualification Commerce Degrees for{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                  Global Financial Leaders
                </span>
                {/* Subtle underline glow animation */}
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                  className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-amber-400 to-amber-200 rounded-full opacity-90 shadow-sm shadow-black"
                />
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-white font-medium leading-relaxed max-w-3xl mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
              Experience an integrated academic model at RDCCPS. Pursue your recognized Bharathiar University B.Com degree alongside intensive, on-campus coaching for <span className="text-amber-300 font-bold underline decoration-amber-400/90 decoration-2">CA (ICAI)</span>, <span className="text-emerald-300 font-bold underline decoration-emerald-400/90 decoration-2">ACCA (UK)</span>, and <span className="text-amber-300 font-bold underline decoration-amber-400/90 decoration-2">CMA (ICMAI)</span>.
            </p>
          </motion.div>

          {/* Quick CTA Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              id="hero-explore-courses-btn"
              onClick={scrollToCourses}
              className="relative group overflow-hidden px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 text-slate-950 shadow-2xl shadow-black/50 flex items-center gap-2 cursor-pointer border border-amber-300/40"
            >
              {/* Shimmer light sweep */}
              <span className="absolute inset-0 w-1/2 h-full bg-white/30 transform -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />
              <BookOpen className="w-4 h-4" />
              <span>Explore 5 Courses Offered</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            {onOpenAIChatbot && (
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                id="hero-ai-advisor-btn"
                onClick={onOpenAIChatbot}
                className="px-5 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-500 hover:to-blue-500 text-white border border-indigo-300/50 flex items-center gap-2 shadow-2xl shadow-black/50 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '5s' }} />
                <span>Ask AI Course Advisor</span>
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              id="hero-recommend-wizard-btn"
              onClick={onOpenCompass}
              className="px-5 py-3.5 rounded-xl font-semibold text-sm bg-slate-950/80 hover:bg-slate-900 text-white border border-white/30 backdrop-blur-md flex items-center gap-2 shadow-2xl shadow-black/50 transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '10s' }} />
              <span>Course Match Wizard</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              id="hero-download-prospectus-btn"
              onClick={onOpenBrochure}
              className="px-5 py-3.5 rounded-xl font-semibold text-sm bg-slate-950/75 hover:bg-slate-900 text-slate-100 hover:text-white border border-white/25 backdrop-blur-md flex items-center gap-2 shadow-2xl shadow-black/50 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-sky-400" />
              <span>Prospectus</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Interactive Category Filter Pills */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-12 pt-8 border-t border-slate-800/80"
        >
          <div className="text-center mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Browse Specializations with Integrated Professional Mentorship
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                onSelectCategory('ALL');
                scrollToCourses();
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-950/80 hover:bg-slate-900 text-slate-100 border border-white/20 shadow-md backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>All 5 B.Com Programs</span>
              <span className="px-1.5 py-0.2 rounded bg-slate-800 text-[10px] text-amber-300 font-bold">5</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                onSelectCategory('CA');
                scrollToCourses();
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-950/80 hover:bg-blue-950/90 text-blue-200 border border-blue-400/40 shadow-md backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Award className="w-3.5 h-3.5 text-blue-400" />
              <span>Chartered Accountancy (CA Tracks)</span>
              <span className="px-1.5 py-0.2 rounded bg-blue-950 text-[10px] text-blue-300 font-bold border border-blue-800">3 Courses</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                onSelectCategory('ACCA');
                scrollToCourses();
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-950/80 hover:bg-emerald-950/90 text-emerald-200 border border-emerald-400/40 shadow-md backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>ACCA (UK Global) Track</span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-950 text-[10px] text-emerald-300 font-bold border border-emerald-800">180+ Countries</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                onSelectCategory('CMA');
                scrollToCourses();
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-950/80 hover:bg-amber-950/90 text-amber-200 border border-amber-400/40 shadow-md backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
              <span>CMA (Cost & Management) Track</span>
              <span className="px-1.5 py-0.2 rounded bg-amber-950 text-[10px] text-amber-300 font-bold border border-amber-800">Industry & Banking</span>
            </motion.button>
          </div>
        </motion.div>

        {/* 4 Stat Highlights with Animated Counter Numbers & Hover Lift */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {RDCCPS_INFO.keyStats.map((stat, idx) => (
            <motion.div 
              key={idx} 
              whileHover={{ y: -4, borderColor: 'rgba(236, 201, 75, 0.5)' }}
              className="bg-slate-950/80 border border-white/20 rounded-2xl p-4 sm:p-5 text-center backdrop-blur-md transition-all shadow-xl group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              
              <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-amber-400">
                <AnimatedCounter value={stat.value} duration={1600} />
              </div>
              <div className="text-xs sm:text-sm font-semibold text-white mt-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-300 mt-0.5">
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </motion.div>
        {/* Campus Location Footnote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-200 bg-slate-950/80 border border-white/20 rounded-full px-4 py-1.5 backdrop-blur-md mx-auto w-fit shadow-lg"
        >
          <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>RDCCPS Campus Facade • NH-544 / Uthukuli Road, Vijayamangalam, Erode</span>
        </motion.div>
      </div>
    </section>
  );
};
