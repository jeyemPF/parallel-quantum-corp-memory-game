import type { BestScores, Difficulty } from "../types/game";

const STORAGE_KEY = "memory-game-best-scores";

export const getBestScores = (): BestScores => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error reading best scores from localStorage:", error);
  }

  return {
    easy: null,
    medium: null,
    hard: null,
  };
};

export const saveBestScore = (
  difficulty: Difficulty,
  moves: number,
  time: number
): boolean => {
  try {
    const currentScores = getBestScores();
    const currentBest = currentScores[difficulty];

    const isNewBest =
      !currentBest ||
      moves < currentBest.moves ||
      (moves === currentBest.moves && time < currentBest.time);

    if (isNewBest) {
      const newScores = {
        ...currentScores,
        [difficulty]: {
          moves,
          time,
          date: new Date().toISOString(),
        },
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(newScores));
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error saving best score to localStorage:", error);
    return false;
  }
};

export const clearBestScores = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing best scores:", error);
  }
};
