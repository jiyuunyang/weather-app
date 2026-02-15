import { useEffect } from 'react';
import koreaLocationsXY from '@/entities/location/data/korea_districts_with_xy.json';
import { findNearest } from '@/entities/location/lib/findNearest';
import { useLocationStore } from '@/entities/location/model/locationStore';

export function useInitCurrentLocation() {
  const { selectedLocation, setSelectedLocation } = useLocationStore();
  // 페이지 진입 시 최초 자동 실행
  useEffect(() => {
    if (selectedLocation) return; // 이미 위치 있으면 실행 X
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const nearest = findNearest(latitude, longitude, koreaLocationsXY);
      setSelectedLocation(nearest);
    });
  }, [selectedLocation, setSelectedLocation]);
}
