import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  Phone, Mail, MapPin, ChevronRight, Menu, X, 
  CheckCircle2, ArrowRight, ShieldCheck, 
  Clock, Euro, Award, Users, HardHat, Calendar, Star,
  Briefcase, Zap, Flame, UserCheck, FileText, BadgeCheck,
  Send, Quote, ChevronLeft, ExternalLink, MessageCircle, ArrowUp,
  Target, GraduationCap, ThumbsUp, Facebook
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// --- Helper for orphans (Sierotki) ---
const fixOrphans = (text) => {
  return text.replace(/ (\w{1,2}) /g, ' $1\u00A0');
}

// --- Data ---

const UPCOMING_COURSES = [
  { title: "Wózek widłowy specjalizowany I WJO", date: "13.05.2026" },
  { title: "Wózek widłowy II WJO", date: "13.05.2026" },
  { title: "Napełnianie butli skroplonych i sprężonych", date: "20.05.2026" }
]

const GOOGLE_REVIEWS_DATA = [
  { name: "Paweł Janas", text: "Polecam Pana Marka. Zdane za pierwszym bez problemu 10/10", time: "4 miesiące temu", rating: 5, initial: "P", color: "#0088CC" },
  { name: "Marcin Szubra", text: "Zdecydowanie polecam !", time: "4 miesiące temu", rating: 5, initial: "M", color: "#FF4444" },
  { name: "Marcin Kaczkowski", text: "Super ,perfekcyjnie, polecam.", time: "4 miesiące temu", rating: 5, initial: "M", color: "#AA44CC" },
  { name: "Andrzej Kowalski", text: "Pełen profesjonalizm. Szkolenie na wózki widłowe przeprowadzone sprawnie.", time: "2 tygodnie temu", rating: 5, initial: "A", color: "#10B981" }
]

