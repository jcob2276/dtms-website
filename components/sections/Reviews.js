'use client';
import { useRef } from 'react';
import { Star, MessageSquarePlus, ChevronLeft, ChevronRight } from 'lucide-react';
import { trackReviewClick } from '@/lib/analytics';

const reviews = [
  { 
    name: "Konrad Marczak", 
    date: "maj 2026", 
    text: "Kurs na wózki widłowe przeprowadzony profesjonalnie, bez zbędnych rzeczy, zdane za pierwszym razem 10/10", 
    initials: "KM",
    color: "bg-slate-500"
  },
  { 
    name: "Józef Urban", 
    date: "maj 2026", 
    text: "Bardzo rzetelnie przeprowadzone szkolenie, świetny wykładowca. Jednym słowem profeska", 
    initials: "JU",
    color: "bg-teal-600"
  },
  { 
    name: "Magdalena Jakubasz", 
    date: "maj 2026", 
    text: "Polecam. Wiedza przekazana na najwyższym poziomie. Zbigniew J.", 
    initials: "MJ",
    color: "bg-amber-800"
  },
  { 
    name: "Maciek Koczwara", 
    date: "maj 2026", 
    text: "Dziś w wieku 57 lat ukończyłem z pozytywnym wynikiem kurs szkolenie prowadził Pan Marek Soboń. Super gość który potrafi wszystko w luźny sposób wytłumaczyć.", 
    initials: "MK",
    color: "bg-blue-600"
  },
  { 
    name: "Sławomir Stasz", 
    date: "maj 2026", 
    text: "Szybko, sprawnie i profesjonalnie. Kurs na wózki I WJO zdany za pierwszym podejściem. Polecam.", 
    initials: "SS",
    color: "bg-emerald-600"
  },
  { 
    name: "Dominik Data", 
    date: "maj 2026", 
    text: "Polecam. Profesjonalny ośrodek szkolenia. Zajęcia teoretyczne i praktyczne prowadzone \"na luzie\" ale bardzo merytoryczne.", 
    initials: "DD",
    color: "bg-indigo-600"
  },
  { 
    name: "Marek Grzesik", 
    date: "kwiecień 2026", 
    text: "Profesjonalnie, zwięźle i na temat. Serdecznie Polecam!", 
    initials: "MG",
    color: "bg-rose-600"
  },
  { 
    name: "Krzysztof Budyń", 
    date: "marzec 2026", 
    text: "Dnia 09.03.26 zdałem egzamin podesty ruchome, a 23.03.26 zdałem żurawie przenośne, oczywiście dzięki naukom pana Marka który jest bardzo oddany swojej pracy.", 
    initials: "KB",
    color: "bg-cyan-600"
  },
  { 
    name: "Michał Zahorski", 
    date: "marzec 2026", 
    text: "Witam. Jestem świeżo po zdanym kursie na 1WJO. Pełen profesjonalizm Pana Marka pozwolił mi przygotować się perfekcyjnie do egzaminu. Szczerze polecam.", 
    initials: "MZ",
    color: "bg-violet-600"
  },
  { 
    name: "Artur Warywoda", 
    date: "luty 2026", 
    text: "Polecam Pana Marka profesjonelne podejscie do szkolenia wszystko wyjasnione w drobnym szczegole teoria jak i praktyka.", 
    initials: "AW",
    color: "bg-orange-600"
  },
  { 
    name: "Tomasz Nowak", 
    date: "styczeń 2026", 
    text: "Miałem przyjemność uczestniczyć w kursie na wózki specjalizowane. Pan Marek posiada ogromną wiedzę i potrafi ją przekazać.", 
    initials: "TN",
    color: "bg-sky-600"
  }
];

export default function Reviews({ dict, lang }) {
  const containerRef = useRef(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -324, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 324, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="container px-6">
        {/* Centered Button Above Reviews */}
        <div className="flex flex-col items-center mb-12 gap-8">
          <a 
            href="https://g.page/r/CaKUQEJ9fW54EB0/review" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => trackReviewClick()}
            aria-label="Wystaw opinię w Google Maps"
            className="inline-flex items-center gap-4 px-10 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-bold text-sm hover:shadow-xl hover:text-blue-600 hover:border-blue-400 transition-all group scale-110"
            style={{ fontFamily: 'Verdana, Geneva, sans-serif' }}
          >
            <MessageSquarePlus size={20} className="group-hover:rotate-12 transition-transform text-blue-500" />
            {dict.reviews.title}
          </a>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={scrollLeft}
              className="p-3 rounded-full border border-slate-100 hover:bg-slate-50 transition-colors shadow-sm"
              aria-label="Poprzednia opinia"
            >
              <ChevronLeft size={24} className="text-slate-400" />
            </button>
            <button 
              onClick={scrollRight}
              className="p-3 rounded-full border border-slate-100 hover:bg-slate-50 transition-colors shadow-sm"
              aria-label="Następna opinia"
            >
              <ChevronRight size={24} className="text-slate-400" />
            </button>
          </div>
        </div>

        {/* CSS Marquee Container */}
        <div className="relative overflow-hidden group">
          <div 
            ref={containerRef}
            className="flex py-4 marquee-container"
          >
            <div className="marquee-content flex gap-6 animate-marquee group-hover:pause">
              {/* First set */}
              {reviews.map((review, i) => (
                <ReviewCard key={`r1-${i}`} review={review} />
              ))}
              {/* Second set for seamless loop */}
              {reviews.map((review, i) => (
                <ReviewCard key={`r2-${i}`} review={review} />
              ))}
            </div>
          </div>
          
          {/* Gradient Overlays */}
          <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
          <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
        </div>
      </div>
      
      <style jsx>{`
        .marquee-container {
          overflow: hidden;
          width: 100%;
        }
        .marquee-content {
          width: max-content;
          display: flex;
        }
        .animate-marquee {
          animation: marquee 80s linear infinite;
        }
        .pause {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}

function ReviewCard({ review }) {
  return (
    <div 
      className="w-[300px] flex-shrink-0 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center relative hover:shadow-md transition-shadow"
    >
      <div className="relative mb-3">
        <div className={`w-12 h-12 ${review.color} rounded-full flex items-center justify-center text-white font-bold text-base shadow-inner`}>
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

      <h3 className="font-bold text-slate-800 text-sm mb-0.5" style={{ fontFamily: 'Verdana, Geneva, sans-serif' }}>
        {review.name}
      </h3>
      <p className="text-[10px] text-slate-500 mb-3">{review.date}</p>
      
      <div className="flex gap-0.5 mb-3 text-yellow-400">
        {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />) }
        <div className="ml-1 w-3.5 h-3.5 bg-blue-500 rounded-full flex items-center justify-center text-white">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
      </div>

      <p className="text-slate-600 text-[11px] font-medium leading-relaxed italic line-clamp-4">
        &ldquo;{review.text}&rdquo;
      </p>
    </div>
  );
}
