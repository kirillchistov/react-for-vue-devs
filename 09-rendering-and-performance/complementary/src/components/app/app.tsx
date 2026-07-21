import { useCallback, useEffect, useState } from 'react';
import { Panel } from '../panel/panel';
import './app.css';

export function App() {
  const [tick, setTick] = useState(0);
  const [stabilized, setStabilized] = useState(false);
  const [oxygen, setOxygen] = useState(98);
  const [energy, setEnergy] = useState(76);

  useEffect(() => {
    const intervalId = setInterval(() => setTick((value) => value + 1), 1000);
    return () => clearInterval(intervalId);
  }, []);

  const stableRecalibrateOxygen = useCallback(() => setOxygen((value) => value + 1), []);
  const stableRecalibrateEnergy = useCallback(() => setEnergy((value) => value + 1), []);

  const recalibrateOxygen = stabilized ? stableRecalibrateOxygen : () => setOxygen((value) => value + 1);
  const recalibrateEnergy = stabilized ? stableRecalibrateEnergy : () => setEnergy((value) => value + 1);

  return (
    <main className="app">
      <h1>Почему этот компонент перерисовался?</h1>
      <p>
        Корабельные часы тикают раз в секунду (сейчас: <strong>{tick}</strong>) — это обновляет только{' '}
        <code>App</code>. Панели ниже обёрнуты в <code>memo(...)</code>, но получают от <code>App</code> колбэк
        <code> onRecalibrate</code>. Пока он создаётся заново на каждый рендер <code>App</code> (обычная стрелочная
        функция), <code>memo</code> бессилен — панели перерисовываются вместе с часами, хотя их{' '}
        <code>value</code> не менялось.
      </p>

      <label className="toggle">
        <input type="checkbox" checked={stabilized} onChange={(event) => setStabilized(event.target.checked)} />
        Стабилизировать пропсы (useCallback)
      </label>

      <div className="panels">
        <Panel title="Кислород" value={oxygen} onRecalibrate={recalibrateOxygen} />
        <Panel title="Энергия" value={energy} onRecalibrate={recalibrateEnergy} />
      </div>

      <p className="hint">
        {stabilized
          ? 'Счётчики рендеров панелей теперь растут только от своей собственной калибровки — тиканье часов их не трогает.'
          : 'Смотрите на "Рендеров" у панелей: оно растёт каждую секунду само по себе, без единого клика.'}
      </p>
    </main>
  );
}
