import React from 'react';
import { View, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { height: SCREEN_H } = Dimensions.get('window');

type ScreenShadesProps = {
  showTop?: boolean;
  showBottom?: boolean;
  topColor?: string;
  bottomColor?: string;
  topHeight?: number;
  bottomHeight?: number;
};

export default function ScreenShades({
  showTop = true,
  showBottom = true,
  topColor = 'rgba(109, 141, 242, 0.4)',
  bottomColor = 'rgba(109, 141, 242, 0.25)',
  topHeight = SCREEN_H * 0.5,
  bottomHeight = SCREEN_H * 0.4,
}: ScreenShadesProps) {
  return (
    <>
      {showTop && (
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: topHeight,
          }}
        >
          <LinearGradient
            colors={[topColor, 'rgba(238,240,248,0)']}
            locations={[0, 1]}
            style={{ flex: 1 }}
          />
        </View>
      )}

      {showBottom && (
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: bottomHeight,
          }}
        >
          <LinearGradient
            colors={['rgba(230,227,241,0)', bottomColor]}
            locations={[0, 1]}
            style={{ flex: 1 }}
          />
        </View>
      )}
    </>
  );
}
