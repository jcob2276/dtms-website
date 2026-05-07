import { getDictionary } from "../../i18n";

export default async function PrivacyPolicy({ params }) {
  const lang = 'en';
  
  const content = {
    pl: {
      title: "Polityka prywatności",
      sections: [
        { h: "1. Informacje ogólne", p: ["Niniejsza polityka dotyczy Serwisu www, funkcjonującego pod adresem url: szkoleniadtms.pl", "Operatorem serwisu oraz Administratorem danych osobowych jest: Marek Soboń ul. Krośnieńska 138E 38-457 Świerzowa Polska", "Adres kontaktowy poczty elektronicznej operatora: fhudtms@poczta.fm", "Operator jest Administratorem Twoich danych osobowych w odniesieniu do danych podanych dobrowolnie w Serwisie."] },
        { h: "2. Wybrane metody ochrony danych", p: ["Miejsca logowania i wprowadzania danych osobowych są chronione w warstwie transmisji (certyfikat SSL). Dane osobowe przechowywane w bazie danych są zaszyfrowane w taki sposób, że jedynie Operator posiadający klucz może je odczytać.", "W celu ochrony danych Operator regularnie wykonuje kopie bezpieczeństwa oraz aktualizuje oprogramowanie wykorzystywane do przetwarzania danych."] },
        { h: "3. Hosting", p: ["Serwis jest hostowany (technicznie utrzymywany) na serwerach operatora: hostinghause.pl"] },
        { h: "4. Twoje prawa", p: ["Przysługuje Ci prawo żądania od Administratora dostępu do danych osobowych, ich sprostowania, usunięcia, ograniczenia przetwarzania oraz przenoszenia danych.", "Na działania Administratora przysługuje skarga do Prezesa Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa."] },
        { h: "5. Pliki cookies", p: ["Serwis korzysta z plików cookies w celu utrzymania sesji użytkownika oraz realizacji celów marketingowych. Możesz zarządzać plikami cookies w ustawieniach swojej przeglądarki."] }
      ]
    },
    en: {
      title: "Privacy Policy",
      sections: [
        { h: "1. General Information", p: ["This policy applies to the website operating at: szkoleniadtms.pl", "The website operator and Personal Data Administrator is: Marek Soboń, ul. Krośnieńska 138E, 38-457 Świerzowa Polska", "Operator's contact email: fhudtms@poczta.fm", "The Operator is the Administrator of your personal data provided voluntarily on the Website."] },
        { h: "2. Data Protection Methods", p: ["Login and data entry points are protected by an SSL certificate. Personal data stored in the database is encrypted so that only the Operator with the key can read it.", "To protect data, the Operator regularly performs backups and updates processing software."] },
        { h: "3. Hosting", p: ["The website is hosted (technically maintained) on the servers of: hostinghause.pl"] },
        { h: "4. Your Rights", p: ["You have the right to request access to your personal data, its rectification, deletion, restriction of processing, and data portability.", "You have the right to lodge a complaint with the President of the Personal Data Protection Office."] },
        { h: "5. Cookies", p: ["The website uses cookies to maintain user sessions and for marketing purposes. You can manage cookies in your browser settings."] }
      ]
    },
    ua: {
      title: "Політика конфіденційності",
      sections: [
        { h: "1. Загальна інформація", p: ["Ця політика стосується веб-сайту, що працює за адресою: szkoleniadtms.pl", "Оператором сервісу та Адміністратором персональних даних є: Marek Soboń, ul. Krośnieńska 138E, 38-457 Świerzowa Polska", "Контактний e-mail оператора: fhudtms@poczta.fm", "Оператор є Адміністратором ваших персональних даних, наданих добровільно на Сайті."] },
        { h: "2. Методи захисту даних", p: ["Місця входу та введення персональних даних захищені сертифікатом SSL. Персональні дані, що зберігаються в базі даних, зашифровані так, що їх може прочитати лише Оператор із ключем.", "Для захисту даних Оператор регулярно створює резервні копії та оновлює програмне забезпечення."] },
        { h: "3. Хостинг", p: ["Сайт розміщено (технічно підтримується) на серверах: hostinghause.pl"] },
        { h: "4. Ваші права", p: ["Ви маєте право вимагати від Адміністратора доступу до ваших персональних даних, їх виправлення, видалення, обмеження обробки та перенесення даних.", "Ви маєте право подати скаргу до відповідного органу з захисту персональних даних."] },
        { h: "5. Файли cookie", p: ["Сайт використовує файли cookie для підтримки сесій користувачів та маркетингових цілей. Ви можете керувати файлами cookie в налаштуваннях браузера."] }
      ]
    }
  };

  const c = content[lang] || content.pl;

  return (
    <div className="pt-48 pb-24 bg-white">
      <div className="container max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-black mb-12 text-slate-900">{c.title}</h1>
        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-12 font-medium">
          {c.sections.map((sec, i) => (
            <section key={i}>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">{sec.h}</h2>
              {sec.p.map((para, j) => <p key={j} className="mb-4">{para}</p>)}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}