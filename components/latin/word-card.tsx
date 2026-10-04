import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { LatinWord } from '@/types/latin';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface WordCardProps {
  word: LatinWord;
}

export function WordCard({ word }: WordCardProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder, shadowColor: colors.shadowColor }]}>
      <View style={styles.headerRow}>
        <View style={styles.badgeRow}>
          <View style={[styles.pill, { backgroundColor: colors.goldSurface, borderColor: colors.gold }]}>
            <IconSymbol name="character.book.closed.fill" size={13} color={colors.gold} />
            <Text style={[styles.pillText, { color: colors.gold }]}>VERBUM DIEI (PALAVRA DO DIA)</Text>
          </View>
        </View>
      </View>

      <View style={styles.wordTitleContainer}>
        <Text style={[styles.wordTitle, { color: colors.tint, fontFamily: Fonts.serif }]}>
          {word.word}
        </Text>
        {word.genitiveAndGender && (
          <Text style={[styles.genitiveText, { color: colors.textMuted }]}>
            {word.genitiveAndGender}
          </Text>
        )}
      </View>

      <Text style={[styles.partOfSpeech, { color: colors.goldLight }]}>
        {word.partOfSpeech}
      </Text>

      <Text style={[styles.meaningText, { color: colors.text }]}>
        {word.meaning}
      </Text>

      {/* Etymology & Portuguese Derivatives */}
      <View style={[styles.etymologyBox, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
        <View style={styles.etymologyRow}>
          <Text style={[styles.etymologyLabel, { color: colors.textMuted }]}>Etimologia: </Text>
          <Text style={[styles.etymologyContent, { color: colors.text }]}>{word.etymology}</Text>
        </View>

        {word.derivatives.length > 0 && (
          <View style={styles.derivativesContainer}>
            <Text style={[styles.derivativesLabel, { color: colors.textMuted }]}>
              Derivados no Português:
            </Text>
            <View style={styles.derivativesList}>
              {word.derivatives.map((item) => (
                <View key={item} style={[styles.derivativeBadge, { backgroundColor: colors.badgeBg, borderColor: colors.cardBorder }]}>
                  <Text style={[styles.derivativeBadgeText, { color: colors.text }]}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>

      {/* Example Sentence */}
      <View style={[styles.exampleBox, { borderLeftColor: colors.gold }]}>
        <Text style={[styles.exampleSentence, { color: colors.text, fontFamily: Fonts.serif }]}>
          “{word.exampleSentence}”
        </Text>
        <Text style={[styles.exampleTranslation, { color: colors.textMuted }]}>
          {word.exampleTranslation}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  badgeRow: {
    flexDirection: 'row',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  pillText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  wordTitleContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginTop: 4,
    marginBottom: 2,
  },
  wordTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  genitiveText: {
    fontSize: 13,
    fontStyle: 'italic',
  },
  partOfSpeech: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  meaningText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
    marginBottom: 14,
  },
  etymologyBox: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 14,
    gap: 8,
  },
  etymologyRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  etymologyLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  etymologyContent: {
    fontSize: 12,
    flex: 1,
  },
  derivativesContainer: {
    marginTop: 2,
  },
  derivativesLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
  },
  derivativesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  derivativeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  derivativeBadgeText: {
    fontSize: 11,
    fontWeight: '500',
  },
  exampleBox: {
    borderLeftWidth: 3,
    paddingLeft: 12,
    paddingVertical: 2,
  },
  exampleSentence: {
    fontSize: 13,
    fontStyle: 'italic',
    marginBottom: 2,
  },
  exampleTranslation: {
    fontSize: 12,
  },
});
