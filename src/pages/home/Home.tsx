import Layout from '@/shared/ui/Layout';
import MainWeatherCard from '@/widgets/weather/MainWeatherWidget';
import FavoriteLocationCard from '@/entities/favorite/ui/FavoriteLocationCard';
import { useCurrentLocation } from '@/features/get-location/model/useCurrentLocation';
import { Header } from '@/widgets/header/Header';

export default function Home() {
  const { district, xy } = useCurrentLocation();

  return (
    <>
      <Header />
      <Layout>
        <MainWeatherCard currentDistrict={district} nx={xy.x} ny={xy.y} />
        <section>
          <h2 className='text-lg font-semibold mb-4'>🩷 즐겨찾는 지역</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <FavoriteLocationCard />
            <FavoriteLocationCard />
            <FavoriteLocationCard />
            <button className='bg-[#0F1C2E] rounded-2xl text-gray-400 text-3xl'>
              +
            </button>
          </div>
        </section>
      </Layout>
    </>
  );
}
