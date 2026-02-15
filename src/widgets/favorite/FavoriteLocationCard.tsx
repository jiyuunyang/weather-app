import type { Favorite } from '@/entities/favorite/model/types';
import { WeatherEmoji } from '@/shared/ui/WeatherEmoji';
import { formatValue } from '@/shared/lib/utils/formatValue';
import { EditNicknameButton } from './EditNicknameButton';
import { DeleteFavoriteButton } from './DeleteFavoriteButton';
import type { ForecastByTime } from '@/entities/weather/model/types';

interface FavoriteLocationCardProps {
  favorite: Favorite;
  handleClick: () => void;
  ultraShortData: Record<string, string>;
  shortTermData: ForecastByTime[];
}

export default function FavoriteLocationCard({
  favorite,
  handleClick,
  shortTermData,
  ultraShortData,
}: FavoriteLocationCardProps) {
  return (
    <div
      onClick={handleClick}
      className='bg-card-background rounded-2xl p-5 cursor-pointer
      dark:bg-card-background-dark
      hover:shadow-lg
      transition-shadow duration-300'
    >
      <div className='flex justify-between items-center'>
        <h2>
          <p className='text-lg'>{favorite.nickname} </p>
        </h2>
        <div className='flex gap-2'>
          <EditNicknameButton location={favorite.name} />
          <DeleteFavoriteButton location={favorite.name} />
        </div>
      </div>
      <h3 className='text-3xl font-semibold'>
        {formatValue(ultraShortData?.T1H || '-')}°
      </h3>
      <p className='text-sm text-gray-400'>{favorite.name}</p>
      <p className='text-right text-gray-300 text-sm'>
        <WeatherEmoji
          ptyCode={Number(ultraShortData?.PTY)}
          skyCode={Number(shortTermData?.[0]?.data?.SKY)}
        />
      </p>
      <p className='text-right text-gray-500 text-xs'>
        H: {shortTermData?.[0]?.data?.TMX || '-'}° • L:
        {shortTermData?.[0]?.data?.TMN || '-'}°
      </p>
    </div>
  );
}
