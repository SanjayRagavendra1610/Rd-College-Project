import React, { useState } from 'react';
import { Course } from '../types';
import { 
  X, 
  BookOpen, 
  Award, 
  Calendar, 
  GraduationCap, 
  CheckCircle2, 
  Briefcase, 
  Download, 
  ArrowRight, 
  Building2, 
  Code2, 
  FileText, 
  ShieldCheck, 
  TrendingUp,
  Clock,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CourseDetailModalProps {
  course: Course | null;
  onClose: () => void;
  onApply: (courseId: string) => void;
  onAskAI?: (prompt: string) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  onClose,
  onApply,
  onAskAI
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'professional' | 'careers' | 'eligibility'>('overview');
  const [selectedSemester, setSelectedSemester] = useState<number>(1);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  if (!course) return null;

  const handleDownloadSyllabus = () => {
    setDownloadingPdf(true);
    setTimeout(() => {
      setDownloadingPdf(false);
      const blob = new Blob([
        `RD COLLEGE OF COMMERCE AND PROFESSIONAL STUDIES (RDCCPS), ERODE\n` +
        `Affiliated with Bharathiar University, Coimbatore\n\n` +
        `OFFICIAL SYLLABUS & INTEGRATED CURRICULUM SPECIFICATION\n` +
        `Course: ${course.name} (${course.code})\n` +
        `Certification: ${course.integratedCertification}\n` +
        `Duration: ${course.duration} | Mode: ${course.mode}\n\n` +
        `OVERVIEW:\n${course.description}\n\n` +
        `ELIGIBILITY:\n${course.eligibility} (Min: ${course.minimumMarks})\n\n` +
        `SEMESTER WISE BREAKDOWN:\n` +
        course.semesters.map(s => `\n${s.title} [Milestone: ${s.professionalMilestone || 'N/A'}]\n` + s.subjects.map(sub => `  - [${sub.code}] ${sub.name} (${sub.type}, ${sub.credits} Credits)`).join('\n')).join('\n\n') +
        `\n\nCAREER PROSPECTS:\n` +
        course.careerOpportunities.map(c => `- ${c.role} (${c.averagePackage}): Top Recruiters: ${c.topCompanies.join(', ')}`).join('\n') +
        `\n\nADMISSIONS HELPDESK:\nPhone: +91 97885 56999 | Email: helpdesk@rdccps.com | Website: rdccps.org`
      ], { type: 'text/plain;charset=utf-8' });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `RDCCPS_${course.shortName.replace(/[^a-zA-Z0-9]/g, '_')}_Syllabus.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 600);
  };

  return (
    <div id="course-detail-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        id="course-detail-modal-content"
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className={`p-6 sm:p-8 bg-gradient-to-r ${course.colorTheme.primary} text-white relative flex-shrink-0 overflow-hidden`}>
          {/* Background image ambient layer */}
          {course.imageUrl && (
            <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-luminosity">
              <img
                src={course.imageUrl}
                alt=""
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/60 to-transparent pointer-events-none" />

          <button
            id="modal-close-btn"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer z-10"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative z-10 flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 flex items-center gap-1 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{course.integratedCertification}</span>
            </span>
            <span className="text-xs font-mono text-amber-200 bg-black/40 px-2.5 py-0.5 rounded border border-amber-400/20">
              {course.code}
            </span>
            <span className="text-xs text-slate-300">
              {course.affiliation}
            </span>
          </div>

          <h2 className="relative z-10 text-2xl sm:text-3xl font-extrabold text-white leading-tight">
            {course.name}
          </h2>
          <p className="relative z-10 text-sm text-slate-200 mt-1 font-medium">
            {course.tagline}
          </p>

          {/* Quick specs pill row */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-4 border-t border-white/15 text-xs">
            <div>
              <span className="text-slate-300 block text-[11px]">Duration:</span>
              <strong className="text-white">{course.duration}</strong>
            </div>
            <div>
              <span className="text-slate-300 block text-[11px]">Total Semesters:</span>
              <strong className="text-white">{course.totalSemesters} Semesters</strong>
            </div>
            <div>
              <span className="text-slate-300 block text-[11px]">Degree Awarded:</span>
              <strong className="text-white">B.Com Degree</strong>
            </div>
            <div>
              <span className="text-slate-300 block text-[11px]">Seats Intake:</span>
              <strong className="text-white">{course.seatsIntake} Candidates</strong>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-200 bg-slate-50 overflow-x-auto no-scrollbar flex-shrink-0">
          <button
            id="tab-overview"
            onClick={() => setActiveTab('overview')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Overview & Advantages
          </button>
          <button
            id="tab-curriculum"
            onClick={() => setActiveTab('curriculum')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'curriculum'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            6-Semester Syllabus
          </button>
          <button
            id="tab-professional"
            onClick={() => setActiveTab('professional')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'professional'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Professional Body Roadmap
          </button>
          <button
            id="tab-careers"
            onClick={() => setActiveTab('careers')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'careers'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Careers & Placements
          </button>
          <button
            id="tab-eligibility"
            onClick={() => setActiveTab('eligibility')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'eligibility'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Eligibility & Fees
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {course.imageUrl && (
                <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200 group">
                  <div className="h-56 sm:h-64 w-full bg-slate-950 overflow-hidden">
                    <img
                      src={course.imageUrl}
                      alt={course.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex items-end p-5">
                    <div className="text-white space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-black/50 px-2.5 py-1 rounded backdrop-blur-xs">
                        {course.integratedCertification} Track
                      </span>
                      <h4 className="text-lg sm:text-xl font-extrabold text-white">
                        Classroom & Practical Training at RDCCPS Campus
                      </h4>
                      <p className="text-xs text-slate-200">
                        Synchronized Bharathiar University syllabus and professional accounting coaching.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">Program Summary</h4>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  {course.description}
                </p>
              </div>

              {/* Key Highlights */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80">
                <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Key Academic Highlights</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.keyHighlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dual Advantage Section */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>The RDCCPS Dual Advantage</span>
                </h4>
                <div className="space-y-2.5">
                  {course.dualAdvantagePoints.map((point, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-xs sm:text-sm text-blue-950 flex items-start gap-2.5">
                      <span className="font-bold text-blue-700">0{idx + 1}.</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practical Labs & Tech Stack */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2.5">Computer Lab Practical Modules</h4>
                <div className="flex flex-wrap gap-2">
                  {course.toolsAndCertifications.map((tool, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 6-SEMESTER CURRICULUM */}
          {activeTab === 'curriculum' && (
            <div className="space-y-6">
              {/* Semester Selector Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {course.semesters.map((sem) => (
                  <button
                    key={sem.semesterNumber}
                    onClick={() => setSelectedSemester(sem.semesterNumber)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedSemester === sem.semesterNumber
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Semester {sem.semesterNumber}
                  </button>
                ))}
              </div>

              {/* Active Semester Table */}
              {(() => {
                const curSem = course.semesters.find(s => s.semesterNumber === selectedSemester) || course.semesters[0];
                return (
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200">
                      <div>
                        <h4 className="text-base font-extrabold text-slate-900">{curSem.title}</h4>
                        {curSem.professionalMilestone && (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded mt-1">
                            <Sparkles className="w-3 h-3" />
                            Target Milestone: {curSem.professionalMilestone}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-500 font-semibold">
                        Total Subjects: {curSem.subjects.length}
                      </span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                            <th className="pb-2">Code</th>
                            <th className="pb-2">Course Name</th>
                            <th className="pb-2">Category</th>
                            <th className="pb-2 text-right">Credits</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200/70">
                          {curSem.subjects.map((sub, i) => (
                            <tr key={i} className="hover:bg-white/60 transition-colors">
                              <td className="py-2.5 font-mono font-bold text-slate-800">{sub.code}</td>
                              <td className="py-2.5 font-medium text-slate-900">{sub.name}</td>
                              <td className="py-2.5">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  sub.type === 'Core' ? 'bg-blue-100 text-blue-800' :
                                  sub.type === 'Professional' ? 'bg-amber-100 text-amber-900' :
                                  sub.type === 'Practical Lab' ? 'bg-emerald-100 text-emerald-800' :
                                  'bg-slate-200 text-slate-700'
                                }`}>
                                  {sub.type}
                                </span>
                              </td>
                              <td className="py-2.5 text-right font-bold text-slate-700">{sub.credits}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })()}

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-700" />
                  <span>Download the official complete 6-semester course specification & syllabus handbook.</span>
                </div>
                <button
                  onClick={handleDownloadSyllabus}
                  disabled={downloadingPdf}
                  className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs whitespace-nowrap cursor-pointer transition-colors"
                >
                  {downloadingPdf ? 'Generating...' : 'Download Syllabus'}
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: PROFESSIONAL BODY ROADMAP */}
          {activeTab === 'professional' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-indigo-950 text-white">
                <h4 className="text-base font-extrabold text-amber-400 mb-1">
                  Synchronized Professional Body Milestone Chart
                </h4>
                <p className="text-xs text-slate-300">
                  How RDCCPS integrates ICAI, ACCA, or ICMAI coaching alongside your Bharathiar University degree.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center">1</span>
                    <h5 className="text-sm font-bold text-slate-900">Year 1 (Semesters 1 & 2): Foundation Level Clearances</h5>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-8">
                    Complete basic accounting standards, mercantile law, and quantitative aptitude. Undergo weekly test series and appear for official Foundation examinations.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 font-bold text-xs flex items-center justify-center">2</span>
                    <h5 className="text-sm font-bold text-slate-900">Year 2 (Semesters 3 & 4): Intermediate Level Mastery</h5>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-8">
                    In-depth training for Corporate Law, Direct & Indirect Taxes (GST), Advanced Costing, and Ind AS. Appear for Group 1 / Applied Skills milestone papers.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">3</span>
                    <h5 className="text-sm font-bold text-slate-900">Year 3 (Semesters 5 & 6): Group 2 & Articleship Launch</h5>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-8">
                    Strategic Financial Management, Auditing & Ethics, Big 4 placement interview bootcamps, and direct articleship recruitment assistance.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CAREERS & PLACEMENTS */}
          {activeTab === 'careers' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {course.careerOpportunities.map((career, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block mb-1">Career Profile {i + 1}</span>
                      <h5 className="text-sm font-bold text-slate-900">{career.role}</h5>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{career.description}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-200 space-y-2">
                      <div className="text-xs font-extrabold text-emerald-800 bg-emerald-50 px-2 py-1 rounded border border-emerald-200 text-center">
                        Avg. Salary: {career.averagePackage}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        <span className="font-semibold block text-slate-700">Top Hiring Firms:</span>
                        {career.topCompanies.join(', ')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: ELIGIBILITY & FEES */}
          {activeTab === 'eligibility' && (
            <div className="space-y-5">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-sm font-bold text-slate-900">Minimum Academic Eligibility</h4>
                <p className="text-xs sm:text-sm text-slate-700">{course.eligibility}</p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-900 text-xs font-semibold border border-blue-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />
                  <span>Minimum qualifying marks: {course.minimumMarks}</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
                <h4 className="text-sm font-bold text-amber-950 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>RDCCPS Merit Scholarships</span>
                </h4>
                <p className="text-xs text-amber-900 leading-relaxed">
                  Special fee concessions are awarded to students scoring above 85% and 90% in 12th Standard examinations. Transport and hostel fee concessions are also available for deserving candidates.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 sm:p-6 bg-slate-100 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleDownloadSyllabus}
              disabled={downloadingPdf}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-600" />
              <span>{downloadingPdf ? 'Preparing File...' : 'Syllabus PDF'}</span>
            </button>

            {onAskAI && (
              <button
                onClick={() => {
                  onClose();
                  onAskAI(`Tell me more about career packages, exam difficulty, and advantages of ${course.name} (${course.code}) at RDCCPS.`);
                }}
                className="flex-1 sm:flex-initial px-3.5 py-2.5 rounded-xl text-xs font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Ask AI Advisor</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Close
            </button>
            <button
              id="modal-apply-btn"
              onClick={() => {
                onClose();
                onApply(course.id);
              }}
              className="w-1/2 sm:w-auto px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
            >
              <span>Apply for {course.shortName}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
