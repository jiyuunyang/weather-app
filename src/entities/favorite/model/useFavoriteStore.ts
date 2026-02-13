import type { Favorite } from './types';
import { useLocalStorage } from '@/shared/lib/hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';
export function useFavoriteStore() {
  const [favorites, setFavorites] = useLocalStorage<Favorite[]>(
    'favorites',
    [],
  );

  // 1) 추가
  const addFavorite = (name: string, nickname: string) => {
    const newFavorite: Favorite = {
      id: uuidv4(),
      name,
      nickname,
    };

    setFavorites((prev) => [...prev, newFavorite]);
  };

  // 2) 수정
  const editFavorite = (id: string, updates: Partial<Favorite>) => {
    setFavorites((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    );
  };

  // 3) 삭제
  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  return {
    favorites,
    addFavorite,
    editFavorite,
    removeFavorite,
  };
}
