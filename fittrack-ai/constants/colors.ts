export const Colors = {
  // Primary backgrounds
  bg: "#1A0A2E",
  bgLight: "#221342",
  card: "#2D1B4E",
  cardLight: "#3D2B5E",
  cardBorder: "#4A3670",

  // Accent colors
  accent: "#7C3AED",
  accentLight: "#9B5DE5",
  accentDark: "#5B21B6",
  gold: "#F59E0B",
  goldLight: "#FBBF24",
  green: "#16A34A",
  greenLight: "#22C55E",
  teal: "#06B6D4",

  // Text
  textPrimary: "#FFFFFF",
  textSecondary: "#A78BFA",
  textMuted: "#6B5B95",
  textDark: "#1A0A2E",

  // Status
  success: "#22C55E",
  warning: "#F97316",
  danger: "#EF4444",
  info: "#3B82F6",

  // Tab bar
  tabInactive: "#6B5B95",
  tabActive: "#A78BFA",
  tabBackground: "#150826",

  // Category card colors
  strengthBg: "#FDE8D8",
  strengthText: "#C2410C",
  cardioBg: "#CFFAFE",
  cardioText: "#0E7490",
  flexibilityBg: "#E0E7FF",
  flexibilityText: "#4338CA",
  yogaBg: "#FCE7F3",
  yogaText: "#BE185D",

  // Gradient stops
  gradientStart: "#1A0A2E",
  gradientMid: "#2D1B4E",
  gradientEnd: "#1A0A2E",

  // BMI scale
  bmiUnderweight: "#3B82F6",
  bmiNormal: "#22C55E",
  bmiOverweight: "#F59E0B",
  bmiObese: "#EF4444",

  // Overlay
  overlay: "rgba(26, 10, 46, 0.85)",
  overlayLight: "rgba(26, 10, 46, 0.5)",
} as const;

export type ColorKey = keyof typeof Colors;
