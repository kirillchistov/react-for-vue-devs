import type { TBurgerItem } from '@/types';
import { BurgerConstructorItem } from '../burger-constructor-item/burger-constructor-item';
import styles from './burger-constructor.module.css';

interface BurgerConstructorProps {
  items: TBurgerItem[];
  onRemove: (uid: string) => void;
}

export function BurgerConstructor({ items, onRemove }: BurgerConstructorProps) {
  if (items.length === 0) {
    return (
      <section className={styles.wrapper} data-testid="burger-constructor">
        <p>Соберите бургер: добавляйте ингредиенты кнопкой «Добавить» слева</p>
      </section>
    );
  }

  const total = items.reduce((sum, item) => sum + item.ingredient.price, 0);

  return (
    <section className={styles.wrapper} data-testid="burger-constructor">
      <ul className={styles.list}>
        {items.map((item) => (
          <BurgerConstructorItem key={item.uid} item={item} onRemove={onRemove} />
        ))}
      </ul>
      <p className={styles.total}>Итого: {total} ₽</p>
    </section>
  );
}
