import { getDictionary } from "../i18n";
import Hero from "@/components/sections/Hero";
import UpcomingCourses from "@/components/sections/UpcomingCourses";
import Services from "@/components/sections/Services";
import FireBrigade from "@/components/sections/FireBrigade";
import HowWeWork from "@/components/sections/HowWeWork";
import Reviews from "@/components/sections/Reviews";
import Script from "next/script";

export default async function Home() {
  const lang = 'pl';
  const dict = getDictionary(lang);

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Ile kosztuje kurs UDT w ośrodku DTMS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Cena kursu UDT jest uzależniona od kategorii uprawnień oraz liczby osób (oferujemy rabaty grupowe dla firm). Prosimy o kontakt telefoniczny pod numerem 667 677 912 w celu uzyskania aktualnej wyceny."
        }
      },
      {
        "@type": "Question",
        "name": "Kiedy odbywają się najbliższe terminy szkoleń na wózki i podesty?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nowe grupy szkoleniowe ruszają średnio raz w miesiącu. Dokładne daty najbliższych szkoleń i egzaminów UDT potwierdzamy telefonicznie."
        }
      }
    ]
  };

  return (
    <>
      <h1 className="sr-only">Profesjonalne Szkolenia UDT Krosno — Wózki Widłowe, Podesty Ruchome, Suwnice, Żurawie HDS</h1>
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
