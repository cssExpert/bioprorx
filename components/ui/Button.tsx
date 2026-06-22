import React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import Icon from '@/components/common/Icon';
import { IconNames } from '@/components/common/Icons';
import { Font } from '@/src/constants/typography';
import { Colors } from '@/src/constants/colors';
import { Radius, Height, FontSize } from '@/src/constants/mixins';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'deepPurple'
  | 'lavender'
  | 'skyBlue'
  | 'violet'
  | 'cornflower'
  | 'mint'
  | 'magenta'
  | 'coral';

type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  loadingLabel?: string;
  disabled?: boolean;
  leftIcon?: IconNames;
  rightIcon?: IconNames;
  iconViewBox?: string;
  fullWidth?: boolean;
  marginTop?: number;
};

const VARIANT_STYLES: Record<
  ButtonVariant,
  {
    bg: string;
    border: string;
    text: string;
    shadow?: boolean;
  }
> = {
  // Core
  primary: { bg: Colors.navy, border: Colors.navy, text: Colors.white, shadow: true },
  secondary: {
    bg: Colors.brandAccent,
    border: Colors.brandAccent,
    text: Colors.white,
    shadow: true,
  },
  outline: { bg: Colors.transparent, border: Colors.navy, text: Colors.navy },
  ghost: { bg: Colors.transparent, border: Colors.transparent, text: Colors.primary },
  danger: { bg: Colors.error, border: Colors.error, text: Colors.white, shadow: true },
  // Palette
  deepPurple: {
    bg: Colors.btnDeepPurple,
    border: Colors.btnDeepPurple,
    text: Colors.white,
    shadow: true,
  },
  lavender: {
    bg: Colors.btnLavender,
    border: Colors.btnLavender,
    text: Colors.white,
    shadow: true,
  },
  skyBlue: { bg: Colors.btnSkyBlue, border: Colors.btnSkyBlue, text: Colors.white, shadow: true },
  violet: { bg: Colors.btnViolet, border: Colors.btnViolet, text: Colors.white, shadow: true },
  cornflower: {
    bg: Colors.btnCornflower,
    border: Colors.btnCornflower,
    text: Colors.white,
    shadow: true,
  },
  mint: { bg: Colors.btnMint, border: Colors.btnMint, text: Colors.white, shadow: true },
  magenta: { bg: Colors.btnMagenta, border: Colors.btnMagenta, text: Colors.white, shadow: true },
  coral: { bg: Colors.btnCoral, border: Colors.btnCoral, text: Colors.white, shadow: true },
};

const SIZE_STYLES: Record<
  ButtonSize,
  {
    height: number;
    fontSize: number;
    iconSize: '16' | '18' | '20';
    borderRadius: number;
    paddingHorizontal: number;
  }
> = {
  sm: {
    height: Height.sm,
    fontSize: FontSize.base,
    iconSize: '16',
    borderRadius: Radius.sm,
    paddingHorizontal: 14,
  },
  md: {
    height: Height.lg,
    fontSize: FontSize.md,
    iconSize: '18',
    borderRadius: Radius.md,
    paddingHorizontal: 20,
  },
  lg: {
    height: Height.xl,
    fontSize: FontSize.lg,
    iconSize: '20',
    borderRadius: Radius.lg,
    paddingHorizontal: 24,
  },
};

export default function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  loadingLabel,
  disabled = false,
  leftIcon,
  rightIcon,
  iconViewBox = '0 0 24 24',
  fullWidth = true,
  marginTop = 0,
}: ButtonProps) {
  const v = VARIANT_STYLES[variant];
  const s = SIZE_STYLES[size];
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.85}
      style={{
        height: s.height,
        backgroundColor: v.bg,
        borderRadius: s.borderRadius,
        borderWidth: variant === 'outline' ? 1.5 : 0,
        borderColor: v.border,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: s.paddingHorizontal,
        gap: 8,
        marginTop,
        opacity: isDisabled ? 0.55 : 1,
        alignSelf: fullWidth ? 'auto' : 'flex-start',
        ...(v.shadow
          ? {
              shadowColor: v.bg,
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.25,
              shadowRadius: 12,
              elevation: 5,
            }
          : {}),
      }}
    >
      {loading ? (
        <>
          <ActivityIndicator size="small" color={v.text} />
          {loadingLabel && (
            <Text style={{ fontSize: s.fontSize, fontFamily: Font.bodySemiBold, color: v.text }}>
              {loadingLabel}
            </Text>
          )}
        </>
      ) : (
        <>
          {leftIcon && (
            <Icon name={leftIcon} size={s.iconSize} viewBox={iconViewBox} color={v.text} />
          )}
          <Text style={{ fontSize: s.fontSize, fontFamily: Font.bodySemiBold, color: v.text }}>
            {label}
          </Text>
          {rightIcon && (
            <Icon name={rightIcon} size={s.iconSize} viewBox={iconViewBox} color={v.text} />
          )}
        </>
      )}
    </TouchableOpacity>
  );
}
