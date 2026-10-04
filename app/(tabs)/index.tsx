import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

import { LATIN_QUOTES, LATIN_WORDS } from '@/constants/latin-data';
import { LatinQuote, LatinWord, UserProgress } from '@/types/latin';
import { StorageService } from '@/services/storage';
import { RomanHeader } from '@/components/latin/roman-header';
import { QuoteCard } from '@/components/latin/quote-card';
import { WordCard } from '@/components/latin/word-card';
import { QuickQuiz } from '@/components/latin/quick-quiz';
import { JournalModal } from '@/components/latin/journal-modal';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedQuoteIndex, setSelectedQuoteIndex] = useState(0);
  const [selectedWordIndex, setSelectedWordIndex] = useState(0);
  const [activeModalQuote, setActiveModalQuote] = useState<LatinQuote | null>(null);
  const [journalModalVisible, setJournalModalVisible] = useState(false);

  // Load user progress and set daily indices
  const loadData = useCallback(async () => {
    const updatedStreak = await StorageService.updateStreak();
    const currentProgress = await StorageService.getProgress();
    setProgress({ ...currentProgress, streak: updatedStreak });

    // Deterministic daily index based on day of year
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    setSelectedQuoteIndex(dayOfYear % LATIN_QUOTES.length);
    setSelectedWordIndex(dayOfYear % LATIN_WORDS.length);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleToggleFavorite = async (quoteId: string) => {
    await StorageService.toggleFavorite(quoteId);
    const currentProgress = await StorageService.getProgress();
    setProgress(currentProgress);
  };

  const handleShuffleQuote = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    let nextIdx;
    do {
      nextIdx = Math.floor(Math.random() * LATIN_QUOTES.length);
    } while (nextIdx === selectedQuoteIndex && LATIN_QUOTES.length > 1);
    setSelectedQuoteIndex(nextIdx);
  };

  const handleOpenReflection = (quote: LatinQuote) => {
    setActiveModalQuote(quote);
    setJournalModalVisible(true);
  };

  const featuredQuote = LATIN_QUOTES[selectedQuoteIndex] || LATIN_QUOTES[0];
  const featuredWord = LATIN_WORDS[selectedWordIndex] || LATIN_WORDS[0];
  const isQuoteFav = progress?.favoriteQuoteIds.includes(featuredQuote.id) ?? false;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <RomanHeader streak={progress?.streak ?? 1} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.tint}
          />
        }
      >
        {/* Welcome Salutation */}
        <View style={styles.salveContainer}>
          <Text style={[styles.salveTitle, { color: colors.text, fontFamily: Fonts.serif }]}>
            Salve, Viator! 🏛️
          </Text>
          <Text style={[styles.salveSubtitle, { color: colors.textMuted }]}>
            Sua dose diária de sabedoria clássica, estoicismo e língua latina.
          </Text>
        </View>

        {/* Section: Sententia Diei (Citação do Dia) */}
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionTitleGroup}>
            <IconSymbol name="sparkles" size={17} color={colors.gold} />
            <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: Fonts.serif }]}>
              SENTENTIA DIEI (CITAÇÃO DO DIA)
            </Text>
          </View>

          <TouchableOpacity onPress={handleShuffleQuote} style={styles.shuffleBtn}>
            <IconSymbol name="arrow.triangle.2.circlepath" size={13} color={colors.gold} />
            <Text style={[styles.shuffleText, { color: colors.gold }]}>Alea Iacta Est</Text>
          </TouchableOpacity>
        </View>

        <QuoteCard
          quote={featuredQuote}
          isFavorite={isQuoteFav}
          onToggleFavorite={handleToggleFavorite}
          onOpenReflection={handleOpenReflection}
          onShuffle={handleShuffleQuote}
          featured={true}
        />

        {/* Section: Verbum Diei (Palavra do Dia) */}
        <WordCard word={featuredWord} />

        {/* Section: Desafio Rápido (Quiz) */}
        <QuickQuiz />

        {/* Quick Navigation Cards */}
        <View style={styles.quickNavGrid}>
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/practice')}
            style={[styles.quickNavCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
          >
            <View style={[styles.navIconBox, { backgroundColor: colors.goldSurface }]}>
              <IconSymbol name="brain.head.profile" size={20} color={colors.gold} />
            </View>
            <Text style={[styles.navCardTitle, { color: colors.text, fontFamily: Fonts.serif }]}>
              Treinar Flashcards
            </Text>
            <Text style={[styles.navCardDesc, { color: colors.textMuted }]}>
              Memorize vocabulário e expressões
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/(tabs)/explore')}
            style={[styles.quickNavCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
          >
            <View style={[styles.navIconBox, { backgroundColor: colors.oliveSurface }]}>
              <IconSymbol name="books.vertical.fill" size={20} color={colors.olive} />
            </View>
            <Text style={[styles.navCardTitle, { color: colors.text, fontFamily: Fonts.serif }]}>
              Declinações & Gramática
            </Text>
            <Text style={[styles.navCardDesc, { color: colors.textMuted }]}>
              Consulte tabelas e pronúncia
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Reflection Journal Modal */}
      <JournalModal
        visible={journalModalVisible}
        quote={activeModalQuote}
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  salveContainer: {
    marginBottom: 16,
  },
  salveTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  salveSubtitle: {
    fontSize: 13,
    lineHeight: 18,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  shuffleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  shuffleText: {
    fontSize: 11,
    fontWeight: '700',
  },
  quickNavGrid: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
    marginBottom: 12,
  },
  quickNavCard: {
    flex: 1,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
  },
  navIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  navCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 3,
  },
  navCardDesc: {
    fontSize: 11,
    lineHeight: 15,
  },
});