const DETAILED_SERVICES = [
  { id: "wozki-ii-wjo", title: "Wózki jezdniowe widłowe kat. II WJO", img: "/obrazy/wozek1.jpg", summary: "Pełne uprawnienia na wózki spalinowe i akumulatorowe z wymianą butli gazowej.", desc: fixOrphans("Szkolenie obejmuje uprawnienia na wszystkie typy wózków jezdniowych (widłowych kat. II WJO) z napędem spalinowym, akumulatorowym. Dodatkowo każdy kursant zostaje przeszkolony i otrzymuje zaświadczenie z zakresu bezpiecznej eksploatacji, użytkowania butli gazowej oraz jej bezpiecznej wymiany."), exam: "Kurs kończy się egzaminem przed państwową komisją Urzędu Dozoru Technicznego" },
  { id: "wozki-i-wjo", title: "Wózki jezdniowe specjalizowane kat. I WJO", img: "/obrazy/wozek2.jpg", summary: "Ładowarki teleskopowe oraz wózki z operatorem podnoszonym do góry.", desc: fixOrphans("Szkolenie obejmuje uprawnienia na wszystkie typy wózków jezdniowych (widłowych kat. I WJO) z napędem spalinowym, akumulatorowym ze zmiennym wysięgiem oraz operatorem podnoszonym do góry wraz z ładunkiem. Dodatkowo każdy kursant zostaje przeszkolony i otrzymuje zaświadczenie z zakresu bezpiecznej eksploatacji, użytkowania butli gazowej oraz jej bezpiecznej wymiany."), exam: "Kurs kończy się egzaminem przed państwową komisją Urzędu Dozoru Technicznego." },
  { id: "podesty", title: "Podesty ruchome przejezdne", img: "/obrazy/podest.jpg", summary: "Zwyżki, podnośniki koszowe, nożycowe i samojezdne.", desc: fixOrphans("Szkolenie obejmuje uprawnienia na wszystkie typy podestów ruchomych: wolnobieżnych, samojezdnych montowanych na pojeździe, przewoźnych z napędem spalinowym, akumulatorowym i elektrycznym."), exam: "Kurs kończy się egzaminem przed państwową komisją Urzędu Dozoru Technicznego." },
  { id: "zapinacz", title: "Zapinacz hakowy sygnalista", img: "/obrazy/zapinacz.jpg", summary: "Zasady transportu ładunków, dobór zawiesi i sygnalizacja.", desc: fixOrphans("Szkolenie obejmuje zapoznanie się z prawidłowymi zasadami transportu ładunku za pomocą urządzeń dźwignicowych, doboru zawiesi oraz sygnałów porozumiewawcze z operatorem."), exam: "Kurs kończy się egzaminem oraz wydaniem zaświadczenia zgodnego ze wzorem MEN" },
  { id: "zurawie-przenosne", title: "Żurawie przenośne (HDS)", img: "/obrazy/zurawp.jpeg", summary: "Uprawnienia na żurawie przeładunkowe oraz urządzenia leśne.", desc: fixOrphans("Szkolenie obejmuje uprawnienia na wszystkie typy żurawi przenośnych, przewoźnych i stacjonarnych. Dodatkowo umożliwia pracę na urządzeniach leśnych typu harwester i forwarder."), exam: "Kurs kończy się egzaminem przed państwową komisją Urzędu Dozoru Technicznego." },
  { id: "zurawie-stacjonarne", title: "Żurawie stacjonarne", img: "/obrazy/zurawstacj.jpg", summary: "Żurawie warsztatowe, słupowe i przyścienne.", desc: fixOrphans("Szkolenie obejmuje uprawnienia na wszystkie typy żurawi stacjonarnych, słupowych, przyściennych, warsztatowych oraz z dwoma wysięgnikami."), exam: "Kurs kończy się egzaminem przed państwową komisją Urzędu Dozoru Technicznego." },
  { id: "wozki-unoszace", title: "Wózki unoszące", img: "/obrazy/wozkiuno.png", summary: "Bezpieczna obsługa wózków prowadzonych i elektrycznych paleciaków.", desc: fixOrphans("Szkolenie obejmuje zapoznanie się z bezpieczną obsługą, eksploatacją, transportu ładunku oraz wymianą baterii w wózkach jezdniowych unoszących."), exam: "Kurs kończy się egzaminem oraz wydaniem zaświadczenia zgodnego ze wzorem MEN." },
  { id: "wymiana-butli", title: "Wymiana butli gazowych", img: "/obrazy/wymianabutli.jpg", summary: "Szkolenie z zakresu bezpiecznej eksploatacji i wymiany butli LPG.", desc: fixOrphans("Szkolenie obejmuje przygotowanie teoretyczne, praktyczne oraz zagrożenia występujące podczas eksploatacji i wymianie butli gazowych w wózkach jezdniowych."), exam: "Kurs kończy się egzaminem oraz wydaniem zaświadczenia zgodnego ze wzorem MEN z zakresu bezpiecznej eksploatacji i wymiany butli gazowych." },
  { id: "zurawie-wiezowe", title: "Żurawie wieżowe", img: "/obrazy/zuraww.jpeg", summary: "Uprawnienia na żurawie wieżowe (dźwigi budowlane) i szybkomontujące.", desc: fixOrphans("Szkolenie obejmuje uprawnienia na wszystkie typy żurawi wieżowych, szynowych oraz szybkomontujących."), exam: "Kurs kończy się egzaminem przed państwową komisją Urzędu Dozoru Technicznego." },
  { id: "dzwigi-budowlane", title: "Dźwigi budowlane", img: "/obrazy/dzwigb.jpg", summary: "Wciągarki i windy towarowo-osobowe na budowach.", desc: fixOrphans("Szkolenie obejmuje uprawnienia na wszystkie dźwigi budowlane, towarowe, towarowo – osobowe oraz uprawnia do obsługi wyciągów towarowych."), exam: "Kurs kończy się egzaminem przed państwową komisją Urzędu Dozoru Technicznego." },
  { id: "zurawie-samojezdne", title: "Żurawie samojezdne", img: "/obrazy/zurawsamo.jpeg", summary: "Duże dźwigi kołowe i gąsienicowe.", desc: fixOrphans("Szkolenie obejmuje uprawnienia na wszystkie typy żurawi samojezdnych, przenośnych, przewoźnych oraz stacjonarnych."), exam: "Kurs kończy się egzaminem przed państwową komisją Urzędu Dozoru Technicznego." },
  { id: "wozki-platformowe", title: "Wózki platformowe", img: "/obrazy/wozkiplatf.jpg", summary: "Pojazdy transportowe i ciągniki akumulatorowe.", desc: fixOrphans("Szkolenie obejmuje zapoznanie się z obsługą, eksploatacją, transportem ładunku oraz wymianą baterii w wózkach jezdniowych platformowych, ciągnikowych i pchających."), exam: "Kurs kończy się egzaminem oraz wydaniem zaświadczenia zgodnego ze wzorem MEN." },
  { id: "wyciagi-towarowe", title: "Wyciągi towarowe", img: "/obrazy/wyciagtow.jpg", summary: "Urządzenia do pionowego transportu ładunków.", desc: fixOrphans("Szkolenie obejmuje zapoznanie się z prawidłowymi zasadami obsługi, eksploatacji, montażu / demontażu urządzenia oraz bezpiecznego transportu ładunku."), exam: "Kurs kończy się egzaminem oraz wydaniem zaświadczenia zgodnego ze wzorem MEN (dla urządzeń do 250kg). Kurs kończy się egzaminem przed państwową komisją Urzędu Dozoru Technicznego (dla urządzeń pow. 250kg)." },
  { id: "dzwigi-tow-osobowe", title: "Dźwigi towarowo osobowe", img: "/obrazy/dzwigtow.jpg", summary: "Windy ze sterowaniem wewnętrznym i szpitalne.", desc: fixOrphans("Szkolenie obejmuje uprawnienia na dźwigi towarowo osobowe ze sterowaniem wewnętrznym oraz szpitalne."), exam: "Kurs kończy się egzaminem przed państwową komisją Urzędu Dozoru Technicznego." },
  { id: "suwnice", title: "Suwnice", img: "/obrazy/suwnice.jpg", summary: "Suwnice, wciągniki i wciągarki ogólnego przeznaczenia.", desc: fixOrphans("Szkolenie obejmuje uprawnienia na suwnice, wciągniki i wciągarki ogólnego oraz specjalnego przeznaczenia."), exam: "Kurs kończy się egzaminem przed państwową komisją Urzędu Dozoru Technicznego." },
  { id: "napelnianie-sprezone", title: "Napełnianie butli gazami sprężonymi", img: "/obrazy/butlesprez.png", summary: "Napełnianie butli do oddychania, nurkowych i technicznych.", desc: fixOrphans("Szkolenie obejmuje bezpieczną obsługę, eksploatację oraz procedurę napełniania butli, zbiorników ciśnieniowych gazami sprężonymi. Uprawnienia obejmują również butle do oddychania: używane do nurkowania, w straży pożarnej itp."), exam: "Kurs kończy się egzaminem przed państwową komisją Urzędu Dozoru Technicznego." },
  { id: "napelnianie-skroplone", title: "Napełnianie butli gazami skroplonymi", img: "/obrazy/gutlehazy.png", summary: "Napełnianie butli LPG, klimatyzacji i gazów skroplonych.", desc: fixOrphans("Szkolenie obejmuje bezpieczną obsługę, eksploatację oraz procedurę napełniania butli, zbiorników ciśnieniowych gazami skroplonymi metodą przelewowo wagową. Uprawnienia obejmują również butle do odzysku i napełniania klimatyzacji, LPG itp."), exam: "Kurs kończy się egzaminem przed państwową komisją Urzędu Dozoru Technicznego." }
]

