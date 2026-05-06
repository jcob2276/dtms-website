# DTMS - Pełna Dokumentacja Techniczna i Funkcjonalna (Master Source of Truth)

Ostatnia aktualizacja: 2026-05-06

---

## 1. Architektura Systemu (Podstawy)
- **Framework:** React 18+ zbudowany przy użyciu Vite.
- **Typ Aplikacji:** SPA (Single Page Application) – strona nie przeładowuje się przy przechodzeniu między sekcjami.
- **Routing:** Autorski system `PageManager` (symulacja routera), który zarządza widocznością komponentów i automatycznie aktualizuje tagi `<link rel="canonical">` oraz tytuły stron.
- **Stylizacja:** Vanilla CSS + Tailwind CSS (używany do layoutu i responsywności).
- **Hosting:** LH.pl (serwer FTP).
- **CI/CD:** Automatyczne budowanie i deployment przez GitHub Actions (plik `.github/workflows/deploy.yml`).

---

## 2. Funkcjonalności Front-end (Co klika użytkownik?)

### 🧭 Nawigacja & Header
- **Logo:** Przeskalowane (powiększone) dla lepszej widoczności. Linkuje do strony głównej.
- **Menu:** Home, Nasze usługi, Kontakt.
- **Przycisk "Platforma E-learningowa":** Link zewnętrzny do systemu szkoleniowego.
- **Przycisk Telefonu:** Bezpośredni link `tel:` do szybkiego kontaktu na mobile.
- **Language Switcher:** Obsługa 3 języków (PL, EN, UA). Wybór jest zapisywany w `localStorage` (strona pamięta język po odświeżeniu).

### 🏠 Sekcje Strony Głównej
- **Hero Section:** Wielki baner z napisem, przyciskiem "Zobacz ofertę" i optymalizowanym obrazem tła (preload).
- **Statystyki (Liczniki):** Animowane liczniki przeszkolonych osób, wydanych certyfikatów i dostępnych maszyn.
- **Sekcja Oferta (Kluczowa):** 
    - Podział na kategorie (Wózki widłowe, Podesty ruchome, Suwnice, Żurawie, HDS itd.).
    - **Skeleton Loaders:** Zamiast pustego miejsca podczas ładowania danych, użytkownik widzi pulsujące szablony kart.
- **Google Reviews Slider:** Dynamiczny suwak z opiniami klientów (pobrany i ostylowany jako "Premium Light").
- **Sekcja "O nas":** Tekst opisujący doświadczenie firmy i Marka Sobonia.
- **Certyfikaty:** Galeria/lista logotypów i certyfikatów potwierdzających uprawnienia ośrodka.

### 📞 Kontakt & Formularz
- **Formularz Kontaktowy:** Obsługiwany przez **Web3Forms**. Wiadomości trafiają bezpośrednio na e-mail właściciela bez potrzeby własnego backendu.
- **Walidacja:** Formularz sprawdza poprawność e-maila i czy pola nie są puste.
- **Dynamiczne Tłumaczenia:** Pola formularza i komunikaty (Sukces/Błąd) zmieniają się wraz z wybranym językiem.

---

## 3. SEO i Struktura Danych (Głębokie SEO)

### 📈 Meta Tagi
- **Dynamiczne Tytuły:** Każda podstrona (Home, Usługi, Kontakt) ma unikalny `title` i `meta description`.
- **Open Graph (OG):** Skonfigurowane tagi dla Facebooka i social media (obrazek, tytuł, opis).
- **Favicon:** Plik `pwa-icon.png` (białe logo) – widoczny na zakładkach przeglądarki.

### 🤖 Schema.org (JSON-LD)
- **FAQPage:** Wstrzyknięty kod z 7 odpowiedziami na najczęstsze pytania. Pozwala na wyświetlanie "harmonijki" z pytaniami bezpośrednio w Google.
- **SiteNavigationElement:** Mapa linków kotwicowych (`/uslugi#wozki` itd.), która pomaga Google tworzyć tzw. "sitelinks" pod wynikiem wyszukiwania.

---

## 4. PWA (Aplikacja Mobilna)
- **Manifest:** Plik `manifest.json` definiuje nazwę "DTMS", kolory brandowe i ścieżki do ikon.
- **Service Worker (`sw.js`):** 
    - Obsługuje podstawowe cache'owanie zasobów.
    - Pozwala na instalację strony na pulpicie (Android/iOS).
    - **Blokada Localhost:** SW nie uruchamia się na `localhost`, aby nie psuć pracy deweloperskiej.
- **Ikonka:** `pwa-icon.png` (biała wersja logo) – zoptymalizowana pod manifest.

---

## 5. Analityka i Tracking (Google Environment)

### 🛠️ Google Tag Manager (GTM)
- **ID:** `GTM-MPR92CBK`.
- **Implementacja:** Skrypt w `<head>` i `<noscript>` w `<body>`.
- **Rola:** Centralny punkt zarządzania wszystkimi skryptami (GA4, Facebook Pixel, Google Ads).

### 📊 Google Analytics 4 (GA4)
- **ID:** `G-XXXXXXXXXX` (zarządzane przez GTM).
- **PageView Tracking:** Skonfigurowane śledzenie odsłon w architekturze SPA (wyzwalane przy zmianie wirtualnej ścieżki).
- **Event Tracking:** 
    - Kliknięcia w numer telefonu (leads).
    - Kliknięcia w przycisk E-learningu.
    - Wysłanie formularza kontaktowego.

### 💰 Google Ads
- **ID:** `AW-10994185310`.
- **Conversion Tracking:** Wdrożony skrypt `gtag_report_conversion`, który raportuje do Google Ads moment wysłania formularza lub kliknięcia w kluczowe przyciski.

---

## 6. Infrastruktura & Backend (Supabase)
- **Baza Danych:** Supabase (PostgreSQL).
- **Moduł Egzaminacyjny:** System testów dla kursantów z automatycznym sprawdzaniem wyników i zapisem do bazy.
- **Bezpieczeństwo:** RLS (Row Level Security) skonfigurowane w Supabase, aby chronić dane egzaminów.

---

## 7. Optymalizacja Techniczna
- **Gzip/Brotli:** Kompresja wymuszona przez `.htaccess` na serwerze LH.pl.
- **Preload:** Krytyczne obrazy i fonty są preloadowane w `index.html`.
- **Clean Code:** Brak nieużywanych bibliotek, minimalizacja bundle'a JS (Vite).
- **Pamięć podręczna:** Skonfigurowane nagłówki `Cache-Control` dla zasobów statycznych.
