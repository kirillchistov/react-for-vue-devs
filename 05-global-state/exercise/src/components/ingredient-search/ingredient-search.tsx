import styles from './ingredient-search.module.css';

interface IngredientSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function IngredientSearch({ value, onChange }: IngredientSearchProps) {
  return (
    <input
      className={styles.search}
      placeholder="Найти ингредиент…"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
