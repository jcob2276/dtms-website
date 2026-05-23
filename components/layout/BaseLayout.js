import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Script from "next/script";
import CookieConsent from "@/components/CookieConsent";
import PageViewTracker from "@/components/PageViewTracker";
import ScrollDepthTracker from "@/components/ScrollDepthTracker";
import { Inter } from 'next/font/google';
import SEOSchemas from "@/components/SEOSchemas";

const inter = Inter({ subsets: ['latin', 'latin-ext'], display: 'swap' });

export default function BaseLayout({ children, lang, dict }) {
  const htmlLang = lang === 'ua' ? 'uk' : lang;

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

        <link rel="preload" as="image" href="/obrazy/sekcja-hero-mobile.webp" media="(max-width: 768px)" fetchPriority="high" />
        <link rel="preload" as="image" href="/obrazy/sekcja-hero.webp" media="(min-width: 769px)" fetchPriority="high" />

        <script
          id="init-cm"
          suppressHydrationWarning
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

        <Script id="delayed-tracking" strategy="afterInteractive">
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
                gtag('config', 'AW-10994185310', { 'allow_enhanced_conversions': true });
              };

              if ('requestIdleCallback' in window) {
                requestIdleCallback(() => setTimeout(loadTracking, 3000));
              } else {
                setTimeout(loadTracking, 4000);
              }
            })();
          `}
        </Script>

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
        <CookieConsent lang={lang} />
        <PageViewTracker />
        <ScrollDepthTracker />
        <SEOSchemas lang={lang} dict={dict} />
      </body>
    </html>
  );
}
