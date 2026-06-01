import { Inter, Outfit } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'latin-ext'], display: 'swap' });
const outfit = Outfit({ subsets: ['latin'], display: 'swap', variable: '--font-display' });

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning className={outfit.variable}>
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
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});`,
          }}
        />
        <Script id="delayed-tracking" strategy="afterInteractive">{`
          (function(){var load=function(){(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MPR92CBK');var s=document.createElement('script');s.src="https://www.googletagmanager.com/gtag/js?id=AW-10994185310";s.async=true;document.head.appendChild(s);window.dataLayer=window.dataLayer||[];gtag('js',new Date());gtag('config','AW-10994185310',{allow_enhanced_conversions:true});};if('requestIdleCallback'in window){requestIdleCallback(function(){setTimeout(load,3000);})}else{setTimeout(load,4000);}})();
        `}</Script>
        <Script id="gtag-conversion" strategy="afterInteractive">{`
          function gtag_report_conversion(url){var callback=function(){if(typeof(url)!='undefined'){window.location=url;}};if(window.gtag){gtag('event','conversion',{'send_to':'AW-10994185310/tsPDCJjQvcoZEN7ot_oo','event_callback':callback});}else{callback();}return false;}
        `}</Script>
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
