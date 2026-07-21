import { useLocalStorage } from '@/hooks/use-local-storage';

export function NicknameWidget() {
  const [nickname, setNickname] = useLocalStorage('stellar-nickname', 'Инженер');

  return (
    <div>
      <h2>Позывной</h2>
      <input value={nickname} onChange={(event) => setNickname(event.target.value)} />
      <p>Привет, {nickname}! Обновите страницу — значение переживёт перезагрузку.</p>
    </div>
  );
}
