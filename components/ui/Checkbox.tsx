import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from '@/components/common/Icon';
import { Font } from '@/src/constants/typography';
import { Colors } from '@/src/constants/colors';
import { Radius, FontSize, LineHeight, Height } from '@/src/constants/mixins';

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string | React.ReactNode;
  error?: string;
  marginTop?: number;
};

export default function Checkbox({
  checked,
  onChange,
  label,
  error,
  marginTop = 0,
}: CheckboxProps) {
  const [multiline, setMultiline] = useState(false);

  return (
    <View style={{ marginTop }}>
      <TouchableOpacity
        onPress={() => onChange(!checked)}
        activeOpacity={0.75}
        style={{ flexDirection: 'row', alignItems: multiline ? 'flex-start' : 'center', gap: 10 }}
      >
        <View
          style={{
            width: Height.xxs,
            height: Height.xxs,
            borderRadius: Radius.sm,
            borderWidth: checked ? 0 : 2,
            borderColor: error ? Colors.error : Colors.fieldBorder,
            backgroundColor: checked ? Colors.primary : Colors.white,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: multiline ? 2 : 0,
            flexShrink: 0,
          }}
        >
          {checked && <Icon name="CheckIcon" size="16" viewBox="0 0 24 24" color={Colors.white} />}
        </View>
        {label && (
          <View style={{ flex: 1 }}>
            {typeof label === 'string' ? (
              <Text
                onTextLayout={(e) => setMultiline(e.nativeEvent.lines.length > 1)}
                style={{
                  fontSize: FontSize.md,
                  fontFamily: Font.body,
                  color: Colors.textSecondary,
                  lineHeight: LineHeight.md,
                }}
              >
                {label}
              </Text>
            ) : (
              label
            )}
          </View>
        )}
      </TouchableOpacity>
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
