'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, MonitorPlay, ArrowRight, Home } from 'lucide-react';
import Image from 'next/image';
import { trackNavClick, trackLanguageSwitch, trackPlatformClick } from '@/lib/analytics';

const locales = [
  { id: 'pl', label: 'PL' },
  { id: 'en', label: 'EN' },
  { id: 'ua', label: 'UA' }
];

export default function Navbar({ dict, lang }) {
  const [mobileMenu, setMobileMenu] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isSubpage = pathname !== `/${lang}` && pathname !== `/${lang}/`;

  const switchLanguage = (newLang) => {
    if (newLang !== lang) {
      trackLanguageSwitch(lang, newLang);
      const segments = pathname.split('/');
      segments[1] = newLang;
      router.push(segments.join('/'));
    }
  };

  return (
    <nav className={`fixed top-0 w-full ${mobileMenu ? 'z-[10000]' : 'z-[1000]'} bg-primary/95 h-24 border-b border-white/5`}>
      <div className="container h-full flex justify-between items-center px-6">
        {/* Logo */}
        <Link href={`/${lang}`} className="relative h-16 w-56 transition-transform hover:scale-105">
          <Image
            src="/obrazy/logo-biale.webp"
            alt="DTMS - Szkolenia Techniczne Krosno - Logo"
            fill
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          {isSubpage && (
            <Link
              href={`/${lang}`}
              className="flex items-center gap-2 text-blue-400 hover:text-white font-black transition-colors text-sm uppercase tracking-widest"
            >
              <Home size={18} />
              STRONA GŁÓWNA
            </Link>
          )}

          <Link
            href={`/${lang}/uslugi`}
            onClick={() => trackNavClick('services')}
            className="text-white/80 hover:text-white font-bold transition-colors text-sm uppercase tracking-widest"
          >
            {dict.nav.services}
          </Link>
          <Link
            href="#kontakt"
            onClick={() => trackNavClick('contact')}
            className="text-white/80 hover:text-white font-bold transition-colors text-sm uppercase tracking-widest"
          >
            {dict.nav.contact}
          </Link>

          <a
            href="https://platforma.szkoleniadtms.pl/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackPlatformClick()}
            className="flex items-center gap-3 px-6 py-2.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all group"
          >
            <MonitorPlay size={18} className="text-blue-400" />
            <span className="text-white text-xs font-black uppercase tracking-widest">{dict.nav.elearning}</span>
          </a>

          {/* Language Switcher */}
          <div className="flex gap-2 p-1.5 bg-white/5 rounded-full border border-white/10">
            {locales.map((l) => (
              <button
                key={l.id}
                onClick={() => switchLanguage(l.id)}
                className={`px-3 py-1 rounded-full text-[10px] font-black transition-all ${lang === l.id ? 'bg-blue-600 text-white' : 'text-white/60 hover:text-white'}`}
                aria-label={`Zmień język na ${l.label}`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white border border-white/10"
            aria-label="Menu"
          >
            {mobileMenu ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay — CSS-only animation */}
      {mobileMenu && (
        <div
          className="fixed inset-0 z-[10000] lg:hidden bg-slate-950 text-white overflow-y-auto"
          style={{ animation: 'fadeIn 0.2s ease-out', zIndex: 10000 }}
        >
          <div className="min-h-dvh flex flex-col">
            <div className="h-24 px-6 flex justify-between items-center border-b border-white/10 bg-slate-950">
              <div className="relative h-12 w-40">
                <Image src="/obrazy/logo-biale.webp" alt="DTMS" fill className="object-contain" />
              </div>
              <button
                onClick={() => setMobileMenu(false)}
                className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white border border-blue-500"
                aria-label="Zamknij menu"
              >
                <X size={28} />
              </button>
            </div>

            <div className="flex-1 px-6 py-8 flex flex-col gap-4">
              {isSubpage && (
                <Link
                  href={`/${lang}`}
                  onClick={() => setMobileMenu(false)}
                  className="flex items-center justify-between p-5 rounded-2xl bg-blue-600 border border-blue-500 text-base font-black text-white uppercase tracking-widest shadow-lg shadow-blue-600/20"
                >
                  <div className="flex items-center gap-3">
                    <Home size={20} className="text-white" />
                    <span>STRONA GŁÓWNA</span>
                  </div>
                </Link>
              )}

              <Link
                href={`/${lang}/uslugi`}
                onClick={() => { setMobileMenu(false); trackNavClick('mobile_services'); }}
                className="flex items-center justify-between p-5 rounded-2xl bg-blue-600 border border-blue-500 text-base font-black text-white uppercase tracking-widest shadow-lg shadow-blue-600/20"
              >
                <span>{dict.nav.services}</span>
                <ArrowRight size={20} className="text-white" />
              </Link>
              <Link
                href="#kontakt"
                onClick={() => { setMobileMenu(false); trackNavClick('mobile_contact'); }}
                className="flex items-center justify-between p-5 rounded-2xl bg-blue-600 border border-blue-500 text-base font-black text-white uppercase tracking-widest shadow-lg shadow-blue-600/20"
              >
                <span>{dict.nav.contact}</span>
                <ArrowRight size={20} className="text-white" />
              </Link>
              <a
                href="https://platforma.szkoleniadtms.pl/"
                onClick={() => trackPlatformClick()}
                className="flex items-center justify-between p-5 rounded-2xl bg-blue-600 border border-blue-500 text-base font-black text-white uppercase tracking-widest shadow-lg shadow-blue-600/20"
              >
                <span>{dict.nav.elearning}</span>
                <MonitorPlay size={20} className="text-white" />
              </a>
            </div>

            <div className="p-6 border-t border-white/10 bg-white/[0.03]">
              <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                Wybierz język / Select language
              </p>
              <div className="flex gap-2">
                {locales.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => {
                      switchLanguage(l.id);
                      setMobileMenu(false);
                    }}
                    className={`flex-1 py-4 rounded-xl text-xs font-black transition-all border ${
                      lang === l.id
                        ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20'
                        : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </nav>
  );
}
