import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/src/constants/colors';
import { SUBSCRIPTION_PLANS, ADD_ONS } from '@/src/constants/specialties';
import { useAppStore } from '@/src/stores/appStore';
import { FontSize, LineHeight, Radius, Shadow } from '@/src/constants/mixins';
import { Font } from '@/src/constants/typography';
import ScreenLayout from '@/components/common/ScreenLayout';
import Button from '@/components/ui/Button';
import SetupHeader from '@/components/common/SetupHeader';
import Icon from '@/components/common/Icon';

const TIER_BADGE: Record<string, string> = {
  authorization: 'Includes Tier 1',
  appeals: 'Includes Tier 1 + 2',
};

const FEATURES_PREVIEW = 3;

export default function ReviewPlanScreen() {
  const router = useRouter();
  const { selectedPlan, selectedAddOns } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [featuresExpanded, setFeaturesExpanded] = useState(false);

  const plan = SUBSCRIPTION_PLANS.find((p) => p.id === selectedPlan) ?? SUBSCRIPTION_PLANS[1];
  const addedOns = ADD_ONS.filter((a) => selectedAddOns.includes(a.id));
  const addOnTotal = addedOns.reduce((sum, a) => sum + a.price, 0);
  const total = (plan.price ?? 0) + addOnTotal;
  const tierBadge = TIER_BADGE[plan.id];
  const visibleFeatures = featuresExpanded
    ? plan.features
    : plan.features.slice(0, FEATURES_PREVIEW);
  const hiddenCount = plan.features.length - FEATURES_PREVIEW;

  const handleCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/(app)/(tabs)/dashboard');
    }, 1500);
  };

  return (
    <ScreenLayout gradient>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        <StatusBar barStyle="dark-content" />
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
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
              Review
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
              Confirm your selection to start using BioProRx
            </Text>
          </View>

          {/* Selected Plan card */}
          <View style={[styles.card, { marginBottom: 16 }]}>
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
              <View style={[styles.badge, { marginBottom: 16, marginTop: 12 }]}>
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ fontFamily: Font.body, fontSize: FontSize.sm, color: Colors.muted }}>
                Monthly subscription
              </Text>
              <Text
                style={{
                  fontFamily: Font.headingBlack,
                  fontSize: FontSize.d4,
                  color: Colors.textPrimary,
                  // paddingBottom: 8,
                }}
              >
                ${plan.price}
              </Text>
            </View>
          </View>

          {/* Add-on card (if selected) */}
          {addedOns.map((addon) => (
            <View key={addon.id} style={[styles.card, { marginBottom: 16 }]}>
              <Text
                style={{
                  fontFamily: Font.bodySemiBold,
                  fontSize: FontSize.sm,
                  color: Colors.primary,
                  marginBottom: 12,
                }}
              >
                Add-on Module
              </Text>
              <Text
                style={{
                  fontFamily: Font.heading,
                  fontSize: FontSize.lgPlus,
                  color: Colors.textPrimary,
                  marginBottom: 4,
                }}
              >
                {addon.name}
              </Text>
              <View style={{ height: 1, backgroundColor: Colors.border, marginVertical: 12 }} />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={{ fontFamily: Font.body, fontSize: FontSize.sm, color: Colors.muted }}>
                  Optional module
                </Text>
                <Text
                  style={{
                    fontFamily: Font.headingBlack,
                    fontSize: FontSize.d4,
                    color: Colors.primary,
                    // paddingBottom: 8,
                  }}
                >
                  +${addon.price}
                </Text>
              </View>
            </View>
          ))}

          {/* Total card */}
          <LinearGradient
            colors={['#5E2A94', Colors.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.card, { marginBottom: 16 }]}
          >
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
                  fontSize: FontSize.sm,
                  color: 'rgba(255,255,255,0.8)',
                }}
              >
                Total Monthly Cost
              </Text>
              <View style={styles.checkCircle}>
                <Icon
                  name="CheckCircleOutlineIcon"
                  size="24"
                  color={Colors.white}
                  viewBox="0 0 24 24"
                />
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 3, marginTop: 12 }}>
              <Text
                style={{
                  fontFamily: Font.headingBlack,
                  fontSize: FontSize.d4,
                  color: Colors.white,
                  // paddingBottom: 8,
                }}
              >
                $
              </Text>
              <Text
                style={{
                  fontFamily: Font.headingBlack,
                  fontSize: FontSize.d2,
                  color: Colors.white,
                  lineHeight: FontSize.d2 + 4,
                }}
              >
                {total}
              </Text>
              <Text
                style={{
                  fontFamily: Font.body,
                  fontSize: FontSize.sm,
                  color: 'rgba(255,255,255,0.7)',
                  paddingBottom: 8,
                }}
              >
                {' '}
                /month
              </Text>
            </View>
          </LinearGradient>

          {/* What's Included */}
          <View style={[styles.card, { marginBottom: 16 }]}>
            <Text
              style={{
                fontFamily: Font.bodyBold,
                fontSize: FontSize.base,
                color: Colors.textPrimary,
                marginBottom: 14,
              }}
            >
              Whats Included
            </Text>
            <View style={{ gap: 8 }}>
              {visibleFeatures.map((f) => (
                <View key={f} style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                  <Icon name="CheckIcon" size="16" color={Colors.link} viewBox="0 0 24 24" />
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
            {hiddenCount > 0 && !featuresExpanded && (
              <TouchableOpacity onPress={() => setFeaturesExpanded(true)} style={{ marginTop: 10 }}>
                <Text
                  style={{
                    fontFamily: Font.bodySemiBold,
                    fontSize: FontSize.sm,
                    color: Colors.primary,
                  }}
                >
                  +{hiddenCount} more
                </Text>
              </TouchableOpacity>
            )}

            {addedOns.length > 0 && (
              <>
                <View style={{ height: 1, backgroundColor: Colors.border, marginVertical: 16 }} />
                <Text
                  style={{
                    fontFamily: Font.bodyBold,
                    fontSize: FontSize.base,
                    color: Colors.textPrimary,
                    marginBottom: 12,
                  }}
                >
                  Add-on Features:
                </Text>
                <View style={{ gap: 8 }}>
                  {addedOns
                    .flatMap((a) => a.features)
                    .map((f) => (
                      <View
                        key={f}
                        style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}
                      >
                        <Icon name="CheckIcon" size="16" color={Colors.link} viewBox="0 0 24 24" />
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
              </>
            )}
          </View>
        </ScrollView>

        <View style={{ paddingHorizontal: 20, paddingBottom: 0, paddingTop: 12, gap: 8 }}>
          <Button
            label={loading ? 'Processing...' : 'Check Out'}
            variant="deepPurple"
            onPress={handleCheckout}
            disabled={loading}
            fullWidth
            size="lg"
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
    marginBottom: 0,
  },
  checkCircle: {
    width: FontSize.xxl,
    height: FontSize.xxl,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircleWhite: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: `${Colors.link}`,
    borderRadius: Radius.full,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
});
