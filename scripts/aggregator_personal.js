/**
 * DTMS Personal Data Aggregator
 * Ten skrypt używa Twojego osobistego konta Google (OAuth)
 */

const fs = require('fs').promises;
const path = require('path');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');
const { BetaAnalyticsDataClient } = require('@google-analytics/data');

// --- KONFIGURACJA ---
const CREDENTIALS_PATH = path.join(process.cwd(), 'oauth_credentials.json');
const TOKEN_PATH = path.join(process.cwd(), 'token.json'); // Tu skrypt zapisze Twoją sesję
const PROPERTY_ID = '437291125'; // Pamiętaj, żeby to zmienić na swoje ID z GA4!
const SITE_URL = 'https://szkoleniadtms.pl/';

const SCOPES = [
  'https://www.googleapis.com/auth/webmasters.readonly',
  'https://www.googleapis.com/auth/analytics.readonly'
];

async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) return client;
  
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

async function runAggregator() {
  console.log('🚀 Uruchamiam DTMS Personal Aggregator...');
  
  try {
    const auth = await authorize();
    let report = `# 📊 OSOBISTY RAPORT ANALITYCZNY — ${new Date().toLocaleDateString()}\n\n`;

    // 1. Google Search Console
    console.log('📡 Pobieram dane z Search Console...');
    try {
      const searchconsole = google.searchconsole({ version: 'v1', auth });
      const gscRes = await searchconsole.searchanalytics.query({
        siteUrl: SITE_URL,
        requestBody: {
          startDate: '2026-04-01',
          endDate: new Date().toISOString().split('T')[0],
          dimensions: ['query'],
          rowLimit: 20
        }
      });

      report += `## 1. Top Słowa Kluczowe (GSC)\n`;
      report += `| Słowo kluczowe | Kliknięcia | Wyświetlenia | CTR | Poz. |\n`;
      report += `| :--- | :--- | :--- | :--- | :--- |\n`;
      (gscRes.data.rows || []).forEach(row => {
        report += `| ${row.keys[0]} | ${row.clicks} | ${row.impressions} | ${(row.ctr * 100).toFixed(2)}% | ${row.position.toFixed(1)} |\n`;
      });
      report += '\n';
    } catch (e) {
      report += `## 1. Search Console\n⚠️ Błąd: ${e.message}\n\n`;
    }

    // 2. GA4
    console.log('📈 Pobieram dane z GA4...');
    try {
      const analyticsClient = new BetaAnalyticsDataClient({
        auth: auth
      });
      
      const [gaRes] = await analyticsClient.runReport({
        property: `properties/${PROPERTY_ID}`,
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'eventName' }],
        metrics: [{ name: 'eventCount' }],
      });

      report += `## 2. Zdarzenia (GA4 - Ostatnie 30 dni)\n`;
      report += `| Nazwa zdarzenia | Liczba |\n`;
      report += `| :--- | :--- |\n`;
      gaRes.rows.forEach(row => {
        report += `| ${row.dimensionValues[0].value} | ${row.metricValues[0].value} |\n`;
      });
    } catch (e) {
      report += `## 2. GA4\n⚠️ Błąd: ${e.message}\n\n`;
    }

    const outputPath = path.join(process.cwd(), 'LLM_CONTEXT_DATA.md');
    await fs.writeFile(outputPath, report);
    console.log(`\n✅ GOTOWE! Raport zapisany w: ${outputPath}`);

  } catch (error) {
    console.error('❌ Błąd krytyczny:', error.message);
  }
}

runAggregator();
