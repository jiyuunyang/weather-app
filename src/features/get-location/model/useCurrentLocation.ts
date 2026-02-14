// features/get-location/model/useCurrentLocation.ts
import { useEffect } from 'react';
import koreaDistrictsXY from '@/entities/location/data/korea_districts_with_xy.json';
import { findNearest } from '@/entities/location/lib/findNearest';
import { useLocationStore } from '@/entities/location/model/locationStore';

export function useCurrentLocation() {
  const { setSelectedLocation } = useLocationStore();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const nearest = findNearest(latitude, longitude, koreaDistrictsXY);
      setSelectedLocation(nearest);
    });
  }, [setSelectedLocation]);
}
