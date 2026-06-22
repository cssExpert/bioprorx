import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from '@/components/common/Logo';
import Icon from '@/components/common/Icon';
import SocialButton from '@/components/ui/SocialButton';
import AuthFooter from '@/components/ui/AuthFooter';
import ScreenShades from '@/components/common/ScreenShades';
import { Font } from '@/src/constants/typography';
import { Colors } from '@/src/constants/colors';
import { FontSize } from '@/src/constants/mixins';

export default function SignupOptionsScreen() {
  const router = useRouter();

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
          <View style={{ flex: 1, paddingHorizontal: 24 }}>
            {/* Brand */}
            <Logo marginTop={20} />

            {/* Heading */}
            <Text
              style={{
                fontSize: FontSize.h1,
                fontFamily: Font.heading,
                color: Colors.textPrimary,
                marginTop: 36,
                lineHeight: 36,
              }}
            >
              Sign Up
            </Text>
            <Text
              style={{
                fontSize: FontSize.md,
                fontFamily: Font.body,
                color: Colors.textMuted,
                marginTop: 6,
                marginBottom: 28,
              }}
            >
              Sign Up to your account
            </Text>

            <SocialButton iconName="GoogleIcon" label="Continue with Google" />
            <SocialButton iconName="AppleIcon" label="Continue with Apple" marginTop={12} />

            {/* Divider */}
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 20 }}
            >
              <View style={{ flex: 1, height: 1, backgroundColor: Colors.divider }} />
              <Text style={{ fontSize: FontSize.md, fontFamily: Font.body, color: Colors.textMuted }}>
                Or Continue with
              </Text>
              <View style={{ flex: 1, height: 1, backgroundColor: Colors.divider }} />
            </View>

            <SocialButton
              iconName="MailIcon"
              iconSize="20"
              iconOpacity="0.6"
              label="Sign up with Email"
              onPress={() => router.push('/(auth)/signup')}
            />

            {/* Sign In link */}
            <Text
              style={{
                textAlign: 'center',
                fontSize: FontSize.md,
                fontFamily: Font.body,
                color: Colors.textSecondary,
                marginTop: 20,
              }}
            >
              Have an account?{' '}
              <Text
                onPress={() => router.push('/(auth)/login')}
                style={{ fontFamily: Font.bodyBold, color: Colors.textPrimary }}
              >
                Sign In
              </Text>
            </Text>

            {/* Top spacer */}
            <View style={{ flex: 1 }} />

            {/* HIPAA — centered in remaining space */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 7,
              }}
            >
              <Icon name="ShieldIcon2" size="16" viewBox="0 0 24 24" />
              <Text style={{ fontSize: FontSize.sm, fontFamily: Font.body, color: Colors.textMuted }}>
                HIPAA Compliant &amp; Secure
              </Text>
            </View>

            {/* Bottom spacer */}
            <View style={{ flex: 1 }} />
          </View>

          <AuthFooter />
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}
