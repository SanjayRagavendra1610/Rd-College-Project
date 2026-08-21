import React from 'react';
import { TESTIMONIALS } from '../data/coursesData';
import { Quote, Sparkles, Star, Building2, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export const TestimonialsSection: React.FC = () => {
  const recruiterLogos = [
    "PwC", "Deloitte", "EY", "KPMG", "Grant Thornton", "BDO", "HDFC Bank", "ICICI Bank", "L&T Finance", "Amazon"
  ];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Proven Student Success</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Hear from Our Chartered & Global Finance Aspirants
          </h2>

          <p className="text-xs sm:text-sm text-slate-600">
            Real stories of RDCCPS graduates who cleared CA, ACCA, and CMA milestones while securing top tier corporate positions.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-slate-50 rounded-3xl p-6 sm:p-7 border border-slate-200 flex flex-col justify-between space-y-4 hover:shadow-md transition-all"
            >
              <div className="space-y-3">
                <Quote className="w-8 h-8 text-amber-500/40" />
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 space-y-1">
                <h4 className="text-sm font-extrabold text-slate-900">{t.name}</h4>
                <p className="text-xs font-semibold text-amber-800">{t.course}</p>
                <div className="flex items-center gap-1 text-[11px] text-slate-500">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                  <span>{t.company}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recruiter Trust Strip */}
        <div className="mt-14 pt-8 border-t border-slate-200 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-6">
            Our Students & Articleship Trainees are Recruited By Leading Firms
          </span>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            {recruiterLogos.map((rec, i) => (
              <span key={i} className="px-4 py-2 rounded-xl bg-slate-100/80 border border-slate-200 text-xs font-bold text-slate-700">
                {rec}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
