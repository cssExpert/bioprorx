import React from 'react';
import { View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ScreenShades from './ScreenShades';
import { Colors } from '@/src/constants/colors';

type Props = {
  children: React.ReactNode;
  /** Pass true to use the standard lavender gradient background (setup/onboarding screens) */
  gradient?: boolean;
  style?: ViewStyle;
};

/**
 * Root screen wrapper — provides flex:1 container + ScreenShades overlay.
 * Use instead of a bare <View style={{ flex: 1 }}> on every screen.
 *
 * White-bg screen:
 *   <ScreenLayout>
 *     <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }} edges={['top','bottom']}>
 *       ...
 *     </SafeAreaView>
 *   </ScreenLayout>
 *
 * Gradient bg screen (setup/onboarding):
 *   <ScreenLayout gradient>
 *     <SafeAreaView style={{ flex: 1 }} edges={['top','bottom']}>
 *       ...
 *     </SafeAreaView>
 *   </ScreenLayout>
 */
export default function ScreenLayout({ children, gradient = false, style }: Props) {
  if (gradient) {
    return (
      <LinearGradient
        colors={[Colors.gradStart, Colors.gradMid, Colors.gradEnd]}
        locations={[0, 0.45, 1]}
        style={[{ flex: 1 }, style]}
      >
        <ScreenShades />
        {children}
      </LinearGradient>
    );
  }

  return (
    <View style={[{ flex: 1 }, style]}>
      <ScreenShades />
      {children}
    </View>
  );
}
