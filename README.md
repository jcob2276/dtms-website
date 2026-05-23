# DTMS — szkoleniadtms.pl

Strona Next.js (static export) dla DTMS Marek Soboń — szkolenia UDT w Krośnie i okolicach.

## Development

```bash
npm install
npm run dev
```

Strona lokalna: [http://localhost:3000](http://localhost:3000)

## Build produkcyjny

```bash
npm run build
```

Pliki statyczne trafiają do katalogu `out/`. Wgraj zawartość `out/` na hosting (Apache).

Routing i przekierowania obsługuje `public/.htaccess` (hostinghause.pl).

## Struktura

- `app/[locale]/` — strony PL / EN / UA
- `components/` — komponenty UI
- `lib/` — dane, metadata, logika stron
- `public/obrazy/` — assety graficzne
- `scripts/` — narzędzia SEO/analityki (lokalne, nie deployowane)
