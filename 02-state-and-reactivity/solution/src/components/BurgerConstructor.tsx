import type { BurgerItem } from '../types';
import { BurgerConstructorItem } from './BurgerConstructorItem';

interface BurgerConstructorProps {
  items: BurgerItem[];
  onRemove: (uid: string) => void;
}

export function BurgerConstructor({ items, onRemove }: BurgerConstructorProps) {
  if (items.length === 0) {
    return (
      <section className="burger-constructor" data-testid="burger-constructor">
        <p>Соберите бургер: добавляйте ингредиенты кнопкой «Добавить» слева</p>
      </section>
    );
  }

  const total = items.reduce((sum, item) => sum + item.ingredient.price, 0);

  return (
    <section className="burger-constructor" data-testid="burger-constructor">
      <ul className="burger-constructor-list">
        {items.map((item) => (
          <BurgerConstructorItem key={item.uid} item={item} onRemove={onRemove} />
        ))}
      </ul>
      <p className="burger-constructor-total">Итого: {total} ₽</p>
    </section>
  );
}
