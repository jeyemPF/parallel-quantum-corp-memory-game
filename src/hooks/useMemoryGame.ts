import { useState, useEffect } from "react";
import { generateCards, shuffleCards } from "../utils/gameLogic";
import { saveBestScore } from "../utils/storage";
import type { Card, Difficulty } from "../types/game";
import { difficulties } from "../constants/difficulties";
import { formatTime } from "../utils/timeHelpers";
import { MESSAGES } from "../constants/messages";

export function useMemoryGame(difficulty: Difficulty) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  // Start/reset game
  const startNewGame = () => {
    const config = difficulties[difficulty];
    const newCards = generateCards(config.rows * config.cols);
    setCards(shuffleCards(newCards));
    setFlippedCards([]);
    setMoves(0);
    setTime(0);
    setIsGameStarted(false);
    setIsGameCompleted(false);
    setAnnouncement(MESSAGES.GAME_START);
  };

  // Init or reset when difficulty changes
  useEffect(() => {
    startNewGame();
  }, [difficulty]);

  // Timer effect
  useEffect(() => {
    if (!isGameStarted || isGameCompleted) return;

    const interval = setInterval(() => setTime((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, [isGameStarted, isGameCompleted]);

  // Win condition
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.isMatched)) {
      const isNewBest = saveBestScore(difficulty, moves, time);
      setIsGameCompleted(true);
      setIsGameStarted(false);

      setAnnouncement(
        isNewBest
          ? MESSAGES.BEST_SCORE(moves, formatTime(time))
          : MESSAGES.GAME_COMPLETED(moves, formatTime(time))
      );
    }
  }, [cards, difficulty, moves, time]);

  // Card click handler
  const handleCardClick = (clickedCard: Card) => {
    if (
      clickedCard.isFlipped ||
      clickedCard.isMatched ||
      flippedCards.length === 2
    ) {
      return;
    }

    if (!isGameStarted) {
      setIsGameStarted(true);
      setAnnouncement(MESSAGES.GAME_RUNNING);
    }

    const updatedCards = cards.map((card) =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );
    setCards(updatedCards);

    const newFlipped = [...flippedCards, clickedCard];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      const [first, second] = newFlipped;

      if (first.value === second.value) {
        setAnnouncement(MESSAGES.MATCH_FOUND(first.value));
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === first.id || card.id === second.id
                ? { ...card, isMatched: true }
                : card
            )
          );
          setFlippedCards([]);
        }, 500);
      } else {
        setAnnouncement(MESSAGES.NO_MATCH);
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === first.id || card.id === second.id
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    } else {
      setAnnouncement(MESSAGES.CARD_FLIPPED(clickedCard.value));
    }
  };

  return {
    cards,
    moves,
    time,
    announcement,
    isGameCompleted,
    startNewGame,
    handleCardClick,
  };
}
