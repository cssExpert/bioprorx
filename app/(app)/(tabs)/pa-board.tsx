import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import ScreenShades from '@/components/common/ScreenShades';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../src/constants/colors';
import { FontSize } from '@/src/constants/mixins';
import { Card } from '../../../src/components/ui/Card';
import { Badge } from '../../../src/components/ui/Badge';
import type { PAStatus } from '../../../src/types/pa';

const TABS: { label: string; value: PAStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Submitted', value: 'submitted' },
  { label: 'Approved', value: 'approved' },
  { label: 'Denied', value: 'denied' },
];

const MOCK_PAS = [
  { id: '1', patient: 'Sarah Johnson', drug: 'Humira 40mg', diagnosis: 'RA', status: 'approved' as PAStatus, insurance: 'Aetna', ref: 'PA-2024-001', submittedAt: '2024-01-10' },
  { id: '2', patient: 'Michael Thompson', drug: 'Stelara 90mg', diagnosis: "Crohn's", status: 'pending' as PAStatus, insurance: 'BlueCross', ref: 'PA-2024-002', submittedAt: '2024-01-12' },
  { id: '3', patient: 'Lisa Martinez', drug: 'Enbrel 50mg', diagnosis: 'Psoriasis', status: 'denied' as PAStatus, insurance: 'UHC', ref: 'PA-2024-003', submittedAt: '2024-01-08' },
  { id: '4', patient: 'Robert Kim', drug: 'Cosentyx 300mg', diagnosis: 'AS', status: 'submitted' as PAStatus, insurance: 'Cigna', ref: 'PA-2024-004', submittedAt: '2024-01-14' },
  { id: '5', patient: 'Emma Davis', drug: 'Benlysta 200mg', diagnosis: 'Lupus', status: 'appealing' as PAStatus, insurance: 'Medicare', ref: 'PA-2024-005', submittedAt: '2024-01-05' },
  { id: '6', patient: 'James Wilson', drug: 'Ocrevus 300mg', diagnosis: 'MS', status: 'draft' as PAStatus, insurance: 'Aetna', ref: 'PA-2024-006', submittedAt: '2024-01-15' },
];

export default function PABoardScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<PAStatus | 'all'>('all');

  const filtered = activeTab === 'all' ? MOCK_PAS : MOCK_PAS.filter((p) => p.status === activeTab);

  return (
    <View style={{ flex: 1 }}>
    <ScreenShades />
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.surface }} edges={['top']}>
      {/* Header */}
      <View
        style={{
          backgroundColor: Colors.white,
          paddingHorizontal: 20,
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderBottomColor: Colors.border,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <Text style={{ fontSize: FontSize.h5, fontWeight: '800', color: Colors.textPrimary }}>PA Board</Text>
          <TouchableOpacity
            onPress={() => router.push('/(app)/pa/card-scan')}
            style={{
              backgroundColor: Colors.primary,
              borderRadius: 10,
              paddingHorizontal: 14,
              paddingVertical: 8,
            }}
          >
            <Text style={{ color: Colors.white, fontWeight: '700', fontSize: FontSize.md }}>+ New PA</Text>
          </TouchableOpacity>
        </View>

        {/* Filter tabs */}
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab.value}
              onPress={() => setActiveTab(tab.value)}
              style={{
                paddingHorizontal: 14,
                paddingVertical: 7,
                borderRadius: 100,
                backgroundColor: activeTab === tab.value ? Colors.primary : Colors.surface,
                borderWidth: 1,
                borderColor: activeTab === tab.value ? Colors.primary : Colors.border,
              }}
            >
              <Text
                style={{
                  fontSize: FontSize.base,
                  fontWeight: '600',
                  color: activeTab === tab.value ? Colors.white : Colors.textSecondary,
                }}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, gap: 10 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Card onPress={() => router.push(`/(app)/pa/${item.id}` as any)} elevated>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <Badge label={item.status} variant={item.status} />
                  <Text style={{ fontSize: FontSize.sm, color: Colors.muted }}>{item.ref}</Text>
                </View>
                <Text style={{ fontSize: FontSize.lg, fontWeight: '700', color: Colors.textPrimary }}>{item.patient}</Text>
                <Text style={{ fontSize: FontSize.md, color: Colors.textSecondary, marginTop: 2 }}>{item.drug}</Text>
                <Text style={{ fontSize: FontSize.sm, color: Colors.muted, marginTop: 4 }}>
                  {item.insurance} · {item.diagnosis} · {item.submittedAt}
                </Text>
              </View>
              <View style={{ gap: 8, alignItems: 'flex-end' }}>
                <Text style={{ color: Colors.muted, fontSize: FontSize.xl }}>›</Text>
                {item.status === 'denied' && (
                  <TouchableOpacity
                    onPress={() => router.push('/(app)/pa/appeal')}
                    style={{
                      backgroundColor: Colors.errorLight,
                      borderRadius: 8,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                    }}
                  >
                    <Text style={{ fontSize: FontSize.xs2, fontWeight: '700', color: Colors.error }}>Appeal</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </Card>
        )}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', paddingTop: 60 }}>
            <Text style={{ fontSize: FontSize.d1 }}>📋</Text>
            <Text style={{ fontSize: FontSize.lg, fontWeight: '700', color: Colors.textSecondary, marginTop: 12 }}>
              No authorizations found
            </Text>
          </View>
        }
      />
    </SafeAreaView>
    </View>
  );
}
