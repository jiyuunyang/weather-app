import { useCallback } from 'react';
import { findNearest } from '@/entities/location/lib/findNearest';
import { useLocationStore } from '@/entities/location/model/locationStore';
import koreaLocationsXY from '@/entities/location/data/korea_districts_with_xy.json';

export function useCurrentLocation() {
  const { setSelectedLocation } = useLocationStore();

  const updateCurrentLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const nearest = findNearest(latitude, longitude, koreaLocationsXY);
      setSelectedLocation(nearest);
    });
  }, [setSelectedLocation]);

  return { updateCurrentLocation };
}
