# DTMS — szkoleniaDTMS.pl

> Strona dla centrum szkoleń UDT — wózki widłowe, suwnice, żurawie, podesty. Krosno i okolice.

**Live:** [szkoleniaDTMS.pl](https://szkoleniaDTMS.pl)

![Next.js](https://img.shields.io/badge/Next.js_16-000?style=flat-square&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Tailwind](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![i18n](https://img.shields.io/badge/i18n-PL_EN_UA-7C3AED?style=flat-square)
![Deploy](https://img.shields.io/badge/Deploy-Apache_Static-orange?style=flat-square)

---

## O projekcie

Strona marketingowa dla **DTMS Marek Soboń** — ośrodka szkoleniowego UDT w Krośnie. Obsługuje klientów z Polski, Ukrainy i rynków anglojęzycznych.

Zbudowana jako **statyczny export** — zero serwera, maksymalna szybkość, tanie hosting.

## Funkcjonalności

- 🌍 **Trójjęzyczność** — PL / EN / UA (automatyczne przekierowanie po języku przeglądarki)
- 📍 **SEO lokalne** — zoptymalizowana pod frazy Krosno + region + kategorie UDT
- 🗺️ **Sitemap + robots.txt** — generowane automatycznie przez Next.js
- ⚡ **Animacje** — Framer Motion, żadnych bibliotek CSS-only
- 📱 **Responsive** — mobile-first, Tailwind v4
- 🔀 **Routing Apache** — `.htaccess` obsługuje SPA routing na hostingu

## Stack

| Warstwa | Technologia |
|---------|------------|
| Framework | Next.js 16 (App Router, static export) |
| UI | React 19 + Tailwind CSS v4 |
| Animacje | Framer Motion |
| Ikony | Lucide React |
| i18n | Custom `app/[locale]/` routing |
| SEO | `sitemap.js` + `robots.js` (Next.js native) |
| Hosting | Apache (hostinghause.pl) |

## Struktura

```
app/
├── [locale]/          # Strony PL / EN / UA
├── locales/           # Tłumaczenia
├── sitemap.js         # Automatyczna mapa strony
├── robots.js          # Reguły dla crawlerów
└── globals.css        # Style globalne
components/            # Komponenty UI
lib/                   # Dane, metadata, logika stron
public/
├── obrazy/            # Assety graficzne
└── .htaccess          # Routing Apache
```

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

Strona dostępna na [http://localhost:3000](http://localhost:3000)

## Build i deploy

```bash
npm run build
```

Pliki statyczne trafiają do `out/`. Zawartość `out/` wgraj na hosting Apache.

```bash
# Przykład przez FTP/SFTP
scp -r out/* user@host:/public_html/
```

## Licencja

Projekt komercyjny — kod źródłowy udostępniony w celach portfolio. Wszelkie prawa zastrzeżone © DTMS Marek Soboń.
