import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import { useShortTermForecast } from '@/entities/weather/model/useShortTermForecast';
import { useUltraShortNowcast } from '@/entities/weather/model/useUltraShortNowcast';
import ErrorMessage from '@/shared/ui/ErrorMessage';
import { useFormattedNow } from '@/entities/weather/lib/useFormattedNow';
import MainWeatherCard from '@/widgets/weather/MainWeatherCard';
import { useInitCurrentLocation } from '@/features/get-location/model/useInitCurrentLocation';
import { useLocationStore } from '@/entities/location/model/locationStore';
import WarningMessage from '@/shared/ui/WarningMessage';

export default function MainWeatherWidget() {
  useInitCurrentLocation(); // 초기에 현재 위치 select함
  const { selectedLocation } = useLocationStore();
  const { name: currentLocation, x: nx, y: ny } = selectedLocation ?? {};

  const {
    data: ultraShortData,
    isLoading: ultraShortIsLoading,
    error: ultraShortError,
  } = useUltraShortNowcast(nx!, ny!);

  const {
    data: shortTermData,
    isLoading: shortTermIsLoading,
    error: shortTermError,
  } = useShortTermForecast(nx!, ny!);

  const isLoading = ultraShortIsLoading || shortTermIsLoading;
  const error = ultraShortError || shortTermError;

  const formattedNow = useFormattedNow();

  // 위치 정보 없을 때
  if (!currentLocation) {
    return (
      <WarningMessage
        message={`📍위치를 불러오는 중입니다.\n위치 권한을 허용했는지 확인해주세요.`}
      />
    );
  }

  // 로딩 상태일 때
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // 문제 발생시
  if (error) {
    return (
      <ErrorMessage
        message={`날씨 정보를 불러오는 데 실패했습니다.\n(${(error as Error).message})`}
      />
    );
  }

  // 데이터 없을 시
  if (!ultraShortData || !shortTermData) {
    return <ErrorMessage message='날씨 정보를 불러오는 데 실패했습니다.' />;
  }

  return (
    <MainWeatherCard
      currentLocation={currentLocation.replaceAll('-', ' ')}
      now={formattedNow}
      ultraShortData={ultraShortData}
      shortTermData={shortTermData}
    />
  );
}
