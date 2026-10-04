import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';

import { QUIZ_QUESTIONS } from '@/constants/latin-data';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { StorageService } from '@/services/storage';

export function QuickQuiz() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const question = QUIZ_QUESTIONS[currentIndex % QUIZ_QUESTIONS.length];

  const handleSelectOption = (index: number) => {
    if (hasAnswered) return;

    setSelectedOption(index);
    setHasAnswered(true);

    const isCorrect = index === question.correctIndex;
    if (isCorrect) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }

    StorageService.recordQuizScore(isCorrect);
  };

  const handleNext = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedOption(null);
    setHasAnswered(false);
    setCurrentIndex((prev) => (prev + 1) % QUIZ_QUESTIONS.length);
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder, shadowColor: colors.shadowColor }]}>
      <View style={styles.topRow}>
        <View style={[styles.pill, { backgroundColor: colors.oliveSurface, borderColor: colors.olive }]}>
          <IconSymbol name="brain.head.profile" size={13} color={colors.olive} />
          <Text style={[styles.pillText, { color: colors.olive }]}>DESAFIO RÁPIDO • {question.category}</Text>
        </View>

        <Text style={[styles.countText, { color: colors.textMuted }]}>
          Questão {(currentIndex % QUIZ_QUESTIONS.length) + 1} de {QUIZ_QUESTIONS.length}
        </Text>
      </View>

      <Text style={[styles.questionText, { color: colors.text }]}>
        {question.question}
      </Text>

      {/* Options List */}
      <View style={styles.optionsList}>
        {question.options.map((option, idx) => {
          let btnBg = colors.surface;
          let borderClr = colors.cardBorder;
          let textClr = colors.text;

          if (hasAnswered) {
            if (idx === question.correctIndex) {
              btnBg = colors.oliveSurface;
              borderClr = colors.olive;
              textClr = colors.olive;
            } else if (idx === selectedOption) {
              btnBg = colors.crimsonSurface;
              borderClr = colors.crimson;
              textClr = colors.crimson;
            }
          }

          return (
            <TouchableOpacity
              key={idx}
              disabled={hasAnswered}
              onPress={() => handleSelectOption(idx)}
              style={[styles.optionBtn, { backgroundColor: btnBg, borderColor: borderClr }]}
            >
              <View style={[styles.optionIndicator, { borderColor: borderClr }]}>
                <Text style={[styles.optionLetter, { color: textClr }]}>
                  {String.fromCharCode(65 + idx)}
                </Text>
              </View>
              <Text style={[styles.optionText, { color: textClr }]}>{option}</Text>

              {hasAnswered && idx === question.correctIndex && (
                <IconSymbol name="checkmark.circle.fill" size={18} color={colors.olive} />
              )}
              {hasAnswered && idx === selectedOption && idx !== question.correctIndex && (
                <IconSymbol name="xmark.circle.fill" size={18} color={colors.crimson} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Explanation when answered */}
      {hasAnswered && (
        <View style={[styles.explanationBox, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
          <Text style={[styles.explanationTitle, { color: selectedOption === question.correctIndex ? colors.olive : colors.crimson }]}>
            {selectedOption === question.correctIndex ? 'Optime! (Correto!)' : 'Errare humanum est (Incorreto)'}
          </Text>
          <Text style={[styles.explanationText, { color: colors.text }]}>
            {question.explanation}
          </Text>

          <TouchableOpacity
            onPress={handleNext}
            style={[styles.nextBtn, { backgroundColor: colors.tint }]}
          >
            <Text style={styles.nextBtnText}>Próximo Desafio</Text>
            <IconSymbol name="chevron.right" size={14} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      )}
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
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
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
    letterSpacing: 0.5,
  },
  countText: {
    fontSize: 11,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 23,
    marginBottom: 14,
  },
  optionsList: {
    gap: 8,
  },
  optionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    gap: 10,
  },
  optionIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionLetter: {
    fontSize: 12,
    fontWeight: '700',
  },
  optionText: {
    fontSize: 14,
    flex: 1,
  },
  explanationBox: {
    marginTop: 14,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  explanationTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  explanationText: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 10,
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 8,
  },
  nextBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
});
