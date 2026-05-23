/**
 * GSC Debug Script
 * Lists all sites the service account has access to.
 */
const { google } = require('googleapis');
const path = require('path');

const KEY_FILE = path.join(__dirname, '../credentials.json');

async function debugGSC() {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: KEY_FILE,
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });
    const authClient = await auth.getClient();
    const searchconsole = google.searchconsole({ version: 'v1', auth: authClient });

    const res = await searchconsole.sites.list();
    console.log('--- SITES ACCESSIBLE BY SERVICE ACCOUNT ---');
    console.log(JSON.stringify(res.data.siteEntry, null, 2));
    console.log('-------------------------------------------');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

debugGSC();
