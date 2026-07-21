import { NoteWidget } from '../note-widget/note-widget';
import { NicknameWidget } from '../nickname-widget/nickname-widget';
import './app.css';

export function App() {
  return (
    <main className="app">
      <h1>Один хук — два независимых применения</h1>
      <NicknameWidget />
      <NoteWidget />
    </main>
  );
}
