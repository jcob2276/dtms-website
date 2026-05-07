'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * KRYTYCZNY dla Next.js Static Export:
 * Next.js nie wysyła automatycznie pageview przy zmianie języka/strony.
 * Ten komponent śledzi każdą zmianę pathname i pushuje event do GTM.
 */
export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.dataLayer = window.dataLayer || [];

    const lang = pathname.startsWith('/en') ? 'en'
               : pathname.startsWith('/ua') ? 'ua'
               : 'pl';

    window.dataLayer.push({
      event: 'page_view',
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
      page_language: lang,
    });
  }, [pathname]);

  return null;
}
