import { notFound } from 'next/navigation';
import { getDictionary } from '@/app/i18n';
import { getCityById, SUPPORTED_CITIES } from '@/lib/constants/cities';
import Hero from '@/components/sections/Hero';
import UpcomingCourses from '@/components/sections/UpcomingCourses';
import Services from '@/components/sections/Services';
import FireBrigade from '@/components/sections/FireBrigade';
import HowWeWork from '@/components/sections/HowWeWork';
import Reviews from '@/components/sections/Reviews';
import CityTracking from '@/components/CityTracking';

const BASE_URL = 'https://szkoleniadtms.pl';

const OPEN_GRAPH_LOCALES = {
  pl: 'pl_PL',
  en: 'en_US',
  ua: 'uk_UA',
};

export function getCityStaticParams() {
  return SUPPORTED_CITIES.map((city) => ({ slug: `kursy-udt-${city.id}` }));
}

export function getCityIdFromSlug(slug) {
  if (!slug || !slug.startsWith('kursy-udt-')) return null;
  return slug.slice('kursy-udt-'.length);
}

function buildCityPath(lang, cityId) {
  return `/${lang}/kursy-udt-${cityId}/`;
}

function buildCityMetadata(lang, city) {
  const path = buildCityPath(lang, city.id);
  const alternates = {
    canonical: path,
    languages: {
      'pl-PL': buildCityPath('pl', city.id),
      'en-US': buildCityPath('en', city.id),
      'uk-UA': buildCityPath('ua', city.id),
    },
  };

  if (lang === 'pl') {
    return {
      title: `Kursy UDT ${city.name} | Wózki Widłowe, Podesty, Suwnice - DTMS`,
      description: `Profesjonalne szkolenia UDT w ${city.locative} i okolicach. Uprawnienia na wózki widłowe, podesty ruchome, suwnice i żurawie HDS. Dojazd do klienta! Tel. 667 677 912.`,
      alternates,
      openGraph: {
        title: `Kursy UDT ${city.name} - DTMS Szkolenia Techniczne`,
        description: `Szkolenia UDT w ${city.locative}. Wózki widłowe, podesty, suwnice, żurawie HDS. Wysoka zdawalność.`,
        url: `${BASE_URL}${path}`,
        locale: OPEN_GRAPH_LOCALES.pl,
        type: 'website',
      },
    };
  }

  if (lang === 'en') {
    return {
      title: `UDT Courses ${city.name} | Forklifts, Platforms, Cranes — DTMS`,
      description: `Professional UDT operator training near ${city.name}, Poland. Forklift, mobile platform, overhead crane and HDS certification. On-site training available. Call: +48 667 677 912.`,
      alternates,
      openGraph: {
        title: `UDT Courses ${city.name} — DTMS Training Center`,
        description: `UDT operator certification near ${city.name}. Forklifts, platforms, cranes. High pass rate.`,
        url: `${BASE_URL}${path}`,
        locale: OPEN_GRAPH_LOCALES.en,
        type: 'website',
      },
    };
  }

  return {
    title: `Курси UDT ${city.uaName} | Навантажувачі, Підйомники, Крани — DTMS`,
    description: `Професійне навчання операторів UDT поблизу ${city.uaName}, Польща. Сертифікація навантажувачів, підйомних платформ та кранів. Виїзд до клієнта. Тел.: +48 667 677 912.`,
    alternates,
    openGraph: {
      title: `Курси UDT ${city.uaName} — DTMS`,
      description: `Сертифікація UDT поблизу ${city.uaName}. Навантажувачі, підйомники, крани.`,
      url: `${BASE_URL}${path}`,
      locale: OPEN_GRAPH_LOCALES.ua,
      type: 'website',
    },
  };
}

export async function getCityMetadata(lang, params) {
  const { slug } = await params;
  const cityId = getCityIdFromSlug(slug);
  const city = cityId ? getCityById(cityId) : null;
  if (!city) notFound();
  return buildCityMetadata(lang, city);
}

export async function CityPageContent({ lang, params }) {
  const { slug } = await params;
  const cityId = getCityIdFromSlug(slug);
  const city = cityId ? getCityById(cityId) : null;
  if (!city) notFound();

  const dict = await getDictionary(lang);

  return (
    <>
      <CityTracking cityId={cityId} />
      <Hero dict={dict} lang={lang} city={city} />
      <UpcomingCourses dict={dict} lang={lang} />
      <Services dict={dict} lang={lang} />
      <FireBrigade dict={dict} lang={lang} />
      <HowWeWork dict={dict} lang={lang} />
      <Reviews dict={dict} lang={lang} />
    </>
  );
}
