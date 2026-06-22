import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { forgotPasswordSchema, ForgotPasswordForm } from '@/src/utils/validation';
import { authService } from '@/src/services/authService';
import Logo from '@/components/common/Logo';
import Icon from '@/components/common/Icon';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Heading from '@/components/ui/Heading';
import AuthFooter from '@/components/ui/AuthFooter';
import ScreenShades from '@/components/common/ScreenShades';
import { Font } from '@/src/constants/typography';
import { Colors } from '@/src/constants/colors';
import { FontSize } from '@/src/constants/mixins';

export default function ForgotPasswordScreen() {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    try {
      setLoading(true);
      await authService.forgotPassword(data.email);
      Alert.alert('Email Sent', 'Check your inbox for password reset instructions.');
    } catch {
      Alert.alert('Error', 'Unable to send reset email. Please try again.');
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
              {/* Brand */}
              <Logo marginTop={18} />

              {/* Content */}
              <View
                style={{ flex: 1, justifyContent: 'center', paddingTop: 40, paddingBottom: 24 }}
              >
                <Heading
                  title="Forgot Password?"
                  subtitle="Enter your email to reset your password."
                  size="lg"
                  marginTop={0}
                  marginBottom={32}
                />

                {/* Email */}
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      label="Email Address"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="dr.chen@rheum.care"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      error={errors.email?.message}
                    />
                  )}
                />

                {/* Reset Button */}
                <Button
                  label="Reset Password"
                  onPress={handleSubmit(onSubmit)}
                  loading={loading}
                  loadingLabel="Sending…"
                  marginTop={20}
                />

                {/* HIPAA */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 7,
                    marginTop: 36,
                  }}
                >
                  <Icon name="ShieldIcon2" size="16" viewBox="0 0 24 24" />
                  <Text
                    style={{
                      fontSize: FontSize.base,
                      fontFamily: Font.body,
                      color: Colors.textMuted,
                    }}
                  >
                    HIPAA Compliant &amp; Secure
                  </Text>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
          <AuthFooter />
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}
