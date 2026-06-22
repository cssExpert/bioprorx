import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../../src/constants/colors';
import { useAppStore } from '../../../src/stores/appStore';
import ScreenShades from '@/components/common/ScreenShades';

const { width, height } = Dimensions.get('window');

export default function CardScanScreen() {
  const router = useRouter();
  const { setPAField } = useAppStore();
  const [scanned, setScanned] = useState(false);

  const handleSimulateScan = () => {
    setScanned(true);
    setPAField('insuranceCardUri', 'simulated://scan');
    setTimeout(() => {
      router.push('/(app)/pa/diagnosis');
    }, 1000);
  };

  const handleManualEntry = () => {
    setPAField('insuranceCardUri', 'manual');
    router.push('/(app)/pa/diagnosis');
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.navyDark }}>
      <ScreenShades />

      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        {/* Header */}
        <View style={{ paddingHorizontal: 20, paddingTop: 8, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' }}
          >
            <Text style={{ color: Colors.white, fontSize: 18 }}>←</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: '700', color: Colors.white }}>Scan Insurance Card</Text>
        </View>

        {/* PA Step progress */}
        <View style={{ paddingHorizontal: 20, paddingVertical: 14 }}>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            {['Scan', 'Dx', 'Tier', 'Step', 'Auth', 'Route'].map((s, i) => (
              <View key={s} style={{ flex: 1, height: 3, borderRadius: 1.5, backgroundColor: i === 0 ? Colors.teal : 'rgba(255,255,255,0.2)' }} />
            ))}
          </View>
          <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 6 }}>Step 1 of 6 · Insurance Capture</Text>
        </View>

        {/* Camera frame */}
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 }}>
          <View
            style={{
              width: width - 48,
              aspectRatio: 1.586,
              borderRadius: 18,
              backgroundColor: scanned ? Colors.success + '20' : 'rgba(255,255,255,0.05)',
              borderWidth: 2,
              borderColor: scanned ? Colors.success : Colors.teal,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Corner markers */}
            {[
              { top: 0, left: 0 },
              { top: 0, right: 0 },
              { bottom: 0, left: 0 },
              { bottom: 0, right: 0 },
            ].map((pos, i) => (
              <View
                key={i}
                style={{
                  position: 'absolute',
                  width: 28,
                  height: 28,
                  borderColor: scanned ? Colors.success : Colors.teal,
                  borderTopWidth: pos.top === 0 ? 3 : 0,
                  borderLeftWidth: pos.left === 0 ? 3 : 0,
                  borderBottomWidth: pos.bottom === 0 ? 3 : 0,
                  borderRightWidth: pos.right === 0 ? 3 : 0,
                  ...pos,
                }}
              />
            ))}

            {scanned ? (
              <View style={{ alignItems: 'center', gap: 8 }}>
                <Text style={{ fontSize: 48 }}>✅</Text>
                <Text style={{ color: Colors.success, fontWeight: '700', fontSize: 16 }}>Card Detected</Text>
              </View>
            ) : (
              <View style={{ alignItems: 'center', gap: 12 }}>
                <Text style={{ fontSize: 48 }}>🃏</Text>
                <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, textAlign: 'center' }}>
                  Position insurance card{'\n'}within the frame
                </Text>
              </View>
            )}
          </View>

          <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, marginTop: 20, textAlign: 'center' }}>
            Camera will auto-capture when card is detected
          </Text>
        </View>

        {/* Bottom actions */}
        <View style={{ paddingHorizontal: 24, paddingBottom: 16, gap: 12 }}>
          <TouchableOpacity
            onPress={handleSimulateScan}
            style={{
              backgroundColor: Colors.teal,
              borderRadius: 16,
              paddingVertical: 17,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: Colors.white, fontSize: 17, fontWeight: '700' }}>
              {scanned ? 'Processing...' : 'Simulate Card Scan'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleManualEntry} style={{ alignItems: 'center', paddingVertical: 12 }}>
            <Text style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14 }}>
              Enter Insurance Info Manually
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
