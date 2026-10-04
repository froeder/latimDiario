import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import * as Haptics from 'expo-haptics';

import { GRAMMAR_DECLENSIONS } from '@/constants/latin-data';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function DeclensionCard() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const [expanded, setExpanded] = useState(false);
  const [selectedDeclensionIdx, setSelectedDeclensionIdx] = useState(0);

  const activeDeclension = GRAMMAR_DECLENSIONS[selectedDeclensionIdx];

  const toggleExpand = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setExpanded(!expanded);
  };

  const handleSelectTab = (idx: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedDeclensionIdx(idx);
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder, shadowColor: colors.shadowColor }]}>
      <TouchableOpacity onPress={toggleExpand} style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.iconBox, { backgroundColor: colors.oliveSurface }]}>
            <IconSymbol name="books.vertical.fill" size={18} color={colors.olive} />
          </View>
          <View>
            <Text style={[styles.title, { color: colors.text, fontFamily: Fonts.serif }]}>
              Tabela das Declinações Latinas
            </Text>
            <Text style={[styles.subtitle, { color: colors.textMuted }]}>
              Guia rápido de casos gramaticais (Nominativo, Acusativo, Genitivo...)
            </Text>
          </View>
        </View>

        <IconSymbol
          name={expanded ? 'chevron.up' : 'chevron.down'}
          size={18}
          color={colors.gold}
        />
      </TouchableOpacity>

      {expanded && (
        <View style={[styles.content, { borderTopColor: colors.cardBorder }]}>
          {/* Declension Selector Tabs */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScroll}>
            {GRAMMAR_DECLENSIONS.map((dec, idx) => (
              <TouchableOpacity
                key={dec.id}
                onPress={() => handleSelectTab(idx)}
                style={[
                  styles.tabItem,
                  {
                    backgroundColor: selectedDeclensionIdx === idx ? colors.goldSurface : colors.surface,
                    borderColor: selectedDeclensionIdx === idx ? colors.gold : colors.cardBorder,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.tabItemText,
                    {
                      color: selectedDeclensionIdx === idx ? colors.gold : colors.textMuted,
                      fontWeight: selectedDeclensionIdx === idx ? '700' : '500',
                    },
                  ]}
                >
                  {dec.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Model Word Info */}
          <View style={[styles.modelWordBox, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
            <Text style={[styles.modelTitle, { color: colors.tint, fontFamily: Fonts.serif }]}>
              Exemplo Modelo: {activeDeclension.modelWord}
            </Text>
            <Text style={[styles.modelMeaning, { color: colors.textMuted }]}>
              Significado: {activeDeclension.meaning} • {activeDeclension.description}
            </Text>
          </View>

          {/* Declension Table */}
          <View style={[styles.tableContainer, { borderColor: colors.cardBorder }]}>
            {/* Table Header */}
            <View style={[styles.tableHeaderRow, { backgroundColor: colors.badgeBg, borderBottomColor: colors.cardBorder }]}>
              <Text style={[styles.colHeader, styles.colCase, { color: colors.text }]}>Caso & Função</Text>
              <Text style={[styles.colHeader, styles.colForm, { color: colors.text }]}>Singular</Text>
              <Text style={[styles.colHeader, styles.colForm, { color: colors.text }]}>Plural</Text>
            </View>

            {/* Cases Rows */}
            {activeDeclension.cases.map((c, idx) => (
              <View
                key={idx}
                style={[
                  styles.tableRow,
                  {
                    borderBottomColor: colors.cardBorder,
                    backgroundColor: idx % 2 === 0 ? 'transparent' : colors.surface,
                  },
                ]}
              >
                <View style={styles.colCase}>
                  <Text style={[styles.caseName, { color: colors.gold, fontFamily: Fonts.serif }]}>
                    {c.caseName}
                  </Text>
                  <Text style={[styles.functionPt, { color: colors.textMuted }]}>{c.functionPt}</Text>
                </View>

                <View style={styles.colForm}>
                  <Text style={[styles.latinForm, { color: colors.text, fontFamily: Fonts.mono }]}>
                    {c.singular}
                  </Text>
                </View>

                <View style={styles.colForm}>
                  <Text style={[styles.latinForm, { color: colors.text, fontFamily: Fonts.mono }]}>
                    {c.plural}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    paddingRight: 8,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 11,
    marginTop: 2,
  },
  content: {
    borderTopWidth: 1,
    paddingTop: 14,
    marginTop: 14,
  },
  tabsScroll: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  tabItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 8,
  },
  tabItemText: {
    fontSize: 12,
  },
  modelWordBox: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 12,
  },
  modelTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  modelMeaning: {
    fontSize: 12,
    lineHeight: 16,
  },
  tableContainer: {
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
  },
  colHeader: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  colCase: {
    flex: 1.4,
  },
  colForm: {
    flex: 1,
    alignItems: 'center',
  },
  caseName: {
    fontSize: 12,
    fontWeight: '700',
  },
  functionPt: {
    fontSize: 10,
    marginTop: 1,
  },
  latinForm: {
    fontSize: 13,
    fontWeight: '600',
  },
});
