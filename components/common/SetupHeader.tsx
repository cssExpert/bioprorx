import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Logo from './Logo';
import { Colors } from '@/src/constants/colors';
import Icon from '@/components/common/Icon';

type Props = {
  onBack?: () => void;
};

export default function SetupHeader({ onBack }: Props) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 50 }}>
      {onBack && (
        <TouchableOpacity onPress={onBack} style={{ padding: 4, marginRight: 4 }}>
          <Icon name="ArrowLeftIcon" size="24" color={Colors.navy} viewBox="0 0 24 24" />
        </TouchableOpacity>
      )}
      <Logo marginTop={0} />
    </View>
  );
}
