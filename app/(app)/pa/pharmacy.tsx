import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../src/constants/colors';
import { Card } from '../../../src/components/ui/Card';
import ScreenShades from '@/components/common/ScreenShades';

const PHARMACIES = [
  { id: '1', name: 'Accredo Specialty Pharmacy', type: 'Specialty', distance: '0.3 mi', phone: '800-803-2523', inNetwork: true },
  { id: '2', name: 'CVS Specialty', type: 'Specialty', distance: '1.2 mi', phone: '800-237-2767', inNetwork: true },
  { id: '3', name: 'Walgreens Specialty', type: 'Specialty', distance: '2.4 mi', phone: '800-424-6061', inNetwork: false },
  { id: '4', name: 'BioPlus Specialty', type: 'Specialty', distance: '5.1 mi', phone: '888-514-8372', inNetwork: true },
  { id: '5', name: 'Optum Specialty Pharmacy', type: 'Specialty', distance: '6.8 mi', phone: '855-427-4682', inNetwork: true },
];

export default function PharmacyScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = PHARMACIES.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <View style={{ flex: 1 }}>
      <ScreenShades />
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.surface }} edges={['top', 'bottom']}>
        <View style={{ backgroundColor: Colors.white, paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: Colors.border }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <TouchableOpacity onPress={() => router.back()} style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.surface, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 18 }}>←</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 17, fontWeight: '700', color: Colors.textPrimary }}>Pharmacy Directory</Text>
          </View>
          <View style={{ backgroundColor: Colors.surface, borderRadius: 12, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, borderWidth: 1, borderColor: Colors.border }}>
            <Text style={{ fontSize: 16, marginRight: 8 }}>🔍</Text>
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search specialty pharmacies..."
              placeholderTextColor={Colors.muted}
              style={{ flex: 1, paddingVertical: 12, fontSize: 14, color: Colors.textPrimary }}
            />
          </View>
        </View>

        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, gap: 10 }}
          renderItem={({ item }) => {
            const isSelected = selected === item.id;
            return (
              <TouchableOpacity
                onPress={() => setSelected(item.id)}
                style={{
                  backgroundColor: isSelected ? Colors.navy : Colors.white,
                  borderRadius: 14,
                  padding: 16,
                  borderWidth: isSelected ? 2 : 1,
                  borderColor: isSelected ? Colors.primary : Colors.border,
                }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 15, fontWeight: '700', color: isSelected ? Colors.white : Colors.textPrimary, marginBottom: 4 }}>{item.name}</Text>
                    <Text style={{ fontSize: 13, color: isSelected ? 'rgba(255,255,255,0.6)' : Colors.muted, marginBottom: 8 }}>{item.type} · {item.distance}</Text>
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                      <View style={{ backgroundColor: item.inNetwork ? Colors.successLight : Colors.errorLight, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 }}>
                        <Text style={{ fontSize: 11, fontWeight: '700', color: item.inNetwork ? '#15803D' : Colors.error }}>
                          {item.inNetwork ? '✓ In-Network' : 'Out-of-Network'}
                        </Text>
                      </View>
                    </View>
                  </View>
                  {isSelected && <Text style={{ color: Colors.teal, fontSize: 22 }}>✓</Text>}
                </View>
              </TouchableOpacity>
            );
          }}
        />

        <View style={{ paddingHorizontal: 20, paddingBottom: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: Colors.border, backgroundColor: Colors.white }}>
          <TouchableOpacity
            onPress={() => router.push('/(app)/pa/confirmation')}
            disabled={!selected}
            style={{ backgroundColor: selected ? Colors.primary : Colors.border, borderRadius: 16, paddingVertical: 17, alignItems: 'center' }}
          >
            <Text style={{ color: selected ? Colors.white : Colors.muted, fontSize: 17, fontWeight: '700' }}>Send to Pharmacy</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
