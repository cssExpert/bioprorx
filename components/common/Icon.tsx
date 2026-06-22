import React from 'react';
import { View } from 'react-native';
import Svg from 'react-native-svg';
import Icons, { IconNames } from './Icons';

interface IconProperties {
  viewBox?: string;
  title?: string;
  fill?: string;
  stroke?: string;
  color?: string;
  opacity?: string;
  size?:
    | '8'
    | '10'
    | '12'
    | '14'
    | '16'
    | '18'
    | '20'
    | '22'
    | '24'
    | '28'
    | '30'
    | '32'
    | '36'
    | '40'
    | '60'
    | '74';
  name: IconNames;
}

const Icon: React.FC<IconProperties> = ({
  viewBox = '0 0 32 32',
  size = '16',
  name,
  color,
  opacity,
}) => (
  <View style={opacity !== undefined ? { opacity: Number(opacity) } : undefined}>
    <Svg width={Number(size)} height={Number(size)} viewBox={viewBox} fill="none" color={color}>
      {Icons[name] ? Icons[name]() : Icons.BrandMark()}
    </Svg>
  </View>
);

export default Icon;
