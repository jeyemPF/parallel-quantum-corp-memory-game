import type { Difficulty } from "../../../types/game";

// Available difficulty levels
export const DIFFICULTY_LEVELS: { value: Difficulty; label: string }[] = [
  { value: "easy", label: "Easy (2×2)" },
  { value: "medium", label: "Medium (4×4)" },
  { value: "hard", label: "Hard (6×6)" },
];

// Difficulty grid configuration
export const DIFFICULTY_CONFIG: Record<Difficulty, { rows: number; cols: number }> = {
  easy: { rows: 2, cols: 2 },
  medium: { rows: 4, cols: 4 },
  hard: { rows: 6, cols: 6 },
};


