export const metadata = {
  title: 'Курси UDT Ясло | Навантажувачі, Підйомники, Крани — DTMS',
  description: 'Професійне навчання операторів UDT поблизу Ясло, Польща. Сертифікація навантажувачів, підйомних платформ та кранів. Виїзд до клієнта. Тел.: +48 667 677 912.',
  alternates: { canonical: '/ua/kursy-udt-jaslo', languages: { 'pl-PL': '/pl/kursy-udt-jaslo', 'en-US': '/en/kursy-udt-jaslo', 'uk-UA': '/ua/kursy-udt-jaslo' } },
  openGraph: { title: 'Курси UDT Ясло — DTMS', description: 'Сертифікація UDT поблизу Ясло. Навантажувачі, підйомники, крани.', url: 'https://szkoleniadtms.pl/ua/kursy-udt-jaslo', locale: 'uk_UA', type: 'website' },
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
  const lang = 'ua';
  const cityId = 'jaslo';
  const dict = getDictionary(lang);
  const city = SUPPORTED_CITIES.find(c => c.id === cityId);
  
  if (!city) notFound();

  return (
    <>
      <h1 className="sr-only">Курси UDT JASLO - Навантажувачі, Підйомники, Крани - DTMS</h1>
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
