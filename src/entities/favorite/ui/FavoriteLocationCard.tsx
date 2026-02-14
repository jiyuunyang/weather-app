import { useLocationStore } from '@/entities/location/model/locationStore';
import type { Favorite } from '../model/types';
import { useUltraShortNowcast } from '@/entities/weather/model/useUltraShortNowcast';
import { useShortTermForecast } from '@/entities/weather/model/useShortTermForecast';
import ErrorMessage from '@/shared/ui/ErrorMessage';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import { WeatherEmoji } from '@/entities/weather/ui/WeatherEmoji';
import { formatValue } from '@/entities/weather/lib/formatValue';
import { EditNicknameButton } from './EditNicknameButton';
import { DeleteFavoriteButton } from './DeleteFavoriteButton';

export default function FavoriteLocationCard({
  favorite,
}: {
  favorite: Favorite;
}) {
  const { setSelectedLocation } = useLocationStore();
  const {
    data: ultraShortData,
    isLoading: ultraShortIsLoading,
    error: ultraShortError,
  } = useUltraShortNowcast(favorite.x, favorite.y);

  const {
    data: shortTermData,
    isLoading: shortTermIsLoading,
    error: shortTermError,
  } = useShortTermForecast(favorite.x, favorite.y);

  const isLoading = ultraShortIsLoading || shortTermIsLoading;
  const error = ultraShortError || shortTermError;

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage message={(error as Error).message} />;
  }
  if (!ultraShortData || !shortTermData) {
    return <ErrorMessage message='날씨 정보를 불러오는 데 실패했습니다.' />;
  }

  return (
    <div
      onClick={() =>
        setSelectedLocation({
          name: favorite.name,
          lat: favorite.lat,
          lon: favorite.lon,
          x: favorite.x,
          y: favorite.y,
        })
      }
      className='bg-card-background rounded-2xl p-5 cursor-pointer
      dark:bg-card-background-dark
      hover:shadow-lg
      transition-shadow duration-300'
    >
      <div className='flex justify-between items-center'>
        <p className='text-sm text-gray-400'>{favorite.nickname}</p>
        <div className='flex gap-2'>
          <EditNicknameButton location={favorite.name} />
          <DeleteFavoriteButton location={favorite.name} />
        </div>
      </div>
      <h3 className='text-3xl font-semibold mt-2'>
        {formatValue(ultraShortData?.T1H || '-')}°
      </h3>
      <p className='text-right text-gray-300 text-sm'>
        <WeatherEmoji
          ptyCode={Number(ultraShortData?.PTY)}
          skyCode={Number(shortTermData?.[0]?.data?.SKY)}
        />
      </p>
      <p className='text-right text-gray-500 text-xs'>
        H: {shortTermData?.[0]?.data?.TMX || '-'}° • L:
        {shortTermData?.[0]?.data?.TMN || '-'}°
      </p>
    </div>
  );
}
