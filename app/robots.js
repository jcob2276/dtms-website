export const dynamic = 'force-static';

// Blocked: pure scrapers with no SEO value (AI training data harvesters)
const BLOCKED_BOTS = ['CCBot', 'Bytespider'];

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      ...BLOCKED_BOTS.map((bot) => ({ userAgent: bot, disallow: ['/'] })),
    ],
    sitemap: 'https://szkoleniadtms.pl/sitemap.xml',
  };
}
