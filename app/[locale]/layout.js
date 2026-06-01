import LocaleLayout, {
  getLayoutMetadata,
  getLocaleStaticParams,
  LAYOUT_VIEWPORT,
  validateLocale,
} from '@/lib/localeLayout';

export function generateStaticParams() {
  return getLocaleStaticParams();
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return getLayoutMetadata(locale);
}

export const viewport = LAYOUT_VIEWPORT;

export default async function Layout({ children, params }) {
  const { locale } = await params;
  validateLocale(locale);

  return (
    <LocaleLayout lang={locale}>
      {children}
    </LocaleLayout>
  );
}
