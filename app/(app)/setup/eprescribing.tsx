import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/src/constants/colors';
import { ADD_ONS, SUBSCRIPTION_PLANS } from '@/src/constants/specialties';
import { useAppStore } from '@/src/stores/appStore';
import { FontSize, LineHeight, Radius, Height, Shadow } from '@/src/constants/mixins';
import { Font } from '@/src/constants/typography';
import ScreenLayout from '@/components/common/ScreenLayout';
import Button from '@/components/ui/Button';
import SetupHeader from '@/components/common/SetupHeader';
import Icon from '@/components/common/Icon';

const TIER_BADGE: Record<string, string> = {
  authorization: 'Includes Tier 1',
  appeals: 'Includes Tier 1 + 2',
};

export default function EnhancePlanScreen() {
  const router = useRouter();
  const { selectedPlan, selectedAddOns, toggleAddOn } = useAppStore();

  const plan = SUBSCRIPTION_PLANS.find((p) => p.id === selectedPlan) ?? SUBSCRIPTION_PLANS[1];
  const iod = ADD_ONS[0];
  const iodSelected = selectedAddOns.includes(iod.id);
  const tierBadge = TIER_BADGE[plan.id];

  return (
    <ScreenLayout gradient>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        <StatusBar barStyle="dark-content" />
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Back + Logo */}
          <SetupHeader onBack={() => router.back()} />

          <View style={{ marginBottom: 28 }}>
            <Text
              style={{
                fontFamily: Font.headingBlack,
                fontSize: FontSize.h1,
                color: Colors.textPrimary,
                lineHeight: LineHeight.h1,
              }}
            >
              Enhance
            </Text>
            <Text
              style={{
                fontFamily: Font.headingItalic,
                fontSize: FontSize.h1,
                color: Colors.textPrimary,
                lineHeight: LineHeight.h1,
                marginBottom: 12,
              }}
            >
              Your Plan
            </Text>
            <Text
              style={{
                fontFamily: Font.body,
                fontSize: FontSize.sm,
                color: Colors.muted,
                lineHeight: LineHeight.md,
                marginBottom: 0,
              }}
            >
              Add optional capabilities to maximize your workflow
            </Text>
          </View>

          {/* Selected Plan summary */}
          <View style={styles.card}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  fontFamily: Font.bodySemiBold,
                  fontSize: FontSize.base,
                  color: Colors.primary,
                }}
              >
                Selected Plan
              </Text>
              <View style={styles.checkCircle}>
                <Icon
                  name="CheckCircleOutlineIcon"
                  size="24"
                  color={Colors.primary}
                  viewBox="0 0 24 24"
                />
              </View>
            </View>

            <Text
              style={{
                fontFamily: Font.heading,
                fontSize: FontSize.lgPlus,
                color: Colors.textPrimary,
                marginBottom: 0,
              }}
            >
              {plan.name}
            </Text>

            {tierBadge && (
              <View style={styles.badge}>
                <Text
                  style={{
                    fontFamily: Font.bodySemiBold,
                    fontSize: FontSize.xs2,
                    color: Colors.white,
                  }}
                >
                  {tierBadge}
                </Text>
              </View>
            )}

            <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 2, marginTop: 10 }}>
              <Text
                style={{
                  fontFamily: Font.headingBlack,
                  fontSize: FontSize.d4,
                  color: Colors.textPrimary,
                  // paddingBottom: 8,
                }}
              >
                $
              </Text>
              <Text
                style={{
                  fontFamily: Font.headingBlack,
                  fontSize: FontSize.d4,
                  color: Colors.textPrimary,
                  // lineHeight: FontSize.d2 + 4,
                }}
              >
                {plan.price}
              </Text>
              <Text
                style={{
                  fontFamily: Font.body,
                  fontSize: FontSize.base,
                  color: Colors.muted,
                  paddingBottom: 4,
                }}
              >
                {' '}
                /month
              </Text>
            </View>
          </View>

          <Text
            style={{
              fontFamily: Font.bodyBold,
              fontSize: FontSize.base,
              color: Colors.textPrimary,
              marginTop: 28,
              marginBottom: 14,
            }}
          >
            Available Add-on
          </Text>

          {/* Add-on card */}
          <View style={styles.card}>
            <Text
              style={{
                fontFamily: Font.heading,
                fontSize: FontSize.lgPlus,
                color: Colors.textPrimary,
                marginBottom: 6,
              }}
            >
              {iod.name}
            </Text>
            <Text
              style={{
                fontFamily: Font.body,
                fontSize: FontSize.sm,
                color: Colors.muted,
                lineHeight: LineHeight.md,
                marginBottom: 16,
              }}
            >
              {iod.description}
            </Text>

            <View
              style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 3, marginBottom: 18 }}
            >
              <Text
                style={{
                  fontFamily: Font.headingBlack,
                  fontSize: FontSize.d4,
                  color: Colors.textPrimary,
                  // paddingBottom: 8,
                }}
              >
                $
              </Text>
              <Text
                style={{
                  fontFamily: Font.headingBlack,
                  fontSize: FontSize.d4,
                  color: Colors.textPrimary,
                  // lineHeight: FontSize.d2 + 4,
                }}
              >
                {plan.price}
              </Text>
              <Text
                style={{
                  fontFamily: Font.body,
                  fontSize: FontSize.base,
                  color: Colors.muted,
                  paddingBottom: 4,
                }}
              >
                {' '}
                /month
              </Text>
            </View>

            <View style={{ gap: 8, marginBottom: 20 }}>
              {iod.features.map((f) => (
                <View key={f} style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                  <View style={styles.featureIcon}>
                    <Icon name="CheckIcon" size="16" color={Colors.link} viewBox="0 0 24 24" />
                  </View>
                  <Text
                    style={{
                      fontFamily: Font.body,
                      fontSize: FontSize.sm,
                      color: Colors.muted,
                      flex: 1,
                      lineHeight: LineHeight.md,
                    }}
                  >
                    {f}
                  </Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              onPress={() => toggleAddOn(iod.id)}
              activeOpacity={0.85}
              style={[
                styles.addonBtn,
                {
                  backgroundColor: iodSelected ? Colors.primary : 'transparent',
                  borderColor: Colors.primaryDark,
                },
              ]}
            >
              <Text
                style={{
                  fontFamily: Font.bodyBold,
                  fontSize: FontSize.base,
                  color: iodSelected ? Colors.white : Colors.primaryDark,
                }}
              >
                {iodSelected ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 4,
                    }}
                  >
                    <View style={styles.textIcon}>
                      <Icon name="CheckIcon" size="16" color={Colors.white} viewBox="0 0 24 24" />
                    </View>
                    <Text
                      style={{
                        fontFamily: Font.bodyBold,
                        fontSize: FontSize.base,
                        color: iodSelected ? Colors.white : Colors.primaryDark,
                      }}
                    >
                      Added to plan
                    </Text>
                  </View>
                ) : (
                  'Add to plan'
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={{ paddingHorizontal: 20, paddingBottom: 0, paddingTop: 12, gap: 8 }}>
          <Button
            label="Continue"
            variant="deepPurple"
            onPress={() => router.push('/(app)/setup/checkout')}
            fullWidth
            size="lg"
          />
          <Button
            label="Skip for now"
            variant="ghost"
            onPress={() => router.push('/(app)/setup/checkout')}
            fullWidth
          />
        </View>
      </SafeAreaView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.xl,
    padding: 20,
    overflow: 'hidden',
    ...Shadow.md,
  },
  checkCircle: {
    width: FontSize.xxl,
    height: FontSize.xxl,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: `${Colors.link}`,
    borderRadius: Radius.full,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 12,
  },
  addonBtn: {
    height: Height.lg,
    borderRadius: Radius.md,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureIcon: {
    position: 'relative',
    top: 1.5,
  },
  textIcon: {
    position: 'relative',
    top: 0.5,
  },
});
