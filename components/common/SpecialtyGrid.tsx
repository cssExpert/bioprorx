import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, StyleSheet } from 'react-native';
import { Colors } from '@/src/constants/colors';
import { SPECIALTIES } from '@/src/constants/specialties';
import { Radius, FontSize } from '@/src/constants/mixins';
import { Font } from '@/src/constants/typography';
import Icon from '@/components/common/Icon';

const { width: SCREEN_W } = Dimensions.get('window');
const H_PAD = 20;
const GAP = 12;
const TILE_W = (SCREEN_W - H_PAD * 2 - GAP) / 2;
const TILE_H = TILE_W * 0.6;
const GRAPHIC_SIZE = 42;

const TILE_BG: Record<string, string> = {
  rheumatology: '#401268',
  gastroenterology: '#9392C7',
  dermatology: '#0CC0DF',
  neurology: '#BC40DE',
  pulmonology: '#56AEFF',
  allergy: '#3DE0D2',
  endocrinology: '#E420D1',
  cardiology: '#EF3A5D',
  ophthalmology: '#00577D',
};

type Props = {
  selected: string[];
  onPress: (id: string) => void;
  primaryId?: string;
  excludeIds?: string[];
  disabledIds?: string[];
};

export default function SpecialtyGrid({
  selected,
  onPress,
  primaryId,
  excludeIds = [],
  disabledIds = [],
}: Props) {
  const visible = SPECIALTIES.filter((s) => !excludeIds.includes(s.id));

  return (
    <View style={styles.grid}>
      {visible.map((spec) => {
        const isSelected = selected.includes(spec.id) || spec.id === primaryId;
        const isDisabled = disabledIds.includes(spec.id);
        const tileBg = TILE_BG[spec.id] ?? '#EAE8F5';

        return (
          <TouchableOpacity
            key={spec.id}
            onPress={() => !isDisabled && onPress(spec.id)}
            activeOpacity={isDisabled ? 1 : 0.82}
            style={[
              styles.tile,
              {
                backgroundColor: `${tileBg}1a`,
                // borderColor: `${tileBg}4d`,
                // borderWidth: 1.5,
                opacity: isDisabled ? 0.35 : 1,
              },
            ]}
          >
            {/* Upper: medical graphic */}
            <View style={styles.graphicWrap}>
              <Image source={spec.graphic} style={styles.graphic} resizeMode="contain" />
            </View>

            {/* Lower: branded text logo image */}
            <View style={styles.logoWrap}>
              <Image
                source={spec.logo}
                style={{ width: TILE_W - 20, height: TILE_H * 0.3 }}
                resizeMode="contain"
              />
            </View>

            {/* Inset selection ring — no layout shift */}
            <View
              pointerEvents="none"
              style={[
                styles.selectedRing,
                {
                  borderColor: isSelected ? tileBg : `${tileBg}4d`, // Brighter border if selected
                  borderWidth: isSelected ? 2.5 : 1.5,
                },
              ]}
            />

            {/* Checkmark — top-right when selected */}
            {isSelected && (
              <View style={styles.check}>
                <Icon name="CheckIcon" size="14" color={Colors.white} viewBox="0 0 24 24" />
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
    justifyContent: 'center',
  },
  tile: {
    width: TILE_W,
    height: TILE_H,
    padding: 10,
    borderRadius: Radius.md,
    overflow: 'hidden',
    flexDirection: 'column',
  },
  graphicWrap: {
    flex: 1,
    minHeight: GRAPHIC_SIZE + 4,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  graphic: {
    width: GRAPHIC_SIZE,
    height: GRAPHIC_SIZE,
  },
  logoWrap: {
    alignItems: 'flex-start',
    height: Math.round(TILE_H * 0.28),
    justifyContent: 'flex-end',
  },
  selectedRing: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    // borderColor: `${TILE_BG.rheumatology}4d`,
  },
  selectedRing2: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: Radius.md,
    borderWidth: 2.5,
    // borderColor: `${TILE_BG.rheumatology}4d`,
  },
  check: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: FontSize.xxl,
    height: FontSize.xxl,
    borderRadius: FontSize.xxl,
    backgroundColor: Colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
