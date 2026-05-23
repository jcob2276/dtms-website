export const dynamic = 'force-static';

const LAST_MODIFIED_MAIN = '2026-05-20';
const LAST_MODIFIED_CITIES = '2026-05-20';
const LAST_MODIFIED_LEGAL = '2026-05-20';

export default function sitemap() {
  const baseUrl = 'https://szkoleniadtms.pl';
  const locales = ['pl', 'en', 'ua'];
  const cities = ['krosno', 'jaslo', 'sanok', 'rzeszow', 'gorlice', 'brzozow'];
  const pages = ['', '/uslugi', '/polityka-prywatnosci'];

  const sitemapEntries = [];

  pages.forEach((page) => {
    locales.forEach((locale) => {
      const isHome = page === '';
      const isLegal = page === '/polityka-prywatnosci';

      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page}/`,
        lastModified: isLegal ? LAST_MODIFIED_LEGAL : LAST_MODIFIED_MAIN,
        changeFrequency: isLegal ? 'yearly' : 'weekly',
        priority: isHome ? 1.0 : isLegal ? 0.3 : 0.8,
        alternates: {
          languages: {
            pl: `${baseUrl}/pl${page}/`,
            en: `${baseUrl}/en${page}/`,
            ua: `${baseUrl}/ua${page}/`,
          },
        },
      });
    });
  });

  cities.forEach((city) => {
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/kursy-udt-${city}/`,
        lastModified: LAST_MODIFIED_CITIES,
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: {
            pl: `${baseUrl}/pl/kursy-udt-${city}/`,
            en: `${baseUrl}/en/kursy-udt-${city}/`,
            ua: `${baseUrl}/ua/kursy-udt-${city}/`,
          },
        },
      });
    });
  });

  return sitemapEntries;
}
