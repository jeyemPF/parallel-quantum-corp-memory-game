import type { Card, Difficulty } from '../../types/game';
import CardComponent from '../ui/Card/Card';
import styles from './Board.module.scss';

interface BoardProps {
  cards: Card[];
  onCardClick: (card: Card) => void;
  difficulty: Difficulty;
}

const Board: React.FC<BoardProps> = ({ cards, onCardClick, difficulty }) => {
  const getGridClass = () => {
    switch (difficulty) {
      case 'easy': return styles.gridEasy;
      case 'medium': return styles.gridMedium;
      case 'hard': return styles.gridHard;
      default: return styles.gridMedium;
    }
  };

  return (
    <div className={`${styles.board} ${getGridClass()}`}>
      {cards.map((card) => (
        <CardComponent
          key={card.id}
          card={card}
          onClick={() => onCardClick(card)}
        />
      ))}
    </div>
  );
};

export default Board;