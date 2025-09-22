import { KEYBOARD_HELP } from "./constants/keyboardHelp";
import styles from "./KeyboardHelp.module.scss";

const KeyboardHelp: React.FC = () => {
  return (
    <div className={styles.keyboardHelp}>
      <p className={styles.title}>Keyboard Controls</p>
      <div className={styles.controls}>
        {KEYBOARD_HELP.map((item, index) => (
          <span key={index}>
            {item.keys.map((key, i) => (
              <kbd key={i}>{key}</kbd>
            ))}{" "}
            {item.description}
          </span>
        ))}
      </div>
    </div>
  );
};

export default KeyboardHelp;
