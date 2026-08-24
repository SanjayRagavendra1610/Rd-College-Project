import React from 'react';
import { Course } from '../types';
import { 
  X, 
  Scale, 
  Trash2, 
  ArrowRight, 
  CheckCircle2, 
  Award, 
  ShieldCheck, 
  TrendingUp,
  Layers,
  GraduationCap
} from 'lucide-react';
import { motion } from 'motion/react';

interface CourseCompareDrawerProps {
  comparedCourses: Course[];
  allCourses: Course[];
  onRemoveCourse: (id: string) => void;
  onAddCourse: (course: Course) => void;
  onClearAll: () => void;
  onClose: () => void;
  onApply: (courseId: string) => void;
}

export const CourseCompareDrawer: React.FC<CourseCompareDrawerProps> = ({
  comparedCourses,
  allCourses,
  onRemoveCourse,
  onAddCourse,
  onClearAll,
  onClose,
  onApply
}) => {
  const getCertIcon = (type: Course['certificationType']) => {
    switch (type) {
      case 'CA': return <Award className="w-3.5 h-3.5 text-blue-600" />;
      case 'ACCA': return <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />;
      case 'CMA': return <TrendingUp className="w-3.5 h-3.5 text-amber-600" />;
      default: return <Award className="w-3.5 h-3.5 text-slate-600" />;
    }
  };

  return (
    <div id="course-compare-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        id="course-compare-modal-content"
        className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white">Compare Integrated B.Com Programs</h2>
              <p className="text-xs text-slate-400">Evaluate course curriculum, professional milestones, and career packages side-by-side</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {comparedCourses.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-slate-400 hover:text-red-400 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1">
          {comparedCourses.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <Scale className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No courses selected for comparison</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Select 2 or more courses using the "Compare" checkbox on course cards to analyze their professional certifications and subject syllabus.
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-2">
                {allCourses.slice(0, 3).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => onAddCourse(c)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 cursor-pointer"
                  >
                    + Add {c.shortName}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[650px]">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="p-3 w-40 text-slate-400 font-bold uppercase tracking-wider bg-slate-50">Feature</th>
                    {comparedCourses.map((course) => (
                      <th key={course.id} className="p-3 min-w-[200px] align-top bg-white">
                        {course.imageUrl && (
                          <div className="w-full h-24 rounded-lg overflow-hidden mb-2.5 relative bg-slate-900 border border-slate-200">
                            <img
                              src={course.imageUrl}
                              alt={course.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                            <span className="absolute bottom-1.5 left-1.5 text-[9px] font-mono font-bold text-amber-300 bg-slate-950/80 px-1.5 py-0.5 rounded">
                              {course.code}
                            </span>
                          </div>
                        )}
                        <div className="flex items-start justify-between gap-1 mb-2">
                          <span className="font-extrabold text-sm text-slate-900 line-clamp-2">{course.name}</span>
                          <button
                            onClick={() => onRemoveCourse(course.id)}
                            className="text-slate-400 hover:text-red-500 p-1 cursor-pointer"
                            title="Remove from comparison"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                          {getCertIcon(course.certificationType)}
                          {course.integratedCertification}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-3 font-semibold text-slate-700 bg-slate-50">Degree Affiliation</td>
                    {comparedCourses.map((c) => (
                      <td key={c.id} className="p-3 text-slate-800 font-medium">Bharathiar University (3 Yrs)</td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3 font-semibold text-slate-700 bg-slate-50">Professional Body</td>
                    {comparedCourses.map((c) => (
                      <td key={c.id} className="p-3 font-bold text-slate-900">{c.integratedCertification}</td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3 font-semibold text-slate-700 bg-slate-50">Key Career Roles</td>
                    {comparedCourses.map((c) => (
                      <td key={c.id} className="p-3">
                        <span className="font-bold text-slate-800 bg-slate-100 px-2 py-1 rounded border border-slate-200 inline-block text-[11px]">
                          {c.careerOpportunities[0]?.role}
                        </span>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3 font-semibold text-slate-700 bg-slate-50">Core Focus</td>
                    {comparedCourses.map((c) => (
                      <td key={c.id} className="p-3 text-slate-600 leading-relaxed">{c.tagline}</td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3 font-semibold text-slate-700 bg-slate-50">Ideal For</td>
                    {comparedCourses.map((c) => (
                      <td key={c.id} className="p-3 text-slate-700 text-[11px] leading-relaxed">{c.idealFor}</td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3 font-semibold text-slate-700 bg-slate-50">Key Computer Labs</td>
                    {comparedCourses.map((c) => (
                      <td key={c.id} className="p-3">
                        <div className="flex flex-wrap gap-1">
                          {c.toolsAndCertifications.map((t, i) => (
                            <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                              {t}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3 font-semibold text-slate-700 bg-slate-50">Action</td>
                    {comparedCourses.map((c) => (
                      <td key={c.id} className="p-3">
                        <button
                          onClick={() => {
                            onClose();
                            onApply(c.id);
                          }}
                          className="w-full py-2 px-3 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center gap-1 transition-colors cursor-pointer"
                        >
                          <span>Apply Now</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between flex-shrink-0">
          <span className="text-xs text-slate-500">
            {comparedCourses.length} of 5 courses selected
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white cursor-pointer"
          >
            Back to Course Catalog
          </button>
        </div>
      </motion.div>
    </div>
  );
};
