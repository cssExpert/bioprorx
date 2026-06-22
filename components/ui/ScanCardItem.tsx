import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from '@/components/common/Icon';
import { Colors } from '@/src/constants/colors';
import { Font } from '@/src/constants/typography';
import { FontSize, Radius, Shadow } from '@/src/constants/mixins';

interface Props {
  title: string;
  description: string;
  onPress: () => void;
}

export default function ScanCardItem({ title, description, onPress }: Props) {
  return (
    <View
      style={{
        backgroundColor: Colors.white,
        borderRadius: Radius.lg,
        borderWidth: 1.5,
        borderColor: Colors.border,
        padding: 20,
        alignItems: 'center',
        marginBottom: 12,
        ...Shadow.sm,
      }}
    >
      <View
        style={{
          width: 52,
          height: 52,
          borderRadius: Radius.md,
          backgroundColor: Colors.surface,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 10,
        }}
      >
        <Icon name="CameraIcon" size="28" viewBox="0 0 24 24" color={Colors.textSecondary} />
      </View>
      <Text
        style={{
          fontFamily: Font.bodySemiBold,
          fontSize: FontSize.lg,
          color: Colors.textPrimary,
          marginBottom: 6,
          textAlign: 'center',
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontFamily: Font.body,
          fontSize: FontSize.sm,
          color: Colors.textMuted,
          textAlign: 'center',
          lineHeight: 18,
          marginBottom: 14,
        }}
      >
        {description}
      </Text>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <Text
          style={{
            fontFamily: Font.bodySemiBold,
            fontSize: FontSize.base,
            color: Colors.brandAccent,
          }}
        >
          Open Camera
        </Text>
      </TouchableOpacity>
    </View>
  );
}
