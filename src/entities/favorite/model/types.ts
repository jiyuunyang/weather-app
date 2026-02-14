import type { District } from '@/entities/location/model/types';

export interface Favorite extends District {
  nickname: string; // 별명
}
