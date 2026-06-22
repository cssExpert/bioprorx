import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../src/constants/colors';
import { Input } from '../../../src/components/ui/Input';
import { Header } from '../../../src/components/ui/Header';
import ScreenShades from '@/components/common/ScreenShades';

export default function PasswordScreen() {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (next !== confirm) { Alert.alert('Mismatch', 'New passwords do not match.'); return; }
    if (next.length < 8) { Alert.alert('Too short', 'Password must be at least 8 characters.'); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    Alert.alert('Updated', 'Your password has been changed successfully.');
  };

  return (
        <View style={{ flex: 1 }}>
      <ScreenShades />
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.surface }} edges={['top', 'bottom']}>
        <Header title="Change Password" showBack />
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <Input label="Current Password" secureTextEntry secureToggle value={current} onChangeText={setCurrent} />
          <Input label="New Password" secureTextEntry secureToggle value={next} onChangeText={setNext} hint="Min. 8 chars, 1 uppercase, 1 number" />
          <Input label="Confirm New Password" secureTextEntry secureToggle value={confirm} onChangeText={setConfirm} />
          <TouchableOpacity
            onPress={handleSave}
            disabled={loading}
            style={{ backgroundColor: Colors.primary, borderRadius: 16, paddingVertical: 17, alignItems: 'center', marginTop: 8 }}
          >
            <Text style={{ color: Colors.white, fontSize: 17, fontWeight: '700' }}>
              {loading ? 'Updating...' : 'Update Password'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
