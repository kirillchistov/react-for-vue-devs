import styles from './ingredient-search.module.css';

interface IngredientSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function IngredientSearch({ value, onChange }: IngredientSearchProps) {
  // TODO: контролируемый инпут поиска.
  // value должен приходить из пропа, а по вводу нужно вызывать onChange(event.target.value).
  //
  // Это тот же паттерн, что и в модуле 01/02 — сюда его прокидывает App,
  // который сам отвечает за debounce (см. TODO в App.tsx).
  return <input className={styles.search} placeholder="Найти ингредиент…" />;
}
