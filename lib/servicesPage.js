import { BadgeCheck } from 'lucide-react';
import { DETAILED_SERVICES } from '@/lib/data';
import { validateLocale } from '@/lib/localeLayout';

const OPEN_GRAPH_LOCALES = {
  pl: 'pl_PL',
  en: 'en_US',
  ua: 'uk_UA',
};

const SERVICES_METADATA = {
  pl: {
    title: 'Wszystkie Szkolenia UDT | Wózki, Podesty, Suwnice, Żurawie — DTMS Krosno',
    description: 'Pełna oferta kursów UDT: wózki widłowe kat. I i II WJO, podesty ruchome, suwnice, żurawie HDS, napełnianie butli i więcej. Egzaminy UDT w Krośnie. Sprawdź szczegóły.',
    schemaName: 'Szkolenia UDT — DTMS Krosno',
    ogTitle: 'Wszystkie Szkolenia UDT — DTMS Krosno',
    ogDescription: 'Profesjonalne kursy techniczne zakończonych egzaminem państwowym UDT. Sprawdź pełną ofertę.',
    ogAlt: 'Szkolenia UDT DTMS Krosno',
    heading: 'Szkolenia UDT - pełna oferta',
    subheading: 'Kursy na wózki widłowe, podesty, suwnice, żurawie, dźwigi, wciągniki oraz napełnianie zbiorników ciśnieniowych.',
    imageAltSuffix: ' - Szkolenia UDT Krosno, Jasło, Sanok, Brzozów',
  },
  en: {
    title: 'All UDT Training Courses | Forklifts, Platforms, Cranes — DTMS Krosno',
    description: 'Complete UDT certification offer: forklifts cat. I & II WJO, mobile platforms, overhead cranes, HDS cranes, gas cylinder filling and more. State UDT exams in Krosno.',
    schemaName: 'UDT Training — DTMS Krosno',
    ogTitle: 'All UDT Training Courses — DTMS Krosno',
    ogDescription: 'Professional technical courses ending with a state UDT exam. Check full offer.',
    ogAlt: 'UDT Training DTMS Krosno',
    heading: 'UDT training - full offer',
    subheading: 'Forklift, mobile platform, overhead crane, hoist, lift and pressure tank filling courses.',
    imageAltSuffix: '',
  },
  ua: {
    title: 'Всі курси UDT | Навантажувачі, Підйомники, Крани — DTMS Кросно',
    description: 'Повний перелік курсів UDT: навантажувачі кат. I та II WJO, підйомні платформи, мостові крани, крани HDS, наповнення балонів та інше. Іспити UDT у Кросно.',
    schemaName: 'Навчання UDT — DTMS Кросно',
    ogTitle: 'Всі курси UDT — DTMS Кросно',
    ogDescription: 'Професійне навчання, що завершується державним іспитом UDT. Перевірте повну пропозицію.',
    ogAlt: 'Навчання UDT DTMS Кросно',
    heading: 'Курси UDT - повна пропозиція',
    subheading: 'Курси для операторів навантажувачів, підйомних платформ, кранів, лебідок, ліфтів та наповнення балонів.',
    imageAltSuffix: '',
  },
};

function courseSchema(lang) {
  const config = SERVICES_METADATA[lang];

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: config.schemaName,
    itemListElement: DETAILED_SERVICES.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Course',
        name: (service.title[lang] || service.title.pl).replace('\n', ' '),
        description: `${(service.desc[lang] || service.desc.pl).substring(0, 150)}...`,
        provider: {
          '@type': 'Organization',
          name: 'DTMS Marek Soboń',
          url: 'https://szkoleniadtms.pl',
        },
        url: `https://szkoleniadtms.pl/${lang}/uslugi#${service.id}`,
      },
    })),
  };
}

export function getServicesMetadata(lang) {
  validateLocale(lang);
  const config = SERVICES_METADATA[lang];
  const path = `/${lang}/uslugi/`;

  return {
    title: config.title,
    description: config.description,
    alternates: {
      canonical: path,
      languages: {
        'pl-PL': '/pl/uslugi/',
        'en-US': '/en/uslugi/',
        'uk-UA': '/ua/uslugi/',
      },
    },
    openGraph: {
      title: config.ogTitle,
      description: config.ogDescription,
      url: `https://szkoleniadtms.pl${path.slice(1)}`,
      images: [{ url: '/obrazy/wozek2.webp', width: 1200, height: 630, alt: config.ogAlt }],
      locale: OPEN_GRAPH_LOCALES[lang],
      type: 'website',
    },
  };
}

export async function ServicesPageContent({ lang }) {
  validateLocale(lang);
  const config = SERVICES_METADATA[lang];

  return (
    <div className="pb-24 bg-slate-50">
      <div className="container px-4">
        <script
          id="course-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema(lang)) }}
        />

        <header className="pt-12 md:pt-16 pb-12 max-w-4xl mx-auto text-center">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-blue-600 mb-4">
            DTMS Krosno
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-slate-950 mb-6 tracking-normal">
            {config.heading}
          </h1>
          <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed">
            {config.subheading}
          </p>
        </header>

        <div className="space-y-12 md:space-y-24 max-w-7xl mx-auto">
          {DETAILED_SERVICES.map((service, index) => {
            const isNoImage = service.id === 'kto-moze-zostac';
            const title = service.title[lang] || service.title.pl;
            const description = service.desc[lang] || service.desc.pl;
            const exam = service.exam[lang] || service.exam.pl;

            return (
              <div
                key={service.id}
                id={service.id}
                className={`flex flex-col ${index % 2 === 1 && !isNoImage ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}
              >
                {!isNoImage ? (
                  <>
                    <div className="w-full lg:w-1/2 group">
                      <div className="relative h-[300px] md:h-[450px] w-full rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                        <picture className="w-full h-full">
                          {service.imgMobile && (
                            <source media="(max-width: 768px)" srcSet={service.imgMobile} />
                          )}
                          <img
                            src={service.img}
                            alt={`${title.replace('\n', ' ')}${config.imageAltSuffix}`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                        </picture>
                      </div>
                    </div>

                    <div className="w-full lg:w-1/2">
                      <h2
                        className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 leading-tight whitespace-pre-line"
                        style={{ fontFamily: 'Verdana, Geneva, sans-serif' }}
                      >
                        {title}
                      </h2>
                      <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
                        {description}
                      </p>

                      <div className="inline-flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                        <div className="bg-emerald-500 p-2 rounded-full text-white shadow-lg shadow-emerald-100">
                          <BadgeCheck size={20} />
                        </div>
                        <p className="text-sm font-bold text-slate-800">{exam}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="w-full bg-white p-10 md:p-16 rounded-[3rem] shadow-sm border border-slate-100 text-center">
                    <h2
                      className="text-3xl md:text-5xl font-bold mb-8 text-slate-900 whitespace-pre-line"
                      style={{ fontFamily: 'Verdana, Geneva, sans-serif' }}
                    >
                      {title}
                    </h2>
                    <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                      {description}
                    </p>
                    <div className="inline-flex items-center gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-200">
                      <div className="bg-emerald-500 p-2 rounded-full text-white">
                        <BadgeCheck size={24} />
                      </div>
                      <p className="text-base font-bold text-slate-800">{exam}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
