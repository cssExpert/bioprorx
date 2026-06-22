import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/src/constants/colors';
import { Input } from '@/src/components/ui/Input';
import { Card } from '@/src/components/ui/Card';
import ScreenShades from '@/components/common/ScreenShades';

export default function VerificationScreen() {
  const router = useRouter();
  const [npi, setNpi] = useState('');
  const [licenseState, setLicenseState] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = () => {
    if (!npi || npi.length !== 10) {
      Alert.alert('Invalid NPI', 'Please enter your 10-digit NPI number.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/(app)/setup/eprescribing');
    }, 2000);
  };

  return (
        <View style={{ flex: 1 }}>
      <ScreenShades />
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.surface }} edges={['top', 'bottom']}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}>
          <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 16, marginBottom: 8 }}>
            <Text style={{ fontSize: 24, color: Colors.textSecondary }}>←</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', gap: 6, marginBottom: 20 }}>
            {[1, 2, 3, 4].map((step) => (
              <View
                key={step}
                style={{
                  flex: 1,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: step <= 4 ? Colors.primary : Colors.border,
                }}
              />
            ))}
          </View>

          <Text style={{ fontSize: 12, color: Colors.muted, marginBottom: 8 }}>
            Step 4 of 4 — Identity Verification
          </Text>
          <Text
            style={{ fontSize: 26, fontWeight: '800', color: Colors.textPrimary, marginBottom: 8 }}
          >
            Verify Your Identity
          </Text>
          <Text style={{ fontSize: 14, color: Colors.textMuted, lineHeight: 20, marginBottom: 28 }}>
            We use the NPI Registry to verify your credentials. This is required for HIPAA compliance.
          </Text>

          <Card elevated style={{ marginBottom: 20, backgroundColor: Colors.infoLight }}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Text style={{ fontSize: 20 }}>ℹ️</Text>
              <Text style={{ fontSize: 13, color: '#0E7490', flex: 1, lineHeight: 18 }}>
                Your NPI will be verified against the NPPES registry in real-time. License info is
                used for controlled substance prescribing.
              </Text>
            </View>
          </Card>

          <Input
            label="NPI Number"
            placeholder="Enter 10-digit NPI"
            keyboardType="numeric"
            maxLength={10}
            value={npi}
            onChangeText={setNpi}
            hint="Found on your CMS Provider Enrollment & Certification page"
          />

          <Input
            label="License State"
            placeholder="e.g., CA, NY, TX"
            maxLength={2}
            autoCapitalize="characters"
            value={licenseState}
            onChangeText={setLicenseState}
          />

          <Input
            label="Medical License Number"
            placeholder="State license number"
            value={licenseNumber}
            onChangeText={setLicenseNumber}
          />

          <Card elevated style={{ marginBottom: 32 }}>
            <Text
              style={{ fontSize: 14, fontWeight: '700', color: Colors.textPrimary, marginBottom: 8 }}
            >
              We verify:
            </Text>
            {[
              'NPI Registry match',
              'Active license status',
              'DEA registration (if applicable)',
              'Board certification',
            ].map((item) => (
              <View key={item} style={{ flexDirection: 'row', gap: 8, marginBottom: 6 }}>
                <Text style={{ color: Colors.success }}>✓</Text>
                <Text style={{ fontSize: 13, color: Colors.textSecondary }}>{item}</Text>
              </View>
            ))}
          </Card>
        </ScrollView>

        <View
          style={{
            paddingHorizontal: 20,
            paddingBottom: 16,
            paddingTop: 12,
            borderTopWidth: 1,
            borderTopColor: Colors.border,
            backgroundColor: Colors.white,
          }}
        >
          <TouchableOpacity
            onPress={handleVerify}
            disabled={loading}
            style={{
              backgroundColor: Colors.primary,
              borderRadius: 16,
              paddingVertical: 17,
              alignItems: 'center',
              opacity: loading ? 0.7 : 1,
            }}
          >
            <Text style={{ color: Colors.white, fontSize: 17, fontWeight: '700' }}>
              {loading ? 'Verifying...' : 'Verify & Continue'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