// --- Components ---

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) setIsVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 w-full z-[3000] p-4 md:p-6"
        >
          <div className="max-w-6xl mx-auto bg-primary border border-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center text-accent shrink-0">
                <ShieldCheck size={28} />
              </div>
              <div className="text-left">
                <h4 className="text-white font-bold text-lg mb-1">Dbamy o Twoją prywatność</h4>
                <p className="text-white/60 text-sm leading-relaxed max-w-2xl">
                  Nasza strona wykorzystuje pliki cookies w celu poprawy komfortu użytkowania oraz analizy ruchu. 
                  Korzystając ze strony, wyrażasz zgodę na ich używanie zgodnie z naszą <Link to="/polityka-prywatnosci" className="text-accent hover:underline">Polityką Prywatności</Link>.
                </p>
              </div>
            </div>
            <button 
              onClick={accept}
              className="btn-primary whitespace-nowrap px-8 py-4 w-full md:w-auto justify-center"
            >
              Rozumiem i akceptuję
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const FloatingContact = () => {
  const [showScrollTop, setShowScrollTop] = useState(false)
  useEffect(() => { const handleScroll = () => setShowScrollTop(window.scrollY > 500); window.addEventListener('scroll', handleScroll); return () => window.removeEventListener('scroll', handleScroll) }, [])
  return (
    <div className="fixed bottom-8 left-8 flex flex-col gap-4 z-[2000] items-start">
      <AnimatePresence>{showScrollTop && <motion.button initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center text-primary border border-slate-100 hover:bg-slate-50 transition-colors"><ArrowUp size={24} /></motion.button>}</AnimatePresence>
      <a href="tel:667677912" className="w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-white bg-accent hover:scale-110 transition-all duration-300">
        <Phone size={32} />
      </a>
    </div>
  )
}

const GoogleReviewSlider = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.jotform.com/website-widgets/embed/019df8e3eb197bdf86666dcdc6c9584fa249';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="section bg-white">
      <div className="container">
        <div id="JFWebsiteWidget-019df8e3eb197bdf86666dcdc6c9584fa249"></div>
      </div>
    </section>
  );
};

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false); const location = useLocation(); const navigate = useNavigate();
  const handleContactClick = (e) => { 
    e.preventDefault(); 
    setMobileMenu(false); 
    if (location.pathname !== '/') { 
      navigate('/#kontakt'); 
    } else { 
      const element = document.getElementById('kontakt'); 
      if (element) {
        const offset = 100;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    } 
  }
  return (
    <nav className="nav-master">
      <div className="container nav-container">
        <Link to="/" className="logo-group"><img src="/obrazy/logo białe .png" alt="DTMS Logo" /><div className="logo-text"><span className="text-white">DTMS</span><span className="text-accent">SZKOLENIA TECHNICZNE</span></div></Link>
        <div className="nav-links-v4 hidden lg:flex">
          <Link to="/" className={`nav-link-v4 ${location.pathname === '/' && !location.hash ? 'active' : ''}`}>Start</Link>
          <Link to="/uslugi" className={`nav-link-v4 ${location.pathname === '/uslugi' ? 'active' : ''}`}>Nasze usługi</Link>
          <a href="#kontakt" onClick={handleContactClick} className={`nav-link-v4 ${location.hash === '#kontakt' ? 'active' : ''}`}>Kontakt</a>
          <a href="tel:667677912" className="btn-phone-v4"><Phone size={18} /> 667 677 912</a>
        </div>
        <div className="lg:hidden"><button className="text-primary p-2" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X size={32} /> : <Menu size={32} />}</button></div>
      </div>
      <AnimatePresence>{mobileMenu && <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute top-full left-0 w-full bg-white p-8 flex flex-col gap-6 shadow-2xl lg:hidden"><Link to="/" onClick={() => setMobileMenu(false)} className="text-xl font-bold">Start</Link><Link to="/uslugi" onClick={() => setMobileMenu(false)} className="text-xl font-bold">Nasze usługi</Link><a href="#kontakt" onClick={handleContactClick} className="text-xl font-bold">Kontakt</a><a href="tel:667677912" className="btn-phone-v4 justify-center">Zadzwoń: 667 677 912</a></motion.div>}</AnimatePresence>
    </nav>
  )
}

  <section className="section bg-white scroll-mt-32" id="kontakt">
    <div className="container">
      <div className="text-center mb-12 md:mb-20">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary mb-6">Masz pytania? <span className="text-accent">Napisz do nas</span></h2>
        <div className="w-24 h-2 bg-accent mx-auto mb-8 rounded-full"></div>
        <p className="text-lg md:text-xl text-slate-500">Zapisz się na kurs już dziś lub zapytaj o szczegóły.</p>
      </div>
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div className="bg-slate-50 p-8 md:p-12 rounded-[3rem] shadow-2xl border border-slate-100"><h3 className="text-3xl font-black mb-8 text-primary">Zadaj pytanie</h3><form className="flex flex-col gap-4"><div className="grid md:grid-cols-2 gap-4"><input type="text" placeholder="Imię i nazwisko" className="input-v4" required /><input type="tel" placeholder="Numer telefonu" className="input-v4" required /></div><input type="email" placeholder="Adres e-mail" className="input-v4" required /><select className="input-v4"><option>Interesujący Cię kurs</option>{DETAILED_SERVICES.map(s => <option key={s.id}>{s.title}</option>)}</select><textarea placeholder="Twoja wiadomość..." className="input-v4 min-h-[150px]" required></textarea><button type="submit" className="btn-primary w-full justify-center">Wyślij <Send size={18} /></button></form></div>
        <div className="flex flex-col gap-8">
           <div className="grid md:grid-cols-2 gap-6">
              <div className="contact-card-premium"><Phone className="text-accent mb-6" size={32} /><p className="text-xs uppercase font-bold opacity-60 mb-2 text-white">Infolinia</p><a href="tel:667677912" className="text-2xl font-black block text-white">667 677 912</a></div>
              <div className="contact-card-premium"><Mail className="text-accent mb-6" size={32} /><p className="text-xs uppercase font-bold opacity-60 mb-2 text-white">E-mail</p><a href="mailto:fhudtms@poczta.fm" className="text-lg font-black block truncate text-white">fhudtms@poczta.fm</a></div>
           </div>
           <div className="map-container-premium relative"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2586.643033575641!2d21.75895781570119!3d49.68233777937762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473c4f743419082f%3A0xc3b83b3e6c38703a!2sIgnacego%20%C5%81ukasiewicza%2063%2C%2038-400%20Krosno!5e0!3m2!1spl!2spl!4v1664221000000!5m2!1spl!2spl" className="w-full h-full border-0" allowFullScreen="" loading="lazy"></iframe><div className="absolute top-6 left-6 p-5 bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-white/20 max-w-[240px]"><div className="flex items-center gap-2 mb-2"><MapPin className="text-accent" size={16} /><span className="text-xs font-black text-primary uppercase tracking-wider">Lokalizacja</span></div><p className="text-sm text-slate-700 font-medium leading-relaxed">ul. Ignacego Łukasiewicza 63, 38-400 Krosno</p></div></div>
        </div>
      </div>
    </div>
  </section>
)

