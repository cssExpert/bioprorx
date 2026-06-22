import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { FontSize } from '@/src/constants/mixins';
import Svg, { Path, Circle } from 'react-native-svg';

function BrandMark({ size = 30 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path
        d="M16 2l2.4 1.4 2.7-.5 1.5 2.3 2.6 1 .2 2.8 2 2-1 2.6 1 2.6-2 2-.2 2.8-2.6 1-1.5 2.3-2.7-.5L16 30l-2.4-1.4-2.7.5-1.5-2.3-2.6-1-.2-2.8-2-2 1-2.6-1-2.6 2-2 .2-2.8 2.6-1 1.5-2.3 2.7.5L16 2z"
        fill="#8b5cf6"
      />
      <Circle cx="16" cy="16" r="6.5" fill="#fff" />
      <Circle cx="16" cy="16" r="3" fill="#7c3aed" />
    </Svg>
  );
}

const FEATURES = [
  { icon: '⚡', label: 'AI-Powered PA', desc: 'Submit authorizations in minutes, not hours.' },
  { icon: '🔒', label: 'HIPAA Secure', desc: 'Bank-level encryption, NPI verified.' },
  { icon: '📊', label: 'Real-Time Tracking', desc: 'Know every PA status at a glance.' },
];

export default function LandingScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#eef0f8" />
      <LinearGradient
        colors={['#eef0f8', '#e9eaf5', '#e6e3f1']}
        locations={[0, 0.45, 1]}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Brand */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 9, marginTop: 18 }}>
              <BrandMark size={30} />
              <View>
                <Text
                  style={{ fontSize: 23, fontWeight: '700', letterSpacing: -0.5, color: '#1b2236' }}
                >
                  biopro<Text style={{ color: '#7c3aed' }}>rx</Text>
                  <Text style={{ fontSize: FontSize.xxs, fontWeight: '500', color: '#8a8e9c' }}>
                    ™
                  </Text>
                </Text>
                <Text style={{ fontSize: 9.5, color: '#8a8e9c', fontWeight: '500', marginTop: 1 }}>
                  The Approval Engine.
                </Text>
              </View>
            </View>

            {/* Hero */}
            <View style={{ marginTop: 48, flex: 1 }}>
              <Text
                style={{
                  fontSize: FontSize.base,
                  fontWeight: '700',
                  color: '#7c3aed',
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  marginBottom: 14,
                }}
              >
                For Healthcare Providers
              </Text>
              <Text
                style={{
                  fontSize: FontSize.d2,
                  fontWeight: '800',
                  color: '#1a1d29',
                  lineHeight: 44,
                  letterSpacing: -0.5,
                }}
              >
                Prior Auth,{'\n'}Done in{' '}
                <Text style={{ color: '#7c3aed', fontStyle: 'italic' }}>Minutes.</Text>
              </Text>
              <Text
                style={{ fontSize: FontSize.md, color: '#3d4150', marginTop: 16, lineHeight: 24 }}
              >
                AI-powered PA management for physicians. Submit, track, and appeal authorizations —
                all from your phone.
              </Text>

              {/* Feature list */}
              <View style={{ marginTop: 32, gap: 16 }}>
                {FEATURES.map((f) => (
                  <View
                    key={f.label}
                    style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 14 }}
                  >
                    <View
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 12,
                        backgroundColor: 'rgba(139,92,246,0.12)',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text style={{ fontSize: FontSize.xxl }}>{f.icon}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: FontSize.md, fontWeight: '700', color: '#1a1d29' }}>
                        {f.label}
                      </Text>
                      <Text
                        style={{
                          fontSize: FontSize.base,
                          color: '#8a8e9c',
                          marginTop: 2,
                          lineHeight: 18,
                        }}
                      >
                        {f.desc}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>

              {/* Stats row */}
              <View style={{ flexDirection: 'row', gap: 10, marginTop: 32 }}>
                {[
                  ['10k+', 'Providers'],
                  ['98%', 'Approval Rate'],
                  ['<5min', 'PA Time'],
                ].map(([val, label]) => (
                  <View
                    key={label}
                    style={{
                      flex: 1,
                      backgroundColor: 'rgba(255,255,255,0.6)',
                      borderRadius: 14,
                      padding: 12,
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: '#e6e7ef',
                    }}
                  >
                    <Text style={{ fontSize: FontSize.xl, fontWeight: '800', color: '#7c3aed' }}>
                      {val}
                    </Text>
                    <Text style={{ fontSize: FontSize.xs, color: '#8a8e9c', marginTop: 2 }}>
                      {label}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>

          {/* CTAs */}
          <View style={{ paddingHorizontal: 24, paddingBottom: 16, gap: 12 }}>
            <TouchableOpacity
              onPress={() => router.push('/(onboarding)/onboarding')}
              activeOpacity={0.88}
              style={{
                height: 54,
                backgroundColor: '#3a1466',
                borderRadius: 14,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#3a1466',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.28,
                shadowRadius: 16,
                elevation: 6,
              }}
            >
              <Text style={{ color: '#fff', fontSize: FontSize.md, fontWeight: '700' }}>
                Get Started — Free Trial
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/(auth)/login')}
              activeOpacity={0.8}
              style={{
                height: 54,
                borderRadius: 14,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1.5,
                borderColor: '#dcdde7',
                backgroundColor: 'rgba(255,255,255,0.5)',
              }}
            >
              <Text style={{ color: '#1b2236', fontSize: FontSize.md, fontWeight: '600' }}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}
