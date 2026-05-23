import { CONTACT_INFO } from '@/lib/constants/contact';

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "DTMS Marek Soboń - Szkolenia Techniczne",
  "image": "https://szkoleniadtms.pl/obrazy/sekcja-hero.webp",
  "@id": "https://szkoleniadtms.pl",
  "url": "https://szkoleniadtms.pl",
  "telephone": CONTACT_INFO.phoneFull,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": CONTACT_INFO.addressStreet,
    "addressLocality": CONTACT_INFO.addressLocality,
    "postalCode": CONTACT_INFO.postalCode,
    "addressCountry": CONTACT_INFO.country
  },
  "areaServed": [
    { "@type": "City", "name": "Krosno", "url": "https://www.wikidata.org/wiki/Q147424" },
    { "@type": "City", "name": "Jasło", "url": "https://www.wikidata.org/wiki/Q651586" },
    { "@type": "City", "name": "Sanok", "url": "https://www.wikidata.org/wiki/Q459632" },
    { "@type": "City", "name": "Brzozów", "url": "https://www.wikidata.org/wiki/Q1003463" },
    { "@type": "City", "name": "Rzeszów", "url": "https://www.wikidata.org/wiki/Q170261" },
    { "@type": "City", "name": "Gorlice", "url": "https://www.wikidata.org/wiki/Q459636" }
  ],
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": CONTACT_INFO.coordinates.lat,
    "longitude": CONTACT_INFO.coordinates.lng
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "19:00"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": String(CONTACT_INFO.googleReviewCount),
    "bestRating": "5",
    "worstRating": "1"
  },
  "sameAs": [CONTACT_INFO.facebook]
};

function navigationSchema(lang, dict) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      { "@type": "SiteNavigationElement", "position": 1, "name": dict.nav.start, "url": `https://szkoleniadtms.pl/${lang}/` },
      { "@type": "SiteNavigationElement", "position": 2, "name": dict.nav.services, "url": `https://szkoleniadtms.pl/${lang}/uslugi/` },
      { "@type": "SiteNavigationElement", "position": 3, "name": dict.nav.contact, "url": `https://szkoleniadtms.pl/${lang}/#kontakt` }
    ]
  };
}

export default function SEOSchemas({ lang, dict }) {
  return (
    <>
      <script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        id="json-ld-navigation"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationSchema(lang, dict)) }}
      />
    </>
  );
}
