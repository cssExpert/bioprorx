import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { useAuthStore } from '../../../src/stores/authStore';
import ScreenShades from '@/components/common/ScreenShades';
import { FontSize } from '@/src/constants/mixins';

const { width } = Dimensions.get('window');

// ── Icons ──────────────────────────────────────────────
function BellIcon({ hasDot }: { hasDot?: boolean }) {
  return (
    <View style={{ position: 'relative' }}>
      <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1a1d29"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
      </Svg>
      {hasDot && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: '#dc2626',
            borderWidth: 1.5,
            borderColor: '#f4f5f8',
          }}
        />
      )}
    </View>
  );
}

// ── Data ───────────────────────────────────────────────
const STATS = [
  { label: 'PA Pending', value: '28', color: '#d97706', bg: '#fdecd8' },
  { label: 'Approved', value: '45', color: '#16a34a', bg: '#d9f3e4' },
  { label: 'Denied', value: '3', color: '#dc2626', bg: '#fde0e0' },
  { label: 'In Drafts', value: '9', color: '#2563eb', bg: '#dbe8fd' },
];

const INSIGHTS = [
  { icon: '⚠️', text: 'Most denials due to missing labs' },
  { icon: '↗', text: 'Approval rate improved by 12% this week' },
  { icon: '💡', text: 'IV drugs show higher approval success' },
  { icon: '⚡', text: 'Biosimilar switches saving 40% PA time' },
];

const RECENT_PAS = [
  {
    id: '1',
    patient: 'Sarah J.',
    drug: 'Humira 40mg',
    status: 'approved',
    insurance: 'Aetna',
    time: '2h ago',
  },
  {
    id: '2',
    patient: 'Michael T.',
    drug: 'Stelara 90mg',
    status: 'pending',
    insurance: 'BlueCross',
    time: '5h ago',
  },
  {
    id: '3',
    patient: 'Lisa M.',
    drug: 'Enbrel 50mg',
    status: 'denied',
    insurance: 'UHC',
    time: '1d ago',
  },
];

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  approved: { bg: '#d9f3e4', text: '#16a34a', label: 'Approved' },
  pending: { bg: '#fdecd8', text: '#d97706', label: 'Pending' },
  denied: { bg: '#fde0e0', text: '#dc2626', label: 'Denied' },
  submitted: { bg: '#dbe8fd', text: '#2563eb', label: 'Submitted' },
};

const BAR_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const BAR_HEIGHTS = [0.6, 0.4, 0.75, 0.5, 0.85, 0.3, 0.65];

