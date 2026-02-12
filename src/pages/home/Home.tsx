import { findNearest } from '@/entities/location/lib/findNearest';
import FavoriteLocationCard from '@/entities/favorite/ui/FavoriteLocationCard';
import Header from '@/shared/ui/Header';
import MainWeatherCard from '@/entities/weather/ui/MainWeatherCard';
import koreaDistrictsXY from '@/entities/location/data/korea_districts_with_xy.json';
import { useEffect, useState } from 'react';

export default function Home() {
  const [currentDistrict, setCurrentDistrict] = useState<string>('');
  const [currentXY, setCurrentXY] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  useEffect(() => {
    // 현재 위치 기반으로 가장 가까운 지역 찾기
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const district = findNearest(latitude, longitude, koreaDistrictsXY);
      setCurrentDistrict(district.name.replace('-', ' '));
      setCurrentXY({ x: district.x, y: district.y });
    });
  }, []);

  return (
    <div className='min-h-screen bg-[#0B1623] text-white p-4'>
      {/* Header */}
      <Header />
      {/* Main Weather Card */}
      <MainWeatherCard
        currentDistrict={currentDistrict}
        nx={currentXY.x}
        ny={currentXY.y}
      />
      {/* Favorite Locations */}
      <section>
        <h2 className='text-lg font-semibold mb-4 flex justify-between items-center'>
          🩷 즐겨찾는 지역
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <FavoriteLocationCard />
          <FavoriteLocationCard />
          <FavoriteLocationCard />
          {/* Add New */}
          <button className='bg-[#0F1C2E] rounded-2xl flex items-center justify-center text-gray-400 text-3xl'>
            +
          </button>
        </div>
      </section>
    </div>
  );
}
