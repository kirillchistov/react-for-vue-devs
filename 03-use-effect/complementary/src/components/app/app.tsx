import { useState } from 'react';
import { Clock } from '../clock/clock';
import styles from './app.module.css';

export function App() {
  const [showClock, setShowClock] = useState(true);

  return (
    <main className={styles.app}>
      <h1>Часы станции</h1>
      <p>Откройте консоль — при монтировании и размонтировании часов там появятся сообщения.</p>
      {showClock && <Clock />}
      <button onClick={() => setShowClock((value) => !value)}>
        {showClock ? 'Спрятать часы' : 'Показать часы'}
      </button>
    </main>
  );
}
