import React from 'react';
import { Course } from '../types';
import { 
  Award, 
  BookOpen, 
  GraduationCap, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  Scale, 
  Layers, 
  TrendingUp, 
  ShieldCheck,
  Briefcase,
  FileSpreadsheet
} from 'lucide-react';
import { motion } from 'motion/react';

interface CourseCardProps {
  course: Course;
  isCompared: boolean;
  onToggleCompare: (course: Course) => void;
  onSelectCourse: (course: Course) => void;
  onApplyCourse: (courseId: string) => void;
  viewMode?: 'grid' | 'detailed';
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  isCompared,
  onToggleCompare,
  onSelectCourse,
  onApplyCourse,
  viewMode = 'grid'
}) => {
  const getCertIcon = (type: Course['certificationType']) => {
    switch (type) {
      case 'CA':
        return <Award className="w-4 h-4 text-blue-600" />;
      case 'ACCA':
        return <ShieldCheck className="w-4 h-4 text-emerald-600" />;
      case 'CMA':
        return <TrendingUp className="w-4 h-4 text-amber-600" />;
      default:
        return <Award className="w-4 h-4 text-slate-600" />;
    }
  };

  const getBadgeStyle = (type: Course['certificationType']) => {
    switch (type) {
      case 'CA':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'ACCA':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'CMA':
        return 'bg-amber-50 text-amber-900 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-800 border-slate-200';
    }
  };

  if (viewMode === 'detailed') {
    return (
      <motion.div 
        layout
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        id={`course-card-detailed-${course.id}`}
        className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all p-5 sm:p-6 relative overflow-hidden group"
      >
        {/* Subtle colored accent strip at top */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${course.colorTheme.primary}`} />

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Course Thumbnail Image */}
          {course.imageUrl && (
            <div className="w-full lg:w-56 h-44 lg:h-auto min-h-[160px] rounded-xl overflow-hidden relative flex-shrink-0 bg-slate-900 border border-slate-200 shadow-xs">
              <img
                src={course.imageUrl}
                alt={course.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              <div className="absolute top-2.5 left-2.5">
                <span className="text-[10px] font-mono tracking-wider uppercase text-amber-300 bg-slate-950/80 px-2 py-0.5 rounded border border-amber-400/30 font-bold backdrop-blur-xs">
                  {course.code}
                </span>
              </div>
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-bold text-white">
                <span className="bg-slate-900/90 px-2 py-0.5 rounded text-amber-300 border border-slate-700">{course.duration}</span>
                <span className="bg-blue-600/90 px-2 py-0.5 rounded text-white">{course.seatsIntake} Seats</span>
              </div>
            </div>
          )}

          <div className="flex-1 space-y-3">
            {/* Top metadata tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getBadgeStyle(course.certificationType)}`}>
                {getCertIcon(course.certificationType)}
                <span>{course.integratedCertification}</span>
              </span>
              <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-medium">
                {course.affiliation}
              </span>
            </div>

            {/* Title & Tagline */}
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 group-hover:text-blue-900 transition-colors">
                {course.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                {course.tagline}
              </p>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                <span className="text-[11px] text-slate-400 font-semibold block">Duration</span>
                <span className="text-xs font-bold text-slate-800">{course.duration}</span>
              </div>
              <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                <span className="text-[11px] text-slate-400 font-semibold block">Degree Awarded</span>
                <span className="text-xs font-bold text-slate-800">B.Com (Regular)</span>
              </div>
              <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                <span className="text-[11px] text-slate-400 font-semibold block">Avg. Placement</span>
                <span className="text-xs font-bold text-slate-800">{course.careerOpportunities[0]?.averagePackage || '₹6.5 - 12 LPA'}</span>
              </div>
              <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                <span className="text-[11px] text-slate-400 font-semibold block">Eligibility</span>
                <span className="text-xs font-bold text-slate-800">12th Standard (+2)</span>
              </div>
            </div>

            {/* Tools / Tech Stack */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-xs font-semibold text-slate-500 mr-1">Practical Labs:</span>
              {course.toolsAndCertifications.map((tool, i) => (
                <span key={i} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Action side panel */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch justify-center gap-2.5 lg:min-w-52 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-slate-100 lg:pl-6">
            <button
              id={`card-explore-btn-${course.id}`}
              onClick={() => onSelectCourse(course)}
              className="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Full Syllabus & Modules</span>
            </button>

            <button
              id={`card-apply-btn-${course.id}`}
              onClick={() => onApplyCourse(course.id)}
              className="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>Apply Online</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id={`card-compare-btn-${course.id}`}
              onClick={() => onToggleCompare(course)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                isCompared 
                  ? 'bg-amber-50 text-amber-900 border-amber-300 font-bold' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{isCompared ? '✓ Selected to Compare' : 'Add to Compare'}</span>
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid View
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
      id={`course-card-${course.id}`}
      className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group relative"
    >
      {/* Card Header with Top Realistic Image & Gradient Overlay */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-950">
        {course.imageUrl ? (
          <img
            src={course.imageUrl}
            alt={course.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-r ${course.colorTheme.primary}`} />
        )}
        
        {/* Layered Gradient Overlay for contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-900/30" />

        {/* Top Badges (Integrated certification & course code) */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/95 text-slate-900 shadow-md backdrop-blur-md border border-white/40">
            {getCertIcon(course.certificationType)}
            <span>{course.integratedCertification}</span>
          </span>
          <span className="text-[10px] font-mono tracking-wider uppercase text-amber-300 bg-slate-950/85 px-2 py-0.5 rounded border border-amber-400/40 font-bold backdrop-blur-xs">
            {course.code}
          </span>
        </div>

        {/* Bottom Title & Tagline over image */}
        <div className="absolute bottom-3 left-4 right-4 z-10">
          <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug line-clamp-2 group-hover:text-amber-300 transition-colors drop-shadow-sm">
            {course.name}
          </h3>
          <p className="text-xs text-slate-200 mt-1 line-clamp-1 font-medium drop-shadow-xs">
            {course.tagline}
          </p>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3.5">
          {/* Key Specs Row */}
          <div className="flex items-center justify-between text-xs py-2 px-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-700">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <strong>{course.duration}</strong>
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              <span>{course.totalSemesters} Semesters</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-emerald-700 font-semibold">Regular On-Campus</span>
          </div>

          {/* Description snippet */}
          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
            {course.description}
          </p>

          {/* Highlights Checklist */}
          <div className="space-y-1.5 pt-1">
            {course.keyHighlights.slice(0, 3).map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="line-clamp-1">{highlight}</span>
              </div>
            ))}
          </div>

          {/* Career & Salary highlight */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-slate-600">
              <Briefcase className="w-3.5 h-3.5 text-blue-600" />
              <span className="font-semibold">{course.careerOpportunities[0]?.role.split('/')[0]}</span>
            </div>
            <span className="font-extrabold text-slate-900 bg-amber-50 text-amber-900 px-2.5 py-0.5 rounded-md border border-amber-200/80 shadow-2xs">
              {course.careerOpportunities[0]?.averagePackage}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-3 border-t border-slate-100">
          <div className="grid grid-cols-2 gap-2">
            <motion.button
              whileTap={{ scale: 0.97 }}
              id={`btn-explore-${course.id}`}
              onClick={() => onSelectCourse(course)}
              className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Syllabus & Info</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.97 }}
              id={`btn-apply-${course.id}`}
              onClick={() => onApplyCourse(course.id)}
              className="relative overflow-hidden w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer font-bold"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
          </div>

          {/* Compare toggle */}
          <button
            id={`btn-compare-${course.id}`}
            onClick={() => onToggleCompare(course)}
            className={`w-full py-1.5 px-3 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
              isCompared 
                ? 'bg-amber-50 text-amber-900 border-amber-300 font-bold' 
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Scale className="w-3 h-3" />
            <span>{isCompared ? '✓ Added to Comparison List' : 'Compare with other courses'}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
