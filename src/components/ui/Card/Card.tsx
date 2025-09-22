import styles from './Card.module.scss';

type CardType = {
  isFlipped: boolean;
  isMatched: boolean;
  value: string;
};

interface CardProps {
  card: CardType;
  onClick: () => void;
}

const CardComponent: React.FC<CardProps> = ({ card, onClick }) => {
  return (
    <button
      className={`${styles.card} ${card.isFlipped ? styles.flipped : ''} ${
        card.isMatched ? styles.matched : ''
      }`}
      onClick={onClick}
      disabled={card.isMatched || card.isFlipped}
      aria-pressed={card.isFlipped}
      aria-label={card.isMatched ? `Matched ${card.value}` : `Card showing ${card.isFlipped ? card.value : 'back'}`}
    >
      <div className={styles.cardInner}>
        <div className={styles.cardFront}>
          {card.value}
        </div>
        <div className={styles.cardBack}>
          ❓
        </div>
      </div>
    </button>
  );
};

export default CardComponent;