import { useQuery } from '@tanstack/react-query';
import { fetchUltraShortNowcast } from '../api/weatherApi';
import { getBaseDateTime } from '../lib/getBaseDateTime';
import { parseUltraShortNowcast } from '../lib/parseUltraShortNowcast';

export function useUltraShortNowcast(nx: number, ny: number) {
  const { base_date, now_time } = getBaseDateTime();

  return useQuery({
    queryKey: ['weather', 'ultraNowcast', nx, ny],
    enabled: nx > 0 && ny > 0,
    queryFn: () =>
      fetchUltraShortNowcast({
        nx,
        ny,
        base_date,
        now_time,
      }),
    staleTime: 1000 * 60 * 10, // 10분
    select: (data) => {
      const items = data?.response?.body?.items?.item;
      if (!Array.isArray(items)) return {};
      return parseUltraShortNowcast(items);
    },
  });
}
