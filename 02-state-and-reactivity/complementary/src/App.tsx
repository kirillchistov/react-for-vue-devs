import { LikeButton } from './components/LikeButton';
import './App.css';

export function App() {
  return (
    <main className="app">
      <h1>Пост в ленте</h1>
      <p>Нейтринный прибой снова затопил вторую палубу.</p>
      <LikeButton />
    </main>
  );
}
