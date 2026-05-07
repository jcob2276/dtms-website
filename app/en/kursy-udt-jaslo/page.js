export const metadata = {
  title: 'UDT Courses Jasło | Forklifts, Platforms, Cranes — DTMS',
  description: 'Professional UDT operator training near Jasło, Poland. Forklift, mobile platform, overhead crane and HDS certification. On-site training available. Call: +48 667 677 912.',
  alternates: { canonical: '/en/kursy-udt-jaslo', languages: { 'pl-PL': '/pl/kursy-udt-jaslo', 'en-US': '/en/kursy-udt-jaslo', 'uk-UA': '/ua/kursy-udt-jaslo' } },
  openGraph: { title: 'UDT Courses Jasło — DTMS Training Center', description: 'UDT operator certification near Jasło. Forklifts, platforms, cranes. High pass rate.', url: 'https://szkoleniadtms.pl/en/kursy-udt-jaslo', locale: 'en_US', type: 'website' },
};

import { getDictionary } from '../../i18n';
import { SUPPORTED_CITIES } from '@/lib/constants/cities';
import Hero from '@/components/sections/Hero';
import UpcomingCourses from '@/components/sections/UpcomingCourses';
import Services from '@/components/sections/Services';
import FireBrigade from '@/components/sections/FireBrigade';
import HowWeWork from '@/components/sections/HowWeWork';
import Reviews from '@/components/sections/Reviews';
import { notFound } from 'next/navigation';
import CityTracking from '@/components/CityTracking';

export default async function CityPage() {
  const lang = 'en';
  const cityId = 'jaslo';
  const dict = getDictionary(lang);
  const city = SUPPORTED_CITIES.find(c => c.id === cityId);
  
  if (!city) notFound();

  return (
    <>
      <h1 className="sr-only">UDT Courses JASLO - Forklifts, Platforms, Cranes - DTMS</h1>
      <CityTracking cityId='jaslo' />
      <Hero dict={dict} lang={lang} city={city} />
      <UpcomingCourses dict={dict} lang={lang} />
      <Services dict={dict} lang={lang} />
      <FireBrigade dict={dict} lang={lang} />
      <HowWeWork dict={dict} lang={lang} />
      <Reviews dict={dict} lang={lang} />
    </>
  );
}
