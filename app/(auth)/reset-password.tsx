import React, { useState } from 'react';
import {
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { z } from 'zod';
import Logo from '@/components/common/Logo';
import Heading from '@/components/ui/Heading';
import PasswordInput from '@/components/ui/PasswordInput';
import Button from '@/components/ui/Button';
import AuthFooter from '@/components/ui/AuthFooter';
import ScreenShades from '@/components/common/ScreenShades';
import { Colors } from '@/src/constants/colors';
import { authService } from '@/src/services/authService';

const schema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof schema>;

export default function ResetPasswordScreen() {
  const router = useRouter();
  const { code = '' } = useLocalSearchParams<{ code: string }>();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      await authService.resetPassword(code as string, data.password);
      Alert.alert('Password Reset', 'Your password has been updated successfully.', [
        { text: 'Sign In', onPress: () => router.replace('/(auth)/login') },
      ]);
    } catch {
      Alert.alert('Error', 'Invalid or expired code. Please request a new one.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.gradStart} />
      <LinearGradient
        colors={[Colors.gradStart, Colors.gradMid, Colors.gradEnd]}
        locations={[0, 0.45, 1]}
        style={{ flex: 1 }}
      >
        <ScreenShades />
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <ScrollView
              contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24 }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <Logo marginTop={18} />

              <View style={{ flex: 1, justifyContent: 'center', paddingTop: 40, paddingBottom: 24 }}>
                <Heading
                  title="Password Reset"
                  subtitle="Enter new password"
                  size="md"
                  marginTop={0}
                  marginBottom={28}
                />

                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <PasswordInput
                      label="Password"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={errors.password?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <PasswordInput
                      label="Confirm Password"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={errors.confirmPassword?.message}
                      marginTop={16}
                    />
                  )}
                />

                <Button
                  label="Verify"
                  onPress={handleSubmit(onSubmit)}
                  loading={loading}
                  loadingLabel="Resetting…"
                  marginTop={24}
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
          <AuthFooter />
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}
