import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { useFavoriteStore } from '../model/useFavoriteStore';
import { useState } from 'react';

interface FavoriteButtonProps {
  location: string;
}

export function FavoriteButton({ location }: FavoriteButtonProps) {
  const { favorites, addFavorite, removeFavorite } = useFavoriteStore();
  const isFavorite = favorites.some((f) => f.name === location);
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(location);
    } else {
      const result = addFavorite(location);
      if (result.success === false) {
        setMessage(result.message);
        openModal();
      }
    }
  };

  return (
    <>
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
      {/* 모달 */}
      {isOpen && (
        <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-8'>
          <div className='bg-card-background dark:bg-card-background-dark rounded-2xl p-5 w-80'>
            <h3 className='text-md mb-3'>{message}</h3>
            <div className='mt-4 flex justify-end gap-2'>
              <button
                onClick={closeModal}
                className='w-full px-3 py-1 rounded-md bg-green-500 text-white cursor-pointer'
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
