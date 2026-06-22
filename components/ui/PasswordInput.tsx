import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from '@/components/common/Icon';
import { Font } from '@/src/constants/typography';
import { Colors } from '@/src/constants/colors';
import { Radius, Height, FontSize } from '@/src/constants/mixins';

type PasswordInputProps = {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  onBlur?: () => void;
  onFocus?: () => void;
  marginTop?: number;
};

export default function PasswordInput({
  label = 'Password',
  value,
  onChangeText,
  placeholder = '••••••••',
  error,
  onBlur,
  onFocus,
  marginTop = 0,
}: PasswordInputProps) {
  const [focused, setFocused] = useState(false);
  const [show, setShow] = useState(false);

  return (
    <View style={{ marginTop }}>
      {label && (
        <Text
          style={{
            fontSize: FontSize.base,
            fontFamily: Font.bodyMedium,
            color: Colors.textLabel,
            marginBottom: 8,
          }}
        >
          {label}
        </Text>
      )}
      <View style={{ position: 'relative' }}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.placeholder}
          secureTextEntry={!show}
          autoCapitalize="none"
          autoCorrect={false}
          onFocus={() => {
            setFocused(true);
            onFocus?.();
          }}
          onBlur={() => {
            setFocused(false);
            onBlur?.();
          }}
          style={{
            height: Height.lg,
            backgroundColor: Colors.fieldBg,
            borderWidth: 1,
            borderColor: error ? Colors.error : focused ? Colors.focusBorder : Colors.fieldBorder,
            borderRadius: Radius.md,
            paddingHorizontal: 16,
            paddingRight: 48,
            fontSize: FontSize.md,
            fontFamily: Font.bodyMedium,
            color: Colors.textPrimary,
          }}
        />
        <TouchableOpacity
          onPress={() => setShow((prev) => !prev)}
          style={{
            position: 'absolute',
            right: 14,
            top: 0,
            bottom: 0,
            justifyContent: 'center',
          }}
        >
          <Icon
            name={show ? 'EyeIcon' : 'EyeOffIcon'}
            size="20"
            viewBox="0 0 24 24"
            color={Colors.textMuted}
          />
        </TouchableOpacity>
      </View>
      {error && (
        <Text style={{ fontSize: FontSize.sm, fontFamily: Font.body, color: Colors.error, marginTop: 4 }}>
          {error}
        </Text>
      )}
    </View>
  );
}
