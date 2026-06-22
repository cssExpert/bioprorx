import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Font } from '@/src/constants/typography';
import { Colors } from '@/src/constants/colors';
import { Radius, FontSize } from '@/src/constants/mixins';

type RadioOption = {
  label: string;
  value: string;
};

type RadioProps = {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  direction?: 'row' | 'column';
  marginTop?: number;
};

export default function Radio({
  options,
  value,
  onChange,
  label,
  error,
  direction = 'column',
  marginTop = 0,
}: RadioProps) {
  return (
    <View style={{ marginTop }}>
      {label && (
        <Text
          style={{
            fontSize: FontSize.base,
            fontFamily: Font.bodyMedium,
            color: Colors.textLabel,
            marginBottom: 10,
          }}
        >
          {label}
        </Text>
      )}
      <View style={{ flexDirection: direction, flexWrap: 'wrap', gap: direction === 'row' ? 16 : 10 }}>
        {options.map(option => {
          const selected = option.value === value;
          return (
            <TouchableOpacity
              key={option.value}
              onPress={() => onChange(option.value)}
              activeOpacity={0.75}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: Radius.md,
                  borderWidth: selected ? 0 : 1.5,
                  borderColor: error ? Colors.error : Colors.fieldBorder,
                  backgroundColor: selected ? Colors.brandAccent : Colors.white,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {selected && (
                  <View
                    style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.white }}
                  />
                )}
              </View>
              <Text
                style={{
                  fontSize: FontSize.md,
                  fontFamily: selected ? Font.bodyMedium : Font.body,
                  color: selected ? Colors.textPrimary : Colors.textSecondary,
                }}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {error && (
        <Text style={{ fontSize: FontSize.sm, fontFamily: Font.body, color: Colors.error, marginTop: 6 }}>
          {error}
        </Text>
      )}
    </View>
  );
}
