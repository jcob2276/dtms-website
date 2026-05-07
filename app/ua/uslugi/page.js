import { getDictionary } from "../../i18n";
import { DETAILED_SERVICES } from "@/lib/data";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";

export const metadata = {
  title: "Всі курси UDT | Навантажувачі, Підйомники, Крани — DTMS Кросно",
  description: "Повна пропозиція сертифікації UDT: навантажувачі кат. I і II WJO, підйомні платформи, мостові крани, крани HDS, наповнення балонів та ін. Державні іспити UDT у Кросно.",
  alternates: {
    canonical: '/ua/uslugi',
    languages: { 'pl-PL': '/pl/uslugi', 'en-US': '/en/uslugi', 'uk-UA': '/ua/uslugi' },
  },
  openGraph: {
    title: "Всі курси UDT — DTMS Кросно",
    description: "17 видів технічних курсів із державним іспитом UDT. Перегляньте повну пропозицію.",
    url: 'https://szkoleniadtms.pl/ua/uslugi',
    images: [{ url: '/obrazy/wozek2.jpg', width: 1200, height: 630, alt: 'Навчання UDT DTMS Кросно' }],
    locale: 'uk_UA',
    type: 'website',
  },
};

export default async function ServicesPage() {
  const lang = 'ua';
  const dict = getDictionary(lang);

  return (
    <div className="pt-24 pb-24 bg-slate-50">
      <div className="container px-4">
        <h1 className="sr-only">Всі курси UDT — Навантажувачі, Підйомники, Крани, Лебідки — DTMS Кросно</h1>

        <div className="space-y-12 md:space-y-24 max-w-7xl mx-auto">
          {DETAILED_SERVICES.map((s, i) => (
            <div
              key={i}
              id={s.id}
              className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}
            >
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

              <div className="w-full lg:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 leading-tight whitespace-pre-line" style={{ fontFamily: 'Verdana, Geneva, sans-serif' }}>
                  {s.title[lang] || s.title.pl}
                </h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
                  {s.desc[lang] || s.desc.pl}
                </p>

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
