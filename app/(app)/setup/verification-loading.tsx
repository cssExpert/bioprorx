import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../src/constants/colors';
import ScreenShades from '@/components/common/ScreenShades';

const STEPS = [
  { label: 'Verifying NPI Registry...', duration: 1200 },
  { label: 'Checking license status...', duration: 1000 },
  { label: 'Setting up ePrescribing...', duration: 1200 },
  { label: 'Configuring your account...', duration: 1000 },
  { label: 'Almost done!', duration: 600 },
];

export default function VerificationLoadingScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.15, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      ]),
    ).start();

    let totalDelay = 0;
    STEPS.forEach((step, index) => {
      setTimeout(() => {
        setCurrentStep(index);
        Animated.timing(progress, {
          toValue: (index + 1) / STEPS.length,
          duration: step.duration - 100,
          useNativeDriver: false,
        }).start();
      }, totalDelay);
      totalDelay += step.duration;
    });

    setTimeout(() => {
      router.replace('/(app)/setup/welcome');
    }, totalDelay + 500);
  }, []);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
        <View style={{ flex: 1 }}>
      <ScreenShades />
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.navyDark }} edges={['top', 'bottom']}>
        <StatusBar barStyle="light-content" />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 }}>
          {/* Animated logo */}
          <Animated.View
            style={{
              width: 100,
              height: 100,
              borderRadius: 30,
              backgroundColor: Colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 40,
              transform: [{ scale: pulseAnim }],
              shadowColor: Colors.primary,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.6,
              shadowRadius: 20,
              elevation: 12,
            }}
          >
            <Text style={{ fontSize: 44, fontWeight: '900', color: Colors.white }}>Rx</Text>
          </Animated.View>

          <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.white, marginBottom: 8, textAlign: 'center' }}>
            Setting Up Your Account
          </Text>
          <Text style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', textAlign: 'center', marginBottom: 40 }}>
            {STEPS[currentStep]?.label}
          </Text>

          {/* Progress bar */}
          <View style={{ width: '100%', height: 6, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden', marginBottom: 20 }}>
            <Animated.View style={{ height: '100%', width: progressWidth, backgroundColor: Colors.teal, borderRadius: 3 }} />
          </View>

          <Text style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>
            Step {Math.min(currentStep + 1, STEPS.length)} of {STEPS.length}
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
