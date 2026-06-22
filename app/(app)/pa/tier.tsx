import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../src/constants/colors';
import { Card } from '../../../src/components/ui/Card';
import { useAppStore } from '../../../src/stores/appStore';
import ScreenShades from '@/components/common/ScreenShades';

const FORMULARY = [
  { id: 't1', name: 'Methotrexate', tier: 'Tier 1 — Preferred Generic', price: '$15', pa: false, color: Colors.success },
  { id: 't2', name: 'Humira (adalimumab)', tier: 'Tier 3 — Preferred Brand', price: '$60 copay', pa: true, color: Colors.warning },
  { id: 't3', name: 'Enbrel (etanercept)', tier: 'Tier 3 — Non-Preferred Brand', price: '$80 copay', pa: true, color: Colors.warning },
  { id: 't4', name: 'Stelara (ustekinumab)', tier: 'Tier 4 — Specialty', price: '$150 copay', pa: true, color: Colors.error },
  { id: 't5', name: 'Cosentyx (secukinumab)', tier: 'Tier 4 — Specialty', price: '$150 copay', pa: true, color: Colors.error },
  { id: 't6', name: 'Rinvoq (upadacitinib)', tier: 'Tier 4 — Specialty', price: '$200 copay', pa: true, color: Colors.error },
];

export default function TierScreen() {
  const router = useRouter();
  const { setPAField } = useAppStore();
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string, name: string) => {
    setSelected(id);
    setPAField('medication', name);
    setPAField('tier', id);
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
            <Text style={{ fontSize: 17, fontWeight: '700', color: Colors.textPrimary }}>Formulary & Tier</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            {['Scan', 'Dx', 'Tier', 'Step', 'Auth', 'Route'].map((s, i) => (
              <View key={s} style={{ flex: 1, height: 3, borderRadius: 1.5, backgroundColor: i <= 2 ? Colors.primary : Colors.border }} />
            ))}
          </View>
          <Text style={{ color: Colors.muted, fontSize: 12, marginTop: 6 }}>Step 3 of 6 · Drug Selection</Text>
        </View>

        <ScrollView contentContainerStyle={{ padding: 16, gap: 10 }}>
          <Card elevated style={{ backgroundColor: Colors.infoLight, marginBottom: 4 }}>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Text style={{ fontSize: 16 }}>ℹ️</Text>
              <Text style={{ fontSize: 13, color: '#0E7490', flex: 1 }}>
                Formulary data is based on detected insurance. Tier 3 & 4 drugs require PA.
              </Text>
            </View>
          </Card>

          {FORMULARY.map((drug) => {
            const isSelected = selected === drug.id;
            return (
              <TouchableOpacity
                key={drug.id}
                onPress={() => handleSelect(drug.id, drug.name)}
                style={{
                  backgroundColor: isSelected ? Colors.navy : Colors.white,
                  borderRadius: 16,
                  padding: 16,
                  borderWidth: isSelected ? 2 : 1,
                  borderColor: isSelected ? Colors.primary : Colors.border,
                }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: '700', color: isSelected ? Colors.white : Colors.textPrimary, marginBottom: 4 }}>
                      {drug.name}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <View style={{ backgroundColor: drug.color + '20', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 }}>
                        <Text style={{ fontSize: 11, fontWeight: '700', color: drug.color }}>{drug.tier}</Text>
                      </View>
                      {drug.pa && (
                        <View style={{ backgroundColor: Colors.warningLight, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 }}>
                          <Text style={{ fontSize: 11, fontWeight: '700', color: '#92400E' }}>PA Required</Text>
                        </View>
                      )}
                    </View>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{ fontSize: 16, fontWeight: '800', color: isSelected ? Colors.teal : Colors.primary }}>{drug.price}</Text>
                    <Text style={{ fontSize: 11, color: isSelected ? 'rgba(255,255,255,0.5)' : Colors.muted }}>est. cost</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={{ paddingHorizontal: 20, paddingBottom: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: Colors.border, backgroundColor: Colors.white }}>
          <TouchableOpacity
            onPress={() => router.push('/(app)/pa/step-therapy')}
            disabled={!selected}
            style={{ backgroundColor: selected ? Colors.primary : Colors.border, borderRadius: 16, paddingVertical: 17, alignItems: 'center' }}
          >
            <Text style={{ color: selected ? Colors.white : Colors.muted, fontSize: 17, fontWeight: '700' }}>Continue</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
