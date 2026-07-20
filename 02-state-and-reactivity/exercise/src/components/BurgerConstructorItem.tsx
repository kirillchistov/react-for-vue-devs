import type { BurgerItem } from '../types';

interface BurgerConstructorItemProps {
  item: BurgerItem;
  onRemove: (uid: string) => void;
}

export function BurgerConstructorItem({ item, onRemove }: BurgerConstructorItemProps) {
  // TODO: отрендерите item.ingredient.name, item.ingredient.price и кнопку
  // "Убрать", которая по клику вызывает onRemove(item.uid).
  //
  // Обратите внимание: item.uid — не то же самое, что item.ingredient.id.
  // Один и тот же ингредиент можно добавить в бургер дважды — у каждого
  // такого "слота" свой уникальный uid, а id ингредиента будет одинаковым.
  return null;
}
