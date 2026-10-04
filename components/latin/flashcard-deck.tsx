import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';

import { FLASHCARDS } from '@/constants/latin-data';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { StorageService } from '@/services/storage';

interface FlashcardDeckProps {
  masteredIds: string[];
  onToggleMastered: (id: string) => void;
}

export function FlashcardDeck({ masteredIds, onToggleMastered }: FlashcardDeckProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const card = FLASHCARDS[currentIndex % FLASHCARDS.length];
  const isMastered = masteredIds.includes(card.id);

  const handleFlip = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % FLASHCARDS.length);
  };

  const handlePrev = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + FLASHCARDS.length) % FLASHCARDS.length);
  };

  const handleToggleMaster = () => {
    Haptics.notificationAsync(
      isMastered
        ? Haptics.NotificationFeedbackType.Warning
        : Haptics.NotificationFeedbackType.Success
    );
    onToggleMastered(card.id);
  };

  return (
    <View style={styles.container}>
      {/* Top progress row */}
      <View style={styles.topProgressRow}>
        <Text style={[styles.progressText, { color: colors.textMuted }]}>
          Cartão {(currentIndex % FLASHCARDS.length) + 1} de {FLASHCARDS.length}
        </Text>

        <View style={[styles.masteredBadge, { backgroundColor: colors.oliveSurface, borderColor: colors.olive }]}>
          <IconSymbol name="star.fill" size={13} color={colors.olive} />
          <Text style={[styles.masteredText, { color: colors.olive }]}>
            {masteredIds.length} dominados
          </Text>
        </View>
      </View>

      {/* Main Flashcard View */}
      <TouchableOpacity
        activeOpacity={0.88}
        onPress={handleFlip}
        style={[
          styles.card,
          {
            backgroundColor: isFlipped ? colors.surface : colors.card,
            borderColor: isMastered ? colors.olive : colors.gold,
            shadowColor: colors.shadowColor,
          },
        ]}
      >
        <View style={styles.cardHeader}>
          <View style={[styles.categoryBadge, { backgroundColor: colors.badgeBg, borderColor: colors.cardBorder }]}>
            <Text style={[styles.categoryText, { color: colors.textMuted }]}>
              {card.category.toUpperCase()}
            </Text>
          </View>

          <Text style={[styles.tapHint, { color: colors.goldLight }]}>
            {isFlipped ? 'Toque para ver em Latim' : 'Toque para ver a tradução'}
          </Text>
        </View>

        <View style={styles.cardBody}>
          {!isFlipped ? (
            <>
              <Text style={[styles.frontLatin, { color: colors.text, fontFamily: Fonts.serif }]}>
                {card.latin}
              </Text>
              <Text style={[styles.subHint, { color: colors.textLight }]}>
                (Latim clássico)
              </Text>
            </>
          ) : (
            <>
              <Text style={[styles.backTranslation, { color: colors.tint, fontFamily: Fonts.serif }]}>
                {card.translation}
              </Text>
              <View style={[styles.noteBox, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
                <Text style={[styles.noteText, { color: colors.text }]}>{card.note}</Text>
              </View>
            </>
          )}
        </View>

        <View style={styles.cardFooter}>
          <View style={styles.flipIconWrapper}>
            <IconSymbol name="arrow.triangle.2.circlepath" size={15} color={colors.textLight} />
            <Text style={[styles.flipLabel, { color: colors.textLight }]}>Virar Cartão</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Action buttons */}
      <View style={styles.controlsRow}>
        <TouchableOpacity
          onPress={handlePrev}
          style={[styles.navBtn, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
        >
          <IconSymbol name="chevron.left.forwardslash.chevron.right" size={16} color={colors.icon} />
          <Text style={[styles.navBtnText, { color: colors.text }]}>Anterior</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleToggleMaster}
          style={[
            styles.masterBtn,
            {
              backgroundColor: isMastered ? colors.oliveSurface : colors.surface,
              borderColor: isMastered ? colors.olive : colors.cardBorder,
            },
          ]}
        >
          <IconSymbol
            name={isMastered ? 'checkmark.circle.fill' : 'star.fill'}
            size={18}
            color={isMastered ? colors.olive : colors.gold}
          />
          <Text
            style={[
              styles.masterBtnText,
              { color: isMastered ? colors.olive : colors.text },
            ]}
          >
            {isMastered ? 'Já Memorizei!' : 'Marcar Memorizado'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNext}
          style={[styles.navBtn, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
        >
          <Text style={[styles.navBtnText, { color: colors.text }]}>Próximo</Text>
          <IconSymbol name="chevron.right" size={16} color={colors.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  topProgressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
  },
  masteredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    borderWidth: 1,
  },
  masteredText: {
    fontSize: 11,
    fontWeight: '700',
  },
  card: {
    minHeight: 220,
    borderRadius: 18,
    borderWidth: 1.5,
    padding: 18,
    justifyContent: 'space-between',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  tapHint: {
    fontSize: 11,
    fontWeight: '600',
  },
  cardBody: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  frontLatin: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  subHint: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  backTranslation: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  noteBox: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    width: '100%',
  },
  noteText: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
  },
  cardFooter: {
    alignItems: 'center',
  },
  flipIconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  flipLabel: {
    fontSize: 11,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
    gap: 8,
  },
  navBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  navBtnText: {
    fontSize: 12,
    fontWeight: '600',
  },
  masterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
  },
  masterBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
