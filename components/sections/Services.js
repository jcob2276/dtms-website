'use client';
import Link from 'next/link';
import Image from 'next/image';
import { DETAILED_SERVICES } from '@/lib/data';

export default function Services({ dict, lang }) {
  const homeServices = DETAILED_SERVICES;

  return (
    <section className="py-12 bg-white" id="oferta">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {homeServices.map((s, i) => (
            <Link 
              key={i} 
              href={`/${lang}/uslugi#${s.id}`} 
              className="relative block h-72 rounded-[2rem] overflow-hidden cursor-pointer group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
              style={{ fontFamily: 'Verdana, Geneva, sans-serif' }}
            >
              <Image 
                src={s.img} 
                alt={s.title[lang] || s.title.pl} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-6 text-center transition-opacity duration-500 group-hover:bg-black/50">
                <h3 
                  className="text-2xl md:text-3xl font-normal text-white leading-tight transition-all group-hover:scale-105 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] whitespace-pre-line"
                  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
                >
                  {s.title[lang] || s.title.pl}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
