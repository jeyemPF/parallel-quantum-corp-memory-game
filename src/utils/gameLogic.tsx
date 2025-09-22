import type { Card } from "../types/game";

// Emojis for card values - you can replace with images later
const EMOJIS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦'];

export const generateCards = (totalCards: number): Card[] => {
  const pairsNeeded = totalCards / 2;
  const selectedEmojis = EMOJIS.slice(0, pairsNeeded);
  
  const cards: Card[] = [];
  
  selectedEmojis.forEach(emoji => {
    const pair: Card[] = [
      { id: Math.random().toString(36).substr(2, 9), value: emoji, isFlipped: false, isMatched: false },
      { id: Math.random().toString(36).substr(2, 9), value: emoji, isFlipped: false, isMatched: false }
    ];
    cards.push(...pair);
  });
  
  return cards;
};

export const shuffleCards = (cards: Card[]): Card[] => {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};