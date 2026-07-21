import { useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { PrivateRoute } from '../private-route/private-route';

function ReadingRoom() {
  return (
    <main>
      <h1>Читальный зал</h1>
      <p>Публичные выдержки из архива станции — доступны без пропуска.</p>
      <p>«Год основания станции: 2147. Первый стыковочный узел...» — и обрывается.</p>
    </main>
  );
}

function Vault() {
  return (
    <main>
      <h1>Хранилище</h1>
      <p>Полный архив станции, включая закрытые протоколы совета. Вы здесь только потому, что у вас есть пропуск.</p>
    </main>
  );
}

function Checkpoint({ onGetBadge }: { onGetBadge: () => void }) {
  const navigate = useNavigate();

  const handleGetBadge = () => {
    onGetBadge();
    navigate('/vault');
  };

  return (
    <main>
      <h1>Контрольный пункт</h1>
      <p>Сюда вас перенаправило хранилище — у вас пока нет пропуска агента.</p>
      <button onClick={handleGetBadge}>Получить пропуск</button>
    </main>
  );
}

export function App() {
  const [hasBadge, setHasBadge] = useState(false);

  return (
    <>
      <nav>
        <Link to="/">Читальный зал</Link>
        <Link to="/vault">Хранилище</Link>
        <span data-testid="badge-status">{hasBadge ? 'Пропуск: есть' : 'Пропуск: нет'}</span>
      </nav>
      <Routes>
        <Route path="/" element={<ReadingRoom />} />
        <Route
          path="/vault"
          element={
            <PrivateRoute hasAccess={hasBadge}>
              <Vault />
            </PrivateRoute>
          }
        />
        <Route path="/checkpoint" element={<Checkpoint onGetBadge={() => setHasBadge(true)} />} />
      </Routes>
    </>
  );
}
