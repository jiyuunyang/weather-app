import type {
  ShortTermForecastResponse,
  UltraShortNowcastResponse,
} from '../model/types';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// 초단기실황조회
export async function fetchUltraShortNowcast({
  nx,
  ny,
  base_date,
  base_time,
}: {
  nx: number;
  ny: number;
  base_date: string;
  base_time: string;
}): Promise<UltraShortNowcastResponse> {
  const url = `${API_URL}/getUltraSrtNcst?serviceKey=${API_KEY}&dataType=JSON&nx=${nx}&ny=${ny}&base_date=${base_date}&base_time=${base_time}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch weather data');
  }

  return res.json();
}

// 단기예보조회
export async function fetchShortTermForecast({
  nx,
  ny,
  base_date,
  base_time,
  numOfRows = 314,
}: {
  nx: number;
  ny: number;
  base_date: string;
  base_time: string;
  numOfRows?: number;
}): Promise<ShortTermForecastResponse> {
  const url = `${API_URL}/getVilageFcst?serviceKey=${API_KEY}&dataType=JSON&nx=${nx}&ny=${ny}&base_date=${base_date}&base_time=${base_time}&numOfRows=${numOfRows}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch weather data');
  }

  return res.json();
}
