export type IngredientType = 'bun' | 'sauce' | 'main';

export interface Ingredient {
  id: string;
  name: string;
  type: IngredientType;
  price: number;
  image: string;
}

export type CatalogStatus = 'loading' | 'ready';
