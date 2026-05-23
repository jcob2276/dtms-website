export const dynamic = 'force-static';

const AI_BOTS = [
  'GPTBot',
  'ChatGPT-User',
  'Google-Extended',
  'ClaudeBot',
  'anthropic-ai',
  'CCBot',
  'Bytespider',
  'PerplexityBot',
  'YouBot',
  'Applebot-Extended',
];

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      ...AI_BOTS.map((bot) => ({ userAgent: bot, disallow: ['/'] })),
    ],
    sitemap: 'https://szkoleniadtms.pl/sitemap.xml',
  };
}
