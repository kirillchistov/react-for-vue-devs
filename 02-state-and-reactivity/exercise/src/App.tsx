import { useState } from 'react';
import { IngredientCatalog } from './components/IngredientCatalog';
import { BurgerConstructor } from './components/BurgerConstructor';
import { ingredients } from './data/ingredients';
import type { BurgerItem, Ingredient } from './types';
import './App.css';

export function App() {
  const [burgerItems, setBurgerItems] = useState<BurgerItem[]>([]);

  const handleAdd = (ingredient: Ingredient) => {
    // TODO: добавьте новый слот { uid: crypto.randomUUID(), ingredient }
    // в конец burgerItems.
    //
    // burgerItems.push(...) тут не сработает: массив мутируется на месте,
    // ссылка на него не меняется, и React не увидит повода перерисовать
    // компонент — ровно как с items.push() из шпаргалки модуля 00.
    // Нужен новый массив, например через spread: [...burgerItems, ...].
  };

  const handleRemove = (uid: string) => {
    // TODO: удалите из burgerItems слот с этим uid, не мутируя массив.
    // Подсказка: .filter().
  };

  return (
    <main className="app">
      <h1>Конструктор Stellar Burger</h1>
      <div className="layout">
        <div className="catalog-column">
          <IngredientCatalog ingredients={ingredients} status="ready" onAdd={handleAdd} />
        </div>
        <BurgerConstructor items={burgerItems} onRemove={handleRemove} />
      </div>
    </main>
  );
}
