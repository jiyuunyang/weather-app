import { useEffect, useState } from 'react';

export function useFormattedNow(updateInterval = 60000) {
  const [now, setNow] = useState(() => formatNowKR(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(formatNowKR(new Date()));
    }, updateInterval);

    return () => clearInterval(interval);
  }, [updateInterval]);

  return now;
}

function formatNowKR(date: Date) {
  const weekday = date.toLocaleDateString('ko-KR', { weekday: 'long' }); // 월요일, 화요일...
  const day = date.getDate(); // 13
  const month = date.getMonth() + 1; // 6월
  const hours = date.getHours().toString().padStart(2, '0'); // 24시간
  const minutes = date.getMinutes().toString().padStart(2, '0'); // 14:30

  return `${month}월 ${day}일 ${weekday} ${hours}:${minutes}`;
}
