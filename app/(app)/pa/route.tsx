import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../src/constants/colors';
import ScreenShades from '@/components/common/ScreenShades';

const ROUTES = [
  { id: 'electronic', icon: '⚡', title: 'Electronic Submission', subtitle: 'Send directly to payer portal (CoverMyMeds, Surescripts)', time: 'Fastest — 1-3 business days', recommended: true },
  { id: 'pharmacy', icon: '💊', title: 'Send to Specialty Pharmacy', subtitle: 'PA handled by pharmacy benefits coordinator', time: '3-5 business days', recommended: false },
  { id: 'iod', icon: '🏥', title: 'In-Office Dispensing (IOD)', subtitle: 'Dispense from your office medication stock', time: 'Immediate — if approved', recommended: false },
  { id: 'fax', icon: '📠', title: 'Fax to Payer', subtitle: 'Traditional fax submission', time: '5-10 business days', recommended: false },
];

export default function RouteScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>('electronic');

  const handleContinue = () => {
    if (selected === 'pharmacy') {
      router.push('/(app)/pa/pharmacy');
    } else if (selected === 'iod') {
      router.push('/(app)/pa/iod');
    } else {
      router.push('/(app)/pa/confirmation');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScreenShades />
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.surface }} edges={['top', 'bottom']}>
        <View style={{ backgroundColor: Colors.white, paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: Colors.border }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <TouchableOpacity onPress={() => router.back()} style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.surface, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 18 }}>←</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 17, fontWeight: '700', color: Colors.textPrimary }}>Route PA</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            {['Scan', 'Dx', 'Tier', 'Step', 'Auth', 'Route'].map((s, i) => (
              <View key={s} style={{ flex: 1, height: 3, borderRadius: 1.5, backgroundColor: Colors.primary }} />
            ))}
          </View>
          <Text style={{ color: Colors.muted, fontSize: 12, marginTop: 6 }}>Step 6 of 6 · Submission Method</Text>
        </View>

        <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
          <Text style={{ fontSize: 15, color: Colors.textSecondary, marginBottom: 4 }}>Choose how to submit this PA:</Text>
          {ROUTES.map((route) => {
            const isSelected = selected === route.id;
            return (
              <TouchableOpacity
                key={route.id}
                onPress={() => setSelected(route.id)}
                style={{
                  backgroundColor: isSelected ? Colors.navy : Colors.white,
                  borderRadius: 16,
                  padding: 16,
                  borderWidth: isSelected ? 2 : 1,
                  borderColor: isSelected ? Colors.primary : Colors.border,
                  flexDirection: 'row',
                  gap: 14,
                  alignItems: 'flex-start',
                }}
              >
                <View style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: isSelected ? Colors.primary : Colors.surface, alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Text style={{ fontSize: 22 }}>{route.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <Text style={{ fontSize: 15, fontWeight: '700', color: isSelected ? Colors.white : Colors.textPrimary }}>{route.title}</Text>
                    {route.recommended && (
                      <View style={{ backgroundColor: Colors.teal, borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 }}>
                        <Text style={{ fontSize: 10, fontWeight: '800', color: Colors.white }}>RECOMMENDED</Text>
                      </View>
                    )}
                  </View>
                  <Text style={{ fontSize: 13, color: isSelected ? 'rgba(255,255,255,0.7)' : Colors.textSecondary, marginBottom: 6 }}>{route.subtitle}</Text>
                  <Text style={{ fontSize: 12, color: isSelected ? Colors.teal : Colors.primary, fontWeight: '600' }}>⏱ {route.time}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={{ paddingHorizontal: 20, paddingBottom: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: Colors.border, backgroundColor: Colors.white }}>
          <TouchableOpacity
            onPress={handleContinue}
            style={{ backgroundColor: Colors.primary, borderRadius: 16, paddingVertical: 17, alignItems: 'center' }}
          >
            <Text style={{ color: Colors.white, fontSize: 17, fontWeight: '700' }}>Submit PA</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
