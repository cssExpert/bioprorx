import React, { useEffect, useRef, useState } from 'react';
import { Tabs } from 'expo-router';
import { View, Platform, TouchableOpacity, Animated } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Colors, Palette } from '@/src/constants/colors';
import Icon from '@/components/common/Icon';

const DOT_SIZE = 6;
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
  const [barWidth, setBarWidth] = useState(0);

  // 1. Filter out any untracked or auto-generated routes from Expo Router
  const visibleRoutes = state.routes.filter((route) => TAB_ICONS[route.name]);
  const totalTabs = visibleRoutes.length || 5;

  // 2. Calculate accurate dynamic widths based on the visible tabs only
  const tabW = barWidth / totalTabs;

  // Find the true visual index of the active tab within our filtered array
  const activeRouteName = state.routes[state.index]?.name;
  const visualIndex = visibleRoutes.findIndex((r) => r.name === activeRouteName);

  const dotX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (tabW === 0 || visualIndex === -1) return;

    Animated.spring(dotX, {
      toValue: visualIndex * tabW + tabW / 2 - DOT_SIZE / 2,
      useNativeDriver: true,
      damping: 15,
      stiffness: 180,
      mass: 0.8,
    }).start();
  }, [dotX, visualIndex, tabW]);

  const BAR_H = Platform.OS === 'ios' ? 84 : 66;
  const PB = Platform.OS === 'ios' ? 24 : 10;

  return (
    <View
      onLayout={(e) => setBarWidth(e.nativeEvent.layout.width)}
      style={{
        width: '100%',
        height: BAR_H,
        backgroundColor: Colors.white,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        flexDirection: 'row',
        paddingBottom: PB,
      }}
    >
      {/* Dynamic Tab Buttons split across full container layout width */}
      {visibleRoutes.map((route, index) => {
        const focused = visualIndex === index;
        const renderIcon = TAB_ICONS[route.name];

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!focused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            }}
            activeOpacity={0.75}
            style={{
              width: tabW > 0 ? tabW : `${100 / totalTabs}%`,
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              paddingTop: 8,
            }}
          >
            {renderIcon?.(focused)}
          </TouchableOpacity>
        );
      })}

      {/* Sliding active indicator dot */}
      {tabW > 0 && visualIndex !== -1 && (
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
      )}
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
