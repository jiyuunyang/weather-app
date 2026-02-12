import { useQuery } from '@tanstack/react-query';
import { fetchShortTermForecast } from '../api/weatherApi';
import { getBaseDateTime } from '../lib/getBaseDateTime';
import { parseShortTermForecast } from '../lib/parseShortTermForecast';

export function useShortTermForecast(nx: number, ny: number) {
  const { base_date, base_time } = getBaseDateTime();
  return useQuery({
    queryKey: ['weather', 'shortForecast', nx, ny, base_date, base_time],
    queryFn: () =>
      fetchShortTermForecast({
        nx,
        ny,
        base_date,
        base_time,
      }),
    staleTime: 1000 * 60 * 10, // 10분
    select: (data) => parseShortTermForecast(data.response.body.items.item), // 파싱된 데이터 반환
  });
}
