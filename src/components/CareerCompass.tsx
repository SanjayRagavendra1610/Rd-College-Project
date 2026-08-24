import React, { useState } from 'react';
import { COURSES_DATA } from '../data/coursesData';
import { Course } from '../types';
import { 
  Compass, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  RotateCcw, 
  Award, 
  Globe, 
  Building, 
  TrendingUp,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ConfettiEffect } from './ConfettiEffect';

interface CareerCompassProps {
  onSelectCourse: (course: Course) => void;
  onApplyCourse: (courseId: string) => void;
}

export const CareerCompass: React.FC<CareerCompassProps> = ({
  onSelectCourse,
  onApplyCourse
}) => {
  const [step, setStep] = useState<number>(1);
  const [careerGoal, setCareerGoal] = useState<string>('');
  const [twelfthStream, setTwelfthStream] = useState<string>('');
  const [geographicPreference, setGeographicPreference] = useState<string>('');
  const [matchedCourse, setMatchedCourse] = useState<Course | null>(null);

  const handleFinishWizard = (goal: string, stream: string, geo: string) => {
    let result = COURSES_DATA[0]; // default B.Com CA

    if (geo === 'global' || goal === 'global_big4') {
      result = COURSES_DATA.find(c => c.id === 'bcom-finance-acca') || COURSES_DATA[2];
    } else if (goal === 'cost_controller' || goal === 'banking') {
      result = COURSES_DATA.find(c => c.id === 'bcom-banking-finance-cma') || COURSES_DATA[4];
    } else if (goal === 'investment_analyst' || (stream === 'maths' && goal === 'tax_consultant')) {
      result = COURSES_DATA.find(c => c.id === 'bcom-accounting-finance-ca') || COURSES_DATA[3];
    } else if (goal === 'fast_track_ca') {
      result = COURSES_DATA.find(c => c.id === 'bcom-professional-accounting-ca') || COURSES_DATA[1];
    } else {
      result = COURSES_DATA[0];
    }

    setMatchedCourse(result);
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setCareerGoal('');
    setTwelfthStream('');
    setGeographicPreference('');
    setMatchedCourse(null);
  };

  return (
    <section id="career-compass-section" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5 text-emerald-700" />
            <span>Interactive Course Recommendation Wizard</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Find Your Ideal Integrated Commerce Pathway
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Answer 3 quick questions about your career aspiration and 12th standard background to discover the best-fit B.Com dual qualification program at RDCCPS.
          </p>
        </div>

        {/* Wizard Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-200">
          {/* Step Indicator */}
          {step < 4 && (
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-extrabold text-xs flex items-center justify-center">
                  {step}
                </span>
                <span className="text-xs font-bold text-slate-900">
                  Step {step} of 3
                </span>
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3].map((s) => (
                  <div 
                    key={s}
                    className={`h-1.5 w-8 rounded-full transition-colors ${
                      s <= step ? 'bg-amber-500' : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* STEP 1: CAREER GOAL */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  1. What is your primary career goal or dream role?
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'fast_track_ca', label: 'Chartered Accountant (CA)', sub: 'Statutory Auditing, Corporate Tax & ICAI credential', icon: <Award className="w-4 h-4 text-blue-600" /> },
                    { id: 'global_big4', label: 'Global Finance & MNC (ACCA UK)', sub: 'International reporting (IFRS), Big 4 overseas scope in 180+ countries', icon: <Globe className="w-4 h-4 text-emerald-600" /> },
                    { id: 'investment_analyst', label: 'Investment Banking & Equity Research', sub: 'Financial modeling, Valuation, CA & Capital Markets synergy', icon: <TrendingUp className="w-4 h-4 text-purple-600" /> },
                    { id: 'cost_controller', label: 'Cost Management & Manufacturing (CMA)', sub: 'Strategic Cost Control, PSU financial management, ICMAI track', icon: <Building className="w-4 h-4 text-amber-600" /> }
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setCareerGoal(option.id);
                        setStep(2);
                      }}
                      className="text-left p-4 rounded-2xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/40 transition-all cursor-pointer flex flex-col justify-between space-y-2 group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-slate-100 group-hover:bg-amber-100 transition-colors">
                          {option.icon}
                        </div>
                        <span className="font-extrabold text-sm text-slate-900 group-hover:text-amber-900">
                          {option.label}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {option.sub}
                      </p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2: 12TH BACKGROUND */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                    2. What is your +2 / 12th Standard Subject Stream?
                  </h3>
                  <button 
                    onClick={() => setStep(1)} 
                    className="text-xs text-slate-500 hover:text-slate-900 cursor-pointer"
                  >
                    ← Back
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'commerce_maths', label: 'Commerce with Business Maths / Maths', desc: 'Accountancy, Commerce, Economics & Business Maths' },
                    { id: 'commerce_cs', label: 'Commerce with Computer Applications', desc: 'Accountancy, Commerce, Economics & Computer Science' },
                    { id: 'pure_commerce', label: 'Pure Commerce / Accountancy', desc: 'Commerce, Accountancy, Economics & History/Language' },
                    { id: 'science_maths', label: 'Science with Mathematics', desc: 'Transitioning from PCM / PCB with strong quantitative skills' }
                  ].map((stream) => (
                    <button
                      key={stream.id}
                      onClick={() => {
                        setTwelfthStream(stream.id);
                        setStep(3);
                      }}
                      className="text-left p-4 rounded-2xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/40 transition-all cursor-pointer space-y-1.5 group"
                    >
                      <span className="font-extrabold text-sm text-slate-900 group-hover:text-amber-900 block">
                        {stream.label}
                      </span>
                      <p className="text-xs text-slate-500">
                        {stream.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 3: SCOPE & PREFERENCE */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                    3. Do you prefer Indian Professional Credentials or International Scope?
                  </h3>
                  <button 
                    onClick={() => setStep(2)} 
                    className="text-xs text-slate-500 hover:text-slate-900 cursor-pointer"
                  >
                    ← Back
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'indian', title: 'Indian Statutory Focus (CA/CMA)', desc: 'Practicing in India, Statutory Audits, Corporate Tax Filings & PSUs' },
                    { id: 'global', title: 'Global Recognition (ACCA UK)', desc: 'Multi-national corporations, relocation to UK/UAE/Singapore, Big 4 GDS' },
                    { id: 'finance', title: 'Corporate Finance & Analytics', desc: 'Synergy of chartered accounting with equity markets & investment analytics' }
                  ].map((geo) => (
                    <button
                      key={geo.id}
                      onClick={() => {
                        setGeographicPreference(geo.id);
                        handleFinishWizard(careerGoal, twelfthStream, geo.id);
                      }}
                      className="text-left p-4 rounded-2xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/40 transition-all cursor-pointer space-y-2 group"
                    >
                      <span className="font-extrabold text-sm text-slate-900 group-hover:text-amber-900 block">
                        {geo.title}
                      </span>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {geo.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 4: RECOMMENDATION RESULT */}
            {step === 4 && matchedCourse && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 relative"
              >
                {/* Celebratory Particle Confetti Burst */}
                <ConfettiEffect />

                <div className="text-center space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-spin" style={{ animationDuration: '4s' }} />
                    <span>98% Recommended Program Match</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    We Recommend: {matchedCourse.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">
                    {matchedCourse.tagline}
                  </p>
                </div>

                {/* Match Card */}
                <div className={`p-6 rounded-2xl bg-gradient-to-r ${matchedCourse.colorTheme.primary} text-white space-y-4 shadow-md relative overflow-hidden`}>
                  {/* Subtle photo background */}
                  {matchedCourse.imageUrl && (
                    <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-luminosity">
                      <img
                        src={matchedCourse.imageUrl}
                        alt=""
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/60 to-transparent pointer-events-none" />

                  <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-white/20 pb-3">
                    <span className="text-xs font-bold text-amber-300">
                      {matchedCourse.integratedCertification}
                    </span>
                    <span className="text-xs text-slate-200">
                      {matchedCourse.duration} • Bharathiar University
                    </span>
                  </div>

                  <p className="relative z-10 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {matchedCourse.description}
                  </p>

                  <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs pt-2">
                    <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-xs">
                      <span className="text-[10px] text-slate-300 block">Affiliation</span>
                      <strong className="text-amber-300 font-extrabold">Bharathiar Univ</strong>
                    </div>
                    <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-xs">
                      <span className="text-[10px] text-slate-300 block">Top Role</span>
                      <strong className="text-white truncate block">{matchedCourse.careerOpportunities[0]?.role.split('/')[0]}</strong>
                    </div>
                    <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-xs col-span-2 sm:col-span-1">
                      <span className="text-[10px] text-slate-300 block">Lab Specialization</span>
                      <strong className="text-white">{matchedCourse.toolsAndCertifications[0]}</strong>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 cursor-pointer py-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Match Wizard</span>
                  </button>

                  <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    <button
                      onClick={() => onSelectCourse(matchedCourse)}
                      className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-slate-600" />
                      <span>View Full Syllabus</span>
                    </button>

                    <button
                      onClick={() => onApplyCourse(matchedCourse.id)}
                      className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
                    >
                      <span>Apply for this Course</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
