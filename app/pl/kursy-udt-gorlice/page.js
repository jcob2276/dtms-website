export const metadata = {
  title: 'Kursy UDT Gorlice | Wozki Widlowe, Podesty, Suwnice - DTMS',
  description: 'Profesjonalne szkolenia UDT w Gorlicach i okolicach. Uprawnienia na wozki widlowe, podesty ruchome, suwnice i zurawi HDS. Dojazd do klienta! Tel. 667 677 912.',
  alternates: {
    canonical: '/pl/kursy-udt-gorlice',
    languages: { 'pl-PL': '/pl/kursy-udt-gorlice', 'en-US': '/en/kursy-udt-gorlice', 'uk-UA': '/ua/kursy-udt-gorlice' },
  },
  openGraph: {
    title: 'Kursy UDT Gorlice - DTMS Szkolenia Techniczne',
    description: 'Szkolenia UDT w Gorlicach. Wozki widlowe, podesty, suwnice, zurawi HDS. Wysoka zdalnosc.',
    url: 'https://szkoleniadtms.pl/pl/kursy-udt-gorlice',
    locale: 'pl_PL',
    type: 'website',
  },
};

import { getDictionary } from '../../i18n'; import { SUPPORTED_CITIES } from '@/lib/constants/cities'; import Hero from '@/components/sections/Hero'; import UpcomingCourses from '@/components/sections/UpcomingCourses'; import Services from '@/components/sections/Services'; import FireBrigade from '@/components/sections/FireBrigade'; import HowWeWork from '@/components/sections/HowWeWork';  import Reviews from '@/components/sections/Reviews';  import { notFound } from 'next/navigation'; import CityTracking from '@/components/CityTracking';



export default async function CityPage() {
  const lang = 'pl';
  const cityId = 'gorlice';
  const dict = getDictionary(lang);
  const city = SUPPORTED_CITIES.find(c => c.id === cityId);
  if (!city) notFound();

  

  return (
    <>
      <h1 className="sr-only">Kursy UDT Gorlice - Szkolenia na Wozki Widlowe, Podesty i Suwnice - DTMS</h1>
      
      <CityTracking cityId='gorlice' /> <Hero dict={dict} lang={lang} city={city} />
      <UpcomingCourses dict={dict} lang={lang} /> <Services dict={dict} lang={lang} />
      <FireBrigade dict={dict} lang={lang} /> <HowWeWork dict={dict} lang={lang} />
      
      <Reviews dict={dict} lang={lang} />
      
    </>
  );
}







