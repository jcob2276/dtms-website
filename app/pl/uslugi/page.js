import { getDictionary } from "../../i18n";
import { DETAILED_SERVICES } from "@/lib/data";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import Script from "next/script";

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Szkolenia UDT — DTMS Krosno",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "item": { "@type": "Course", "name": "Kurs na wózki widłowe kat. II WJO", "description": "Uprawnienia na wózki jezdniowe widłowe z napędem spalinowym i akumulatorowym.", "provider": { "@type": "Organization", "name": "DTMS Marek Soboń", "url": "https://szkoleniadtms.pl" }, "courseMode": "blended", "educationalLevel": "zawodowy", "url": "https://szkoleniadtms.pl/pl/uslugi#wozki-ii-wjo" } },
    { "@type": "ListItem", "position": 2, "item": { "@type": "Course", "name": "Kurs na wózki specjalizowane kat. I WJO", "description": "Uprawnienia na wózki ze zmiennym wysięgiem i operatorem podnoszonym.", "provider": { "@type": "Organization", "name": "DTMS Marek Soboń", "url": "https://szkoleniadtms.pl" }, "courseMode": "blended", "url": "https://szkoleniadtms.pl/pl/uslugi#wozki-i-wjo" } },
    { "@type": "ListItem", "position": 3, "item": { "@type": "Course", "name": "Kurs na podesty ruchome", "description": "Uprawnienia na wszystkie typy podestów ruchomych wolnobieżnych i samojezdnych.", "provider": { "@type": "Organization", "name": "DTMS Marek Soboń", "url": "https://szkoleniadtms.pl" }, "courseMode": "blended", "url": "https://szkoleniadtms.pl/pl/uslugi#podesty" } },
    { "@type": "ListItem", "position": 4, "item": { "@type": "Course", "name": "Kurs na żurawie przenośne HDS", "description": "Uprawnienia na żurawie przenośne, przewoźne i stacjonarne.", "provider": { "@type": "Organization", "name": "DTMS Marek Soboń", "url": "https://szkoleniadtms.pl" }, "courseMode": "blended", "url": "https://szkoleniadtms.pl/pl/uslugi#zurawie-przenosne" } },
    { "@type": "ListItem", "position": 5, "item": { "@type": "Course", "name": "Kurs na suwnice", "description": "Uprawnienia na suwnice pomostowe, bramowe i półbramowe.", "provider": { "@type": "Organization", "name": "DTMS Marek Soboń", "url": "https://szkoleniadtms.pl" }, "courseMode": "blended", "url": "https://szkoleniadtms.pl/pl/uslugi#suwnice" } },
    { "@type": "ListItem", "position": 6, "item": { "@type": "Course", "name": "Kurs napełniania butli gazowych", "description": "Uprawnienia do napełniania zbiorników ciśnieniowych gazami.", "provider": { "@type": "Organization", "name": "DTMS Marek Soboń", "url": "https://szkoleniadtms.pl" }, "courseMode": "blended", "url": "https://szkoleniadtms.pl/pl/uslugi#napelnianie" } },
    { "@type": "ListItem", "position": 7, "item": { "@type": "Course", "name": "Kurs zapinacza hakowego sygnalisty", "description": "Zaświadczenie MEN — transport ładunków urządzeniami dźwignicowymi.", "provider": { "@type": "Organization", "name": "DTMS Marek Soboń", "url": "https://szkoleniadtms.pl" }, "courseMode": "blended", "url": "https://szkoleniadtms.pl/pl/uslugi#hakowy" } },
    { "@type": "ListItem", "position": 8, "item": { "@type": "Course", "name": "Szkolenia dla Straży Pożarnej", "description": "Pakiety FIRE: podesty ruchome, HDS, napełnianie butli dla strażaków i kandydatów do PSP.", "provider": { "@type": "Organization", "name": "DTMS Marek Soboń", "url": "https://szkoleniadtms.pl" }, "courseMode": "blended", "url": "https://szkoleniadtms.pl/pl/uslugi" } }
  ]
};

export const metadata = {
  title: "Wszystkie Szkolenia UDT | Wózki, Podesty, Suwnice, Żurawie — DTMS Krosno",
  description: "Pełna oferta kursów UDT: wózki widłowe kat. I i II WJO, podesty ruchome, suwnice, żurawie HDS, napełnianie butli i więcej. Egzaminy UDT w Krośnie. Sprawdź szczegóły.",
  keywords: "kursy UDT Krosno, wózki widłowe kurs, podesty ruchome szkolenie, suwnice UDT, żurawie HDS, napełnianie butli gazowych, DTMS",
  alternates: {
    canonical: '/pl/uslugi',
    languages: {
      'pl-PL': '/pl/uslugi',
      'en-US': '/en/uslugi',
      'uk-UA': '/ua/uslugi',
    },
  },
  openGraph: {
    title: "Wszystkie Szkolenia UDT — DTMS Krosno",
    description: "17 rodzajów kursów technicznych zakończonych egzaminem państwowym UDT. Sprawdź pełną ofertę.",
    url: 'https://szkoleniadtms.pl/pl/uslugi',
    images: [{ url: '/obrazy/wozek2.jpg', width: 1200, height: 630, alt: 'Szkolenia UDT DTMS Krosno' }],
    locale: 'pl_PL',
    type: 'website',
  },
};

export default async function ServicesPage() {
  const lang = 'pl';
  const dict = getDictionary(lang);

  return (
    <div className="pt-24 pb-24 bg-slate-50">
      <div className="container px-4">
        {/* Hidden H1 for SEO */}
        <h1 className="sr-only">Wszystkie Szkolenia UDT — Wózki Widłowe, Podesty, Suwnice, Żurawie — DTMS Krosno</h1>
        <Script id="course-schema" type="application/ld+json">
          {JSON.stringify(courseSchema)}
        </Script>

        {/* Services List - Alternating Layout */}
        <div className="space-y-12 md:space-y-24 max-w-7xl mx-auto">
          {DETAILED_SERVICES.map((s, i) => (
            <div
              key={i}
              id={s.id}
              className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}
            >
              {/* Image Section */}
              <div className="w-full lg:w-1/2 group">
                <div className="relative h-[300px] md:h-[450px] w-full rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                  <Image
                    src={s.img}
                    alt={s.title[lang] || s.title.pl}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Text Content Section */}
              <div className="w-full lg:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 leading-tight whitespace-pre-line" style={{ fontFamily: 'Verdana, Geneva, sans-serif' }}>
                  {s.title[lang] || s.title.pl}
                </h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
                  {s.desc[lang] || s.desc.pl}
                </p>

                {/* Exam Badge */}
                <div className="inline-flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <div className="bg-emerald-500 p-2 rounded-full text-white shadow-lg shadow-emerald-100">
                    <BadgeCheck size={20} />
                  </div>
                  <p className="text-sm font-bold text-slate-800">
                    {s.exam[lang] || s.exam.pl}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}