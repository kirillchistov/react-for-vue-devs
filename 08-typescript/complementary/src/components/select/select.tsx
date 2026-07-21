interface SelectProps<TItem> {
  items: TItem[];
  getLabel: (item: TItem) => string;
  getKey: (item: TItem) => string;
  onSelect: (item: TItem) => void;
}

// Компонент тоже может быть дженериком, а не только хук — TItem подставится
// автоматически из того, что передали в items, и getLabel/onSelect будут
// типизированы под конкретный элемент, а не под unknown/any.
export function Select<TItem>({ items, getLabel, getKey, onSelect }: SelectProps<TItem>) {
  return (
    <ul>
      {items.map((item) => (
        <li key={getKey(item)}>
          <button onClick={() => onSelect(item)}>{getLabel(item)}</button>
        </li>
      ))}
    </ul>
  );
}
