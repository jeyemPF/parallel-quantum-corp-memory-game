import styles from "./Card.module.scss";
import { getCandidateIndex, type ArrowKey } from "./utils/navigation";

type CardType = {
  isFlipped: boolean;
  isMatched: boolean;
  value: string;
};

interface CardProps {
  card: CardType;
  onClick: () => void;
  index: number;
  totalCards: number;
}

const CardComponent: React.FC<CardProps> = ({
  card,
  onClick,
  index,
  totalCards,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
      return;
    }

    if (event.key.startsWith("Arrow")) {
      event.preventDefault();

      const rows = Math.sqrt(totalCards);
      const cols = rows;

      const key = event.key as ArrowKey;
      const nextIndex = getCandidateIndex(key, index, rows, cols);

      document.getElementById(`card-${nextIndex}`)?.focus();
    }
  };

  return (
    <button
      id={`card-${index}`}
      className={`${styles.card} ${card.isFlipped ? styles.flipped : ""} ${
        card.isMatched ? styles.matched : ""
      }`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      disabled={card.isMatched}
      aria-pressed={card.isFlipped}
      tabIndex={card.isMatched ? -1 : 0}
    >
      <div className={styles.cardInner}>
        <div className={styles.cardFront}>{card.value}</div>
        <div className={styles.cardBack}>?</div>
      </div>
    </button>
  );
};

export default CardComponent;
