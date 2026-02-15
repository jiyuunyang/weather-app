import type { Location } from '../model/types';

function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3; // meters
  const toRad = (d: number) => (d * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // meters
}

export function findNearest(lat: number, lon: number, list: Location[]) {
  let nearest = list[0];
  let minDist = haversine(lat, lon, list[0].lat, list[0].lon);

  for (let i = 1; i < list.length; i++) {
    const d = haversine(lat, lon, list[i].lat, list[i].lon);
    if (d < minDist) {
      minDist = d;
      nearest = list[i];
    }
  }

  return nearest;
}
