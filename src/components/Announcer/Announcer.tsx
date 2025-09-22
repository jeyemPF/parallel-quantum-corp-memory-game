import { useEffect, useState } from 'react';
import styles from './Announcer.module.scss';

interface AnnouncerProps {
  message: string;
  politeness?: 'polite' | 'assertive';
}

const Announcer: React.FC<AnnouncerProps> = ({ message, politeness = 'polite' }) => {
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    if (message) {
      setAnnouncement(message);
      const timer = setTimeout(() => setAnnouncement(''), 1000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div
      aria-live={politeness}
      aria-atomic="true"
      className={styles.announcer}
    >
      {announcement}
    </div>
  );
};

export default Announcer;