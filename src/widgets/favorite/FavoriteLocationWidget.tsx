import { useLocationStore } from '@/entities/location/model/locationStore';
import { useUltraShortNowcast } from '@/entities/weather/model/useUltraShortNowcast';
import { useShortTermForecast } from '@/entities/weather/model/useShortTermForecast';
import ErrorMessage from '@/shared/ui/ErrorMessage';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import type { Favorite } from '@/entities/favorite/model/types';
import FavoriteLocationCard from '@/widgets/favorite/FavoriteLocationCard';

export default function FavoriteLocationWidget({
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

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedLocation({
      name: favorite.name,
      lat: favorite.lat,
      lon: favorite.lon,
      x: favorite.x,
      y: favorite.y,
    });
  };

  return (
    <FavoriteLocationCard
      handleClick={handleClick}
      favorite={favorite}
      ultraShortData={ultraShortData}
      shortTermData={shortTermData}
    />
  );
}
