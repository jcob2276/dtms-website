import "../globals.css";
import { getDictionary } from "../i18n";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Script from "next/script";
import CookieConsent from "@/components/CookieConsent";
import PageViewTracker from "@/components/PageViewTracker";
import ScrollDepthTracker from "@/components/ScrollDepthTracker";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin', 'latin-ext'], display: 'swap' });

export const metadata = {
  title: "DTMS - Szkolenia UDT Krosno | Wózki Widłowe, Podesty, Suwnice",
  description: "Profesjonalne kursy UDT w Krośnie. Szkolimy operatorów wózków widłowych, podestów ruchomych, suwnic i HDS. Własny plac manewrowy, nowoczesny sprzęt i doświadczeni instruktorzy. Sprawdź terminy!",
  keywords: "szkolenia UDT Krosno, kursy wózki widłowe Krosno, uprawnienia UDT, kurs na podesty ruchome, kurs napełniania butli, DTMS Marek Soboń",
  authors: [{ name: "DTMS Marek Soboń" }],
  metadataBase: new URL('https://szkoleniadtms.pl'),
  alternates: {
    canonical: '/pl',
    languages: {
      'pl-PL': '/pl',
      'en-US': '/en',
      'uk-UA': '/ua',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: 'https://szkoleniadtms.pl/pl',
    siteName: 'DTMS Szkolenia Techniczne',
    title: 'DTMS - Szkolenia UDT Krosno | Wózki Widłowe, Podesty, Suwnice',
    description: 'Profesjonalne kursy UDT w Krośnie. Szkolimy operatorów wózków widłowych, podestów ruchomych, suwnic i HDS.',
    images: ['/obrazy/sekcja-hero.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DTMS - Szkolenia UDT Krosno | Wózki Widłowe, Podesty, Suwnice',
    description: 'Profesjonalne kursy UDT w Krośnie. Szkolimy operatorów wózków widłowych, podestów ruchomych, suwnic i HDS.',
    images: ['/obrazy/sekcja-hero.webp'],
  },
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
};

export const viewport = {
  themeColor: '#2563EB',
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({ children }) {
  const lang = 'pl';
  const dict = getDictionary(lang);
  
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        {/* Preconnect — szybkość ładowania */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

        {/* Critical Consent Script (Synchronous to avoid race conditions) */}
        <script
          id="init-cm"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                analytics_storage: 'denied',
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                wait_for_update: 500
              });
            `,
          }}
        />

        {/* Delayed Tracking Scripts for Mobile Performance (TBT Optimization) */}
        <Script id="delayed-tracking" strategy="afterInteractive">
          {`
            (function() {
              const loadTracking = () => {
                // Google Tag Manager
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-MPR92CBK');

                // Global Site Tag (gtag.js) - Google Ads
                var script = document.createElement('script');
                script.src = "https://www.googletagmanager.com/gtag/js?id=AW-10994185310";
                script.async = true;
                document.head.appendChild(script);
                window.dataLayer = window.dataLayer || [];
                gtag('js', new Date());
                gtag('config', 'AW-10994185310');
              };

              // Delay by 3.5 seconds or when idle to free main thread for mobile
              if ('requestIdleCallback' in window) {
                requestIdleCallback(() => setTimeout(loadTracking, 3000));
              } else {
                setTimeout(loadTracking, 4000);
              }
            })();
          `}
        </Script>

        {/* Google Ads — Conversion Tracking Function (Ready immediately but logic delayed) */}
        <Script id="gtag-conversion" strategy="afterInteractive">
          {`
            function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') { window.location = url; }
              };
              if (window.gtag) {
                gtag('event', 'conversion', {
                  'send_to': 'AW-10994185310/tsPDCJjQvcoZEN7ot_oo',
                  'event_callback': callback
                });
              } else {
                callback();
              }
              return false;
            }
          `}
        </Script>

        {/* PWA — Service Worker (Delayed) */}
        <Script id="sw-register" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
              setTimeout(() => {
                navigator.serviceWorker.register('/sw.js')
                  .catch(function(err) { console.log('SW failed:', err); });
              }, 5000);
            }
          `}
        </Script>

        {/* JSON-LD Structured Data */}
        <Script id="json-ld-navigation" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": [
              { "@type": "SiteNavigationElement", "position": 1, "name": "Start", "url": "https://szkoleniadtms.pl/pl/" },
              { "@type": "SiteNavigationElement", "position": 2, "name": "Nasze usługi", "url": "https://szkoleniadtms.pl/pl/uslugi/" },
              { "@type": "SiteNavigationElement", "position": 3, "name": "Kontakt", "url": "https://szkoleniadtms.pl/pl/#kontakt" }
            ]
          })}
        </Script>
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-MPR92CBK"
            height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}
            title="GTM"
          ></iframe>
        </noscript>
        <Navbar dict={dict} lang={lang} />
        <main className="flex-grow pt-24">
          {children}
        </main>
        <Footer dict={dict} lang={lang} />
        <CookieConsent dict={dict} />
        <PageViewTracker />
        <ScrollDepthTracker />
      </body>
    </html>
  );
}
