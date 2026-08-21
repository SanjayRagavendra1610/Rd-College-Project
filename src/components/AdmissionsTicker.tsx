import React from 'react';
import { Sparkles, Award, GraduationCap, ShieldCheck, TrendingUp, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

interface AdmissionsTickerProps {
  onOpenApply: () => void;
  onOpenBrochure: () => void;
}

export const AdmissionsTicker: React.FC<AdmissionsTickerProps> = ({
  onOpenApply,
  onOpenBrochure
}) => {
  const highlights = [
    {
      icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" />,
      text: 'Admissions Open for Academic Year 2026 - 2027'
    },
    {
      icon: <Award className="w-3.5 h-3.5 text-blue-400" />,
      text: 'Integrated Chartered Accountancy (CA - ICAI) On-Campus Training'
    },
    {
      icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />,
      text: 'ACCA (UK) Global Accounting Certification with 180+ Country Recognition'
    },
    {
      icon: <TrendingUp className="w-3.5 h-3.5 text-amber-400" />,
      text: 'Up to 40% Merit Scholarships for +2 Commerce Top Performers'
    },
    {
      icon: <GraduationCap className="w-3.5 h-3.5 text-sky-400" />,
      text: 'Affiliated to Bharathiar University • Direct Regular Degree Conferment'
    },
    {
      icon: <Calendar className="w-3.5 h-3.5 text-purple-400" />,
      text: 'Early Bird Direct Seat Reservation Closing Soon'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white border-y border-slate-800/80 py-2.5 overflow-hidden relative shadow-inner">
      {/* Side Vignette Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div className="flex items-center">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            ease: 'linear',
            duration: 32,
            repeat: Infinity
          }}
          className="flex items-center gap-8 whitespace-nowrap will-change-transform"
        >
          {/* Double mapped for seamless continuous loop */}
          {[...highlights, ...highlights].map((item, idx) => (
            <div 
              key={idx} 
              className="inline-flex items-center gap-2.5 text-xs text-slate-300 font-medium tracking-wide hover:text-white transition-colors cursor-default"
            >
              <span className="p-1 rounded-md bg-slate-800/80 border border-slate-700/60 flex items-center justify-center">
                {item.icon}
              </span>
              <span>{item.text}</span>
              <span className="text-amber-500 font-bold ml-3">•</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
