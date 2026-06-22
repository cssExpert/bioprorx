import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../src/constants/colors';
import { Card } from '../../../src/components/ui/Card';
import { Input } from '../../../src/components/ui/Input';
import ScreenShades from '@/components/common/ScreenShades';

const INVENTORY = [
  { id: '1', name: 'Humira 40mg/0.4mL', lot: 'LOT2024A', expiry: '2025-06', qty: 12, unit: 'Pen' },
  { id: '2', name: 'Enbrel 50mg/mL', lot: 'LOT2024B', expiry: '2025-03', qty: 6, unit: 'Syringe' },
  { id: '3', name: 'Stelara 90mg/mL', lot: 'LOT2024C', expiry: '2025-08', qty: 4, unit: 'Vial' },
];

export default function IODScreen() {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [qty, setQty] = useState('1');

  return (
    <View style={{ flex: 1 }}>
      <ScreenShades />
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.surface }} edges={['top', 'bottom']}>
        <View style={{ backgroundColor: Colors.white, paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: Colors.border }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <TouchableOpacity onPress={() => router.back()} style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.surface, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 18 }}>←</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 17, fontWeight: '700', color: Colors.textPrimary }}>In-Office Dispensing</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={{ padding: 16, gap: 14 }}>
          <Card elevated style={{ backgroundColor: Colors.infoLight }}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Text style={{ fontSize: 18 }}>🏥</Text>
              <Text style={{ fontSize: 13, color: '#0E7490', flex: 1 }}>
                Select medication from your in-office inventory to dispense today.
              </Text>
            </View>
          </Card>

          <Text style={{ fontSize: 15, fontWeight: '700', color: Colors.textPrimary }}>Office Inventory</Text>

          {INVENTORY.map((item) => {
            const isSelected = selectedItem === item.id;
            const isLow = item.qty <= 5;
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => setSelectedItem(item.id)}
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
                    <Text style={{ fontSize: 12, color: isSelected ? 'rgba(255,255,255,0.6)' : Colors.muted }}>
                      LOT: {item.lot} · Exp: {item.expiry}
                    </Text>
                  </View>
                  <View style={{ alignItems: 'flex-end', gap: 4 }}>
                    <Text style={{ fontSize: 16, fontWeight: '800', color: isSelected ? Colors.teal : isLow ? Colors.error : Colors.success }}>
                      {item.qty} {item.unit}s
                    </Text>
                    {isLow && (
                      <View style={{ backgroundColor: Colors.errorLight, borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 }}>
                        <Text style={{ fontSize: 10, fontWeight: '700', color: Colors.error }}>LOW STOCK</Text>
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}

          {selectedItem && (
            <Card elevated>
              <Text style={{ fontSize: 15, fontWeight: '700', color: Colors.textPrimary, marginBottom: 12 }}>Dispense Details</Text>
              <Input label="Quantity to Dispense" keyboardType="numeric" value={qty} onChangeText={setQty} />
              <Input label="Administration Site" placeholder="e.g., Left deltoid" />
              <Input label="Lot Number Confirmation" value={INVENTORY.find((i) => i.id === selectedItem)?.lot ?? ''} editable={false} />
            </Card>
          )}
        </ScrollView>

        <View style={{ paddingHorizontal: 20, paddingBottom: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: Colors.border, backgroundColor: Colors.white }}>
          <TouchableOpacity
            onPress={() => router.push('/(app)/pa/confirmation')}
            disabled={!selectedItem}
            style={{ backgroundColor: selectedItem ? Colors.primary : Colors.border, borderRadius: 16, paddingVertical: 17, alignItems: 'center' }}
          >
            <Text style={{ color: selectedItem ? Colors.white : Colors.muted, fontSize: 17, fontWeight: '700' }}>Confirm Dispensing</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
