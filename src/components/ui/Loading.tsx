import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { Colors } from '../../constants/colors';

interface LoadingProps {
  fullscreen?: boolean;
  message?: string;
  size?: 'small' | 'large';
  color?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  fullscreen = false,
  message,
  size = 'large',
  color = Colors.primary,
}) => {
  if (fullscreen) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.surface,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
        }}
      >
        <ActivityIndicator size={size} color={color} />
        {message && (
          <Text style={{ fontSize: 14, color: Colors.textSecondary, textAlign: 'center' }}>
            {message}
          </Text>
        )}
      </View>
    );
  }

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', padding: 24, gap: 12 }}>
      <ActivityIndicator size={size} color={color} />
      {message && (
        <Text style={{ fontSize: 14, color: Colors.textSecondary }}>{message}</Text>
      )}
    </View>
  );
};
