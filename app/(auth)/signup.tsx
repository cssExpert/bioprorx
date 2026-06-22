import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Linking,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { signupSchema, SignupForm } from '@/src/utils/validation';
import { useAuthStore } from '@/src/stores/authStore';
import Logo from '@/components/common/Logo';
import Icon from '@/components/common/Icon';
import Input from '@/components/ui/Input';
import PasswordInput from '@/components/ui/PasswordInput';
import Dropdown from '@/components/ui/Dropdown';
import Checkbox from '@/components/ui/Checkbox';
import Button from '@/components/ui/Button';
import Heading from '@/components/ui/Heading';
import AuthFooter from '@/components/ui/AuthFooter';
import ScreenShades from '@/components/common/ScreenShades';
import { Font } from '@/src/constants/typography';
import { Colors } from '@/src/constants/colors';
import { FontSize, Radius } from '@/src/constants/mixins';

const PREFIX_OPTIONS = [
  { label: 'MD', value: 'MD' },
  { label: 'RM', value: 'RM' },
  { label: 'MS', value: 'MS' },
  { label: 'DM', value: 'DM' },
];

function CheckItem({ text }: { text: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 6 }}>
      <Icon name="CheckListIcon" size="14" viewBox="0 0 24 24" color={Colors.textPrimary} />
      <Text
        style={{
          flex: 1,
          fontSize: FontSize.base,
          fontFamily: Font.body,
          color: Colors.textSecondary,
          lineHeight: 18,
        }}
      >
        {text}
      </Text>
    </View>
  );
}

