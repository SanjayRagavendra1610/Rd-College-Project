import React, { useState } from 'react';
import { FACULTY_DIRECTORY } from '../data/rdccpsFullData';
import { FacultyMember } from '../types';
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  Briefcase, 
  CheckCircle2, 
  UserCheck, 
  Sparkles,
  Search,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FacultySectionProps {
  onOpenApply?: () => void;
}

export const FacultySection: React.FC<FacultySectionProps> = ({ onOpenApply }) => {
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'Professional CA/CMA' | 'Academic Commerce' | 'Leadership' | 'Administration'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(null);

  const filteredFaculty = FACULTY_DIRECTORY.filter((member) => {
    const matchesFilter = selectedFilter === 'ALL' || member.roleType === selectedFilter;
    if (!matchesFilter) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      member.name.toLowerCase().includes(q) ||
      member.designation.toLowerCase().includes(q) ||
      member.qualifications.toLowerCase().includes(q) ||
      member.specialization.toLowerCase().includes(q) ||
      member.subjectsTaught.some(s => s.toLowerCase().includes(q))
    );
  });

  return (
    <section id="faculty-section" className="py-16 sm:py-24 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-900 text-xs font-bold border border-blue-200">
            <GraduationCap className="w-3.5 h-3.5 text-blue-800" />
            <span>Faculty of Eminence • Mentors &amp; Scholars</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-serif">
            Learn Directly from Practicing CAs &amp; Seasoned Academicians
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Our faculty combines qualified Chartered Accountants (CAs), Cost Accountants (CMAs), and Ph.D. scholars who mentor our 300-student cohort with personalized daily attention.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {(['ALL', 'Professional CA/CMA', 'Academic Commerce', 'Leadership', 'Administration'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedFilter === filter
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/60'
                }`}
              >
                {filter === 'ALL' ? 'All Mentors' : filter}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, CA/CMA, subject..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFaculty.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between space-y-4 hover:border-slate-300"
            >
              <div className="space-y-3">
                {/* Role Badge & Experience */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border ${member.badgeColor || 'bg-slate-100 text-slate-800 border-slate-200'}`}>
                    {member.roleType}
                  </span>
                  <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    {member.experienceYears}
                  </span>
                </div>

                {/* Name & Designation with Chairman Avatar */}
                <div className="flex items-center gap-3">
                  {member.id === 'fac-founder' && (
                    <div className="w-13 h-13 rounded-full overflow-hidden border-2 border-amber-400 shrink-0 shadow-md ring-2 ring-amber-300/40 bg-slate-900">
                      <img 
                        src="/chairman_photo.jpg" 
                        alt={member.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.src.includes('DSC01929')) {
                            target.src = '/DSC01929.jpg';
                          }
                        }}
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 font-serif">{member.name}</h3>
                    <p className="text-xs font-semibold text-amber-700">{member.designation}</p>
                  </div>
                </div>

                {/* Qualifications */}
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Qualifications</span>
                  <span className="text-xs font-mono font-bold text-slate-800">{member.qualifications}</span>
                </div>

                {/* Specialization */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-700 block">Area of Expertise:</span>
                  <p className="text-xs text-slate-600 leading-relaxed">{member.specialization}</p>
                </div>

                {/* Subjects Taught */}
                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Key Subjects &amp; Modules:</span>
                  <div className="flex flex-wrap gap-1">
                    {member.subjectsTaught.map((sub, sIdx) => (
                      <span key={sIdx} className="text-[10.5px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bio summary */}
              <div className="pt-3 border-t border-slate-100">
                <p className="text-[11.5px] text-slate-500 italic leading-relaxed">
                  "{member.bio}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mentorship Guarantee Card */}
        <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold">
              <UserCheck className="w-4 h-4" />
              <span>1:1 Mentorship Framework</span>
            </div>
            <h4 className="text-xl font-bold font-serif">
              Personalized Doubt-Clearing &amp; ICAI Exam Reviews
            </h4>
            <p className="text-xs text-slate-300 max-w-xl">
              Every student is assigned a dedicated faculty mentor who monitors weekly mock test progress, identifies weak areas, and conducts tailored remedial clinics.
            </p>
          </div>
          {onOpenApply && (
            <button
              onClick={onOpenApply}
              className="px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors shadow-md cursor-pointer shrink-0"
            >
              Enroll with Expert Mentors
            </button>
          )}
        </div>

      </div>
    </section>
  );
};
