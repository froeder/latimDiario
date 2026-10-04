// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight, SymbolViewProps } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING: Record<string, ComponentProps<typeof MaterialIcons>['name']> = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'chevron.down': 'keyboard-arrow-down',
  'chevron.up': 'keyboard-arrow-up',
  'book.fill': 'menu-book',
  'books.vertical.fill': 'library-books',
  'magnifyingglass': 'search',
  'sparkles': 'auto-awesome',
  'brain.head.profile': 'psychology',
  'bookmark.fill': 'bookmark',
  'bookmark': 'bookmark-border',
  'heart.fill': 'favorite',
  'heart': 'favorite-border',
  'quote.opening': 'format-quote',
  'volume.3.fill': 'volume-up',
  'arrow.triangle.2.circlepath': 'refresh',
  'square.and.pencil': 'edit',
  'checkmark.circle.fill': 'check-circle',
  'xmark.circle.fill': 'cancel',
  'info.circle.fill': 'info',
  'gearshape.fill': 'settings',
  'flame.fill': 'local-fire-department',
  'star.fill': 'star',
  'character.book.closed.fill': 'import-contacts',
  'lightbulb.fill': 'lightbulb',
  'graduationcap.fill': 'school',
};

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
