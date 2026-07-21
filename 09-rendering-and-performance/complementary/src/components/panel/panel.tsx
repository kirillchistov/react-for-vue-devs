import { memo, useRef } from 'react';
import './panel.css';

interface PanelProps {
  title: string;
  value: number;
  onRecalibrate: () => void;
}

export const Panel = memo(function Panel({ title, value, onRecalibrate }: PanelProps) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <article className="panel">
      <h3>{title}</h3>
      <p className="panel-value">{value}</p>
      <button onClick={onRecalibrate}>Откалибровать</button>
      <p className="panel-count" data-testid={`panel-count-${title}`}>
        Рендеров: {renderCount.current}
      </p>
    </article>
  );
});
