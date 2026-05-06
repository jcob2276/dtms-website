# Podsumowanie Projektu: DTMS - Profesjonalne Szkolenia Techniczne (v2.0)

Data aktualizacji: 06.05.2026, 14:59
Status: Produkcja Live (szkoleniadtms.pl)

## 1. Przegląd Projektu
Nowoczesna platforma typu Single Page Application (SPA) dla ośrodka szkoleniowego DTMS w Krośnie. Strona zastąpiła legacy WordPress, oferując drastycznie wyższą szybkość (LCP < 1.2s), bezpieczeństwo i zaawansowaną analitykę konwersji.

## 2. Stack Techniczny
- **Frontend:** React + Vite (ESM).
- **Stylizacja:** Vanilla CSS (Custom Design System) + Framer Motion (Animacje).
- **Backend (Egzaminy):** Supabase (PostgreSQL, Auth, RLS, Edge Functions).
- **Integracje:** Web3Forms (Kontakt), Google Reviews API (Slider).
- **Hosting:** LH.PL (Serwer Apache).

## 3. Kluczowe Funkcjonalności (Wdrożone)
- **Multilingual:** Pełne wsparcie dla PL, EN, UA z zapamiętywaniem wyboru w `localStorage`.
- **Programmatic SEO (Miasta):** Dynamiczne ścieżki `/kursy-udt-jaslo`, `/kursy-udt-sanok` itd., które automatycznie personalizują tytuły, opisy i dane SEO pod lokalnego klienta.
- **System Egzaminacyjny:** Bezpieczna platforma do przesyłania wyników egzaminów do bazy Supabase z pełnym audytem.
- **Optymalizacja Mobile-First:** 84% ruchu pochodzi z urządzeń mobilnych – interfejs zoptymalizowany pod szybkie akcje (Phone Bubble, Mobile Menu).

## 4. SEO i Marketing (Strategia 2026)
- **Słowa Kluczowe:** Celowanie w frazy B2C (indywidualne uprawnienia) oraz B2B (szkolenia grupowe, dla pracowników).
- **Schema.org (Lokalne SEO):** Dynamiczny JSON-LD wstrzykujący dane `LocalBusiness` i `Course` z uwzględnieniem lokalizacji użytkownika.
- **Zaszyte Semantyki:** Specjalny moduł `seoKeywords.js` wzmacniający widoczność wszystkich 17 kategorii usług.
- **Przekierowania 301:** Implementacja w `.htaccess` blokująca błędy 404 po starych ścieżkach `/amp` z WordPressa.

## 5. Analityka i Konwersja
- **GTM (Google Tag Manager):** `GTM-MPR92CBK` - centralny punkt zarządzania tagami.
- **Śledzenie Zdarzeń (GA4/Ads):**
  - `phone_click`: Śledzenie kliknięć w numer telefonu na całej stronie.
  - `form_submit`: Śledzenie wysłania formularza kontaktowego.
  - `elearning_click`: Śledzenie przejść do platformy szkoleniowej.
- **Enhanced Conversions:** Skrypty przygotowane pod przesyłanie rozszerzonych danych konwersji do Google Ads.

## 6. Infrastruktura i Deployment
- **.htaccess:** Skonfigurowany pod SPA (routing fallback do index.html), kompresję Gzip oraz wymuszanie HTTPS.
- **Sitemap:** Automatyczny generator (`sitemap_generator.js`) uwzględniający wszystkie miasta i języki.
- **Build Process:** **Automatyczny (CI/CD)**. Każdy `git push origin main` wyzwala GitHub Action, która buduje projekt i przesyła go na serwer LH.PL. Manualny upload nie jest już wymagany.

## 7. Kontakt Techniczny
Dostęp do kodu źródłowego: `GitHub - jcob2276/stronaDTMS`
Administracja: Jakub Soboń
--------------------------------------------------------------------------------
Dokument wygenerowany przez Antigravity (Advanced Agentic Coding AI).
