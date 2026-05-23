'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  const getLang = () => {
    if (typeof window === 'undefined') return 'pl';
    const path = window.location.pathname;
    if (path.startsWith('/en')) return 'en';
    if (path.startsWith('/ua')) return 'ua';
    return 'pl';
  };

  useEffect(() => {
    const lang = getLang();
    const timer = setTimeout(() => {
      router.replace(`/${lang}`);
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />

      <div className="max-w-2xl w-full text-center relative z-10">
        <h1 className="text-[120px] md:text-[180px] font-black text-white/5 leading-none select-none">
          404
        </h1>

        <div className="mt-[-40px] md:mt-[-60px]">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">
            Ups! Strona nie istnieje
          </h2>
          <p className="text-slate-400 text-lg mb-4 max-w-md mx-auto font-medium">
            Przepraszamy, ale strona której szukasz została przeniesiona lub nigdy nie istniała.
          </p>
          <p className="text-blue-500/50 text-sm mb-12 font-bold animate-pulse uppercase tracking-widest">
            Automatyczne przekierowanie za 3 sekundy...
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/${getLang()}`}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3"
            >
              <Home size={20} />
              Strona główna
            </Link>

            <button
              onClick={() => window.history.back()}
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3"
            >
              <ArrowLeft size={20} />
              Wróć
            </button>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-white/5">
          <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">
            DTMS Szkolenia Techniczne
          </p>
        </div>
      </div>
    </div>
  );
}
