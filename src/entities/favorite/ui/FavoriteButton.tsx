import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { useFavoriteStore } from '../model/useFavoriteStore';

interface FavoriteButtonProps {
  location: string;
}

export function FavoriteButton({ location }: FavoriteButtonProps) {
  const { favorites, addFavorite, removeFavorite } = useFavoriteStore();
  const isFavorite = favorites.some((f) => f.name === location);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(location);
    } else {
      addFavorite(location);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className='relative inline-block group text-2xl cursor-pointer'
    >
      {isFavorite ? (
        <MdFavorite className='text-pink-500' />
      ) : (
        <MdFavoriteBorder className='text-gray-400' />
      )}
      {/* 툴팁 */}
      <div
        className='absolute bottom-full left-1/2 transform -translate-x-1/2 
                    w-max max-w-xs bg-black text-white text-sm rounded-md px-1 py-0.5 -mt-1
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10'
      >
        즐겨찾기
      </div>
    </button>
  );
}
