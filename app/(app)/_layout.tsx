import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="setup/specialty" />
      <Stack.Screen name="setup/subspecialty" />
      <Stack.Screen name="setup/subscription" />
      <Stack.Screen name="setup/checkout" />
      <Stack.Screen name="setup/verification" />
      <Stack.Screen name="setup/eprescribing" />
      <Stack.Screen name="setup/verification-loading" />
      <Stack.Screen name="setup/welcome" />
      <Stack.Screen name="patients/add" />
      <Stack.Screen name="patients/[id]" />
      <Stack.Screen name="pa/card-scan" />
      <Stack.Screen name="pa/diagnosis" />
      <Stack.Screen name="pa/tier" />
      <Stack.Screen name="pa/step-therapy" />
      <Stack.Screen name="pa/auth-generator" />
      <Stack.Screen name="pa/route" />
      <Stack.Screen name="pa/pharmacy" />
      <Stack.Screen name="pa/iod" />
      <Stack.Screen name="pa/confirmation" />
      <Stack.Screen name="pa/[id]" />
      <Stack.Screen name="pa/appeal" />
      <Stack.Screen name="settings/profile" />
      <Stack.Screen name="settings/specialty" />
      <Stack.Screen name="settings/password" />
      <Stack.Screen name="settings/subscription" />
      <Stack.Screen name="settings/billing" />
      <Stack.Screen name="settings/privacy" />
      <Stack.Screen name="settings/terms" />
      <Stack.Screen name="settings/help" />
    </Stack>
  );
}
