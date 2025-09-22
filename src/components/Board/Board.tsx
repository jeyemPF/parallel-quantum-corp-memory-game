import styles from "./Board.module.scss";
import type { Card, Difficulty } from "../../types/game";
import CardComponent from "../ui/Cards/Card";
import { getGridClass } from "./utils/grid";

interface BoardProps {
  cards: Card[];
  onCardClick: (card: Card) => void;
  difficulty: Difficulty;
}

const Board: React.FC<BoardProps> = ({ cards, onCardClick, difficulty }) => {
  return (
    <div
      className={`${styles.board} ${getGridClass(difficulty)}`}
      role="grid"
      aria-label="Memory game cards"
    >
      {cards.map((card, index) => (
        <CardComponent
          key={card.id}
          card={card}
          onClick={() => onCardClick(card)}
          index={index}
          totalCards={cards.length}
        />
      ))}
    </div>
  );
};

export default Board;
