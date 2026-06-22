import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardTypeOptions } from 'react-native';
import Icon from '@/components/common/Icon';
import { Font } from '@/src/constants/typography';
import { Colors } from '@/src/constants/colors';
import { Radius, Height, FontSize } from '@/src/constants/mixins';

type InputProps = {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  editable?: boolean;
  multiline?: never;
  rightIcon?: React.ReactNode;
  onFocus?: () => void;
  onBlur?: () => void;
  marginTop?: number;
};

export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  editable = true,
  rightIcon,
  onFocus,
  onBlur,
  marginTop = 0,
}: InputProps) {
  const [focused, setFocused] = useState(false);
  const [showSecure, setShowSecure] = useState(false);

  const hasSecureToggle = secureTextEntry;

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
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={editable}
          secureTextEntry={hasSecureToggle ? !showSecure : false}
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
            backgroundColor: editable ? Colors.fieldBg : Colors.surface,
            borderWidth: 1,
            borderColor: error ? Colors.error : focused ? Colors.focusBorder : Colors.fieldBorder,
            borderRadius: Radius.md,
            paddingHorizontal: 16,
            paddingRight: hasSecureToggle || rightIcon ? 48 : 16,
            fontSize: FontSize.md,
            fontFamily: Font.bodyMedium,
            color: Colors.textPrimary,
          }}
        />
        {hasSecureToggle && (
          <TouchableOpacity
            onPress={() => setShowSecure((prev) => !prev)}
            style={{ position: 'absolute', right: 14, top: 0, bottom: 0, justifyContent: 'center' }}
          >
            <Icon
              name={showSecure ? 'EyeIcon' : 'EyeOffIcon'}
              size="20"
              viewBox="0 0 24 24"
              color={Colors.textMuted}
            />
          </TouchableOpacity>
        )}
        {!hasSecureToggle && rightIcon && (
          <View
            style={{ position: 'absolute', right: 14, top: 0, bottom: 0, justifyContent: 'center' }}
          >
            {rightIcon}
          </View>
        )}
      </View>
      {error && (
        <Text
          style={{
            fontSize: FontSize.sm,
            fontFamily: Font.body,
            color: Colors.error,
            marginTop: 4,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
}
