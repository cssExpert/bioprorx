import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/src/constants/colors';
import { useAppStore } from '@/src/stores/appStore';
import { FontSize, LineHeight } from '@/src/constants/mixins';
import { Font } from '@/src/constants/typography';
import Logo from '@/components/common/Logo';
import Icon from '@/components/common/Icon';
import SpecialtyGrid from '@/components/common/SpecialtyGrid';
import Button from '@/components/ui/Button';
import ScreenShades from '@/components/common/ScreenShades';

const MAX_SECONDARY = 2;

export default function SubspecialtyScreen() {
  const router = useRouter();
  const { selectedSpecialties, setSelectedSpecialties } = useAppStore();

  const primaryId = selectedSpecialties[0] ?? null;
  const secondaryIds = selectedSpecialties.slice(1);

  const handleToggle = (id: string) => {
    const isSelected = secondaryIds.includes(id);
    let updated: string[];
    if (isSelected) {
      updated = secondaryIds.filter((x) => x !== id);
    } else {
      if (secondaryIds.length >= MAX_SECONDARY) return;
      updated = [...secondaryIds, id];
    }
    setSelectedSpecialties([primaryId!, ...updated]);
  };

  const atMax = secondaryIds.length >= MAX_SECONDARY;

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

          <TouchableOpacity
            onPress={() => router.back()}
            style={{ marginTop: 20, marginBottom: 16, alignSelf: 'flex-start' }}
          >
            <Icon name="ArrowLeftIcon" size="24" color={Colors.navy} viewBox="0 0 24 24" />
          </TouchableOpacity>

          <View style={{ marginBottom: 8 }}>
            <Text
              style={{
                fontFamily: Font.heading,
                fontSize: FontSize.h1,
                color: Colors.navy,
                lineHeight: LineHeight.h1,
                marginBottom: 2,
              }}
            >
              Add up to two
            </Text>
            <Text
              style={{
                fontFamily: Font.headingItalic,
                fontSize: FontSize.h1,
                color: Colors.textPrimary,
                lineHeight: LineHeight.h1,
              }}
            >
              Secondary Specialties
            </Text>
          </View>

          <Text
            style={{
              fontFamily: Font.body,
              fontSize: FontSize.sm,
              color: Colors.muted,
              lineHeight: LineHeight.md,
              marginBottom: 24,
            }}
          >
            Expands your formulary and PA options.
          </Text>

          <SpecialtyGrid
            selected={secondaryIds}
            onPress={handleToggle}
            excludeIds={primaryId ? [primaryId] : []}
            disabledIds={
              atMax
                ? [] // disabledIds not needed — unselected non-primary just won't respond due to atMax guard in handleToggle
                : []
            }
          />
        </ScrollView>

        <View style={{ paddingHorizontal: 20, paddingBottom: 0, paddingTop: 12, gap: 4 }}>
          <Button
            label="Continue"
            onPress={() => router.push('/(app)/setup/subscription')}
            fullWidth
            size="lg"
          />
          <Button
            label="Skip for now"
            variant="ghost"
            onPress={() => router.push('/(app)/setup/subscription')}
            fullWidth
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
