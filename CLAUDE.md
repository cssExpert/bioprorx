@AGENTS.md

## Rules:
- Use TypeScript everywhere.
- Keep code modular and clean.
- Use `npx expo install` for Expo packages.
- Do not upgrade Expo to SDK 56.
- Do not overcomplicate.
- Give commands and files step by step.
- Always Create a Reusable components if there is a chance of duplication.
- Always fetch COLORS, FONTS, FONT_FAMILY from constant files.
- Always fetch Form attributes liks of Size, Height, Radius etc from Mixins file.
- All Screens will have Top and Bottom Shades — use `<ScreenLayout>` from `@/components/common/ScreenLayout` as the root wrapper on every screen. For gradient-bg screens (setup/onboarding) pass `gradient` prop. Never add `<ScreenShades />` manually.
- White-bg screen pattern: `<ScreenLayout><SafeAreaView style={{ flex:1, backgroundColor:Colors.white }} edges={['top','bottom']}>...</SafeAreaView></ScreenLayout>`
- Gradient-bg screen pattern: `<ScreenLayout gradient><SafeAreaView style={{ flex:1 }} edges={['top','bottom']}>...</SafeAreaView></ScreenLayout>`