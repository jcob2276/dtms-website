/**
 * DTMS Data Aggregator for LLM Analysis
 * Autor: Antigravity AI
 */

const { google } = require('googleapis');
const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const fs = require('fs');
const path = require('path');

// --- KONFIGURACJA ---
const KEY_FILE = path.join(__dirname, '../credentials.json');
const PROPERTY_ID = '437291125'; // Przykładowy ID (wpisz swój z GA4 Admin -> Property Settings)
const SITE_URL = 'https://szkoleniadtms.pl/';

async function runAggregator() {
  console.log('🚀 Uruchamiam DTMS Data Aggregator...');
  let report = `# 📊 RAPORT DANYCH ANALITYCZNYCH — ${new Date().toLocaleDateString()}\n\n`;

  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: KEY_FILE,
      scopes: [
        'https://www.googleapis.com/auth/webmasters.readonly',
        'https://www.googleapis.com/auth/analytics.readonly'
      ],
    });
    const authClient = await auth.getClient();

    // 1. Audyt Techniczny Kodu (Lokalny)
    console.log('🔍 Skanuję lokalną konfigurację...');
    report += `## 1. Audyt Tagi / Pixel (Kod lokalny)\n`;
    const layoutPath = path.join(__dirname, '../lib/localeLayout.js');
    const layoutContent = fs.readFileSync(layoutPath, 'utf8');
    report += `- Google Tag Manager: ${layoutContent.includes('GTM-') ? '✅ OK' : '❌ Brak'}\n`;
    report += `- Google Ads Remarketing: ${layoutContent.includes('AW-') ? '✅ OK' : '❌ Brak'}\n\n`;

    // 2. Google Search Console - Słowa Kluczowe
    console.log('📡 Pobieram dane z Search Console...');
    try {
      const searchconsole = google.searchconsole({ version: 'v1', auth: authClient });
      const gscRes = await searchconsole.searchanalytics.query({
        siteUrl: SITE_URL,
        requestBody: {
          startDate: '2026-04-01',
          endDate: new Date().toISOString().split('T')[0],
          dimensions: ['query'],
          rowLimit: 20
        }
      });

      report += `## 2. Top Słowa Kluczowe (GSC)\n`;
      report += `| Słowo kluczowe | Kliknięcia | Wyświetlenia | CTR | Poz. |\n`;
      report += `| :--- | :--- | :--- | :--- | :--- |\n`;
      (gscRes.data.rows || []).forEach(row => {
        report += `| ${row.keys[0]} | ${row.clicks} | ${row.impressions} | ${(row.ctr * 100).toFixed(2)}% | ${row.position.toFixed(1)} |\n`;
      });
      report += '\n';
    } catch (e) {
      report += `## 2. Search Console\n⚠️ Błąd API: ${e.message}\n\n`;
    }

    // 3. GA4 - Konwersje i Ruch
    console.log('📈 Pobieram dane z GA4...');
    try {
      const analyticsClient = new BetaAnalyticsDataClient({ keyFilename: KEY_FILE });
      const [gaRes] = await analyticsClient.runReport({
        property: `properties/${PROPERTY_ID}`,
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'eventName' }],
        metrics: [{ name: 'eventCount' }],
      });

      report += `## 3. Zdarzenia i Konwersje (GA4 - Ostatnie 30 dni)\n`;
      report += `| Nazwa zdarzenia | Liczba |\n`;
      report += `| :--- | :--- |\n`;
      gaRes.rows.forEach(row => {
        report += `| ${row.dimensionValues[0].value} | ${row.metricValues[0].value} |\n`;
      });
      report += '\n';
    } catch (e) {
      report += `## 3. GA4\n⚠️ Błąd API: ${e.message}\n\n`;
    }

    // Zapisz raport
    const outputPath = path.join(__dirname, '../LLM_CONTEXT_DATA.md');
    fs.writeFileSync(outputPath, report);
    console.log(`\n✅ GOTOWE! Raport zapisany w: ${outputPath}`);

  } catch (error) {
    console.error('❌ Błąd krytyczny:', error.message);
    console.log('\nUpewnij się, że plik credentials.json znajduje się w głównym folderze projektu.');
  }
}

runAggregator();
