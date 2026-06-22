import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, SpecialtyColors } from '../../../src/constants/colors';
import { SPECIALTIES } from '../../../src/constants/specialties';
import { Header } from '../../../src/components/ui/Header';
import { useAppStore } from '../../../src/stores/appStore';
import ScreenShades from '@/components/common/ScreenShades';

export default function SpecialtySettingsScreen() {
  const router = useRouter();
  const { selectedSpecialties, toggleSpecialty } = useAppStore();

  return (
    <View style={{ flex: 1 }}>
      <ScreenShades />
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.surface }} edges={['top', 'bottom']}>
        <Header title="Specialties" showBack />
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <Text style={{ fontSize: 14, color: Colors.textMuted, marginBottom: 16 }}>
            Select up to 3 specialties. Your first selection is your primary specialty.
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
            {SPECIALTIES.map((spec) => {
              const isSelected = selectedSpecialties.includes(spec.id);
              const color = SpecialtyColors[spec.id] ?? Colors.primary;
              return (
                <TouchableOpacity
                  key={spec.id}
                  onPress={() => toggleSpecialty(spec.id)}
                  style={{
                    width: '46%',
                    backgroundColor: isSelected ? color + '15' : Colors.white,
                    borderRadius: 14,
                    padding: 14,
                    borderWidth: isSelected ? 2 : 1,
                    borderColor: isSelected ? color : Colors.border,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontSize: 28, marginBottom: 6 }}>{spec.icon}</Text>
                  <Text style={{ fontSize: 13, fontWeight: '700', color: isSelected ? color : Colors.textPrimary, textAlign: 'center' }}>{spec.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ backgroundColor: Colors.primary, borderRadius: 16, paddingVertical: 17, alignItems: 'center', marginTop: 24 }}
          >
            <Text style={{ color: Colors.white, fontSize: 17, fontWeight: '700' }}>Save Specialties</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
