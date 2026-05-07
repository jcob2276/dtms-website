'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function FireBrigade({ dict, lang }) {
  return (
    <section className="py-8 bg-white overflow-hidden">
      <div className="container px-6">
        {/* Full Image with Text Overlay */}
        <div className="relative w-full max-w-5xl mx-auto rounded-[2rem] overflow-hidden shadow-2xl">
          <picture>
            <source media="(max-width: 768px)" srcSet="/obrazy/strazak-mobile.webp" />
            <img 
              src="/obrazy/strazak.webp" 
              alt={dict.fire.title} 
              className="w-full h-auto object-contain rounded-[2rem]"
              loading="lazy"
            />
          </picture>
          
          {/* Overlay Text - Straight line at the top, no colors */}
          <div className="absolute top-4 left-0 w-full text-center">
            <div className="inline-block bg-black/60 backdrop-blur-sm px-6 py-2 rounded-full border border-white/10">
              <p className="text-[10px] md:text-sm font-black text-white uppercase tracking-[0.2em]" style={{ fontFamily: 'Verdana, Geneva, sans-serif' }}>
                {dict.fire.desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
