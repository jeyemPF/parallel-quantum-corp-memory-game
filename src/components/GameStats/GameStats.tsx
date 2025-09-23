import type { Difficulty } from '../../types/game';
import { getBestScores } from '../../utils/storage';
import styles from './GameStats.module.scss';

interface GameStatsProps {
  moves: number;
  time: number;
  isGameCompleted: boolean;
  onRestart: () => void;
  difficulty: Difficulty;
}

const GameStats: React.FC<GameStatsProps> = ({ 
  moves, 
  time, 
  isGameCompleted, 
  onRestart, 
  difficulty 
}) => {
  const bestScore = getBestScores()[difficulty];

  const formatTime = (seconds: number): string => {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.stats}>
      <div className={styles.statGroup}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Time</span>
          <span className={styles.statValue}>{formatTime(time)}</span>
        </div>
        
        <div className={styles.stat}>
          <span className={styles.statLabel}>Moves</span>
          <span className={styles.statValue}>{moves}</span>
        </div>

        {bestScore && (
          <div className={styles.bestScore} title={`Best score: ${bestScore.moves} moves`}>
            <span className={styles.bestIcon}>🏆</span>
            <span className={styles.bestValue}>
              Best: {bestScore.moves}
            </span>
          </div>
        )}
      </div>

      <div className={styles.actions}>
        <button 
          className={styles.button} 
          onClick={onRestart}
          aria-label="Restart game"
        >
          🔄 Restart
        </button>
      </div>
      
      {isGameCompleted && (
        <div className={styles.completion} role="alert">
          <div>🎉 Completed in {moves} moves!</div>
          {bestScore?.moves === moves && (
            <span className={styles.newBest}>
              🏆 New best score!
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default GameStats;