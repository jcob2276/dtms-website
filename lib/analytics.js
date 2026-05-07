'use client';

/**
 * DTMS Analytics — centralna biblioteka zdarzeń GA4 + GTM
 * Kompatybilna z Google Consent Mode v2
 */

function push(eventData) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventData);
}

function gtagEvent(eventName, params = {}) {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

// ─── Telefon ───────────────────────────────────────────────
export function trackPhoneClick(location = 'unknown') {
  push({
    event: 'phone_click',
    event_category: 'contact',
    event_label: `667677912_${location}`,
    page_language: getCurrentLang(),
  });
  // Google Ads Conversion
  if (typeof window !== 'undefined' && typeof window.gtag_report_conversion === 'function') {
    window.gtag_report_conversion();
  }
}

// ─── Email ─────────────────────────────────────────────────
export function trackEmailClick(location = 'unknown') {
  push({
    event: 'email_click',
    event_category: 'contact',
    event_label: `fhudtms@poczta.fm_${location}`,
    page_language: getCurrentLang(),
  });
}

// ─── Facebook ──────────────────────────────────────────────
export function trackFacebookClick() {
  push({
    event: 'social_click',
    event_category: 'social',
    event_label: 'facebook',
    page_language: getCurrentLang(),
  });
}

// ─── Nawigacja ─────────────────────────────────────────────
export function trackNavClick(itemName) {
  push({
    event: 'nav_click',
    event_category: 'navigation',
    event_label: itemName,
    page_language: getCurrentLang(),
  });
}

// ─── Zmiana języka ─────────────────────────────────────────
export function trackLanguageSwitch(from, to) {
  push({
    event: 'language_switch',
    event_category: 'engagement',
    event_label: `${from}_to_${to}`,
    from_language: from,
    to_language: to,
  });
}

// ─── Cookie Consent ────────────────────────────────────────
export function trackCookieConsent(action) {
  push({
    event: 'cookie_consent',
    event_category: 'gdpr',
    event_label: action, // 'accepted' | 'rejected'
    page_language: getCurrentLang(),
  });
}

// ─── Kurs / Szkolenie ──────────────────────────────────────
export function trackCourseEnquiry(courseName) {
  push({
    event: 'course_enquiry',
    event_category: 'courses',
    event_label: courseName,
    page_language: getCurrentLang(),
  });
  gtagEvent('generate_lead', {
    currency: 'PLN',
    value: 0,
    lead_source: courseName,
  });
}

// ─── Opinia Google ─────────────────────────────────────────
export function trackReviewClick() {
  push({
    event: 'review_click',
    event_category: 'social_proof',
    event_label: 'google_review',
    page_language: getCurrentLang(),
  });
}

// ─── Platforma szkoleniowa ─────────────────────────────────
export function trackPlatformClick() {
  push({
    event: 'platform_click',
    event_category: 'navigation',
    event_label: 'elearning_platform',
    page_language: getCurrentLang(),
  });
}

// ─── Strona miasta ─────────────────────────────────────────
export function trackCityPageView(cityId) {
  push({
    event: 'city_page_view',
    event_category: 'local_seo',
    event_label: cityId,
    page_language: getCurrentLang(),
  });
  // Remarketing Google Ads
  gtagEvent('page_view', { send_to: 'AW-10994185310' });
}

// ─── Scroll depth ──────────────────────────────────────────
export function trackScrollDepth(percent) {
  push({
    event: 'scroll_depth',
    event_category: 'engagement',
    event_label: `${percent}%`,
    scroll_percent: percent,
    page_language: getCurrentLang(),
  });
}

// ─── Helper ────────────────────────────────────────────────
function getCurrentLang() {
  if (typeof window === 'undefined') return 'pl';
  const path = window.location.pathname;
  if (path.startsWith('/en')) return 'en';
  if (path.startsWith('/ua')) return 'ua';
  return 'pl';
}
