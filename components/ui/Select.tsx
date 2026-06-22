import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '@/components/common/Icon';
import { Font } from '@/src/constants/typography';
import { Colors } from '@/src/constants/colors';

export type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  marginTop?: number;
};

export default function Select({
  label,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  error,
  marginTop = 0,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const selected = options.find(o => o.value === value);

  return (
    <View style={{ marginTop }}>
      {label && (
        <Text
          style={{
            fontSize: 13,
            fontFamily: Font.bodyMedium,
            color: Colors.textLabel,
            marginBottom: 8,
          }}
        >
          {label}
        </Text>
      )}
      <TouchableOpacity
        onPress={() => setOpen(true)}
        activeOpacity={0.8}
        style={{
          height: 52,
          backgroundColor: Colors.fieldBg,
          borderWidth: 1,
          borderColor: error ? Colors.error : open ? Colors.focusBorder : Colors.fieldBorder,
          borderRadius: 14,
          paddingHorizontal: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            fontSize: 14,
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
        <Text style={{ fontSize: 12, fontFamily: Font.body, color: Colors.error, marginTop: 4 }}>
          {error}
        </Text>
      )}

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: Colors.overlay }}
          activeOpacity={1}
          onPress={() => setOpen(false)}
        >
          <SafeAreaView style={{ flex: 1, justifyContent: 'flex-end' }}>
            <StatusBar barStyle="light-content" />
            <View
              style={{
                backgroundColor: Colors.white,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                paddingTop: 8,
                maxHeight: '60%',
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
                    fontSize: 15,
                    fontFamily: Font.bodyBold,
                    color: Colors.textPrimary,
                    paddingHorizontal: 20,
                    marginBottom: 8,
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
                      onPress={() => {
                        onChange(option.value);
                        setOpen(false);
                      }}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: 20,
                        paddingVertical: 14,
                        backgroundColor: isSelected ? Colors.selectedBg : Colors.white,
                        borderTopWidth: i === 0 ? 1 : 0,
                        borderBottomWidth: 1,
                        borderColor: Colors.divider,
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
                <View style={{ height: 24 }} />
              </ScrollView>
            </View>
          </SafeAreaView>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
