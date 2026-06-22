import React, { useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Font } from '@/src/constants/typography';
import { Colors } from '@/src/constants/colors';
import { Radius, FontSize } from '@/src/constants/mixins';

type OTPInputProps = {
  value: string;
  onChange: (value: string) => void;
  length?: number;
};

export default function OTPInput({ value, onChange, length = 6 }: OTPInputProps) {
  const inputs = useRef<(TextInput | null)[]>([]);
  const digits = value.split('').concat(Array(length).fill('')).slice(0, length);

  const handleChange = (text: string, index: number) => {
    const digit = text.replace(/[^0-9]/g, '').slice(-1);
    const next = digits.map((d, i) => (i === index ? digit : d));
    onChange(next.join(''));
    if (digit && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace') {
      if (digits[index]) {
        const next = digits.map((d, i) => (i === index ? '' : d));
        onChange(next.join(''));
      } else if (index > 0) {
        inputs.current[index - 1]?.focus();
        const next = digits.map((d, i) => (i === index - 1 ? '' : d));
        onChange(next.join(''));
      }
    }
  };

  return (
    <View style={styles.row}>
      {digits.map((digit, i) => (
        <TextInput
          key={i}
          ref={(r) => { inputs.current[i] = r; }}
          value={digit}
          onChangeText={(t) => handleChange(t, i)}
          onKeyPress={({ nativeEvent: { key } }) => handleKeyPress(key, i)}
          keyboardType="number-pad"
          maxLength={1}
          selectTextOnFocus
          style={[
            styles.box,
            digit ? styles.boxFilled : styles.boxEmpty,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  box: {
    flex: 1,
    height: 52,
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    borderWidth: 1.5,
    textAlign: 'center',
    fontSize: FontSize.xxl,
    fontFamily: Font.bodyBold,
    color: Colors.textPrimary,
  },
  boxEmpty: {
    borderColor: Colors.fieldBorder,
  },
  boxFilled: {
    borderColor: Colors.brandAccent,
    backgroundColor: Colors.selectedBg,
  },
});
