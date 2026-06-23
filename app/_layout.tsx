import '../global.css';
import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ToastContainer from '@/components/ui/Toast';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import {
  PlayfairDisplay_400Regular,
  PlayfairDisplay_400Regular_Italic,
  PlayfairDisplay_500Medium,
  PlayfairDisplay_500Medium_Italic,
  PlayfairDisplay_700Bold,
  PlayfairDisplay_700Bold_Italic,
  PlayfairDisplay_900Black,
  PlayfairDisplay_900Black_Italic,
} from '@expo-google-fonts/playfair-display';

import {
  Nunito_400Regular,
  Nunito_400Regular_Italic,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from '@expo-google-fonts/nunito';

// Keep native splash visible while fonts load
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 60_000, retry: 1 },
    mutations: { retry: 0 },
  },
});

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_400Regular_Italic,
    PlayfairDisplay_500Medium,
    PlayfairDisplay_500Medium_Italic,
    PlayfairDisplay_700Bold,
    PlayfairDisplay_700Bold_Italic,
    PlayfairDisplay_900Black,
    PlayfairDisplay_900Black_Italic,
    Nunito_400Regular,
    Nunito_400Regular_Italic,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(onboarding)" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(app)" />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
        <StatusBar style="auto" />
        <ToastContainer />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
