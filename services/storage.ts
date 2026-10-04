import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProgress, JournalEntry } from '@/types/latin';

const STORAGE_KEY_PROGRESS = '@latim_diario_progress_v1';

const DEFAULT_PROGRESS: UserProgress = {
  streak: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  favoriteQuoteIds: ['carpe-diem', 'memento-mori', 'amor-fati'],
  masteredFlashcardIds: [],
  quizScores: {
    totalAnswered: 0,
    totalCorrect: 0,
  },
  preferredPronunciation: 'classica',
  journalEntries: [
    {
      id: 'default-welcome-note',
      quoteId: 'carpe-diem',
      quoteLatin: 'Carpe diem, quam minimum credula postero.',
      title: 'Primeiro dia de estudos',
      content: 'A sabedoria clássica nos ensina a valorizar cada instante do presente com serenidade e propósito.',
      date: new Date().toISOString().split('T')[0],
    },
  ],
};

// Memory fallback in case storage fails
let memoryProgress: UserProgress = { ...DEFAULT_PROGRESS };

export const StorageService = {
  async getProgress(): Promise<UserProgress> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY_PROGRESS);
      if (data) {
        const parsed = JSON.parse(data);
        memoryProgress = { ...DEFAULT_PROGRESS, ...parsed };
        return memoryProgress;
      }
    } catch {
      // Fallback to memory
    }
    return memoryProgress;
  },

  async saveProgress(progress: UserProgress): Promise<void> {
    memoryProgress = progress;
    try {
      await AsyncStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
    } catch {
      // In-memory fallback
    }
  },

  async toggleFavorite(quoteId: string): Promise<boolean> {
    const progress = await this.getProgress();
    const exists = progress.favoriteQuoteIds.includes(quoteId);
    let updatedFavorites: string[];

    if (exists) {
      updatedFavorites = progress.favoriteQuoteIds.filter((id) => id !== quoteId);
    } else {
      updatedFavorites = [...progress.favoriteQuoteIds, quoteId];
    }

    const updated = {
      ...progress,
      favoriteQuoteIds: updatedFavorites,
    };
    await this.saveProgress(updated);
    return !exists;
  },

  async isFavorite(quoteId: string): Promise<boolean> {
    const progress = await this.getProgress();
    return progress.favoriteQuoteIds.includes(quoteId);
  },

  async toggleMasteredFlashcard(flashcardId: string): Promise<boolean> {
    const progress = await this.getProgress();
    const exists = progress.masteredFlashcardIds.includes(flashcardId);
    let updatedMastered: string[];

    if (exists) {
      updatedMastered = progress.masteredFlashcardIds.filter((id) => id !== flashcardId);
    } else {
      updatedMastered = [...progress.masteredFlashcardIds, flashcardId];
    }

    const updated = {
      ...progress,
      masteredFlashcardIds: updatedMastered,
    };
    await this.saveProgress(updated);
    return !exists;
  },

  async addJournalEntry(entry: Omit<JournalEntry, 'id' | 'date'>): Promise<JournalEntry> {
    const progress = await this.getProgress();
    const newEntry: JournalEntry = {
      ...entry,
      id: 'entry_' + Date.now(),
      date: new Date().toISOString().split('T')[0],
    };
    const updated = {
      ...progress,
      journalEntries: [newEntry, ...progress.journalEntries],
    };
    await this.saveProgress(updated);
    return newEntry;
  },

  async deleteJournalEntry(id: string): Promise<void> {
    const progress = await this.getProgress();
    const updated = {
      ...progress,
      journalEntries: progress.journalEntries.filter((e) => e.id !== id),
    };
    await this.saveProgress(updated);
  },

  async recordQuizScore(isCorrect: boolean): Promise<void> {
    const progress = await this.getProgress();
    const updated = {
      ...progress,
      quizScores: {
        totalAnswered: (progress.quizScores?.totalAnswered || 0) + 1,
        totalCorrect: (progress.quizScores?.totalCorrect || 0) + (isCorrect ? 1 : 0),
      },
    };
    await this.saveProgress(updated);
  },

  async updateStreak(): Promise<number> {
    const progress = await this.getProgress();
    const today = new Date().toISOString().split('T')[0];
    const lastActive = progress.lastActiveDate;

    if (lastActive === today) {
      return progress.streak;
    }

    const todayDate = new Date(today);
    const lastDate = new Date(lastActive);
    const diffDays = Math.round((todayDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

    let newStreak = progress.streak;
    if (diffDays === 1) {
      newStreak += 1;
    } else if (diffDays > 1) {
      newStreak = 1;
    }

    const updated = {
      ...progress,
      streak: newStreak,
      lastActiveDate: today,
    };
    await this.saveProgress(updated);
    return newStreak;
  },

  async setPreferredPronunciation(pronunciation: 'classica' | 'eclesiastica'): Promise<void> {
    const progress = await this.getProgress();
    await this.saveProgress({
      ...progress,
      preferredPronunciation: pronunciation,
    });
  },
};
