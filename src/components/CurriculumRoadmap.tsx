import React, { useState } from 'react';
import { 
  Calendar, 
  Award, 
  CheckCircle2, 
  GraduationCap, 
  ArrowRight, 
  Briefcase, 
  Sparkles,
  BookOpen,
  Building2,
  FileCheck
} from 'lucide-react';
import { motion } from 'motion/react';
import { CertificationType } from '../types';

export const CurriculumRoadmap: React.FC = () => {
  const [activeTrack, setActiveTrack] = useState<CertificationType>('CA');

  const roadmapData = {
    CA: [
      {
        year: "Year 01",
        semesters: "Semesters 1 & 2",
        academicFocus: "Principles of Accountancy, Mercantile Law, Business Economics & Statistics",
        professionalMilestone: "CA Foundation Examination (ICAI)",
        practicalLab: "Tally Prime Basics & Financial Modeling in Excel",
        keyOutcome: "Clear CA Foundation by end of Year 1 and earn eligibility for CA Intermediate registration.",
        tag: "Foundation Phase"
      },
      {
        year: "Year 02",
        semesters: "Semesters 3 & 4",
        academicFocus: "Corporate Accounting (Ind AS), Direct Taxation, Cost Accounting & Company Law",
        professionalMilestone: "CA Intermediate Group 1 (ICAI)",
        practicalLab: "GST Portal E-filing, Advanced TDS Lab & Audit Analytics",
        keyOutcome: "Master complex tax laws & corporate accounting; appear for CA Inter Group 1 exams.",
        tag: "Intermediate Core"
      },
      {
        year: "Year 03",
        semesters: "Semesters 5 & 6",
        academicFocus: "Management Accounting, Auditing & Assurance, Strategic Financial Management",
        professionalMilestone: "CA Inter Group 2 & Articleship Placement",
        practicalLab: "Comprehensive Audit Case Studies & Executive Placement Grooming",
        keyOutcome: "Complete B.Com degree with distinction and transition directly into 2-year mandatory CA Articleship.",
        tag: "Career Launch"
      }
    ],
    ACCA: [
      {
        year: "Year 01",
        semesters: "Semesters 1 & 2",
        academicFocus: "Business & Technology, Management Accounting, Financial Accounting (Global)",
        professionalMilestone: "ACCA Applied Knowledge Level (BT, MA, FA)",
        practicalLab: "Financial Spreadsheet Modeling & Business Tech Lab",
        keyOutcome: "Achieve ACCA Diploma in Accounting & Business credential.",
        tag: "Knowledge Level"
      },
      {
        year: "Year 02",
        semesters: "Semesters 3 & 4",
        academicFocus: "Performance Management (PM), Taxation (TX), Financial Reporting (FR), Audit (AA)",
        professionalMilestone: "ACCA Applied Skills Level Exam Clearances",
        practicalLab: "IFRS Group Accounts & International Tax Compliance Lab",
        keyOutcome: "Earn Advanced Diploma in Accounting and Business from ACCA UK.",
        tag: "Applied Skills"
      },
      {
        year: "Year 03",
        semesters: "Semesters 5 & 6",
        academicFocus: "Financial Management (FM), Strategic Business Leader (SBL) Orientation",
        professionalMilestone: "ACCA Strategic Professional Level & Big 4 Placement",
        practicalLab: "Python Financial Analytics & Power BI Dashboard Reporting",
        keyOutcome: "Graduate with B.Com degree and ACCA Affiliate status; direct placement in Big 4 MNCs.",
        tag: "Strategic Professional"
      }
    ],
    CMA: [
      {
        year: "Year 01",
        semesters: "Semesters 1 & 2",
        academicFocus: "Financial Accounting, Fundamentals of Cost Accounting, Banking Regulations & Economics",
        professionalMilestone: "ICMAI CMA Foundation Examination",
        practicalLab: "Banking Technology & Spreadsheets Cost Modeling",
        keyOutcome: "Clear CMA Foundation in first attempt with strong quantitative fundamentals.",
        tag: "Foundation Phase"
      },
      {
        year: "Year 02",
        semesters: "Semesters 3 & 4",
        academicFocus: "Advanced Cost Accounting, Direct Taxation, Commercial Banking Operations & GST",
        professionalMilestone: "CMA Intermediate Group 1 (ICMAI)",
        practicalLab: "Tally Prime Cost Centers & SAP FICO Introduction",
        keyOutcome: "Master Cost Accounting Standards (CAS) and corporate direct/indirect tax computation.",
        tag: "Intermediate Phase"
      },
      {
        year: "Year 03",
        semesters: "Semesters 5 & 6",
        academicFocus: "Operations Management, Strategic Cost Management, Cost & Management Audit",
        professionalMilestone: "CMA Inter Group 2 & Industry Articleship",
        practicalLab: "Business Valuation Lab & Core Banking Simulation",
        keyOutcome: "Secure prestigious placement in PSUs, manufacturing MNCs, or commercial banking giants.",
        tag: "Professional Transition"
      }
    ],
    ALL: []
  };

  const activeRoadmap = roadmapData[activeTrack === 'ALL' ? 'CA' : activeTrack] || roadmapData.CA;

  return (
    <section id="curriculum-roadmap-section" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-200 text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5 text-blue-700" />
            <span>Structured 3-Year Milestone Journey</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            From Day 1 to Professional Graduation
          </h2>

          <p className="text-xs sm:text-sm text-slate-600">
            See how your 3 years (6 semesters) at RDCCPS are mapped out to achieve both university degree accolades and professional body credentials simultaneously.
          </p>
        </div>

        {/* Track Selector Pills */}
        <div className="flex justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveTrack('CA')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTrack === 'CA'
                ? 'bg-blue-900 text-white shadow-md shadow-blue-900/20'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Chartered Accountancy (CA - ICAI) Track
          </button>
          <button
            onClick={() => setActiveTrack('ACCA')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTrack === 'ACCA'
                ? 'bg-emerald-900 text-white shadow-md shadow-emerald-900/20'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            ACCA (UK Global) Track
          </button>
          <button
            onClick={() => setActiveTrack('CMA')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTrack === 'CMA'
                ? 'bg-amber-900 text-white shadow-md shadow-amber-900/20'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Cost & Management (CMA) Track
          </button>
        </div>

        {/* 3-Year Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
          {activeRoadmap.map((stage, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-slate-50 rounded-3xl p-6 sm:p-7 border border-slate-200 flex flex-col justify-between hover:shadow-lg hover:border-slate-300 transition-all relative group"
            >
              {/* Year Header */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                    {stage.year}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white text-slate-700 border border-slate-200 shadow-xs">
                    {stage.semesters}
                  </span>
                </div>

                <div className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200">
                  {stage.tag}
                </div>

                {/* Academic Focus */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    University Degree Subjects
                  </span>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed">
                    {stage.academicFocus}
                  </p>
                </div>

                {/* Professional Body Milestone */}
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    Target Professional Milestone
                  </span>
                  <p className="text-xs font-extrabold text-slate-900">
                    {stage.professionalMilestone}
                  </p>
                </div>

                {/* Practical Lab */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    Computer Lab Training
                  </span>
                  <p className="text-xs text-slate-600">
                    {stage.practicalLab}
                  </p>
                </div>
              </div>

              {/* Year Outcome footer */}
              <div className="pt-4 mt-4 border-t border-slate-200">
                <div className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="font-medium">{stage.keyOutcome}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
