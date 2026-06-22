import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from '@/components/common/Icon';
import { IconNames } from '@/components/common/Icons';
import { Font } from '@/src/constants/typography';
import { Radius, Height, FontSize } from '@/src/constants/mixins';
import { Colors } from '@/src/constants/colors';

type SocialButtonProps = {
  iconName: IconNames;
  iconSize?: '20' | '22' | '24';
  iconViewBox?: string;
  iconOpacity?: string;
  label: string;
  onPress?: () => void;
  marginTop?: number;
};

export default function SocialButton({
  iconName,
  iconSize = '22',
  iconViewBox = '0 0 24 24',
  iconOpacity,
  label,
  onPress,
  marginTop = 0,
}: SocialButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={{
        height: Height.xl,
        backgroundColor: Colors.white,
        borderRadius: Radius.md,
        borderWidth: 1,
        borderColor: Colors.fieldBorder,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        marginTop,
      }}
    >
      <Icon name={iconName} size={iconSize} viewBox={iconViewBox} opacity={iconOpacity} />
      <Text style={{ fontSize: FontSize.md, fontFamily: Font.bodyBold, color: Colors.textPrimary }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
