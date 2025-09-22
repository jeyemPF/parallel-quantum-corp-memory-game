import styles from './GameStats.module.scss';

interface GameStatsProps {
  moves: number;
  time: number;
  isGameCompleted: boolean;
  onRestart: () => void;
}

const GameStats: React.FC<GameStatsProps> = ({ moves, time, isGameCompleted, onRestart }) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.stats}>
      <div className={styles.statItem}>
        <span className={styles.statLabel}>Time:</span>
        <span className={styles.statValue}>{formatTime(time)}</span>
      </div>
      
      <div className={styles.statItem}>
        <span className={styles.statLabel}>Moves:</span>
        <span className={styles.statValue}>{moves}</span>
      </div>
      
      <button 
        className={styles.restartButton}
        onClick={onRestart}
        aria-label="Restart game"
      >
        🔄 Restart
      </button>
      
      {isGameCompleted && (
        <div className={styles.completionMessage} role="alert">
          🎉 Congratulations! You completed the game in {moves} moves and {formatTime(time)}!
        </div>
      )}
    </div>
  );
};

export default GameStats;