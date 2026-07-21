import type { TBurgerItem } from '@/types';
import styles from './burger-constructor-item.module.css';

interface BurgerConstructorItemProps {
  item: TBurgerItem;
  onRemove: (uid: string) => void;
}

export function BurgerConstructorItem({ item, onRemove }: BurgerConstructorItemProps) {
  return (
    <li className={styles.item}>
      <span>{item.ingredient.name}</span>
      <span>{item.ingredient.price} ₽</span>
      <button onClick={() => onRemove(item.uid)}>Убрать</button>
    </li>
  );
}
