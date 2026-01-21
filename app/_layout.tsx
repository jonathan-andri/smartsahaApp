import { AuthProvider, useAuthContext } from '@/src/contexts/AuthContext';
import { store } from '@/src/store';
import { bootstrapThunk } from '@/src/store/auth/auth.thunks';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import { Provider, useDispatch } from 'react-redux';

import { useColorScheme } from '@/src/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootNavigation() {
  const dispatch = useDispatch<any>();
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    dispatch(bootstrapThunk());
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="(main)" />
      ) : (
        <Stack.Screen name="(auth)" />
      )}
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <AuthProvider>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} /> */}
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
    </AuthProvider>
    </Provider>
  );
}
