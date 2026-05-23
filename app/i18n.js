import pl from './locales/pl.json';
import en from './locales/en.json';
import ua from './locales/ua.json';

export const i18n = {
  defaultLocale: 'pl',
  locales: ['pl', 'en', 'ua'],
};

const dictionaries = {
  pl,
  en,
  ua,
};

export const getDictionary = (locale) => {
  return dictionaries[locale] || dictionaries.pl;
};
