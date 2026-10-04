import { Platform } from 'react-native';

const tintColorLight = '#8B1E1E'; // Pompeian Roman Crimson
const tintColorDark = '#D4AF37'; // Imperial Roman Gold

export const Colors = {
  light: {
    text: '#1A1C20',
    textMuted: '#636C76',
    textLight: '#8C949E',
    background: '#F8F6F0', // Roman Parchment / Travertine
    surface: '#F1EDE2',
    card: '#FFFFFF',
    cardBorder: '#E6DFC9',
    tint: tintColorLight,
    gold: '#B8860B',
    goldLight: '#D4AF37',
    goldSurface: '#FFF9E6',
    crimson: '#8B1E1E',
    crimsonSurface: '#FDF2F2',
    olive: '#2E6F40',
    oliveSurface: '#F0F8F3',
    icon: '#5A636E',
    tabIconDefault: '#8B949E',
    tabIconSelected: tintColorLight,
    badgeBg: '#F3EFE6',
    shadowColor: '#362E20',
  },
  dark: {
    text: '#F3F4F6',
    textMuted: '#9CA3AF',
    textLight: '#6B7280',
    background: '#0D0F13', // Roman Obsidian
    surface: '#161920',
    card: '#1B202A',
    cardBorder: '#2B3242',
    tint: tintColorDark,
    gold: '#E2B743',
    goldLight: '#F3D279',
    goldSurface: '#292211',
    crimson: '#D9534F',
    crimsonSurface: '#2D1418',
    olive: '#4E9F6E',
    oliveSurface: '#14291B',
    icon: '#A3ACBA',
    tabIconDefault: '#697282',
    tabIconSelected: tintColorDark,
    badgeBg: '#232936',
    shadowColor: '#000000',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'Georgia',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    serif: "'Cinzel', 'Playfair Display', Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Segoe UI', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
});
