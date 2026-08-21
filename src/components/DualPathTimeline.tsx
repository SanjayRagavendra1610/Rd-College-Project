import React from 'react';
import { DUAL_PATH_MATRIX } from '../data/coursesData';
import { 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  Briefcase, 
  Clock, 
  Zap, 
  Sparkles,
  ShieldCheck,
  Building,
  Target
} from 'lucide-react';
import { motion } from 'motion/react';

interface DualPathTimelineProps {
  onExploreCourses: () => void;
}

export const DualPathTimeline: React.FC<DualPathTimelineProps> = ({ onExploreCourses }) => {
  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-blue-400" />;
      case 'Award': return <Award className="w-5 h-5 text-amber-400" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-sky-400" />;
      default: return <Sparkles className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="dual-path-section" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-amber-400">
            <Zap className="w-3.5 h-3.5" />
            <span>The RDCCPS Dual-Path Model</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            How Integrated Degree & Professional Coaching Works Daily
          </h2>

          <p className="text-sm sm:text-base text-slate-300">
            Say goodbye to chaotic weekend tuitions and multi-hour commutes. At RD College of Commerce & Professional Studies, university curriculum and ICAI / ACCA / CMA coaching run concurrently within our campus schedule.
          </p>
        </div>

        {/* 4-Step Daily Synchronized Timeline with Animated Flow Indicator */}
        <div className="relative">
          {/* Animated Flow Connecting Line on Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-blue-500 via-amber-400 to-emerald-400 -translate-y-12 opacity-30 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10">
            {DUAL_PATH_MATRIX.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="bg-slate-800/80 border border-slate-700/80 hover:border-amber-400/50 rounded-2xl p-6 flex flex-col justify-between transition-all group backdrop-blur-sm shadow-lg relative overflow-hidden"
              >
                {/* Glowing top line on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-200 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-4">
                  {/* Step badge & time */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-slate-600 group-hover:text-amber-400 transition-colors">
                      {item.step}
                    </span>
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-700/80 text-slate-200 border border-slate-600/80 shadow-xs flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-amber-400 animate-pulse" />
                      <span>{item.time}</span>
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="space-y-2.5">
                    <div className="w-11 h-11 rounded-xl bg-slate-700/60 group-hover:bg-amber-400/10 group-hover:border-amber-400/40 flex items-center justify-center border border-slate-600 transition-colors">
                      {getStepIcon(item.icon)}
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-700/60 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    {item.badge}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">Phase {idx + 1}/4</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Comparison: Traditional College vs RDCCPS Integrated Model */}
        <div className="mt-14 bg-slate-950/80 rounded-3xl p-6 sm:p-8 border border-slate-800">
          <h3 className="text-lg font-extrabold text-white text-center mb-6">
            Traditional Commerce Degree vs RDCCPS Integrated Advantage
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Traditional Box */}
            <div className="bg-slate-900/60 p-5 rounded-2xl border border-red-950/50 space-y-3">
              <div className="text-xs font-bold text-red-400 uppercase tracking-wider">
                ❌ Traditional College Route
              </div>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span>College during morning, rushed outside tuition during evenings or weekends.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span>Huge physical fatigue from daily commuting between multiple coaching centers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span>Zero coordination between college exam dates and CA/ACCA exam cycles.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span>High additional coaching expenses paid separately over 3 years.</span>
                </li>
              </ul>
            </div>

            {/* RDCCPS Integrated Box */}
            <div className="bg-amber-950/20 p-5 rounded-2xl border border-amber-500/30 space-y-3">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>✓ RDCCPS Integrated Commerce Model</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-200">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Single campus routine covers Bharathiar University degree and CA/ACCA/CMA training.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Learn directly from practicing Chartered Accountants (CAs) and certified experts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>College calendar synchronized with ICAI / ACCA exam registration and revision cycles.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Full access to CA Study Library, digital finance lab, mock tests & articleship placement cell.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
