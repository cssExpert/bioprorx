import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Animated,
  StatusBar,
  ViewToken,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthStore } from '@/src/stores/authStore';
import { Font } from '@/src/constants/typography';
import { FontSize } from '@/src/constants/mixins';
import Icon from '@/components/common/Icon';
import Slide1Graphic from '@/assets/images/Onboarding/screen1/slide1-graphic.svg';
import Slide2Graphic from '@/assets/images/Onboarding/screen2/slide2-graphic.svg';
import Slide3Graphic from '@/assets/images/Onboarding/screen3/slide3-graphic.svg';
import Slide4Graphic from '@/assets/images/Onboarding/screen4/slide4-graphic.svg';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

const HEADING_SIZE = SCREEN_H < 700 ? 36 : SCREEN_H < 812 ? 42 : 50;
const HEADING_LINE = HEADING_SIZE * 1.22;

const HEADING_COLOR = '#1A1F36';
const BODY_COLOR = '#4A506A';

type SlideData = {
  id: string;
  bg: string;
  accent: string;
  iconBg: string;
  iconChar: React.ReactNode;
  graphic: ImageSourcePropType;
  GraphicSvg?: React.FC<{ width: number; height: number }>;
  shadeTop: ImageSourcePropType;
  shadeBottom: ImageSourcePropType;
  heading: [string, string, string]; // [normal, italic, normal]
  body: string;
};

const SLIDES: SlideData[] = [
  {
    id: '1',
    bg: '#ECEAF8',
    accent: '#AA8AF7',
    iconBg: '#D8D4F0',
    iconChar: <Icon name="Cog" size="74" color="#AA8AF7" viewBox="0 0 24 24" />,
    graphic: require('@/assets/images/Onboarding/screen1/slide1-graphic.png'),
    GraphicSvg: Slide1Graphic,
    shadeTop: require('@/assets/images/Onboarding/screen1/shade-top.png'),
    shadeBottom: require('@/assets/images/Onboarding/screen1/shade-bottom.png'),
    heading: ['The Biologic\n', 'Prescribing', '\nEngine'],
    body: '',
  },
  {
    id: '2',
    bg: '#E7EBF5',
    accent: '#28427A',
    iconBg: '#C5D2E5',
    iconChar: <Icon name="Biologic" size="74" color="#28427A" viewBox="0 0 24 24" />,
    graphic: require('@/assets/images/Onboarding/screen2/slide2-graphic.png'),
    GraphicSvg: Slide2Graphic,
    shadeTop: require('@/assets/images/Onboarding/screen2/shade-top.png'),
    shadeBottom: require('@/assets/images/Onboarding/screen2/shade-bottom.png'),
    heading: ['The Right\n', 'biologic', ',\nthe first time.'],
    body: 'Formulary intelligence, step therapy, and biosimilar guidance — surfaced at the point of prescribing.',
  },
  {
    id: '3',
    bg: '#EAF4EC',
    accent: '#1A5A40',
    iconBg: '#BDE3C9',
    iconChar: <Icon name="Specialty" size="74" color="#1A5A40" viewBox="0 0 24 24" />,
    graphic: require('@/assets/images/Onboarding/screen3/slide3-graphic.png'),
    GraphicSvg: Slide3Graphic,
    shadeTop: require('@/assets/images/Onboarding/screen3/shade-top.png'),
    shadeBottom: require('@/assets/images/Onboarding/screen3/shade-bottom.png'),
    heading: ['Buy-and-bill\n', 'or specialty', ',\nwe know\nthe route.'],
    body: 'IOD, SPP, or direct script — automatically routed by payer and drug. Zero guesswork.',
  },
  {
    id: '4',
    bg: '#F8EDE8',
    accent: '#6B3010',
    iconBg: '#ECCFBC',
    iconChar: <Icon name="Patient" size="74" color="#6B3010" viewBox="0 0 24 24" />,
    graphic: require('@/assets/images/Onboarding/screen4/slide4-graphic.png'),
    GraphicSvg: Slide4Graphic,
    shadeTop: require('@/assets/images/Onboarding/screen4/shade-top.png'),
    shadeBottom: require('@/assets/images/Onboarding/screen4/shade-bottom.png'),
    heading: ["Every patient's\n", 'biologic\nhistory', ',\none tap away'],
    body: 'PA status, prior treatments, step therapy history — all tied to the patient, ready at the visit.',
  },
];

// ─── Components ───────────────────────────────────────────────────────────────

function IconBadge({ char }: { char: React.ReactNode; accent: string; bg: string }) {
  return (
    <View style={[styles.badge]}>
      <Text style={{ fontSize: FontSize.h2 }}>{char}</Text>
    </View>
  );
}

