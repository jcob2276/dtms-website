import { notFound } from 'next/navigation';
import { getDictionary, i18n } from '@/app/i18n';
import BaseLayout from '@/components/layout/BaseLayout';

export const LAYOUT_VIEWPORT = {
  themeColor: '#2563EB',
  width: 'device-width',
  initialScale: 1,
};

const LAYOUT_METADATA = {
  pl: {
    title: 'DTMS - Szkolenia UDT Krosno, Jasło, Sanok | Wózki Widłowe, Podesty',
    description: 'Profesjonalne kursy UDT w Krośnie i okolicach (Jasło, Sanok, Brzozów). Szkolimy operatorów wózków widłowych, podestów ruchomych, suwnic i HDS. Sprawdź terminy!',
    keywords: 'szkolenia UDT Krosno, kursy wózki widłowe Jasło, szkolenia UDT Sanok, uprawnienia UDT, kurs na podesty ruchome, kurs napełniania butli, DTMS Marek Soboń',
    siteName: 'DTMS Szkolenia Techniczne',
    locale: 'pl_PL',
    twitter: true,
  },
  en: {
    title: 'DTMS - UDT Training Krosno, Jasło, Sanok | Forklifts, Platforms',
    description: 'Professional UDT courses in Krosno, Jasło, Sanok. We train operators of forklifts, mobile platforms, cranes, and HDS. Check dates!',
    keywords: 'UDT training Krosno, forklift courses Jasło, Sanok UDT training, mobile platform training, gas cylinder filling, DTMS',
    siteName: 'DTMS Technical Training',
    locale: 'en_US',
    twitter: false,
  },
  ua: {
    title: 'DTMS - Навчання UDT Кросно | Навантажувачі, Платформи, Крани',
    description: 'Професійні курси UDT у Кросно. Навчаємо операторів навантажувачів, мобільних платформ, кранів та HDS. Перевірте дати!',
    keywords: 'навчання UDT Кросно, курси навантажувачів Кросно, підйомні платформи, наповнення балонів, DTMS',
    siteName: 'DTMS Технічне навчання',
    locale: 'uk_UA',
    twitter: false,
  },
};

export function getLocaleStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export function validateLocale(locale) {
  if (!i18n.locales.includes(locale)) notFound();
}

export function getLayoutMetadata(locale) {
  validateLocale(locale);
  const config = LAYOUT_METADATA[locale];
  const path = `/${locale}/`;

  const metadata = {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    authors: [{ name: 'DTMS Marek Soboń' }],
    metadataBase: new URL('https://szkoleniadtms.pl'),
    alternates: {
      canonical: path,
      languages: {
        'pl-PL': '/pl/',
        'en-US': '/en/',
        'uk-UA': '/ua/',
      },
    },
    openGraph: {
      type: 'website',
      locale: config.locale,
      url: `https://szkoleniadtms.pl${path}`,
      siteName: config.siteName,
      title: config.title,
      description: config.description,
      images: ['/obrazy/sekcja-hero.webp'],
    },
    icons: {
      icon: '/obrazy/logo-biale.ico',
      apple: '/obrazy/logo-biale.ico',
    },
  };

  if (config.twitter) {
    metadata.twitter = {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      images: ['/obrazy/sekcja-hero.webp'],
    };
  }

  return metadata;
}

export default async function LocaleLayout({ lang, children }) {
  validateLocale(lang);
  const dict = await getDictionary(lang);

  return (
    <BaseLayout lang={lang} dict={dict}>
      {children}
    </BaseLayout>
  );
}
