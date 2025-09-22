import { useState, useEffect } from 'react';
import { generateCards, shuffleCards } from './utils/gameLogic';
import styles from './App.module.scss';
import type { Card, Difficulty } from './types/game';
import DifficultySelector from './components/DifficultySelector/DifficultySelector';
import GameStats from './components/GameStats/GameStats';
import Board from './components/Board/Board';

function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');

  const difficulties = {
    easy: { rows: 2, cols: 2 },    // 2x2 = 4 cards (2 pairs)
    medium: { rows: 4, cols: 4 },  // 4x4 = 16 cards (8 pairs)
    hard: { rows: 6, cols: 6 }     // 6x6 = 36 cards (18 pairs)
  };

  // Initialize game
  useEffect(() => {
    startNewGame();
  }, [difficulty]);

  // Timer logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    
    if (isGameStarted && !isGameCompleted) {
      interval = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isGameStarted, isGameCompleted]);

  // Check for game completion
  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      setIsGameCompleted(true);
      setIsGameStarted(false);
    }
  }, [cards]);

  const startNewGame = () => {
    const config = difficulties[difficulty];
    const newCards = generateCards(config.rows * config.cols);
    setCards(shuffleCards(newCards));
    setFlippedCards([]);
    setMoves(0);
    setTime(0);
    setIsGameStarted(false);
    setIsGameCompleted(false);
  };

  const handleCardClick = (clickedCard: Card) => {
    // Don't allow clicking if: card is already flipped/matched, or 2 cards are already flipped
    if (clickedCard.isFlipped || flippedCards.length === 2 || clickedCard.isMatched) {
      return;
    }

    // Start timer on first move
    if (!isGameStarted) {
      setIsGameStarted(true);
    }

    // Flip the card
    const updatedCards = cards.map(card =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );
    setCards(updatedCards);

    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);

    // Check for match when 2 cards are flipped
    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);

      const [firstCard, secondCard] = newFlippedCards;
      
      if (firstCard.value === secondCard.value) {
        // Match found
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, isMatched: true }
                : card
            )
          );
          setFlippedCards([]);
        }, 500);
      } else {
        // No match - flip back after delay
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Memory Game</h1>
        <DifficultySelector
          difficulty={difficulty}
          onDifficultyChange={handleDifficultyChange}
        />
      </header>
      
      <GameStats
        moves={moves}
        time={time}
        isGameCompleted={isGameCompleted}
        onRestart={startNewGame}
      />
      
      <Board
        cards={cards}
        onCardClick={handleCardClick}
        difficulty={difficulty}
      />
    </div>
  );
}

export default App;