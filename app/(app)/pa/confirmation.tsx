import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../../src/constants/colors';
import { useAppStore } from '../../../src/stores/appStore';
import ScreenShades from '@/components/common/ScreenShades';

export default function ConfirmationScreen() {
  const router = useRouter();
  const { resetPAWorkflow } = useAppStore();
  const scale = useRef(new Animated.Value(0)).current;
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, tension: 60, friction: 8 }),
      Animated.timing(fade, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleDone = () => {
    resetPAWorkflow();
    router.replace('/(app)/(tabs)/pa-board');
  };

  return (
    <View style={{ flex: 1 }}>
      <ScreenShades />

      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#0F2E18', '#0F1F4D']} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 }}>
            {/* Checkmark */}
            <Animated.View
              style={{
                width: 110,
                height: 110,
                borderRadius: 55,
                backgroundColor: Colors.success,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 32,
                transform: [{ scale }],
                shadowColor: Colors.success,
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.6,
                shadowRadius: 24,
                elevation: 12,
              }}
            >
              <Text style={{ fontSize: 52 }}>✓</Text>
            </Animated.View>

            <Animated.View style={{ alignItems: 'center', opacity: fade }}>
              <Text style={{ fontSize: 28, fontWeight: '800', color: Colors.white, textAlign: 'center', marginBottom: 12 }}>
                PA Submitted!
              </Text>
              <Text style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', textAlign: 'center', lineHeight: 22, marginBottom: 32 }}>
                Your prior authorization has been submitted successfully. You'll receive a notification when the payer responds.
              </Text>

              {/* Reference */}
              <View
                style={{
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  borderRadius: 16,
                  padding: 20,
                  width: '100%',
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.12)',
                  gap: 12,
                  marginBottom: 32,
                }}
              >
                {[
                  ['Reference #', 'PA-2024-007'],
                  ['Submitted to', 'Aetna (CoverMyMeds)'],
                  ['Expected response', '1-3 business days'],
                  ['Patient', 'Sarah Johnson'],
                  ['Medication', 'Humira 40mg'],
                ].map(([label, val]) => (
                  <View key={label} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{label}</Text>
                    <Text style={{ fontSize: 13, fontWeight: '700', color: Colors.white }}>{val}</Text>
                  </View>
                ))}
              </View>
            </Animated.View>
          </View>

          <Animated.View style={{ paddingHorizontal: 24, paddingBottom: 16, gap: 12, opacity: fade }}>
            <TouchableOpacity
              onPress={handleDone}
              style={{ backgroundColor: Colors.success, borderRadius: 16, paddingVertical: 17, alignItems: 'center' }}
            >
              <Text style={{ color: Colors.white, fontSize: 17, fontWeight: '700' }}>View PA Board</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { resetPAWorkflow(); router.push('/(app)/pa/card-scan'); }}
              style={{ borderRadius: 16, paddingVertical: 16, alignItems: 'center', borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.2)' }}
            >
              <Text style={{ color: Colors.white, fontSize: 16, fontWeight: '600' }}>Start Another PA</Text>
            </TouchableOpacity>
          </Animated.View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}
