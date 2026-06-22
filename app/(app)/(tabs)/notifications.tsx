import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import ScreenShades from '@/components/common/ScreenShades';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../src/constants/colors';
import { FontSize } from '@/src/constants/mixins';
import { Card } from '../../../src/components/ui/Card';

const NOTIFICATIONS = [
  {
    id: '1',
    type: 'approved',
    title: 'PA Approved',
    body: 'Humira 40mg for Sarah Johnson has been approved by Aetna.',
    time: '2 hours ago',
    read: false,
  },
  {
    id: '2',
    type: 'denied',
    title: 'PA Denied',
    body: 'Enbrel 50mg for Lisa Martinez was denied by UHC. Consider filing an appeal.',
    time: '5 hours ago',
    read: false,
  },
  {
    id: '3',
    type: 'reminder',
    title: 'PA Expiring Soon',
    body: 'Authorization for Robert Kim expires in 7 days. Renew now.',
    time: '1 day ago',
    read: true,
  },
  {
    id: '4',
    type: 'update',
    title: 'Status Update',
    body: 'Stelara 90mg for Michael Thompson is under medical review.',
    time: '2 days ago',
    read: true,
  },
  {
    id: '5',
    type: 'approved',
    title: 'PA Approved',
    body: 'Cosentyx 300mg for Emma Davis approved by Medicare.',
    time: '3 days ago',
    read: true,
  },
];

const TYPE_CONFIG: Record<string, { icon: string; bg: string; color: string }> = {
  approved: { icon: '✅', bg: Colors.successLight, color: '#15803D' },
  denied: { icon: '❌', bg: Colors.errorLight, color: Colors.error },
  reminder: { icon: '⏰', bg: Colors.warningLight, color: '#92400E' },
  update: { icon: '📋', bg: '#EFF6FF', color: Colors.primary },
};

export default function NotificationsScreen() {
  return (
    <View style={{ flex: 1 }}>
      <ScreenShades />
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.surface }} edges={['top']}>
        <View
          style={{
            backgroundColor: Colors.white,
            paddingHorizontal: 20,
            paddingVertical: 16,
            borderBottomWidth: 1,
            borderBottomColor: Colors.border,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: FontSize.h5, fontWeight: '800', color: Colors.textPrimary }}>
            Notifications
          </Text>
          <TouchableOpacity>
            <Text style={{ color: Colors.primary, fontWeight: '600', fontSize: FontSize.md }}>
              Mark all read
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={NOTIFICATIONS}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, gap: 10 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const config = TYPE_CONFIG[item.type] ?? TYPE_CONFIG.update;
            return (
              <Card elevated style={{ opacity: item.read ? 0.75 : 1 }}>
                <View style={{ flexDirection: 'row', gap: 14 }}>
                  <View
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      backgroundColor: config.bg,
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Text style={{ fontSize: FontSize.xxl }}>{config.icon}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Text
                        style={{
                          fontSize: FontSize.md,
                          fontWeight: '700',
                          color: Colors.textPrimary,
                          flex: 1,
                        }}
                      >
                        {item.title}
                      </Text>
                      {!item.read && (
                        <View
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: Colors.primary,
                            marginLeft: 8,
                            marginTop: 4,
                          }}
                        />
                      )}
                    </View>
                    <Text
                      style={{
                        fontSize: FontSize.base,
                        color: Colors.textSecondary,
                        marginTop: 4,
                        lineHeight: 18,
                      }}
                    >
                      {item.body}
                    </Text>
                    <Text style={{ fontSize: FontSize.sm, color: Colors.muted, marginTop: 6 }}>
                      {item.time}
                    </Text>
                  </View>
                </View>
              </Card>
            );
          }}
        />
      </SafeAreaView>
    </View>
  );
}
