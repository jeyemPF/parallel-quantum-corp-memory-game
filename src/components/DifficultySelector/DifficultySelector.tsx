import styles from './DifficultySelector.module.scss';

type Difficulty = 'easy' | 'medium' | 'hard';

interface DifficultySelectorProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ 
  difficulty, 
  onDifficultyChange 
}) => {
  const difficulties: { value: Difficulty; label: string; description: string }[] = [
    { value: 'easy', label: 'Easy', description: '2×2 grid' },
    { value: 'medium', label: 'Medium', description: '4×4 grid' },
    { value: 'hard', label: 'Hard', description: '6×6 grid' }
  ];

  return (
    <div className={styles.selector}>
      <label htmlFor="difficulty-select" className={styles.label}>
        Difficulty:
      </label>
      <select
        id="difficulty-select"
        value={difficulty}
        onChange={(e) => onDifficultyChange(e.target.value as Difficulty)}
        className={styles.select}
        aria-describedby="difficulty-description"
      >
        {difficulties.map((diff) => (
          <option key={diff.value} value={diff.value}>
            {diff.label} ({diff.description})
          </option>
        ))}
      </select>
      <div id="difficulty-description" className={styles.description}>
        Select game difficulty level
      </div>
    </div>
  );
};

export default DifficultySelector;