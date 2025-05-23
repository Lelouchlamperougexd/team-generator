import React, { useEffect, useState, useCallback } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { AppNavigator } from './src/navigation/AppNavigator';
import { useSettingsStore } from './src/store/useSettingsStore';
import { useTheme } from './src/theme/theme';
import { useAuth, AuthProvider } from './src/auth/AuthContext';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { GuestBanner } from './src/components/GuestBanner';
import { NetworkStatusProvider } from './src/context/NetworkStatusContext';
import { OfflineBanner } from './src/components/OfflineBanner';

function MainApp() {
  const systemColorScheme = useColorScheme();
  const { themeMode } = useSettingsStore();
  const theme = useTheme();
  const { user, isGuest, loading, exitGuestMode } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    // Initialize settings from storage
    useSettingsStore.getState().loadSettings();
  }, []);

  const handlePressLogin = useCallback(() => {
    exitGuestMode();
    setShowRegister(false);
  }, [exitGuestMode]);

  if (loading) return null;

  if (!user && !isGuest) {
    return showRegister ? (
      <RegisterScreen onGoToLogin={() => setShowRegister(false)} />
    ) : (
      <LoginScreen onGoToRegister={() => setShowRegister(true)} />
    );
  }

  return (
    <>
      <StatusBar
        barStyle={theme.isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />
      <OfflineBanner />
      <GuestBanner onPressLogin={handlePressLogin} />
      <AppNavigator />
    </>
  );
}

export default function App() {
  return (
    <NetworkStatusProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </NetworkStatusProvider>
  );
}
