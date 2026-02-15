import type { Location } from '@/entities/location/model/types';

export interface Favorite extends Location {
  nickname: string; // 별명
}
