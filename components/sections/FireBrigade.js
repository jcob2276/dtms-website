'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function FireBrigade({ dict, lang }) {
  const hoistsTitle = { pl: 'Wciągarki wciągniki', en: 'Hoists and winches', ua: 'Лебідки та талі' };

  return (
    <section className="py-8 bg-white overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          
          {/* Left Tile - Wciągarki wciągniki - Now Linked to Services Page */}
          <Link 
            href={`/${lang}/uslugi#wciagniki-wciagarki`}
            className="relative block h-72 rounded-[2rem] overflow-hidden group shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
                     >
            <Image 
              src="/obrazy/wciagnik.webp" 
              alt={hoistsTitle[lang] || hoistsTitle.pl}
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-6 text-center transition-opacity duration-500 group-hover:bg-black/50">
              <h3 
                className="text-2xl md:text-3xl font-normal text-white leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
                style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
              >
                {hoistsTitle[lang] || hoistsTitle.pl}
              </h3>
            </div>
          </Link>

          {/* Middle & Right Tile - Fire Brigade (Spans 2 columns on desktop) */}
          <div 
            className="relative block h-72 lg:col-span-2 rounded-[2rem] overflow-hidden group shadow-lg transition-all duration-500 hover:shadow-2xl"
                     >
            <Image 
              src="/obrazy/strazak.webp" 
              alt="Szkolenia dla straży pożarnej — obsługa urządzeń podnośnikowych UDT"
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
            
            {/* Top Overlay - Requested Text */}
            <div className="absolute top-0 left-0 w-full p-6 text-center bg-black/40 backdrop-blur-sm border-b border-white/10">
              <h3 
                className="text-xs md:text-sm lg:text-base font-bold text-white uppercase tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              >
                {dict.fire.desc}
              </h3>
            </div>
            
            {/* Empty Center Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
