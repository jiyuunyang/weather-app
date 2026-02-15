import { useState } from 'react';
import { PiTrash } from 'react-icons/pi';
import { useFavoriteStore } from '../model/useFavoriteStore';

interface DeleteFavoriteButtonProps {
  location: string;
}

export function DeleteFavoriteButton({ location }: DeleteFavoriteButtonProps) {
  const { removeFavorite } = useFavoriteStore();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const deleteFavoriteLocation = () => {
    removeFavorite(location);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={(e) => openModal(e)}
        className='relative inline-block group text-xl cursor-pointer'
      >
        <PiTrash />
        <div
          className='absolute bottom-full left-1/2 transform -translate-x-1/2 
                    w-max max-w-xs bg-black text-white text-sm rounded-md px-1 py-0.5 -mt-1
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10'
        >
          삭제하기
        </div>
      </button>

      {/* 모달 */}
      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-8'
        >
          <div className='bg-card-background dark:bg-card-background-dark rounded-2xl p-5 w-80'>
            <h3 className='text-lg font-semibold mb-3'>정말 지우시겠습니까?</h3>
            <div className='mt-4 flex justify-end gap-2'>
              <button
                onClick={closeModal}
                className='px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 cursor-pointer'
              >
                취소
              </button>
              <button
                onClick={deleteFavoriteLocation}
                className='px-3 py-1 rounded-md bg-red-500 text-white cursor-pointer'
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
