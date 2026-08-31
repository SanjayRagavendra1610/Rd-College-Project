import React, { useState } from 'react';
import { TOP_RECRUITERS_LIST } from '../data/rdccpsFullData';
import { 
  Briefcase, 
  Award, 
  TrendingUp, 
  Building2, 
  CheckCircle2, 
  Users, 
  ArrowRight, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'motion/react';

interface PlacementsSectionProps {
  onOpenApply?: () => void;
  onExploreCourses?: () => void;
}

export const PlacementsSection: React.FC<PlacementsSectionProps> = ({ onOpenApply, onExploreCourses }) => {
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'Big 4' | 'Chartered Firm' | 'Tech & MNC' | 'Banking & BFSI'>('ALL');

  const filteredRecruiters = TOP_RECRUITERS_LIST.filter((r) => {
    return activeCategory === 'ALL' || r.category === activeCategory;
  });

  return (
    <section id="placements-section" className="py-16 sm:py-24 bg-slate-50 text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-900 text-xs font-bold border border-blue-200">
            <Briefcase className="w-3.5 h-3.5 text-blue-800" />
            <span>Corporate Placements &amp; Articleship Cell</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-serif">
            Launch Your Career with Big 4 Firms &amp; Leading Corporate Giants
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            From premier 2-year CA articleship placements in reputed chartered accounting firms to lucrative full-time graduate roles in Big 4 audit and global consulting firms.
          </p>
        </div>

        {/* Highlight Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center space-y-1 shadow-xs">
            <span className="text-3xl sm:text-4xl font-extrabold text-blue-900 font-serif">100%</span>
            <p className="text-xs font-bold text-slate-700">Articleship Support</p>
            <p className="text-[11px] text-slate-500">Tier-1 &amp; Mid-Tier CA Firms</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center space-y-1 shadow-xs">
            <span className="text-3xl sm:text-4xl font-extrabold text-amber-600 font-serif">Big 4</span>
            <p className="text-xs font-bold text-slate-700">Global Recruiters</p>
            <p className="text-[11px] text-slate-500">Deloitte, PwC, EY, KPMG</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center space-y-1 shadow-xs">
            <span className="text-3xl sm:text-4xl font-extrabold text-emerald-600 font-serif">₹4 - 9 LPA</span>
            <p className="text-xs font-bold text-slate-700">Starting Salary Range</p>
            <p className="text-[11px] text-slate-500">Semi-Qualified &amp; B.Com Graduates</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center space-y-1 shadow-xs">
            <span className="text-3xl sm:text-4xl font-extrabold text-indigo-600 font-serif">1:1</span>
            <p className="text-xs font-bold text-slate-700">Interview Training</p>
            <p className="text-[11px] text-slate-500">Mock Board &amp; Resume Clinics</p>
          </div>
        </div>

        {/* Corporate Recruiters Filter & Grid */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h3 className="text-xl font-bold font-serif text-slate-900">Featured Placement &amp; Articleship Partners</h3>
            
            <div className="inline-flex p-1 rounded-xl bg-white border border-slate-200 shadow-xs">
              {(['ALL', 'Big 4', 'Chartered Firm', 'Tech & MNC', 'Banking & BFSI'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecruiters.map((recruiter, idx) => (
              <motion.div
                key={recruiter.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: idx * 0.04 }}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold text-slate-900 font-serif">{recruiter.name}</h4>
                  <span className="text-[10.5px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                    {recruiter.category}
                  </span>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Typical Recruited Roles:</span>
                  <div className="flex flex-wrap gap-1">
                    {recruiter.roles.map((role, rIdx) => (
                      <span key={rIdx} className="text-[11px] bg-blue-50 text-blue-900 px-2 py-0.5 rounded font-medium border border-blue-100">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 3-Tier Placement Prep Framework */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Career Readiness Cycle</span>
            <h3 className="text-2xl font-bold font-serif text-slate-900">
              How We Prepare You for Articleship &amp; Campus Placements
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <span className="text-sm font-black text-amber-600">Year 1: Foundation</span>
              <h4 className="text-base font-bold text-slate-900">Aptitude &amp; Software Fluency</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tally Prime certification, MS Excel financial modeling, and English business communication workshops.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <span className="text-sm font-black text-blue-600">Year 2: Intermediate</span>
              <h4 className="text-base font-bold text-slate-900">Tax Auditing &amp; Articleship Drives</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                ICAI Inter exam coaching, mock audit paper reviews, and interviews for 2-year mandatory CA articleships.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <span className="text-sm font-black text-emerald-600">Year 3: Career Launch</span>
              <h4 className="text-base font-bold text-slate-900">Corporate Day &amp; Big 4 Offers</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Campus recruitment drives with MNCs, Big 4 risk consulting divisions, banks, and senior audit firms.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
