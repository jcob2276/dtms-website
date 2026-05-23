export const SUPPORTED_CITIES = [
  { id: 'krosno', name: 'Krosno', locative: 'Krośnie', uaName: 'Кросно', distance: 0 },
  { id: 'jaslo', name: 'Jasło', locative: 'Jaśle', uaName: 'Ясло', distance: 25 },
  { id: 'sanok', name: 'Sanok', locative: 'Sanoku', uaName: 'Санок', distance: 45 },
  { id: 'rzeszow', name: 'Rzeszów', locative: 'Rzeszowie', uaName: 'Жешув', distance: 60 },
  { id: 'gorlice', name: 'Gorlice', locative: 'Gorlicach', uaName: 'Горліце', distance: 50 },
  { id: 'brzozow', name: 'Brzozów', locative: 'Brzozowie', uaName: 'Бжозув', distance: 20 },
];

export function getCityById(cityId) {
  return SUPPORTED_CITIES.find((city) => city.id === cityId) ?? null;
}
