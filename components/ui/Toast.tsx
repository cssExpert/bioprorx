import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';
import { Colors } from '@/src/constants/colors';
import { Font } from '@/src/constants/typography';
import { FontSize, Radius, Shadow } from '@/src/constants/mixins';
import { _registerToast, ToastConfig } from '@/src/utils/toast';

function SuccessIcon() {
  return (
    <Svg width={36} height={36} viewBox="0 0 36 36">
      <Circle cx="18" cy="18" r="18" fill={Colors.success} />
      <Path
        d="M11 18l5 5 9-9"
        stroke="#fff"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

function ErrorIcon() {
  return (
    <Svg width={36} height={36} viewBox="0 0 36 36">
      <Circle cx="18" cy="18" r="18" fill={Colors.error} />
      <Path
        d="M13 13l10 10M23 13l-10 10"
        stroke="#fff"
        strokeWidth={2.5}
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}

export default function ToastContainer() {
  const { top } = useSafeAreaInsets();
  const [toast, setToast] = useState<ToastConfig | null>(null);
  const translateY = useRef(new Animated.Value(-200)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hide = useCallback(() => {
    Animated.timing(translateY, {
      toValue: -200,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setToast(null));
  }, [translateY]);

  const show = useCallback(
    (config: ToastConfig) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setToast(config);
      translateY.setValue(-200);
      Animated.spring(translateY, {
        toValue: 0,
        damping: 18,
        stiffness: 200,
        useNativeDriver: true,
      }).start();
      timerRef.current = setTimeout(hide, config.duration ?? 4000);
    },
    [translateY, hide],
  );

  useEffect(() => {
    _registerToast(show);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [show]);

  if (!toast) return null;

  const isSuccess = toast.variant === 'success';
  const bg = isSuccess ? Colors.successLight : Colors.errorLight;

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: top + 12,
        left: 16,
        right: 16,
        zIndex: 9999,
        transform: [{ translateY }],
      }}
    >
      <View
        style={{
          backgroundColor: bg,
          borderRadius: Radius.lg,
          padding: 16,
          ...Shadow.lg,
        }}
      >
        {/* Close button */}
        <TouchableOpacity
          onPress={hide}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={{ position: 'absolute', top: 14, right: 14 }}
        >
          <Svg width={16} height={16} viewBox="0 0 24 24">
            <Path
              d="M18 6L6 18M6 6l12 12"
              stroke={Colors.textPrimary}
              strokeWidth={2}
              strokeLinecap="round"
            />
          </Svg>
        </TouchableOpacity>

        {/* Icon + Title row */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginRight: 24 }}>
          {isSuccess ? <SuccessIcon /> : <ErrorIcon />}
          <Text
            style={{
              fontFamily: Font.bodyBold,
              fontSize: FontSize.lgPlus,
              color: Colors.textPrimary,
              flex: 1,
            }}
          >
            {toast.title}
          </Text>
        </View>

        {/* Body */}
        {toast.message ? (
          <Text
            style={{
              fontFamily: Font.body,
              fontSize: FontSize.base,
              color: Colors.textSecondary,
              marginTop: 10,
              lineHeight: 22,
            }}
          >
            {toast.message}
          </Text>
        ) : null}
      </View>
    </Animated.View>
  );
}
