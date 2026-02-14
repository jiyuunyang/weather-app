import { useEffect, useCallback } from 'react';
import koreaDistrictsXY from '@/entities/location/data/korea_districts_with_xy.json';
import { findNearest } from '@/entities/location/lib/findNearest';
import { useLocationStore } from '@/entities/location/model/locationStore';

export function useCurrentLocation() {
  const { setSelectedLocation } = useLocationStore();

  // 페이지 진입 시 자동 실행
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const nearest = findNearest(latitude, longitude, koreaDistrictsXY);
      setSelectedLocation(nearest);
    });
  }, [setSelectedLocation]);

  // 버튼 클릭용으로 위치 업데이트 함수
  const updateCurrentLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const nearest = findNearest(latitude, longitude, koreaDistrictsXY);
      setSelectedLocation(nearest);
    });
  }, [setSelectedLocation]);

  return { updateCurrentLocation };
}
