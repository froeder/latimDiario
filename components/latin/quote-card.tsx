import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Share,
  Platform,
} from 'react-native';
import * as Haptics from 'expo-haptics';

import { LatinQuote } from '@/types/latin';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface QuoteCardProps {
  quote: LatinQuote;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpenReflection?: (quote: LatinQuote) => void;
  onShuffle?: () => void;
  featured?: boolean;
}

export function QuoteCard({
  quote,
  isFavorite,
  onToggleFavorite,
  onOpenReflection,
  onShuffle,
  featured = false,
}: QuoteCardProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const [expanded, setExpanded] = useState(featured);
  const [activePronunciation, setActivePronunciation] = useState<'classica' | 'eclesiastica'>('classica');
  const [copiedNotice, setCopiedNotice] = useState(false);

  const categoryLabels: Record<string, { label: string; color: string; bg: string }> = {
    filosofia: { label: 'Filosofia & Estoicismo', color: colors.gold, bg: colors.goldSurface },
    juridico: { label: 'Brocardo Jurídico', color: colors.crimson, bg: colors.crimsonSurface },
    liturgico: { label: 'Liturgia & Fé', color: colors.olive, bg: colors.oliveSurface },
    imperio: { label: 'Império & História', color: colors.tint, bg: colors.badgeBg },
    sabedoria: { label: 'Sabedoria de Vida', color: colors.gold, bg: colors.goldSurface },
  };

  const currentCat = categoryLabels[quote.category] || {
    label: quote.category,
    color: colors.gold,
    bg: colors.goldSurface,
  };

  const handleFavoritePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onToggleFavorite(quote.id);
  };

  const handleShare = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    try {
      const message = `"${quote.latin}"\n${quote.translation}\n— ${quote.author}${quote.source ? ` (${quote.source})` : ''}\n\nVia App Latim Diário`;
      if (Platform.OS === 'web' && typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(message);
        setCopiedNotice(true);
        setTimeout(() => setCopiedNotice(false), 2000);
      } else {
        await Share.share({ message });
      }
    } catch {
      // ignore
    }
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: featured ? colors.gold : colors.cardBorder,
          borderWidth: featured ? 1.5 : 1,
          shadowColor: colors.shadowColor,
        },
      ]}
    >
      {/* Top Tag & Actions */}
      <View style={styles.topRow}>
        <View style={[styles.categoryBadge, { backgroundColor: currentCat.bg, borderColor: currentCat.color }]}>
          <Text style={[styles.categoryText, { color: currentCat.color }]}>{currentCat.label}</Text>
        </View>

        <View style={styles.topActions}>
          {onShuffle && (
            <TouchableOpacity
              onPress={onShuffle}
              style={[styles.smallBtn, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}
              accessibilityLabel="Sortear outra frase"
            >
              <IconSymbol name="arrow.triangle.2.circlepath" size={16} color={colors.gold} />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={handleFavoritePress}
            style={[styles.smallBtn, { backgroundColor: isFavorite ? colors.crimsonSurface : colors.surface, borderColor: colors.cardBorder }]}
            accessibilityLabel={isFavorite ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
          >
            <IconSymbol
              name={isFavorite ? 'heart.fill' : 'heart'}
              size={18}
              color={isFavorite ? colors.crimson : colors.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Latin Text */}
      <Text style={[styles.latinText, { color: colors.text, fontFamily: Fonts.serif }]}>
        “{quote.latin}”
      </Text>

      {/* Portuguese Translation */}
      <Text style={[styles.translationText, { color: colors.textMuted }]}>
        {quote.translation}
      </Text>

      {/* Author and Source Attribution */}
      <View style={styles.authorRow}>
        <View style={[styles.ornamentLine, { backgroundColor: colors.cardBorder }]} />
        <View style={styles.authorContainer}>
          <Text style={[styles.authorName, { color: colors.gold, fontFamily: Fonts.serif }]}>
            {quote.author}
          </Text>
          {quote.source && (
            <Text style={[styles.sourceText, { color: colors.textLight }]}>
              {quote.source} {quote.era ? `• ${quote.era}` : ''}
            </Text>
          )}
        </View>
      </View>

      {/* Pronunciation Helper */}
      {(quote.classicalPronunciation || quote.ecclesiasticalPronunciation) && (
        <View style={[styles.pronunciationBox, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
          <View style={styles.pronunciationHeader}>
            <View style={styles.pronunciationTitleGroup}>
              <IconSymbol name="volume.3.fill" size={15} color={colors.gold} />
              <Text style={[styles.pronunciationLabel, { color: colors.text }]}>Guia Fonético:</Text>
            </View>

            <View style={styles.pronunciationTabs}>
              <TouchableOpacity
                onPress={() => setActivePronunciation('classica')}
                style={[
                  styles.pronTab,
                  activePronunciation === 'classica' && { backgroundColor: colors.goldSurface, borderColor: colors.gold },
                ]}
              >
                <Text
                  style={[
                    styles.pronTabText,
                    { color: activePronunciation === 'classica' ? colors.gold : colors.textMuted },
                  ]}
                >
                  Clássica
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setActivePronunciation('eclesiastica')}
                style={[
                  styles.pronTab,
                  activePronunciation === 'eclesiastica' && { backgroundColor: colors.goldSurface, borderColor: colors.gold },
                ]}
              >
                <Text
                  style={[
                    styles.pronTabText,
                    { color: activePronunciation === 'eclesiastica' ? colors.gold : colors.textMuted },
                  ]}
                >
                  Eclesiástica
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={[styles.phoneticText, { color: colors.textMuted, fontFamily: Fonts.mono }]}>
            /{activePronunciation === 'classica' ? quote.classicalPronunciation : quote.ecclesiasticalPronunciation}/
          </Text>
        </View>
      )}

      {/* Expandable Historical Context & Philosophical Reflection */}
      {expanded && (
        <View style={[styles.detailsSection, { borderTopColor: colors.cardBorder }]}>
          <View style={styles.contextBlock}>
            <Text style={[styles.sectionTitle, { color: colors.tint, fontFamily: Fonts.serif }]}>
              🏛️ Contexto Histórico
            </Text>
            <Text style={[styles.sectionBody, { color: colors.text }]}>{quote.historicalContext}</Text>
          </View>

          <View style={styles.reflectionBlock}>
            <Text style={[styles.sectionTitle, { color: colors.gold, fontFamily: Fonts.serif }]}>
              🌿 Sabedoria Prática para Hoje
            </Text>
            <Text style={[styles.sectionBody, { color: colors.text }]}>{quote.reflection}</Text>
          </View>

          {quote.tags && quote.tags.length > 0 && (
            <View style={styles.tagsRow}>
              {quote.tags.map((tag) => (
                <View key={tag} style={[styles.tagPill, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
                  <Text style={[styles.tagText, { color: colors.textMuted }]}>#{tag}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      )}

      {/* Bottom Bar: Expand Details / Share / Reflection */}
      <View style={[styles.bottomBar, { borderTopColor: colors.cardBorder }]}>
        <TouchableOpacity
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setExpanded(!expanded);
          }}
          style={styles.expandBtn}
        >
          <Text style={[styles.expandBtnText, { color: colors.gold }]}>
            {expanded ? 'Ocultar Reflexão' : 'Ver Contexto & Reflexão'}
          </Text>
          <IconSymbol
            name={expanded ? 'chevron.up' : 'chevron.down'}
            size={16}
            color={colors.gold}
          />
        </TouchableOpacity>

        <View style={styles.bottomRightBtns}>
          {onOpenReflection && (
            <TouchableOpacity
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                onOpenReflection(quote);
              }}
              style={[styles.actionBtn, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}
              accessibilityLabel="Escrever reflexão pessoal"
            >
              <IconSymbol name="square.and.pencil" size={15} color={colors.text} />
              <Text style={[styles.actionBtnText, { color: colors.text }]}>Refletir</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={handleShare}
            style={[styles.actionBtn, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}
            accessibilityLabel="Compartilhar citação"
          >
            <IconSymbol name="paperplane.fill" size={14} color={colors.tint} />
            <Text style={[styles.actionBtnText, { color: colors.tint }]}>
              {copiedNotice ? 'Copiado!' : 'Partilhar'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  smallBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  latinText: {
    fontSize: 21,
    lineHeight: 30,
    fontWeight: '600',
    letterSpacing: 0.4,
    marginBottom: 8,
  },
  translationText: {
    fontSize: 15,
    lineHeight: 22,
    fontStyle: 'italic',
    marginBottom: 14,
  },
  authorRow: {
    marginBottom: 12,
  },
  ornamentLine: {
    height: 1,
    marginBottom: 8,
    width: '40%',
  },
  authorContainer: {
    flexDirection: 'column',
  },
  authorName: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  sourceText: {
    fontSize: 12,
    marginTop: 2,
  },
  pronunciationBox: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 14,
  },
  pronunciationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  pronunciationTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pronunciationLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  pronunciationTabs: {
    flexDirection: 'row',
    gap: 4,
  },
  pronTab: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  pronTabText: {
    fontSize: 10,
    fontWeight: '600',
  },
  phoneticText: {
    fontSize: 12,
    lineHeight: 18,
  },
  detailsSection: {
    borderTopWidth: 1,
    paddingTop: 12,
    marginBottom: 10,
    gap: 12,
  },
  contextBlock: {},
  reflectionBlock: {},
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  sectionBody: {
    fontSize: 13,
    lineHeight: 20,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  tagPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  tagText: {
    fontSize: 11,
  },
  bottomBar: {
    borderTopWidth: 1,
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expandBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  expandBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  bottomRightBtns: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  actionBtnText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
