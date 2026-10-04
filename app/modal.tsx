import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

import { UserProgress } from '@/types/latin';
import { StorageService } from '@/services/storage';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ModalScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    StorageService.getProgress().then(setProgress);
  }, []);

  const handlePronunciationChange = async (type: 'classica' | 'eclesiastica') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await StorageService.setPreferredPronunciation(type);
    const updated = await StorageService.getProgress();
    setProgress(updated);
  };

  const handleDismiss = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.cardBorder }]}>
        <View style={styles.headerTitleGroup}>
          <IconSymbol name="gearshape.fill" size={20} color={colors.gold} />
          <Text style={[styles.headerTitle, { color: colors.text, fontFamily: Fonts.serif }]}>
            Configurações & Sobre
          </Text>
        </View>

        <TouchableOpacity onPress={handleDismiss} style={[styles.closeBtn, { backgroundColor: colors.surface }]}>
          <IconSymbol name="xmark.circle.fill" size={22} color={colors.icon} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Pronunciation preference */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <Text style={[styles.sectionTitle, { color: colors.tint, fontFamily: Fonts.serif }]}>
            Preferência de Pronúncia Padrão
          </Text>
          <Text style={[styles.sectionDesc, { color: colors.textMuted }]}>
            Escolha o padrão fonético adotado na exibição dos guias de áudio e fonética do app:
          </Text>

          <View style={styles.pronunciationOptions}>
            <TouchableOpacity
              onPress={() => handlePronunciationChange('classica')}
              style={[
                styles.optionBox,
                {
                  backgroundColor:
                    progress?.preferredPronunciation === 'classica'
                      ? colors.goldSurface
                      : colors.surface,
                  borderColor:
                    progress?.preferredPronunciation === 'classica'
                      ? colors.gold
                      : colors.cardBorder,
                },
              ]}
            >
              <View style={styles.optionHeader}>
                <Text
                  style={[
                    styles.optionTitle,
                    {
                      color:
                        progress?.preferredPronunciation === 'classica'
                          ? colors.gold
                          : colors.text,
                    },
                  ]}
                >
                  🏛️ Pronúncia Clássica (Restituta)
                </Text>
                {progress?.preferredPronunciation === 'classica' && (
                  <IconSymbol name="checkmark.circle.fill" size={18} color={colors.gold} />
                )}
              </View>
              <Text style={[styles.optionExplain, { color: colors.textMuted }]}>
                A pronúncia dos tempos de Cícero e César. Letra C sempre soa como /k/ (ex: Cicero = [Kíkero]), V como /w/ (ex: Veni = [Wêni]).
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handlePronunciationChange('eclesiastica')}
              style={[
                styles.optionBox,
                {
                  backgroundColor:
                    progress?.preferredPronunciation === 'eclesiastica'
                      ? colors.goldSurface
                      : colors.surface,
                  borderColor:
                    progress?.preferredPronunciation === 'eclesiastica'
                      ? colors.gold
                      : colors.cardBorder,
                },
              ]}
            >
              <View style={styles.optionHeader}>
                <Text
                  style={[
                    styles.optionTitle,
                    {
                      color:
                        progress?.preferredPronunciation === 'eclesiastica'
                          ? colors.gold
                          : colors.text,
                    },
                  ]}
                >
                  🕯️ Pronúncia Eclesiástica (Romana)
                </Text>
                {progress?.preferredPronunciation === 'eclesiastica' && (
                  <IconSymbol name="checkmark.circle.fill" size={18} color={colors.gold} />
                )}
              </View>
              <Text style={[styles.optionExplain, { color: colors.textMuted }]}>
                A pronúncia adotada na liturgia católica e música sacra. Letra C diante de E/I soa como /tch/ (ex: Cicero = [Tchítchero]), V como /v/.
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Study statistics */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <Text style={[styles.sectionTitle, { color: colors.gold, fontFamily: Fonts.serif }]}>
            Resumo do Seu Desempenho
          </Text>

          <View style={styles.statsRow}>
            <View style={styles.statCol}>
              <Text style={[styles.statVal, { color: colors.tint }]}>{progress?.streak || 1}</Text>
              <Text style={[styles.statSub, { color: colors.textMuted }]}>Dias Seguidos</Text>
            </View>
            <View style={styles.statCol}>
              <Text style={[styles.statVal, { color: colors.gold }]}>
                {progress?.favoriteQuoteIds.length || 0}
              </Text>
              <Text style={[styles.statSub, { color: colors.textMuted }]}>Favoritas</Text>
            </View>
            <View style={styles.statCol}>
              <Text style={[styles.statVal, { color: colors.olive }]}>
                {progress?.masteredFlashcardIds.length || 0}
              </Text>
              <Text style={[styles.statSub, { color: colors.textMuted }]}>Memorizados</Text>
            </View>
            <View style={styles.statCol}>
              <Text style={[styles.statVal, { color: colors.text }]}>
                {progress?.journalEntries.length || 0}
              </Text>
              <Text style={[styles.statSub, { color: colors.textMuted }]}>Reflexões</Text>
            </View>
          </View>
        </View>

        {/* About App */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: Fonts.serif }]}>
            Sobre o Latim Diário
          </Text>
          <Text style={[styles.aboutText, { color: colors.textMuted }]}>
            O <Text style={{ fontWeight: '700', color: colors.text }}>Latim Diário</Text> foi criado para aproximar você da riqueza milenar da cultura greco-romana e da sabedoria clássica. Mais do que uma língua antiga, o latim é a matriz do pensamento jurídico ocidental, da filosofia moral e da espiritualidade.
          </Text>
          <Text style={[styles.aboutText, { color: colors.textMuted, marginTop: 8 }]}>
            Versão 2.0 • Edição Neoclássica Moderna
          </Text>
        </View>

        <TouchableOpacity onPress={handleDismiss} style={[styles.finishBtn, { backgroundColor: colors.tint }]}>
          <Text style={styles.finishBtnText}>Voltar ao App</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  headerTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  closeBtn: {
    padding: 4,
    borderRadius: 12,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 18,
    gap: 16,
    paddingBottom: 40,
  },
  card: {
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  sectionDesc: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 14,
  },
  pronunciationOptions: {
    gap: 10,
  },
  optionBox: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    gap: 4,
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  optionExplain: {
    fontSize: 12,
    lineHeight: 17,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    paddingVertical: 8,
  },
  statCol: {
    alignItems: 'center',
  },
  statVal: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 2,
  },
  statSub: {
    fontSize: 11,
  },
  aboutText: {
    fontSize: 13,
    lineHeight: 20,
  },
  finishBtn: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  finishBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});
