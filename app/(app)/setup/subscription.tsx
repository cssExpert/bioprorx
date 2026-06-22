import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/src/constants/colors';
import { SUBSCRIPTION_PLANS } from '@/src/constants/specialties';
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

export default function SubscriptionScreen() {
  const router = useRouter();
  const { selectedPlan, setSelectedPlan } = useAppStore();

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
              Choose your
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
              {`Subscription\nPlan`}
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
              Select the plan that fits your workflow. You can upgrade anytime.
            </Text>
          </View>

          <View style={{ gap: 16 }}>
            {SUBSCRIPTION_PLANS.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                isSelected={selectedPlan === plan.id}
                badge={TIER_BADGE[plan.id]}
                onSelect={() => setSelectedPlan(plan.id)}
              />
            ))}
          </View>
        </ScrollView>

        <View style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
          <Button
            label="Continue"
            variant="deepPurple"
            onPress={() => router.push('/(app)/setup/eprescribing')}
            disabled={!selectedPlan}
            fullWidth
            size="lg"
          />
        </View>
      </SafeAreaView>
    </ScreenLayout>
  );
}

type Plan = (typeof SUBSCRIPTION_PLANS)[number];

function PlanCard({
  plan,
  isSelected,
  badge,
  onSelect,
}: {
  plan: Plan;
  isSelected: boolean;
  badge?: string;
  onSelect: () => void;
}) {
  const textColor = isSelected ? Colors.white : Colors.textPrimary;
  const mutedColor = isSelected ? 'rgba(255,255,255,0.7)' : Colors.muted;
  // const checkColor = isSelected ? Colors.white : Colors.primaryLight;

  return (
    <TouchableOpacity
      onPress={onSelect}
      activeOpacity={0.88}
      style={[styles.card, { backgroundColor: isSelected ? Colors.primaryDark : Colors.white }]}
    >
      {isSelected && (
        <LinearGradient
          colors={[Colors.primaryLight2, Colors.primaryDark]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />
      )}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: 8,
        }}
      >
        <Text
          style={{
            fontFamily: Font.heading,
            fontSize: plan.isEnterprise ? FontSize.d4 : FontSize.xl,
            color: textColor,
            flex: 1,
            marginRight: 12,
          }}
        >
          {plan.name}
        </Text>

        {isSelected && (
          <View style={styles.checkCircle}>
            <Icon
              name="CheckCircleOutlineIcon"
              size="24"
              color={Colors.white}
              viewBox="0 0 24 24"
            />
          </View>
        )}
      </View>

      {badge && (
        <View
          style={[
            styles.badge,
            { backgroundColor: isSelected ? 'rgba(255,255,255,0.18)' : `${Colors.link}E6` },
          ]}
        >
          <Text
            style={{
              fontFamily: Font.bodySemiBold,
              fontSize: FontSize.xs2,
              color: isSelected ? Colors.white : Colors.white,
            }}
          >
            {badge}
          </Text>
        </View>
      )}

      <Text
        style={{
          fontFamily: Font.body,
          fontSize: FontSize.sm,
          color: mutedColor,
          lineHeight: LineHeight.md,
          marginBottom: 14,
        }}
      >
        {plan.tagline}
      </Text>

      {!plan.isEnterprise && (
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 3, marginBottom: 18 }}>
          <Text
            style={{
              fontFamily: Font.headingBlack,
              fontSize: FontSize.d4,
              color: textColor,
              // paddingBottom: 8,
            }}
          >
            $
          </Text>
          <Text
            style={{
              fontFamily: Font.headingBlack,
              fontSize: FontSize.d4,
              color: textColor,
              // lineHeight: FontSize.d2 + 4,
            }}
          >
            {plan.price}
          </Text>
          <Text
            style={{
              fontFamily: Font.body,
              fontSize: FontSize.base,
              color: mutedColor,
              paddingBottom: 4,
            }}
          >
            {' '}
            /month
          </Text>
        </View>
      )}

      <View
        style={[
          styles.ctaBtn,
          {
            borderColor: isSelected ? 'rgba(255,255,255,1)' : Colors.primary,
            marginBottom: plan.isEnterprise ? 10 : 20,
          },
        ]}
      >
        <Text
          style={{
            fontFamily: Font.bodyBold,
            fontSize: FontSize.base,
            color: isSelected ? Colors.white : Colors.primary,
          }}
        >
          {plan.isEnterprise ? 'Contact Sales' : 'Select Plan'}
        </Text>
      </View>

      {plan.isEnterprise && (
        <Text
          style={{
            fontFamily: Font.body,
            fontSize: FontSize.xsPlus,
            color: Colors.primary,
            marginBottom: 18,
            textAlign: 'left',
          }}
        >
          Best for multi-site practices and enterprise teams
        </Text>
      )}

      {/* <View
        style={{
          height: 1,
          backgroundColor: isSelected ? 'rgba(255,255,255,0.15)' : Colors.border,
          marginBottom: 14,
        }}
      /> */}

      <Text
        style={{
          fontFamily: Font.bodyBold,
          fontSize: FontSize.base,
          color: textColor,
          marginBottom: 12,
        }}
      >
        Whats Included
      </Text>
      <View style={{ gap: 8 }}>
        {plan.features.map((f) => (
          <View key={f} style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
            <View style={styles.featureIcon}>
              <Icon
                name="CheckIcon"
                size="16"
                color={isSelected ? Colors.white : Colors.link}
                viewBox="0 0 24 24"
              />
            </View>
            <Text
              style={{
                fontFamily: Font.body,
                fontSize: FontSize.base,
                color: isSelected ? Colors.white : Colors.textMuted,
                flex: 1,
                lineHeight: LineHeight.md,
              }}
            >
              {f}
            </Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
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
    borderRadius: Radius.full,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 10,
  },
  ctaBtn: {
    height: Height.lg,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    fontFamily: Font.bodyBold,
    fontSize: FontSize.base,
  },
  featureIcon: {
    position: 'relative',
    top: 1.5,
  },
});
