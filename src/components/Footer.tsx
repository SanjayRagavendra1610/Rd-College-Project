import React from 'react';
import { Logo } from './Logo';
import { RDCCPS_INFO, COURSES_DATA } from '../data/coursesData';
import { RDCCPS_CORE_PROFILE } from '../data/rdccpsFullData';
import { ActiveTabType } from '../types';
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
  Download,
  Building2,
  Calendar
} from 'lucide-react';

interface FooterProps {
  onSelectTab?: (tab: ActiveTabType) => void;
  onSelectCourseById: (courseId: string) => void;
  onOpenApply: () => void;
  onOpenBrochure: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onSelectCourseById,
  onOpenApply,
  onOpenBrochure
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabClick = (tab: ActiveTabType, sectionId?: string) => {
    if (onSelectTab) {
      onSelectTab(tab);
      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer id="main-footer" className="bg-slate-950 text-slate-400 text-xs pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1 & 2: Brand & Address */}
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-block bg-white p-3.5 rounded-2xl shadow-md border border-slate-200/20">
              <Logo variant="dark" size="md" layout="stacked" />
            </div>

            <p className="text-slate-300 leading-relaxed max-w-sm pt-1">
              RD College of Commerce and Professional Studies (RDCCPS) is an institution in Erode &amp; Coimbatore, Tamil Nadu, affiliated with Bharathiar University. We empower commerce scholars with integrated CA, ACCA, and CMA qualifications under one roof.
            </p>

            <div className="space-y-2.5 pt-2 text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>6/232 Pulavarpalayam, Uthukuli Road, Vijayamangalam, Perundurai, Erode - 638056</span>
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

          {/* Col 4: Quick Navigation Tabs */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Site Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleTabClick('about', 'about-us-section')}
                  className="hover:text-amber-400 transition-colors text-slate-300 cursor-pointer"
                >
                  About RDCCPS &amp; Vision
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTabClick('faculty', 'faculty-section')}
                  className="hover:text-amber-400 transition-colors text-slate-300 cursor-pointer"
                >
                  Faculty of Eminence
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTabClick('admissions', 'admissions-section')}
                  className="hover:text-amber-400 transition-colors text-slate-300 cursor-pointer"
                >
                  Admissions 2026-27
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTabClick('facilities', 'campus-life-section')}
                  className="hover:text-amber-400 transition-colors text-slate-300 cursor-pointer"
                >
                  Campus Life &amp; Hostels
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTabClick('placements', 'placements-section')}
                  className="hover:text-amber-400 transition-colors text-slate-300 cursor-pointer"
                >
                  Placements &amp; Articleships
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTabClick('contact', 'contact-section')}
                  className="hover:text-amber-400 transition-colors text-slate-300 cursor-pointer"
                >
                  Contact &amp; Campus Location
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Accreditations & Timings */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Affiliation &amp; Admissions
            </h4>
            <p className="text-slate-300 leading-relaxed">
              Affiliated with <strong>Bharathiar University</strong>, Coimbatore. Approved by Higher Education Department, Govt. of Tamil Nadu.
            </p>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-[11px] text-amber-400 font-bold block">Admissions Helpdesk:</span>
              <p className="text-[11px] text-slate-300">+91 97885 56999 / 98438 85222</p>
              <div className="pt-1 flex gap-2">
                <button
                  onClick={onOpenApply}
                  className="px-2.5 py-1 rounded-md bg-amber-500 text-slate-950 font-bold text-[10.5px] hover:bg-amber-400 transition-colors cursor-pointer"
                >
                  Apply Online
                </button>
                <button
                  onClick={onOpenBrochure}
                  className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 font-semibold text-[10.5px] hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  Prospectus
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} RD College of Commerce &amp; Professional Studies (RDCCPS). All rights reserved.
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

