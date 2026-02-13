import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import { useShortTermForecast } from '@/entities/weather/model/useShortTermForecast';
import { useUltraShortNowcast } from '@/entities/weather/model/useUltraShortNowcast';
import ErrorMessage from '@/shared/ui/ErrorMessage';
import { useFormattedNow } from '@/entities/weather/lib/useFormattedNow';
import MainWeatherCard from '@/entities/weather/ui/MainWeatherCard';

type MainWeatherWidgetProps = {
  currentDistrict: string;
  nx: number;
  ny: number;
};

export default function MainWeatherWidget({
  currentDistrict,
  nx,
  ny,
}: MainWeatherWidgetProps) {
  const {
    data: ultraShortData,
    isLoading: ultraShortIsLoading,
    error: ultraShortError,
  } = useUltraShortNowcast(nx, ny);

  const {
    data: shortTermData,
    isLoading: shortTermIsLoading,
    error: shortTermError,
  } = useShortTermForecast(nx, ny);

  const formattedNow = useFormattedNow();

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
    <MainWeatherCard
      currentDistrict={currentDistrict}
      now={formattedNow}
      ultraShortData={ultraShortData}
      shortTermData={shortTermData}
    />
  );
}
