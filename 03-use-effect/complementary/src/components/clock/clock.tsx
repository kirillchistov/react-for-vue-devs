import { useEffect, useState } from 'react';

function formatTime(date: Date) {
  return date.toLocaleTimeString('ru-RU');
}

export function Clock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    console.log('Clock: подписались на setInterval');
    const intervalId = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      console.log('Clock: очистили setInterval — компонент размонтирован');
      clearInterval(intervalId);
    };
  }, []);

  return <p>Время на станции: {formatTime(now)}</p>;
}
