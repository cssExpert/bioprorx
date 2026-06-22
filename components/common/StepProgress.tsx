import React from 'react';
import { View, Text } from 'react-native';
import { Colors } from '@/src/constants/colors';
import { FontSize } from '@/src/constants/mixins';

type Props = {
  current: number;
  total?: number;
  label?: string;
};

export default function StepProgress({ current, total = 4, label }: Props) {
  return (
    <View style={{ marginTop: 20, marginBottom: 20 }}>
      <View style={{ flexDirection: 'row', gap: 6, marginBottom: 10 }}>
        {Array.from({ length: total }).map((_, i) => (
          <View
            key={i}
            style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              backgroundColor: i < current ? Colors.primary : Colors.border,
            }}
          />
        ))}
      </View>
      {label ? (
        <Text style={{ fontSize: FontSize.sm, color: Colors.muted }}>{label}</Text>
      ) : null}
    </View>
  );
}
