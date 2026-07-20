import { IngredientCatalog } from './components/IngredientCatalog';
import { ingredients } from './data/ingredients';
import './App.css';

export function App() {
  return (
    <main className="app">
      <h1>Каталог ингредиентов Stellar Burger</h1>
      <IngredientCatalog ingredients={ingredients} status="ready" />
    </main>
  );
}
