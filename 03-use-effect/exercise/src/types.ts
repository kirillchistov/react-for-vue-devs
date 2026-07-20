export type TIngredientType = 'bun' | 'sauce' | 'main';

export interface TIngredient {
  id: string;
  name: string;
  type: TIngredientType;
  price: number;
  image: string;
}

export type TCatalogStatus = 'loading' | 'ready' | 'error';

export interface TBurgerItem {
  uid: string;
  ingredient: TIngredient;
}
