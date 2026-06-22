import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../src/constants/colors';
import { Input } from '../../../src/components/ui/Input';
import { Header } from '../../../src/components/ui/Header';
import { addPatientSchema, AddPatientForm } from '../../../src/utils/validation';
import ScreenShades from '@/components/common/ScreenShades';

const GENDERS = ['male', 'female', 'other'] as const;

export default function AddPatientScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<AddPatientForm>({
    resolver: zodResolver(addPatientSchema),
    defaultValues: { firstName: '', lastName: '', dob: '', gender: 'female', mrn: '' },
  });

  const selectedGender = watch('gender');

  const onSubmit = async (data: AddPatientForm) => {
    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1000));
      Alert.alert('Success', 'Patient added successfully.', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch {
      Alert.alert('Error', 'Failed to add patient. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
        <View style={{ flex: 1 }}>
      <ScreenShades />
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.surface }} edges={['top', 'bottom']}>
        <Header title="Add Patient" showBack />
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }} keyboardShouldPersistTaps="handled">
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <View style={{ flex: 1 }}>
                <Controller
                  control={control}
                  name="firstName"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input label="First Name" placeholder="Jane" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.firstName?.message} autoCapitalize="words" />
                  )}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Controller
                  control={control}
                  name="lastName"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input label="Last Name" placeholder="Smith" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.lastName?.message} autoCapitalize="words" />
                  )}
                />
              </View>
            </View>

            <Controller
              control={control}
              name="dob"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input label="Date of Birth" placeholder="MM/DD/YYYY" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.dob?.message} keyboardType="numeric" />
              )}
            />

            {/* Gender selector */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 13, fontWeight: '600', color: Colors.textSecondary, marginBottom: 8 }}>Gender</Text>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                {GENDERS.map((g) => (
                  <TouchableOpacity
                    key={g}
                    onPress={() => setValue('gender', g)}
                    style={{
                      flex: 1,
                      paddingVertical: 12,
                      borderRadius: 12,
                      borderWidth: 1.5,
                      borderColor: selectedGender === g ? Colors.primary : Colors.border,
                      backgroundColor: selectedGender === g ? Colors.primary + '10' : Colors.white,
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ fontSize: 14, fontWeight: '700', color: selectedGender === g ? Colors.primary : Colors.muted, textTransform: 'capitalize' }}>
                      {g}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <Controller
              control={control}
              name="mrn"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input label="MRN (Medical Record Number)" placeholder="Enter MRN" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.mrn?.message} />
              )}
            />

            <Controller
              control={control}
              name="insuranceName"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input label="Insurance Payer (Optional)" placeholder="e.g., Aetna, BlueCross" value={value ?? ''} onChangeText={onChange} onBlur={onBlur} />
              )}
            />

            <Controller
              control={control}
              name="insuranceId"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input label="Member ID (Optional)" placeholder="Insurance member ID" value={value ?? ''} onChangeText={onChange} onBlur={onBlur} />
              )}
            />

            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input label="Phone (Optional)" placeholder="(555) 000-0000" keyboardType="phone-pad" value={value ?? ''} onChangeText={onChange} onBlur={onBlur} />
              )}
            />
          </ScrollView>

          <View style={{ paddingHorizontal: 20, paddingBottom: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: Colors.border, backgroundColor: Colors.white }}>
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
              style={{ backgroundColor: Colors.primary, borderRadius: 16, paddingVertical: 17, alignItems: 'center', opacity: loading ? 0.7 : 1 }}
            >
              <Text style={{ color: Colors.white, fontSize: 17, fontWeight: '700' }}>
                {loading ? 'Adding Patient...' : 'Add Patient'}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
