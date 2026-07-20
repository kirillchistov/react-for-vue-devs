import type { BurgerItem } from '../types';
import { BurgerConstructorItem } from './BurgerConstructorItem';

interface BurgerConstructorProps {
  items: BurgerItem[];
  onRemove: (uid: string) => void;
}

export function BurgerConstructor({ items, onRemove }: BurgerConstructorProps) {
  // TODO: оберните весь возвращаемый JSX в <section data-testid="burger-constructor">
  // (data-testid нужен только тестам, в реальном приложении так делать необязательно).
  //
  // Внутри секции:
  // 1. если items.length === 0 — покажите текст-заглушку, например
  //    "Соберите бургер: добавляйте ингредиенты кнопкой «Добавить» слева".
  // 2. иначе отрендерите по одному <BurgerConstructorItem> на каждый item
  //    (не забудьте про key — используйте item.uid, а не item.ingredient.id
  //    и не индекс), а под списком — сумму цен всех item.ingredient.price.
  return null;
}
