import React from 'react';
import { View, Text } from 'react-native';
import { Font } from '@/src/constants/typography';
import { Colors } from '@/src/constants/colors';
import { FontSize, LineHeight } from '@/src/constants/mixins';

export default function AuthFooter() {
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 4,
        paddingTop: 4,
      }}
    >
      <Text
        style={{ fontSize: FontSize.sm, fontFamily: Font.body, color: Colors.textMuted, lineHeight: LineHeight.md }}
      >
        By continuing, you agree to the{' '}
      </Text>
      <View style={{ borderBottomWidth: 0.8, borderBottomColor: Colors.textPrimary }}>
        <Text
          style={{
            fontSize: FontSize.sm,
            fontFamily: Font.bodyBold,
            color: Colors.textPrimary,
            lineHeight: LineHeight.md,
          }}
        >
          Terms of Service
        </Text>
      </View>
      <Text
        style={{ fontSize: FontSize.sm, fontFamily: Font.body, color: Colors.textMuted, lineHeight: LineHeight.md }}
      >
        {' '}
        and
      </Text>

      <View style={{ width: '100%' }} />

      <View style={{ borderBottomWidth: 0.8, borderBottomColor: Colors.textPrimary }}>
        <Text
          style={{
            fontSize: FontSize.sm,
            fontFamily: Font.bodyBold,
            color: Colors.textPrimary,
            lineHeight: LineHeight.md,
          }}
        >
          Privacy Policy
        </Text>
      </View>
    </View>
  );
}
