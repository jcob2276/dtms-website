'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, X, ShieldCheck, BarChart2 } from 'lucide-react';
import { trackCookieConsent } from '@/lib/analytics';

const translations = {
  pl: {
    title: 'Używamy plików cookie',
    desc: 'Używamy plików cookie do analizy ruchu i optymalizacji reklam (Google Analytics, Google Ads). Możesz zaakceptować wszystkie lub tylko niezbędne.',
    accept: 'Akceptuj wszystkie',
    reject: 'Tylko niezbędne',
    privacy: 'Polityka prywatności',
    badge: 'RODO',
  },
  en: {
    title: 'We use cookies',
    desc: 'We use cookies to analyse traffic and optimise ads (Google Analytics, Google Ads). You can accept all or only essential cookies.',
    accept: 'Accept all',
    reject: 'Essential only',
    privacy: 'Privacy Policy',
    badge: 'GDPR',
  },
  ua: {
    title: 'Ми використовуємо файли cookie',
    desc: 'Ми використовуємо файли cookie для аналізу трафіку та оптимізації реклами. Ви можете прийняти всі або лише необхідні.',
    accept: 'Прийняти всі',
    reject: 'Лише необхідні',
    privacy: 'Політика конфіденційності',
    badge: 'GDPR',
  },
};

function updateGoogleConsent(granted) {
  if (typeof window === 'undefined' || typeof window.gtag === 'undefined') return;
  window.gtag('consent', 'update', {
    analytics_storage: granted ? 'granted' : 'denied',
    ad_storage: granted ? 'granted' : 'denied',
    ad_user_data: granted ? 'granted' : 'denied',
    ad_personalization: granted ? 'granted' : 'denied',
  });
}

export default function CookieConsent({ lang = 'pl' }) {
  const [visible, setVisible] = useState(false);
  const t = translations[lang] || translations.pl;

  useEffect(() => {
    try {
      const consent = localStorage.getItem('dtms_cookie_consent');
      if (!consent) {
        // Small delay so it doesn't flash immediately on load
        const timer = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(timer);
      }
      // Restore previous consent to GTM Consent Mode
      if (consent === 'granted') {
        updateGoogleConsent(true);
      } else {
        updateGoogleConsent(false);
      }
    } catch (e) {
      console.warn('CookieConsent: localStorage access failed', e);
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('dtms_cookie_consent', 'granted');
    } catch (e) {
      console.warn('CookieConsent: Failed to save consent', e);
    }
    updateGoogleConsent(true);
    trackCookieConsent('accepted');
    setVisible(false);
  };

  const handleReject = () => {
    try {
      localStorage.setItem('dtms_cookie_consent', 'denied');
    } catch (e) {
      console.warn('CookieConsent: Failed to save consent', e);
    }
    updateGoogleConsent(false);
    trackCookieConsent('rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6 animate-in slide-in-from-bottom duration-500"
    >
      <div className="max-w-4xl mx-auto bg-[#0F172A] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 p-5 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">

          {/* Icon + Text */}
          <div className="flex items-start gap-4 flex-1">
            <div className="w-10 h-10 bg-blue-600/20 border border-blue-500/30 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
              <Cookie size={20} className="text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="text-white font-bold text-sm">{t.title}</p>
                <span className="text-[9px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full uppercase tracking-widest">
                  {t.badge}
                </span>
              </div>
              <p className="text-white/50 text-xs leading-relaxed">
                {t.desc}{' '}
                <Link
                  href={`/${lang}/polityka-prywatnosci`}
                  className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
                >
                  {t.privacy}
                </Link>
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleReject}
              className="flex items-center gap-2 px-4 py-2.5 text-white/50 hover:text-white border border-white/10 hover:border-white/20 rounded-xl text-xs font-bold transition-all"
            >
              <ShieldCheck size={14} />
              {t.reject}
            </button>
            <button
              onClick={handleAccept}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-900/50"
            >
              <BarChart2 size={14} />
              {t.accept}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
