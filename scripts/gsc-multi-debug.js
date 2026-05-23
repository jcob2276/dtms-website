/**
 * GSC Multi-URL Debug
 * Tries various siteUrl formats.
 */
const { google } = require('googleapis');
const path = require('path');

const KEY_FILE = path.join(__dirname, '../credentials.json');
const VARIATIONS = [
  'https://szkoleniadtms.pl/',
  'https://www.szkoleniadtms.pl/',
  'sc-domain:szkoleniadtms.pl',
  'http://szkoleniadtms.pl/',
  'http://www.szkoleniadtms.pl/'
];

async function multiDebug() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });
  const authClient = await auth.getClient();
  const searchconsole = google.searchconsole({ version: 'v1', auth: authClient });

  for (const url of VARIATIONS) {
    try {
      const res = await searchconsole.searchanalytics.query({
        siteUrl: url,
        requestBody: {
          startDate: '2026-05-01',
          endDate: '2026-05-10',
          dimensions: ['query'],
          rowLimit: 1
        }
      });
      console.log(`✅ SUCCESS for URL: ${url}`);
      return;
    } catch (e) {
      console.log(`❌ FAIL for URL: ${url} (${e.message})`);
    }
  }
}

multiDebug();
