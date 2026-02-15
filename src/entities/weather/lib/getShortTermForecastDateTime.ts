export function getSafeShortTermForecastDateTime() {
  const now = new Date();

  // 1. 한국 시간대의 개별 요소 추출 (가장 확실한 방법)
  const kstParts = new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(now);

  const p: { [key: string]: string } = {};
  kstParts.forEach(({ type, value }) => {
    p[type] = value;
  });

  const kstYear = p.year;
  const kstMonth = p.month;
  const kstDay = p.day;
  const kstHour = Number(p.hour);
  const kstMin = Number(p.minute);

  let base_date = `${kstYear}${kstMonth}${kstDay}`;
  let base_time = '0200';

  const baseTimes = [2, 5, 8, 11, 14, 17, 20, 23];

  // 2. 10분 여유 로직 적용
  let targetHour = kstHour;
  if (kstMin < 10) {
    targetHour -= 1;
  }

  // 3. targetHour보다 작거나 같은 최신 발표 시각 찾기
  const lastBaseHour = [...baseTimes].reverse().find((t) => t <= targetHour);

  if (lastBaseHour === undefined) {
    // 00:00 ~ 02:09 사이라면 어제 23:00으로 날짜 변경
    base_time = '2300';
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    // 어제 날짜를 YYYYMMDD로 변환
    const yParts = new Intl.DateTimeFormat('ko-KR', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).formatToParts(yesterday);
    const yp: { [key: string]: string } = {};
    yParts.forEach(({ type, value }) => {
      yp[type] = value;
    });
    base_date = `${yp.year}${yp.month}${yp.day}`;
  } else {
    base_time = lastBaseHour.toString().padStart(2, '0') + '00';
  }

  return { base_date, base_time };
}
