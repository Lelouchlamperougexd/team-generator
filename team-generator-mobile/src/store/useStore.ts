import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface TeamState {
  items: string[];
  groups: number;
  teams: string[][];
  setItems: (items: string[]) => void;
  setGroups: (groups: number) => void;
  setTeams: (teams: string[][]) => void;
  clearAll: () => void;
}

export const useStore = create<TeamState>((set) => ({
  items: [],
  groups: 2,
  teams: [],
  setItems: (items) => set({ items }),
  setGroups: (groups) => set({ groups }),
  setTeams: (teams) => set({ teams }),
  clearAll: () => set({ items: [], teams: [] }),
}));

// Persist store to AsyncStorage
useStore.subscribe(async (state) => {
  try {
    await AsyncStorage.setItem('teamState', JSON.stringify({
      items: state.items,
      groups: state.groups,
      teams: state.teams,
    }));
  } catch (error) {
    console.error('Error saving state:', error);
  }
}); 