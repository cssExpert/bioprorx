import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, SpecialtyColors } from '../../../src/constants/colors';
import { useAppStore } from '../../../src/stores/appStore';
import ScreenShades from '@/components/common/ScreenShades';

const DIAGNOSES = [
  { code: 'M05.79', name: 'Rheumatoid Arthritis', specialty: 'rheumatology' },
  { code: 'M06.00', name: 'RA, Unspecified', specialty: 'rheumatology' },
  { code: 'M45.0', name: 'Ankylosing Spondylitis', specialty: 'rheumatology' },
  { code: 'M35.00', name: 'Lupus (SLE)', specialty: 'rheumatology' },
  { code: 'K50.90', name: "Crohn's Disease", specialty: 'gastroenterology' },
  { code: 'K51.90', name: 'Ulcerative Colitis', specialty: 'gastroenterology' },
  { code: 'L40.0', name: 'Plaque Psoriasis', specialty: 'dermatology' },
  { code: 'L40.50', name: 'Psoriatic Arthritis', specialty: 'dermatology' },
  { code: 'G35', name: 'Multiple Sclerosis', specialty: 'neurology' },
  { code: 'J45.50', name: 'Severe Asthma', specialty: 'pulmonology' },
  { code: 'E11.65', name: 'Type 2 Diabetes', specialty: 'endocrinology' },
];

export default function DiagnosisScreen() {
  const router = useRouter();
  const { setPAField } = useAppStore();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = DIAGNOSES.filter(
    (d) => d.name.toLowerCase().includes(search.toLowerCase()) || d.code.includes(search),
  );

  const handleSelect = (code: string) => {
    setSelected(code);
    setPAField('diagnosis', code);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScreenShades />
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.surface }} edges={['top', 'bottom']}>
        {/* Header */}
        <View style={{ backgroundColor: Colors.white, paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: Colors.border }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <TouchableOpacity onPress={() => router.back()} style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.surface, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 18 }}>←</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 17, fontWeight: '700', color: Colors.textPrimary }}>Select Diagnosis</Text>
              <View style={{ flexDirection: 'row', gap: 4, marginTop: 6 }}>
                {['Scan', 'Dx', 'Tier', 'Step', 'Auth', 'Route'].map((s, i) => (
                  <View key={s} style={{ flex: 1, height: 3, borderRadius: 1.5, backgroundColor: i <= 1 ? Colors.primary : Colors.border }} />
                ))}
              </View>
            </View>
          </View>
          <View style={{ backgroundColor: Colors.surface, borderRadius: 12, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, borderWidth: 1, borderColor: Colors.border }}>
            <Text style={{ fontSize: 16, marginRight: 8 }}>🔍</Text>
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search ICD-10 code or condition..."
              placeholderTextColor={Colors.muted}
              style={{ flex: 1, paddingVertical: 12, fontSize: 14, color: Colors.textPrimary }}
            />
          </View>
        </View>

        <FlatList
          data={filtered}
          keyExtractor={(item) => item.code}
          contentContainerStyle={{ padding: 12, gap: 8 }}
          renderItem={({ item }) => {
            const isSelected = selected === item.code;
            const color = SpecialtyColors[item.specialty] ?? Colors.primary;
            return (
              <TouchableOpacity
                onPress={() => handleSelect(item.code)}
                style={{
                  backgroundColor: isSelected ? Colors.primary : Colors.white,
                  borderRadius: 14,
                  padding: 16,
                  borderWidth: isSelected ? 2 : 1,
                  borderColor: isSelected ? Colors.primary : Colors.border,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 14,
                }}
              >
                <View style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: color + '15', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 12, fontWeight: '800', color }}>{item.code.split('.')[0]}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15, fontWeight: '700', color: isSelected ? Colors.white : Colors.textPrimary }}>{item.name}</Text>
                  <Text style={{ fontSize: 12, color: isSelected ? 'rgba(255,255,255,0.7)' : Colors.muted, marginTop: 2 }}>{item.code} · {item.specialty}</Text>
                </View>
                {isSelected && <Text style={{ color: Colors.white, fontSize: 18 }}>✓</Text>}
              </TouchableOpacity>
            );
          }}
        />

        <View style={{ paddingHorizontal: 20, paddingBottom: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: Colors.border, backgroundColor: Colors.white }}>
          <TouchableOpacity
            onPress={() => router.push('/(app)/pa/tier')}
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
