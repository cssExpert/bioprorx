import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import ScreenShades from '@/components/common/ScreenShades';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../src/constants/colors';
import { FontSize } from '@/src/constants/mixins';
import { Card } from '../../../src/components/ui/Card';
import { useAuthStore } from '../../../src/stores/authStore';

const MENU_GROUPS = [
  {
    title: 'Account',
    items: [
      { icon: '👤', label: 'Profile & License', route: '/(app)/settings/profile' },
      { icon: '🏥', label: 'Specialties', route: '/(app)/settings/specialty' },
      { icon: '🔒', label: 'Change Password', route: '/(app)/settings/password' },
    ],
  },
  {
    title: 'Subscription',
    items: [
      { icon: '💳', label: 'Plan & Billing', route: '/(app)/settings/subscription' },
      { icon: '🧾', label: 'Billing History', route: '/(app)/settings/billing' },
    ],
  },
  {
    title: 'Legal & Support',
    items: [
      { icon: '🔐', label: 'Privacy Policy', route: '/(app)/settings/privacy' },
      { icon: '📄', label: 'Terms of Service', route: '/(app)/settings/terms' },
      { icon: '💬', label: 'Help & Support', route: '/(app)/settings/help' },
    ],
  },
];

export default function SettingsScreen() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/(auth)/login');
        },
      },
    ]);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScreenShades />
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.surface }} edges={['top']}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View
            style={{
              backgroundColor: Colors.navy,
              paddingHorizontal: 20,
              paddingTop: 20,
              paddingBottom: 36,
            }}
          >
            <Text
              style={{
                fontSize: FontSize.h5,
                fontWeight: '800',
                color: Colors.white,
                marginBottom: 20,
              }}
            >
              Settings
            </Text>
            <Card style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: Colors.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ fontSize: FontSize.h5, fontWeight: '700', color: Colors.white }}>
                  {(user?.firstName?.[0] ?? 'D').toUpperCase()}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: FontSize.lgPlus,
                    fontWeight: '700',
                    color: Colors.textPrimary,
                  }}
                >
                  Dr. {user?.firstName ?? 'Provider'} {user?.lastName ?? ''}
                </Text>
                <Text
                  style={{ fontSize: FontSize.base, color: Colors.textSecondary, marginTop: 2 }}
                >
                  {user?.email ?? 'provider@clinic.com'}
                </Text>
                <Text style={{ fontSize: FontSize.sm, color: Colors.muted, marginTop: 2 }}>
                  NPI: {user?.npi ?? '••••••••••'}
                </Text>
              </View>
            </Card>
          </View>

          <View style={{ paddingHorizontal: 16, paddingTop: 20, gap: 20 }}>
            {MENU_GROUPS.map((group) => (
              <View key={group.title}>
                <Text
                  style={{
                    fontSize: FontSize.sm,
                    fontWeight: '700',
                    color: Colors.muted,
                    marginBottom: 10,
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    paddingHorizontal: 4,
                  }}
                >
                  {group.title}
                </Text>
                <Card elevated padded={false}>
                  {group.items.map((item, idx) => (
                    <React.Fragment key={item.label}>
                      <TouchableOpacity
                        onPress={() => router.push(item.route as any)}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingHorizontal: 16,
                          paddingVertical: 16,
                          gap: 14,
                        }}
                        activeOpacity={0.7}
                      >
                        <Text style={{ fontSize: FontSize.xxl }}>{item.icon}</Text>
                        <Text
                          style={{
                            flex: 1,
                            fontSize: FontSize.md,
                            fontWeight: '600',
                            color: Colors.textPrimary,
                          }}
                        >
                          {item.label}
                        </Text>
                        <Text style={{ color: Colors.muted, fontSize: FontSize.xl }}>›</Text>
                      </TouchableOpacity>
                      {idx < group.items.length - 1 && (
                        <View
                          style={{ height: 1, backgroundColor: Colors.border, marginLeft: 50 }}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </Card>
              </View>
            ))}

            {/* Logout */}
            <TouchableOpacity
              onPress={handleLogout}
              style={{
                backgroundColor: Colors.errorLight,
                borderRadius: 14,
                paddingVertical: 16,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 10,
                marginBottom: 32,
              }}
            >
              <Text style={{ fontSize: FontSize.xxl }}>🚪</Text>
              <Text style={{ fontSize: FontSize.lg, fontWeight: '700', color: Colors.error }}>
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
