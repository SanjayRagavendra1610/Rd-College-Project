import React, { useState, useMemo } from 'react';
import { COURSES_DATA, RDCCPS_INFO } from './data/coursesData';
import { Course, CertificationType } from './types';
import { Navbar } from './components/Navbar';
import { AdmissionsTicker } from './components/AdmissionsTicker';
import { HeroSection } from './components/HeroSection';
import { CourseFilters } from './components/CourseFilters';
import { CourseCard } from './components/CourseCard';
import { CourseDetailModal } from './components/CourseDetailModal';
import { CourseCompareDrawer } from './components/CourseCompareDrawer';
import { DualPathTimeline } from './components/DualPathTimeline';
import { CareerCompass } from './components/CareerCompass';
import { CurriculumRoadmap } from './components/CurriculumRoadmap';
import { AcademicFacilities } from './components/AcademicFacilities';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { AdmissionModal } from './components/AdmissionModal';
import { BrochureModal } from './components/BrochureModal';
import { AICourseChatbot } from './components/AICourseChatbot';
import { Footer } from './components/Footer';
import { 
  Phone, 
  MessageSquare, 
  Sparkles, 
  ArrowUp, 
  FileText,
  GraduationCap,
  Scale
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<CertificationType>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'detailed'>('grid');

  // Modals & Drawers State
  const [selectedCourseForDetail, setSelectedCourseForDetail] = useState<Course | null>(null);
  const [comparedCourses, setComparedCourses] = useState<Course[]>([]);
  const [isCompareDrawerOpen, setIsCompareDrawerOpen] = useState(false);
  const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState(false);
  const [admissionCourseId, setAdmissionCourseId] = useState<string>(COURSES_DATA[0].id);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [isAIChatbotOpen, setIsAIChatbotOpen] = useState(false);
  const [aiChatbotInitialQuery, setAiChatbotInitialQuery] = useState('');

  // Filtered Courses
  const filteredCourses = useMemo(() => {
    return COURSES_DATA.filter((course) => {
      const matchesCategory = selectedCategory === 'ALL' || course.certificationType === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const nameMatch = course.name.toLowerCase().includes(q) || course.shortName.toLowerCase().includes(q);
      const tagMatch = course.tagline.toLowerCase().includes(q);
      const descMatch = course.description.toLowerCase().includes(q);
      const toolMatch = course.toolsAndCertifications.some(t => t.toLowerCase().includes(q));
      const careerMatch = course.careerOpportunities.some(c => c.role.toLowerCase().includes(q));
      const subjectMatch = course.semesters.some(s => s.subjects.some(sub => sub.name.toLowerCase().includes(q)));

      return nameMatch || tagMatch || descMatch || toolMatch || careerMatch || subjectMatch;
    });
  }, [selectedCategory, searchQuery]);

  // Compare Toggle
  const handleToggleCompare = (course: Course) => {
    if (comparedCourses.some(c => c.id === course.id)) {
      setComparedCourses(prev => prev.filter(c => c.id !== course.id));
    } else {
      if (comparedCourses.length >= 3) {
        // Replace first if limit reached
        setComparedCourses(prev => [...prev.slice(1), course]);
      } else {
        setComparedCourses(prev => [...prev, course]);
      }
      setIsCompareDrawerOpen(true);
    }
  };

  const handleOpenApply = (courseId?: string) => {
    if (courseId) {
      setAdmissionCourseId(courseId);
    }
    setIsAdmissionModalOpen(true);
  };

  const handleSelectCourseById = (courseId: string) => {
    const found = COURSES_DATA.find(c => c.id === courseId);
    if (found) {
      setSelectedCourseForDetail(found);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-amber-500 selection:text-white">
      {/* Navigation */}
      <Navbar
        compareCount={comparedCourses.length}
        onOpenCompare={() => setIsCompareDrawerOpen(true)}
        onOpenApply={() => handleOpenApply()}
        onOpenBrochure={() => setIsBrochureModalOpen(true)}
        onOpenAIChatbot={() => {
          setAiChatbotInitialQuery('');
          setIsAIChatbotOpen(true);
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Live Admissions & Affiliation Ticker Marquee */}
      <AdmissionsTicker 
        onOpenApply={() => handleOpenApply()} 
        onOpenBrochure={() => setIsBrochureModalOpen(true)} 
      />

      {/* Hero Section */}
      <HeroSection
        onSelectCategory={setSelectedCategory}
        onOpenApply={() => handleOpenApply()}
        onOpenAIChatbot={() => {
          setAiChatbotInitialQuery('');
          setIsAIChatbotOpen(true);
        }}
        onOpenCompass={() => {
          const el = document.getElementById('career-compass-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenBrochure={() => setIsBrochureModalOpen(true)}
      />

      {/* Main Courses Grid Section */}
      <main id="courses-grid-section" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
            <GraduationCap className="w-3.5 h-3.5 text-amber-700" />
            <span>Undergraduate Programs with Integrated Coaching</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Flagship Courses Offered at RDCCPS
          </h2>

          <p className="text-xs sm:text-sm text-slate-600">
            Choose from 5 specialized B.Com pathways affiliated with Bharathiar University, each with integrated professional coaching for Chartered Accountancy (CA), ACCA (UK), or Cost & Management Accountancy (CMA).
          </p>
        </div>

        {/* Filter Bar */}
        <CourseFilters
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          totalCoursesCount={COURSES_DATA.length}
          filteredCount={filteredCourses.length}
        />

        {/* Courses Cards Grid / List */}
        {filteredCourses.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-4">
            <GraduationCap className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No matching commerce courses found</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              We couldn't find any courses matching "{searchQuery}". Try searching for terms like "CA", "ACCA", "Taxation", "Banking", or "Tally".
            </p>
            <button
              onClick={() => {
                setSelectedCategory('ALL');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 cursor-pointer transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                viewMode={viewMode}
                isCompared={comparedCourses.some(c => c.id === course.id)}
                onToggleCompare={handleToggleCompare}
                onSelectCourse={(c) => setSelectedCourseForDetail(c)}
                onApplyCourse={(id) => handleOpenApply(id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* The Dual Path Advantage */}
      <DualPathTimeline
        onExploreCourses={() => {
          const el = document.getElementById('courses-grid-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Course Recommendation Wizard */}
      <CareerCompass
        onSelectCourse={(course) => setSelectedCourseForDetail(course)}
        onApplyCourse={(id) => handleOpenApply(id)}
      />

      {/* 3-Year Milestone Curriculum Roadmap */}
      <CurriculumRoadmap />

      {/* Campus & Facilities Showcase */}
      <AcademicFacilities />

      {/* Student Testimonials & Big 4 Recruiters */}
      <TestimonialsSection />

      {/* Frequently Asked Questions */}
      <FAQSection />

      {/* Footer */}
      <Footer
        onSelectCourseById={handleSelectCourseById}
        onOpenApply={() => handleOpenApply()}
        onOpenBrochure={() => setIsBrochureModalOpen(true)}
      />

      {/* Modals & Drawers */}
      <AnimatePresence>
        {selectedCourseForDetail && (
          <CourseDetailModal
            course={selectedCourseForDetail}
            onClose={() => setSelectedCourseForDetail(null)}
            onApply={(id) => handleOpenApply(id)}
            onAskAI={(prompt) => {
              setAiChatbotInitialQuery(prompt);
              setIsAIChatbotOpen(true);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCompareDrawerOpen && (
          <CourseCompareDrawer
            comparedCourses={comparedCourses}
            allCourses={COURSES_DATA}
            onRemoveCourse={(id) => setComparedCourses(prev => prev.filter(c => c.id !== id))}
            onAddCourse={(c) => {
              if (comparedCourses.length < 3 && !comparedCourses.some(item => item.id === c.id)) {
                setComparedCourses(prev => [...prev, c]);
              }
            }}
            onClearAll={() => setComparedCourses([])}
            onClose={() => setIsCompareDrawerOpen(false)}
            onApply={(id) => {
              setIsCompareDrawerOpen(false);
              handleOpenApply(id);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAdmissionModalOpen && (
          <AdmissionModal
            isOpen={isAdmissionModalOpen}
            onClose={() => setIsAdmissionModalOpen(false)}
            initialCourseId={admissionCourseId}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isBrochureModalOpen && (
          <BrochureModal
            isOpen={isBrochureModalOpen}
            onClose={() => setIsBrochureModalOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* 24/7 AI Course Advisor Chatbot */}
      <AICourseChatbot
        isOpen={isAIChatbotOpen}
        onClose={() => setIsAIChatbotOpen(false)}
        onOpen={() => {
          setAiChatbotInitialQuery('');
          setIsAIChatbotOpen(true);
        }}
        onSelectCourse={(course) => setSelectedCourseForDetail(course)}
        onApplyCourse={(id) => handleOpenApply(id)}
        initialQuery={aiChatbotInitialQuery}
      />

      {/* Floating Compare Badge */}
      {comparedCourses.length > 0 && !isCompareDrawerOpen && (
        <div className="fixed bottom-6 left-6 z-30">
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCompareDrawerOpen(true)}
            className="px-4 py-3 rounded-full bg-slate-900 text-white font-bold text-xs shadow-2xl border border-amber-500/50 flex items-center gap-2 hover:bg-slate-800 transition-all cursor-pointer backdrop-blur-md"
          >
            <Scale className="w-4 h-4 text-amber-400" />
            <span>Compare ({comparedCourses.length} Courses)</span>
          </motion.button>
        </div>
      )}
    </div>
  );
}
