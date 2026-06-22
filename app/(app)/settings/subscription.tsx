import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../src/constants/colors';
import { Header } from '../../../src/components/ui/Header';
import { Card } from '../../../src/components/ui/Card';
import { SUBSCRIPTION_PLANS } from '../../../src/constants/specialties';
import { Badge } from '../../../src/components/ui/Badge';
import ScreenShades from '@/components/common/ScreenShades';

export default function SubscriptionSettingsScreen() {
  const currentPlan = SUBSCRIPTION_PLANS[1];

  return (
        <View style={{ flex: 1 }}>
      <ScreenShades />
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.surface }} edges={['top', 'bottom']}>
        <Header title="Plan & Billing" showBack />
        <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
          <Card elevated>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <View>
                <Text style={{ fontSize: 18, fontWeight: '800', color: Colors.textPrimary }}>{currentPlan.name} Plan</Text>
                <Text style={{ fontSize: 13, color: Colors.muted }}>Active subscription</Text>
              </View>
              <Badge label="Active" variant="success" />
            </View>
            <Text style={{ fontSize: 28, fontWeight: '800', color: Colors.primary, marginBottom: 4 }}>
              ${currentPlan.price}<Text style={{ fontSize: 14, fontWeight: '500', color: Colors.muted }}>/month</Text>
            </Text>
            <Text style={{ fontSize: 13, color: Colors.muted, marginBottom: 16 }}>Next billing: February 1, 2025</Text>
            <View style={{ gap: 8 }}>
              {currentPlan.features.map((f) => (
                <View key={f} style={{ flexDirection: 'row', gap: 8 }}>
                  <Text style={{ color: Colors.success }}>✓</Text>
                  <Text style={{ fontSize: 13, color: Colors.textSecondary }}>{f}</Text>
                </View>
              ))}
            </View>
          </Card>

          <Text style={{ fontSize: 15, fontWeight: '700', color: Colors.textPrimary }}>Upgrade Plan</Text>
          {SUBSCRIPTION_PLANS.filter((p) => p.id !== currentPlan.id).map((plan) => (
            <Card key={plan.id} elevated onPress={() => {}}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                  <Text style={{ fontSize: 16, fontWeight: '700', color: Colors.textPrimary }}>{plan.name}</Text>
                  <Text style={{ fontSize: 13, color: Colors.muted }}>{plan.features.length} features included</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{ fontSize: 18, fontWeight: '800', color: Colors.primary }}>${plan.price}/mo</Text>
                  <Text style={{ color: Colors.primary, fontSize: 13, fontWeight: '600' }}>Upgrade →</Text>
                </View>
              </View>
            </Card>
          ))}

          <TouchableOpacity style={{ alignItems: 'center', paddingVertical: 14 }}>
            <Text style={{ color: Colors.error, fontWeight: '600', fontSize: 14 }}>Cancel Subscription</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
