import React from 'react';
import { View, Text, ScrollView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/src/constants/colors';
import { useAppStore } from '@/src/stores/appStore';
import { FontSize, LineHeight, Radius } from '@/src/constants/mixins';
import { Font } from '@/src/constants/typography';
import Logo from '@/components/common/Logo';
import SpecialtyGrid from '@/components/common/SpecialtyGrid';
import Button from '@/components/ui/Button';
import ScreenShades from '@/components/common/ScreenShades';
import Icon from '@/components/common/Icon';

export default function SpecialtyScreen() {
  const router = useRouter();
  const { selectedSpecialties, setSelectedSpecialties } = useAppStore();

  const primaryId = selectedSpecialties[0] ?? null;

  return (
    <LinearGradient
      colors={[Colors.gradStart, Colors.gradMid, Colors.gradEnd]}
      locations={[0, 0.45, 1]}
      style={{ flex: 1 }}
    >
      <ScreenShades />

      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        <StatusBar barStyle="dark-content" />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <Logo marginTop={16} />

          {/* Heading */}
          <View style={{ marginTop: 28, marginBottom: 16 }}>
            <Text
              style={{
                fontFamily: Font.heading,
                fontSize: FontSize.h1,
                color: Colors.navy,
                lineHeight: LineHeight.h1,
                marginBottom: 2,
              }}
            >
              Choose Your
            </Text>
            <Text
              style={{
                fontFamily: Font.headingItalic,
                fontSize: FontSize.h1,
                color: Colors.textPrimary,
                lineHeight: LineHeight.h1,
              }}
            >
              Primary Specialty
            </Text>
          </View>

          {/* Info note */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              gap: 8,
              backgroundColor: 'rgba(26,26,26,0.06)',
              borderRadius: Radius.md,
              padding: FontSize.xsPlus,
              marginBottom: FontSize.h4,
            }}
          >
            <Icon name="InfoIcon" size="16" viewBox="0 0 24 24" opacity="0.6" />
            <Text
              style={{
                flex: 1,
                fontSize: FontSize.sm,
                color: Colors.textSecondary,
                lineHeight: LineHeight.md,
              }}
            >
              Note: You can change your specialties after{'\n'} setup or settings.
            </Text>
          </View>

          <SpecialtyGrid
            selected={primaryId ? [primaryId] : []}
            onPress={(id) => setSelectedSpecialties([id])}
          />
        </ScrollView>

        {/* Continue button */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 16, paddingTop: 12 }}>
          <Button
            label="Continue"
            onPress={() => router.push('/(app)/setup/subspecialty')}
            disabled={!primaryId}
            fullWidth
            size="lg"
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
