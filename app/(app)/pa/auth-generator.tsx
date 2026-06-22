import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../src/constants/colors';
import { Card } from '../../../src/components/ui/Card';
import { useAppStore } from '../../../src/stores/appStore';
import ScreenShades from '@/components/common/ScreenShades';

const GENERATED_PA = `PRIOR AUTHORIZATION REQUEST

Patient: Sarah Johnson
DOB: 03/12/1975 | MRN: MRN001

Requesting Provider: Dr. Smith, MD
NPI: 1234567890
Specialty: Rheumatology

Insurance: Aetna | Member ID: AET123456789
Group Number: GRP001

REQUESTED MEDICATION:
Humira (adalimumab) 40mg/0.4mL
Pen Syringe | Qty: 2 | Refills: 11

DIAGNOSIS:
Primary: M05.79 – Rheumatoid Arthritis

CLINICAL JUSTIFICATION:
Patient has failed adequate trials of:
• Methotrexate 15mg weekly × 6 months
• Hydroxychloroquine 400mg daily × 4 months

Disease Activity Score (DAS28): 5.8 (High)
RF Positive: Yes | Anti-CCP: Positive

Patient has active joint inflammation uncontrolled by conventional DMARDs. Biologic therapy is medically necessary per ACR guidelines.

SUPPORTING DOCUMENTATION:
☑ Lab results attached
☑ X-ray findings attached
☑ Prior treatment history attached`;

export default function AuthGeneratorScreen() {
  const router = useRouter();
  const [generating, setGenerating] = useState(true);
  const [text, setText] = useState('');
  const [mode, setMode] = useState<'form' | 'dictation'>('form');
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, { toValue: 1, duration: 2500, useNativeDriver: false }).start();
    let i = 0;
    const interval = setInterval(() => {
      if (i < GENERATED_PA.length) {
        setText(GENERATED_PA.slice(0, i + 3));
        i += 3;
      } else {
        clearInterval(interval);
        setGenerating(false);
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const progressWidth = progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  return (
        <View style={{ flex: 1 }}>
      <ScreenShades />
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.surface }} edges={['top', 'bottom']}>
        <View style={{ backgroundColor: Colors.white, paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: Colors.border }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <TouchableOpacity onPress={() => router.back()} style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.surface, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 18 }}>←</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 17, fontWeight: '700', color: Colors.textPrimary }}>PA Generator</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 4, marginBottom: 6 }}>
            {['Scan', 'Dx', 'Tier', 'Step', 'Auth', 'Route'].map((s, i) => (
              <View key={s} style={{ flex: 1, height: 3, borderRadius: 1.5, backgroundColor: i <= 4 ? Colors.primary : Colors.border }} />
            ))}
          </View>
          {generating && (
            <View style={{ height: 4, backgroundColor: Colors.border, borderRadius: 2, overflow: 'hidden' }}>
              <Animated.View style={{ height: '100%', width: progressWidth, backgroundColor: Colors.teal }} />
            </View>
          )}
        </View>

        {/* Mode toggle */}
        <View style={{ flexDirection: 'row', margin: 16, backgroundColor: Colors.border, borderRadius: 12, padding: 3 }}>
          {(['form', 'dictation'] as const).map((m) => (
            <TouchableOpacity
              key={m}
              onPress={() => setMode(m)}
              style={{ flex: 1, paddingVertical: 10, borderRadius: 10, backgroundColor: mode === m ? Colors.white : 'transparent', alignItems: 'center' }}
            >
              <Text style={{ fontWeight: '700', fontSize: 14, color: mode === m ? Colors.textPrimary : Colors.muted }}>
                {m === 'form' ? '📄 PA Form' : '🎙️ Dictation'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}>
          {generating ? (
            <Card elevated>
              <View style={{ flexDirection: 'row', gap: 10, marginBottom: 12 }}>
                <Text style={{ fontSize: 16 }}>⚡</Text>
                <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.primary }}>AI generating PA form...</Text>
              </View>
              <Text style={{ fontSize: 12, fontFamily: 'monospace', color: Colors.textSecondary, lineHeight: 18 }}>
                {text}
                <Text style={{ color: Colors.primary }}>|</Text>
              </Text>
            </Card>
          ) : (
            <>
              <Card elevated style={{ marginBottom: 12 }}>
                <View style={{ flexDirection: 'row', gap: 10, marginBottom: 12 }}>
                  <Text style={{ fontSize: 16 }}>✅</Text>
                  <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.success }}>PA Form Generated</Text>
                </View>
                <Text style={{ fontSize: 12, fontFamily: 'monospace', color: Colors.textSecondary, lineHeight: 18 }}>
                  {GENERATED_PA}
                </Text>
              </Card>

              <View style={{ flexDirection: 'row', gap: 10 }}>
                {[
                  { icon: '📎', label: 'Attach Lab Results' },
                  { icon: '📷', label: 'Add X-Ray' },
                  { icon: '✏️', label: 'Edit' },
                ].map((action) => (
                  <TouchableOpacity
                    key={action.label}
                    style={{ flex: 1, backgroundColor: Colors.white, borderRadius: 12, paddingVertical: 12, alignItems: 'center', borderWidth: 1, borderColor: Colors.border, gap: 4 }}
                  >
                    <Text style={{ fontSize: 20 }}>{action.icon}</Text>
                    <Text style={{ fontSize: 11, color: Colors.textSecondary, fontWeight: '600', textAlign: 'center' }}>{action.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}
        </ScrollView>

        <View style={{ paddingHorizontal: 20, paddingBottom: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: Colors.border, backgroundColor: Colors.white }}>
          <TouchableOpacity
            onPress={() => router.push('/(app)/pa/route')}
            disabled={generating}
            style={{ backgroundColor: generating ? Colors.border : Colors.primary, borderRadius: 16, paddingVertical: 17, alignItems: 'center' }}
          >
            <Text style={{ color: generating ? Colors.muted : Colors.white, fontSize: 17, fontWeight: '700' }}>
              {generating ? 'Generating...' : 'Submit & Route PA'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
