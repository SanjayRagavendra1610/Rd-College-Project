import React, { useState, useEffect } from 'react';
import { COURSES_DATA, RDCCPS_INFO } from '../data/coursesData';
import { AdmissionEnquiry } from '../types';
import { Logo } from './Logo';
import { ConfettiEffect } from './ConfettiEffect';
import { 
  X, 
  CheckCircle2, 
  Send, 
  Sparkles, 
  GraduationCap, 
  Phone, 
  Mail, 
  User, 
  MapPin, 
  Download, 
  Award,
  Building,
  Bus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCourseId?: string;
}

export const AdmissionModal: React.FC<AdmissionModalProps> = ({
  isOpen,
  onClose,
  initialCourseId
}) => {
  const [formData, setFormData] = useState<AdmissionEnquiry>({
    studentName: '',
    email: '',
    phone: '',
    city: '',
    district: 'Erode',
    selectedCourseId: initialCourseId || COURSES_DATA[0].id,
    twelfthMarksPercentage: 85,
    twelfthGroup: 'Commerce with Business Maths',
    hostelRequired: false,
    transportRequired: true,
    queryOrMessage: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedRefId, setGeneratedRefId] = useState('');

  useEffect(() => {
    if (initialCourseId) {
      setFormData(prev => ({ ...prev, selectedCourseId: initialCourseId }));
    }
  }, [initialCourseId]);

  if (!isOpen) return null;

  const calculateScholarship = (percentage: number) => {
    if (percentage >= 95) return { eligible: true, text: "40% Merit Scholarship on Tuition Fee", tier: "Gold" };
    if (percentage >= 90) return { eligible: true, text: "25% Merit Scholarship on Tuition Fee", tier: "Silver" };
    if (percentage >= 80) return { eligible: true, text: "15% Merit Scholarship on Tuition Fee", tier: "Bronze" };
    return { eligible: false, text: "Standard Merit Admission Category", tier: "General" };
  };

  const scholarship = calculateScholarship(formData.twelfthMarksPercentage);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const ref = `RDCCPS-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedRefId(ref);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleDownloadSlip = () => {
    const selectedCourse = COURSES_DATA.find(c => c.id === formData.selectedCourseId) || COURSES_DATA[0];
    const text = 
      `=========================================================\n` +
      `RD COLLEGE OF COMMERCE AND PROFESSIONAL STUDIES (RDCCPS)\n` +
      `Affiliated to Bharathiar University | Erode, Tamil Nadu\n` +
      `=========================================================\n\n` +
      `ONLINE ADMISSION ENQUIRY ACKNOWLEDGEMENT (2026 - 2027)\n` +
      `Application Reference No: ${generatedRefId}\n` +
      `Date of Registration   : ${new Date().toLocaleDateString()}\n\n` +
      `APPLICANT DETAILS:\n` +
      `Name                   : ${formData.studentName}\n` +
      `Phone                  : ${formData.phone}\n` +
      `Email                  : ${formData.email}\n` +
      `City / District        : ${formData.city}, ${formData.district}\n` +
      `+2 Marks (Estimate)    : ${formData.twelfthMarksPercentage}%\n` +
      `+2 Subject Group       : ${formData.twelfthGroup}\n\n` +
      `SELECTED DEGREE PROGRAM:\n` +
      `Program                : ${selectedCourse.name} (${selectedCourse.code})\n` +
      `Dual Certification     : ${selectedCourse.integratedCertification}\n` +
      `Scholarship Eligibility: ${scholarship.text}\n` +
      `Hostel Accommodation   : ${formData.hostelRequired ? 'Requested' : 'Not Required'}\n` +
      `College Transport      : ${formData.transportRequired ? 'Requested' : 'Not Required'}\n\n` +
      `ADMISSIONS COUNSELING HELPDESK:\n` +
      `Campus Address: 6/232 Pulavarpalayam, Uthukuli Road, Vijayamangalam, Perundurai, Erode - 638056\n` +
      `Phone: +91 97885 56999 / 98438 85222 | Email: rdccpscollege@gmail.com\n` +
      `=========================================================\n`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RDCCPS_Admission_Slip_${generatedRefId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleResetModal = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div id="admission-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        id="admission-modal-container"
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white relative flex-shrink-0">
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
              Admissions Open 2026 - 2027
            </span>
            <span className="text-xs text-slate-400">Bharathiar University Affiliated</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            Online Admission & Scholarship Enquiry
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Submit your details for priority counseling, seat reservation, and merit scholarship evaluation.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 relative">
          {submitted ? (
            <div className="text-center py-6 space-y-5 relative">
              <ConfettiEffect />

              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-extrabold text-slate-900">Enquiry Submitted Successfully!</h3>
                <p className="text-xs text-slate-500">
                  Application Reference ID: <strong className="font-mono text-amber-700">{generatedRefId}</strong>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-left space-y-2 text-xs text-amber-950">
                <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Merit Scholarship Evaluation:</span>
                </div>
                <p className="font-semibold">{scholarship.text}</p>
                <p className="text-slate-600 text-[11px]">
                  Our admission counselor will contact you within 24 hours at <strong>{formData.phone}</strong> to guide you through verification and campus visit.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleDownloadSlip}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Download Registration Pass</span>
                </button>
                <button
                  onClick={handleResetModal}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Course Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Select Integrated Degree Program *
                </label>
                <select
                  value={formData.selectedCourseId}
                  onChange={(e) => setFormData({ ...formData, selectedCourseId: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm font-medium text-slate-900 focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all outline-none"
                  required
                >
                  {COURSES_DATA.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name} ({course.integratedCertification})
                    </option>
                  ))}
                </select>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Student Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Vignesh Kumar"
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number (WhatsApp) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="e.g. student@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    City / Town & District *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Perundurai / Erode"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* 12th Marks Slider & Stream */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800">
                    12th Standard Marks (% or Expected)
                  </label>
                  <span className="px-2.5 py-0.5 rounded-lg bg-amber-500 text-slate-950 font-extrabold text-xs">
                    {formData.twelfthMarksPercentage}%
                  </span>
                </div>

                <input
                  type="range"
                  min="50"
                  max="100"
                  value={formData.twelfthMarksPercentage}
                  onChange={(e) => setFormData({ ...formData, twelfthMarksPercentage: Number(e.target.value) })}
                  className="w-full accent-amber-500 cursor-pointer"
                />

                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Scholarship Status: {scholarship.text}</span>
                </div>
              </div>

              {/* Checkboxes for Hostel and Transport */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer text-xs font-semibold text-slate-800">
                  <input
                    type="checkbox"
                    checked={formData.hostelRequired}
                    onChange={(e) => setFormData({ ...formData, hostelRequired: e.target.checked })}
                    className="accent-amber-500 rounded"
                  />
                  <span>Hostel Accommodation</span>
                </label>

                <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer text-xs font-semibold text-slate-800">
                  <input
                    type="checkbox"
                    checked={formData.transportRequired}
                    onChange={(e) => setFormData({ ...formData, transportRequired: e.target.checked })}
                    className="accent-amber-500 rounded"
                  />
                  <span>College Bus Facility</span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl font-extrabold text-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting Application...' : 'Submit Admission Enquiry'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
