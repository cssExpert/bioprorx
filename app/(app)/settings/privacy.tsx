import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../src/constants/colors';
import { Header } from '../../../src/components/ui/Header';
import ScreenShades from '@/components/common/ScreenShades';

const SECTIONS = [
  { title: '1. Information We Collect', content: 'We collect information you provide directly, including name, email, NPI, and patient data entered into the platform. We also collect usage data to improve our services.' },
  { title: '2. HIPAA Compliance', content: 'BioProRx is a HIPAA-covered entity. All Protected Health Information (PHI) is handled in accordance with HIPAA Privacy Rule requirements. We maintain a Business Associate Agreement (BAA) with all downstream service providers.' },
  { title: '3. Data Security', content: 'All data is encrypted at rest using AES-256 and in transit using TLS 1.3. We undergo annual SOC 2 Type II audits and penetration testing.' },
  { title: '4. Data Retention', content: 'Patient and PA data is retained for 7 years per HIPAA requirements. Account data is deleted within 30 days of account closure upon request.' },
  { title: '5. Your Rights', content: 'You have the right to access, correct, or delete your personal data. Contact privacy@bioprorx.com to exercise these rights.' },
];

export default function PrivacyScreen() {
  return (
        <View style={{ flex: 1 }}>
      <ScreenShades />
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.surface }} edges={['top', 'bottom']}>
        <Header title="Privacy Policy" showBack />
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <Text style={{ fontSize: 12, color: Colors.muted, marginBottom: 20 }}>Last updated: January 1, 2025</Text>
          {SECTIONS.map((section) => (
            <View key={section.title} style={{ marginBottom: 24 }}>
              <Text style={{ fontSize: 16, fontWeight: '700', color: Colors.textPrimary, marginBottom: 10 }}>{section.title}</Text>
              <Text style={{ fontSize: 14, color: Colors.textSecondary, lineHeight: 22 }}>{section.content}</Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
