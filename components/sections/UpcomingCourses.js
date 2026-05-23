'use client';
import { Calendar, BadgeCheck, Phone } from 'lucide-react';

import { UPCOMING_COURSES } from '@/lib/data';
import { trackPhoneClick } from '@/lib/analytics';
import { CONTACT_INFO } from '@/lib/constants/contact';

export default function UpcomingCourses({ dict, lang }) {
  const courses = UPCOMING_COURSES;

  return (
    <section className="py-12 bg-white border-b border-slate-100">
      <div className="container max-w-4xl px-6 text-center">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={20} className="text-blue-600" />
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-wider" style={{ fontFamily: 'Verdana, Geneva, sans-serif' }}>
              {dict.upcoming.title}
            </h2>
          </div>
        </div>

        {/* Vertical Simple List - Using data from lib/data.js */}
        <div className="space-y-4 mb-10">
          {courses.map((course, i) => (
            <p 
              key={i}
              className="text-sm md:text-lg font-bold text-slate-800"
              style={{ fontFamily: 'Verdana, Geneva, sans-serif' }}
            >
              {course.name[lang] || course.name.pl} - <span className="text-blue-600">{course.date}</span>
            </p>
          ))}
        </div>

        {/* Enrollment Info */}
        <div className="flex flex-col items-center gap-6">
          <a 
            href={`tel:${CONTACT_INFO.phoneFull}`}
            onClick={() => trackPhoneClick('upcoming_courses')}
            className="flex items-center gap-2 text-xl md:text-2xl font-black text-slate-900 hover:text-blue-600 transition-colors"
            style={{ fontFamily: 'Verdana, Geneva, sans-serif' }}
          >
            <Phone size={24} className="text-blue-600" />
            {dict.upcoming.enroll}
          </a>

          <div className="flex items-center justify-center gap-2 text-slate-500 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100 max-w-2xl">
            <BadgeCheck size={18} className="text-emerald-500 shrink-0" />
            <span className="text-[11px] md:text-xs font-medium leading-relaxed">
              {dict.upcoming.eu_funds_desc}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
