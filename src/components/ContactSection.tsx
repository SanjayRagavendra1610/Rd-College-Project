import React, { useState } from 'react';
import { RDCCPS_CORE_PROFILE } from '../data/rdccpsFullData';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  Calendar, 
  User, 
  MessageSquare,
  Building2,
  Navigation
} from 'lucide-react';
import { motion } from 'motion/react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredDate: '',
    interest: 'B.Com with CA',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setIsSubmitted(true);
  };

  const mainCampus = RDCCPS_CORE_PROFILE.campusAddresses[0];
  const cbeCenter = RDCCPS_CORE_PROFILE.campusAddresses[1];

  return (
    <section id="contact-section" className="py-16 sm:py-24 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 text-amber-900 text-xs font-bold border border-amber-200">
            <MapPin className="w-3.5 h-3.5 text-amber-800" />
            <span>Connect &amp; Visit Campus</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-serif">
            Get in Touch with RDCCPS Admissions Team
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Visit our serene campus in Vijayamangalam, Perundurai (Erode) or contact our admissions desk for 1:1 guidance on CA, ACCA, and CMA commerce degree programs.
          </p>
        </div>

        {/* Contact Information & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Campus Addresses & Helplines (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Main Campus Card */}
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-serif">{mainCampus.campusName}</h3>
                  <span className="text-xs text-amber-700 font-semibold">Main Academic Headquarters</span>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-600 mt-1 shrink-0" />
                  <span className="leading-relaxed">{mainCampus.address}</span>
                </div>

                <div className="flex items-start gap-3">
                  <Navigation className="w-4 h-4 text-blue-600 mt-1 shrink-0" />
                  <span className="text-slate-500 text-xs">Landmark: {mainCampus.landmark}</span>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                  <div className="space-y-0.5">
                    {mainCampus.phones.map((phone, pIdx) => (
                      <a 
                        key={pIdx} 
                        href={`tel:${phone.replace(/\s/g, '')}`} 
                        className="block font-semibold text-slate-900 hover:text-amber-600 transition-colors"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-indigo-600 shrink-0" />
                  <a href={`mailto:${mainCampus.email}`} className="text-slate-900 font-semibold hover:text-amber-600 transition-colors">
                    {mainCampus.email}
                  </a>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-slate-200/60 text-xs text-slate-500">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{RDCCPS_CORE_PROFILE.workingHours}</span>
                </div>
              </div>
            </div>

            {/* Coimbatore Center Card */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
              <h4 className="text-sm font-bold text-slate-900 font-serif flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500" />
                {cbeCenter.campusName}
              </h4>
              <p className="text-xs text-slate-600">{cbeCenter.address}</p>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-800 pt-1">
                <span>{cbeCenter.phones[0]}</span>
                <span className="text-slate-500">{cbeCenter.email}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Schedule Campus Visit / Counseling Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Fast Response</span>
              <h3 className="text-2xl font-bold font-serif text-slate-900">
                Book a Campus Tour &amp; Faculty Counseling Session
              </h3>
              <p className="text-xs text-slate-600">
                Meet our senior Chartered Accountant faculty members, inspect our smart classrooms, and explore the campus firsthand.
              </p>
            </div>

            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-3"
              >
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-emerald-950 font-serif">Campus Visit Request Confirmed!</h4>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Our admissions counseling officer will call you at <strong>{formData.phone}</strong> to confirm your appointment time and provide transit assistance.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: '',
                      phone: '',
                      email: '',
                      preferredDate: '',
                      interest: 'B.Com with CA',
                      message: ''
                    });
                  }}
                  className="mt-2 text-xs font-bold text-emerald-900 underline hover:text-emerald-700 cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Student / Parent Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sanjay Kumar"
                        className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Mobile / WhatsApp Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Email Address (Optional)</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sanjay@example.com"
                        className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Program of Interest</label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                    >
                      <option value="B.Com with CA">B.Com with CA (Chartered Accountancy)</option>
                      <option value="B.Com PA with CA">B.Com Professional Accounting with CA</option>
                      <option value="B.Com Finance with ACCA">B.Com Finance with ACCA (UK)</option>
                      <option value="B.Com Accounting & Finance with CA">B.Com Accounting &amp; Finance with CA</option>
                      <option value="B.Com Banking & Finance with CMA">B.Com Banking &amp; Finance with CMA</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Specific Query / Preferred Visit Date</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Let us know when you plan to visit or any specific questions about CA coaching, hostel, or transport..."
                    className="w-full p-3 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-slate-950 text-white font-extrabold text-xs hover:bg-slate-900 transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5 text-amber-400" />
                  <span>Request Visit &amp; Free Counseling Call</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
