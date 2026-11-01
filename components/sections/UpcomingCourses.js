'use client';
import { useEffect, useState } from 'react';
import { Calendar, BadgeCheck, Phone } from 'lucide-react';
import { courseMessages, fetchWebsiteCourses, getWebsiteCourseText } from '@/lib/websiteCourses.mjs';
import { websiteCoursesConfig } from '@/lib/websiteCoursesConfig.mjs';
import { trackPhoneClick } from '@/lib/analytics';
import { CONTACT_INFO } from '@/lib/constants/contact';

export default function UpcomingCourses({ dict, lang }) {
  const [state, setState] = useState({ status: 'loading', courses: [] });
  const [attempt, setAttempt] = useState(0);
  const messages = courseMessages[lang] || courseMessages.pl;

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    const timeout = setTimeout(() => controller.abort(), 10000);
    fetchWebsiteCourses(websiteCoursesConfig, { signal: controller.signal })
      .then(courses => { if (active) setState({ status: 'ready', courses }); })
      .catch(() => { if (active) setState({ status: 'error', courses: [] }); })
      .finally(() => clearTimeout(timeout));
    return () => { active = false; clearTimeout(timeout); controller.abort(); };
  }, [attempt]);

  return (
    <section className="py-12 bg-white border-b border-slate-100">
      <div className="container max-w-4xl px-6 text-center">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={20} className="text-blue-600" />
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-wider">{dict.upcoming.title}</h2>
          </div>
        </div>
        <div aria-live="polite" aria-busy={state.status === 'loading'} className="min-h-24 mb-10">
          {state.status === 'loading' ? <p role="status" className="text-slate-600">{messages.loading}</p> : state.status === 'error' ? (
            <div><p className="text-slate-600">{messages.error}</p><button type="button" className="min-h-11 px-4 text-blue-700 underline" onClick={() => { setState({ status: 'loading', courses: [] }); setAttempt(value => value + 1); }}>{messages.retry}</button></div>
          ) : state.courses.length > 0 ? (
            <ul className="space-y-4 list-none">
              {state.courses.map(course => {
                const text = getWebsiteCourseText(course, lang);
                return <li key={course.id} className="text-sm md:text-lg font-bold text-slate-800">{text.name} - <span className="text-blue-600">{text.date}</span></li>;
              })}
            </ul>
          ) : <p className="text-sm md:text-base text-slate-600 max-w-xl mx-auto">{dict.upcoming.no_courses}</p>}
        </div>
        <div className="flex flex-col items-center gap-6">
          <a href={`tel:${CONTACT_INFO.phoneFull}`} onClick={() => trackPhoneClick('upcoming_courses')} className="flex items-center justify-center gap-2 text-xl md:text-2xl font-black text-slate-900 hover:text-blue-600 transition-colors">
            <Phone size={24} className="text-blue-600" />{dict.upcoming.enroll}
          </a>
          <div className="flex items-center justify-center gap-2 text-slate-500 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100 max-w-2xl">
            <BadgeCheck size={18} className="text-emerald-500 shrink-0" />
            <span className="text-[11px] md:text-xs font-medium leading-relaxed">{dict.upcoming.eu_funds_desc}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
