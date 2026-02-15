export function getUltraShortNowcastDateTime() {
  // 한국 시간대로 날짜 객체 생성 (서버 설정 무관)
  const now = new Date();

  // Intl API를 사용하여 한국 시간 기준의 데이터 추출
  const formatter = new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  const map = new Map(parts.map((p) => [p.type, p.value]));

  // YYYYMMDD 형식으로 조합
  const base_date = `${map.get('year')}${map.get('month')}${map.get('day')}`;

  // HH00 형식으로 조합 (초단기실황은 매시 정시 기준)
  const base_time = `${map.get('hour')}00`;

  return { base_date, base_time };
}
