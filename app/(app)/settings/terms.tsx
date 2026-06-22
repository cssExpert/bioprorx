import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../src/constants/colors';
import { Header } from '../../../src/components/ui/Header';
import ScreenShades from '@/components/common/ScreenShades';

const SECTIONS = [
  { title: '1. Acceptance of Terms', content: 'By accessing BioProRx, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree, do not use the service.' },
  { title: '2. Authorized Use', content: 'BioProRx is for licensed healthcare providers only. You must maintain valid NPI registration and appropriate state licensure to use prescribing features.' },
  { title: '3. Patient Data', content: 'You are responsible for obtaining appropriate patient consent before entering PHI. You must comply with HIPAA and applicable state privacy laws.' },
  { title: '4. Prohibited Actions', content: 'You may not share credentials, submit fraudulent PAs, misuse ePrescribing features, attempt to circumvent security controls, or reverse-engineer the platform.' },
  { title: '5. Limitation of Liability', content: 'BioProRx provides tools to assist with PA management but does not guarantee payer approval decisions. Providers retain full clinical responsibility.' },
  { title: '6. Termination', content: 'We may suspend accounts for violations of these terms, regulatory requirements, or suspected fraud. You may cancel anytime from account settings.' },
];

export default function TermsScreen() {
  return (
        <View style={{ flex: 1 }}>
      <ScreenShades />
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.surface }} edges={['top', 'bottom']}>
        <Header title="Terms of Service" showBack />
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
