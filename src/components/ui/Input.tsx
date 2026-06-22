import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Colors } from '../../constants/colors';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  secureToggle?: boolean;
  containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  secureToggle = false,
  containerStyle,
  secureTextEntry,
  ...props
}) => {
  const [secure, setSecure] = useState(secureTextEntry ?? false);
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? Colors.error
    : focused
    ? Colors.primary
    : Colors.border;

  return (
    <View style={[{ marginBottom: 16 }, containerStyle]}>
      {label && (
        <Text
          style={{
            fontSize: 13,
            fontWeight: '600',
            color: Colors.textSecondary,
            marginBottom: 6,
            letterSpacing: 0.3,
          }}
        >
          {label}
        </Text>
      )}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: Colors.white,
          borderWidth: 1.5,
          borderColor,
          borderRadius: 12,
          paddingHorizontal: 14,
          minHeight: 50,
        }}
      >
        {leftIcon && <View style={{ marginRight: 10 }}>{leftIcon}</View>}
        <TextInput
          {...props}
          secureTextEntry={secure}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          style={{
            flex: 1,
            fontSize: 15,
            color: Colors.textPrimary,
            paddingVertical: 12,
          }}
          placeholderTextColor={Colors.muted}
        />
        {secureToggle && (
          <TouchableOpacity onPress={() => setSecure(!secure)} style={{ padding: 4 }}>
            <Text style={{ fontSize: 13, color: Colors.primary, fontWeight: '600' }}>
              {secure ? 'Show' : 'Hide'}
            </Text>
          </TouchableOpacity>
        )}
        {rightIcon && !secureToggle && <View style={{ marginLeft: 10 }}>{rightIcon}</View>}
      </View>

      {error && (
        <Text style={{ fontSize: 12, color: Colors.error, marginTop: 4 }}>{error}</Text>
      )}
      {hint && !error && (
        <Text style={{ fontSize: 12, color: Colors.muted, marginTop: 4 }}>{hint}</Text>
      )}
    </View>
  );
};
