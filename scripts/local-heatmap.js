/**
 * Local SEO Heatmap Generator
 * Skrypt do sprawdzania pozycji wizytówki Google z różnych punktów GPS.
 * Autor: Antigravity AI (Dev)
 */
const fs = require('fs');
const path = require('path');

// --- KONFIGURACJA ---
const API_KEY = '0F6C669718C1438F9C2926ADDC3FD7DF'; // Tutaj wpisz klucz z valueserp.com lub serpapi.com
const QUERIES = ['kurs UDT Krosno', 'wózki widłowe szkolenie Krosno', 'uprawnienia UDT Krosno'];

// Środek siatki: Krosno
const CENTER_LAT = 49.6888; 
const CENTER_LNG = 21.7644;
const RADIUS_KM = 15; // Promień 15km wokół Krosna
const STEP_KM = 3;    // Pomiary co 3km

/**
 * Generuje siatkę punktów GPS
 */
function generateGrid(lat, lng, radius, step) {
  const points = [];
  const degreeStep = step / 111; 
  for (let x = -radius; x <= radius; x += step) {
    for (let y = -radius; y <= radius; y += step) {
      points.push({
        lat: lat + (x / 111),
        lng: lng + (y / (111 * Math.cos(lat * Math.PI / 180))),
        label: `Punkt_${x}_${y}`
      });
    }
  }
  return points;
}

async function runHeatmap() {
  console.log('🗺️ Generuję siatkę pomiarową dla Krosna i okolic...');
  
  // Zmniejszam siatkę na start, żeby nie spalić Ci od razu całego darmowego pakietu API (zazwyczaj 100 zapytań)
  // Robimy siatkę w promieniu 9km ze skokiem 3km (około 49 punktów)
  const grid = generateGrid(CENTER_LAT, CENTER_LNG, 9, 3);
  console.log(`📍 Wygenerowano ${grid.length} punktów pomiarowych do sprawdzenia.`);

  if (API_KEY === 'YOUR_VALUE_SERP_KEY' || API_KEY === '') {
    console.log('⚠️ Brak klucza API.');
    return;
  }

  const query = QUERIES[0]; // Na razie testujemy dla pierwszej frazy: "kurs UDT Krosno"
  console.log(`\n🚀 Rozpoczynam badanie dla frazy: "${query}"...\n`);

  const results = [];
  
  // Będziemy puszczać zapytania po kolei, z małym opóźnieniem, żeby API nas nie zablokowało
  for (let i = 0; i < grid.length; i++) {
    const point = grid[i];
    const location = `${point.lat},${point.lng}`;
    
    // Parametry zapytania: gl=pl (Polska), hl=pl (Język), include_answer_box=false, num=20
    const url = `https://api.valueserp.com/search?api_key=${API_KEY}&q=${encodeURIComponent(query)}&location=${location}&gl=pl&hl=pl&num=20`;
    
    try {
      console.log(`[${i+1}/${grid.length}] Pytam Google z lokalizacji: ${point.lat.toFixed(4)}, ${point.lng.toFixed(4)}...`);
      const response = await fetch(url);
      const data = await response.json();
      
      // Szukamy DTMS w wynikach lokalnych (map pack) i organicznych
      let dtmsPosition = 'Brak w TOP 20';
      
      // Szukamy w paczce lokalnej (Local Pack / Mapy)
      if (data.local_results) {
        const localMatch = data.local_results.find(r => r.title && r.title.toLowerCase().includes('dtms'));
        if (localMatch) {
          dtmsPosition = `Mapy: #${localMatch.position}`;
        }
      }
      
      // Jeśli nie ma w mapach, szukamy w organicznych
      if (dtmsPosition === 'Brak w TOP 20' && data.organic_results) {
        const organicMatch = data.organic_results.find(r => r.link && r.link.includes('szkoleniadtms.pl'));
        if (organicMatch) {
          dtmsPosition = `Organiczne: #${organicMatch.position}`;
        }
      }
      
      console.log(`   👉 Wynik DTMS: ${dtmsPosition}`);
      
      results.push({
        ...point,
        dtmsPosition,
        // Dodaję też kto wygrywa w tym punkcie
        topCompetitor: data.local_results ? data.local_results[0].title : (data.organic_results ? data.organic_results[0].domain : 'Brak danych')
      });
      
    } catch (error) {
      console.log(`   ❌ Błąd zapytania: ${error.message}`);
      results.push({ ...point, error: error.message });
    }
  }

  // Zapis do pliku
  const reportData = {
    query,
    center: { lat: CENTER_LAT, lng: CENTER_LNG, name: 'Krosno' },
    scanDate: new Date().toISOString(),
    points: results
  };
  
  const outputPath = path.join(__dirname, '../LOCAL_HEATMAP_RESULTS.json');
  fs.writeFileSync(outputPath, JSON.stringify(reportData, null, 2));
  
  console.log(`\n✅ GOTOWE! Pełne wyniki zapisano w: ${outputPath}`);
}

runHeatmap();
