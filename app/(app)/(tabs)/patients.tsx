import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import ScreenShades from '@/components/common/ScreenShades';
import SegmentedControl from '@/components/ui/SegmentedControl';
import SpecialtyDropdown from '@/components/ui/SpecialtyDropdown';
import ScanCardItem from '@/components/ui/ScanCardItem';
import Select from '@/components/ui/Select';
import Dropdown from '@/components/ui/Dropdown';
import { Input } from '@/src/components/ui/Input';
import Icon from '@/components/common/Icon';
import { Colors } from '@/src/constants/colors';
import { Font } from '@/src/constants/typography';
import { FontSize, Radius, Shadow } from '@/src/constants/mixins';
import { SPECIALTIES } from '@/src/constants/specialties';
import { useAuthStore } from '@/src/stores/authStore';
import Checkbox from '@/components/ui/Checkbox';

const TABS = ['New Patients', 'Existing patients'];

const GENDER_OPTIONS = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

const PLAN_OPTIONS = [
  { label: 'PPO', value: 'ppo' },
  { label: 'HMO', value: 'hmo' },
  { label: 'POS / HMO-POS', value: 'pos_hmo_pos' },
  { label: 'EPO', value: 'epo' },
  { label: 'Medicare Part B', value: 'medicare_part_b' },
  { label: 'Medicare Advantage', value: 'medicare_advantage' },
  { label: 'Medicaid FFS', value: 'medicaid_ffs' },
  { label: 'Medicaid MCO', value: 'medicaid_mco' },
  { label: 'TRICARE Select', value: 'tricare_select' },
  { label: 'TRICARE Prime', value: 'tricare_prime' },
  { label: 'VA / VAMC', value: 'va_vamc' },
];

const PLAN_TYPE_OPTIONS = [
  { label: 'Commercial', value: 'commercial' },
  { label: 'Medicare', value: 'medicare' },
  { label: 'Medicaid', value: 'medicaid' },
  { label: 'Medicare Advantage', value: 'medicare_advantage' },
];

const PHONE_TYPE_OPTIONS = [
  { label: 'Work', value: 'work' },
  { label: 'Mobile', value: 'mobile' },
  { label: 'Home', value: 'home' },
];

const WEIGHT_UNIT_OPTIONS = [
  { label: 'lbs', value: 'lbs' },
  { label: 'kg', value: 'kg' },
];

const HEIGHT_UNIT_OPTIONS = [
  { label: 'cm', value: 'cm' },
  { label: 'in', value: 'in' },
];

function BellIcon() {
  return (
    <Svg
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill="none"
      stroke={Colors.textPrimary}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
    </Svg>
  );
}

interface PatientForm {
  firstName: string;
  middleName: string;
  lastName: string;
  dob: string;
  bin: string;
  pcn: string;
  group: string;
  memberId: string;
  city: string;
  state: string;
  zipCode: string;
  address: string;
  gender: string;
  phoneType: string;
  phoneNumber: string;
  email: string;
  weight: string;
  weightUnit: string;
  height: string;
  heightUnit: string;
  plan: string;
  planType: string;
  confirmPlan: boolean;
  chartId: string;
}

function resolveSpecialtyId(specialty?: string[]): string {
  if (!specialty?.length) return 'rheumatology';
  const name = specialty[0].toLowerCase();
  const match = SPECIALTIES.find(
    (s) => s.name.toLowerCase().includes(name) || name.includes(s.short),
  );
  return match?.id ?? 'rheumatology';
}

