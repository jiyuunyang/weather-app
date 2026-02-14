import { useState } from 'react';
import { PiPencilSimple } from 'react-icons/pi';
import { useFavoriteStore } from '../model/useFavoriteStore';

interface EditNicknameButtonProps {
  location: string;
}

export function EditNicknameButton({ location }: EditNicknameButtonProps) {
  const { editFavorite } = useFavoriteStore();
  const [isOpen, setIsOpen] = useState(false);
  const [nickname, setNickname] = useState('');

  const openModal = () => {
    setNickname(''); // 초기화
    setIsOpen(true);
  };

  const saveNickname = () => {
    if (nickname.trim()) {
      editFavorite(location, nickname.trim());
    }
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={openModal}
        className='relative inline-block group text-xl cursor-pointer'
      >
        <PiPencilSimple />
        <div
          className='absolute bottom-full left-1/2 transform -translate-x-1/2 
                    w-max max-w-xs bg-black text-white text-sm rounded-md px-1 py-0.5 -mt-1
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10'
        >
          이름 수정하기
        </div>
      </button>

      {/* 모달 */}
      {isOpen && (
        <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-8'>
          <div className='bg-card-background dark:bg-card-background-dark rounded-xl p-5 w-80'>
            <h3 className='text-lg font-semibold mb-3'>별명 수정</h3>
            <input
              type='text'
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder='새 별명을 입력하세요'
              className='w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-card-highlight dark:bg-card-background-dark 
              focus:outline-none focus:ring-2 focus:ring-green-500'
            />
            <div className='mt-4 flex justify-end gap-2'>
              <button
                onClick={() => setIsOpen(false)}
                className='px-3 py-1 rounded-md bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 cursor-pointer'
              >
                취소
              </button>
              <button
                onClick={saveNickname}
                className='px-3 py-1 rounded-md bg-green-500 text-white cursor-pointer'
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
