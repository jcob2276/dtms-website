import React, { useState, useEffect, createContext, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Phone, Mail, MapPin, ChevronRight, Menu, X,
  CheckCircle2, ArrowRight, ShieldCheck,
  Clock, Euro, Award, Users, HardHat, Calendar, Star,
  Briefcase, Zap, Flame, UserCheck, FileText, BadgeCheck,
  Send, Quote, ChevronLeft, ExternalLink, MessageCircle, ArrowUp,
  Target, GraduationCap, ThumbsUp, Facebook, Globe, MonitorPlay
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// --- Language Context ---
const LanguageContext = createContext();

const translations = {
  pl: {
    nav_start: 'Start',
    nav_services: 'Nasze usługi',
    nav_contact: 'Kontakt',
    nav_call: 'Zadzwoń',
    hero_title: 'Profesjonalne {accent} w Krośnie',
    hero_accent: 'Szkolenia UDT',
    hero_desc: 'Zdobądź uprawnienia na wózki widłowe, podesty, suwnice i żurawie. Szkolimy na nowoczesnym sprzęcie z najwyższą zdawalnością.',
    hero_btn_enroll: 'Zapisz się na kurs',
    hero_btn_offer: 'Zobacz ofertę',
    hero_next_courses: 'Najbliższe kursy',
    hero_eu_info: 'Możliwość zrobienia kursów ze środków EU po spełnieniu odpowiednich warunków.',
    offer_title: 'Nasza Oferta',
    offer_desc: 'Kliknij w kafelkę, aby zobaczyć szczegóły szkolenia i zakres uprawnień.',
    offer_btn_all: 'Zobacz pełną listę usług',
    fire_badge: 'Oferta dla Jednostek Ratowniczych',
    fire_title: 'Szkolenia dla {accent}',
    fire_accent: 'Straży Pożarnej',
    fire_desc: 'Wspieramy jednostki OSP i PSP w podnoszeniu kwalifikacji technicznych ratowników.',
    fire_btn: 'ZAPYTAJ O OFERTĘ DLA OSP',
    req_title: 'Kto może zostać {accent}?',
    req_accent: 'Operatorem',
    req_desc: 'Sprawdź podstawowe wymagania, które musisz spełnić, aby przystąpić do szkolenia i egzaminu UDT.',
    req_age_title: 'Wiek',
    req_age_desc: 'Musisz mieć ukończone 18 lat w dniu rozpoczęcia kursu.',
    req_edu_title: 'Wykształcenie',
    req_edu_desc: 'Wymagane jest wykształcenie co najmniej podstawowe.',
    req_health_title: 'Stan zdrowia',
    req_health_desc: 'Brak przeciwwskazań zdrowotnych do obsługi urządzeń technicznych.',
    req_ready: 'Spełniasz te warunki?',
    req_ready_desc: 'Zapisz się na najbliższy termin i zdobądź uprawnienia państwowe.',
    contact_title: 'Masz pytania? {accent}',
    contact_accent: 'Napisz do nas',
    contact_desc: 'Zapisz się na kurs już dziś lub zapytaj o szczegóły.',
    contact_form_title: 'Zadaj pytanie',
    contact_form_name: 'Imię i nazwisko',
    contact_form_phone: 'Numer telefonu',
    contact_form_email: 'Adres e-mail',
    contact_form_course: 'Interesujący Cię kurs',
    contact_form_msg: 'Twoja wiadomość...',
    contact_form_send: 'Wyślij',
    footer_about: 'Najlepszy ośrodek szkolenia operatorów urządzeń transportu bliskiego w regionie. Profesjonalizm, nowoczesny sprzęt i najwyższa zdawalność.',
    footer_office: 'Biuro i Zapisy',
    footer_office_desc: 'Zapisy telefoniczne oraz biuro obsługi czynne od poniedziałku do piątku w godzinach 8:00 - 18:00.',
    footer_call_btn: 'ZADZWOŃ I ZAPISZ SIĘ',
    footer_rights: 'Wszystkie prawa zastrzeżone.',
    privacy_policy: 'Polityka prywatności',
    cookie_title: 'Dbamy o Twoją prywatność',
    cookie_desc: 'Nasza strona wykorzystuje pliki cookies w celu poprawy komfortu użytkowania oraz analizy ruchu.',
    cookie_btn: 'Rozumiem i akceptuję',
    fire_item_1: 'Napełnianie butli powietrznych ODO',
    fire_item_2: 'Obsługa podestów ruchomych i drabin',
    fire_item_3: 'Wózki jezdniowe i ładowarki teleskopowe',
    fire_item_4: 'Uprawnienia hakowego i sygnalisty',
    services_all: 'Wszystkie',
    label_phone: 'Infolinia',
    label_email: 'E-mail',
    label_location: 'Lokalizacja',
    nav_elearning: 'Platforma E-learningowa',
    elearning_note: 'Dostępna podczas kursu'
  },
  en: {
    nav_start: 'Home',
    nav_services: 'Our Services',
    nav_contact: 'Contact',
    nav_call: 'Call',
    hero_title: 'Professional {accent} in Krosno',
    hero_accent: 'UDT Training',
    hero_desc: 'Get certified for forklifts, platforms, cranes, and hoists. We train on modern equipment with the highest pass rate.',
    hero_btn_enroll: 'Enroll now',
    hero_btn_offer: 'View offer',
    hero_next_courses: 'Upcoming courses',
    hero_eu_info: 'Possibility of financing courses through EU funds upon meeting requirements.',
    offer_title: 'Our Offer',
    offer_desc: 'Click on a card to see training details and certification scope.',
    offer_btn_all: 'View full service list',
    fire_badge: 'Offer for Emergency Units',
    fire_title: 'Training for {accent}',
    fire_accent: 'Fire Brigades',
    fire_desc: 'We support Volunteer and State Fire Departments in raising technical qualifications of rescuers.',
    fire_btn: 'ASK ABOUT FIRE DEPT OFFER',
    req_title: 'Who can become an {accent}?',
    req_accent: 'Operator',
    req_desc: 'Check the basic requirements you must meet to take the UDT training and exam.',
    req_age_title: 'Age',
    req_age_desc: 'You must be at least 18 years old on the day the course starts.',
    req_edu_title: 'Education',
    req_edu_desc: 'At least primary education is required.',
    req_health_title: 'Health',
    req_health_desc: 'No medical contraindications for operating technical equipment.',
    req_ready: 'Meet these requirements?',
    req_ready_desc: 'Sign up for the next date and get state certifications.',
    contact_title: 'Any questions? {accent}',
    contact_accent: 'Write to us',
    contact_desc: 'Sign up for a course today or ask for details.',
    contact_form_title: 'Ask a question',
    contact_form_name: 'Full Name',
    contact_form_phone: 'Phone Number',
    contact_form_email: 'Email address',
    contact_form_course: 'Interested course',
    contact_form_msg: 'Your message...',
    contact_form_send: 'Send',
    footer_about: 'The best training center for materials handling equipment operators in the region. Professionalism, modern equipment, and top pass rates.',
    footer_office: 'Office & Enrollment',
    footer_office_desc: 'Telephone registration and office open Monday to Friday from 8:00 AM to 6:00 PM.',
    footer_call_btn: 'CALL AND ENROLL',
    footer_rights: 'All rights reserved.',
    privacy_policy: 'Privacy Policy',
    cookie_title: 'We care about your privacy',
    cookie_desc: 'Our website uses cookies to improve user experience and analyze traffic.',
    cookie_btn: 'I understand and accept',
    fire_item_1: 'SCBA cylinder filling',
    fire_item_2: 'Mobile platforms and ladders operation',
    fire_item_3: 'Forklifts and telehandlers',
    fire_item_4: 'Slinger and signaller certifications',
    services_all: 'All',
    label_phone: 'Hotline',
    label_email: 'E-mail',
    label_location: 'Location',
    nav_elearning: 'E-learning Platform',
    elearning_note: 'Available during course'
  },
  ua: {
    nav_start: 'Головна',
    nav_services: 'Наші послуги',
    nav_contact: 'Контакт',
    nav_call: 'Зателефонувати',
    hero_title: 'Професійне {accent} у Кросно',
    hero_accent: 'Навчання UDT',
    hero_desc: 'Отримайте сертифікати на навантажувачі, підйомники, крани та лебідки. Навчаємо на сучасному обладнанні з найвищим показником успішності.',
    hero_btn_enroll: 'Записатися на курс',
    hero_btn_offer: 'Переглянути пропозицію',
    hero_next_courses: 'Найближчі курси',
    hero_eu_info: 'Можливість фінансування курсів за кошти ЄС при виконанні вимог.',
    offer_title: 'Наша пропозиція',
    offer_desc: 'Натисніть на картку, щоб переглянути деталі навчання та обсяг сертифікації.',
    offer_btn_all: 'Повний список послуг',
    fire_badge: 'Пропозиція для рятувальних служб',
    fire_title: 'Навчання для {accent}',
    fire_accent: 'Пожежних служб',
    fire_desc: 'Ми підтримуємо добровільні та державні пожежні частини у підвищенні технічної кваліфікації рятувальників.',
    fire_btn: 'ЗАПИТАТИ ПРО ПРОПОЗИЦІЮ ДЛЯ ПОЖЕЖНИХ',
    req_title: 'Хто може стати {accent}?',
    req_accent: 'Оператором',
    req_desc: 'Перевірте основні вимоги, які необхідно виконати для проходження навчання та іспиту UDT.',
    req_age_title: 'Вік',
    req_age_desc: 'Вам має бути не менше 18 років на день початку курсу.',
    req_edu_title: 'Освіта',
    req_edu_desc: 'Потрібна мінімум початкова освіта.',
    req_health_title: 'Стан здоров’я',
    req_health_desc: 'Відсутність медичних протипоказань до роботи з технічним обладнанням.',
    req_ready: 'Відповідаєте вимогам?',
    req_ready_desc: 'Запишіться на найближчу дату та отримайте державні сертифікати.',
    contact_title: 'Є питання? {accent}',
    contact_accent: 'Напишіть нам',
    contact_desc: 'Запишіться на курс сьогодні або запитайте про деталі.',
    contact_form_title: 'Поставити питання',
    contact_form_name: 'Ім’я та прізвище',
    contact_form_phone: 'Номер телефону',
    contact_form_email: 'Електронна пошта',
    contact_form_course: 'Курс, що вас цікавить',
    contact_form_msg: 'Ваше повідомлення...',
    contact_form_send: 'Надіслати',
    footer_about: 'Найкращий навчальний центр для операторів підйомно-транспортного обладнання в регіоні. Професіоналізм, сучасне обладнання та високі показники успішності.',
    footer_office: 'Офіс та реєстрація',
    footer_office_desc: 'Телефонна реєстрація та офіс працюють з понеділка по п’ятницю з 8:00 до 18:00.',
    footer_call_btn: 'ЗАТЕЛЕФОНУВАТИ ТА ЗАПИСАТИСЯ',
    footer_rights: 'Всі права захищені.',
    privacy_policy: 'Політика конфіденційності',
    cookie_title: 'Ми дбаємо про вашу конфіденційність',
    cookie_desc: 'Наш сайт використовує файли cookie для покращення досвіду користувачів та аналізу трафіку.',
    cookie_btn: 'Розумію та приймаю',
    fire_item_1: 'Наповнення повітряних балонів ЗІЗОД',
    fire_item_2: 'Експлуатація мобільних платформ та драбин',
    fire_item_3: 'Навантажувачі та телескопічні навантажувачі',
    fire_item_4: 'Сертифікація стропальника та сигнальника',
    services_all: 'Всі',
    label_phone: 'Гаряча лінія',
    label_email: 'Електронна пошта',
    label_location: 'Локація',
    nav_elearning: 'E-learning платформа',
    elearning_note: 'Доступно під час курсу'
  }
};

const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => localStorage.getItem('app-lang') || 'pl');
  
  useEffect(() => {
    localStorage.setItem('app-lang', lang);
  }, [lang]);

  const t = (key) => {
    const langData = translations[lang] || translations['pl'];
    return langData[key] || translations['pl'][key] || key;
  };
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const useTranslation = () => useContext(LanguageContext);

