import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../src/constants/colors';
import { Input } from '../../../src/components/ui/Input';
import { Header } from '../../../src/components/ui/Header';
import { useAuthStore } from '../../../src/stores/authStore';
import ScreenShades from '@/components/common/ScreenShades';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, updateUser } = useAuthStore();
  const [firstName, setFirstName] = useState(user?.firstName ?? '');
  const [lastName, setLastName] = useState(user?.lastName ?? '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    updateUser({ firstName, lastName });
    setLoading(false);
    Alert.alert('Saved', 'Profile updated successfully.');
  };

  return (
        <View style={{ flex: 1 }}>
      <ScreenShades />
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.surface }} edges={['top', 'bottom']}>
        <Header title="Profile & License" showBack />
        <ScrollView contentContainerStyle={{ padding: 20, gap: 16 }}>
          <View style={{ alignItems: 'center', paddingVertical: 20 }}>
            <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <Text style={{ fontSize: 32, fontWeight: '700', color: Colors.white }}>{(firstName[0] ?? 'D').toUpperCase()}</Text>
            </View>
            <TouchableOpacity><Text style={{ color: Colors.primary, fontWeight: '600' }}>Change Photo</Text></TouchableOpacity>
          </View>
          <Input label="First Name" value={firstName} onChangeText={setFirstName} autoCapitalize="words" />
          <Input label="Last Name" value={lastName} onChangeText={setLastName} autoCapitalize="words" />
          <Input label="Email" value={user?.email ?? ''} editable={false} />
          <Input label="NPI Number" value={user?.npi ?? ''} editable={false} hint="Contact support to update your NPI" />
          <Input label="Medical License" placeholder="License number" />
          <TouchableOpacity
            onPress={handleSave}
            disabled={loading}
            style={{ backgroundColor: Colors.primary, borderRadius: 16, paddingVertical: 17, alignItems: 'center', marginTop: 8 }}
          >
            <Text style={{ color: Colors.white, fontSize: 17, fontWeight: '700' }}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
