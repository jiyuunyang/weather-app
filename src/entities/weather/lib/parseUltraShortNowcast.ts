import type { UltraShortNowcastItem } from '../model/types';

export function parseUltraShortNowcast(items: UltraShortNowcastItem[]) {
  return items.reduce(
    (acc, cur) => {
      acc[cur.category] = cur.obsrValue;
      return acc;
    },
    {} as Record<string, string>,
  );
}