const Home = () => {
  const { hash } = useLocation(); 
  useEffect(() => { 
    if (hash === '#kontakt') { 
      setTimeout(() => {
        const element = document.getElementById('kontakt'); 
        if (element) {
          const offset = 100;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 500);
    } 
  }, [hash]);
  return (
    <div>
      <section className="hero-v4">
        <img src="/obrazy/sekcja hero.jpeg" className="hero-v4-bg" alt="" />
        <div className="hero-v4-overlay"></div>
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8 }}
              className="lg:col-span-7"
            >
              <div className="hero-v4-badge">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                Ponad 15 lat doświadczenia
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 leading-[1.1]">Profesjonalne <span className="text-accent">Szkolenia UDT</span> w Krośnie</h1>
              <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl">Zdobądź uprawnienia na wózki widłowe, podesty, suwnice i żurawie. Szkolimy na nowoczesnym sprzęcie z najwyższą zdawalnością.</p>
              
              <div className="flex flex-wrap gap-4 mb-12">
                <a href="tel:667677912" className="btn-primary px-10 relative z-50 cursor-pointer">Zapisz się na kurs <ArrowRight size={20} /></a>
                <a href="#oferta" className="btn-secondary px-10 relative z-50 cursor-pointer">Zobacz ofertę</a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="hero-glass-card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center text-accent">
                    <Calendar size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-white">Najbliższe kursy</h3>
                </div>
                
                <div className="flex flex-col gap-3 mb-8">
                  {UPCOMING_COURSES.map((c, i) => (
                    <div key={i} className="upcoming-item-v4">
                      <span className="font-bold text-white/90">{c.title}</span>
                      <span className="text-accent font-black shrink-0">{c.date}</span>
                    </div>
                  ))}
                </div>
                
                <div className="hero-card-footer">
                  <BadgeCheck size={24} className="text-emerald-400 shrink-0" />
                  <p className="text-sm text-white/70 font-medium">Możliwość zrobienia kursów ze środków EU po spełnieniu odpowiednich warunków.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section bg-white" id="oferta">
        <div className="container">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary mb-6">Nasza Oferta</h2>
            <div className="w-24 h-2 bg-accent mx-auto mb-8 rounded-full"></div>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto">Kliknij w kafelkę, aby zobaczyć szczegóły szkolenia i zakres uprawnień.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DETAILED_SERVICES.map((s, i) => (
              <Link key={i} to={`/uslugi#${s.id}`} className="offer-card group">
                <img src={s.img} className="offer-card-img group-hover:scale-110" alt={s.title} />
                <div className="offer-card-overlay">
                  <h4 className="offer-card-title group-hover:text-accent transition-colors">{s.title}</h4>
                  <p className="offer-card-summary line-clamp-3">
                    {s.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-16 text-center"><Link to="/uslugi" className="btn-primary">Zobacz pełną listę usług <ArrowRight size={24} /></Link></div>
        </div>
      </section>

      <section className="section section-dark-premium py-32 relative overflow-hidden">
        {/* Dekoracyjny gradient */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/10 to-transparent"></div>
        
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center text-left">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-accent/20 rounded-full text-accent mb-8 border border-accent/30">
                <Flame size={20} className="animate-pulse" />
                <span className="font-black text-sm uppercase tracking-widest text-accent">Oferta dla Jednostek Ratowniczych</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-[1.1]">
                Szkolenia dla <br className="hidden md:block" />
                <span className="text-accent">Straży Pożarnej</span>
              </h2>
              
              <p className="text-xl text-white opacity-90 mb-10 leading-relaxed max-w-xl">
                Wspieramy jednostki OSP i PSP w podnoszeniu kwalifikacji technicznych ratowników. Oferujemy profesjonalne pakiety szkoleniowe z zakresu obsługi urządzeń transportu bliskiego.
              </p>
              
              <div className="grid gap-5 mb-12">
                {[
                  "Napełnianie butli powietrznych ODO",
                  "Obsługa podestów ruchomych i drabin",
                  "Wózki jezdniowe i ładowarki teleskopowe",
                  "Uprawnienia hakowego i sygnalisty"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-white group">
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <CheckCircle2 size={14} />
                    </div>
                    <span className="text-lg font-bold text-white">{item}</span>
                  </div>
                ))}
              </div>
              
              <a href="tel:667677912" className="btn-primary px-12 py-5 shadow-2xl shadow-accent/20 hover:scale-105 transition-transform inline-flex">
                <Phone size={20} />
                <span className="text-primary">ZAPYTAJ O OFERTĘ DLA OSP</span>
              </a>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative z-10 rounded-[3rem] overflow-hidden border-4 border-white/20 shadow-[0_0_50px_rgba(245,158,11,0.2)]">
                <img src="/obrazy/strazak.png" alt="Szkolenia dla Strażaków" className="w-full h-auto" />
              </div>
              
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/20 blur-[100px] rounded-full"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-red-600/10 blur-[100px] rounded-full"></div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary mb-6">Kto może zostać <span className="text-accent">Operatorem?</span></h2>
            <div className="w-24 h-2 bg-accent mx-auto mb-8 rounded-full"></div>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto">Sprawdź podstawowe wymagania, które musisz spełnić, aby przystąpić do szkolenia i egzaminu UDT.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <UserCheck size={40} />, title: "Wiek", desc: "Musisz mieć ukończone 18 lat w dniu rozpoczęcia kursu." },
              { icon: <GraduationCap size={40} />, title: "Wykształcenie", desc: "Wymagane jest wykształcenie co najmniej podstawowe." },
              { icon: <ShieldCheck size={40} />, title: "Stan zdrowia", desc: "Brak przeciwwskazań zdrowotnych do obsługi urządzeń technicznych (zaświadczenie lekarskie)." }
            ].map((req, i) => (
              <div key={i} className="p-10 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
                <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center text-accent mb-8 group-hover:bg-accent group-hover:text-white transition-all">
                  {req.icon}
                </div>
                <h3 className="text-2xl font-black text-primary mb-4">{req.title}</h3>
                <p className="text-slate-600 text-lg leading-relaxed">{req.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 p-8 bg-primary rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left text-white">
              <h4 className="text-2xl font-black mb-2">Spełniasz te warunki?</h4>
              <p className="opacity-70 text-lg">Zapisz się na najbliższy termin i zdobądź uprawnienia państwowe.</p>
            </div>
            <a href="tel:667677912" className="btn-primary whitespace-nowrap">Zadzwoń: 667 677 912</a>
          </div>
        </div>
      </section>

      <GoogleReviewSlider />

      <ContactSection />
    </div>
  )
}

const ServicesPage = () => {
  const { hash } = useLocation(); useEffect(() => { if (hash && hash !== '#kontakt') { const element = document.getElementById(hash.substring(1)); if (element) element.scrollIntoView({ behavior: 'smooth' }); } else if (!hash) { window.scrollTo(0, 0); } }, [hash]);
  return (
    <div className="pt-48 pb-24 bg-white">
      <div className="container">
        <div className="mb-20 text-center"><h1 className="text-7xl font-black mb-6 text-primary">Wszystkie <span className="text-accent">Usługi</span></h1><p className="text-xl text-slate-500 max-w-2xl mx-auto">Pełen katalog szkoleń technicznych z uprawnieniami UDT oraz zaświadczeniami MEN.</p></div>
        <div className="space-y-16">
          {DETAILED_SERVICES.map((s, i) => (
            <motion.div key={i} id={s.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`p-8 md:p-12 bg-slate-50 rounded-[3rem] border border-slate-200 flex flex-col lg:flex lg:lg-row lg:lg:items-center gap-12 scroll-mt-32 ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
              <div className="service-img-container rounded-3xl overflow-hidden shadow-xl border-4 border-white mx-auto lg:mx-0"><img src={s.img} className="w-full h-full object-cover" alt={s.title} /></div>
              <div className="flex-1 text-left"><h3 className="text-4xl font-black mb-6 text-primary">{s.title}</h3><p className="text-lg text-slate-600 mb-8 leading-relaxed">{s.desc}</p><div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm"><BadgeCheck className="text-success shrink-0" size={24} /><p className="font-bold text-primary">{s.exam}</p></div></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

const PrivacyPolicy = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="pt-48 pb-24 bg-white">
      <div className="container max-w-4xl">
        <h1 className="text-5xl font-black mb-12 text-primary">Polityka prywatności</h1>
        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-8 font-medium">
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">1. Informacje ogólne</h2>
            <p>Niniejsza polityka dotyczy Serwisu www, funkcjonującego pod adresem url: <span className="font-bold">szkoleniadtms.pl</span></p>
            <p>Operatorem serwisu oraz Administratorem danych osobowych jest: <span className="font-bold">Marek Soboń ul. Krośnienska 138E 38-457 Świerzowa Polska</span></p>
            <p>Adres kontaktowy poczty elektronicznej operatora: <span className="font-bold text-accent">fhudtms@poczta.fm</span></p>
            <p>Operator jest Administratorem Twoich danych osobowych w odniesieniu do danych podanych dobrowolnie w Serwisie.</p>
            <p>Serwis wykorzystuje dane osobowe w następujących celach: Prowadzenie rozmów typu chat online, Realizacja zamówionych usług.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">2. Wybrane metody ochrony danych stosowane przez Operatora</h2>
            <p>Miejsca logowania i wprowadzania danych osobowych są chronione w warstwie transmisji (certyfikat SSL). Dane osobowe przechowywane w bazie danych są zaszyfrowane w taki sposób, że jedynie Operator posiadający klucz może je odczytać.</p>
            <p>W celu ochrony danych Operator regularnie wykonuje kopie bezpieczeństwa oraz aktualizuje oprogramowanie wykorzystywane do przetwarzania danych.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">3. Hosting</h2>
            <p>Serwis jest hostowany (technicznie utrzymywany) na serwera operatora: <span className="font-bold">hostinghause.pl</span></p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">4. Twoje prawa i dodatkowe informacje</h2>
            <p>Przysługuje Ci prawo żądania od Administratora dostępu do danych osobowych, ich sprostowania, usunięcia, ograniczenia przetwarzania oraz przenoszenia danych.</p>
            <p>Na działania Administratora przysługuje skarga do Prezesa Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">5. Pliki cookies</h2>
            <p>Serwis korzysta z plików cookies w celu utrzymania sesji użytkownika oraz realizacji celów marketingowych. Możesz zarządzać plikami cookies w ustawieniach swojej przeglądarki.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="footer-v4 pt-24 pb-12">
    <div className="container">
      <div className="grid lg:grid-cols-3 gap-16 mb-20 text-left">
        {/* Kolumna 1: O nas & Social */}
        <div className="flex flex-col items-start">
          <Link to="/" className="logo-group mb-8">
            <img src="/obrazy/logo białe .png" alt="DTMS" style={{ height: '70px' }} />
            <div className="logo-text">
              <span className="text-white block text-xl font-black leading-none">DTMS</span>
              <span className="text-accent text-xs tracking-[0.2em] font-bold uppercase">Szkolenia Techniczne</span>
            </div>
          </Link>
          <p className="text-white opacity-60 text-lg leading-relaxed mb-8">
            Najlepszy ośrodek szkolenia operatorów urządzeń transportu bliskiego w regionie. Profesjonalizm, nowoczesny sprzęt i najwyższa zdawalność.
          </p>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/Szkoleniadtms/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-all group">
              <Facebook size={24} className="group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>

        {/* Kolumna 2: Kontakt */}
        <div>
          <h4 className="text-white text-xl font-black mb-10 uppercase tracking-widest relative inline-block">
            Szybki Kontakt
            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-accent"></span>
          </h4>
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4 text-white opacity-80">
              <MapPin className="text-accent shrink-0" size={24} />
              <p className="text-lg">ul. Łukasiewicza 63, 38-400 Krosno</p>
            </div>
            <a href="tel:667677912" className="flex items-center gap-4 text-white hover:text-accent transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                <Phone size={24} />
              </div>
              <span className="text-2xl font-black">667 677 912</span>
            </a>
            <a href="mailto:fhudtms@poczta.fm" className="flex items-center gap-4 text-white opacity-80 hover:text-accent transition-colors">
              <Mail className="text-accent" size={24} />
              <span className="text-lg font-bold">fhudtms@poczta.fm</span>
            </a>
          </div>
        </div>

        {/* Kolumna 3: Zapisy */}
        <div>
          <h4 className="text-white text-xl font-black mb-10 uppercase tracking-widest relative inline-block">
            Biuro i Zapisy
            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-accent"></span>
          </h4>
          <p className="text-white opacity-60 text-lg mb-8 leading-relaxed">
            Zapisy telefoniczne oraz biuro obsługi czynne od poniedziałku do piątku w godzinach <span className="text-white font-bold">8:00 - 18:00</span>.
          </p>
          <a href="tel:667677912" className="btn-primary w-full py-5 rounded-2xl flex justify-center items-center gap-3 relative z-10 shadow-xl shadow-accent/10">
            <Phone size={20} />
            <span className="font-black text-lg">ZADZWOŃ I ZAPISZ SIĘ</span>
          </a>
        </div>
      </div>

      <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-white opacity-30 text-sm">
          © {new Date().getFullYear()} DTMS Marek Soboń. Wszystkie prawa zastrzeżone.
        </p>
        <Link to="/polityka-prywatnosci" className="text-white opacity-40 hover:opacity-100 transition-opacity text-xs uppercase font-bold tracking-widest">
          Polityka prywatności
        </Link>
      </div>
    </div>
  </footer>
)

const ScrollToTop = () => { const { pathname, hash } = useLocation(); useEffect(() => { if (!hash) window.scrollTo(0, 0) }, [pathname, hash]); return null; }
const App = () => (
  <Router>
    <ScrollToTop />
    <Navbar />
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/uslugi" element={<ServicesPage />} />
        <Route path="/polityka-prywatnosci" element={<PrivacyPolicy />} />
      </Routes>
    </main>
    <Footer />
    <FloatingContact />
    <CookieConsent />
  </Router>
)
export default App
