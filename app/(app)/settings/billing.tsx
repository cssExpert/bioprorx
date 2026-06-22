import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../src/constants/colors';
import { Header } from '../../../src/components/ui/Header';
import { Card } from '../../../src/components/ui/Card';
import { Badge } from '../../../src/components/ui/Badge';
import ScreenShades from '@/components/common/ScreenShades';

const HISTORY = [
  { id: '1', date: 'Jan 1, 2025', amount: '$149.00', plan: 'Professional', status: 'paid' as const },
  { id: '2', date: 'Dec 1, 2024', amount: '$149.00', plan: 'Professional', status: 'paid' as const },
  { id: '3', date: 'Nov 1, 2024', amount: '$149.00', plan: 'Professional', status: 'paid' as const },
  { id: '4', date: 'Oct 1, 2024', amount: '$49.00', plan: 'Basic', status: 'paid' as const },
];

export default function BillingScreen() {
  return (
        <View style={{ flex: 1 }}>
      <ScreenShades />
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.surface }} edges={['top', 'bottom']}>
        <Header title="Billing History" showBack />
        <FlatList
          data={HISTORY}
          keyExtractor={(i) => i.id}
          contentContainerStyle={{ padding: 16, gap: 10 }}
          renderItem={({ item }) => (
            <Card elevated>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                  <Text style={{ fontSize: 15, fontWeight: '700', color: Colors.textPrimary }}>{item.plan} Plan</Text>
                  <Text style={{ fontSize: 13, color: Colors.muted, marginTop: 2 }}>{item.date}</Text>
                </View>
                <View style={{ alignItems: 'flex-end', gap: 6 }}>
                  <Text style={{ fontSize: 16, fontWeight: '800', color: Colors.textPrimary }}>{item.amount}</Text>
                  <Badge label={item.status} variant="success" />
                </View>
              </View>
            </Card>
          )}
        />
      </SafeAreaView>
    </View>
  );
}
