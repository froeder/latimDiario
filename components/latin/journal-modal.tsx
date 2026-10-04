import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import * as Haptics from 'expo-haptics';

import { LatinQuote } from '@/types/latin';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { StorageService } from '@/services/storage';

interface JournalModalProps {
  visible: boolean;
  quote?: LatinQuote | null;
  onClose: () => void;
  onSaved: () => void;
}

export function JournalModal({ visible, quote, onClose, onSaved }: JournalModalProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const [title, setTitle] = useState(quote ? `Reflexão: ${quote.latin}` : 'Minha Reflexão Diária');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async () => {
    if (!content.trim()) return;

    setIsSubmitting(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    await StorageService.addJournalEntry({
      quoteId: quote?.id,
      quoteLatin: quote?.latin,
      title: title.trim() || 'Anotação Clássica',
      content: content.trim(),
    });

    setIsSubmitting(false);
    setContent('');
    onSaved();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.modalOverlay}
      >
        <View style={[styles.modalContent, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <View style={styles.headerTitleGroup}>
              <IconSymbol name="square.and.pencil" size={18} color={colors.gold} />
              <Text style={[styles.modalTitle, { color: colors.text, fontFamily: Fonts.serif }]}>
                Diarium (Diário de Estudos)
              </Text>
            </View>

            <TouchableOpacity
              onPress={onClose}
              style={[styles.closeBtn, { backgroundColor: colors.surface }]}
            >
              <IconSymbol name="xmark.circle.fill" size={20} color={colors.icon} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollBody} keyboardShouldPersistTaps="handled">
            {quote && (
              <View style={[styles.quoteReference, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
                <Text style={[styles.quoteRefLatin, { color: colors.tint, fontFamily: Fonts.serif }]}>
                  “{quote.latin}”
                </Text>
                <Text style={[styles.quoteRefPt, { color: colors.textMuted }]}>
                  {quote.translation} — {quote.author}
                </Text>
              </View>
            )}

            <Text style={[styles.inputLabel, { color: colors.textMuted }]}>Título da Reflexão:</Text>
            <TextInput
              style={[styles.titleInput, { backgroundColor: colors.surface, borderColor: colors.cardBorder, color: colors.text }]}
              value={title}
              onChangeText={setTitle}
              placeholder="Ex: O que esta frase me ensina hoje?"
              placeholderTextColor={colors.textLight}
            />

            <Text style={[styles.inputLabel, { color: colors.textMuted }]}>Suas Anotações e Lições:</Text>
            <TextInput
              style={[
                styles.contentInput,
                { backgroundColor: colors.surface, borderColor: colors.cardBorder, color: colors.text },
              ]}
              value={content}
              onChangeText={setContent}
              placeholder="Escreva como você pode aplicar este ensinamento na sua vida..."
              placeholderTextColor={colors.textLight}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </ScrollView>

          {/* Footer actions */}
          <View style={[styles.footerRow, { borderTopColor: colors.cardBorder }]}>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.cancelBtn, { borderColor: colors.cardBorder }]}
            >
              <Text style={[styles.cancelBtnText, { color: colors.textMuted }]}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSave}
              disabled={isSubmitting || !content.trim()}
              style={[
                styles.saveBtn,
                { backgroundColor: content.trim() ? colors.tint : colors.cardBorder },
              ]}
            >
              <Text style={styles.saveBtnText}>Salvar no Diário</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    maxHeight: '85%',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  closeBtn: {
    padding: 4,
    borderRadius: 12,
  },
  scrollBody: {
    marginBottom: 16,
  },
  quoteReference: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 16,
  },
  quoteRefLatin: {
    fontSize: 15,
    fontStyle: 'italic',
    fontWeight: '600',
    marginBottom: 4,
  },
  quoteRefPt: {
    fontSize: 12,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
  },
  titleInput: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 14,
    marginBottom: 14,
  },
  contentInput: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 14,
    minHeight: 120,
  },
  footerRow: {
    borderTopWidth: 1,
    paddingTop: 14,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  cancelBtnText: {
    fontSize: 13,
    fontWeight: '600',
  },
  saveBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
