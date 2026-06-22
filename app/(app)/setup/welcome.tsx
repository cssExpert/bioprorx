import React from 'react';
import { View, Text, StatusBar, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore } from '@/src/stores/authStore';
import { Font } from '@/src/constants/typography';
import { Colors } from '@/src/constants/colors';
import Logo from '@/components/common/Logo';
import Button from '@/components/ui/Button';
import { FontSize, LineHeight, Radius, Height } from '@/src/constants/mixins';
import ScreenShades from '@/components/common/ScreenShades';

export default function WelcomeScreen() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const firstName = user?.firstName ?? 'Doctor';

  return (
    <View style={{ flex: 1 }}>
      <ScreenShades />

      <StatusBar barStyle="dark-content" backgroundColor={Colors.gradStart} />
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        <View style={{ flex: 1, paddingHorizontal: 24 }}>
          <Logo marginTop={18} />

          <View style={{ alignItems: 'center', marginTop: 10 }}>
            <Image
              source={require('@/assets/images/Doctor.png')}
              style={{ width: 200, height: 210 }}
              resizeMode="contain"
            />
          </View>

          <Text
            style={{
              fontFamily: Font.heading,
              fontSize: FontSize.h1,
              color: Colors.navy,
              lineHeight: LineHeight.h1,
              marginTop: 18,
            }}
          >
            Welcome
          </Text>
          <Text
            style={{
              fontFamily: Font.headingItalic,
              fontSize: FontSize.h1,
              color: Colors.navy,
              lineHeight: LineHeight.h1,
            }}
          >
            Dr {firstName} !
          </Text>
          <Text
            style={{
              fontFamily: Font.body,
              fontSize: FontSize.md,
              color: Colors.muted,
              marginTop: 8,
            }}
          >
            Approval Engine is ready.
          </Text>

          {/* Profile completion card */}
          <View
            style={{
              backgroundColor: `rgba(${Colors.infoBoxBgrgb}, 0.10)`,
              borderRadius: Radius.lg,
              borderLeftWidth: 4,
              borderColor: Colors.infoBoxBorderDark,
              padding: Radius.lg,
              marginVertical: Height.xs,
            }}
          >
            <Text
              style={{
                fontFamily: Font.bodySemiBold,
                fontSize: FontSize.lg,
                color: Colors.navy,
              }}
            >
              Complete your profile
            </Text>
            <Text
              style={{
                fontFamily: Font.body,
                fontSize: FontSize.sm,
                color: Colors.textSecondary,
                marginTop: 6,
                lineHeight: LineHeight.md,
              }}
            >
              Unlock full prescribing and PA intelligence — takes about 3 minutes.
            </Text>

            <View
              style={{
                backgroundColor: 'rgba(255,255,255,0.7)',
                borderRadius: Radius.md,
                padding: 14,
                marginTop: 14,
              }}
            >
              <Text
                style={{
                  fontFamily: Font.bodySemiBold,
                  fontSize: FontSize.xs2,
                  letterSpacing: 0.5,
                  color: Colors.muted,
                  textTransform: 'uppercase',
                }}
              >
                Next Step
              </Text>
              <Text
                style={{
                  fontFamily: Font.bodySemiBold,
                  fontSize: FontSize.md,
                  color: Colors.navy,
                  marginTop: 4,
                }}
              >
                Verify NPI and State Licence
              </Text>

              <View
                style={{
                  height: 8,
                  backgroundColor: Colors.progressTrack,
                  borderRadius: Radius.xxs,
                  marginTop: 10,
                  overflow: 'hidden',
                }}
              >
                <View
                  style={{
                    width: '22%',
                    height: '100%',
                    backgroundColor: Colors.focusBorder,
                    borderRadius: Radius.xxs,
                  }}
                />
              </View>
            </View>
          </View>

          <View style={{ flex: 1 }} />
        </View>

        <View style={{ paddingHorizontal: 24, paddingBottom: 16, gap: 4 }}>
          <Button
            variant="deepPurple"
            label="Complete Profile"
            onPress={() => router.push('/(app)/setup/specialty')}
            fullWidth
          />
          <Button
            label="Skip for now"
            variant="ghost"
            onPress={() => router.replace('/(app)/(tabs)/dashboard')}
            fullWidth
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
