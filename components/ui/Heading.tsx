import React from 'react';
import { View, Text } from 'react-native';
import { Font } from '@/src/constants/typography';
import { Colors } from '@/src/constants/colors';
import { FontSize, LineHeight } from '@/src/constants/mixins';

type HeadingSize = 'sm' | 'md' | 'lg';

type HeadingProps = {
  title: string;
  subtitle?: string;
  size?: HeadingSize;
  marginTop?: number;
  marginBottom?: number;
};

const SIZE: Record<HeadingSize, { title: number; lineHeight: number; subtitle: number }> = {
  sm: { title: FontSize.h3, lineHeight: LineHeight.h3, subtitle: FontSize.base },
  md: { title: FontSize.h1, lineHeight: LineHeight.h2, subtitle: FontSize.md },
  lg: { title: FontSize.d1, lineHeight: LineHeight.d1, subtitle: FontSize.md },
};

export default function Heading({
  title,
  subtitle,
  size = 'md',
  marginTop = 32,
  marginBottom = 0,
}: HeadingProps) {
  const s = SIZE[size];

  return (
    <View style={{ marginTop, marginBottom }}>
      <Text
        style={{
          fontSize: s.title,
          fontFamily: Font.heading,
          color: Colors.textPrimary,
          lineHeight: s.lineHeight,
          letterSpacing: -0.5,
        }}
      >
        {title}
      </Text>
      {subtitle && (
        <Text
          style={{
            fontSize: s.subtitle,
            fontFamily: Font.body,
            color: Colors.textMuted,
            marginTop: 6,
            lineHeight: LineHeight.md,
          }}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );
}
