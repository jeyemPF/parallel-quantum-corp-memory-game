export interface Card {
  id: string;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface BestScore {
  moves: number;
  time: number;
  date: string;
}

export interface BestScores {
  easy: BestScore | null;
  medium: BestScore | null;
  hard: BestScore | null;
}