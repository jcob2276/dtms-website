import { validateLocale } from '@/lib/localeLayout';
import {
  getLocaleSlugStaticParams,
  getSlugMetadata,
  SlugPageContent,
} from '@/lib/slugPage';

export function generateStaticParams() {
  return getLocaleSlugStaticParams();
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  validateLocale(locale);
  return getSlugMetadata(locale, params);
}

export default async function SlugPage({ params }) {
  const { locale } = await params;
  validateLocale(locale);
  return SlugPageContent({ lang: locale, params });
}
