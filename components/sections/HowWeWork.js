'use client';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function HowWeWork({ dict, lang }) {
  const steps = dict.how.steps;
  
  return (
    <section className="py-12 bg-slate-50">
      <div className="container max-w-4xl">
        <div className="mb-8">
          <h2 className="text-2xl font-black text-slate-900 mb-1" style={{ fontFamily: 'Verdana, Geneva, sans-serif' }}>
            {dict.how.title}
          </h2>
          <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
        </div>

        <div className="space-y-4 mb-12">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4 items-start">
              <CheckCircle2 size={20} className="text-blue-600 mt-1 shrink-0" />
              <p className="text-slate-700 text-sm md:text-base leading-relaxed font-bold">
                {step}
              </p>
            </div>
          ))}
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 flex items-center gap-4">
          <AlertCircle size={24} className="text-red-500 shrink-0" />
          <p className="text-slate-600 text-[11px] md:text-[13px] leading-relaxed">
            {dict.how.complaints}
          </p>
        </div>
      </div>
    </section>
  );
}
