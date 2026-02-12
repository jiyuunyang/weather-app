export function getBaseDateTime() {
  const now = new Date();
  const now_time = now.toISOString().slice(11, 16).replace(':', '');
  const base_date = now.toISOString().slice(0, 10).replace(/-/g, '');
  const hours = now.getHours();

  const baseTimes = [
    '0200',
    '0500',
    '0800',
    '1100',
    '1400',
    '1700',
    '2000',
    '2300',
  ];
  let base_time = '0200';
  for (const t of baseTimes) {
    if (hours >= Number(t.slice(0, 2))) base_time = t;
  }

  return { base_date, base_time, now_time };
}
