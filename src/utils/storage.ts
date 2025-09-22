// src/utils/storage.ts
import type { BestScores, Difficulty, BestScore } from "../types/game";

const STORAGE_KEY = "memory-game-best-scores";

// Default structure for best scores
const DEFAULT_SCORES: BestScores = {
  easy: null,
  medium: null,
  hard: null,
};

// Get all best scores
export const getBestScores = (): BestScores => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<BestScores>;
      return { ...DEFAULT_SCORES, ...parsed };
    }
  } catch (error) {
    console.error("Error reading best scores from localStorage:", error);
  }
  return DEFAULT_SCORES;
};

// Save a best score for a specific difficulty
export const saveBestScore = (
  difficulty: Difficulty,
  moves: number,
  time: number
): boolean => {
  try {
    const currentScores = getBestScores();
    const currentBest = currentScores[difficulty];

    const isNewBest: boolean =
      !currentBest || moves < currentBest.moves || (moves === currentBest.moves && time < currentBest.time);

    if (isNewBest) {
      const newScore: BestScore = {
        moves,
        time,
        date: new Date().toISOString(),
      };

      const updatedScores: BestScores = {
        ...currentScores,
        [difficulty]: newScore,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedScores));
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error saving best score to localStorage:", error);
    return false;
  }
};

// Clear all best scores
export const clearBestScores = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing best scores:", error);
  }
};
