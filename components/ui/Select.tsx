import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '@/components/common/Icon';
import { Colors } from '@/src/constants/colors';
import { FontSize, Height, Radius } from '@/src/constants/mixins';
import { Font } from '@/src/constants/typography';

const SCREEN_HEIGHT = Dimensions.get('window').height;

export type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  label?: string;
  hideLabel?: boolean;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  marginTop?: number;
};

export default function Select({
  label,
  hideLabel = false,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  error,
  marginTop = 0,
}: SelectProps) {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const { bottom } = useSafeAreaInsets();
  const selected = options.find((o) => o.value === value);

  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  const openSheet = () => {
    setVisible(true);
    setOpen(true);
    Animated.parallel([
      Animated.timing(backdropOpacity, { toValue: 1, duration: 250, useNativeDriver: true }),
      Animated.spring(translateY, {
        toValue: 0,
        damping: 20,
        stiffness: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeSheet = (callback?: () => void) => {
    setOpen(false);
    Animated.parallel([
      Animated.timing(backdropOpacity, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: SCREEN_HEIGHT, duration: 220, useNativeDriver: true }),
    ]).start(() => {
      setVisible(false);
      translateY.setValue(SCREEN_HEIGHT);
      callback?.();
    });
  };

  const handleSelect = (val: string) => {
    closeSheet(() => onChange(val));
  };

  return (
    <View style={{ marginTop }}>
      {label && (
        <Text
          style={{
            fontSize: FontSize.sm,
            fontFamily: Font.bodySemiBold,
            color: Colors.textPrimary,
            marginBottom: 4,
            letterSpacing: 0.1,
            opacity: hideLabel ? 0 : 1,
          }}
        >
          {label}
        </Text>
      )}
      <TouchableOpacity
        onPress={openSheet}
        activeOpacity={0.8}
        style={{
          minHeight: Height.lg,
          backgroundColor: Colors.fieldBg,
          borderWidth: 1,
          borderColor: error ? Colors.error : open ? Colors.link : Colors.fieldBorder,
          borderRadius: Radius.md,
          paddingHorizontal: FontSize.xsPlus,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            fontSize: FontSize.base,
            fontFamily: Font.body,
            color: selected ? Colors.textPrimary : Colors.placeholder,
            flex: 1,
          }}
        >
          {selected ? selected.label : placeholder}
        </Text>
        <Icon
          name={open ? 'ChevronUpIcon' : 'ChevronDownIcon'}
          size="18"
          viewBox="0 0 24 24"
          color={Colors.textMuted}
        />
      </TouchableOpacity>
      {error && (
        <Text
          style={{
            fontSize: FontSize.xsPlus,
            fontFamily: Font.body,
            color: Colors.error,
            marginTop: 4,
          }}
        >
          {error}
        </Text>
      )}

      <Modal visible={visible} transparent animationType="none" onRequestClose={() => closeSheet()}>
        <StatusBar barStyle="light-content" />
        <Animated.View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: `${Colors.textPrimary}E6`,
            opacity: backdropOpacity,
          }}
        >
          <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => closeSheet()} />
          <Animated.View
            style={{
              backgroundColor: Colors.white,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              paddingTop: 8,
              paddingBottom: bottom || 16,
              maxHeight: '60%',
              transform: [{ translateY }],
            }}
          >
            {/* Handle */}
            <View
              style={{
                width: 36,
                height: 4,
                borderRadius: 2,
                backgroundColor: Colors.divider,
                alignSelf: 'center',
                marginBottom: 16,
              }}
            />
            {label && (
              <Text
                style={{
                  fontSize: FontSize.xl,
                  fontFamily: Font.bodyBold,
                  color: Colors.textPrimary,
                  paddingHorizontal: 20,
                  marginBottom: 0,
                  paddingBlockEnd: 12,
                  borderBottomWidth: 1,
                  borderColor: Colors.divider,
                }}
              >
                {label}
              </Text>
            )}
            <ScrollView bounces={false}>
              {options.map((option, i) => {
                const isSelected = option.value === value;
                return (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => handleSelect(option.value)}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingHorizontal: 20,
                      paddingVertical: 14,
                      backgroundColor: isSelected ? Colors.selectedBg : Colors.white,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: isSelected ? Font.bodySemiBold : Font.body,
                        color: isSelected ? Colors.brandAccent : Colors.textPrimary,
                      }}
                    >
                      {option.label}
                    </Text>
                    {isSelected && (
                      <Icon
                        name="CheckIcon"
                        size="18"
                        viewBox="0 0 24 24"
                        color={Colors.brandAccent}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </Animated.View>
        </Animated.View>
      </Modal>
    </View>
  );
}
