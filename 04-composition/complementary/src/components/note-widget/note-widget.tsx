import { useLocalStorage } from '@/hooks/use-local-storage';

export function NoteWidget() {
  const [note, setNote] = useLocalStorage('stellar-note', '');

  return (
    <div>
      <h2>Заметка вахтенного журнала</h2>
      <textarea
        rows={3}
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder="Всё спокойно на станции…"
      />
    </div>
  );
}
