# DTMS - Audit & Technical Context (Source of Truth)

Ostatnia aktualizacja: 2026-05-06

## 1. Status Projektu: PRODUKCJA (Zoptymalizowana)
Strona szkoleniadtms.pl została w pełni zmigrowana z WordPressa na nowoczesny stos technologiczny (React + Vite). Wszystkie kluczowe funkcjonalności SEO, analityczne i wydajnościowe zostały wdrożone.

---

## 2. Co zostało wdrożone (Stan na dziś)

### ✅ SEO & Struktura Danych (Schema.org)
- **FAQ Page Schema:** Wdrożono 7 rozbudowanych pytań (ceny, terminy, obcokrajowcy, lokalizacja, ważność uprawnień, e-learning, dojazd do firm).
- **Site Navigation Schema:** Dodano strukturę ItemList dla Google, aby promować głębokie linki (anchory) do usług (Wózki, Podesty, Suwnice) bezpośrednio w wyszukiwarce.
- **Meta Tagi & Kanoniczność:** Dynamiczne zarządzanie tytułami i opisami w `App.jsx` dla każdej podstrony.

### ✅ PWA (Progressive Web App)
- **Instalowalność:** Dodano `manifest.json` z kompletem ikon.
- **Service Worker:** Plik `sw.js` zarejestrowany (z wyłączeniem localhost), umożliwia podstawowe cache'owanie i instalację na pulpicie telefonu.
- **Brand Identity:** Plik `pwa-icon.png` (białe logo) ustawiony jako favicon i ikona aplikacji.

### ✅ Wydajność & UX
- **Skeleton Loaders:** Wdrożono pulsujące ekrany ładowania w sekcji "Nasza oferta" (React state management), eliminując efekt "skakania" treści.
- **Optymalizacja obrazów:** Użycie formatów nowoczesnych i preloadowanie krytycznych zasobów (Hero, Logo) w `index.html`.
- **UI Scaling:** Powiększone logo w nagłówku dla lepszej czytelności na mobile/desktop.

### ✅ Analityka & Tracking
- **GTM:** Kontener `GTM-MPR92CBK` zintegrowany w `index.html`.
- **Google Ads:** Skrypty konwersji (AW-10994185310) przygotowane pod akcje użytkowników.
- **GA4:** Śledzenie PageViews w architekturze SPA.

### ✅ Automatyzacja & Deployment (CI/CD)
- **GitHub Actions:** Plik `.github/workflows/deploy.yml` automatycznie buduje projekt (`npm run build`) i wysyła folder `/dist/` na serwer LH.pl przez FTP do katalogu `/public_html/`.

---

## 3. Stos Technologiczny
- **Frontend:** React (Vite) + Tailwind CSS.
- **Backend/DB:** Supabase (używany do modułu egzaminacyjnego).
- **I18n:** Własny system tłumaczeń (PL, EN, UA) z zapisem w `localStorage`.

---

## 4. Co zostało do zrobienia (Następny Chapter)
1.  **Głębszy Setup Google Ads:** Dokładne mapowanie zdarzeń (kliknięcia w telefon, wysłanie formularza) na konkretne tagi konwersji.
2.  **WhatsApp Integration:** Dodanie pływającego przycisku kontaktu.
3.  **Audyt Analityczny:** Weryfikacja w Google Search Console, jak Google indeksuje nowe FAQ i Navigation Schema.

---

## 5. Ważne linki dla programisty
- **Główny plik SEO:** `index.html` (sekcja head).
- **Logika strony:** `src/App.jsx`.
- **Style:** `src/index.css`.
- **Deployment:** `.github/workflows/deploy.yml`.
