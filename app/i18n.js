export const i18n = {
  defaultLocale: 'pl',
  locales: ['pl', 'en', 'ua'],
};

export const getDictionary = (locale) => {
  return dictionaries[locale] || dictionaries.pl;
};

const dictionaries = {
  pl: {
    nav: {
      start: 'Start',
      services: 'Nasze usługi',
      contact: 'Kontakt',
      call: 'Zadzwoń',
      elearning: 'Platforma szkoleniowa'
    },
    hero: {
      title: 'Profesjonalne Szkolenia UDT w Krośnie',
      desc: 'Zdobądź uprawnienia na wózki widłowe, podesty, suwnice i żurawie.',
      btn_enroll: 'Zapisz się na kurs',
      btn_offer: 'Nasza oferta',
      upcoming: 'Najbliższe kursy',
      eu_funds: 'Możliwość zrobienia kursów ze środków EU.'
    },
    upcoming: {
      title: 'Najbliższe kursy',
      enroll: 'Zapisy tel. 667 677 912',
      eu_funds_desc: 'Możliwość zrobienia kursów ze środków EU po spełnieniu odpowiednich warunków'
    },
    fire: {
      title: 'Szkolenia dla Straży Pożarnej',
      desc: 'Pakiety FIRE dla strażaków oraz kandydatów do naboru w PSP'
    },
    how: {
      title: 'Jak działamy',
      complaints: 'Reklamacje: dotyczące szkoleń można składać w formie pisemnej na email: fhudtms@poczta.fm. Rozpatrywane będą w ciągu 7 dni od zgłoszenia.',
      steps: [
        "Szkolenia teoretyczne, praktyczne oraz egzaminy prowadzone są na terenie zakładu na urządzeniu wskazanym przez zleceniodawcę lub w naszym ośrodku na przygotowanym przez nas urządzeniu.",
        "Wszystkie formalności załatwiane są na miejscu.",
        "W ramach szkolenia na wózki widłowe, każdy kursant zostaje przeszkolony i otrzymuje dodatkowe zaświadczenie z zakresu bezpiecznej eksploatacji i użytkowania butli gazowej, w tym jej bezpiecznej wymiany.",
        "Na zajęcia teoretyczne zapewniamy materiały dydaktyczne.",
        "Możliwość dostosowania czasu szkolenia do indywidualnych potrzeb słuchacza tak aby nie kolidowały z obowiązkami zawodowymi i prywatnymi (wieczorowo, weekendowo).",
        "Wszystkie nasze programy szkoleń zostały uzgodnione i uzyskały akceptację Urzędu Dozoru Technicznego.",
        "Każdy uczestnik otrzymuje zaświadczenie o ukończeniu kursu, poprzedzone pozytywnym zaliczeniem egzaminu wewnętrznego.",
        "Kurs kończy się egzaminem przed państwową komisją Urzędu Dozoru Technicznego.",
        "Terminy oraz cennik szkoleń ustalane są indywidualnie w uzgodnieniu z klientem tel. 667 677 912, fhudtms@poczta.fm"
      ]
    },
    reviews: {
      title: 'Wystaw nam opinię'
    },
    services: {
      title: 'Nasza oferta',
      desc: 'Kompleksowe kursy przygotowujące do egzaminów państwowych UDT. Wysoka zdawalność i profesjonalna kadra.',
      view_all: 'Zobacz wszystkie szkolenia'
    },
    common: {
      phone: '667 677 912',
      address: 'ul. Łukasiewicza 63, 38-400 Krosno',
      email: 'fhudtms@poczta.fm',
      rights: 'Wszystkie prawa zastrzeżone.',
      safe_training: 'Bezpieczne Szkolenia UDT',
      privacy: 'Polityka prywatności',
      certificates: 'Certyfikaty',
      links: 'Linki'
    }
  },
  en: {
    nav: {
      start: 'Home',
      services: 'Our Services',
      contact: 'Contact',
      call: 'Call',
      elearning: 'Training Platform'
    },
    hero: {
      title: 'Professional UDT Training in Krosno',
      desc: 'Get certified for forklifts, platforms, cranes, and hoists.',
      btn_enroll: 'Enroll now',
      btn_offer: 'Our Offer',
      upcoming: 'Upcoming Courses',
      eu_funds: 'Available with EU funding support.'
    },
    upcoming: {
      title: 'Upcoming Courses',
      enroll: 'Enrollment phone: 667 677 912',
      eu_funds_desc: 'Available with EU funding support after meeting requirements.'
    },
    fire: {
      title: 'Training for Fire Brigade',
      desc: 'FIRE packages for firefighters and candidates for the State Fire Service'
    },
    how: {
      title: 'How we work',
      complaints: 'Complaints: regarding training can be submitted in writing to: fhudtms@poczta.fm. They will be considered within 7 days.',
      steps: [
        "Theoretical and practical training and exams are conducted at the client's premises or at our center using our prepared machines.",
        "All formalities are handled on site.",
        "As part of forklift training, each student receives additional certification for safe operation and use of gas cylinders.",
        "We provide teaching materials for theoretical classes.",
        "The training schedule can be customized to individual needs (evenings, weekends) to avoid conflict with work and private duties.",
        "All our training programs are approved by the Office of Technical Inspection (UDT).",
        "Each participant receives a certificate of course completion after passing an internal exam.",
        "The course ends with an exam before the state commission of the Office of Technical Inspection (UDT).",
        "Training dates and prices are set individually (phone: 667 677 912, email: fhudtms@poczta.fm)."
      ]
    },
    reviews: {
      title: 'Leave us a review'
    },
    services: {
      title: 'Our Offer',
      desc: 'Comprehensive courses preparing for UDT state exams. High pass rate and professional staff.',
      view_all: 'View All Courses'
    },
    common: {
      phone: '667 677 912',
      address: 'ul. Łukasiewicza 63, 38-400 Krosno',
      email: 'fhudtms@poczta.fm',
      rights: 'All rights reserved.',
      safe_training: 'Safe UDT Training',
      privacy: 'Privacy Policy',
      certificates: 'Certificates',
      links: 'Links'
    }
  },
  ua: {
    nav: {
      start: 'Головна',
      services: 'Наші послуги',
      contact: 'Контакт',
      call: 'Зателефонувати',
      elearning: 'Навчальна платформа'
    },
    hero: {
      title: 'Професійне навчання UDT у Кросно',
      desc: 'Отримайте сертифікати на навантажувачі, підйомники, крани та лебідки.',
      btn_enroll: 'Записатися на kurs',
      btn_offer: 'Наша пропозиція',
      upcoming: 'Найближчі курси',
      eu_funds: 'Можливість проходження курсів за кошти ЄС.'
    },
    upcoming: {
      title: 'Найближчі курси',
      enroll: 'Запис за тел. 667 677 912',
      eu_funds_desc: 'Можливість проходження курсів за кошти ЄС при виконанні відповідних умов.'
    },
    fire: {
      title: 'Навчання для пожежної охорони',
      desc: 'Пакети FIRE для пожежників та кандидатів до набору в PSP'
    },
    how: {
      title: 'Як ми працюємо',
      complaints: 'Скарги: щодо навчання можна подавати письмово на email: fhudtms@poczta.fm. Розгляд протягом 7 днів.',
      steps: [
        "Теоретичне та практичне навчання та іспити проводяться на території підприємства або в нашому центрі на підготовленому обладнанні.",
        "Усі формальності вирішуються на місці.",
        "У рамках навчання на навантажувачі кожен курсант проходить навчання та отримує додатковий сертифікат з безпечної експлуатації газових балонів.",
        "Для теоретичних занять ми надаємо дидактичні матеріали.",
        "Можливість адаптації часу навчання до індивідуальних потреб слухача (вечірні години, вихідні).",
        "Усі наші навчальні програми узгоджені та схвалені Управлінням технічного нагляду (UDT).",
        "Кожен учасник отримує сертифікат про закінчення курсу після успішного проходження внутрішнього іспиту.",
        "Курс завершується іспитом перед державною комісією Управління технічного нагляду (UDT).",
        "Дати та вартість навчання встановлюються індивідуально (тел. 667 677 912, email: fhudtms@poczta.fm)."
      ]
    },
    reviews: {
      title: 'Залиште відгук'
    },
    services: {
      title: 'Наша пропозиція',
      desc: 'Комплексні курси підготовки до державних іспитів UDT. Висока успішність та професійний персонал.',
      view_all: 'Переглянути всі курси'
    },
    common: {
      phone: '667 677 912',
      address: 'вул. Лукасевича 63, 38-400 Кросно',
      email: 'fhudtms@poczta.fm',
      rights: 'Всі права захищені.',
      safe_training: 'Безпечне навчання UDT',
      privacy: 'Політика конфіденційності',
      certificates: 'Сертифікати',
      links: 'Посилання'
    }
  }
};
