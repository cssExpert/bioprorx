import React from 'react';
import { View, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  transparent?: boolean;
  light?: boolean;
  style?: ViewStyle;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  onBack,
  rightAction,
  transparent = false,
  light = false,
  style,
}) => {
  const router = useRouter();
  const textColor = light ? Colors.white : Colors.textPrimary;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 12,
          backgroundColor: transparent ? 'transparent' : Colors.white,
          borderBottomWidth: transparent ? 0 : 1,
          borderBottomColor: Colors.border,
        },
        style,
      ]}
    >
      {showBack && (
        <TouchableOpacity
          onPress={handleBack}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: light ? 'rgba(255,255,255,0.15)' : Colors.surface,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
          }}
          activeOpacity={0.7}
        >
          <Text style={{ fontSize: 18, color: textColor }}>←</Text>
        </TouchableOpacity>
      )}

      <View style={{ flex: 1 }}>
        {title && (
          <Text
            style={{ fontSize: 18, fontWeight: '700', color: textColor }}
            numberOfLines={1}
          >
            {title}
          </Text>
        )}
        {subtitle && (
          <Text
            style={{
              fontSize: 13,
              color: light ? 'rgba(255,255,255,0.7)' : Colors.textMuted,
              marginTop: 2,
            }}
          >
            {subtitle}
          </Text>
        )}
      </View>

      {rightAction && <View>{rightAction}</View>}
    </View>
  );
};
