import { useQuery } from '@tanstack/react-query';
import { fetchUltraShortNowcast } from '../api/weatherApi';
import { getBaseDateTime } from '../lib/getBaseDateTime';
import { parseUltraShortNowcast } from '../lib/parseUltraShortNowcast';

export function useUltraShortNowcast(nx: number, ny: number) {
  const { base_date, now_time } = getBaseDateTime();

  return useQuery({
    queryKey: ['weather', 'ultraNowcast', nx, ny, base_date, now_time],
    queryFn: () =>
      fetchUltraShortNowcast({
        nx,
        ny,
        base_date,
        now_time,
      }),
    staleTime: 1000 * 60 * 2, // 2분 - 실황은 최신 데이터 중요
    select: (data) => {
      const items = data?.response?.body?.items?.item;
      if (!Array.isArray(items)) return {};
      return parseUltraShortNowcast(items);
    },
  });
}
