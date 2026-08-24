import React, { useState } from 'react';
import { COURSES_DATA, RDCCPS_INFO } from '../data/coursesData';
import { Logo } from './Logo';
import { 
  X, 
  Download, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  GraduationCap, 
  BookOpen,
  Building2,
  Award
} from 'lucide-react';
import { motion } from 'motion/react';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({ isOpen, onClose }) => {
  const [downloading, setDownloading] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<'comprehensive' | 'ca_focus' | 'acca_focus'>('comprehensive');

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      const text = 
        `========================================================================\n` +
        `RD COLLEGE OF COMMERCE AND PROFESSIONAL STUDIES (RDCCPS)\n` +
        `Affiliated with Bharathiar University, Coimbatore | Erode, Tamil Nadu\n` +
        `ACADEMIC PROSPECTUS & COURSE SPECIFICATION (2026 - 2027)\n` +
        `========================================================================\n\n` +
        `ABOUT RDCCPS:\n` +
        `RD College of Commerce & Professional Studies is a premier commerce institution\n` +
        `pioneering dual-qualification programs. Students pursue a recognized Bharathiar\n` +
        `University B.Com degree with concurrent on-campus coaching for CA, ACCA, and CMA.\n\n` +
        `OUR 5 FLAGSHIP INTEGRATED B.COM PROGRAMS:\n` +
        COURSES_DATA.map((c, idx) => (
          `\n------------------------------------------------------------------------\n` +
          `0${idx + 1}. ${c.name} [Code: ${c.code}]\n` +
          `    Dual Certification : ${c.integratedCertification}\n` +
          `    Duration           : ${c.duration} (${c.totalSemesters} Semesters)\n` +
          `    Eligibility        : ${c.eligibility} (Min: ${c.minimumMarks})\n` +
          `    Key Focus          : ${c.tagline}\n` +
          `    Affiliation        : Bharathiar University\n` +
          `    Key Software Labs  : ${c.toolsAndCertifications.join(', ')}\n`
        )).join('') +
        `\n========================================================================\n` +
        `CAMPUS FACILITIES:\n` +
        `- Digital Finance Lab with Tally Prime, SAP FICO, Python & Excel Modeling\n` +
        `- Dedicated CA / ACCA / CMA Study Lounge with ICAI materials & late-night pods\n` +
        `- 50+ College Bus routes covering Erode, Tirupur, Coimbatore & Perundurai\n` +
        `- Separate Boys & Girls Hostels with hygienic food and 24/7 security\n\n` +
        `ADMISSIONS & COUNSELING HELPDESK:\n` +
        `Campus: 6/232 Pulavarpalayam, Uthukuli Road, Vijayamangalam, Perundurai, Erode - 638056\n` +
        `Hotline: +91 97885 56999 | +91 98438 85222 | +91 98438 84222\n` +
        `Email: rdccpscollege@gmail.com | helpdesk@rdccps.com\n` +
        `Website: www.rdccps.org\n` +
        `========================================================================\n`;

      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `RDCCPS_Official_Prospectus_2026_27.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 600);
  };

  return (
    <div id="brochure-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        id="brochure-modal-container"
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto"
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mb-4">
            <Logo variant="light" size="sm" showAffiliation={false} />
          </div>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400 text-slate-950">
              Official Prospectus 2026-27
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            Download RDCCPS Academic Guide
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Complete syllabus outline, fee concession criteria, and dual-coaching timetable breakdown.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              What's Included in the Prospectus
            </h3>
            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>All 5 B.Com Integrated Courses (CA, ACCA, CMA) curriculum specifications</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>6-Semester subject tables, credit distributions & computer lab roadmaps</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>ICAI / ACCA / ICMAI examination synchronization schedule</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Merit scholarship slabs (up to 40% fee waiver) and hostel guide</span>
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-slate-500">
              Document Size: ~1.2 MB • Updated for 2026-27
            </span>

            <button
              onClick={handleDownload}
              disabled={downloading}
              className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'Preparing Prospectus...' : 'Download Prospectus Now'}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
