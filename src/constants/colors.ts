// Design palette (Frame 1437253238)
export const Palette = {
  deepPurple: '#411469', // row 1 — dark purple
  lavender: '#9392C7', // row 1 — muted dusty purple
  skyBlue: '#0CC0DF', // row 1 — bright cyan-blue
  violet: '#BC40DE', // row 2 — medium purple
  cornflower: '#56AEFF', // row 2 — periwinkle blue
  mint: '#3DE0D2', // row 2 — aquamarine/mint
  magenta: '#E420D1', // row 3 — hot pink/magenta
  coral: '#EF3A5D', // row 3 — rose/coral red
  navySlate: '#00577D', // row 3 — dark navy slate
  darkColor: '#1A1F36', // Dark Headings
} as const;

export const Colors = {
  // Brand — from design system
  primary: '#411469', // brand-purple-dark (main CTA)
  primaryLight: '#9392C7', // brand-purple
  primaryLight2: '#8743C4', // brand-purple
  primaryDark: '#411469', // purple-deep (large buttons)
  primaryDeepHover: '#4a1d7e',
  brandAccent: '#7c3aed', // "rx" purple accent, selected states
  focusBorder: '#8b5cf6', // input focus ring

  // Navy
  navy: '#1b2236', // design --navy
  navyDark: '#0A1628',
  navyHover: '#2a3350',

  // Text
  textPrimary: '#1A1A1A', // --text-dark
  textSecondary: '#3d4150', // --text-body
  textMuted: 'rgba(26,26,26,0.8)', // --text-muted
  textLabel: '#4a4e5c', // --text-label

  // Surfaces & backgrounds
  white: '#FFFFFF',
  surface: '#F5F6FA', // app shell bg
  card: '#FFFFFF',
  fieldBg: '#FFFFFF',
  fieldBorder: '#DDDDDD',
  divider: '#dcdde7',
  placeholder: '#b6b9c6', // input placeholder text
  selectedBg: '#f3f0fd', // dropdown selected item background

  // Gradient bg (onboarding/auth)
  gradStart: '#eef0f8',
  gradMid: '#e9eaf5',
  gradEnd: '#e6e3f1',

  // Card gradient (welcome profile card)
  cardGradStart: '#e9e7f7',
  cardGradEnd: '#ddeaf6',

  // Progress bar track
  progressTrack: '#e3e0ef',

  // Info / DocuSign box
  infoBoxBg: '#eff6ff',
  infoBoxBorder: '#bfdbfe',
  infoBoxBorderDark: '#2F80ED',
  infoBoxText: '#1e3a5f',
  link: '#A583FF',
  infoBoxBgrgb: '47,148,237',

  // Kept for existing screens
  teal: '#14B8A6',
  tealLight: '#2DD4BF',
  border: '#e6e7ef',
  borderLight: '#F1F5F9',
  muted: 'rgba(26, 26, 26, 0.8)',

  // States
  success: '#16a34a',
  successLight: '#d9f3e4',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  error: '#dc2626',
  errorLight: '#fde0e0',
  info: '#06B6D4',
  infoLight: '#CFFAFE',

  overlay: 'rgba(10, 22, 40, 0.7)',
  transparent: 'transparent',

  // Button palette variants (from Palette)
  btnDeepPurple: '#411469',
  btnLavender: '#9392C7',
  btnSkyBlue: '#0CC0DF',
  btnViolet: '#BC40DE',
  btnCornflower: '#56AEFF',
  btnMint: '#3DE0D2',
  btnMagenta: '#E420D1',
  btnCoral: '#EF3A5D',
} as const;

export const SpecialtyColors: Record<string, string> = {
  rheumatology: '#8B5CF6',
  gastroenterology: '#F59E0B',
  dermatology: '#EC4899',
  neurology: '#6366F1',
  pulmonology: '#06B6D4',
  allergy: '#10B981',
  endocrinology: '#F97316',
  cardiology: '#EF4444',
  ophthalmology: '#3B82F6',
};
