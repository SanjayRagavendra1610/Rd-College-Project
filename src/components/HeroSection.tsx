import React from 'react';
import { RDCCPS_INFO } from '../data/coursesData';
import { 
  Award, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Compass, 
  ShieldCheck,
  TrendingUp,
  Download,
  GraduationCap
} from 'lucide-react';
import { motion } from 'motion/react';
import { CertificationType } from '../types';
import { ParticleCanvas } from './ParticleCanvas';
import { AnimatedCounter } from './AnimatedCounter';
import { RdccpsShieldCrest } from './Logo';

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
    <section id="hero-section" className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      {/* Interactive Background Particle & Constellation Grid */}
      <ParticleCanvas density={40} variant="dark" />

      {/* Background Accent Gradients */}
      <motion.div 
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" 
      />
      
      {/* Subtle Blueprint Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '28px 28px'
        }}
      />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header Breadcrumb / University Tag with Gentle Float */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-6"
        >
          <motion.div 
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-xs text-slate-300 backdrop-blur-md shadow-lg shadow-black/20"
          >
            <RdccpsShieldCrest size={22} className="flex-shrink-0" />
            <span className="font-bold text-white tracking-wide">RDCCPS Erode</span>
            <span className="text-slate-500">•</span>
            <span>Affiliated with Bharathiar University</span>
            <span className="text-slate-500">•</span>
            <span className="text-amber-400 font-bold">Admissions 2026-27</span>
          </motion.div>
        </motion.div>

        {/* Main Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-center max-w-4xl mx-auto space-y-4"
        >
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
            Dual-Qualification Commerce Degrees for{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">
                Global Financial Leaders
              </span>
              {/* Subtle underline glow animation */}
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-amber-400 to-amber-200 rounded-full opacity-80"
              />
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
            Experience an integrated academic model at RDCCPS. Pursue your recognized Bharathiar University B.Com degree alongside intensive, on-campus coaching for <span className="text-white font-bold underline decoration-amber-400/60 decoration-2">CA (ICAI)</span>, <span className="text-white font-bold underline decoration-emerald-400/60 decoration-2">ACCA (UK)</span>, and <span className="text-white font-bold underline decoration-amber-400/60 decoration-2">CMA (ICMAI)</span>.
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
            className="relative group overflow-hidden px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 text-slate-950 shadow-xl shadow-amber-500/25 flex items-center gap-2 cursor-pointer"
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
              className="px-5 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-500 hover:to-blue-500 text-white border border-indigo-400/40 flex items-center gap-2 backdrop-blur-md shadow-lg shadow-indigo-900/30 transition-all cursor-pointer"
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
            className="px-5 py-3.5 rounded-xl font-semibold text-sm bg-slate-800/90 hover:bg-slate-700/90 text-white border border-slate-700/80 flex items-center gap-2 backdrop-blur-md shadow-lg transition-all cursor-pointer"
          >
            <Compass className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '10s' }} />
            <span>Course Match Wizard</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            id="hero-download-prospectus-btn"
            onClick={onOpenBrochure}
            className="px-5 py-3.5 rounded-xl font-semibold text-sm bg-slate-800/40 hover:bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700/60 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-sky-400" />
            <span>Prospectus</span>
          </motion.button>
        </motion.div>

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
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>All 5 B.Com Programs</span>
              <span className="px-1.5 py-0.2 rounded bg-slate-700 text-[10px] text-amber-300 font-bold">5</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                onSelectCategory('CA');
                scrollToCourses();
              }}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-blue-950/90 hover:bg-blue-900 text-blue-200 border border-blue-800 shadow-sm shadow-blue-900/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Award className="w-3.5 h-3.5 text-blue-400" />
              <span>Chartered Accountancy (CA Tracks)</span>
              <span className="px-1.5 py-0.2 rounded bg-blue-900 text-[10px] text-blue-200 font-bold">3 Courses</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                onSelectCategory('ACCA');
                scrollToCourses();
              }}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-950/90 hover:bg-emerald-900 text-emerald-200 border border-emerald-800 shadow-sm shadow-emerald-900/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>ACCA (UK Global) Track</span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-900 text-[10px] text-emerald-200 font-bold">180+ Countries</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                onSelectCategory('CMA');
                scrollToCourses();
              }}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-amber-950/90 hover:bg-amber-900 text-amber-200 border border-amber-800 shadow-sm shadow-amber-900/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
              <span>CMA (Cost & Management) Track</span>
              <span className="px-1.5 py-0.2 rounded bg-amber-900 text-[10px] text-amber-200 font-bold">Industry & Banking</span>
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
              whileHover={{ y: -4, borderColor: 'rgba(236, 201, 75, 0.4)' }}
              className="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-4 sm:p-5 text-center backdrop-blur-md transition-all shadow-md group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              
              <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-amber-400">
                <AnimatedCounter value={stat.value} duration={1600} />
              </div>
              <div className="text-xs sm:text-sm font-semibold text-white mt-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
