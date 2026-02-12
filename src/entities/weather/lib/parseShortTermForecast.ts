import type { ShortTermForecastItem, ForecastByTime } from '../model/types';

const DAILY_CATEGORIES = ['TMN', 'TMX'];

export function parseShortTermForecast(
  items: ShortTermForecastItem[],
): ForecastByTime[] {
  const now = new Date();
  const currentTime = now.getHours() * 100 + now.getMinutes(); // ex: 09:30 → 930
  const todayDate = now.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD

  const grouped: Record<string, Record<string, string>> = {};
  const dailyValues: Record<string, string> = {}; // 첫 번째 fcstTime에서 TMN/TMX 저장

  // TMN/TMX를 첫 번째 fcstTime에서 가져오기
  const firstFcstTimeItem = items.find((item) =>
    DAILY_CATEGORIES.includes(item.category),
  );
  if (firstFcstTimeItem) {
    items
      .filter((item) => DAILY_CATEGORIES.includes(item.category))
      .forEach((item) => {
        dailyValues[item.category] = item.fcstValue;
      });
  }

  // 나머지 데이터 처리 (현재 시간 이후)
  items.forEach((item) => {
    if (DAILY_CATEGORIES.includes(item.category)) return; // 이미 dailyValues에 저장

    if (item.fcstDate === todayDate && Number(item.fcstTime) <= currentTime)
      return;

    const key = `${item.fcstDate}_${item.fcstTime}`;
    grouped[key] = grouped[key] || {};
    grouped[key][item.category] = item.fcstValue;
  });

  // TMN/TMX를 모든 fcstTime에 주입
  Object.keys(grouped).forEach((key) => {
    Object.entries(dailyValues).forEach(([cat, val]) => {
      grouped[key][cat] = val;
    });
  });

  // 정렬 후 배열 변환
  return Object.entries(grouped)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([fcstDateTime, data]) => {
      const [, fcstTime] = fcstDateTime.split('_'); // HHMM
      const hour = Number(fcstTime.slice(0, 2));
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const hour12 = hour % 12 === 0 ? 12 : hour % 12; // 0 -> 12, 13 -> 1, ...
      const formattedTime = `${hour12}${ampm}`;
      return { fcstTime: formattedTime, data };
    });
}
