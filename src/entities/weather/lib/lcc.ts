import type { LatLon, XY } from '../model/types';

const KMA = {
  RE: 6371.00877, // Earth radius (km)
  GRID: 5.0, // Grid spacing (km)
  SLAT1: 30.0, // 1st standard parallel
  SLAT2: 60.0, // 2nd standard parallel
  OLON: 126.0, // Origin longitude
  OLAT: 38.0, // Origin latitude
  XO: 43, // Grid X offset
  YO: 136, // Grid Y offset
};

const DEGRAD = Math.PI / 180.0;
const RADDEG = 180.0 / Math.PI;

// 내부 공통 계산 — 초기화 (성능을 위해 미리 계산)
const re = KMA.RE / KMA.GRID;
const slat1 = KMA.SLAT1 * DEGRAD;
const slat2 = KMA.SLAT2 * DEGRAD;
const olon = KMA.OLON * DEGRAD;
const olat = KMA.OLAT * DEGRAD;

let sn =
  Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
  Math.tan(Math.PI * 0.25 + slat1 * 0.5);
sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);

let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;

let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
ro = (re * sf) / Math.pow(ro, sn);

/** 위도/경도 -> 격자 좌표 */
export function toXY(lat: number, lon: number): XY {
  let ra = Math.tan(Math.PI * 0.25 + lat * DEGRAD * 0.5);
  ra = (re * sf) / Math.pow(ra, sn);

  let theta = lon * DEGRAD - olon;
  if (theta > Math.PI) theta -= 2.0 * Math.PI;
  if (theta < -Math.PI) theta += 2.0 * Math.PI;
  theta *= sn;

  const x = Math.floor(ra * Math.sin(theta) + KMA.XO + 0.5);
  const y = Math.floor(ro - ra * Math.cos(theta) + KMA.YO + 0.5);

  return { x, y };
}

/** 격자 좌표 -> 위도/경도 */
export function toLatLon(x: number, y: number): LatLon {
  const xn = x - KMA.XO;
  const yn = ro - (y - KMA.YO);

  let ra = Math.sqrt(xn * xn + yn * yn);
  if (sn < 0) ra = -ra;

  let alat = Math.pow((re * sf) / ra, 1.0 / sn);
  alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;

  let theta: number;
  if (Math.abs(xn) <= 1e-7) {
    theta = 0.0;
  } else {
    theta = Math.atan2(xn, yn);
  }

  const alon = theta / sn + olon;

  return {
    lat: alat * RADDEG,
    lon: alon * RADDEG,
  };
}
