import { useState } from 'react';
import { IngredientCatalog } from './components/IngredientCatalog';
import { BurgerConstructor } from './components/BurgerConstructor';
import { ingredients } from './data/ingredients';
import type { BurgerItem, Ingredient } from './types';
import './App.css';

export function App() {
  const [burgerItems, setBurgerItems] = useState<BurgerItem[]>([]);

  const handleAdd = (ingredient: Ingredient) => {
    setBurgerItems([...burgerItems, { uid: crypto.randomUUID(), ingredient }]);
  };

  const handleRemove = (uid: string) => {
    setBurgerItems(burgerItems.filter((item) => item.uid !== uid));
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