function Heading({ parts }: { parts: [string, string, string] }) {
  const [before, italic, after] = parts;
  return (
    <Text style={{ color: HEADING_COLOR, fontSize: HEADING_SIZE, lineHeight: HEADING_LINE }}>
      <Text style={{ fontFamily: Font.heading }}>{before}</Text>
      <Text style={{ fontFamily: Font.headingItalic }}>{italic}</Text>
      <Text style={{ fontFamily: Font.heading }}>{after}</Text>
    </Text>
  );
}

function Dots({ total, scrollX }: { total: number; scrollX: Animated.Value }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
      {Array.from({ length: total }).map((_, i) => {
        const inputRange = [(i - 1) * SCREEN_W, i * SCREEN_W, (i + 1) * SCREEN_W];

        const width = scrollX.interpolate({
          inputRange,
          outputRange: [8, 24, 8],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.25, 1, 0.25],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={i}
            style={{
              height: 8,
              width,
              borderRadius: 4,
              backgroundColor: HEADING_COLOR,
              opacity,
            }}
          />
        );
      })}
    </View>
  );
}

function ArrowButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.arrowBtn}>
      <Icon name="ArrowRightIcon" size="24" color="#ffffff" viewBox="0 0 24 24" />
    </TouchableOpacity>
  );
}

// ─── Slide ────────────────────────────────────────────────────────────────────

function SlideItem({
  item,
  topInset,
  bottomInset,
}: {
  item: SlideData;
  topInset: number;
  bottomInset: number;
}) {
  return (
    <View style={[styles.slide, { backgroundColor: item.bg }]}>
      {/* Layer 1 — graphic */}
      {item.GraphicSvg ? (
        <item.GraphicSvg width={SCREEN_W} height={SCREEN_H} />
      ) : (
        <Image source={item.graphic} style={styles.layer} resizeMode="cover" />
      )}

      {/* Layer 2 — top shade */}
      <Image source={item.shadeTop} style={styles.shadeTop} resizeMode="cover" />

      {/* Layer 3 — bottom shade */}
      <Image source={item.shadeBottom} style={styles.shadeBottom} resizeMode="cover" />

      {/* Layer 4 — content (icon + heading + body only, no bottom bar) */}
      <View
        style={[styles.content, { paddingTop: topInset + 48, paddingBottom: bottomInset + 16 }]}
      >
        <IconBadge char={item.iconChar} accent={item.accent} bg={item.iconBg} />

        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Heading parts={item.heading} />

          {item.body ? (
            <View style={{ maxWidth: 270 }}>
              <Text style={[styles.body, { fontFamily: Font.body }]}>{item.body}</Text>
            </View>
          ) : null}
        </View>

        {/* Reserve space so content doesn't overlap the fixed bottom bar */}
        <View style={{ height: 92 }} />
      </View>
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function OnboardingScreen() {
  const router = useRouter();
  const { setOnboardingComplete } = useAuthStore();
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<SlideData>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) setCurrentIndex(viewableItems[0].index ?? 0);
  }).current;

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    } else {
      setOnboardingComplete().then(() => router.replace('/(auth)/signup-options'));
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      <FlatList
        ref={flatListRef}
        data={SLIDES}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        style={{ flex: 1 }}
        renderItem={({ item }) => (
          <SlideItem item={item} topInset={insets.top} bottomInset={insets.bottom} />
        )}
      />

      {/* Fixed bottom bar — sits above FlatList, never swipes */}
      <View style={[styles.bottomBar, { bottom: insets.bottom + 16 }]}>
        <Dots total={SLIDES.length} scrollX={scrollX} />
        <ArrowButton onPress={handleNext} />
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  slide: {
    width: SCREEN_W,
    height: SCREEN_H,
  },
  // Graphic fills the whole slide
  layer: {
    ...StyleSheet.absoluteFillObject,
    width: SCREEN_W,
    height: SCREEN_H,
  },
  // Shade anchored to top, full width
  shadeTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: SCREEN_W,
    height: SCREEN_H * 0.45,
  },
  // Shade anchored to bottom, full width
  shadeBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: SCREEN_W,
    height: SCREEN_H * 0.55,
  },
  // Content sits on top of all image layers
  content: {
    ...StyleSheet.absoluteFillObject,
    paddingHorizontal: 28,
  },
  badge: {
    width: 74,
    height: 74,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    marginTop: 14,
    fontSize: FontSize.md,
    lineHeight: 22,
    color: BODY_COLOR,
  },
  bottomBar: {
    position: 'absolute',
    left: 28,
    right: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  arrowBtn: {
    width: 44,
    height: 44,
    borderRadius: 26,
    backgroundColor: HEADING_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
