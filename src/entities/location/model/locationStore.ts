import { create } from 'zustand';
import type { Location } from './types';

interface LocationState {
  selectedLocation: Location | null;
  setSelectedLocation: (loc: Location | null) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  selectedLocation: null,
  setSelectedLocation: (loc: Location | null) => set({ selectedLocation: loc }),
}));
