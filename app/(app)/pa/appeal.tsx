import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../src/constants/colors';
import { Card } from '../../../src/components/ui/Card';
import ScreenShades from '@/components/common/ScreenShades';

const APPEAL_TYPES = [
  { id: 'written', icon: '📄', title: 'Written Appeal', desc: 'Submit clinical documentation and appeal letter' },
  { id: 'peer', icon: '📞', title: 'Peer-to-Peer Review', desc: 'Request a call with the insurance medical director' },
  { id: 'external', icon: '⚖️', title: 'External Review', desc: 'Request independent medical review' },
];

export default function AppealScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!selected) { Alert.alert('Select Appeal Type', 'Please select how you want to appeal.'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Appeal Submitted', 'Your appeal has been filed. Expect a response within 72 hours.', [
        { text: 'OK', onPress: () => router.replace('/(app)/(tabs)/pa-board') },
      ]);
    }, 1500);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScreenShades />
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.surface }} edges={['top', 'bottom']}>
        <View style={{ backgroundColor: Colors.white, paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: Colors.border }}>
          <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 24, color: Colors.textSecondary }}>←</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.textPrimary }}>Denial & Appeal</Text>
          <Text style={{ fontSize: 14, color: Colors.textMuted, marginTop: 4 }}>PA-2024-003 · Enbrel 50mg · Lisa Martinez</Text>
        </View>

        <ScrollView contentContainerStyle={{ padding: 16, gap: 14 }}>
          {/* Denial notice */}
          <Card elevated style={{ backgroundColor: Colors.errorLight }}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Text style={{ fontSize: 20 }}>❌</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.error, marginBottom: 4 }}>PA Denied — UHC</Text>
                <Text style={{ fontSize: 13, color: '#991B1B' }}>
                  Reason: Step therapy criteria not met. Patient has not tried a preferred DMARD for sufficient duration.
                </Text>
              </View>
            </View>
          </Card>

          <Text style={{ fontSize: 15, fontWeight: '700', color: Colors.textPrimary }}>Select Appeal Method:</Text>

          {APPEAL_TYPES.map((type) => {
            const isSelected = selected === type.id;
            return (
              <TouchableOpacity
                key={type.id}
                onPress={() => setSelected(type.id)}
                style={{
                  backgroundColor: isSelected ? Colors.navy : Colors.white,
                  borderRadius: 16,
                  padding: 16,
                  borderWidth: isSelected ? 2 : 1,
                  borderColor: isSelected ? Colors.primary : Colors.border,
                  flexDirection: 'row',
                  gap: 14,
                  alignItems: 'center',
                }}
              >
                <View style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: isSelected ? Colors.primary : Colors.surface, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 22 }}>{type.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15, fontWeight: '700', color: isSelected ? Colors.white : Colors.textPrimary, marginBottom: 4 }}>{type.title}</Text>
                  <Text style={{ fontSize: 13, color: isSelected ? 'rgba(255,255,255,0.6)' : Colors.muted }}>{type.desc}</Text>
                </View>
                {isSelected && <Text style={{ color: Colors.teal, fontSize: 22 }}>✓</Text>}
              </TouchableOpacity>
            );
          })}

          <View>
            <Text style={{ fontSize: 13, fontWeight: '600', color: Colors.textSecondary, marginBottom: 8 }}>Clinical Justification</Text>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              placeholder="Provide clinical rationale for appeal. Include relevant lab values, disease activity scores, and treatment history..."
              multiline
              numberOfLines={6}
              style={{
                backgroundColor: Colors.white,
                borderRadius: 14,
                borderWidth: 1.5,
                borderColor: Colors.border,
                padding: 14,
                fontSize: 14,
                color: Colors.textPrimary,
                minHeight: 120,
                textAlignVertical: 'top',
              }}
              placeholderTextColor={Colors.muted}
            />
          </View>

          <View style={{ flexDirection: 'row', gap: 10 }}>
            {[{ icon: '📎', label: 'Attach Labs' }, { icon: '📋', label: 'Add Records' }].map((a) => (
              <TouchableOpacity key={a.label} style={{ flex: 1, backgroundColor: Colors.white, borderRadius: 12, paddingVertical: 14, alignItems: 'center', borderWidth: 1, borderColor: Colors.border, gap: 4 }}>
                <Text style={{ fontSize: 22 }}>{a.icon}</Text>
                <Text style={{ fontSize: 12, fontWeight: '600', color: Colors.textSecondary }}>{a.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View style={{ paddingHorizontal: 20, paddingBottom: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: Colors.border, backgroundColor: Colors.white }}>
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={loading}
            style={{ backgroundColor: Colors.error, borderRadius: 16, paddingVertical: 17, alignItems: 'center', opacity: loading ? 0.7 : 1 }}
          >
            <Text style={{ color: Colors.white, fontSize: 17, fontWeight: '700' }}>
              {loading ? 'Submitting Appeal...' : 'File Appeal'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