// --- Advanced Production Helpers ---

// 1. Error Boundary - zapobiega "białemu ekranowi śmierci"
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) { return { hasError: true }; }
  componentDidCatch(error, errorInfo) { console.error("React Error:", error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-primary flex items-center justify-center p-8 text-center">
          <div className="max-w-md">
            <h2 className="text-4xl font-black text-white mb-4">Ups! Coś poszło nie tak.</h2>
            <p className="text-white/60 mb-8">Wystąpił nieoczekiwany błąd aplikacji. Przepraszamy za utrudnienia.</p>
            <button onClick={() => window.location.href = '/'} className="btn-primary w-full justify-center">
              Wróć do strony głównej
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// 2. SEO & Analytics Tracker - obsługa metadanych i virtual page views
const PageManager = () => {
  const location = useLocation();
  const { lang } = useTranslation();

  useEffect(() => {
    // Dynamiczna aktualizacja tytułu i opisu (SEO)
    const pageTitles = {
      'pl': {
        '/': 'DTMS - Profesjonalne Szkolenia UDT Krosno | Wózki Widłowe, Podesty',
        '/uslugi': 'Oferta Szkoleń UDT - Wózki, Suwnice, HDS | DTMS Krosno',
        '/polityka-prywatnosci': 'Polityka Prywatności | DTMS'
      },
      'en': {
        '/': 'DTMS - Professional UDT Training Krosno | Forklifts, Platforms',
        '/uslugi': 'UDT Training Offer - Forklifts, Cranes | DTMS Krosno',
        '/polityka-prywatnosci': 'Privacy Policy | DTMS'
      },
      'ua': {
        '/': 'DTMS - Професійне навчання UDT Кросно | Навантажувачі, Підйомники',
        '/uslugi': 'Пропозиція навчання UDT - Навантажувачі, Крани | DTMS Кросно',
        '/polityka-prywatnosci': 'Політика конфіденційності | DTMS'
      }
    };

    const currentTitle = pageTitles[lang]?.[location.pathname] || 'DTMS Szkolenia Techniczne';
    document.title = currentTitle;

    console.log(`[Analytics] Page View: ${location.pathname} [${lang}]`);
  }, [location, lang]);

  return null;
};

// --- Helper for orphans (Sierotki) ---
const fixOrphans = (text) => {
  return text.replace(/ (\w{1,2}) /g, ' $1\u00A0');
}

// --- Data ---

const UPCOMING_COURSES = [
  { 
    title: { pl: "Wózek widłowy specjalizowany I WJO", en: "Specialized Forklift I WJO", ua: "Навантажувач спеціалізований I WJO" }, 
    date: "13.05.2026" 
  },
  { 
    title: { pl: "Wózek widłowy II WJO", en: "Forklift II WJO", ua: "Навантажувач II WJO" }, 
    date: "13.05.2026" 
  },
  { 
    title: { pl: "Napełnianie butli skroplonych i sprężonych", en: "Filling Liquefied & Compressed Cylinders", ua: "Наповнення балонів скрапленим і стисненим газом" }, 
    date: "20.05.2026" 
  }
]

const DETAILED_SERVICES = [
  { 
    id: "wozki-ii-wjo", 
    title: { pl: "Wózki jezdniowe widłowe kat. II WJO", en: "Forklifts cat. II WJO", ua: "Навантажувачі кат. II WJO" }, 
    img: "/obrazy/wozek1.jpg", 
    summary: { pl: "Pełne uprawnienia na wózki spalinowe i akumulatorowe z wymianą butli gazowej.", en: "Full certification for combustion and electric trucks with LPG cylinder exchange.", ua: "Повна сертифікація для автонавантажувачів з ДВЗ та електронавантажувачів із заміною газових балонів." },
    desc: { 
      pl: fixOrphans("Szkolenie obejmuje uprawnienia na wszystkie typy wózków jezdniowych (widłowych kat. II WJO) z napędem spalinowym, akumulatorowym. Dodatkowo każdy kursant zostaje przeszkolony i otrzymuje zaświadczenie z zakresu bezpiecznej eksploatacji, użytkowania butli gazowej oraz jej bezpiecznej wymiany."),
      en: "The training covers all types of industrial trucks (forklifts cat. II WJO) with combustion or battery drive. Additionally, each trainee is trained in safe operation, use of gas cylinders and their safe replacement.",
      ua: "Навчання охоплює всі типи автонавантажувачів (категорія II WJO) з двигуном внутрішнього згоряння або акумуляторним приводом. Крім того, кожен слухач проходить навчання з безпечної експлуатації та заміни газових балонів."
    }, 
    exam: { pl: "Kurs kończy się egzaminem przed państwową komisją Urzędu Dozoru Technicznego", en: "The course ends with an exam before the state commission of the Office of Technical Inspection", ua: "Курс завершується іспитом перед державною комісією Управління технічного нагляду" }
  },
  { 
    id: "wozki-i-wjo", 
    title: { pl: "Wózki jezdniowe specjalizowane kat. I WJO", en: "Specialized Forklifts cat. I WJO", ua: "Навантажувачі спеціалізовані кат. I WJO" }, 
    img: "/obrazy/wozek2.jpg", 
    summary: { pl: "Ładowarki teleskopowe oraz wózki z operatorem podnoszonym do góry.", en: "Telehandlers and lift trucks with the operator raising with the load.", ua: "Телескопічні навантажувачі та навантажувачі, де оператор піднімається разом з вантажем." },
    desc: {
      pl: fixOrphans("Szkolenie obejmuje uprawnienia na wszystkie typy wózków jezdniowych (widłowych kat. I WJO) z napędem spalinowym, akumulatorowym ze zmiennym wysięgiem oraz operatorem podnoszonym do góry wraz z ładunkiem. Dodatkowo każdy kursant zostaje przeszkolony i otrzymuje zaświadczenie z zakresu bezpiecznej eksploatacji, użytkowania butli gazowej oraz jej bezpiecznej wymiany."),
      en: "Training covers all types of industrial trucks (forklifts cat. I WJO) including variable-reach trucks (telehandlers) and trucks with elevating operator. Includes safe gas cylinder handling.",
      ua: "Навчання охоплює всі типи автонавантажувачів (категорія I WJO), включаючи телескопічні навантажувачі та ті, де оператор піднімається разом з вантажем. Включає навчання роботі з газовими балонами."
    },
    exam: { pl: "Kurs kończy się egzaminem przed państwową komisją Urzędu Dozoru Technicznego.", en: "The course ends with an exam before the state commission of the Office of Technical Inspection.", ua: "Курс завершується іспитом перед державною комісією Управління технічного нагляду." }
  },
  { 
    id: "podesty", 
    title: { pl: "Podesty ruchome przejezdne", en: "Mobile Elevating Work Platforms", ua: "Пересувні підйомні робочі платформи" }, 
    img: "/obrazy/podest.jpg", 
    summary: { pl: "Zwyżki, podnośniki koszowe, nożycowe i samojezdne.", en: "Aerial lifts, bucket trucks, scissor lifts, and self-propelled platforms.", ua: "Автовишки, ножичні підйомники та самохідні платформи." },
    desc: {
      pl: fixOrphans("Szkolenie obejmuje uprawnienia na wszystkie typy podestów ruchomych: wolnobieżnych, samojezdnych montowanych na pojeździe, przewoźnych z napędem spalinowym, akumulatorowym i elektrycznym."),
      en: "The training includes certifications for all types of mobile platforms: slow-speed, self-propelled mounted on vehicles, portable with combustion, battery, and electric drives.",
      ua: "Навчання включає сертифікацію на всі типи мобільних платформ: самохідні, що встановлюються на транспортні засоби, переносні з двигуном ДВЗ, акумуляторним та електричним приводом."
    },
    exam: { pl: "Kurs kończy się egzaminem przed państwową komisją Urzędu Dozoru Technicznego.", en: "The course ends with an exam before the state commission of the Office of Technical Inspection.", ua: "Курс завершується іспитом перед державною комісією Управління технічного нагляду." }
  },
  { 
    id: "zapinacz", 
    title: { pl: "Zapinacz hakowy sygnalista", en: "Slinger and Signaller", ua: "Стропальник та сигнальник" }, 
    img: "/obrazy/zapinacz.jpg", 
    summary: { pl: "Zasady transportu ładunków, dobór zawiesi i sygnalizacja.", en: "Principles of load transport, slinger selection, and signaling.", ua: "Принципи транспортування вантажів, підбір строп та сигналізація." },
    desc: {
      pl: fixOrphans("Szkolenie obejmuje zapoznanie się z prawidłowymi zasadami transportu ładunku za pomocą urządzeń dźwignicowych, doboru zawiesi oraz sygnałów porozumiewawcze z operatorem."),
      en: "The training covers the correct principles of load transport using lifting equipment, selection of slings, and communication signals with the operator.",
      ua: "Навчання охоплює правильні принципи транспортування вантажів за допомогою вантажопідйомного обладнання, підбір строп та сигнали зв'язку з оператором."
    },
    exam: { pl: "Kurs kończy się egzaminem oraz wydaniem zaświadczenia zgodnego ze wzorem MEN", en: "The course ends with an exam and a certificate in accordance with the MEN template", ua: "Курс завершується іспитом та видачею сертифіката за зразком MEN" }
  },
  { 
    id: "zurawie-przenosne", 
    title: { pl: "Żurawie przenośne (HDS)", en: "Truck-mounted cranes (HDS)", ua: "Крани-маніпулятори (HDS)" }, 
    img: "/obrazy/zurawp.jpeg", 
    summary: { pl: "Uprawnienia na żurawie przeładunkowe oraz urządzenia leśne.", en: "Certifications for loading cranes and forestry equipment.", ua: "Дозволи на крани-маніпулятори та лісове обладнання." },
    desc: {
      pl: fixOrphans("Szkolenie obejmuje uprawnienia na wszystkie typy żurawi przenośnych, przewoźnych i stacjonarnych. Dodatkowo umożliwia pracę na urządzeniach leśnych typu harwester i forwarder."),
      en: "Training covers all types of mobile, portable, and stationary cranes. Additionally, it enables work on forestry machines like harvesters and forwarders.",
      ua: "Навчання охоплює всі типи мобільних, переносних та стаціонарних кранів. Додатково дозволяє працювати на лісовій техніці типу харвестер та форвардер."
    },
    exam: { pl: "Kurs kończy się egzaminem przed państwową komisją Urzędu Dozoru Technicznego.", en: "The course ends with an exam before the state commission of the Office of Technical Inspection.", ua: "Курс завершується іспитом перед державною комісією Управління технічного нагляду." }
  },
  { 
    id: "zurawie-stacjonarne", 
    title: { pl: "Żurawie stacjonarne", en: "Stationary Cranes", ua: "Стаціонарні крани" }, 
    img: "/obrazy/zurawstacj.jpg", 
    summary: { pl: "Żurawie warsztatowe, słupowe i przyścienne.", en: "Workshop, pillar, and wall-mounted cranes.", ua: "Майстерні, стовпові та настінні крани." },
    desc: {
      pl: fixOrphans("Szkolenie obejmuje uprawnienia na wszystkie typy żurawi stacjonarnych, słupowych, przyściennych, warsztatowych oraz z dwoma wysięgnikami."),
      en: "The training covers certifications for all types of stationary, pillar, wall-mounted, workshop cranes and those with two jibs.",
      ua: "Навчання включає сертифікацію на всі типи стаціонарних, стовпових, настінних, майстерень кранів та кранів з двома стрілами."
    },
    exam: { pl: "Kurs kończy się egzaminem przed państwową komisją Urzędu Dozoru Technicznego.", en: "The course ends with an exam before the state commission of the Office of Technical Inspection.", ua: "Курс завершується іспитом перед державною комісією Управління технічного нагляду." }
  },
  { 
    id: "wozki-unoszace", 
    title: { pl: "Wózki unoszące", en: "Pallet Stackers", ua: "Навантажувачі, що піднімають (рохлі)" }, 
    img: "/obrazy/wozkiuno.png", 
    summary: { pl: "Bezpieczna obsługa wózków prowadzonych i elektrycznych paleciaków.", en: "Safe operation of walkie and electric pallet trucks.", ua: "Безпечна експлуатація ручних та електричних палетних візків." },
    desc: {
      pl: fixOrphans("Szkolenie obejmuje zapoznanie się z bezpieczną obsługą, eksploatacją, transportu ładunku oraz wymianę baterii w wózkach jezdniowych unoszących."),
      en: "The training covers safe operation, use, load transport, and battery replacement in pallet stackers.",
      ua: "Навчання охоплює безпечну експлуатацію, використання, транспортування вантажів та заміну акумуляторів у палетних навантажувачах."
    },
    exam: { pl: "Kurs kończy się egzaminem oraz wydaniem zaświadczenia zgodnego ze wzorem MEN.", en: "The course ends with an exam and a certificate in accordance with the MEN template.", ua: "Курс завершується іспитом та видачею сертифіката за зразком MEN." }
  },
  { 
    id: "wymiana-butli", 
    title: { pl: "Wymiana butli gazowych", en: "Gas Cylinder Exchange", ua: "Заміна газових балонів" }, 
    img: "/obrazy/wymianabutli.jpg", 
    summary: { pl: "Szkolenie z zakresu bezpiecznej eksploatacji i wymiany butli LPG.", en: "Training on safe operation and exchange of LPG cylinders.", ua: "Навчання з безпечної експлуатації та заміни балонів LPG." },
    desc: {
      pl: fixOrphans("Szkolenie obejmuje przygotowanie teoretyczne, praktyczne oraz zagrożenia występujące podczas eksploatacji i wymianie butli gazowych w wózkach jezdniowych."),
      en: "The training includes theoretical and practical preparation as well as hazards occurring during operation and exchange of gas cylinders in industrial trucks.",
      ua: "Навчання включає теоретичну та практичну підготовку, а також небезпеки, що виникають під час експлуатації та заміни газових балонів у промислових навантажувачах."
    },
    exam: { pl: "Kurs kończy się egzaminem oraz wydaniem zaświadczenia zgodnego ze wzorem MEN.", en: "The course ends with an exam and a certificate in accordance with the MEN template.", ua: "Курс завершується іспитом та видачею сертифіката за зразком MEN." }
  },
  { 
    id: "zurawie-wiezowe", 
    title: { pl: "Żurawie wieżowe", en: "Tower Cranes", ua: "Баштові крани" }, 
    img: "/obrazy/zuraww.jpeg", 
    summary: { pl: "Uprawnienia na żurawie wieżowe (dźwigi budowlane) i szybkomontujące.", en: "Certifications for tower cranes (construction cranes) and fast-erecting cranes.", ua: "Дозволи на баштові крани (будівельні крани) та швидкомонтовані крани." },
    desc: {
      pl: fixOrphans("Szkolenie obejmuje uprawnienia na wszystkie typy żurawi wieżowych, szynowych oraz szybkomontujących."),
      en: "The training covers certifications for all types of tower, rail-mounted, and fast-erecting cranes.",
      ua: "Навчання включає сертифікацію на всі типи баштових, рейкових та швидкомонтованих кранів."
    },
    exam: { pl: "Kurs kończy się egzaminem przed państwową komisją Urzędu Dozoru Technicznego.", en: "The course ends with an exam before the state commission of the Office of Technical Inspection.", ua: "Курс завершується іспитом перед державною комісією Управління технічного нагляду." }
  },
  { 
    id: "dzwigi-budowlane", 
    title: { pl: "Dźwigi budowlane", en: "Construction Hoists", ua: "Будівельні підйомники" }, 
    img: "/obrazy/dzwigb.jpg", 
    summary: { pl: "Wciągarki i windy towarowo-osobowe na budowach.", en: "Winches and goods/passenger elevators on construction sites.", ua: "Лебідки та вантажопасажирські ліфти на будівельних майданчиках." },
    desc: {
      pl: fixOrphans("Szkolenie obejmuje uprawnienia na wszystkie dźwigi budowlane, towarowe, towarowo – osobowe oraz uprawnia do obsługi wyciągów towarowych."),
      en: "The training covers certifications for all construction hoists, goods lifts, goods/passenger lifts, and authorizes the operation of goods hoists.",
      ua: "Навчання включає сертифікацію на всі будівельні підйомники, вантажні ліфти, вантажопасажирські ліфти та дозволяє експлуатацію вантажних підйомників."
    },
    exam: { pl: "Kurs kończy się egzaminem przed państwową komisją Urzędu Dozoru Technicznego.", en: "The course ends with an exam before the state commission of the Office of Technical Inspection.", ua: "Курс завершується іспитом перед державною комісією Управління технічного нагляду." }
  },
  { 
    id: "zurawie-samojezdne", 
    title: { pl: "Żurawie samojezdne", en: "Mobile Cranes", ua: "Самохідні крани" }, 
    img: "/obrazy/zurawsamo.jpeg", 
    summary: { pl: "Duże dźwigi kołowe i gąsienicowe.", en: "Large wheel and crawler cranes.", ua: "Великі колісні та гусеничні крани." },
    desc: {
      pl: fixOrphans("Szkolenie obejmuje uprawnienia na wszystkie typy żurawi samojezdnych, przenośnych, przewoźnych oraz stacjonarnych."),
      en: "The training covers certifications for all types of mobile, truck-mounted, portable, and stationary cranes.",
      ua: "Навчання включає сертифікацію на всі типи самохідних, автомобільних, переносних та стаціонарних кранів."
    },
    exam: { pl: "Kurs kończy się egzaminem przed państwową komisją Urzędu Dozoru Technicznego.", en: "The course ends with an exam before the state commission of the Office of Technical Inspection.", ua: "Курс завершується іспитом перед державною комісією Управління технічного нагляду." }
  },
  { 
    id: "wozki-platformowe", 
    title: { pl: "Wózki platformowe", en: "Platform Trucks", ua: "Платформні навантажувачі" }, 
    img: "/obrazy/wozkiplatf.jpg", 
    summary: { pl: "Pojazdy transportowe i ciągniki akumulatorowe.", en: "Transport vehicles and battery-powered tractors.", ua: "Транспортні засоби та акумуляторні тягачі." },
    desc: {
      pl: fixOrphans("Szkolenie obejmuje zapoznanie się z obsługą, eksploatacją, transportem ładunku oraz wymianą baterii w wózkach jezdniowych platformowych, ciągnikowych i pchających."),
      en: "The training covers operation, use, load transport, and battery replacement in platform, tractor, and pusher trucks.",
      ua: "Навчання охоплює експлуатацію, використання, транспортування вантажів та заміну акумуляторів у платформних навантажувачах, тягачах та штовхачах."
    },
    exam: { pl: "Kurs kończy się egzaminem oraz wydaniem zaświadczenia zgodnego ze wzorem MEN.", en: "The course ends with an exam and a certificate in accordance with the MEN template.", ua: "Курс завершується іспитом та видачею сертифіката за зразком MEN." }
  },
  { 
    id: "wyciagi-towarowe", 
    title: { pl: "Wyciągi towarowe", en: "Goods Hoists", ua: "Вантажні підйомники" }, 
    img: "/obrazy/wyciagtow.jpg", 
    summary: { pl: "Urządzenia do pionowego transportu ładunków.", en: "Devices for vertical transport of loads.", ua: "Пристрої для вертикального транспортування вантажів." },
    desc: {
      pl: fixOrphans("Szkolenie obejmuje zapoznanie się z prawidłowymi zasadami obsługi, eksploatacji, montażu / demontażu urządzenia oraz bezpiecznego transportu ładunku."),
      en: "The training covers the correct principles of operation, use, assembly/disassembly of the device, and safe load transport.",
      ua: "Навчання охоплює правильні принципи експлуатації, використання, монтажу/демонтажу пристрою та безпечного транспортування вантажів."
    },
    exam: { pl: "Kurs kończy się egzaminem oraz wydaniem zaświadczenia zgodnego ze wzorem MEN (dla urządzeń do 250kg). Kurs kończy się egzaminem przed państwową komisją Urzędu Dozoru Technicznego (dla urządzeń pow. 250kg).", en: "The course ends with an exam and a MEN certificate (for devices up to 250kg) or an UDT exam (for devices over 250kg).", ua: "Курс завершується іспитом та сертифікатом MEN (для пристроїв до 250 кг) або іспитом UDT (для пристроїв понад 250 кг)." }
  },
  { 
    id: "dzwigi-tow-osobowe", 
    title: { pl: "Dźwigi towarowo osobowe", en: "Goods and Passenger Lifts", ua: "Вантажопасажирські ліфти" }, 
    img: "/obrazy/dzwigtow.jpg", 
    summary: { pl: "Windy ze sterowaniem wewnętrznym i szpitalne.", en: "Elevators with internal control and hospital lifts.", ua: "Ліфти з внутрішнім керуванням та лікарняні ліфти." },
    desc: {
      pl: fixOrphans("Szkolenie obejmuje uprawnienia na dźwigi towarowo osobowe ze sterowaniem wewnętrznym oraz szpitalne."),
      en: "The training covers certifications for goods and passenger lifts with internal control and hospital lifts.",
      ua: "Навчання включає сертифікацію вантажопасажирських ліфтів з внутрішнім керуванням та лікарняних ліфтів."
    },
    exam: { pl: "Kurs kończy się egzaminem przed państwową komisją Urzędu Dozoru Technicznego.", en: "The course ends with an exam before the state commission of the Office of Technical Inspection.", ua: "Курс завершується іспитом перед державною комісією Управління технічного нагляду." }
  },
  { 
    id: "suwnice", 
    title: { pl: "Suwnice", en: "Overhead Cranes", ua: "Мостові крани" }, 
    img: "/obrazy/suwnice.jpg", 
    summary: { pl: "Suwnice, wciągniki i wciągarki ogólnego przeznaczenia.", en: "Cranes, hoists, and winches for general and special purposes.", ua: "Крани, талі та лебідки загального та спеціального призначення." },
    desc: {
      pl: fixOrphans("Szkolenie obejmuje uprawnienia na suwnice, wciągniki i wciągarki ogólnego oraz specjalnego przeznaczenia."),
      en: "The training includes certifications for overhead cranes, hoists, and winches of general and special purposes.",
      ua: "Навчання включає сертифікацію на мостові крани, талі та лебідки загального та спеціального призначення."
    },
    exam: { pl: "Kurs kończy się egzaminem przed państwową komisją Urzędu Dozoru Technicznego.", en: "The course ends with an exam before the state commission of the Office of Technical Inspection.", ua: "Курс завершується іспитом перед державною комісією Управління технічного нагляду." }
  },
  { 
    id: "napelnianie-sprezone", 
    title: { pl: "Napełnianie butli gazami sprężonymi", en: "Filling compressed gas cylinders", ua: "Наповнення балонів стисненим газом" }, 
    img: "/obrazy/butlesprez.png", 
    summary: { pl: "Napełnianie butli do oddychania, nurkowych i technicznych.", en: "Filling breathing, diving, and technical gas cylinders.", ua: "Наповнення дихальних, водолазних та технічних балонів." },
    desc: {
      pl: fixOrphans("Szkolenie obejmuje bezpieczną obsługę, eksploatację oraz procedurę napełniania butli, zbiorników ciśnieniowych gazami sprężonymi. Uprawnienia obejmują również butle do oddychania: używane do nurkowania, w straży pożarnej itp."),
      en: "Training covers safe operation and filling procedures for compressed gas cylinders. Certifications include breathing apparatus cylinders for diving, fire service, etc.",
      ua: "Навчання охоплює безпечну експлуатацію та процедури наповнення балонів стисненим газом. Дозволи включають балони для дихальних апаратів (дайвінг, пожежна служба тощо)."
    },
    exam: { pl: "Kurs kończy się egzaminem przed państwową komisją Urzędu Dozoru Technicznego.", en: "The course ends with an exam before the state commission of the Office of Technical Inspection.", ua: "Курс завершується іспитом перед державною комісією Управління технічного нагляду." }
  },
  { 
    id: "napelnianie-skroplone", 
    title: { pl: "Napełnianie butli gazami skroplonymi", en: "Filling liquefied gas cylinders", ua: "Наповнення балонів скрапленим газом" }, 
    img: "/obrazy/gutlehazy.png", 
    summary: { pl: "Napełnianie butli LPG, klimatyzacji i gazów skroplonych.", en: "Filling LPG, air conditioning, and liquefied gas cylinders.", ua: "Наповнення балонів LPG, кондиціонування та скрапленого газу." },
    desc: {
      pl: fixOrphans("Szkolenie obejmuje bezpieczną obsługę, eksploatację oraz procedurę napełniania butli, zbiorników ciśnieniowych gazami skroplonymi metodą przelewowo wagową. Uprawnienia obejmują również butle do odzysku i napełniania klimatyzacji, LPG itp."),
      en: "Training covers safe operation and filling procedures for liquefied gas cylinders. Includes cylinders for AC recovery, LPG, etc.",
      ua: "Навчання охоплює безпечну експлуатацію та процедури наповнення балонів скрапленим газом. Включає балони для обслуговування кондиціонерів, LPG тощо."
    },
    exam: { pl: "Kurs kończy się egzaminem przed państwową komisją Urzędu Dozoru Technicznego.", en: "The course ends with an exam before the state commission of the Office of Technical Inspection.", ua: "Курс завершується іспитом перед державною комісією Управління технічного нагляду." }
  }
]


// --- Components ---

const LanguageSwitcher = () => {
  const { lang, setLang } = useTranslation();
  return (
    <div className="flex gap-2 p-1 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm">
      {['pl', 'en', 'ua'].map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-3 py-1 rounded-full text-xs font-black uppercase transition-all ${lang === l ? 'bg-accent text-primary' : 'text-white hover:bg-white/10'}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
};

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();
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
                <h4 className="text-white font-bold text-lg mb-1">{t('cookie_title')}</h4>
                <p className="text-white/60 text-sm leading-relaxed max-w-2xl">
                  {t('cookie_desc')} {t('privacy_policy')}.
                </p>
              </div>
            </div>
            <button
              onClick={accept}
              className="btn-primary whitespace-nowrap px-8 py-4 w-full md:w-auto justify-center"
            >
              {t('cookie_btn')}
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
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 flex flex-col gap-4 z-[2000] items-end">
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
  const { t } = useTranslation();
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
          <Link to="/" className={`nav-link-v4 ${location.pathname === '/' && !location.hash ? 'active' : ''}`}>{t('nav_start')}</Link>
          <Link to="/uslugi" className={`nav-link-v4 ${location.pathname === '/uslugi' ? 'active' : ''}`}>{t('nav_services')}</Link>
          <a href="#kontakt" onClick={handleContactClick} className={`nav-link-v4 ${location.hash === '#kontakt' ? 'active' : ''}`}>{t('nav_contact') || 'Kontakt'}</a>
          <a href="https://szkoleniadtms.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn-elearning group">
            <MonitorPlay size={18} className="text-accent group-hover:scale-110 transition-transform" />
            <span className="text-sm font-bold uppercase tracking-tight">{t('nav_elearning')}</span>
          </a>
          <a href="tel:667677912" className="btn-phone-v4"><Phone size={18} /> 667 677 912</a>
          <LanguageSwitcher />
        </div>
        <div className="lg:hidden flex items-center gap-4">
          <button className="text-white p-2 hover:bg-white/10 rounded-full transition-colors" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X size={28} /> : <Menu size={28} />}</button>
          <LanguageSwitcher />
        </div>
      </div>
      <AnimatePresence>
        {mobileMenu && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }} 
            className="absolute top-full left-0 w-full bg-primary border-t border-white/10 p-8 flex flex-col gap-6 lg:hidden shadow-2xl"
          >
            <Link to="/" onClick={() => setMobileMenu(false)} className="text-2xl font-black text-white hover:text-accent transition-colors flex items-center justify-between">{t('nav_start')} <ChevronRight size={20} /></Link>
            <Link to="/uslugi" onClick={() => setMobileMenu(false)} className="text-2xl font-black text-white hover:text-accent transition-colors flex items-center justify-between">{t('nav_services')} <ChevronRight size={20} /></Link>
            <a href="#kontakt" onClick={handleContactClick} className="text-2xl font-black text-white hover:text-accent transition-colors flex items-center justify-between">{t('nav_contact')} <ChevronRight size={20} /></a>
            <div className="mt-4 pt-6 border-t border-white/10 flex flex-col gap-4">
              <a href="https://szkoleniadtms.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn-elearning justify-between w-full py-4">
                <div className="flex items-center gap-3">
                  <MonitorPlay size={20} className="text-accent" />
                  <span className="text-base font-bold uppercase">{t('nav_elearning')}</span>
                </div>
                <ChevronRight size={20} className="opacity-50" />
              </a>
              <a href="tel:667677912" className="btn-phone-v4 justify-center py-5 text-lg">{t('nav_call')}: 667 677 912</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

const ContactSection = () => {
  const { t, lang } = useTranslation();
  return (
    <section className="section bg-white scroll-mt-32" id="kontakt">
      <div className="container">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary mb-6">
            {t('contact_title').split('{accent}')[0]}
            <span className="text-accent">{t('contact_accent')}</span>
          </h2>
          <div className="w-24 h-2 bg-accent mx-auto mb-8 rounded-full"></div>
          <p className="text-lg md:text-xl text-slate-500">{t('contact_desc')}</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="bg-slate-50 p-8 md:p-12 rounded-[3rem] shadow-2xl border border-slate-100">
            <h3 className="text-3xl font-black mb-8 text-primary">{t('contact_form_title')}</h3>
            <form className="flex flex-col gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" placeholder={t('contact_form_name')} className="input-v4" required />
                <input type="tel" placeholder={t('contact_form_phone')} className="input-v4" required />
              </div>
              <input type="email" placeholder={t('contact_form_email')} className="input-v4" required />
              <select className="input-v4">
                <option>{t('contact_form_course')}</option>
                {DETAILED_SERVICES.map(s => <option key={s.id}>{s.title[lang] || s.title.pl}</option>)}
              </select>
              <textarea placeholder={t('contact_form_msg')} className="input-v4 min-h-[150px]" required></textarea>
              <button type="submit" className="btn-primary w-full justify-center">{t('contact_form_send')} <Send size={18} /></button>
            </form>
          </div>
          <div className="flex flex-col gap-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="contact-card-premium"><Phone className="text-accent mb-6" size={32} /><p className="text-xs uppercase font-bold opacity-60 mb-2 text-white">{t('label_phone')}</p><a href="tel:667677912" className="text-2xl font-black block text-white">667 677 912</a></div>
              <div className="contact-card-premium"><Mail className="text-accent mb-6" size={32} /><p className="text-xs uppercase font-bold opacity-60 mb-2 text-white">{t('label_email')}</p><a href="mailto:fhudtms@poczta.fm" className="text-lg font-black block truncate text-white">fhudtms@poczta.fm</a></div>
            </div>
            <div className="map-container-premium relative"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2586.643033575641!2d21.75895781570119!3d49.68233777937762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473c4f743419082f%3A0xc3b83b3e6c38703a!2sIgnacego%20%C5%81ukasiewicza%2063%2C%2038-400%20Krosno!5e0!3m2!1spl!2spl!4v1664221000000!5m2!1spl!2spl" className="w-full h-full border-0" allowFullScreen="" loading="lazy"></iframe><div className="absolute top-6 left-6 p-5 bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-white/20 max-w-[240px]"><div className="flex items-center gap-2 mb-2"><MapPin className="text-accent" size={16} /><span className="text-xs font-black text-primary uppercase tracking-wider">{t('label_location')}</span></div><p className="text-sm text-slate-700 font-medium leading-relaxed">ul. Ignacego Łukasiewicza 63, 38-400 Krosno</p></div></div>
          </div>
        </div>
      </div>
    </section>
  )
}

const Home = () => {
  const { hash } = useLocation();
  const { t, lang } = useTranslation();
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
              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-white mb-6 leading-[1.1]">
                {t('hero_title').split('{accent}')[0]}
                <span className="text-accent">{t('hero_accent')}</span>
                {t('hero_title').split('{accent}')[1]}
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl">{t('hero_desc')}</p>

              <div className="flex flex-row flex-wrap gap-4 mb-12">
                <a href="tel:667677912" className="btn-primary px-6 py-3 relative z-50 cursor-pointer text-base">{t('hero_btn_enroll')} <ArrowRight size={20} /></a>
                <a href="#oferta" className="btn-secondary px-6 py-3 relative z-50 cursor-pointer text-base">{t('hero_btn_offer')}</a>
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
                  <h3 className="text-2xl font-black text-white">{t('hero_next_courses')}</h3>
                </div>

                <div className="flex flex-col gap-3 mb-8">
                  {UPCOMING_COURSES.map((c, i) => (
                    <div key={i} className="upcoming-item-v4">
                      <span className="font-bold text-white/90">{c.title[lang] || c.title.pl}</span>
                      <span className="text-accent font-black shrink-0">{c.date}</span>
                    </div>
                  ))}
                </div>

                <div className="hero-card-footer">
                  <BadgeCheck size={24} className="text-emerald-400 shrink-0" />
                  <p className="text-sm text-white/70 font-medium">{t('hero_eu_info')}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section bg-white" id="oferta">
        <div className="container">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary mb-6">{t('offer_title')}</h2>
            <div className="w-24 h-2 bg-accent mx-auto mb-8 rounded-full"></div>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto">{t('offer_desc')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DETAILED_SERVICES.map((s, i) => (
              <Link key={i} to={`/uslugi#${s.id}`} className="offer-card group">
                <img src={s.img} className="offer-card-img group-hover:scale-110" alt={s.title.pl} />
                <div className="offer-card-overlay">
                  <h4 className="offer-card-title group-hover:text-accent transition-colors">{s.title[lang] || s.title.pl}</h4>
                  <p className="offer-card-summary line-clamp-3">
                    {s.summary[lang] || s.summary.pl}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-16 text-center"><Link to="/uslugi" className="btn-primary">{t('offer_btn_all')} <ArrowRight size={24} /></Link></div>
        </div>
      </section>

      <section className="section section-dark-premium py-32 relative overflow-hidden">
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
                <span className="font-black text-sm uppercase tracking-widest text-accent">{t('fire_badge')}</span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-[1.1]">
                {t('fire_title').split('{accent}')[0]}
                <span className="text-accent">{t('fire_accent')}</span>
              </h2>

              <p className="text-xl text-white opacity-90 mb-10 leading-relaxed max-w-xl">{t('fire_desc')}</p>

              <div className="grid gap-5 mb-12">
                {['fire_item_1', 'fire_item_2', 'fire_item_3', 'fire_item_4'].map((key, i) => (
                  <div key={i} className="flex items-center gap-4 text-white group">
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <CheckCircle2 size={14} />
                    </div>
                    <span className="text-lg font-bold text-white">{t(key)}</span>
                  </div>
                ))}
              </div>

              <a href="tel:667677912" className="btn-primary px-12 py-5 shadow-2xl shadow-accent/20 hover:scale-105 transition-transform inline-flex">
                <Phone size={20} />
                <span className="text-primary">{t('fire_btn')}</span>
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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary mb-6">
              {t('req_title').split('{accent}')[0]}
              <span className="text-accent">{t('req_accent')}</span>
              {t('req_title').split('{accent}')[1]}
            </h2>
            <div className="w-24 h-2 bg-accent mx-auto mb-8 rounded-full"></div>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto">{t('req_desc')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <UserCheck size={40} />, title: t('req_age_title'), desc: t('req_age_desc') },
              { icon: <GraduationCap size={40} />, title: t('req_edu_title'), desc: t('req_edu_desc') },
              { icon: <ShieldCheck size={40} />, title: t('req_health_title'), desc: t('req_health_desc') }
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
              <h4 className="text-2xl font-black mb-2">{t('req_ready')}</h4>
              <p className="opacity-70 text-lg">{t('req_ready_desc')}</p>
            </div>
            <a href="tel:667677912" className="btn-phone-v4 w-full md:w-auto text-center justify-center py-5 px-10 text-lg">{t('nav_call')}: 667 677 912</a>
          </div>
        </div>
      </section>

      <GoogleReviewSlider />
      <ContactSection />
    </div>
  )
}

const ServicesPage = () => {
  const { hash } = useLocation();
  const { t, lang } = useTranslation();
  useEffect(() => { if (hash && hash !== '#kontakt') { const element = document.getElementById(hash.substring(1)); if (element) element.scrollIntoView({ behavior: 'smooth' }); } else if (!hash) { window.scrollTo(0, 0); } }, [hash]);
  return (
    <div className="pt-32 md:pt-48 pb-24 bg-white">
      <div className="container">
        <div className="mb-12 md:mb-20 text-center">
          <h1 className="text-4xl sm:text-7xl font-black mb-6 text-primary">{t('services_all')} <span className="text-accent">{t('nav_services')}</span></h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto">{t('offer_desc')}</p>
        </div>
        <div className="space-y-16">
          {DETAILED_SERVICES.map((s, i) => (
            <motion.div key={i} id={s.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`p-6 md:p-12 bg-slate-50 rounded-[2rem] md:rounded-[3rem] border border-slate-200 flex flex-col lg:flex-row lg:items-center gap-8 md:gap-12 scroll-mt-32 ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
              <div className="service-img-container rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border-2 md:border-4 border-white mx-auto lg:mx-0"><img src={s.img} className="w-full h-full object-cover" alt={s.title.pl} /></div>
              <div className="flex-1 text-left">
                <h3 className="text-2xl md:text-4xl font-black mb-4 md:mb-6 text-primary">{s.title[lang] || s.title.pl}</h3>
                <p className="text-base md:text-lg text-slate-600 mb-6 md:mb-8 leading-relaxed">{s.desc[lang] || s.desc.pl}</p>
                <div className="flex items-start gap-4 p-4 md:p-5 bg-white rounded-xl md:rounded-2xl border border-slate-200 shadow-sm">
                  <BadgeCheck className="text-success shrink-0" size={24} />
                  <p className="font-bold text-primary text-sm md:text-base">{s.exam[lang] || s.exam.pl}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

const PrivacyPolicy = () => {
  const { lang } = useTranslation();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const content = {
    pl: {
      title: "Polityka prywatności",
      sections: [
        { h: "1. Informacje ogólne", p: ["Niniejsza polityka dotyczy Serwisu www, funkcjonującego pod adresem url: szkoleniadtms.pl", "Operatorem serwisu oraz Administratorem danych osobowych jest: Marek Soboń ul. Krośnienska 138E 38-457 Świerzowa Polska", "Adres kontaktowy poczty elektronicznej operatora: fhudtms@poczta.fm", "Operator jest Administratorem Twoich danych osobowych w odniesieniu do danych podanych dobrowolnie w Serwisie."] },
        { h: "2. Wybrane metody ochrony danych", p: ["Miejsca logowania i wprowadzania danych osobowych są chronione w warstwie transmisji (certyfikat SSL). Dane osobowe przechowywane w bazie danych są zaszyfrowane w taki sposób, że jedynie Operator posiadający klucz może je odczytać.", "W celu ochrony danych Operator regularnie wykonuje kopie bezpieczeństwa oraz aktualizuje oprogramowanie wykorzystywane do przetwarzania danych."] },
        { h: "3. Hosting", p: ["Serwis jest hostowany (technicznie utrzymywany) na serwerach operatora: hostinghause.pl"] },
        { h: "4. Twoje prawa", p: ["Przysługuje Ci prawo żądania od Administratora dostępu do danych osobowych, ich sprostowania, usunięcia, ograniczenia przetwarzania oraz przenoszenia danych.", "Na działania Administratora przysługuje skarga do Prezesa Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa."] },
        { h: "5. Pliki cookies", p: ["Serwis korzysta z plików cookies w celu utrzymania sesji użytkownika oraz realizacji celów marketingowych. Możesz zarządzać plikami cookies w ustawieniach swojej przeglądarki."] }
      ]
    },
    en: {
      title: "Privacy Policy",
      sections: [
        { h: "1. General Information", p: ["This policy applies to the website operating at: szkoleniadtms.pl", "The website operator and Personal Data Administrator is: Marek Soboń, ul. Krośnienska 138E, 38-457 Świerzowa Polska", "Operator's contact email: fhudtms@poczta.fm", "The Operator is the Administrator of your personal data provided voluntarily on the Website."] },
        { h: "2. Data Protection Methods", p: ["Login and data entry points are protected by an SSL certificate. Personal data stored in the database is encrypted so that only the Operator with the key can read it.", "To protect data, the Operator regularly performs backups and updates processing software."] },
        { h: "3. Hosting", p: ["The website is hosted (technically maintained) on the servers of: hostinghause.pl"] },
        { h: "4. Your Rights", p: ["You have the right to request access to your personal data, its rectification, deletion, restriction of processing, and data portability.", "You have the right to lodge a complaint with the President of the Personal Data Protection Office."] },
        { h: "5. Cookies", p: ["The website uses cookies to maintain user sessions and for marketing purposes. You can manage cookies in your browser settings."] }
      ]
    },
    ua: {
      title: "Політика конфіденційності",
      sections: [
        { h: "1. Загальна інформація", p: ["Ця політика стосується веб-сайту, що працює за адресою: szkoleniadtms.pl", "Оператором сервісу та Адміністратором персональних даних є: Marek Soboń, ul. Krośnienska 138E, 38-457 Świerzowa Polska", "Контактний e-mail оператора: fhudtms@poczta.fm", "Оператор є Адміністратором ваших персональних даних, наданих добровільно на Сайті."] },
        { h: "2. Методи захисту даних", p: ["Місця входу та введення персональних даних захищені сертифікатом SSL. Персональні дані, що зберігаються в базі даних, зашифровані так, що їх може прочитати лише Оператор із ключем.", "Для захисту даних Оператор регулярно створює резервні копії та оновлює програмне забезпечення."] },
        { h: "3. Хостинг", p: ["Сайт розміщено (технічно підтримується) на серверах: hostinghause.pl"] },
        { h: "4. Ваші права", p: ["Ви маєте право вимагати від Адміністратора доступу до ваших персональних даних, їх виправлення, видалення, обмеження обробки та перенесення даних.", "Ви маєте право подати скаргу до відповідного органу з захисту персональних даних."] },
        { h: "5. Файли cookie", p: ["Сайт використовує файли cookie для підтримки сесій користувачів та маркетингових цілей. Ви можете керувати файлами cookie в налаштуваннях браузера."] }
      ]
    }
  };

  const c = content[lang] || content['pl'];

  return (
    <div className="pt-32 md:pt-48 pb-24 bg-white">
      <div className="container max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-black mb-12 text-primary">{c.title}</h1>
        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-8 font-medium text-left">
          {c.sections.map((sec, i) => (
            <section key={i}>
              <h2 className="text-2xl font-bold text-primary mb-4">{sec.h}</h2>
              {sec.p.map((para, j) => <p key={j} className="mb-4">{para}</p>)}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="footer-v4 pt-24 pb-12">
      <div className="container">
        <div className="grid lg:grid-cols-3 gap-16 mb-20 text-left">
          <div className="flex flex-col items-start">
            <Link to="/" className="logo-group mb-8">
              <img src="/obrazy/logo białe .png" alt="DTMS" className="h-12 md:h-16" />
              <div className="logo-text">
                <span className="text-white block text-xl font-black leading-none">DTMS</span>
                <span className="text-accent text-xs tracking-[0.2em] font-bold uppercase">Szkolenia Techniczne</span>
              </div>
            </Link>
            <p className="text-white opacity-60 text-lg leading-relaxed mb-8">{t('footer_about')}</p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/Szkoleniadtms/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-all group">
                <Facebook size={24} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white text-xl font-black mb-10 uppercase tracking-widest relative inline-block">
              {t('nav_contact')}
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

          <div>
            <h4 className="text-white text-xl font-black mb-10 uppercase tracking-widest relative inline-block">
              {t('footer_office')}
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-accent"></span>
            </h4>
            <p className="text-white opacity-60 text-lg mb-8 leading-relaxed">{t('footer_office_desc')}</p>
            <a href="tel:667677912" className="btn-primary w-full py-5 rounded-2xl flex justify-center items-center gap-3 relative z-10 shadow-xl shadow-accent/10">
              <Phone size={20} />
              <span className="font-black text-lg">{t('footer_call_btn')}</span>
            </a>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white opacity-30 text-sm">
            © {new Date().getFullYear()} DTMS Marek Soboń. {t('footer_rights')}
          </p>
          <Link to="/polityka-prywatnosci" className="text-white opacity-40 hover:opacity-100 transition-opacity text-xs uppercase font-bold tracking-widest">
            {t('privacy_policy')}
          </Link>
        </div>
      </div>
    </footer>
  )
}

const ScrollToTop = () => { const { pathname, hash } = useLocation(); useEffect(() => { if (!hash) window.scrollTo(0, 0) }, [pathname, hash]); return null; }
const App = () => {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <Router>
          <ScrollToTop />
          <PageManager />
          <div className="relative overflow-x-hidden">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/uslugi" element={<ServicesPage />} />
              <Route path="/polityka-prywatnosci" element={<PrivacyPolicy />} />
            </Routes>
            <Footer />
            <FloatingContact />
            <CookieConsent />
          </div>
        </Router>
      </LanguageProvider>
    </ErrorBoundary>
  )
}

export default App
