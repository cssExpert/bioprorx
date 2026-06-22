import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { loginSchema, LoginForm } from '@/src/utils/validation';
import { useAuthStore } from '@/src/stores/authStore';
import Logo from '@/components/common/Logo';
import Icon from '@/components/common/Icon';
import Input from '@/components/ui/Input';
import PasswordInput from '@/components/ui/PasswordInput';
import Button from '@/components/ui/Button';
import Heading from '@/components/ui/Heading';
import SocialButton from '@/components/ui/SocialButton';
import AuthFooter from '@/components/ui/AuthFooter';
import ScreenShades from '@/components/common/ScreenShades';
import { Font } from '@/src/constants/typography';
import { Colors } from '@/src/constants/colors';
import { FontSize, LineHeight } from '@/src/constants/mixins';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      setLoading(true);
      await login(data);
      router.replace('/(app)/setup/welcome');
    } catch {
      Alert.alert('Sign In Failed', 'Invalid email or password. Please try again.');
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
              <Logo marginTop={20} />

              <Heading
                title="Welcome !"
                subtitle="Sign In to your account"
                size="md"
                marginTop={36}
                marginBottom={28}
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

              {/* Password */}
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <PasswordInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.password?.message}
                    marginTop={20}
                  />
                )}
              />

              {/* Forgot password */}
              <TouchableOpacity
                onPress={() => router.push('/(auth)/forgot-password')}
                style={{ alignSelf: 'flex-end', marginTop: 10 }}
              >
                <Text
                  style={{
                    fontSize: FontSize.base,
                    fontFamily: Font.bodySemiBold,
                    color: Colors.textSecondary,
                  }}
                >
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              {/* Primary CTA */}
              <Button
                label="Send Verification Code"
                onPress={handleSubmit(onSubmit)}
                loading={loading}
                loadingLabel="Sending…"
                marginTop={20}
              />

              {/* Sign up link */}
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: FontSize.md,
                  fontFamily: Font.body,
                  color: Colors.textSecondary,
                  marginTop: 20,
                }}
              >
                Don&rsquo;t have an account?{' '}
                <Text
                  onPress={() => router.push('/(auth)/signup-options')}
                  style={{ fontFamily: Font.bodyBold, color: Colors.textPrimary }}
                >
                  Sign Up
                </Text>
              </Text>

              {/* Divider */}
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 14, marginVertical: 22 }}
              >
                <View style={{ flex: 1, height: 1, backgroundColor: Colors.divider }} />
                <Text style={{ fontSize: FontSize.base, fontFamily: Font.body, color: Colors.textMuted }}>
                  Or Continue with
                </Text>
                <View style={{ flex: 1, height: 1, backgroundColor: Colors.divider }} />
              </View>

              {/* SSO buttons */}
              <SocialButton iconName="GoogleIcon" label="Continue with Google" />
              <SocialButton iconName="AppleIcon" label="Continue with Apple" marginTop={14} />

              {/* HIPAA */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 7,
                  marginTop: 24,
                  marginBottom: 8,
                }}
              >
                <Icon name="ShieldIcon2" size="16" viewBox="0 0 24 24" />
                <Text style={{ fontSize: FontSize.sm, fontFamily: Font.body, color: Colors.textMuted }}>
                  HIPAA Compliant &amp; Secure
                </Text>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
          <AuthFooter />
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}
