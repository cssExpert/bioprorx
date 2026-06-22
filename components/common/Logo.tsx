import React from 'react';
import { View } from 'react-native';
import Icon from './Icon';
import LogoSvg from '@/assets/images/Logo.svg';

type LogoProps = {
  marginTop?: number;
};

export default function Logo({ marginTop = 20 }: LogoProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 9,
        marginTop,
      }}
    >
      <Icon name="Cog" size="28" viewBox="0 0 24 24" />
      <LogoSvg width={130} height={42} />
    </View>
  );
}
