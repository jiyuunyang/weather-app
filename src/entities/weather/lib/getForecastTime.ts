export function getForecastTimes(): string[] {
  const now = new Date();
  const currentHour = now.getHours();
  const forecastTimes: string[] = [];

  for (let i = 0; i < 24; i++) {
    const h = (currentHour + i) % 24;
    forecastTimes.push(String(h).padStart(2, '0') + '00');
  }

  return forecastTimes;
}
