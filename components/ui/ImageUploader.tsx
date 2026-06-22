import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from '@/components/common/Icon';
import { Font } from '@/src/constants/typography';
import { Colors } from '@/src/constants/colors';
import { FontSize, LineHeight } from '@/src/constants/mixins';

type ImageUploaderProps = {
  title?: string;
  description?: string;
  buttonLabel?: string;
  onPress: () => void;
  marginTop?: number;
};

export default function ImageUploader({
  title = 'Scan Insurance Card',
  description = 'Use camera to scan front and back of card. Fields auto-fill instantly.',
  buttonLabel = 'Open Camera',
  onPress,
  marginTop = 0,
}: ImageUploaderProps) {
  return (
    <View
      style={{
        marginTop,
        borderWidth: 1.5,
        borderColor: Colors.divider,
        borderStyle: 'dashed',
        borderRadius: 16,
        backgroundColor: Colors.white,
        paddingVertical: 36,
        paddingHorizontal: 28,
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: 72,
          height: 72,
          borderRadius: 36,
          backgroundColor: Colors.surface,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 18,
        }}
      >
        <Icon name="CameraIcon" size="36" viewBox="0 0 24 24" color={Colors.navy} />
      </View>

      <Text
        style={{
          fontSize: FontSize.xxl,
          fontFamily: Font.bodyBold,
          color: Colors.textPrimary,
          textAlign: 'center',
          marginBottom: 10,
        }}
      >
        {title}
      </Text>

      <Text
        style={{
          fontSize: FontSize.md,
          fontFamily: Font.body,
          color: Colors.textMuted,
          textAlign: 'center',
          lineHeight: LineHeight.lg,
          marginBottom: 24,
        }}
      >
        {description}
      </Text>

      <TouchableOpacity onPress={onPress} activeOpacity={0.75}>
        <Text
          style={{
            fontSize: FontSize.lg,
            fontFamily: Font.bodyBold,
            color: Colors.brandAccent,
          }}
        >
          {buttonLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
