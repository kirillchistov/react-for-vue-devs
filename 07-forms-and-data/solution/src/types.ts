export type TIngredientType = 'bun' | 'sauce' | 'main';

export interface TIngredient {
  id: string;
  name: string;
  type: TIngredientType;
  price: number;
  image: string;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
}

export type TCatalogStatus = 'loading' | 'ready' | 'error';

export interface TBurgerItem {
  uid: string;
  ingredient: TIngredient;
}
