import Layout from '@/shared/ui/Layout';
import MainWeatherCard from '@/widgets/weather/MainWeatherWidget';
import FavoriteLocationCard from '@/entities/favorite/ui/FavoriteLocationCard';
import { useCurrentLocation } from '@/features/get-location/model/useCurrentLocation';
import { Header } from '@/widgets/header/Header';
import Footer from '@/shared/ui/Footer';
import { useLocationStore } from '@/entities/location/model/locationStore';

export default function Home() {
  useCurrentLocation();
  const { selectedLocation } = useLocationStore();

  console.log('현재 선택된 위치:', selectedLocation);

  return (
    <>
      <Header />
      <Layout>
        <MainWeatherCard
          currentDistrict={selectedLocation?.name || ''}
          nx={selectedLocation?.x || 0}
          ny={selectedLocation?.y || 0}
        />
        <section>
          <h2 className='text-lg font-semibold mb-4'>🩷 즐겨찾는 지역</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <FavoriteLocationCard />
            <FavoriteLocationCard />
            <FavoriteLocationCard />
            <button className='bg-card-background dark:bg-card-background-dark rounded-2xl text-gray-400 text-3xl'>
              +
            </button>
          </div>
        </section>
      </Layout>
      <Footer />
    </>
  );
}
