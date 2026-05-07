export const metadata = {
  title: 'Kursy UDT Sanok | Wozki Widlowe, Podesty, Suwnice - DTMS',
  description: 'Profesjonalne szkolenia UDT w Sanoku i okolicach. Uprawnienia na wozki widlowe, podesty ruchome, suwnice i zurawi HDS. Dojazd do klienta! Tel. 667 677 912.',
  alternates: {
    canonical: '/pl/kursy-udt-sanok',
    languages: { 'pl-PL': '/pl/kursy-udt-sanok', 'en-US': '/en/kursy-udt-sanok', 'uk-UA': '/ua/kursy-udt-sanok' },
  },
  openGraph: {
    title: 'Kursy UDT Sanok - DTMS Szkolenia Techniczne',
    description: 'Szkolenia UDT w Sanoku. Wozki widlowe, podesty, suwnice, zurawi HDS. Wysoka zdalnosc.',
    url: 'https://szkoleniadtms.pl/pl/kursy-udt-sanok',
    locale: 'pl_PL',
    type: 'website',
  },
};

import { getDictionary } from '../../i18n'; import { SUPPORTED_CITIES } from '@/lib/constants/cities'; import Hero from '@/components/sections/Hero'; import UpcomingCourses from '@/components/sections/UpcomingCourses'; import Services from '@/components/sections/Services'; import FireBrigade from '@/components/sections/FireBrigade'; import HowWeWork from '@/components/sections/HowWeWork';  import Reviews from '@/components/sections/Reviews';  import { notFound } from 'next/navigation'; import CityTracking from '@/components/CityTracking';



export default async function CityPage() {
  const lang = 'pl';
  const cityId = 'sanok';
  const dict = getDictionary(lang);
  const city = SUPPORTED_CITIES.find(c => c.id === cityId);
  if (!city) notFound();

  

  return (
    <>
      <h1 className="sr-only">Kursy UDT Sanok - Szkolenia na Wozki Widlowe, Podesty i Suwnice - DTMS</h1>
      
      <CityTracking cityId='sanok' /> <Hero dict={dict} lang={lang} city={city} />
      <UpcomingCourses dict={dict} lang={lang} /> <Services dict={dict} lang={lang} />
      <FireBrigade dict={dict} lang={lang} /> <HowWeWork dict={dict} lang={lang} />
      
      <Reviews dict={dict} lang={lang} />
      
    </>
  );
}







