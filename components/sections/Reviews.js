'use client';
import { motion } from 'framer-motion';
import { Star, MessageSquarePlus } from 'lucide-react';
import { trackReviewClick } from '@/lib/analytics';

const reviews = [
  { 
    name: "Konrad Marczak", 
    date: "2 dni temu", 
    text: "Kurs na wózki widłowe przeprowadzony profesjonalnie, bez zbędnych rzeczy, zdane za pierwszym razem 10/10", 
    initials: "KM",
    color: "bg-slate-500"
  },
  { 
    name: "Józef Urban", 
    date: "2 tygodnie temu", 
    text: "Bardzo rzetelnie przeprowadzone szkolenie, świetny wykładowca. Jednym słowem profeska", 
    initials: "JU",
    color: "bg-teal-600"
  },
  { 
    name: "Magdalena Jakubasz", 
    date: "2 tygodnie temu", 
    text: "Polecam. Wiedza przekazana na najwyższym poziomie. Zbigniew J.", 
    initials: "MJ",
    color: "bg-amber-800"
  }
];

export default function Reviews({ dict, lang }) {
  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="container px-6">
        <div className="flex justify-center mb-10">
          <a 
            href="https://g.page/r/CaKUQEJ9fW54EB0/review" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => trackReviewClick()}
            aria-label="Wystaw opinię w Google Maps"
            className="inline-flex items-center gap-3 px-6 py-2.5 bg-white text-slate-600 border border-slate-200 rounded-full font-bold text-xs hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200 transition-all group"
            style={{ fontFamily: 'Verdana, Geneva, sans-serif' }}
          >
            <MessageSquarePlus size={16} className="group-hover:rotate-12 transition-transform" />
            {dict.reviews.title}
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviews.map((review, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-slate-50 shadow-sm flex flex-col items-center text-center relative"
            >
              <div className="relative mb-3">
                <div className={`w-12 h-12 ${review.color} rounded-full flex items-center justify-center text-white font-bold text-base`}>
                  {review.initials}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-white rounded-full shadow flex items-center justify-center border border-slate-50">
                  <svg viewBox="0 0 24 24" className="w-3 h-3">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c3.11 0 5.72-1.03 7.63-2.81l-3.57-2.77c-.98.66-2.23 1.06-4.06 1.06-3.12 0-5.76-2.11-6.71-4.94H1.71v2.86C3.6 19.84 7.53 23 12 23z" fill="#34A853"/>
                    <path d="M5.29 13.54c-.24-.72-.38-1.48-.38-2.54s.14-1.82.38-2.54V5.6H1.71C.62 7.82 0 10.34 0 13s.62 5.18 1.71 7.4l3.58-2.86z" fill="#FBBC05"/>
                    <path d="M12 4.75c1.69 0 3.21.58 4.41 1.73l3.31-3.31C17.71 1.25 15.11 0 12 0 7.53 0 3.6 3.16 1.71 7.4L5.29 10.2c.95-2.83 3.59-4.94 6.71-4.94z" fill="#EA4335"/>
                  </svg>
                </div>
              </div>

              <h3 className="font-bold text-primary text-sm mb-0.5" style={{ fontFamily: 'Verdana, Geneva, sans-serif' }}>
                {review.name}
              </h3>
              <p className="text-[10px] text-slate-500 mb-3">{review.date}</p>
              
              <div className="flex gap-0.5 mb-3 text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />) }
                <div className="ml-1 w-3.5 h-3.5 bg-blue-500 rounded-full flex items-center justify-center text-white">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
              </div>

              <p className="text-slate-600 text-xs font-medium leading-relaxed italic">
                "{review.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
