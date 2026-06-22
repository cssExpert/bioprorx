import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, LayoutChangeEvent } from 'react-native';
import { Colors } from '@/src/constants/colors';
import { Font } from '@/src/constants/typography';
import { FontSize, Radius, Shadow } from '@/src/constants/mixins';

interface Props {
  tabs: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
}

export default function SegmentedControl({ tabs, selectedIndex, onChange }: Props) {
  const [containerWidth, setContainerWidth] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const PADDING = 4;
  const tabWidth = containerWidth > 0 ? (containerWidth - PADDING * 2) / tabs.length : 0;

  useEffect(() => {
    if (tabWidth > 0) {
      Animated.spring(slideAnim, {
        toValue: selectedIndex * tabWidth,
        useNativeDriver: true,
        damping: 20,
        stiffness: 300,
        mass: 0.8,
      }).start();
    }
  }, [selectedIndex, tabWidth, slideAnim]);

  const handleLayout = (e: LayoutChangeEvent) => {
    setContainerWidth(e.nativeEvent.layout.width);
  };

  return (
    <View
      onLayout={handleLayout}
      style={{
        flexDirection: 'row',
        backgroundColor: Colors.surface,
        borderRadius: Radius.full,
        padding: PADDING,
        borderWidth: 1,
        borderColor: Colors.border,
        position: 'relative',
        ...Shadow.sm,
      }}
    >
      {tabWidth > 0 && (
        <Animated.View
          style={{
            position: 'absolute',
            top: PADDING,
            left: PADDING,
            width: tabWidth,
            bottom: PADDING,
            backgroundColor: Colors.primaryLight,
            borderRadius: Radius.full,
            transform: [{ translateX: slideAnim }],
          }}
        />
      )}
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={tab}
          onPress={() => onChange(index)}
          activeOpacity={0.7}
          style={{
            flex: 1,
            alignItems: 'center',
            paddingVertical: 11,
            zIndex: 1,
          }}
        >
          <Text
            style={{
              fontSize: FontSize.md,
              fontFamily: selectedIndex === index ? Font.bodySemiBold : Font.body,
              color: selectedIndex === index ? Colors.white : Colors.textSecondary,
            }}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
