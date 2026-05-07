'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Phone } from 'lucide-react';
import { trackPhoneClick } from '@/lib/analytics';

export default function Hero({ dict, lang }) {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-start p-6 md:p-12">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source media="(max-width: 768px)" srcSet="/obrazy/sekcja-hero-mobile.webp" />
          <img
            src="/obrazy/sekcja-hero.webp"
            alt="DTMS Szkolenia Techniczne"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ fetchPriority: 'high' }}
          />
        </picture>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Top Left Logo - Moved up and left */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-64 md:w-[460px] mt-12 md:mt-16 -ml-2 md:-ml-4"
      >
        <Image 
          src="/obrazy/logo-biale.webp" 
          alt="DTMS Logo" 
          width={600} 
          height={300} 
          className="w-full h-auto drop-shadow-2xl"
          priority
          fetchPriority="high"
        />
      </motion.div>

      {/* Bottom Right Phone Number */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-10"
      >
        <a 
          href="tel:667677912" 
          onClick={() => trackPhoneClick('hero')}
          className="flex items-center gap-4 px-10 py-5 bg-blue-600 text-white rounded-[2rem] font-black text-2xl md:text-4xl shadow-2xl hover:bg-blue-500 hover:-translate-y-2 transition-all group border-4 border-white/20"
        >
          <Phone size={40} className="group-hover:rotate-12 transition-transform" />
          <span>667 677 912</span>
        </a>
      </motion.div>
    </section>
  );
}