export default function DashboardScreen() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  return (
    <View style={{ flex: 1 }}>
      <ScreenShades />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f4f5f8' }} edges={['top']}>
        <StatusBar barStyle="dark-content" backgroundColor="#f4f5f8" />
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* App bar */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              paddingTop: 6,
              paddingBottom: 10,
              backgroundColor: '#f4f5f8',
            }}
          >
            <Text style={{ fontSize: FontSize.xl, fontWeight: '700', color: '#1a1d29' }}>
              Dashboard
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/(app)/(tabs)/notifications')}
              style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}
            >
              <BellIcon hasDot />
            </TouchableOpacity>
          </View>

          <View style={{ paddingHorizontal: 18, paddingBottom: 24 }}>
            {/* Greeting card */}
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 18,
                padding: 18,
                marginBottom: 14,
                shadowColor: '#1e203c',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.05,
                shadowRadius: 18,
                elevation: 2,
              }}
            >
              <Text style={{ fontSize: FontSize.base, color: '#8a8e9c' }}>Good morning 👋</Text>
              <Text
                style={{
                  fontSize: FontSize.xxl,
                  fontWeight: '700',
                  color: '#1a1d29',
                  marginTop: 4,
                }}
              >
                Dr. {user?.lastName ?? 'Provider'}
              </Text>
              <Text style={{ fontSize: FontSize.base, color: '#8a8e9c', marginTop: 2 }}>
                {user?.specialty?.[0] ?? 'Rheumatology'} · NPI{' '}
                {user?.npi?.slice(-4) ? `••••${user.npi.slice(-4)}` : '••••••••••'}
              </Text>
            </View>

            {/* Stat grid */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 14, marginBottom: 14 }}>
              {STATS.map((stat) => (
                <View
                  key={stat.label}
                  style={{
                    width: (width - 50) / 2,
                    backgroundColor: '#fff',
                    borderRadius: 18,
                    padding: 16,
                    minHeight: 110,
                    shadowColor: '#1e203c',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.05,
                    shadowRadius: 18,
                    elevation: 2,
                  }}
                >
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      backgroundColor: stat.bg,
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'absolute',
                      top: 16,
                      right: 16,
                    }}
                  >
                    <View
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: 6,
                        backgroundColor: stat.color,
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: FontSize.h1,
                      fontWeight: '800',
                      color: '#1a1d29',
                      marginTop: 28,
                    }}
                  >
                    {stat.value}
                  </Text>
                  <Text style={{ fontSize: FontSize.base, color: '#3d4150', marginTop: 2 }}>
                    {stat.label}
                  </Text>
                </View>
              ))}
            </View>

            {/* New PA CTA */}
            <TouchableOpacity
              onPress={() => router.push('/(app)/pa/card-scan')}
              activeOpacity={0.88}
              style={{
                height: 54,
                backgroundColor: '#3a1466',
                borderRadius: 14,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 20,
                justifyContent: 'space-between',
                marginBottom: 14,
                shadowColor: '#3a1466',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.25,
                shadowRadius: 16,
                elevation: 6,
              }}
            >
              <View>
                <Text style={{ color: '#fff', fontWeight: '700', fontSize: FontSize.md }}>
                  New Prior Authorization
                </Text>
                <Text
                  style={{ color: 'rgba(255,255,255,0.65)', fontSize: FontSize.sm, marginTop: 1 }}
                >
                  Scan card to get started
                </Text>
              </View>
              <Text style={{ fontSize: FontSize.h5 }}>🃏</Text>
            </TouchableOpacity>

            {/* Smart Insights */}
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 18,
                padding: 18,
                marginBottom: 14,
                shadowColor: '#1e203c',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.05,
                shadowRadius: 18,
                elevation: 2,
              }}
            >
              <Text
                style={{
                  fontSize: FontSize.lgPlus,
                  fontWeight: '600',
                  color: '#1a1d29',
                  marginBottom: 14,
                }}
              >
                Smart Insights
              </Text>
              <View style={{ gap: 12 }}>
                {INSIGHTS.map((item, i) => (
                  <View key={i} style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10 }}>
                    <Text style={{ fontSize: FontSize.lg, marginTop: 1 }}>{item.icon}</Text>
                    <Text
                      style={{ flex: 1, fontSize: FontSize.base, color: '#3d4150', lineHeight: 20 }}
                    >
                      {item.text}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Time chart */}
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 18,
                padding: 18,
                marginBottom: 14,
                shadowColor: '#1e203c',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.05,
                shadowRadius: 18,
                elevation: 2,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 14,
                }}
              >
                <Text style={{ fontSize: FontSize.lgPlus, fontWeight: '600', color: '#1a1d29' }}>
                  Time Efficiency
                </Text>
                <View
                  style={{
                    backgroundColor: '#d9f3e4',
                    borderRadius: 20,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                  }}
                >
                  <Text style={{ fontSize: FontSize.sm, fontWeight: '700', color: '#16a34a' }}>
                    42% faster
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 6, height: 80 }}>
                {BAR_DAYS.map((day, i) => (
                  <View key={day} style={{ flex: 1, alignItems: 'center' }}>
                    <View
                      style={{
                        width: '80%',
                        height: 60 * BAR_HEIGHTS[i],
                        backgroundColor: i === 4 ? '#7c3aed' : '#e3e0ef',
                        borderRadius: 4,
                      }}
                    />
                    <Text style={{ fontSize: FontSize.xxs, color: '#8a8e9c', marginTop: 4 }}>
                      {day}
                    </Text>
                  </View>
                ))}
              </View>
              <Text
                style={{
                  fontSize: FontSize.xs2,
                  color: '#8a8e9c',
                  marginTop: 10,
                  textAlign: 'center',
                }}
              >
                Average PA completion time over last 7 days
              </Text>
            </View>

            {/* Recent PA */}
            <View style={{ marginBottom: 8 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 12,
                }}
              >
                <Text style={{ fontSize: FontSize.lgPlus, fontWeight: '600', color: '#1a1d29' }}>
                  Recent PAs
                </Text>
                <TouchableOpacity onPress={() => router.push('/(app)/(tabs)/pa-board')}>
                  <Text style={{ color: '#7c3aed', fontWeight: '600', fontSize: FontSize.md }}>
                    View All
                  </Text>
                </TouchableOpacity>
              </View>

              {RECENT_PAS.map((pa) => {
                const st = STATUS_STYLES[pa.status] ?? STATUS_STYLES.pending;
                return (
                  <TouchableOpacity
                    key={pa.id}
                    onPress={() => router.push(`/(app)/pa/${pa.id}` as any)}
                    activeOpacity={0.8}
                    style={{
                      backgroundColor: '#fff',
                      borderRadius: 18,
                      padding: 16,
                      marginBottom: 12,
                      shadowColor: '#1e203c',
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.05,
                      shadowRadius: 18,
                      elevation: 2,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                      }}
                    >
                      <View style={{ flex: 1 }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 8,
                            marginBottom: 4,
                          }}
                        >
                          <Text
                            style={{ fontSize: FontSize.lg, fontWeight: '600', color: '#1a1d29' }}
                          >
                            {pa.patient}
                          </Text>
                          <View
                            style={{
                              backgroundColor: st.bg,
                              borderRadius: 20,
                              paddingHorizontal: 10,
                              paddingVertical: 4,
                            }}
                          >
                            <Text
                              style={{ fontSize: FontSize.xs2, fontWeight: '700', color: st.text }}
                            >
                              {st.label}
                            </Text>
                          </View>
                        </View>
                        <Text style={{ fontSize: FontSize.md, color: '#8a8e9c' }}>{pa.drug}</Text>
                        <Text style={{ fontSize: FontSize.sm, color: '#b0b3c0', marginTop: 4 }}>
                          {pa.insurance} · {pa.time}
                        </Text>
                      </View>
                      <Text style={{ color: '#c2c5d0', fontSize: FontSize.xxl }}>›</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
