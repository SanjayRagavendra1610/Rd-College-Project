import React, { useState } from 'react';
import { ADMISSION_STEPS, RDCCPS_CORE_PROFILE } from '../data/rdccpsFullData';
import { 
  FileCheck, 
  GraduationCap, 
  Sparkles, 
  Download, 
  HelpCircle, 
  CheckCircle2, 
  Calendar, 
  Phone, 
  Mail, 
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { motion } from 'motion/react';

interface AdmissionsSectionProps {
  onOpenApply: (courseId?: string) => void;
  onOpenBrochure: () => void;
}

export const AdmissionsSection: React.FC<AdmissionsSectionProps> = ({
  onOpenApply,
  onOpenBrochure
}) => {
  const [activeTab, setActiveTab] = useState<'process' | 'eligibility' | 'scholarships' | 'checklist'>('process');

  return (
    <section id="admissions-section" className="py-16 sm:py-24 bg-slate-50 text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-bold border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>Admissions Open for Academic Year {RDCCPS_CORE_PROFILE.admissionsSession}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-serif">
            Step-by-Step Admissions &amp; Eligibility Guide
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Secure your seat in our exclusive 300-student cohort. Get a recognized Bharathiar University B.Com degree alongside comprehensive on-campus coaching for CA, ACCA, or CMA.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-slate-200 shadow-xs max-w-full overflow-x-auto">
            <button
              onClick={() => setActiveTab('process')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-nowrap ${
                activeTab === 'process'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1. Admission Process
            </button>
            <button
              onClick={() => setActiveTab('eligibility')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-nowrap ${
                activeTab === 'eligibility'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2. Eligibility &amp; Streams
            </button>
            <button
              onClick={() => setActiveTab('scholarships')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-nowrap ${
                activeTab === 'scholarships'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              3. Merit Scholarships
            </button>
            <button
              onClick={() => setActiveTab('checklist')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-nowrap ${
                activeTab === 'checklist'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              4. Document Checklist
            </button>
          </div>
        </div>

        {/* Tab 1: Admission Process */}
        {activeTab === 'process' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {ADMISSION_STEPS.map((step, idx) => (
                <div 
                  key={step.stepNumber}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-amber-400 transition-colors"
                >
                  <div className="space-y-3">
                    <span className="text-2xl font-black text-amber-500 font-serif">
                      {step.stepNumber}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions Bar */}
            <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 border border-blue-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="space-y-2 text-center md:text-left">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Fast-Track Registration</span>
                <h4 className="text-xl sm:text-2xl font-black font-serif">Ready to Submit Your Application?</h4>
                <p className="text-xs text-slate-300">Complete the online admission inquiry in under 2 minutes.</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenApply()}
                  className="px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs hover:bg-amber-400 transition-colors shadow-md cursor-pointer"
                >
                  Apply for Admission
                </button>
                <button
                  onClick={onOpenBrochure}
                  className="px-5 py-3 rounded-xl bg-white/10 text-white font-bold text-xs hover:bg-white/20 border border-white/20 transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Prospectus</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Eligibility & Streams */}
        {activeTab === 'eligibility' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Academic Prerequisites</span>
                <h3 className="text-2xl font-bold font-serif text-slate-900">Higher Secondary (+2) Requirements</h3>
              </div>
              <ul className="space-y-4 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span><strong>Qualifying Examination:</strong> Passed Tamil Nadu Higher Secondary (+2), CBSE, ISC, or any recognized equivalent State/Central board.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span><strong>Eligible Streams:</strong> Commerce with Accountancy, Business Maths, Computer Applications, Economics, or Pure Science with Mathematics.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span><strong>Minimum Marks:</strong> 50% aggregate in +2 examinations (Relaxation as per Tamil Nadu Government &amp; University norms for reserved categories).</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Professional Inclusions</span>
                <h3 className="text-2xl font-bold font-serif text-slate-900">What is Covered in the Program</h3>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Full 3-Year Bharathiar University B.Com Curriculum</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Integrated Classroom Coaching for CA / ACCA / CMA</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Comprehensive ICAI/ICMAI Study Kits &amp; Daily Practice Sets</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Tally Prime, GST E-Filing &amp; Advanced Excel Computer Labs</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Dedicated Articleship Placement &amp; Corporate Interview Drives</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 3: Scholarships */}
        {activeTab === 'scholarships' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Merit Excellence Scholarship</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Special academic awards for students scoring 90%+ aggregate in their +2 Higher Secondary commerce examinations.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">CA Foundation Topper Awards</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Scholarship grants and fee waivers for students clearing ICAI CA Foundation in their very first attempt during Year 1.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Sibling &amp; Sports Concession</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fee concessions for outstanding sports achievers representing State/National levels and siblings of alumni.
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: Document Checklist */}
        {activeTab === 'checklist' && (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold font-serif text-slate-900">
              Mandatory Documents for Verification
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2.5">
                <FileCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>10th Mark Sheet (Original + 3 Copies)</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2.5">
                <FileCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>12th (+2) Mark Sheet (Original + 3 Copies)</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2.5">
                <FileCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Transfer Certificate (TC) &amp; Conduct Certificate</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2.5">
                <FileCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Community Certificate (if applicable)</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2.5">
                <FileCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Aadhaar Card Copy of Student &amp; Parent</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2.5">
                <FileCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>6 Passport Size Recent Photographs</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
