/**
 * GSC Advanced Miner
 * Finds "Low Hanging Fruit" - keywords in pos 8-25 with high impressions.
 * Autor: Antigravity AI (Dev)
 */
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const KEY_FILE = path.join(__dirname, '../credentials.json');
const SITE_URL = 'https://szkoleniadtms.pl/';

async function mineGSC() {
  console.log('🔍 Starting GSC Deep Data Mining (Inżynierskie podejście)...');
  
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: KEY_FILE,
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });
    const authClient = await auth.getClient();
    const searchconsole = google.searchconsole({ version: 'v1', auth: authClient });

    // Pobieramy duży zestaw danych (do 5000 wierszy)
    const res = await searchconsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate: '2026-02-01',
        endDate: new Date().toISOString().split('T')[0],
        dimensions: ['query'],
        rowLimit: 5000
      }
    });

    const rows = res.data.rows || [];
    console.log(`✅ Pobrano ${rows.length} fraz kluczowych.`);

    // Filtrowanie "Ukrytego Złota" (Pozycje 8-25, duża liczba wyświetleń)
    const hiddenGold = rows
      .filter(row => row.position >= 8 && row.position <= 25)
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 50);

    let report = `# 🎯 RAPORT GSC: UKRYTE ZŁOTO (SEO QUICK WINS) — ${new Date().toLocaleDateString()}\n\n`;
    report += `> [!NOTE]\n`;
    report += `> Poniższe frazy to słowa, na które DTMS jest widoczny (strona 1/2), ale nie wygrywa jeszcze kliknięć. \n`;
    report += `> Optymalizacja pod te frazy da najszybszy zwrot z inwestycji (ROI).\n\n`;
    
    report += `## Top 50 Szans SEO (Krosno & Region)\n`;
    report += `| Fraza | Wyświetlenia | Kliknięcia | CTR | Pozycja | Rekomendacja Deva |\n`;
    report += `| :--- | :--- | :--- | :--- | :--- | :--- |\n`;

    hiddenGold.forEach(row => {
      const query = row.keys[0];
      let recommendation = 'Dodaj dedykowaną sekcję H3';
      
      if (query.includes('opinie')) recommendation = 'Stwórz podstronę /opinie-kursantow';
      else if (query.includes('cena') || query.includes('koszt')) recommendation = 'Dodaj tabelę cennika na stronie kursu';
      else if (query.includes('krosno')) recommendation = 'Wzmocnij lokalne H1/H2 na /pl/kursy-udt-krosno';
      else if (query.includes('przedłużenie') || query.includes('ważność')) recommendation = 'Stwórz artykuł "Jak przedłużyć uprawnienia UDT"';
      else if (query.includes('egzamin') || query.includes('pytania')) recommendation = 'Dodaj sekcję FAQ z pytaniami egzaminacyjnymi';
      
      report += `| ${query} | ${row.impressions} | ${row.clicks} | ${(row.ctr * 100).toFixed(2)}% | ${row.position.toFixed(1)} | ${recommendation} |\n`;
    });

    const outputPath = path.join(__dirname, '../GSC_SEO_OPPORTUNITIES.md');
    fs.writeFileSync(outputPath, report);
    console.log(`✅ Raport zapisany w: ${outputPath}`);

  } catch (error) {
    console.error('❌ Błąd API:', error.message);
    if (error.message.includes('403')) {
      console.log('\n⚠️ TIP: Musisz dodać maila serwisowego do GSC jako użytkownika:');
      console.log('👉 dtms-aggregator@dtms-analytics.iam.gserviceaccount.com');
    }
  }
}

mineGSC();
