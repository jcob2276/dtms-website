'use client';
import Link from 'next/link';
import { Phone, Mail, MapPin, ShieldCheck, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { trackPhoneClick, trackEmailClick, trackFacebookClick } from '@/lib/analytics';
import { CONTACT_INFO } from '@/lib/constants/contact';
import CityLinks from '@/components/CityLinks';


export default function Footer({ dict, lang }) {
  const currentYear = new Date().getFullYear();
  const mapEmbedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2586.643033575641!2d21.75895781570119!3d49.68233777937762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473c4f743419082f%3A0xc3b83b3e6c38703a!2sIgnacego%20%C5%81ukasiewicza%2063%2C%2038-400%20Krosno!5e0!3m2!1spl!2spl!4v1664221000000!5m2!1spl!2spl';
  const mapDirectionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=Ignacego%20%C5%81ukasiewicza%2063%2C%2038-400%20Krosno';

  return (
    <footer className="bg-[#0F172A] text-white pt-12 pb-8 relative overflow-hidden" id="kontakt">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-600/50 to-transparent"></div>

      <div className="container px-6">
        {/* Main Footer Grid - Centered items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          {/* Col 1: Contact Info - Fully Centered */}
          <div className="flex flex-col items-center text-center">
            <h4 className="text-[10px] font-black mb-8 uppercase tracking-[0.3em] text-blue-500">
              {dict.nav.contact}
            </h4>
            <div className="space-y-6 flex flex-col items-center">
              <div className="flex flex-col items-center gap-2 text-white/80 group">
                <MapPin size={18} className="text-blue-500" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold uppercase tracking-wide">{CONTACT_INFO.addressStreet}</span>
                  <span className="text-[11px] font-medium text-white/60 uppercase tracking-widest">{CONTACT_INFO.postalCode} {CONTACT_INFO.addressLocality}</span>
                </div>
              </div>

              <a href={`tel:${CONTACT_INFO.phoneFull}`} onClick={() => trackPhoneClick('footer')} className="flex flex-col items-center gap-3 text-white group">
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg">
                  <Phone size={18} />
                </div>
                <span className="text-2xl md:text-3xl font-black tracking-tighter transition-colors group-hover:text-blue-400 leading-none">{CONTACT_INFO.phone}</span>
              </a>

              <a href={`mailto:${CONTACT_INFO.email}`} onClick={() => trackEmailClick('footer')} className="flex flex-col items-center gap-2 text-white group">
                <Mail size={16} className="text-blue-500 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold opacity-70 group-hover:opacity-100 transition-opacity">{CONTACT_INFO.email}</span>
              </a>
            </div>
          </div>

          {/* Col 2: Location (Map) - Fully Centered */}
          <div className="flex flex-col items-center text-center">
            <h4 className="text-[10px] font-black mb-8 uppercase tracking-[0.3em] text-blue-500">
              Lokalizacja
            </h4>
            <div className="relative w-full max-w-[300px] h-48 rounded-2xl overflow-hidden border border-white/10 shadow-2xl group bg-slate-900">
              <a
                href={mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-0 flex flex-col items-center justify-center gap-3 p-5 text-white/80 transition-colors hover:text-white"
                aria-label="Otwórz lokalizację DTMS w Google Maps"
              >
                <MapPin size={28} className="text-blue-500" />
                <span className="text-xs font-black uppercase tracking-widest">{CONTACT_INFO.addressStreet}</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">{CONTACT_INFO.postalCode} {CONTACT_INFO.addressLocality}</span>
                <span className="mt-1 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-400">
                  Google Maps <ExternalLink size={12} />
                </span>
              </a>
              <iframe
                src={mapEmbedUrl}
                className="relative z-10 w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
                allowFullScreen
                loading="eager"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa dojazdu Google"
              ></iframe>
            </div>
            <a
              href={mapDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors"
              aria-label="Otwórz lokalizację DTMS w Google Maps"
            >
              Otwórz w Google Maps <ExternalLink size={12} />
            </a>
          </div>

          {/* Col 3: Certificates - Fully Centered */}
          <div className="flex flex-col items-center text-center">
            <h4 className="text-[10px] font-black mb-8 uppercase tracking-[0.3em] text-blue-500">
              {dict.common.certificates}
            </h4>
            <div className="relative w-full max-w-[240px] transition-transform hover:scale-105 duration-500">
              <Image
                src="/obrazy/certyfikat.webp"
                alt="Certyfikat ISO"
                width={400}
                height={300}
                className="rounded-2xl border border-white/10 shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>

        <CityLinks lang={lang} />

        {/* Bottom Bar - Centered Content */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
            <p>© {currentYear} DTMS Marek Soboń</p>
            <Link href={`/${lang}/polityka-prywatnosci`} className="hover:text-white transition-colors underline underline-offset-4 decoration-white/10">
              {dict.common.privacy}
            </Link>
            <a href={CONTACT_INFO.facebook} onClick={() => trackFacebookClick()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#1877F2] transition-colors group">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              Facebook
            </a>
          </div>

          <div className="flex items-center gap-2 text-white/60 text-[9px] font-black bg-white/5 px-4 py-2 rounded-full border border-white/5">
            <ShieldCheck size={12} className="text-emerald-500" />
            <span>{dict.common.safe_training}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
