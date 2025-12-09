import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserState {
  username: string | null;
  isAuthenticated: boolean;
  login: (username: string) => Promise<void>;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  username: null,
  isAuthenticated: false,

  login: async (username: string) => {
    await AsyncStorage.setItem('username', username);
    set({ username, isAuthenticated: true });
  },

  logout: async () => {
    await AsyncStorage.removeItem('username');
    set({ username: null, isAuthenticated: false });
  },

  loadUser: async () => {
    const username = await AsyncStorage.getItem('username');
    if (username) {
      set({ username, isAuthenticated: true });
    }
  },
}));