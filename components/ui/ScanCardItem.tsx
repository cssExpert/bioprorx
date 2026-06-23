import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from '@/components/common/Icon';
import { Colors } from '@/src/constants/colors';
import { Font } from '@/src/constants/typography';
import { FontSize, Radius } from '@/src/constants/mixins';

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
        borderRadius: Radius.md,
        borderWidth: 1.5,
        borderStyle: 'dashed',
        borderColor: Colors.border,
        padding: 20,
        alignItems: 'center',
        marginBottom: 12,
      }}
    >
      <View
        style={{
          width: 32,
          height: 32,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 10,
        }}
      >
        <Icon name="CameraIcon" size="32" viewBox="0 0 24 24" color={Colors.textPrimary} />
      </View>
      <Text
        style={{
          fontFamily: Font.bodySemiBold,
          fontSize: FontSize.xl,
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
          fontSize: FontSize.base,
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
            fontFamily: Font.bodyBold,
            fontSize: FontSize.base,
            color: Colors.primary,
          }}
        >
          Open Camera
        </Text>
      </TouchableOpacity>
    </View>
  );
}
