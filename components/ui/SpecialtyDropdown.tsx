import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SPECIALTIES } from '@/src/constants/specialties';
import { Colors } from '@/src/constants/colors';
import { Font } from '@/src/constants/typography';
import { FontSize, Radius, Shadow } from '@/src/constants/mixins';
import Icon from '@/components/common/Icon';

const SCREEN_W = Dimensions.get('window').width;

interface TriggerLayout {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Props {
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function SpecialtyDropdown({ selectedId, onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const [layout, setLayout] = useState<TriggerLayout | null>(null);
  const triggerRef = useRef<View>(null);

  const selected = SPECIALTIES.find((s) => s.id === selectedId) ?? SPECIALTIES[0];

  const handleOpen = () => {
    triggerRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
      setLayout({ x: pageX, y: pageY, width, height });
      setOpen(true);
    });
  };

  const handleSelect = (id: string) => {
    onSelect(id);
    setOpen(false);
  };

  const dropdownRight = layout ? SCREEN_W - layout.x - layout.width : 16;

  return (
    <>
      <View ref={triggerRef} collapsable={false}>
        <TouchableOpacity
          onPress={handleOpen}
          activeOpacity={0.8}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Colors.white,
            borderWidth: 1,
            borderColor: Colors.border,
            borderRadius: Radius.lg,
            paddingHorizontal: 12,
            paddingVertical: 8,
            gap: 8,
            ...Shadow.sm,
          }}
        >
          <Image
            source={selected.graphic}
            style={{ width: 22, height: 22 }}
            resizeMode="contain"
          />
          <Image
            source={selected.logo}
            style={{ width: 84, height: 24 }}
            resizeMode="contain"
          />
          <Icon
            name={open ? 'ChevronUpIcon' : 'ChevronDownIcon'}
            size="16"
            viewBox="0 0 24 24"
            color={Colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => setOpen(false)}
          activeOpacity={1}
        >
          {layout && (
            <View
              style={{
                position: 'absolute',
                top: layout.y + layout.height + 6,
                right: dropdownRight < 0 ? 16 : dropdownRight,
                backgroundColor: Colors.white,
                borderRadius: Radius.lg,
                borderWidth: 1,
                borderColor: Colors.border,
                minWidth: 220,
                maxHeight: 380,
                overflow: 'hidden',
                ...Shadow.lg,
              }}
            >
              <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                {SPECIALTIES.map((sp, index) => {
                  const isSelected = sp.id === selectedId;
                  return (
                    <TouchableOpacity
                      key={sp.id}
                      onPress={() => handleSelect(sp.id)}
                      activeOpacity={0.7}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 14,
                        paddingVertical: 10,
                        gap: 10,
                        backgroundColor: isSelected ? Colors.selectedBg : Colors.white,
                        borderBottomWidth: index < SPECIALTIES.length - 1 ? 1 : 0,
                        borderBottomColor: Colors.divider,
                      }}
                    >
                      <Image
                        source={sp.graphic}
                        style={{ width: 32, height: 32 }}
                        resizeMode="contain"
                      />
                      <Image
                        source={sp.logo}
                        style={{ width: 100, height: 26 }}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          )}
        </TouchableOpacity>
      </Modal>
    </>
  );
}
