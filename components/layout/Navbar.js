'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, MonitorPlay, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

  const switchLanguage = (newLang) => {
    if (newLang !== lang) {
      trackLanguageSwitch(lang, newLang);
      const segments = pathname.split('/');
      segments[1] = newLang;
      router.push(segments.join('/'));
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-[1000] bg-primary/95 backdrop-blur-md h-24 border-b border-white/5`}>
      <div className="container h-full flex justify-between items-center px-6">
        {/* Logo */}
        <Link href={`/${lang}`} className="relative h-16 w-56 transition-transform hover:scale-105">
          <Image 
            src="/obrazy/logo-biale.webp" 
            alt="DTMS Logo" 
            fill 
            className="object-contain"
            priority
            fetchPriority="high"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          <Link href={`/${lang}/uslugi`} onClick={() => trackNavClick('services')} className="text-white/80 hover:text-white font-bold transition-colors text-sm uppercase tracking-widest">
            {dict.nav.services}
          </Link>
          <Link href="#kontakt" onClick={() => trackNavClick('contact')} className="text-white/80 hover:text-white font-bold transition-colors text-sm uppercase tracking-widest">
            {dict.nav.contact}
          </Link>
          
          <a href="https://szkoleniadtms.vercel.app/" target="_blank" rel="noopener noreferrer" onClick={() => trackPlatformClick()} className="flex items-center gap-3 px-6 py-2.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all group">
            <MonitorPlay size={18} className="text-blue-400" />
            <span className="text-white text-xs font-black uppercase tracking-widest">{dict.nav.elearning}</span>
          </a>

          {/* Language Switcher */}
          <div className="flex gap-2 p-1.5 bg-white/5 rounded-full border border-white/10">
            {locales.map((l) => (
              <button
                key={l.id}
                onClick={() => switchLanguage(l.id)}
                className={`px-3 py-1 rounded-full text-[10px] font-black transition-all ${lang === l.id ? 'bg-blue-600 text-white' : 'text-white/40 hover:text-white'}`}
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenu && (
          <div className="fixed inset-0 z-[9999] lg:hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenu(false)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }} 
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 w-[85%] max-w-sm h-full bg-[#0F172A] shadow-2xl flex flex-col"
            >
              <div className="p-8 flex justify-between items-center border-b border-white/5">
                <div className="relative h-10 w-32">
                  <Image src="/obrazy/logo-biale.webp" alt="DTMS" fill className="object-contain" />
                </div>
                <button 
                  onClick={() => setMobileMenu(false)}
                  className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white"
                  aria-label="Zamknij menu"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-8 flex flex-col gap-6">
                <Link 
                  href={`/${lang}/uslugi`} 
                  onClick={() => { setMobileMenu(false); trackNavClick('mobile_services'); }}
                  className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 text-base font-black text-white uppercase tracking-widest"
                >
                  <span>{dict.nav.services}</span>
                  <ArrowRight size={20} className="text-blue-500" />
                </Link>
                <Link 
                  href="#kontakt" 
                  onClick={() => { setMobileMenu(false); trackNavClick('mobile_contact'); }}
                  className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 text-base font-black text-white uppercase tracking-widest"
                >
                  <span>{dict.nav.contact}</span>
                  <ArrowRight size={20} className="text-blue-500" />
                </Link>
                <a 
                  href="https://szkoleniadtms.vercel.app/"
                  onClick={() => trackPlatformClick()}
                  className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10 text-white text-base font-black uppercase tracking-widest"
                >
                  <span>{dict.nav.elearning}</span>
                  <MonitorPlay size={20} className="text-blue-400" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
}
