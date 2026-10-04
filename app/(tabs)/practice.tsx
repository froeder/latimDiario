import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import * as Haptics from 'expo-haptics';

import { FLASHCARDS, QUIZ_QUESTIONS } from '@/constants/latin-data';
import { UserProgress } from '@/types/latin';
import { StorageService } from '@/services/storage';
import { FlashcardDeck } from '@/components/latin/flashcard-deck';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type PracticeMode = 'flashcards' | 'quiz' | 'stats';

export default function PracticeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const [mode, setMode] = useState<PracticeMode>('flashcards');
  const [progress, setProgress] = useState<UserProgress | null>(null);

  // Full Quiz State
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    const data = await StorageService.getProgress();
    setProgress(data);
  };

  const handleToggleMastered = async (cardId: string) => {
    await StorageService.toggleMasteredFlashcard(cardId);
    await loadProgress();
  };

  const handleSelectQuizAnswer = async (optionIdx: number) => {
    if (showExplanation || quizFinished) return;

    const currentQ = QUIZ_QUESTIONS[quizIndex];
    const isCorrect = optionIdx === currentQ.correctIndex;

    const updatedAnswers = [...quizAnswers];
    updatedAnswers[quizIndex] = optionIdx;
    setQuizAnswers(updatedAnswers);
    setShowExplanation(true);

    if (isCorrect) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }

    await StorageService.recordQuizScore(isCorrect);
    await loadProgress();
  };

  const handleNextQuizQuestion = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setShowExplanation(false);
    if (quizIndex + 1 < QUIZ_QUESTIONS.length) {
      setQuizIndex(quizIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setQuizIndex(0);
    setQuizAnswers([]);
    setShowExplanation(false);
    setQuizFinished(false);
  };

  const quizCorrectCount = quizAnswers.reduce((acc, ans, idx) => {
    if (ans === null || ans === undefined) return acc;
    return ans === QUIZ_QUESTIONS[idx]?.correctIndex ? (acc as number) + 1 : acc;
  }, 0);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Title */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text, fontFamily: Fonts.serif }]}>
            Exercitia & Prática
          </Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>
            Fortaleça sua memória e vocabulário latino com repetições e desafios interativos.
          </Text>
        </View>

        {/* Mode Selector Tabs */}
        <View style={[styles.modeTabs, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
          <TouchableOpacity
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setMode('flashcards');
            }}
            style={[
              styles.modeTabBtn,
              mode === 'flashcards' && { backgroundColor: colors.card, borderColor: colors.cardBorder },
            ]}
          >
            <IconSymbol
              name="character.book.closed.fill"
              size={15}
              color={mode === 'flashcards' ? colors.gold : colors.textMuted}
            />
            <Text
              style={[
                styles.modeTabText,
                { color: mode === 'flashcards' ? colors.text : colors.textMuted },
                mode === 'flashcards' && styles.activeTabText,
              ]}
            >
              Flashcards
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setMode('quiz');
            }}
            style={[
              styles.modeTabBtn,
              mode === 'quiz' && { backgroundColor: colors.card, borderColor: colors.cardBorder },
            ]}
          >
            <IconSymbol
              name="brain.head.profile"
              size={15}
              color={mode === 'quiz' ? colors.gold : colors.textMuted}
            />
            <Text
              style={[
                styles.modeTabText,
                { color: mode === 'quiz' ? colors.text : colors.textMuted },
                mode === 'quiz' && styles.activeTabText,
              ]}
            >
              Quiz Completo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setMode('stats');
            }}
            style={[
              styles.modeTabBtn,
              mode === 'stats' && { backgroundColor: colors.card, borderColor: colors.cardBorder },
            ]}
          >
            <IconSymbol
              name="star.fill"
              size={15}
              color={mode === 'stats' ? colors.gold : colors.textMuted}
            />
            <Text
              style={[
                styles.modeTabText,
                { color: mode === 'stats' ? colors.text : colors.textMuted },
                mode === 'stats' && styles.activeTabText,
              ]}
            >
              Meu Progresso
            </Text>
          </TouchableOpacity>
        </View>

        {/* MODE 1: FLASHCARDS */}
        {mode === 'flashcards' && (
          <View>
            <FlashcardDeck
              masteredIds={progress?.masteredFlashcardIds || []}
              onToggleMastered={handleToggleMastered}
            />

            <View style={[styles.tipBox, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
              <View style={styles.tipHeader}>
                <IconSymbol name="lightbulb.fill" size={16} color={colors.gold} />
                <Text style={[styles.tipTitle, { color: colors.gold, fontFamily: Fonts.serif }]}>
                  Dica de Memorização Clássica
                </Text>
              </View>
              <Text style={[styles.tipDesc, { color: colors.textMuted }]}>
                “Repetitio est mater studiorum” (A repetição é a mãe dos estudos). Pronuncie os termos em voz alta ao virar os cartões para fixar o ritmo sonoro do latim!
              </Text>
            </View>
          </View>
        )}

        {/* MODE 2: QUIZ COMPLETO */}
        {mode === 'quiz' && (
          <View>
            {!quizFinished ? (
              <View style={[styles.quizCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
                {/* Progress bar */}
                <View style={styles.quizProgressHeader}>
                  <Text style={[styles.quizStepText, { color: colors.textMuted }]}>
                    Pergunta {quizIndex + 1} de {QUIZ_QUESTIONS.length}
                  </Text>
                  <View style={[styles.scoreBadge, { backgroundColor: colors.goldSurface }]}>
                    <Text style={[styles.scoreBadgeText, { color: colors.gold }]}>
                      Pontuação: {quizCorrectCount as number}/{quizAnswers.length}
                    </Text>
                  </View>
                </View>

                <Text style={[styles.quizQuestionTitle, { color: colors.text }]}>
                  {QUIZ_QUESTIONS[quizIndex].question}
                </Text>

                {/* Options */}
                <View style={styles.quizOptionsList}>
                  {QUIZ_QUESTIONS[quizIndex].options.map((opt, idx) => {
                    const isSelected = quizAnswers[quizIndex] === idx;
                    const isCorrect = idx === QUIZ_QUESTIONS[quizIndex].correctIndex;

                    let bg = colors.surface;
                    let border = colors.cardBorder;
                    let textClr = colors.text;

                    if (showExplanation) {
                      if (isCorrect) {
                        bg = colors.oliveSurface;
                        border = colors.olive;
                        textClr = colors.olive;
                      } else if (isSelected) {
                        bg = colors.crimsonSurface;
                        border = colors.crimson;
                        textClr = colors.crimson;
                      }
                    }

                    return (
                      <TouchableOpacity
                        key={idx}
                        disabled={showExplanation}
                        onPress={() => handleSelectQuizAnswer(idx)}
                        style={[styles.quizOptionBtn, { backgroundColor: bg, borderColor: border }]}
                      >
                        <Text style={[styles.quizOptionLetter, { color: textClr }]}>
                          {String.fromCharCode(65 + idx)}
                        </Text>
                        <Text style={[styles.quizOptionLabel, { color: textClr }]}>{opt}</Text>
                        {showExplanation && isCorrect && (
                          <IconSymbol name="checkmark.circle.fill" size={18} color={colors.olive} />
                        )}
                        {showExplanation && isSelected && !isCorrect && (
                          <IconSymbol name="xmark.circle.fill" size={18} color={colors.crimson} />
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {/* Explanation block & Next button */}
                {showExplanation && (
                  <View style={[styles.explanationContainer, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
                    <Text style={[styles.explanationHeading, { color: colors.gold }]}>
                      Explicação Histórica:
                    </Text>
                    <Text style={[styles.explanationBody, { color: colors.text }]}>
                      {QUIZ_QUESTIONS[quizIndex].explanation}
                    </Text>

                    <TouchableOpacity
                      onPress={handleNextQuizQuestion}
                      style={[styles.quizNextBtn, { backgroundColor: colors.tint }]}
                    >
                      <Text style={styles.quizNextBtnText}>
                        {quizIndex + 1 < QUIZ_QUESTIONS.length ? 'Próxima Questão' : 'Ver Resultados'}
                      </Text>
                      <IconSymbol name="chevron.right" size={14} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ) : (
              /* Quiz Finished View */
              <View style={[styles.finishedCard, { backgroundColor: colors.card, borderColor: colors.gold }]}>
                <View style={[styles.trophyCircle, { backgroundColor: colors.goldSurface }]}>
                  <IconSymbol name="star.fill" size={36} color={colors.gold} />
                </View>
                <Text style={[styles.finishedTitle, { color: colors.text, fontFamily: Fonts.serif }]}>
                  Quiz Concluído!
                </Text>
                <Text style={[styles.finishedScore, { color: colors.gold }]}>
                  Você acertou {quizCorrectCount as number} de {QUIZ_QUESTIONS.length} perguntas
                </Text>
                <Text style={[styles.finishedDesc, { color: colors.textMuted }]}>
                  {(quizCorrectCount as number) >= 4
                    ? 'Magna cum laude! Seu conhecimento sobre o mundo clássico é admirável.'
                    : 'Bom esforço! A sabedoria é construída passo a passo todos os dias.'}
                </Text>

                <TouchableOpacity
                  onPress={handleRestartQuiz}
                  style={[styles.restartBtn, { backgroundColor: colors.tint }]}
                >
                  <IconSymbol name="arrow.triangle.2.circlepath" size={16} color="#FFFFFF" />
                  <Text style={styles.restartBtnText}>Reiniciar Quiz</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        {/* MODE 3: STATS & PROGRESS */}
        {mode === 'stats' && (
          <View style={styles.statsContainer}>
            <View style={styles.statsGrid}>
              <View style={[styles.statBox, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
                <IconSymbol name="flame.fill" size={24} color={colors.gold} />
                <Text style={[styles.statNumber, { color: colors.text }]}>
                  {progress?.streak ?? 1}
                </Text>
                <Text style={[styles.statLabel, { color: colors.textMuted }]}>
                  Dias de Ofício (Streak)
                </Text>
              </View>

              <View style={[styles.statBox, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
                <IconSymbol name="star.fill" size={24} color={colors.olive} />
                <Text style={[styles.statNumber, { color: colors.text }]}>
                  {progress?.masteredFlashcardIds.length || 0}
                </Text>
                <Text style={[styles.statLabel, { color: colors.textMuted }]}>
                  Flashcards Dominados
                </Text>
              </View>

              <View style={[styles.statBox, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
                <IconSymbol name="heart.fill" size={24} color={colors.crimson} />
                <Text style={[styles.statNumber, { color: colors.text }]}>
                  {progress?.favoriteQuoteIds.length || 0}
                </Text>
                <Text style={[styles.statLabel, { color: colors.textMuted }]}>
                  Máximas Favoritas
                </Text>
              </View>

              <View style={[styles.statBox, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
                <IconSymbol name="brain.head.profile" size={24} color={colors.tint} />
                <Text style={[styles.statNumber, { color: colors.text }]}>
                  {progress?.quizScores?.totalAnswered
                    ? `${Math.round(
                        (progress.quizScores.totalCorrect / progress.quizScores.totalAnswered) * 100
                      )}%`
                    : '100%'}
                </Text>
                <Text style={[styles.statLabel, { color: colors.textMuted }]}>
                  Precisão nos Quizzes
                </Text>
              </View>
            </View>

            {/* Motivational Quote */}
            <View style={[styles.quoteBanner, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
              <Text style={[styles.quoteBannerLatin, { color: colors.tint, fontFamily: Fonts.serif }]}>
                “Nulla dies sine linea.”
              </Text>
              <Text style={[styles.quoteBannerPt, { color: colors.textMuted }]}>
                Nenhum dia sem uma linha (estude um pouco todos os dias). — Plínio, o Velho
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 36,
  },
  header: {
    marginBottom: 16,
    paddingTop: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
  },
  modeTabs: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    marginBottom: 18,
  },
  modeTabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  modeTabText: {
    fontSize: 12,
  },
  activeTabText: {
    fontWeight: '700',
  },
  tipBox: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 8,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  tipTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  tipDesc: {
    fontSize: 12,
    lineHeight: 18,
  },
  quizCard: {
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
  },
  quizProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  quizStepText: {
    fontSize: 12,
    fontWeight: '600',
  },
  scoreBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },
  scoreBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  quizQuestionTitle: {
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 24,
    marginBottom: 16,
  },
  quizOptionsList: {
    gap: 10,
    marginBottom: 14,
  },
  quizOptionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    gap: 10,
  },
  quizOptionLetter: {
    fontSize: 13,
    fontWeight: '800',
    width: 20,
  },
  quizOptionLabel: {
    fontSize: 14,
    flex: 1,
  },
  explanationContainer: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 8,
  },
  explanationHeading: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  explanationBody: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 12,
  },
  quizNextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 8,
  },
  quizNextBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  finishedCard: {
    borderRadius: 16,
    padding: 24,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  trophyCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  finishedTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 6,
  },
  finishedScore: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 8,
  },
  finishedDesc: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 20,
  },
  restartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  restartBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  statsContainer: {
    gap: 14,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statBox: {
    width: '48%',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    gap: 6,
  },
  statNumber: {
    fontSize: 26,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 11,
    textAlign: 'center',
  },
  quoteBanner: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  quoteBannerLatin: {
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: '700',
    marginBottom: 4,
  },
  quoteBannerPt: {
    fontSize: 12,
    textAlign: 'center',
  },
});
