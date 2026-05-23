import { notFound } from 'next/navigation';
import { i18n } from '@/app/i18n';
import { getCityIdFromSlug, getCityMetadata, getCityStaticParams, CityPageContent } from '@/lib/cityPage';
import { getServicesMetadata, ServicesPageContent } from '@/lib/servicesPage';
import { getPrivacyMetadata, PrivacyPageContent } from '@/lib/privacyPage';

export const STATIC_SLUGS = ['uslugi', 'polityka-prywatnosci'];

export function getSlugStaticParams() {
  return [
    ...STATIC_SLUGS.map((slug) => ({ slug })),
    ...getCityStaticParams(),
  ];
}

export function getLocaleSlugStaticParams() {
  return i18n.locales.flatMap((locale) =>
    getSlugStaticParams().map(({ slug }) => ({ locale, slug }))
  );
}

export async function getSlugMetadata(lang, params) {
  const { slug } = await params;

  if (slug === 'uslugi') return getServicesMetadata(lang);
  if (slug === 'polityka-prywatnosci') return getPrivacyMetadata(lang);
  if (getCityIdFromSlug(slug)) return getCityMetadata(lang, params);

  notFound();
}

export async function SlugPageContent({ lang, params }) {
  const { slug } = await params;

  if (slug === 'uslugi') return ServicesPageContent({ lang });
  if (slug === 'polityka-prywatnosci') return PrivacyPageContent({ lang });
  if (getCityIdFromSlug(slug)) return CityPageContent({ lang, params });

  notFound();
}
