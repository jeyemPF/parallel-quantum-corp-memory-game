import styles from "./DifficultySelector.module.scss";
import type { Difficulty } from "../../types/game";
import { DIFFICULTY_LEVELS } from "./constants/difficulty";

interface DifficultySelectorProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  difficulty,
  onDifficultyChange,
}) => {
  return (
    <div className={styles.selector}>
      <label className={styles.label}>Difficulty:</label>
      <select
        value={difficulty}
        onChange={(e) => onDifficultyChange(e.target.value as Difficulty)}
        className={styles.select}
      >
        {DIFFICULTY_LEVELS.map((level) => (
          <option key={level.value} value={level.value}>
            {level.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DifficultySelector;
