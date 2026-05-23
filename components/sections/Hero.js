'use client';
import Image from 'next/image';
import { Phone } from 'lucide-react';
import { trackPhoneClick } from '@/lib/analytics';
import { CONTACT_INFO } from '@/lib/constants/contact';

function cityTrustLine(dict, city) {
  const template = dict.hero?.city_trust;
  if (!template || !city || city.id === 'krosno' || city.distance === 0) return null;
  return template.replace('{city}', city.name).replace('{distance}', String(city.distance));
}

export default function Hero({ dict, lang, city }) {
  const trustLine = cityTrustLine(dict, city);
  return (
    <section className="relative h-[calc(100dvh-6rem)] w-full flex items-start p-6 md:p-12">
      {/* Background Image - Optimized with Picture to avoid double preloads */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet="/obrazy/sekcja-hero-mobile.webp"
          />
          <img
            src="/obrazy/sekcja-hero.webp"
            alt="DTMS Szkolenia Techniczne - Tło"
            className="w-full h-full object-cover"
            // High priority for LCP
            fetchPriority="high"
            loading="eager"
          />
        </picture>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Top Left Logo */}
      <div
        className="relative z-10 w-64 md:w-[460px] mt-28 md:mt-32 -ml-2 md:-ml-4 [animation:var(--animation-slide-right)]"
      >
        <h1 className="w-full">
          <Image
            src="/obrazy/logo-biale.webp"
            alt={city ? `${dict.hero?.h1_city || "Kursy UDT"} ${city.name}` : (dict.hero?.h1 || "Profesjonalne Szkolenia UDT Krosno")}
            width={460}
            height={230}
            className="w-full h-auto drop-shadow-2xl"
            priority
            sizes="(max-width: 768px) 256px, 460px"
          />
        </h1>
        {trustLine && (
          <p className="mt-4 max-w-md text-sm font-bold leading-snug text-white/95 drop-shadow-lg md:text-base">
            {trustLine}
          </p>
        )}
      </div>

      <div
        className="absolute bottom-6 right-4 z-50 md:bottom-12 md:right-12 [animation:var(--animation-fade-in)]"
        style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
      >
        <a
          href={`tel:${CONTACT_INFO.phoneFull}`}
          onClick={() => trackPhoneClick('hero')}
          className="flex items-center gap-3 md:gap-4 px-6 py-3 md:px-10 md:py-5 bg-blue-600 text-white rounded-full md:rounded-[2rem] font-black text-xl md:text-4xl shadow-2xl hover:bg-blue-500 hover:-translate-y-2 transition-all group border-4 border-white/20"
        >
          <Phone className="w-6 h-6 md:w-10 md:h-10 group-hover:rotate-12 transition-transform" />
          <span>{CONTACT_INFO.phone}</span>
        </a>
      </div>
    </section>
  );
}
