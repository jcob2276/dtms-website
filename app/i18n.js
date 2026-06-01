export const i18n = {
  defaultLocale: 'pl',
  locales: ['pl', 'en', 'ua'],
};

export async function getDictionary(locale) {
  try {
    const dict = await import(`./locales/${locale}.json`);
    return dict.default;
  } catch {
    const fallback = await import('./locales/pl.json');
    return fallback.default;
  }
}
