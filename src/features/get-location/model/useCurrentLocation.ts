import { useEffect, useState } from 'react';
import koreaDistrictsXY from '@/entities/location/data/korea_districts_with_xy.json';
import { findNearest } from '@/entities/location/lib/findNearest';

export function useCurrentLocation() {
  const [district, setDistrict] = useState<string>('');
  const [xy, setXY] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const result = findNearest(latitude, longitude, koreaDistrictsXY);

      setDistrict(result.name.replace('-', ' '));
      setXY({ x: result.x, y: result.y });
    });
  }, []);

  return { district, xy };
}
