import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { Colors } from '../../constants/colors';
import type { PAStatus } from '../../types/pa';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'default' | PAStatus;

const variantMap: Record<string, { bg: string; text: string }> = {
  success: { bg: Colors.successLight, text: '#15803D' },
  approved: { bg: Colors.successLight, text: '#15803D' },
  warning: { bg: Colors.warningLight, text: '#92400E' },
  pending: { bg: Colors.warningLight, text: '#92400E' },
  error: { bg: Colors.errorLight, text: '#B91C1C' },
  denied: { bg: Colors.errorLight, text: '#B91C1C' },
  info: { bg: Colors.infoLight, text: '#0E7490' },
  submitted: { bg: Colors.infoLight, text: '#0E7490' },
  default: { bg: Colors.borderLight, text: Colors.textSecondary },
  draft: { bg: Colors.borderLight, text: Colors.textSecondary },
  appealing: { bg: '#EDE9FE', text: '#6D28D9' },
};

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'default', style }) => {
  const colors = variantMap[variant] ?? variantMap.default;

  return (
    <View
      style={[
        {
          backgroundColor: colors.bg,
          borderRadius: 100,
          paddingHorizontal: 10,
          paddingVertical: 4,
          alignSelf: 'flex-start',
        },
        style,
      ]}
    >
      <Text style={{ fontSize: 12, fontWeight: '600', color: colors.text }}>
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </Text>
    </View>
  );
};
