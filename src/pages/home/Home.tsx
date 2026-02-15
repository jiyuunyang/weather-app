import Layout from '@/shared/ui/Layout';
import { Header } from '@/widgets/header/Header';
import Footer from '@/shared/ui/Footer';
import type { Favorite } from '@/entities/favorite/model/types';
import { useFavoriteStore } from '@/entities/favorite/model/useFavoriteStore';
import NoFavoriteLocationCard from '@/widgets/favorite/NoFavoriteLocationCard';
import FavoriteLocationWidget from '@/widgets/favorite/FavoriteLocationWidget';
import MainWeatherWidget from '@/widgets/weather/MainWeatherWidget';

export default function Home() {
  const { favorites } = useFavoriteStore();

  return (
    <>
      <Header />
      <Layout>
        <MainWeatherWidget />
        <section>
          <h2 className='text-lg font-semibold mb-4'>🩷 즐겨찾는 지역</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {favorites.length > 0 ? (
              favorites.map((favorite: Favorite) => (
                <FavoriteLocationWidget
                  key={favorite.name}
                  favorite={favorite}
                />
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
