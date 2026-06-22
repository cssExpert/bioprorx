import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Font } from '@/src/constants/typography';
import { Colors } from '@/src/constants/colors';
import { Radius, FontSize } from '@/src/constants/mixins';

type TextareaProps = {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  numberOfLines?: number;
  maxLength?: number;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  onFocus?: () => void;
  onBlur?: () => void;
  marginTop?: number;
};

export default function Textarea({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  numberOfLines = 4,
  maxLength,
  autoCapitalize = 'sentences',
  onFocus,
  onBlur,
  marginTop = 0,
}: TextareaProps) {
  const [focused, setFocused] = useState(false);
  const minHeight = numberOfLines * 24 + 16;

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
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.placeholder}
        autoCapitalize={autoCapitalize}
        multiline
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        textAlignVertical="top"
        onFocus={() => {
          setFocused(true);
          onFocus?.();
        }}
        onBlur={() => {
          setFocused(false);
          onBlur?.();
        }}
        style={{
          minHeight,
          backgroundColor: Colors.fieldBg,
          borderWidth: 1,
          borderColor: error ? Colors.error : focused ? Colors.focusBorder : Colors.fieldBorder,
          borderRadius: Radius.lg,
          paddingHorizontal: 16,
          paddingVertical: 14,
          fontSize: FontSize.md,
          fontFamily: Font.body,
          color: Colors.textPrimary,
        }}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
        {error ? (
          <Text style={{ fontSize: FontSize.sm, fontFamily: Font.body, color: Colors.error }}>{error}</Text>
        ) : (
          <View />
        )}
        {maxLength && (
          <Text style={{ fontSize: FontSize.xs2, fontFamily: Font.body, color: Colors.textMuted }}>
            {value.length}/{maxLength}
          </Text>
        )}
      </View>
    </View>
  );
}
