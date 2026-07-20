import type { BurgerItem } from '../types';

interface BurgerConstructorItemProps {
  item: BurgerItem;
  onRemove: (uid: string) => void;
}

export function BurgerConstructorItem({ item, onRemove }: BurgerConstructorItemProps) {
  return (
    <li className="burger-constructor-item">
      <span>{item.ingredient.name}</span>
      <span>{item.ingredient.price} ₽</span>
      <button onClick={() => onRemove(item.uid)}>Убрать</button>
    </li>
  );
}
