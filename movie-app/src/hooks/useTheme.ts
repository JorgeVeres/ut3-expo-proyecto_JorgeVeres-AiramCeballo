import { useSettingsStore } from '@/src/stores/useSettingsStore';
import { lightColors, darkColors } from '@/src/theme/colors';

export const useTheme = () => {
  const darkMode = useSettingsStore((state) => state.darkMode);

  return {
    colors: darkMode ? darkColors : lightColors,
    isDark: darkMode,
  };
};