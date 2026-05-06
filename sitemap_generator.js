/**
 * Sitemap Generator for DTMS
 * Run with: node sitemap_generator.js
 */
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://szkoleniadtms.pl';
const LANGUAGES = ['pl', 'en', 'ua'];
const CITIES = ['krosno', 'jaslo', 'sanok', 'rzeszow', 'gorlice', 'brzozow'];
const STATIC_ROUTES = ['', '/uslugi', '/polityka-prywatnosci'];

const generateSitemap = () => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  const addUrl = (route) => {
    LANGUAGES.forEach(lang => {
      const url = `${BASE_URL}${route}${lang === 'pl' ? '' : `?lang=${lang}`}`;
      xml += '  <url>\n';
      xml += `    <loc>${url}</loc>\n`;
      xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.8</priority>\n';
      
      // Hreflang alternates
      LANGUAGES.forEach(altLang => {
        const altUrl = `${BASE_URL}${route}${altLang === 'pl' ? '' : `?lang=${altLang}`}`;
        xml += `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${altUrl}" />\n`;
      });
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${route}" />\n`;
      
      xml += '  </url>\n';
    });
  };

  // Add static routes
  STATIC_ROUTES.forEach(route => addUrl(route));

  // Add city routes
  CITIES.forEach(city => addUrl(`/kursy-udt-${city}`));

  xml += '</urlset>';
  
  fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), xml);
  console.log('✅ sitemap.xml generated successfully in /public');
};

generateSitemap();
