import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../src/constants/colors';
import { Card } from '../../../src/components/ui/Card';
import { Badge } from '../../../src/components/ui/Badge';
import ScreenShades from '@/components/common/ScreenShades';

const MOCK_PA = {
  id: 'pa1',
  patient: 'Sarah Johnson',
  drug: 'Humira 40mg',
  diagnosis: 'Rheumatoid Arthritis (M05.79)',
  status: 'approved' as const,
  insurance: 'Aetna',
  referenceNumber: 'PA-2024-001',
  submittedAt: '2024-01-10',
  reviewedAt: '2024-01-12',
  expiresAt: '2025-01-12',
  approvedQty: '2 pens per month',
  notes: 'Approved for 12 months. Step therapy documentation accepted. Renewal required before 2025-01-12.',
};

export default function PADetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  return (
        <View style={{ flex: 1 }}>
      <ScreenShades />
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.surface }} edges={['top', 'bottom']}>
        <View style={{ backgroundColor: Colors.white, paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: Colors.border }}>
          <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 24, color: Colors.textSecondary }}>←</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <View>
              <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.textPrimary }}>PA Details</Text>
              <Text style={{ fontSize: 13, color: Colors.muted, marginTop: 4 }}>{MOCK_PA.referenceNumber}</Text>
            </View>
            <Badge label={MOCK_PA.status} variant={MOCK_PA.status} />
          </View>
        </View>

        <ScrollView contentContainerStyle={{ padding: 16, gap: 14 }} showsVerticalScrollIndicator={false}>
          {/* Status banner */}
          <Card elevated style={{ backgroundColor: Colors.successLight }}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Text style={{ fontSize: 24 }}>✅</Text>
              <View>
                <Text style={{ fontSize: 15, fontWeight: '700', color: '#15803D', marginBottom: 4 }}>Authorization Approved</Text>
                <Text style={{ fontSize: 13, color: '#166534' }}>Reviewed on {MOCK_PA.reviewedAt} · Expires {MOCK_PA.expiresAt}</Text>
              </View>
            </View>
          </Card>

          <Card elevated>
            <Text style={{ fontSize: 15, fontWeight: '700', color: Colors.textPrimary, marginBottom: 12 }}>Medication</Text>
            {[
              ['Drug', MOCK_PA.drug],
              ['Approved Qty', MOCK_PA.approvedQty],
              ['Diagnosis', MOCK_PA.diagnosis],
            ].map(([label, val]) => (
              <View key={label} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                <Text style={{ fontSize: 13, color: Colors.muted }}>{label}</Text>
                <Text style={{ fontSize: 13, fontWeight: '600', color: Colors.textPrimary, flex: 1, textAlign: 'right', marginLeft: 8 }}>{val}</Text>
              </View>
            ))}
          </Card>

          <Card elevated>
            <Text style={{ fontSize: 15, fontWeight: '700', color: Colors.textPrimary, marginBottom: 12 }}>Patient & Insurance</Text>
            {[
              ['Patient', MOCK_PA.patient],
              ['Insurance', MOCK_PA.insurance],
              ['Submitted', MOCK_PA.submittedAt],
            ].map(([label, val]) => (
              <View key={label} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                <Text style={{ fontSize: 13, color: Colors.muted }}>{label}</Text>
                <Text style={{ fontSize: 13, fontWeight: '600', color: Colors.textPrimary }}>{val}</Text>
              </View>
            ))}
          </Card>

          <Card elevated>
            <Text style={{ fontSize: 15, fontWeight: '700', color: Colors.textPrimary, marginBottom: 10 }}>Payer Notes</Text>
            <Text style={{ fontSize: 14, color: Colors.textSecondary, lineHeight: 20 }}>{MOCK_PA.notes}</Text>
          </Card>

          {/* Actions */}
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TouchableOpacity style={{ flex: 1, backgroundColor: Colors.primary, borderRadius: 14, paddingVertical: 14, alignItems: 'center' }}>
              <Text style={{ color: Colors.white, fontWeight: '700', fontSize: 14 }}>📨 Send to Pharmacy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, backgroundColor: Colors.surface, borderRadius: 14, paddingVertical: 14, alignItems: 'center', borderWidth: 1, borderColor: Colors.border }}>
              <Text style={{ color: Colors.textPrimary, fontWeight: '700', fontSize: 14 }}>🔄 Renew PA</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
