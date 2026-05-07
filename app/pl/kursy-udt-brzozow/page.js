export const metadata = {
  title: 'Kursy UDT Brzozów | Wozki Widlowe, Podesty, Suwnice - DTMS',
  description: 'Profesjonalne szkolenia UDT w Brzozowie i okolicach. Uprawnienia na wozki widlowe, podesty ruchome, suwnice i zurawi HDS. Dojazd do klienta! Tel. 667 677 912.',
  alternates: {
    canonical: '/pl/kursy-udt-brzozow',
    languages: { 'pl-PL': '/pl/kursy-udt-brzozow', 'en-US': '/en/kursy-udt-brzozow', 'uk-UA': '/ua/kursy-udt-brzozow' },
  },
  openGraph: {
    title: 'Kursy UDT Brzozów - DTMS Szkolenia Techniczne',
    description: 'Szkolenia UDT w Brzozowie. Wozki widlowe, podesty, suwnice, zurawi HDS. Wysoka zdalnosc.',
    url: 'https://szkoleniadtms.pl/pl/kursy-udt-brzozow',
    locale: 'pl_PL',
    type: 'website',
  },
};

import { getDictionary } from '../../i18n'; import { SUPPORTED_CITIES } from '@/lib/constants/cities'; import Hero from '@/components/sections/Hero'; import UpcomingCourses from '@/components/sections/UpcomingCourses'; import Services from '@/components/sections/Services'; import FireBrigade from '@/components/sections/FireBrigade'; import HowWeWork from '@/components/sections/HowWeWork';  import Reviews from '@/components/sections/Reviews';  import { notFound } from 'next/navigation'; import CityTracking from '@/components/CityTracking';



export default async function CityPage() {
  const lang = 'pl';
  const cityId = 'brzozow';
  const dict = getDictionary(lang);
  const city = SUPPORTED_CITIES.find(c => c.id === cityId);
  if (!city) notFound();

  

  return (
    <>
      <h1 className="sr-only">Kursy UDT Brzozów - Szkolenia na Wozki Widlowe, Podesty i Suwnice - DTMS</h1>
      
      <CityTracking cityId='brzozow' /> <Hero dict={dict} lang={lang} city={city} />
      <UpcomingCourses dict={dict} lang={lang} /> <Services dict={dict} lang={lang} />
      <FireBrigade dict={dict} lang={lang} /> <HowWeWork dict={dict} lang={lang} />
      
      <Reviews dict={dict} lang={lang} />
      
    </>
  );
}







