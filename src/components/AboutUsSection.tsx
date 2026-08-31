import React from 'react';
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
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { RdccpsShieldCrest } from './Logo';

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

        {/* Founder & Leadership Spotlight Banner */}
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white p-8 sm:p-12 border border-slate-800 shadow-2xl overflow-hidden">
          {/* Subtle gold background accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Distinguished Leadership</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
                {founderAndLeadership.title}
              </h3>
              <div className="space-y-1 text-xs text-slate-300 font-mono">
                <p className="font-bold text-amber-400">{founderAndLeadership.qualifications}</p>
                <p className="text-slate-400">{founderAndLeadership.distinction}</p>
                <p className="text-slate-400">{founderAndLeadership.experience}</p>
              </div>
            </div>

            <div className="lg:col-span-8 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md space-y-4">
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
    </section>
  );
};
