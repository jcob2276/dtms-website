import Script from 'next/script';
import { getDictionary } from '@/app/i18n';
import Hero from '@/components/sections/Hero';
import UpcomingCourses from '@/components/sections/UpcomingCourses';
import Services from '@/components/sections/Services';
import FireBrigade from '@/components/sections/FireBrigade';
import HowWeWork from '@/components/sections/HowWeWork';
import Reviews from '@/components/sections/Reviews';
import { validateLocale } from '@/lib/localeLayout';

const HOME_METADATA = {
  en: {
    title: 'DTMS - Professional UDT Training Krosno | Forklifts, Platforms, Cranes',
    description: 'Professional UDT operator certification courses in Krosno, Poland. Get certified for forklifts, mobile platforms, overhead cranes and HDS. High pass rate, experienced instructors.',
  },
  ua: {
    title: 'DTMS - Професійне навчання UDT Кросно | Навантажувачі, Підйомники, Крани',
    description: 'Професійні курси сертифікації оператора UDT у Кросно, Польща. Отримайте сертифікат на навантажувачі, підйомні платформи, мостові крани та HDS.',
  },
};

const FAQ_DATA = {
  pl: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Ile kosztuje kurs UDT w ośrodku DTMS?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cena kursu UDT jest uzależniona od kategorii uprawnień oraz liczby osób (oferujemy rabaty grupowe dla firm). Prosimy o kontakt telefoniczny pod numerem 667 677 912 w celu uzyskania aktualnej wyceny.',
        },
      },
      {
        '@type': 'Question',
        name: 'Kiedy odbywają się najbliższe terminy szkoleń na wózki i podesty?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nowe grupy szkoleniowe ruszają średnio raz w miesiącu. Dokładne daty najbliższych szkoleń i egzaminów UDT potwierdzamy telefonicznie.',
        },
      },
    ],
  },
  en: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much does a UDT course at DTMS cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The price depends on the type of certification and group size (we offer group discounts for companies). Please call us at +48 667 677 912 for a current quote.',
        },
      },
      {
        '@type': 'Question',
        name: 'When are the next forklift and platform training dates?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'New training groups start approximately once a month. Exact dates for upcoming UDT training and exams are confirmed by phone.',
        },
      },
    ],
  },
  ua: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Скільки коштує курс UDT в DTMS?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ціна залежить від типу сертифікації та кількості учасників (пропонуємо групові знижки для компаній). Телефонуйте за номером +48 667 677 912 для отримання актуального прайсу.',
        },
      },
      {
        '@type': 'Question',
        name: 'Коли проходять найближчі курси на навантажувачі та підйомники?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Нові навчальні групи починаються приблизно раз на місяць. Точні дати найближчих курсів та іспитів UDT підтверджуються телефоном.',
        },
      },
    ],
  },
};

export function getHomeMetadata(lang) {
  validateLocale(lang);
  return HOME_METADATA[lang] ?? {};
}

export async function HomePageContent({ lang }) {
  validateLocale(lang);
  const dict = await getDictionary(lang);
  const faqData = FAQ_DATA[lang];

  return (
    <>
      <Script id="faq-schema" type="application/ld+json">
        {JSON.stringify(faqData)}
      </Script>

      <Hero dict={dict} lang={lang} />
      <UpcomingCourses dict={dict} lang={lang} />
      <Services dict={dict} lang={lang} />
      <FireBrigade dict={dict} lang={lang} />
      <HowWeWork dict={dict} lang={lang} />
      <Reviews dict={dict} lang={lang} />
    </>
  );
}
