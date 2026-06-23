import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Icon from '@/components/common/Icon';
import { Font } from '@/src/constants/typography';
import { Colors } from '@/src/constants/colors';
import { Radius, Height, FontSize } from '@/src/constants/mixins';

const SCREEN_H = Dimensions.get('window').height;

export type DropdownOption = {
  label: string;
  value: string;
};

type DropdownProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  placeholder?: string;
  error?: string;
  marginTop?: number;
};

export default function Dropdown({
  label,
  value,
  onChange,
  options,
  placeholder = 'Select',
  error,
  marginTop = 0,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [triggerHeight, setTriggerHeight] = useState(0);
  const [openAbove, setOpenAbove] = useState(false);
  const containerRef = useRef<View>(null);
  const selected = options.find((o) => o.value === value);
  const dropdownHeight = Math.min(options.length * 48, 220);

  const handleOpen = () => {
    containerRef.current?.measure((_x, _y, _w, _h, _pageX, pageY) => {
      const spaceBelow = SCREEN_H - pageY - triggerHeight;
      setOpenAbove(spaceBelow < dropdownHeight);
      setOpen(true);
    });
  };

  return (
    <View ref={containerRef} collapsable={false} style={{ marginTop, zIndex: open ? 1000 : 1 }}>
      {/* Trigger area */}
      <View onLayout={(e) => setTriggerHeight(e.nativeEvent.layout.height)}>
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
        <TouchableOpacity
          onPress={open ? () => setOpen(false) : handleOpen}
          activeOpacity={0.8}
          style={{
            height: Height.lg,
            backgroundColor: Colors.fieldBg,
            borderWidth: 1,
            borderColor: error ? Colors.error : open ? Colors.link : Colors.fieldBorder,
            borderRadius: Radius.md,
            paddingHorizontal: 14,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              fontSize: FontSize.md,
              fontFamily: Font.bodyMedium,
              color: selected ? Colors.textPrimary : Colors.placeholder,
            }}
          >
            {selected ? selected.label : placeholder}
          </Text>
          <Icon
            name={open ? 'ChevronUpIcon' : 'ChevronDownIcon'}
            size="16"
            viewBox="0 0 24 24"
            color={Colors.textMuted}
          />
        </TouchableOpacity>
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

      {open && (
        <View
          style={{
            position: 'absolute',
            ...(openAbove ? { top: -(dropdownHeight + 4) } : { top: triggerHeight + 4 }),
            left: 0,
            right: 0,
            backgroundColor: Colors.white,
            borderRadius: Radius.md,
            borderWidth: 1,
            borderColor: Colors.fieldBorder,
            maxHeight: dropdownHeight,
            paddingVertical: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 8,
            overflow: 'hidden',
            zIndex: 1000,
          }}
        >
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  style={{
                    height: Height.md,
                    paddingHorizontal: 14,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: isSelected ? Colors.selectedBg : Colors.white,
                  }}
                >
                  <Text
                    style={{
                      fontSize: FontSize.md,
                      fontFamily: isSelected ? Font.bodySemiBold : Font.body,
                      color: isSelected ? Colors.brandAccent : Colors.textMuted,
                    }}
                  >
                    {option.label}
                  </Text>
                  {isSelected && (
                    <Icon
                      name="CheckIcon"
                      size="14"
                      viewBox="0 0 24 24"
                      color={Colors.brandAccent}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
