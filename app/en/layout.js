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
  title: "DTMS - UDT Training Krosno | Forklifts, Platforms, Cranes",
  description: "Professional UDT courses in Krosno. We train operators of forklifts, mobile platforms, cranes, and HDS. Check dates!",
  keywords: "UDT training Krosno, forklift courses Krosno, mobile platform training, gas cylinder filling, DTMS",
  authors: [{ name: "DTMS Marek Soboń" }],
  metadataBase: new URL('https://szkoleniadtms.pl'),
  alternates: {
    canonical: '/en',
    languages: {
      'pl-PL': '/pl',
      'en-US': '/en',
      'uk-UA': '/ua',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://szkoleniadtms.pl/en',
    siteName: 'DTMS Technical Training',
    title: 'DTMS - UDT Training Krosno | Forklifts, Platforms, Cranes',
    description: 'Professional UDT courses in Krosno. We train operators of forklifts, mobile platforms, cranes, and HDS.',
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
  const lang = 'en';
  const dict = getDictionary(lang);
  
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

        <script
          id="init-cm-en"
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

        <Script id="delayed-tracking-en" strategy="afterInteractive">
          {`
            (function() {
              const loadTracking = () => {
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-MPR92CBK');

                var script = document.createElement('script');
                script.src = "https://www.googletagmanager.com/gtag/js?id=AW-10994185310";
                script.async = true;
                document.head.appendChild(script);
                window.dataLayer = window.dataLayer || [];
                gtag('js', new Date());
                gtag('config', 'AW-10994185310');
              };

              if ('requestIdleCallback' in window) {
                requestIdleCallback(() => setTimeout(loadTracking, 3000));
              } else {
                setTimeout(loadTracking, 4000);
              }
            })();
          `}
        </Script>

        <Script id="sw-register-en" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
              setTimeout(() => {
                navigator.serviceWorker.register('/sw.js')
                  .catch(function(err) { console.log('SW failed:', err); });
              }, 5000);
            }
          `}
        </Script>

        <Script id="json-ld-navigation-en" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": [
              { "@type": "SiteNavigationElement", "position": 1, "name": "Start", "url": "https://szkoleniadtms.pl/en/" },
              { "@type": "SiteNavigationElement", "position": 2, "name": "Services", "url": "https://szkoleniadtms.pl/en/uslugi/" },
              { "@type": "SiteNavigationElement", "position": 3, "name": "Contact", "url": "https://szkoleniadtms.pl/en/#kontakt" }
            ]
          })}
        </Script>
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
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
