import { useState, useEffect } from "react";
import { generateCards, shuffleCards } from "../utils/gameLogic";
import { saveBestScore } from "../utils/storage";
import type { Card, Difficulty } from "../types/game";

const difficulties = {
  easy: { rows: 2, cols: 2 },
  medium: { rows: 4, cols: 4 },
  hard: { rows: 6, cols: 6 },
} as const;

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

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
    setAnnouncement(
      "New game started. Use Tab to navigate cards, Enter or Space to flip."
    );
  };

  // Init or reset when difficulty changes
  useEffect(() => {
    startNewGame();
  }, [difficulty]);

  // Timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (isGameStarted && !isGameCompleted) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isGameStarted, isGameCompleted]);

  // Win condition
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.isMatched)) {
      const isNewBest = saveBestScore(difficulty, moves, time);
      setIsGameCompleted(true);
      setIsGameStarted(false);

      if (isNewBest) {
        setAnnouncement(
          `🎉 New best score: ${moves} moves in ${formatTime(time)}!`
        );
      } else {
        setAnnouncement(`✅ Completed in ${moves} moves (${formatTime(time)}).`);
      }
    }
  }, [cards, difficulty, moves, time]);

  // Card click handler
  const handleCardClick = (clickedCard: Card) => {
    if (
      clickedCard.isFlipped ||
      flippedCards.length === 2 ||
      clickedCard.isMatched
    ) {
      return;
    }

    if (!isGameStarted) {
      setIsGameStarted(true);
      setAnnouncement("Game started! Timer is running.");
    }

    const updatedCards = cards.map((card) =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );
    setCards(updatedCards);

    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves((prev) => prev + 1);
      const [firstCard, secondCard] = newFlippedCards;

      if (firstCard.value === secondCard.value) {
        setAnnouncement(`Match found! ${firstCard.value}`);
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, isMatched: true }
                : card
            )
          );
          setFlippedCards([]);
        }, 500);
      } else {
        setAnnouncement("No match. Cards will flip back.");
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    } else {
      setAnnouncement(`Flipped card: ${clickedCard.value}`);
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
