import { getHomeMetadata, HomePageContent } from '@/lib/homePage';
import { validateLocale } from '@/lib/localeLayout';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  validateLocale(locale);
  return getHomeMetadata(locale);
}

export default async function HomePage({ params }) {
  const { locale } = await params;
  return HomePageContent({ lang: locale });
}
