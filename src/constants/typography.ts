// Font family name constants — use these everywhere instead of raw strings.
// Fonts are loaded in app/_layout.tsx via useFonts.

export const Font = {
  // ── Playfair Display (headings) ──────────────────────────
  heading:          'PlayfairDisplay_700Bold',
  headingItalic:    'PlayfairDisplay_700Bold_Italic',
  headingBlack:     'PlayfairDisplay_900Black',
  headingMedium:    'PlayfairDisplay_500Medium',
  headingRegular:   'PlayfairDisplay_400Regular',

  // ── Nunito (body / UI) ───────────────────────────────────
  body:             'Nunito_400Regular',
  bodyMedium:       'Nunito_500Medium',
  bodySemiBold:     'Nunito_600SemiBold',
  bodyBold:         'Nunito_700Bold',
  bodyExtraBold:    'Nunito_800ExtraBold',
} as const;
