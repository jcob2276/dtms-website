const fields = ['id', 'name_pl', 'name_en', 'name_ua', 'date_text_pl', 'date_text_en', 'date_text_ua'];

export async function fetchWebsiteCourses(config, { signal, fetcher = fetch } = {}) {
  if (!config.url || !config.apiKey) throw new Error('Missing public courses configuration');
  const url = `${config.url}/rest/v1/website_course_entries?select=${fields.join(',')}&is_visible=eq.true&order=sort_order.asc,id.asc`;
  const response = await fetcher(url, { signal, cache: 'no-store', headers: { apikey: config.apiKey } });
  if (!response.ok) throw new Error('Cannot load course announcements');
  const entries = await response.json();
  if (!Array.isArray(entries) || entries.some(entry => !entry || ['id', 'name_pl', 'date_text_pl'].some(key => typeof entry[key] !== 'string' || !entry[key].trim()) || ['name_en', 'name_ua', 'date_text_en', 'date_text_ua'].some(key => entry[key] != null && typeof entry[key] !== 'string'))) {
    throw new Error('Invalid course announcements response');
  }
  return entries;
}

export function getWebsiteCourseText(entry, lang) {
  const locale = ['pl', 'en', 'ua'].includes(lang) ? lang : 'pl';
  return { name: entry[`name_${locale}`] || entry.name_pl, date: entry[`date_text_${locale}`] || entry.date_text_pl };
}

export const courseMessages = {
  pl: { loading: 'Pobieranie aktualnych terminów…', error: 'Nie udało się pobrać terminów. Zadzwoń, aby potwierdzić najbliższe kursy.', retry: 'Spróbuj ponownie' },
  en: { loading: 'Loading current training dates…', error: 'Unable to load training dates. Please call to confirm upcoming courses.', retry: 'Try again' },
  ua: { loading: 'Завантаження актуальних дат…', error: 'Не вдалося завантажити дати. Зателефонуйте, щоб уточнити найближчі курси.', retry: 'Спробувати ще раз' },
};
