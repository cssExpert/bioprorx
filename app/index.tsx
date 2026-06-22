import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { useAuthStore } from '@/src/stores/authStore';

// Splash always shows on every launch — it handles auth routing after its animation.
export default function Index() {
  const router = useRouter();
  const { initialize } = useAuthStore();

  useEffect(() => {
    initialize().then(() => {
      router.replace('/(app)/setup/welcome');
      // router.replace('/(onboarding)/splash');
      // router.replace('/(onboarding)/onboarding'); // DEV: remove this line to restore normal flow
    });
  });

  // Blank gradient-colored holding view while initialize() resolves
  return <View style={{ flex: 1, backgroundColor: '#eef0f8' }} />;
}