export default function PatientsScreen() {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  const [activeTab, setActiveTab] = useState(0);
  const [specialtyId, setSpecialtyId] = useState(() => resolveSpecialtyId(user?.specialty));
  const [isEditing, setIsEditing] = useState(false);

  const tabFade = useRef(new Animated.Value(1)).current;
  const tabSlide = useRef(new Animated.Value(0)).current;

  const [form, setForm] = useState<PatientForm>({
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    bin: '',
    pcn: '',
    group: '',
    memberId: '',
    city: '',
    state: '',
    zipCode: '',
    address: '',
    gender: '',
    phoneType: 'work',
    phoneNumber: '',
    email: '',
    weight: '',
    weightUnit: 'lbs',
    height: '',
    heightUnit: 'cm',
    plan: '',
    planType: '',
    confirmPlan: false,
    chartId: '',
  });

  const setField = <K extends keyof PatientForm>(key: K, value: PatientForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const switchTab = (index: number) => {
    if (index === activeTab) return;
    const direction = index > activeTab ? 1 : -1;

    Animated.parallel([
      Animated.timing(tabFade, { toValue: 0, duration: 130, useNativeDriver: true }),
      Animated.timing(tabSlide, { toValue: direction * 24, duration: 130, useNativeDriver: true }),
    ]).start(() => {
      setActiveTab(index);
      tabSlide.setValue(-direction * 24);
      Animated.parallel([
        Animated.timing(tabFade, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.timing(tabSlide, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start();
    });
  };

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  })();

  const handleContinue = () => {
    Alert.alert('Continue', `Proceeding as ${activeTab === 0 ? 'New' : 'Existing'} Patient.`);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScreenShades />
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.surface }} edges={['top']}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={0}
        >
          {/* ─── Fixed header ─── */}
          <View
            style={{
              paddingHorizontal: 20,
              paddingBlockStart: 6,
              paddingBlockEnd: 16,
              backgroundColor: Colors.surface,
            }}
          >
            {/* Greeting row */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginBottom: 14,
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: Font.body,
                    fontSize: FontSize.base,
                    color: Colors.textMuted,
                  }}
                >
                  {greeting}
                </Text>
                <Text
                  style={{
                    fontFamily: Font.headingBlack,
                    fontSize: FontSize.h4,
                    color: Colors.textPrimary,
                    marginTop: 1,
                  }}
                >
                  Dr. {user?.firstName ?? 'Sari'} !
                </Text>
                <Text
                  style={{
                    fontFamily: Font.body,
                    fontSize: FontSize.sm,
                    color: Colors.textMuted,
                    marginTop: 2,
                  }}
                >
                  {'CA'}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => router.push('/(app)/(tabs)/notifications')}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: Radius.full,
                  backgroundColor: Colors.surface,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 4,
                }}
              >
                <BellIcon />
              </TouchableOpacity>
            </View>

            {/* Change Specialty row */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 16,
              }}
            >
              <Text
                style={{
                  fontFamily: Font.bodyMedium,
                  fontSize: FontSize.sm,
                  color: Colors.textMuted,
                }}
              >
                Change Specialty
              </Text>
              <SpecialtyDropdown selectedId={specialtyId} onSelect={setSpecialtyId} />
            </View>

            {/* Segmented control */}
            <SegmentedControl tabs={TABS} selectedIndex={activeTab} onChange={switchTab} />
          </View>

          {/* ─── Scrollable form ─── */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
            keyboardShouldPersistTaps="handled"
          >
            <Animated.View style={{ opacity: tabFade, transform: [{ translateX: tabSlide }] }}>
              {/* SCAN CARD section */}
              <View style={{ marginBottom: 0 }}>
                <Text
                  style={{
                    fontFamily: Font.bodyMedium,
                    fontSize: FontSize.base,
                    color: Colors.textMuted,
                    letterSpacing: 0.5,
                    textTransform: 'uppercase',
                    marginBottom: 12,
                  }}
                >
                  Scan Card
                </Text>

                {/* Auto-fill info banner */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    backgroundColor: `${Colors.darkBlue}1a`,
                    borderRadius: Radius.sm,
                    padding: 12,
                    gap: 10,
                    marginBottom: 14,
                  }}
                >
                  <Icon name="PatientIcon2" size="16" viewBox="0 0 24 24" color={Colors.darkBlue} />
                  <Text
                    style={{
                      flex: 1,
                      fontFamily: Font.body,
                      fontSize: FontSize.sm,
                      color: Colors.infoBoxText,
                      lineHeight: 18,
                    }}
                  >
                    Patient details have been auto-filled from the insurance card and license.
                    Please review and update as needed.
                  </Text>
                </View>

                <ScanCardItem
                  title="Scan Insurance Card"
                  description="Use camera to scan front and back of card. Fields auto-fill instantly."
                  onPress={() => router.push('/(app)/pa/card-scan')}
                />

                <ScanCardItem
                  title="Scan Driver License"
                  description="Use camera to scan front and back of card. Fields auto-fill instantly."
                  onPress={() => router.push('/(app)/pa/card-scan')}
                />
              </View>

              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 }}
              >
                <View style={{ flex: 1, height: 1, backgroundColor: Colors.divider }} />
                <Text
                  style={{
                    fontSize: FontSize.base,
                    fontFamily: Font.body,
                    color: Colors.textMuted,
                  }}
                >
                  Or
                </Text>
                <View style={{ flex: 1, height: 1, backgroundColor: Colors.divider }} />
              </View>

              {/* Patient Information */}
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 16,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: Font.heading,
                      fontSize: FontSize.xl,
                      color: Colors.textPrimary,
                    }}
                  >
                    Patient Information
                  </Text>
                  <TouchableOpacity
                    onPress={() => setIsEditing((v) => !v)}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                      }}
                    >
                      <Icon
                        name="EditIcon"
                        size="16"
                        viewBox="0 0 24 24"
                        color={Colors.infoBoxBorderDark}
                      />
                      <Text
                        style={{
                          fontFamily: Font.bodySemiBold,
                          fontSize: FontSize.sm,
                          color: Colors.infoBoxBorderDark,
                        }}
                      >
                        {isEditing ? 'Done' : 'Edit'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                {/* Chart ID — only for Existing Patients */}
                {activeTab === 1 && (
                  <Input
                    label="Chart ID"
                    placeholder="RX-000000-XXXX"
                    value={form.chartId}
                    onChangeText={(v) => setField('chartId', v)}
                    rightIcon={
                      <Icon
                        name="SearchIcon"
                        size="16"
                        viewBox="0 0 24 24"
                        color={Colors.textPrimary}
                      />
                    }
                    autoCapitalize="characters"
                  />
                )}

                {/* Patient name — 3 cols */}
                <Text
                  style={{
                    fontFamily: Font.bodyMedium,
                    fontSize: FontSize.sm,
                    color: Colors.textSecondary,
                    marginBottom: 8,
                  }}
                >
                  Patient name
                </Text>
                <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
                  <View style={{ flex: 1 }}>
                    <Input
                      placeholder="First"
                      value={form.firstName}
                      onChangeText={(v) => setField('firstName', v)}
                      autoCapitalize="words"
                      containerStyle={{ marginBottom: 0 }}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Input
                      placeholder="Middle"
                      value={form.middleName}
                      onChangeText={(v) => setField('middleName', v)}
                      autoCapitalize="words"
                      containerStyle={{ marginBottom: 0 }}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Input
                      placeholder="Last"
                      value={form.lastName}
                      onChangeText={(v) => setField('lastName', v)}
                      autoCapitalize="words"
                      containerStyle={{ marginBottom: 0 }}
                    />
                  </View>
                </View>

                {/* Date of Birth */}
                <Input
                  label="Date of Birth"
                  placeholder="MM/DD/YYYY"
                  value={form.dob}
                  onChangeText={(v) => setField('dob', v)}
                  keyboardType="numeric"
                />

                {/* BIN + PCN */}
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <View style={{ flex: 1 }}>
                    <Input
                      label="Bin"
                      placeholder="000000"
                      value={form.bin}
                      onChangeText={(v) => setField('bin', v)}
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Input
                      label="Pcn"
                      placeholder="00000"
                      value={form.pcn}
                      onChangeText={(v) => setField('pcn', v)}
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                {/* Group */}
                <Input
                  label="Group"
                  placeholder="GRP000000"
                  value={form.group}
                  onChangeText={(v) => setField('group', v)}
                  autoCapitalize="characters"
                />

                {/* Member ID */}
                <Input
                  label="Member ID"
                  placeholder="00000"
                  value={form.memberId}
                  onChangeText={(v) => setField('memberId', v)}
                />

                {/* City + State */}
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <View style={{ flex: 1 }}>
                    <Input
                      label="City"
                      placeholder="City"
                      value={form.city}
                      onChangeText={(v) => setField('city', v)}
                      autoCapitalize="words"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Input
                      label="State"
                      placeholder="State"
                      value={form.state}
                      onChangeText={(v) => setField('state', v)}
                      autoCapitalize="characters"
                    />
                  </View>
                </View>

                {/* Zip Code */}
                <Input
                  label="Zip Code"
                  placeholder="00000"
                  value={form.zipCode}
                  onChangeText={(v) => setField('zipCode', v)}
                  keyboardType="numeric"
                />

                {/* Address */}
                <Input
                  label="Address"
                  placeholder="Street Address"
                  value={form.address}
                  onChangeText={(v) => setField('address', v)}
                  autoCapitalize="words"
                />

                {/* Gender */}
                <Select
                  label="Gender"
                  value={form.gender}
                  onChange={(v) => setField('gender', v)}
                  options={GENDER_OPTIONS}
                  placeholder="Select gender"
                  marginTop={0}
                />
                <View style={{ marginBottom: 16 }} />

                {/* Phone Type + Phone Number */}
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <View style={{ flex: 1 }}>
                    <Select
                      label="Phone Type"
                      value={form.phoneType}
                      onChange={(v) => setField('phoneType', v)}
                      options={PHONE_TYPE_OPTIONS}
                    />
                  </View>
                  <View style={{ flex: 2 }}>
                    <Input
                      label="Phone number"
                      placeholder="555 123 - 4356"
                      value={form.phoneNumber}
                      onChangeText={(v) => setField('phoneNumber', v)}
                      keyboardType="phone-pad"
                    />
                  </View>
                </View>

                {/* Email */}
                <Input
                  label="Email (Optional)"
                  placeholder="email@gmail.com"
                  value={form.email}
                  onChangeText={(v) => setField('email', v)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                {/* Weight */}
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <View style={{ flex: 3 }}>
                    <Input
                      label="Patient Weight"
                      placeholder="Enter weight"
                      value={form.weight}
                      onChangeText={(v) => setField('weight', v)}
                      keyboardType="decimal-pad"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Select
                      label="LBS"
                      hideLabel
                      value={form.weightUnit}
                      onChange={(v) => setField('weightUnit', v)}
                      options={WEIGHT_UNIT_OPTIONS}
                    />
                  </View>
                </View>

                {/* Height */}
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <View style={{ flex: 3 }}>
                    <Input
                      label="Patient Height"
                      placeholder="Enter height"
                      value={form.height}
                      onChangeText={(v) => setField('height', v)}
                      keyboardType="decimal-pad"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Select
                      label="CM"
                      hideLabel
                      value={form.heightUnit}
                      onChange={(v) => setField('heightUnit', v)}
                      options={HEIGHT_UNIT_OPTIONS}
                    />
                  </View>
                </View>

                {/* Select Plan */}
                <Dropdown
                  label="Select Plan"
                  value={form.plan}
                  onChange={(v) => setField('plan', v)}
                  options={PLAN_OPTIONS}
                  placeholder="PPO"
                />
                <View style={{ marginBottom: 6 }} />

                {/* Use if card scan fails note */}
                <Text
                  style={{
                    fontFamily: Font.body,
                    fontSize: FontSize.xs,
                    color: Colors.textMuted,
                    marginBottom: 14,
                  }}
                >
                  Use if card scan fails or plan not in BIN table.
                </Text>

                {/* Select Plan Type */}
                <Select
                  label="Select Plan Type"
                  value={form.planType}
                  onChange={(v) => setField('planType', v)}
                  options={PLAN_TYPE_OPTIONS}
                  placeholder="Select plan type"
                />
                <View style={{ marginBottom: 16 }} />

                {/* Confirm plan checkbox */}
                <Checkbox
                  checked={form.confirmPlan}
                  onChange={(v) => setField('confirmPlan', v)}
                  label="Please confirm this is patient's current plan"
                  marginTop={4}
                />
              </View>
            </Animated.View>
          </ScrollView>

          {/* ─── Continue button ─── */}
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 14,
              backgroundColor: Colors.white,
              borderTopWidth: 1,
              borderTopColor: Colors.border,
            }}
          >
            <TouchableOpacity
              onPress={handleContinue}
              activeOpacity={0.88}
              style={{
                backgroundColor: Colors.primary,
                borderRadius: Radius.md,
                paddingVertical: 17,
                alignItems: 'center',
                ...Shadow.md,
              }}
            >
              <Text
                style={{
                  fontFamily: Font.bodyBold,
                  fontSize: FontSize.lgPlus,
                  color: Colors.white,
                }}
              >
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
