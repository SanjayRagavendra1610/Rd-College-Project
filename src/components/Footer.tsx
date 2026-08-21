import React from 'react';
import { Logo } from './Logo';
import { RDCCPS_INFO, COURSES_DATA } from '../data/coursesData';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  GraduationCap, 
  ArrowUp, 
  Heart, 
  ShieldCheck,
  Award,
  Download
} from 'lucide-react';

interface FooterProps {
  onSelectCourseById: (courseId: string) => void;
  onOpenApply: () => void;
  onOpenBrochure: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCourseById,
  onOpenApply,
  onOpenBrochure
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-slate-950 text-slate-400 text-xs pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1 & 2: Brand & Address */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" size="lg" />

            <p className="text-slate-300 leading-relaxed max-w-sm pt-1">
              RD College of Commerce & Professional Studies (RDCCPS) is dedicated to producing elite Chartered Accountants, ACCA Global Affiliates, and Cost Management leaders through integrated university degree programs.
            </p>

            <div className="space-y-2.5 pt-2 text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{RDCCPS_INFO.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <div className="flex flex-wrap gap-2">
                  {RDCCPS_INFO.phones.map((phone, i) => (
                    <a key={i} href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-amber-400 transition-colors">
                      {phone}{i < RDCCPS_INFO.phones.length - 1 ? ',' : ''}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <a href={`mailto:${RDCCPS_INFO.emails[0]}`} className="hover:text-sky-300 transition-colors">
                  {RDCCPS_INFO.emails[0]}
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Courses Offered */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Integrated Courses
            </h4>
            <ul className="space-y-2">
              {COURSES_DATA.map((course) => (
                <li key={course.id}>
                  <button
                    onClick={() => onSelectCourseById(course.id)}
                    className="hover:text-amber-400 text-left transition-colors text-slate-300 flex items-center gap-1 cursor-pointer"
                  >
                    <span>• {course.shortName}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Admissions & Student Life
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenApply}
                  className="hover:text-amber-400 transition-colors text-slate-300 cursor-pointer"
                >
                  Admission Enquiry 2026-27
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBrochure}
                  className="hover:text-amber-400 transition-colors text-slate-300 cursor-pointer"
                >
                  Download Prospectus PDF
                </button>
              </li>
              <li>
                <a href="#dual-path-section" className="hover:text-amber-400 transition-colors text-slate-300">
                  The Dual-Path Advantage
                </a>
              </li>
              <li>
                <a href="#curriculum-roadmap-section" className="hover:text-amber-400 transition-colors text-slate-300">
                  3-Year Milestone Roadmap
                </a>
              </li>
              <li>
                <a href="#campus-facilities-section" className="hover:text-amber-400 transition-colors text-slate-300">
                  Campus & Hostel Facilities
                </a>
              </li>
              <li>
                <a href="#faq-section" className="hover:text-amber-400 transition-colors text-slate-300">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Accreditations & Timings */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Affiliation & Hours
            </h4>
            <p className="text-slate-300 leading-relaxed">
              Affiliated with <strong>Bharathiar University</strong>, Coimbatore. Approved by Higher Education Department, Govt. of Tamil Nadu.
            </p>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[11px] text-amber-400 font-bold block">Campus Timings:</span>
              <p className="text-[11px] text-slate-300">{RDCCPS_INFO.operatingHours}</p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} RD College of Commerce & Professional Studies (RDCCPS). All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span>Affiliated with Bharathiar University</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
              title="Scroll to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
