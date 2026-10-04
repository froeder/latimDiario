import React, { useState, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import * as Haptics from 'expo-haptics';

import { LATIN_QUOTES } from '@/constants/latin-data';
import { LatinCategory, LatinQuote, UserProgress } from '@/types/latin';
import { StorageService } from '@/services/storage';
import { QuoteCard } from '@/components/latin/quote-card';
import { PronunciationCard } from '@/components/latin/pronunciation-card';
import { DeclensionCard } from '@/components/latin/declension-card';
import { JournalModal } from '@/components/latin/journal-modal';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const CATEGORIES: { key: LatinCategory | 'all'; label: string; icon: string }[] = [
  { key: 'all', label: 'Todas', icon: 'sparkles' },
  { key: 'filosofia', label: 'Filosofia', icon: 'brain.head.profile' },
  { key: 'sabedoria', label: 'Sabedoria', icon: 'lightbulb.fill' },
  { key: 'historia', label: 'História', icon: 'clock.fill' },
  { key: 'juridico', label: 'Jurídico', icon: 'book.fill' },
  { key: 'liturgico', label: 'Liturgia', icon: 'heart.fill' },
  { key: 'imperio', label: 'Império', icon: 'star.fill' },
];

export default function ExploreScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<LatinCategory | 'all'>('all');
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [activeModalQuote, setActiveModalQuote] = useState<LatinQuote | null>(null);
  const [journalModalVisible, setJournalModalVisible] = useState(false);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    const data = await StorageService.getProgress();
    setProgress(data);
  };

  const handleToggleFavorite = async (id: string) => {
    await StorageService.toggleFavorite(id);
    await loadProgress();
  };

  const handleOpenReflection = (quote: LatinQuote) => {
    setActiveModalQuote(quote);
    setJournalModalVisible(true);
  };

  const filteredQuotes = useMemo(() => {
    return LATIN_QUOTES.filter((q) => {
      const matchesCategory =
        selectedCategory === 'all' || q.category === selectedCategory;

      const qTerm = searchQuery.toLowerCase().trim();
      if (!qTerm) return matchesCategory;

      const matchesSearch =
        q.latin.toLowerCase().includes(qTerm) ||
        q.translation.toLowerCase().includes(qTerm) ||
        q.author.toLowerCase().includes(qTerm) ||
        (q.source && q.source.toLowerCase().includes(qTerm)) ||
        (q.tags && q.tags.some((t) => t.toLowerCase().includes(qTerm)));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text, fontFamily: Fonts.serif }]}>
            Bibliotheca & Explorar
          </Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>
            Acervo clássico de provérbios, brocardos, orações e ferramentas de estudo.
          </Text>
        </View>

        {/* Search Bar */}
        <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <IconSymbol name="magnifyingglass" size={18} color={colors.icon} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Pesquisar por latim, autor, tradução..."
            placeholderTextColor={colors.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearBtn}>
              <IconSymbol name="xmark.circle.fill" size={16} color={colors.icon} />
            </TouchableOpacity>
          )}
        </View>

        {/* Category Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContent}
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.key;
            return (
              <TouchableOpacity
                key={cat.key}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setSelectedCategory(cat.key);
                }}
                style={[
                  styles.categoryChip,
                  {
                    backgroundColor: isSelected ? colors.goldSurface : colors.card,
                    borderColor: isSelected ? colors.gold : colors.cardBorder,
                  },
                ]}
              >
                <IconSymbol
                  name={cat.icon as any}
                  size={14}
                  color={isSelected ? colors.gold : colors.icon}
                />
                <Text
                  style={[
                    styles.categoryChipText,
                    {
                      color: isSelected ? colors.gold : colors.textMuted,
                      fontWeight: isSelected ? '700' : '500',
                    },
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Educational Grammar & Pronunciation Section */}
        <View style={styles.guidesSection}>
          <Text style={[styles.sectionHeading, { color: colors.textMuted }]}>
            FERRAMENTAS DE APRENDIZADO
          </Text>
          <PronunciationCard />
          <DeclensionCard />
        </View>

        {/* Quotes Section Header */}
        <View style={styles.resultsHeaderRow}>
          <Text style={[styles.sectionHeading, { color: colors.textMuted }]}>
            COLEÇÃO DE MÁXIMAS ({filteredQuotes.length})
          </Text>
        </View>

        {/* Quotes List */}
        {filteredQuotes.length === 0 ? (
          <View style={[styles.emptyContainer, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            <IconSymbol name="magnifyingglass" size={32} color={colors.icon} />
            <Text style={[styles.emptyTitle, { color: colors.text, fontFamily: Fonts.serif }]}>
              Nenhum termo encontrado
            </Text>
            <Text style={[styles.emptyDesc, { color: colors.textMuted }]}>
              Tente buscar por outras palavras em latim, autores como Sêneca ou temas como sabedoria.
            </Text>
          </View>
        ) : (
          filteredQuotes.map((quote) => (
            <QuoteCard
              key={quote.id}
              quote={quote}
              isFavorite={progress?.favoriteQuoteIds.includes(quote.id) ?? false}
              onToggleFavorite={handleToggleFavorite}
              onOpenReflection={handleOpenReflection}
            />
          ))
        )}
      </ScrollView>

      {/* Journal Reflection Modal */}
      <JournalModal
        visible={journalModalVisible}
        quote={activeModalQuote}
        onClose={() => setJournalModalVisible(false)}
        onSaved={loadProgress}
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 14,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    height: '100%',
  },
  clearBtn: {
    padding: 4,
  },
  categoriesScroll: {
    marginBottom: 18,
  },
  categoriesContent: {
    gap: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
  },
  categoryChipText: {
    fontSize: 12,
  },
  guidesSection: {
    marginBottom: 12,
  },
  sectionHeading: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  resultsHeaderRow: {
    marginTop: 8,
    marginBottom: 4,
  },
  emptyContainer: {
    padding: 30,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginVertical: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 6,
  },
  emptyDesc: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
});
