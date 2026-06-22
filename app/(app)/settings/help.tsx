import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../src/constants/colors';
import { Header } from '../../../src/components/ui/Header';
import { Card } from '../../../src/components/ui/Card';
import ScreenShades from '@/components/common/ScreenShades';

const FAQS = [
  { q: 'How long does PA approval take?', a: 'Electronic submissions typically take 1-3 business days. Urgent requests can be expedited.' },
  { q: 'What is step therapy?', a: 'Step therapy requires patients to try less expensive drugs before payers approve higher-cost ones.' },
  { q: 'Can I appeal a denied PA?', a: 'Yes. Go to PA Board → select denied PA → tap Appeal. You can submit written, peer-to-peer, or external review appeals.' },
  { q: 'Is my data HIPAA compliant?', a: 'Yes. All data is encrypted at rest and in transit. We maintain a HIPAA BAA with all service providers.' },
];

export default function HelpScreen() {
  return (
        <View style={{ flex: 1 }}>
      <ScreenShades />
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.surface }} edges={['top', 'bottom']}>
        <Header title="Help & Support" showBack />
        <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
          {/* Contact options */}
          <View style={{ gap: 10 }}>
            {[
              { icon: '📧', label: 'Email Support', value: 'support@bioprorx.com' },
              { icon: '📞', label: 'Phone Support', value: '1-800-BIO-PRORX' },
              { icon: '💬', label: 'Live Chat', value: 'Available Mon-Fri 8AM-6PM EST' },
            ].map((contact) => (
              <Card key={contact.label} elevated onPress={() => {}}>
                <View style={{ flexDirection: 'row', gap: 14, alignItems: 'center' }}>
                  <Text style={{ fontSize: 24 }}>{contact.icon}</Text>
                  <View>
                    <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.textPrimary }}>{contact.label}</Text>
                    <Text style={{ fontSize: 13, color: Colors.primary, marginTop: 2 }}>{contact.value}</Text>
                  </View>
                </View>
              </Card>
            ))}
          </View>

          <Text style={{ fontSize: 15, fontWeight: '700', color: Colors.textPrimary }}>FAQs</Text>
          <View style={{ gap: 10 }}>
            {FAQS.map((faq) => (
              <Card key={faq.q} elevated>
                <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.textPrimary, marginBottom: 8 }}>{faq.q}</Text>
                <Text style={{ fontSize: 13, color: Colors.textSecondary, lineHeight: 20 }}>{faq.a}</Text>
              </Card>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
