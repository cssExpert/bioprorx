import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../src/constants/colors';
import { Card } from '../../../src/components/ui/Card';
import { Badge } from '../../../src/components/ui/Badge';
import ScreenShades from '@/components/common/ScreenShades';

const MOCK_PATIENT = {
  id: '1', firstName: 'Sarah', lastName: 'Johnson', dob: '1975-03-12',
  gender: 'Female', mrn: 'MRN001', insuranceName: 'Aetna',
  insuranceId: 'AET123456789', groupNumber: 'GRP001',
  phone: '(555) 234-5678', email: 'sarah.j@email.com',
  address: '123 Main St, Boston, MA 02101',
  diagnosis: ['Rheumatoid Arthritis (M05.79)', 'Osteoporosis (M81.0)'],
  medications: ['Humira 40mg (Active)', 'Methotrexate 15mg (Active)', 'Folic Acid 1mg'],
  pas: [
    { id: 'pa1', drug: 'Humira 40mg', status: 'approved' as const, date: '2024-01-10', ref: 'PA-2024-001' },
    { id: 'pa2', drug: 'Stelara 90mg', status: 'denied' as const, date: '2023-09-05', ref: 'PA-2023-045' },
  ],
};

export default function PatientDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  return (
        <View style={{ flex: 1 }}>
      <ScreenShades />
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.surface }} edges={['top', 'bottom']}>
        {/* Header */}
        <View style={{ backgroundColor: Colors.navy, paddingHorizontal: 20, paddingTop: 16, paddingBottom: 28 }}>
          <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 24, color: 'rgba(255,255,255,0.7)' }}>←</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 24, fontWeight: '700', color: Colors.white }}>
                {MOCK_PATIENT.firstName[0]}{MOCK_PATIENT.lastName[0]}
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.white }}>
                {MOCK_PATIENT.firstName} {MOCK_PATIENT.lastName}
              </Text>
              <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
                MRN: {MOCK_PATIENT.mrn} · DOB: {MOCK_PATIENT.dob}
              </Text>
            </View>
          </View>
        </View>

        <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }} showsVerticalScrollIndicator={false}>
          {/* Quick action */}
          <TouchableOpacity
            onPress={() => router.push('/(app)/pa/card-scan')}
            style={{ backgroundColor: Colors.teal, borderRadius: 14, paddingVertical: 14, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 10 }}
          >
            <Text style={{ fontSize: 18 }}>📋</Text>
            <Text style={{ color: Colors.white, fontWeight: '700', fontSize: 15 }}>Start New PA for {MOCK_PATIENT.firstName}</Text>
          </TouchableOpacity>

          {/* Insurance */}
          <Card elevated>
            <Text style={{ fontSize: 15, fontWeight: '700', color: Colors.textPrimary, marginBottom: 12 }}>Insurance</Text>
            {[
              ['Payer', MOCK_PATIENT.insuranceName],
              ['Member ID', MOCK_PATIENT.insuranceId],
              ['Group', MOCK_PATIENT.groupNumber],
            ].map(([label, val]) => (
              <View key={label} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text style={{ fontSize: 13, color: Colors.muted }}>{label}</Text>
                <Text style={{ fontSize: 13, fontWeight: '600', color: Colors.textPrimary }}>{val}</Text>
              </View>
            ))}
          </Card>

          {/* Contact */}
          <Card elevated>
            <Text style={{ fontSize: 15, fontWeight: '700', color: Colors.textPrimary, marginBottom: 12 }}>Contact</Text>
            {[
              ['Phone', MOCK_PATIENT.phone],
              ['Email', MOCK_PATIENT.email],
              ['Address', MOCK_PATIENT.address],
            ].map(([label, val]) => (
              <View key={label} style={{ marginBottom: 8 }}>
                <Text style={{ fontSize: 12, color: Colors.muted }}>{label}</Text>
                <Text style={{ fontSize: 14, color: Colors.textPrimary, marginTop: 2 }}>{val}</Text>
              </View>
            ))}
          </Card>

          {/* Diagnoses */}
          <Card elevated>
            <Text style={{ fontSize: 15, fontWeight: '700', color: Colors.textPrimary, marginBottom: 12 }}>Diagnoses</Text>
            {MOCK_PATIENT.diagnosis.map((d) => (
              <View key={d} style={{ flexDirection: 'row', gap: 8, marginBottom: 6 }}>
                <Text style={{ color: Colors.primary }}>•</Text>
                <Text style={{ fontSize: 14, color: Colors.textSecondary }}>{d}</Text>
              </View>
            ))}
          </Card>

          {/* Medications */}
          <Card elevated>
            <Text style={{ fontSize: 15, fontWeight: '700', color: Colors.textPrimary, marginBottom: 12 }}>Current Medications</Text>
            {MOCK_PATIENT.medications.map((m) => (
              <View key={m} style={{ flexDirection: 'row', gap: 8, marginBottom: 6 }}>
                <Text style={{ color: Colors.teal }}>💊</Text>
                <Text style={{ fontSize: 14, color: Colors.textSecondary }}>{m}</Text>
              </View>
            ))}
          </Card>

          {/* PA History */}
          <Card elevated>
            <Text style={{ fontSize: 15, fontWeight: '700', color: Colors.textPrimary, marginBottom: 12 }}>PA History</Text>
            {MOCK_PATIENT.pas.map((pa) => (
              <TouchableOpacity
                key={pa.id}
                onPress={() => router.push(`/(app)/pa/${pa.id}` as any)}
                style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.border }}
              >
                <View>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: Colors.textPrimary }}>{pa.drug}</Text>
                  <Text style={{ fontSize: 12, color: Colors.muted }}>{pa.ref} · {pa.date}</Text>
                </View>
                <Badge label={pa.status} variant={pa.status} />
              </TouchableOpacity>
            ))}
          </Card>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
