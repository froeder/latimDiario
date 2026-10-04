export type LatinCategory =
  | 'filosofia'
  | 'juridico'
  | 'liturgico'
  | 'imperio'
  | 'sabedoria'
  | 'historia';

export interface LatinQuote {
  id: string;
  latin: string;
  translation: string;
  author: string;
  source?: string;
  era?: string;
  category: LatinCategory;
  historicalContext: string;
  reflection: string;
  classicalPronunciation?: string;
  ecclesiasticalPronunciation?: string;
  tags: string[];
}

export interface LatinWord {
  id: string;
  word: string;
  genitiveAndGender?: string;
  partOfSpeech: string;
  meaning: string;
  etymology: string;
  derivatives: string[];
  exampleSentence: string;
  exampleTranslation: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
}

export interface GrammarCase {
  caseName: string;
  functionPt: string;
  singular: string;
  plural: string;
}

export interface GrammarDeclension {
  id: string;
  title: string;
  description: string;
  modelWord: string;
  meaning: string;
  cases: GrammarCase[];
}

export interface Flashcard {
  id: string;
  latin: string;
  translation: string;
  category: LatinCategory;
  note: string;
}

export interface JournalEntry {
  id: string;
  quoteId?: string;
  quoteLatin?: string;
  title: string;
  content: string;
  date: string;
}

export interface UserProgress {
  streak: number;
  lastActiveDate: string;
  favoriteQuoteIds: string[];
  masteredFlashcardIds: string[];
  quizScores: {
    totalAnswered: number;
    totalCorrect: number;
  };
  preferredPronunciation: 'classica' | 'eclesiastica';
  journalEntries: JournalEntry[];
}
