import React from 'react';
import { MapPin, Globe, Zap, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { SERVICE_REGIONS, ZIP_CODES } from '../../constants/serviceArea';

const ServiceArea = () => {
  return (
    <section className="section bg-slate-50 relative overflow-hidden py-24">

      <div className="container relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-black text-[10px] mb-6 uppercase tracking-widest"
          >
            <Globe size={12} />
            <span>Zasięg Usług</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary mb-8 tracking-tight">
            Gdzie <span className="text-accent">szkolimy?</span>
          </h2>
          <div className="w-24 h-2 bg-accent mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto font-medium">
            Nasze mobilne jednostki szkoleniowe docierają do kluczowych stref przemysłowych i miast w promieniu 100 km od Krosna.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICE_REGIONS.map((region, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                <MapPin size={24} />
              </div>
              <h4 className="text-xl font-black text-primary mb-4">{region.name}</h4>
              <div className="flex flex-col gap-2">
                {region.zones.map((zone, j) => (
                  <div key={j} className="flex items-center gap-2 text-slate-400 text-sm font-bold">
                    <Zap size={14} className="text-accent/50" />
                    <span>{zone}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-300">
                <span>Kod pocztowy</span>
                <span className="text-accent">{region.zip}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* SEO Tag Cloud - Subtle footer in the section */}
        <div className="mt-20 pt-12 border-t border-slate-200/50">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-8 text-center">Obsługiwane kody pocztowe (Local SEO Area)</p>
          <div className="flex flex-wrap justify-center gap-3 opacity-30 hover:opacity-60 transition-opacity duration-500">
            {ZIP_CODES.map((zip, i) => (
              <span key={i} className="text-[10px] font-bold text-slate-500 border border-slate-200 px-2 py-1 rounded">
                {zip}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-[0.03]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary rounded-full blur-[150px]"></div>
      </div>
    </section>
  );
};

export default ServiceArea;
