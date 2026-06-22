import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../src/constants/colors';
import { Card } from '../../../src/components/ui/Card';
import { useAppStore } from '../../../src/stores/appStore';
import ScreenShades from '@/components/common/ScreenShades';

const STEPS = [
  { id: 's1', drug: 'Methotrexate', duration: '≥ 3 months', required: true, completed: false, label: 'DMARD therapy' },
  { id: 's2', drug: 'Hydroxychloroquine', duration: '≥ 3 months', required: false, completed: false, label: 'Antimalarial (optional)' },
  { id: 's3', drug: 'Sulfasalazine', duration: '≥ 3 months', required: false, completed: false, label: 'DMARD combination (optional)' },
  { id: 's4', drug: 'Leflunomide', duration: '≥ 3 months', required: false, completed: false, label: 'Alternative DMARD (if MTX intolerant)' },
];

export default function StepTherapyScreen() {
  const router = useRouter();
  const { setPAField } = useAppStore();
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const toggleStep = (id: string) => {
    const next = new Set(completed);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setCompleted(next);
  };

  const canContinue = STEPS.filter((s) => s.required).every((s) => completed.has(s.id));

  const handleContinue = () => {
    setPAField('stepTherapyComplete', true);
    router.push('/(app)/pa/auth-generator');
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
            <Text style={{ fontSize: 17, fontWeight: '700', color: Colors.textPrimary }}>Step Therapy</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            {['Scan', 'Dx', 'Tier', 'Step', 'Auth', 'Route'].map((s, i) => (
              <View key={s} style={{ flex: 1, height: 3, borderRadius: 1.5, backgroundColor: i <= 3 ? Colors.primary : Colors.border }} />
            ))}
          </View>
          <Text style={{ color: Colors.muted, fontSize: 12, marginTop: 6 }}>Step 4 of 6 · Protocol Compliance</Text>
        </View>

        <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
          <Card elevated style={{ backgroundColor: Colors.warningLight }}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Text style={{ fontSize: 18 }}>📋</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: '700', color: '#92400E', marginBottom: 4 }}>Step Therapy Required</Text>
                <Text style={{ fontSize: 13, color: '#92400E' }}>
                  The selected insurance requires documentation of conventional DMARD therapy before approving biologics.
                </Text>
              </View>
            </View>
          </Card>

          <Text style={{ fontSize: 15, fontWeight: '700', color: Colors.textPrimary, paddingHorizontal: 4 }}>
            Mark therapies tried:
          </Text>

          {STEPS.map((step) => {
            const isDone = completed.has(step.id);
            return (
              <TouchableOpacity
                key={step.id}
                onPress={() => toggleStep(step.id)}
                style={{
                  backgroundColor: isDone ? Colors.successLight : Colors.white,
                  borderRadius: 14,
                  padding: 16,
                  borderWidth: isDone ? 2 : 1,
                  borderColor: isDone ? Colors.success : Colors.border,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 14,
                }}
              >
                <View
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 13,
                    borderWidth: 2,
                    borderColor: isDone ? Colors.success : Colors.border,
                    backgroundColor: isDone ? Colors.success : 'transparent',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {isDone && <Text style={{ color: Colors.white, fontSize: 14, fontWeight: '700' }}>✓</Text>}
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                    <Text style={{ fontSize: 15, fontWeight: '700', color: isDone ? '#166534' : Colors.textPrimary }}>{step.drug}</Text>
                    {step.required && (
                      <View style={{ backgroundColor: Colors.errorLight, borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 }}>
                        <Text style={{ fontSize: 10, fontWeight: '700', color: Colors.error }}>REQUIRED</Text>
                      </View>
                    )}
                  </View>
                  <Text style={{ fontSize: 12, color: isDone ? '#166534' : Colors.muted }}>
                    {step.label} · {step.duration}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}

          {!canContinue && (
            <Card elevated style={{ backgroundColor: Colors.errorLight }}>
              <Text style={{ fontSize: 13, color: Colors.error, fontWeight: '600' }}>
                Please document at least the required DMARD therapy to proceed.
              </Text>
            </Card>
          )}
        </ScrollView>

        <View style={{ paddingHorizontal: 20, paddingBottom: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: Colors.border, backgroundColor: Colors.white }}>
          <TouchableOpacity
            onPress={handleContinue}
            disabled={!canContinue}
            style={{ backgroundColor: canContinue ? Colors.primary : Colors.border, borderRadius: 16, paddingVertical: 17, alignItems: 'center' }}
          >
            <Text style={{ color: canContinue ? Colors.white : Colors.muted, fontSize: 17, fontWeight: '700' }}>Continue to PA Generation</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
