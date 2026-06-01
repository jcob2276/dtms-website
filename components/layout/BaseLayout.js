import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/CookieConsent";
import PageViewTracker from "@/components/PageViewTracker";
import ScrollDepthTracker from "@/components/ScrollDepthTracker";
import SEOSchemas from "@/components/SEOSchemas";
import HtmlLang from "@/components/layout/HtmlLang";

export default function BaseLayout({ children, lang, dict }) {
  return (
    <>
      <HtmlLang lang={lang} />
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-MPR92CBK"
          height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}
          title="GTM"
        />
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
    </>
  );
}
