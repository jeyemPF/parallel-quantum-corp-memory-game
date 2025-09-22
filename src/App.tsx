import { useState } from "react";
import Board from "./components/Board/Board";
import GameStats from "./components/GameStats/GameStats";
import DifficultySelector from "./components/DifficultySelector/DifficultySelector";
import Announcer from "./components/Announcer/Announcer";
import { useMemoryGame } from "./hooks/useMemoryGame";
import styles from "./App.module.scss";
import type { Difficulty } from "./types/game";
import KeyboardHelp from "./components/KeyboardHelp/KeyboardHelp";

function App() {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");

  const {
    cards,
    moves,
    time,
    announcement,
    isGameCompleted,
    startNewGame,
    handleCardClick,
  } = useMemoryGame(difficulty);

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
  };

  return (
    <div className={styles.app}>
      <Announcer message={announcement} />

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
        difficulty={difficulty}
      />

      <Board
        cards={cards}
        onCardClick={handleCardClick}
        difficulty={difficulty}
      />

      <KeyboardHelp />


    </div>
    
  );
}

export default App;
