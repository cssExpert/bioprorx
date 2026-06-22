import React, { useEffect, useRef } from 'react';
import { Tabs } from 'expo-router';
import { View, Platform, TouchableOpacity, Animated, Dimensions } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Colors, Palette } from '@/src/constants/colors';
import Icon from '@/components/common/Icon';

const { width: SCREEN_W } = Dimensions.get('window');
const TAB_COUNT = 5;
const TAB_W = SCREEN_W / TAB_COUNT;
const DOT_SIZE = 5;
const ACTIVE = Palette.deepPurple;
const INACTIVE = '#8F9BB3';

// Maps each route name → its icon renderer
const TAB_ICONS: Record<string, (focused: boolean) => React.ReactNode> = {
  dashboard: (f) => (
    <Icon name="HomeIcon" size="28" color={f ? ACTIVE : INACTIVE} viewBox="0 0 24 24" />
  ),
  patients: (f) => (
    <Icon name="PatientIcon" size="28" color={f ? ACTIVE : INACTIVE} viewBox="0 0 24 24" />
  ),
  'pa-board': (f) => (
    <Icon name="PABoardIcon" size="28" color={f ? ACTIVE : INACTIVE} viewBox="0 0 24 24" />
  ),
  notifications: (f) => (
    <Icon name="AlertIcon" size="28" color={f ? ACTIVE : INACTIVE} viewBox="0 0 24 24" />
  ),
  settings: (f) => (
    <Icon name="SettingsIcon" size="28" color={f ? ACTIVE : INACTIVE} viewBox="0 0 24 24" />
  ),
};

function AnimatedTabBar({ state, navigation }: BottomTabBarProps) {
  // Start the dot centred under tab 0
  const dotX = useRef(new Animated.Value(TAB_W / 2 - DOT_SIZE / 2)).current;

  useEffect(() => {
    Animated.spring(dotX, {
      toValue: state.index * TAB_W + TAB_W / 2 - DOT_SIZE / 2,
      useNativeDriver: true,
      damping: 14,
      stiffness: 200,
      mass: 0.7,
    }).start();
  }, [dotX, state.index]);

  const BAR_H = Platform.OS === 'ios' ? 82 : 64;
  const PB = Platform.OS === 'ios' ? 26 : 10;

  return (
    <View
      style={{
        height: BAR_H,
        backgroundColor: Colors.white,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: PB,
      }}
    >
      {/* Tab buttons */}
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const renderIcon = TAB_ICONS[route.name];

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            activeOpacity={0.75}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {renderIcon?.(focused)}
          </TouchableOpacity>
        );
      })}

      {/* Sliding active dot — sits at the bottom of the icon area */}
      <Animated.View
        pointerEvents="none"
        style={{
          position: 'absolute',
          bottom: PB,
          left: 0,
          width: DOT_SIZE,
          height: DOT_SIZE,
          borderRadius: DOT_SIZE / 2,
          backgroundColor: ACTIVE,
          transform: [{ translateX: dotX }],
        }}
      />
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs tabBar={(props) => <AnimatedTabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="dashboard" />
      <Tabs.Screen name="patients" />
      <Tabs.Screen name="pa-board" />
      <Tabs.Screen name="notifications" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}
