import React, { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { AppNavigator } from './src/navigation/AppNavigator';
import { useSettingsStore } from './src/store/useSettingsStore';
import { useTheme } from './src/theme/theme';

export default function App() {
  const systemColorScheme = useColorScheme();
  const { themeMode } = useSettingsStore();
  const theme = useTheme();

  useEffect(() => {
    // Initialize settings from storage
    useSettingsStore.getState().loadSettings();
  }, []);

  return (
    <>
      <StatusBar
        barStyle={theme.isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />
      <AppNavigator />
    </>
  );
}