export default function SignupScreen() {
  const router = useRouter();
  const { signup } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      prefix: 'MD',
      legalName: '',
      email: '',
      npi: '',
      password: '',
      confirmPassword: '',
      hipaaAck1: false,
      hipaaAck2: false,
      termsAgreed: false,
    },
  });

  const onSubmit = async (data: SignupForm) => {
    try {
      setLoading(true);
      const nameParts = data.legalName.trim().split(' ');
      const firstName = nameParts[0] ?? '';
      const lastName = nameParts.slice(1).join(' ') || firstName;
      await signup({
        firstName,
        lastName,
        email: data.email,
        password: data.password,
        npi: data.npi,
        specialty: '',
      });
      router.replace('/(app)/setup/specialty');
    } catch {
      Alert.alert('Registration Failed', 'Please check your details and try again.');
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
              contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingBottom: 16 }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {/* Brand */}
              <Logo marginTop={18} />

              <Heading
                title="Sign Up"
                subtitle="Create your account to continue"
                size="md"
                marginTop={32}
                marginBottom={24}
              />

              {/* Prefix + Legal Name row */}
              <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16, zIndex: 100 }}>
                <View style={{ width: 100 }}>
                  <Controller
                    control={control}
                    name="prefix"
                    render={({ field: { value, onChange } }) => (
                      <Dropdown
                        label="Prefix"
                        value={value}
                        onChange={onChange}
                        options={PREFIX_OPTIONS}
                        error={errors.prefix?.message}
                      />
                    )}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Controller
                    control={control}
                    name="legalName"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        label="Legal Name"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder="Sara Steve Johnsons"
                        error={errors.legalName?.message}
                      />
                    )}
                  />
                </View>
              </View>

              {/* Email */}
              <Text
                style={{
                  fontSize: FontSize.base,
                  fontFamily: Font.bodyMedium,
                  color: Colors.textLabel,
                  marginBottom: 8,
                }}
              >
                Email Address{' '}
                <Text style={{ fontFamily: Font.body, color: Colors.textMuted }}>
                  (Linked to NPI ID)
                </Text>
              </Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="physician@hospital.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    error={errors.email?.message}
                  />
                )}
              />

              {/* NPI */}
              <Controller
                control={control}
                name="npi"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="NPI Number"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="1234567890"
                    keyboardType="numeric"
                    error={errors.npi?.message}
                    marginTop={16}
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
                    marginTop={16}
                  />
                )}
              />

              {/* Confirm Password */}
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <PasswordInput
                    label="Confirm Password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="••••••••"
                    error={errors.confirmPassword?.message}
                    marginTop={16}
                  />
                )}
              />

              {/* HIPAA Compliance */}
              <Text
                style={{
                  fontSize: FontSize.md,
                  fontFamily: Font.bodyBold,
                  color: Colors.textPrimary,
                  marginTop: 24,
                  marginBottom: 14,
                }}
              >
                HIPAA Compliance
              </Text>
              <View
                style={{
                  backgroundColor: Colors.white,
                  borderRadius: 14,
                  borderWidth: 1,
                  borderColor: Colors.fieldBorder,
                  padding: 16,
                  marginBottom: 16,
                }}
              >
                <CheckItem text="End-to-end encryption for all PHI" />
                <CheckItem text="Audit logs for all data access" />
                <CheckItem text="BAA agreements with vendors" />
              </View>

              <View
                style={{
                  backgroundColor: Colors.white,
                  borderRadius: Radius.md,
                  borderWidth: 1,
                  borderColor: Colors.fieldBorder,
                  padding: 16,
                  marginBottom: 16,
                }}
              >
                <Controller
                  control={control}
                  name="hipaaAck1"
                  render={({ field: { value, onChange } }) => (
                    <Checkbox
                      checked={value}
                      onChange={onChange}
                      label="I acknowledge responsibility for protecting PHI and will comply with all HIPAA privacy and security rules"
                      error={errors.hipaaAck1?.message}
                      marginTop={4}
                    />
                  )}
                />
              </View>
              <View
                style={{
                  backgroundColor: Colors.white,
                  borderRadius: Radius.md,
                  borderWidth: 1,
                  borderColor: Colors.fieldBorder,
                  padding: 16,
                  marginBottom: 16,
                }}
              >
                <Controller
                  control={control}
                  name="hipaaAck2"
                  render={({ field: { value, onChange } }) => (
                    <Checkbox
                      checked={value}
                      onChange={onChange}
                      label="I certify that all patient data entered will be obtained and shared with proper patient consent in accordance with applicable regulations."
                      error={errors.hipaaAck2?.message}
                      marginTop={14}
                    />
                  )}
                />
              </View>

              {/* DocuSign Info Box */}
              <View
                style={{
                  backgroundColor: `rgba(${Colors.infoBoxBgrgb}, 0.10)`,
                  borderRadius: Radius.lg,
                  borderLeftWidth: 4,
                  borderColor: Colors.infoBoxBorderDark,
                  padding: Radius.lg,
                  marginTop: Radius.lg,
                  marginBottom: Radius.lg,
                }}
              >
                <Text
                  style={{
                    fontSize: FontSize.base,
                    fontFamily: Font.body,
                    color: Colors.infoBoxText,
                    lineHeight: 20,
                  }}
                >
                  Before continuing, please review and sign the required agreement via DocuSign.
                </Text>
                <Text
                  style={{
                    fontSize: FontSize.base,
                    fontFamily: Font.body,
                    color: Colors.infoBoxText,
                    lineHeight: 20,
                    marginTop: 8,
                  }}
                >
                  This step is necessary to activate your account and ensure compliance.
                </Text>
                <Text
                  style={{
                    fontSize: FontSize.base,
                    fontFamily: Font.body,
                    color: Colors.infoBoxText,
                    lineHeight: 20,
                    marginTop: 8,
                  }}
                >
                  Click below to proceed:
                </Text>
                <Text
                  onPress={() => Linking.openURL('https://docusign.example.com/start-agreement')}
                  style={{
                    fontSize: FontSize.base,
                    fontFamily: Font.bodyMedium,
                    color: Colors.link,
                    lineHeight: 20,
                    marginTop: 4,
                    textDecorationLine: 'underline',
                  }}
                >
                  https://docusign.example.com/start-agreement
                </Text>
              </View>

              {/* Terms */}
              <Controller
                control={control}
                name="termsAgreed"
                render={({ field: { value, onChange } }) => (
                  <Checkbox
                    checked={value}
                    onChange={onChange}
                    label="I agree to the Terms of Service and Privacy Policy"
                    error={errors.termsAgreed?.message}
                  />
                )}
              />

              {/* Submit */}
              <Button
                label="Send Verification Code"
                onPress={handleSubmit(onSubmit)}
                loading={loading}
                loadingLabel="Sending…"
                size="lg"
                marginTop={20}
              />

              {/* Sign In link */}
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: FontSize.md,
                  fontFamily: Font.body,
                  color: Colors.textSecondary,
                  marginVertical: 20,
                }}
              >
                Already have an account?{' '}
                <Text
                  onPress={() => router.push('/(auth)/login')}
                  style={{ fontFamily: Font.bodyBold, color: Colors.textPrimary }}
                >
                  Sign In
                </Text>
              </Text>

              <AuthFooter />
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}
