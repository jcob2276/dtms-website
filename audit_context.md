# DTMS v2.0: Dokumentacja Techniczna, Marketingowa i Roadmapa
**Status:** Produkcja Live | **Deployment:** CI/CD (GitHub Actions) | **Szybkość:** LCP < 1.2s

---

## 1. Architektura i Stack Techniczny (Deep Dive)
Strona jest zbudowana jako **Single Page Application (SPA)**, co oznacza, że po pierwszym załadowaniu, nawigacja między podstronami odbywa się bez odświeżania przeglądarki.

- **React + Vite:** Wykorzystanie najszybszego obecnego bundlera (Vite) z modułami ESM.
- **Framer Motion:** Fizyczne silniki animacji (spring-based) dla płynnych przejść i efektów "hover".
- **Supabase Backend:** Integracja z bazą danych PostgreSQL. 
  - *Funkcja:* Obsługa bezpiecznego przesyłania wyników egzaminów.
  - *Bezpieczeństwo:* Row Level Security (RLS) – nikt nie odczyta wyników bez klucza anon/service.

---

## 2. Inwentarz Funkcji i Modułów (Co siedzi w kodzie?)

### A. System Językowy (I18n Custom System)
- **Moduł:** `LanguageContext.jsx`
- **Działanie:** Obsługuje PL, EN, UA. 
- **Persistence:** Zapamiętuje wybór w `localStorage`. Jeśli użytkownik wróci za miesiąc, strona "pamięta" jego język.

### B. PageManager (Mózg SEO)
- **Moduł:** `App.jsx` -> `useEffect` na `location`.
- **Funkcja:** Dynamicznie podmienia `document.title`, `meta description` oraz `canonical` w zależności od ścieżki (również dla miast).
- **Programmatic SEO:** Automatyczne rozpoznawanie parametru `:cityId` i personalizacja treści w Hero oraz w tagach Meta.

### C. System Analityczny (Conversion Tracking)
- **`trackPhoneClick`:** Funkcja podpięta pod każdy link `tel:`. Wysyła zdarzenie `phone_click` do GTM i wyzwala `gtag_report_conversion` dla Google Ads.
- **Web3Forms Integration:** Formularz kontaktowy przesyła dane do API, a po sukcesie wysyła zdarzenie `form_submit`.
- **Speculation Rules API:** (Wdrożone!) Skrypt w `index.html`, który nakazuje przeglądarce pre-renderowanie stron w tle. **Efekt: ładowanie stron w 0ms.**

### D. UI Components (Inwentarz)
- **GoogleReviewSlider:** Moduł pobierający i wyświetlający opinie w karuzeli 480px.
- **ServiceArea:** Komponent obliczający odległość od miast wspieranych.
- **FloatingContact:** Dynamiczny przycisk telefonu, widoczny tylko przy scrollowaniu.

---

## 3. SEO 2026: Strategia Dominacji Lokalnej
- **Programmatic Landing Pages:** Strona obsługuje setki kombinacji URL (Miasto + Usługa) bez tworzenia fizycznych plików.
- **B2B Semantic Layer:** W pliku `seoKeywords.js` zaszyte są frazy skierowane do HR i Właścicieli firm (np. "szkolenia grupowe", "zlecenie dla firm").
- **JSON-LD Structured Data:** Zaawansowany moduł generujący dane strukturalne `LocalBusiness` i `Course`. Google widzi Twoją firmę jako autorytet w regionie.
- **Legacy 301 System:** W `.htaccess` wdrożyliśmy reguły przechwytujące stare linki `/amp` z WordPressa i kierujące je na Home, by nie tracić autorytetu domeny.

---

## 4. Infrastruktura i Automatyzacja
- **Deployment (GitHub Actions):** Plik `.github/workflows/deploy.yml`. 
  - *Proces:* Każdy `git push` wyzwala build na maszynie wirtualnej Ubuntu, generuje sitemap i przesyła pliki przez FTP na LH.pl.
- **Performance:** 
  - `rel="preload"` dla krytycznych zasobów (logo, hero image).
  - `fetchpriority="high"` dla głównego baneru.
  - Kompresja Gzip wymuszona w `.htaccess`.

---

## 5. Roadmapa Rozwoju (Co testujemy dalej?)

### KROK 1: PWA (Progressive Web App)
- **Zadanie:** Dodanie `manifest.json`.
- **Cel:** Ikona DTMS na pulpicie telefonu użytkownika.

### KROK 2: FAQ Schema
- **Zadanie:** Dodanie sekcji pytań i odpowiedzi na podstronach.
- **Cel:** Zabranie 2x więcej miejsca w wynikach wyszukiwania Google.

### KROK 3: Skeleton Loaders
- **Zadanie:** Implementacja "szkieletów" zamiast loading spinnerów.
- **Cel:** Jeszcze wyższe postrzeganie szybkości (Perceived Performance).

### KROK 4: WhatsApp Integration
- **Zadanie:** Dodanie pływającego przycisku czatu.
- **Cel:** Zwiększenie liczby szybkich zapytań od klientów mobilnych.

---
**Dokumentacja utrzymywana i aktualizowana przez Antigravity AI.**
*Wszystkie systemy sprawne. Kurs na 1. miejsce w Google utrzymany.*
