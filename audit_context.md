# Audit Context: DTMS Platform Modernization (React SPA)

## Project Overview
This project is a high-performance modernization of the `szkoleniadtms.pl` platform. It has transitioned from a legacy WordPress architecture to a custom, lightweight **React Single Page Application (SPA)** to ensure maximum speed, conversion, and user experience.

## Technology Stack
- **Frontend Framework**: React 18+ (Vite)
- **Routing**: React Router DOM (with dynamic scroll-to-top and hash navigation)
- **Animations**: Framer Motion (micro-animations, entrance transitions, glassmorphism effects)
- **Icons**: Lucide React
- **Styling**: Vanilla CSS with a custom design system (Utility-first approach)
- **Internationalization (i18n)**: Custom-built `LanguageProvider` supporting **Polish (PL), English (EN), and Ukrainian (UA)** with state persistence in `localStorage`.

## Key Implementation Details

### 1. Internationalization & Localization
- **Architecture**: A context-based system that wraps the entire app, allowing for real-time language switching without page reloads.
- **Coverage**: All UI labels, service descriptions, and metadata are fully translated.
- **Persistence**: User preference is saved across sessions.

### 2. Service Catalog (The "Core")
- **Content**: 17 distinct training categories (UDT certification focused).
- **Structure**: Each service includes localized titles, summaries, detailed descriptions, and exam information.
- **Assets**: Optimized local imagery stored in `/public/obrazy/`.

### 3. SEO & Performance
- **Dynamic SEO**: A `PageManager` component listens to route changes and updates `document.title` and meta tags dynamically based on the current language and page.
- **Performance**: Zero heavy WordPress plugins. Fast TBT (Total Blocking Time) and LCP (Largest Contentful Paint).
- **Security**: Basic `ErrorBoundary` implementation to prevent runtime crashes from affecting the entire UI.

### 4. Interactive Components
- **Contact System**: Floating contact widget + side-by-side call-to-action buttons in the hero section.
- **Form Integration**: Contact form with dynamic service selection (linked to the `DETAILED_SERVICES` array).
- **Social Proof**: Integrated JotForm Google Reviews widget.
- **Compliance**: Custom Cookie Consent manager.

### 5. Transition from WordPress (Comparison for Auditor)
| Feature | Legacy (WordPress) | Modern (Current React SPA) |
| :--- | :--- | :--- |
| **Speed** | Slow (Heavy DB queries, plugins) | Near-instant (Static assets, client-side routing) |
| **SEO** | Plugin-dependent (Yoast/RankMath) | Native dynamic metadata management |
| **i18n** | Complex (WPML/Polylang) | Lightweight custom Context API |
| **UX** | Template-constrained | Custom-built, high-conversion design |
| **Hosting** | PHP/MySQL Required | Static Hosting (Vercel/Netlify) compatible |

## Current Status
- [x] Full content restoration (17 categories).
- [x] Multi-language support (PL, EN, UA) finalized.
- [x] Mobile navigation and UI polished.
- [x] Git history stabilized and committed.

## Future Optimization Potential
- Integration with a headless CMS (e.g., Strapi, Sanity) if non-technical content management is needed.
- PWA (Progressive Web App) manifest for offline access and mobile installation.
- Advanced Analytics (GTM/GA4) event tracking for form submissions.
