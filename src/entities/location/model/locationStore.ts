// entities/location/model/locationStore.ts
import { create } from 'zustand';
import type { District } from './types';

interface LocationState {
  selectedLocation: District | null;
  setSelectedLocation: (loc: District | null) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  selectedLocation: null,
  setSelectedLocation: (loc: District | null) => set({ selectedLocation: loc }),
}));
