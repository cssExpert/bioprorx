import React, { useState } from 'react';
import { View, Text, TextInput, TextInputProps, TouchableOpacity, ViewStyle } from 'react-native';
import { Colors } from '@/src/constants/colors';
import { FontSize, Height, Radius } from '@/src/constants/mixins';
import { Font } from '@/src/constants/typography';

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

  const borderColor = error ? Colors.error : focused ? Colors.link : Colors.border;

  return (
    <View style={[{ marginBottom: 16 }, containerStyle]}>
      {label && (
        <Text
          style={{
            fontSize: FontSize.sm,
            fontFamily: Font.bodySemiBold,
            color: Colors.textPrimary,
            marginBottom: 4,
            letterSpacing: 0.1,
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
          borderRadius: Radius.md,
          paddingHorizontal: FontSize.xsPlus,
          minHeight: Height.lg,
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
            fontSize: FontSize.base,
            color: Colors.link,
            paddingVertical: 12,
          }}
          placeholderTextColor={Colors.muted}
        />
        {secureToggle && (
          <TouchableOpacity onPress={() => setSecure(!secure)} style={{ padding: 4 }}>
            <Text style={{ fontSize: FontSize.base, color: Colors.primary, fontWeight: '600' }}>
              {secure ? 'Show' : 'Hide'}
            </Text>
          </TouchableOpacity>
        )}
        {rightIcon && !secureToggle && <View style={{ marginLeft: 10 }}>{rightIcon}</View>}
      </View>

      {error && (
        <Text style={{ fontSize: FontSize.xsPlus, color: Colors.error, marginTop: 4 }}>
          {error}
        </Text>
      )}
      {hint && !error && (
        <Text style={{ fontSize: 12, color: Colors.muted, marginTop: 4 }}>{hint}</Text>
      )}
    </View>
  );
};
