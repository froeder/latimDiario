import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';

import { PRONUNCIATION_RULES } from '@/constants/latin-data';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function PronunciationCard() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setExpanded(!expanded);
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder, shadowColor: colors.shadowColor }]}>
      <TouchableOpacity onPress={toggleExpand} style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.iconBox, { backgroundColor: colors.goldSurface }]}>
            <IconSymbol name="volume.3.fill" size={18} color={colors.gold} />
          </View>
          <View>
            <Text style={[styles.title, { color: colors.text, fontFamily: Fonts.serif }]}>
              Pronúncia Clássica vs. Eclesiástica
            </Text>
            <Text style={[styles.subtitle, { color: colors.textMuted }]}>
              Entenda as diferenças entre o Latim de César e o da Igreja
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
          <Text style={[styles.introText, { color: colors.textMuted }]}>
            Existem duas tradições principais de pronúncia: a <Text style={{ fontWeight: '700', color: colors.text }}>Pronúncia Restituta (Clássica)</Text>, utilizada no período da República e Império Romano, e a <Text style={{ fontWeight: '700', color: colors.text }}>Pronúncia Eclesiástica (Romana)</Text>, desenvolvida pela Igreja Católica na Idade Média e renascença.
          </Text>

          <View style={styles.rulesList}>
            {PRONUNCIATION_RULES.map((rule, idx) => (
              <View
                key={idx}
                style={[styles.ruleItem, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}
              >
                <View style={[styles.letterBadge, { backgroundColor: colors.goldSurface, borderColor: colors.gold }]}>
                  <Text style={[styles.letterText, { color: colors.gold }]}>{rule.letter}</Text>
                </View>

                <View style={styles.ruleDetails}>
                  <View style={styles.ruleRow}>
                    <Text style={[styles.traditionLabel, { color: colors.tint }]}>🏛️ Clássica:</Text>
                    <Text style={[styles.ruleDescription, { color: colors.text }]}>{rule.classical}</Text>
                  </View>

                  <View style={styles.ruleRow}>
                    <Text style={[styles.traditionLabel, { color: colors.olive }]}>🕯️ Eclesiástica:</Text>
                    <Text style={[styles.ruleDescription, { color: colors.text }]}>{rule.ecclesiastical}</Text>
                  </View>
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
  introText: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 14,
  },
  rulesList: {
    gap: 10,
  },
  ruleItem: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    gap: 12,
  },
  letterBadge: {
    width: 38,
    height: 38,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  letterText: {
    fontSize: 13,
    fontWeight: '800',
  },
  ruleDetails: {
    flex: 1,
    gap: 6,
  },
  ruleRow: {
    flexDirection: 'column',
  },
  traditionLabel: {
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 1,
  },
  ruleDescription: {
    fontSize: 12,
    lineHeight: 17,
  },
});
