export const MESSAGES = {
  GAME_START: "New game started. Use Tab to navigate cards, Enter or Space to flip.",
  GAME_RUNNING: "Game started! Timer is running.",
  MATCH_FOUND: (value: string) => `Match found! ${value}`,
  NO_MATCH: "No match. Cards will flip back.",
  CARD_FLIPPED: (value: string) => `Flipped card: ${value}`,
  BEST_SCORE: (moves: number, time: string) => `🎉 New best score: ${moves} moves in ${time}!`,
  GAME_COMPLETED: (moves: number, time: string) => `✅ Completed in ${moves} moves (${time}).`,
};
