import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

import { getRomanDate } from '@/constants/latin-data';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface RomanHeaderProps {
  streak: number;
}

export function RomanHeader({ streak }: RomanHeaderProps) {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { latinFormatted, portugueseFormatted } = getRomanDate();

  const handleOpenSettings = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/modal');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
      <View style={styles.topRow}>
        <View style={styles.branding}>
          <Text style={[styles.appTitle, { color: colors.gold, fontFamily: Fonts.serif }]}>
            LATIM DIÁRIO
          </Text>
          <Text style={[styles.motto, { color: colors.textMuted }]}>
            Sapientia Antiqua in Vita Hodierna
          </Text>
        </View>

        <View style={styles.rightActions}>
          <View style={[styles.streakBadge, { backgroundColor: colors.goldSurface, borderColor: colors.gold }]}>
            <IconSymbol name="flame.fill" size={16} color={colors.gold} />
            <Text style={[styles.streakText, { color: colors.gold }]}>{streak} {streak === 1 ? 'dia' : 'dias'}</Text>
          </View>

          <TouchableOpacity
            onPress={handleOpenSettings}
            style={[styles.iconButton, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
            accessibilityLabel="Configurações e Sobre"
          >
            <IconSymbol name="gearshape.fill" size={18} color={colors.icon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.dateBanner, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
        <View style={styles.calendarIconContainer}>
          <IconSymbol name="book.fill" size={16} color={colors.tint} />
        </View>
        <View style={styles.dateTextContainer}>
          <Text style={[styles.romanDate, { color: colors.text, fontFamily: Fonts.serif }]}>
            {latinFormatted}
          </Text>
          <Text style={[styles.portugueseDate, { color: colors.textMuted }]}>
            {portugueseFormatted}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  branding: {
    flex: 1,
  },
  appTitle: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 2,
  },
  motto: {
    fontSize: 11,
    fontStyle: 'italic',
    marginTop: 2,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  streakText: {
    fontSize: 12,
    fontWeight: '700',
  },
  iconButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  dateBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    gap: 10,
  },
  calendarIconContainer: {
    padding: 6,
  },
  dateTextContainer: {
    flex: 1,
  },
  romanDate: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  portugueseDate: {
    fontSize: 11,
    textTransform: 'capitalize',
    marginTop: 1,
  },
});
