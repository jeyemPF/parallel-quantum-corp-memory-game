import styles from "../Board.module.scss";
import type { Difficulty } from "../../../types/game";


export function getGridClass(difficulty: Difficulty): string {
  switch (difficulty) {
    case "easy":
      return styles.gridEasy;
    case "medium":
      return styles.gridMedium;
    case "hard":
      return styles.gridHard;
    default:
      return styles.gridMedium;
  }
}
