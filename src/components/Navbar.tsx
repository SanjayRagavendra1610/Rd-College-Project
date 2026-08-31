import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { RDCCPS_INFO } from '../data/coursesData';
import { ActiveTabType } from '../types';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Search, 
  FileText, 
  Scale, 
  Menu, 
  X, 
  Sparkles,
  ArrowRight,
  GraduationCap,
  Calendar
} from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTabType;
  onSelectTab: (tab: ActiveTabType) => void;
  compareCount: number;
  onOpenCompare: () => void;
  onOpenApply: (courseId?: string) => void;
  onOpenBrochure: () => void;
  onOpenAIChatbot: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  compareCount,
  onOpenCompare,
  onOpenApply,
  onOpenBrochure,
  onOpenAIChatbot,
  searchQuery,
  onSearchChange
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (tab: ActiveTabType, sectionId?: string) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };


  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      {/* Top Notification Bar */}
      <div id="top-announcement-bar" className="bg-slate-950 text-slate-300 text-xs py-1 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-1.5">
          <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto text-nowrap">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold text-[10.5px] border border-amber-500/30">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Admissions Open 2026-27
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="text-slate-300 text-[10.5px] flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
              Bharathiar University Affiliated B.Com with CA, ACCA & CMA
            </span>
          </div>

          <div className="flex items-center gap-3.5 text-[10.5px] text-slate-300">
            <a 
              href={`tel:${RDCCPS_INFO.phones[0].replace(/\s/g, '')}`} 
              className="flex items-center gap-1 hover:text-amber-400 transition-colors"
              id="header-phone-link"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>{RDCCPS_INFO.phones[0]}</span>
            </a>
            <span className="hidden md:inline text-slate-700">|</span>
            <a 
              href={`mailto:${RDCCPS_INFO.emails[0]}`} 
              className="hidden sm:flex items-center gap-1 hover:text-amber-400 transition-colors"
              id="header-email-link"
            >
              <Mail className="w-3 h-3 text-sky-400" />
              <span>{RDCCPS_INFO.emails[0]}</span>
            </a>
            <span className="hidden lg:inline text-slate-700">|</span>
            <span className="hidden lg:flex items-center gap-1 text-slate-400">
              <MapPin className="w-3 h-3 text-emerald-400" />
              <span>Perundurai, Erode</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav 
        id="main-navigation" 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200 py-1.5 sm:py-2' 
            : 'bg-white border-b border-slate-100 py-2 sm:py-2.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Logo */}
          <button 
            id="nav-brand-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-left focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-lg p-0.5 cursor-pointer"
          >
            <Logo size="md" variant="dark" />
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-4 text-xs font-semibold text-slate-700">
            <button 
              id="nav-link-home"
              onClick={() => handleNavClick('home')} 
              className={`transition-colors py-1 cursor-pointer ${activeTab === 'home' ? 'text-amber-600 font-bold border-b-2 border-amber-500' : 'hover:text-amber-600'}`}
            >
              Home
            </button>
            <button 
              id="nav-link-about"
              onClick={() => handleNavClick('about', 'about-us-section')} 
              className={`transition-colors py-1 cursor-pointer ${activeTab === 'about' ? 'text-amber-600 font-bold border-b-2 border-amber-500' : 'hover:text-amber-600'}`}
            >
              About RDCCPS
            </button>
            <button 
              id="nav-link-courses"
              onClick={() => handleNavClick('courses', 'courses-grid-section')} 
              className={`transition-colors py-1 cursor-pointer ${activeTab === 'courses' ? 'text-amber-600 font-bold border-b-2 border-amber-500' : 'hover:text-amber-600'}`}
            >
              Courses
            </button>
            <button 
              id="nav-link-faculty"
              onClick={() => handleNavClick('faculty', 'faculty-section')} 
              className={`transition-colors py-1 cursor-pointer ${activeTab === 'faculty' ? 'text-amber-600 font-bold border-b-2 border-amber-500' : 'hover:text-amber-600'}`}
            >
              Faculty
            </button>
            <button 
              id="nav-link-admissions"
              onClick={() => handleNavClick('admissions', 'admissions-section')} 
              className={`transition-colors py-1 cursor-pointer ${activeTab === 'admissions' ? 'text-amber-600 font-bold border-b-2 border-amber-500' : 'hover:text-amber-600'}`}
            >
              Admissions
            </button>
            <button 
              id="nav-link-facilities"
              onClick={() => handleNavClick('facilities', 'campus-life-section')} 
              className={`transition-colors py-1 cursor-pointer ${activeTab === 'facilities' ? 'text-amber-600 font-bold border-b-2 border-amber-500' : 'hover:text-amber-600'}`}
            >
              Campus Life
            </button>
            <button 
              id="nav-link-placements"
              onClick={() => handleNavClick('placements', 'placements-section')} 
              className={`transition-colors py-1 cursor-pointer ${activeTab === 'placements' ? 'text-amber-600 font-bold border-b-2 border-amber-500' : 'hover:text-amber-600'}`}
            >
              Placements
            </button>
            <button 
              id="nav-link-contact"
              onClick={() => handleNavClick('contact', 'contact-section')} 
              className={`transition-colors py-1 cursor-pointer ${activeTab === 'contact' ? 'text-amber-600 font-bold border-b-2 border-amber-500' : 'hover:text-amber-600'}`}
            >
              Contact
            </button>
            <button
              id="nav-link-ai-advisor"
              onClick={onOpenAIChatbot}
              className="px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-400/20 to-amber-500/20 hover:from-amber-400/30 hover:to-amber-500/30 text-amber-900 border border-amber-400/50 transition-all cursor-pointer flex items-center gap-1 font-bold shadow-xs text-[11px]"
            >
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>AI Advisor</span>
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <div className="relative">
              {showSearchInput ? (
                <div className="flex items-center bg-slate-100 rounded-full px-3 py-1.5 border border-slate-300 text-xs w-48 sm:w-60 transition-all">
                  <Search className="w-3.5 h-3.5 text-slate-400 mr-2 flex-shrink-0" />
                  <input 
                    type="text" 
                    id="nav-search-input"
                    value={searchQuery} 
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search B.Com with CA, ACCA..."
                    className="bg-transparent border-none outline-none w-full text-slate-800 placeholder-slate-400 text-xs"
                    autoFocus
                  />
                  <button 
                    onClick={() => {
                      onSearchChange('');
                      setShowSearchInput(false);
                    }}
                    className="text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  id="nav-search-trigger-btn"
                  onClick={() => setShowSearchInput(true)}
                  className="p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Search Courses"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Compare Drawer Button */}
            <button
              id="nav-compare-btn"
              onClick={onOpenCompare}
              className={`relative px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                compareCount > 0 
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm shadow-amber-500/20 font-bold' 
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Compare</span>
              {compareCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center text-[10px] font-extrabold">
                  {compareCount}
                </span>
              )}
            </button>

            {/* Download Brochure Button */}
            <button
              id="nav-brochure-btn"
              onClick={onOpenBrochure}
              className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-slate-600" />
              <span>Prospectus</span>
            </button>

            {/* Apply Now Primary Button */}
            <button
              id="nav-apply-btn"
              onClick={() => onOpenApply()}
              className="px-4 py-2 rounded-full text-xs sm:text-sm font-bold bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white hover:from-blue-800 hover:to-slate-800 shadow-md shadow-indigo-950/20 flex items-center gap-1.5 hover:gap-2 transition-all cursor-pointer"
            >
              <span>Apply Online</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              id="nav-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div id="mobile-nav-drawer" className="lg:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-4 shadow-xl">
            <div className="pb-3 border-b border-slate-100">
              <Logo size="sm" variant="dark" />
            </div>

            <div className="space-y-1.5 text-sm font-medium text-slate-800">
              <button 
                onClick={() => handleNavClick('home')} 
                className={`w-full text-left py-2 px-3 rounded-lg flex items-center justify-between ${activeTab === 'home' ? 'bg-amber-100/70 text-amber-950 font-bold' : 'hover:bg-slate-100'}`}
              >
                <span>Home</span>
              </button>
              <button 
                onClick={() => handleNavClick('about', 'about-us-section')} 
                className={`w-full text-left py-2 px-3 rounded-lg flex items-center justify-between ${activeTab === 'about' ? 'bg-amber-100/70 text-amber-950 font-bold' : 'hover:bg-slate-100'}`}
              >
                <span>About RDCCPS &amp; Vision</span>
              </button>
              <button 
                onClick={() => handleNavClick('courses', 'courses-grid-section')} 
                className={`w-full text-left py-2 px-3 rounded-lg flex items-center justify-between ${activeTab === 'courses' ? 'bg-amber-100/70 text-amber-950 font-bold' : 'hover:bg-slate-100'}`}
              >
                <span>Courses Offered</span>
                <span className="text-xs bg-amber-200 text-amber-900 px-2 py-0.5 rounded font-semibold">5 Programs</span>
              </button>
              <button 
                onClick={() => handleNavClick('faculty', 'faculty-section')} 
                className={`w-full text-left py-2 px-3 rounded-lg flex items-center justify-between ${activeTab === 'faculty' ? 'bg-amber-100/70 text-amber-950 font-bold' : 'hover:bg-slate-100'}`}
              >
                <span>Faculty of Eminence</span>
              </button>
              <button 
                onClick={() => handleNavClick('admissions', 'admissions-section')} 
                className={`w-full text-left py-2 px-3 rounded-lg flex items-center justify-between ${activeTab === 'admissions' ? 'bg-amber-100/70 text-amber-950 font-bold' : 'hover:bg-slate-100'}`}
              >
                <span>Admissions 2026-27</span>
              </button>
              <button 
                onClick={() => handleNavClick('facilities', 'campus-life-section')} 
                className={`w-full text-left py-2 px-3 rounded-lg flex items-center justify-between ${activeTab === 'facilities' ? 'bg-amber-100/70 text-amber-950 font-bold' : 'hover:bg-slate-100'}`}
              >
                <span>Campus Infrastructure &amp; Life</span>
              </button>
              <button 
                onClick={() => handleNavClick('placements', 'placements-section')} 
                className={`w-full text-left py-2 px-3 rounded-lg flex items-center justify-between ${activeTab === 'placements' ? 'bg-amber-100/70 text-amber-950 font-bold' : 'hover:bg-slate-100'}`}
              >
                <span>Placements &amp; Articleships</span>
              </button>
              <button 
                onClick={() => handleNavClick('contact', 'contact-section')} 
                className={`w-full text-left py-2 px-3 rounded-lg flex items-center justify-between ${activeTab === 'contact' ? 'bg-amber-100/70 text-amber-950 font-bold' : 'hover:bg-slate-100'}`}
              >
                <span>Contact &amp; Campus Visit</span>
              </button>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAIChatbot();
                }} 
                className="w-full text-left py-2 px-3 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-950 font-bold flex items-center justify-between border border-amber-200 mt-2"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Ask AI Course Advisor</span>
                </span>
                <span className="text-[10px] bg-amber-500 text-slate-950 px-2 py-0.5 rounded font-black">24/7 AI</span>
              </button>
            </div>

            <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBrochure();
                }}
                className="w-full py-2.5 px-3 rounded-lg text-xs font-semibold bg-slate-100 text-slate-800 text-center flex items-center justify-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Get Prospectus</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenApply();
                }}
                className="w-full py-2.5 px-3 rounded-lg text-xs font-bold bg-amber-500 text-slate-950 text-center flex items-center justify-center gap-1.5"
              >
                <span>Admission Enquiry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
