import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from '@/components/common/Logo';
import Heading from '@/components/ui/Heading';
import OTPInput from '@/components/ui/OTPInput';
import Button from '@/components/ui/Button';
import AuthFooter from '@/components/ui/AuthFooter';
import ScreenShades from '@/components/common/ScreenShades';
import { Font } from '@/src/constants/typography';
import { Colors } from '@/src/constants/colors';
import { FontSize } from '@/src/constants/mixins';

const RESEND_SECONDS = 70;

function maskEmail(email: string) {
  const [user, domain] = email.split('@');
  if (!domain) return email;
  const masked = user.slice(0, 1) + '****';
  return `${masked}@${domain}`;
}

export default function VerifyScreen() {
  const router = useRouter();
  const { email = 'p****@hospital.com' } = useLocalSearchParams<{ email: string }>();

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(RESEND_SECONDS);

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const handleVerify = async () => {
    if (code.length < 6) {
      Alert.alert('Enter Code', 'Please enter the complete 6-digit verification code.');
      return;
    }
    try {
      setLoading(true);
      // await authService.verifyCode(email, code);
      router.replace('/(app)/setup/welcome');
    } catch {
      Alert.alert('Invalid Code', 'The code you entered is incorrect. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (seconds > 0) return;
    try {
      // await authService.resendCode(email);
      setSeconds(RESEND_SECONDS);
      setCode('');
      Alert.alert('Code Sent', 'A new verification code has been sent.');
    } catch {
      Alert.alert('Error', 'Unable to resend code. Please try again.');
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

              <View
                style={{ flex: 1, justifyContent: 'center', paddingTop: 40, paddingBottom: 24 }}
              >
                <Heading title="Verify Your Email" size="md" marginTop={0} marginBottom={4} />

                <Text
                  style={{
                    fontSize: FontSize.md,
                    fontFamily: Font.body,
                    color: Colors.textMuted,
                    lineHeight: 22,
                    marginBottom: 32,
                  }}
                >
                  We&apos;ve sent a 6-digit code to{'\n'}
                  <Text style={{ fontFamily: Font.bodyBold, color: Colors.textPrimary }}>
                    {maskEmail(email as string)}
                  </Text>
                </Text>

                {/* OTP label */}
                <Text
                  style={{
                    fontSize: FontSize.base,
                    fontFamily: Font.bodyMedium,
                    color: Colors.textLabel,
                    marginBottom: 14,
                  }}
                >
                  Enter Verification Code*
                </Text>

                <OTPInput value={code} onChange={setCode} />

                <Button
                  label="Verify"
                  onPress={handleVerify}
                  loading={loading}
                  loadingLabel="Verifying…"
                  marginTop={28}
                />

                {/* Back */}
                <TouchableOpacity
                  onPress={() => router.back()}
                  style={{ alignItems: 'center', marginTop: 18 }}
                >
                  <Text
                    style={{
                      fontSize: FontSize.md,
                      fontFamily: Font.bodyBold,
                      color: Colors.textPrimary,
                    }}
                  >
                    Back
                  </Text>
                </TouchableOpacity>

                {/* Resend */}
                <TouchableOpacity
                  onPress={handleResend}
                  disabled={seconds > 0}
                  style={{ alignItems: 'center', marginTop: 20 }}
                >
                  <Text
                    style={{
                      fontSize: FontSize.md,
                      fontFamily: Font.body,
                      color: Colors.textMuted,
                    }}
                  >
                    Didn&apos;t receive code?{' '}
                    <Text
                      style={{
                        fontFamily: Font.bodyBold,
                        color: seconds > 0 ? Colors.textMuted : Colors.textPrimary,
                      }}
                    >
                      {seconds > 0 ? `Resend in ${formatTime(seconds)}` : 'Resend'}
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
          <AuthFooter />
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}
