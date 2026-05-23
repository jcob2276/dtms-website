import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { SUPPORTED_CITIES } from '@/lib/constants/cities';

const titles = {
  pl: 'Szkolenia UDT w regionie',
  en: 'UDT training in the region',
  ua: 'Навчання UDT у регіоні',
};

export default function CityLinks({ lang }) {
  const title = titles[lang] || titles.pl;

  return (
    <div className="w-full mt-12 pt-12 border-t border-white/5">
      <div className="flex flex-col items-center">
        <h4 className="text-[10px] font-black mb-6 uppercase tracking-[0.3em] text-blue-500">
          {title}
        </h4>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 max-w-4xl px-6">
          {SUPPORTED_CITIES.map((city) => (
            <Link
              key={city.id}
              href={`/${lang}/kursy-udt-${city.id}/`}
              className="flex items-center gap-2 text-[10px] font-bold text-white/40 hover:text-blue-400 transition-colors group"
            >
              <MapPin size={10} className="text-white/20 group-hover:text-blue-500 transition-colors" />
              <span className="uppercase tracking-widest">{city.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
