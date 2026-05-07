import { getDictionary } from "../../i18n";
import { DETAILED_SERVICES } from "@/lib/data";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";

export const metadata = {
  title: "All UDT Training Courses | Forklifts, Platforms, Cranes — DTMS Krosno",
  description: "Complete UDT certification offer: forklifts cat. I & II WJO, mobile platforms, overhead cranes, HDS cranes, gas cylinder filling and more. State UDT exams in Krosno.",
  alternates: {
    canonical: '/en/uslugi',
    languages: { 'pl-PL': '/pl/uslugi', 'en-US': '/en/uslugi', 'uk-UA': '/ua/uslugi' },
  },
  openGraph: {
    title: "All UDT Training Courses — DTMS Krosno",
    description: "17 types of technical certification courses ending with a UDT state exam.",
    url: 'https://szkoleniadtms.pl/en/uslugi',
    images: [{ url: '/obrazy/wozek2.jpg', width: 1200, height: 630, alt: 'UDT Training DTMS Krosno' }],
    locale: 'en_US',
    type: 'website',
  },
};

export default async function ServicesPage({ params }) {
  const lang = 'en';
  const dict = getDictionary(lang);

  return (
    <div className="pt-24 pb-24 bg-slate-50">
      <div className="container px-4">
        <h1 className="sr-only">All UDT Training Courses — Forklifts, Platforms, Cranes, Hoists — DTMS Krosno</h1>

        {/* Services List - Alternating Layout */}
        <div className="space-y-12 md:space-y-24 max-w-7xl mx-auto">
          {DETAILED_SERVICES.map((s, i) => (
            <div 
              key={i} 
              id={s.id}
              className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}
            >
              {/* Image Section */}
              <div className="w-full lg:w-1/2 group">
                <div className="relative h-[300px] md:h-[450px] w-full rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                  <Image 
                    src={s.img} 
                    alt={s.title[lang] || s.title.pl} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Text Content Section */}
              <div className="w-full lg:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 leading-tight whitespace-pre-line" style={{ fontFamily: 'Verdana, Geneva, sans-serif' }}>
                  {s.title[lang] || s.title.pl}
                </h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
                  {s.desc[lang] || s.desc.pl}
                </p>
                
                {/* Exam Badge */}
                <div className="inline-flex items-center gap-4 p-5 bg-slate-100 rounded-2xl border border-slate-200">
                  <div className="bg-emerald-500 p-2 rounded-full text-white shadow-lg shadow-emerald-200">
                    <BadgeCheck size={24} />
                  </div>
                  <p className="text-base font-bold text-slate-800">
                    {s.exam[lang] || s.exam.pl}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
