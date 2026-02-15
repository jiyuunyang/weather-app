import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Favorite } from './types';
import koreaLocationsXY from '@/entities/location/data/korea_districts_with_xy.json';
import { normalize } from '@/shared/lib/utils/normalize';

interface FavoriteState {
  favorites: Favorite[];
  addFavorite: (name: string) => { success: boolean; message: string };
  editFavorite: (name: string, nickname: string) => void;
  removeFavorite: (name: string) => void;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (name) => {
        if (get().favorites.length >= 6) {
          return {
            success: false,
            message: '최대 6개까지 추가할 수 있습니다.',
          };
        }
        const locationInfo = koreaLocationsXY.find(
          (d) => normalize(d.name.replaceAll('-', ' ')) === normalize(name),
        );
        if (!locationInfo) {
          return { success: false, message: '해당 위치를 추가할 수 없습니다' };
        }

        const { lat, lon, x, y } = locationInfo;

        const newFavorite: Favorite = {
          name,
          lat,
          lon,
          x,
          y,
          nickname: name,
        };

        set({ favorites: [...get().favorites, newFavorite] });
        return { success: true, message: '즐겨찾기 추가' };
      },

      // nickname 수정
      editFavorite: (name, newNickname) => {
        set({
          favorites: get().favorites.map((f) =>
            f.name === name ? { ...f, nickname: newNickname } : f,
          ),
        });
      },

      removeFavorite: (name) => {
        set({ favorites: get().favorites.filter((f) => f.name !== name) });
      },
    }),
    { name: 'favorites-storage' }, // localStorage key
  ),
);
