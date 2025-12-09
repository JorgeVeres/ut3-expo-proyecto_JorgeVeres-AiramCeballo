import 'react-native-gesture-handler';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useUserStore } from './src/stores/useUserStore';
import { useSettingsStore } from './src/stores/useSettingsStore';
import { initDatabase } from './src/services/database/db';
import LoginScreen from './app/login';
import TabsNavigator from './app/(tabs)/_layout';
import React from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  const { isAuthenticated, loadUser } = useUserStore();
  const { loadSettings } = useSettingsStore();

  useEffect(() => {
    const init = async () => {
      await initDatabase();
      await loadUser();
      await loadSettings();
    };
    init();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <Stack.Screen name="Main" component={TabsNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}