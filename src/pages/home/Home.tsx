import Layout from '@/shared/ui/Layout';
import MainWeatherCard from '@/widgets/weather/MainWeatherWidget';
import FavoriteLocationCard from '@/entities/favorite/ui/FavoriteLocationCard';
import { useCurrentLocation } from '@/features/get-location/model/useCurrentLocation';
import { Header } from '@/widgets/header/Header';
import Footer from '@/shared/ui/Footer';
import { useLocationStore } from '@/entities/location/model/locationStore';
import WarningMessage from '@/shared/ui/WarningMessage';
import type { Favorite } from '@/entities/favorite/model/types';
import { useFavoriteStore } from '@/entities/favorite/model/useFavoriteStore';
import NoFavoriteLocationCard from '@/entities/favorite/ui/NoFavoriteLocationCard';

export default function Home() {
  useCurrentLocation();
  const { selectedLocation } = useLocationStore();
  const { favorites } = useFavoriteStore();

  return (
    <>
      <Header />
      <Layout>
        {selectedLocation ? (
          <MainWeatherCard
            currentDistrict={selectedLocation?.name || ''}
            nx={selectedLocation?.x || 0}
            ny={selectedLocation?.y || 0}
          />
        ) : (
          <WarningMessage
            message={`📍위치를 불러오는 중입니다.\n위치 권한을 허용했는지 확인해주세요.`}
          />
        )}
        <section>
          <h2 className='text-lg font-semibold mb-4'>🩷 즐겨찾는 지역</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {favorites.length > 0 ? (
              favorites.map((favorite: Favorite) => (
                <FavoriteLocationCard key={favorite.name} favorite={favorite} />
              ))
            ) : (
              <NoFavoriteLocationCard />
            )}
          </div>
        </section>
      </Layout>
      <Footer />
    </>
  );
}
