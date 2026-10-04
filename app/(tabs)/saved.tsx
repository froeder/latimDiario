import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import * as Haptics from 'expo-haptics';

import { LATIN_QUOTES } from '@/constants/latin-data';
import { LatinQuote, UserProgress } from '@/types/latin';
import { StorageService } from '@/services/storage';
import { QuoteCard } from '@/components/latin/quote-card';
import { JournalModal } from '@/components/latin/journal-modal';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type ViewMode = 'favorites' | 'journal';

export default function SavedScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const [mode, setMode] = useState<ViewMode>('favorites');
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [journalModalVisible, setJournalModalVisible] = useState(false);
  const [activeQuoteForReflection, setActiveQuoteForReflection] = useState<LatinQuote | null>(null);

  const loadData = useCallback(async () => {
    const data = await StorageService.getProgress();
    setProgress(data);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleToggleFavorite = async (id: string) => {
    await StorageService.toggleFavorite(id);
    await loadData();
  };

  const handleOpenReflection = (quote: LatinQuote) => {
    setActiveQuoteForReflection(quote);
    setJournalModalVisible(true);
  };

  const handleNewIndependentNote = () => {
    setActiveQuoteForReflection(null);
    setJournalModalVisible(true);
  };

  const handleDeleteEntry = (entryId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(
      'Excluir Reflexão',
      'Tem certeza de que deseja remover esta anotação do seu diário?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            await StorageService.deleteJournalEntry(entryId);
            await loadData();
          },
        },
      ]
    );
  };

  // Filter favorited quotes
  const favoriteQuotes = LATIN_QUOTES.filter((q) =>
    progress?.favoriteQuoteIds.includes(q.id)
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text, fontFamily: Fonts.serif }]}>
            Memoria & Diarium
          </Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>
            Suas máximas favoritas salvas e o seu diário pessoal de aprendizado clássico.
          </Text>
        </View>

        {/* View Mode Switcher */}
        <View style={[styles.switcher, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
          <TouchableOpacity
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setMode('favorites');
            }}
            style={[
              styles.switchBtn,
              mode === 'favorites' && { backgroundColor: colors.card, borderColor: colors.cardBorder },
            ]}
          >
            <IconSymbol
              name="heart.fill"
              size={15}
              color={mode === 'favorites' ? colors.crimson : colors.textMuted}
            />
            <Text
              style={[
                styles.switchBtnText,
                { color: mode === 'favorites' ? colors.text : colors.textMuted },
                mode === 'favorites' && styles.activeSwitchText,
              ]}
            >
              Favoritos ({favoriteQuotes.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setMode('journal');
            }}
            style={[
              styles.switchBtn,
              mode === 'journal' && { backgroundColor: colors.card, borderColor: colors.cardBorder },
            ]}
          >
            <IconSymbol
              name="square.and.pencil"
              size={15}
              color={mode === 'journal' ? colors.gold : colors.textMuted}
            />
            <Text
              style={[
                styles.switchBtnText,
                { color: mode === 'journal' ? colors.text : colors.textMuted },
                mode === 'journal' && styles.activeSwitchText,
              ]}
            >
              Meu Diário ({progress?.journalEntries.length || 0})
            </Text>
          </TouchableOpacity>
        </View>

        {/* SECTION 1: FAVORITES */}
        {mode === 'favorites' && (
          <View>
            {favoriteQuotes.length === 0 ? (
              <View style={[styles.emptyCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
                <IconSymbol name="heart" size={36} color={colors.textLight} />
                <Text style={[styles.emptyTitle, { color: colors.text, fontFamily: Fonts.serif }]}>
                  Nenhuma máxima favoritada
                </Text>
                <Text style={[styles.emptySubtitle, { color: colors.textMuted }]}>
                  Ao encontrar uma frase que ressoe com você, toque no ícone de coração para guardá-la em seu relicário pessoal.
                </Text>
              </View>
            ) : (
              favoriteQuotes.map((quote) => (
                <QuoteCard
                  key={quote.id}
                  quote={quote}
                  isFavorite={true}
                  onToggleFavorite={handleToggleFavorite}
                  onOpenReflection={handleOpenReflection}
                />
              ))
            )}
          </View>
        )}

        {/* SECTION 2: DIÁRIO DE REFLEXÕES */}
        {mode === 'journal' && (
          <View>
            <TouchableOpacity
              onPress={handleNewIndependentNote}
              style={[styles.newNoteBtn, { backgroundColor: colors.tint }]}
            >
              <IconSymbol name="square.and.pencil" size={16} color="#FFFFFF" />
              <Text style={styles.newNoteBtnText}>Escrever Nova Reflexão</Text>
            </TouchableOpacity>

            {!progress?.journalEntries || progress.journalEntries.length === 0 ? (
              <View style={[styles.emptyCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
                <IconSymbol name="book.fill" size={36} color={colors.textLight} />
                <Text style={[styles.emptyTitle, { color: colors.text, fontFamily: Fonts.serif }]}>
                  Seu diário está em branco
                </Text>
                <Text style={[styles.emptySubtitle, { color: colors.textMuted }]}>
                  “Littera scripta manet” (A palavra escrita permanece). Escreva suas impressões sobre o que o Latim lhe ensinou hoje.
                </Text>
              </View>
            ) : (
              progress.journalEntries.map((entry) => (
                <View
                  key={entry.id}
                  style={[styles.journalCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
                >
                  <View style={styles.journalHeader}>
                    <View style={styles.journalHeaderLeft}>
                      <Text style={[styles.journalTitle, { color: colors.text, fontFamily: Fonts.serif }]}>
                        {entry.title}
                      </Text>
                      <Text style={[styles.journalDate, { color: colors.textMuted }]}>
                        {entry.date}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => handleDeleteEntry(entry.id)}
                      style={[styles.deleteBtn, { backgroundColor: colors.surface }]}
                      accessibilityLabel="Excluir reflexão"
                    >
                      <IconSymbol name="xmark.circle.fill" size={16} color={colors.icon} />
                    </TouchableOpacity>
                  </View>

                  {entry.quoteLatin && (
                    <View style={[styles.attachedQuote, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
                      <Text style={[styles.attachedQuoteText, { color: colors.gold, fontFamily: Fonts.serif }]}>
                        “{entry.quoteLatin}”
                      </Text>
                    </View>
                  )}

                  <Text style={[styles.journalContent, { color: colors.text }]}>
                    {entry.content}
                  </Text>
                </View>
              ))
            )}
          </View>
        )}
      </ScrollView>

      {/* Reflection Journal Modal */}
      <JournalModal
        visible={journalModalVisible}
        quote={activeQuoteForReflection}
        onClose={() => setJournalModalVisible(false)}
        onSaved={loadData}
      />
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
  switcher: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    marginBottom: 18,
  },
  switchBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 9,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  switchBtnText: {
    fontSize: 12,
  },
  activeSwitchText: {
    fontWeight: '700',
  },
  newNoteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  newNoteBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  emptyCard: {
    padding: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
  },
  emptySubtitle: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 19,
  },
  journalCard: {
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    marginBottom: 14,
  },
  journalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  journalHeaderLeft: {
    flex: 1,
  },
  journalTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  journalDate: {
    fontSize: 11,
  },
  deleteBtn: {
    padding: 4,
    borderRadius: 12,
  },
  attachedQuote: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
  },
  attachedQuoteText: {
    fontSize: 13,
    fontStyle: 'italic',
  },
  journalContent: {
    fontSize: 14,
    lineHeight: 21,
  },
});
