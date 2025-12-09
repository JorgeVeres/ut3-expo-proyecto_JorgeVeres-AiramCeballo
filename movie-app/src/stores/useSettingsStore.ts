import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SettingsState {
  darkMode: boolean;
  shakeEnabled: boolean;
  toggleDarkMode: () => Promise<void>;
  toggleShake: () => Promise<void>;
  loadSettings: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  darkMode: false,
  shakeEnabled: true,

  toggleDarkMode: async () => {
    const newValue = !get().darkMode;
    await AsyncStorage.setItem('darkMode', JSON.stringify(newValue));
    set({ darkMode: newValue });
  },

  toggleShake: async () => {
    const newValue = !get().shakeEnabled;
    await AsyncStorage.setItem('shakeEnabled', JSON.stringify(newValue));
    set({ shakeEnabled: newValue });
  },

  loadSettings: async () => {
    const darkMode = await AsyncStorage.getItem('darkMode');
    const shakeEnabled = await AsyncStorage.getItem('shakeEnabled');
    
    set({
      darkMode: darkMode ? JSON.parse(darkMode) : false,
      shakeEnabled: shakeEnabled ? JSON.parse(shakeEnabled) : true,
    });
  },
}));