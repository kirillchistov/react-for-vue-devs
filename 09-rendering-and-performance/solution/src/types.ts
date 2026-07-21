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

// Дженерик, а не три отдельных поля (data/error/isLoading) — состояние,
// которое реально может существовать, описано ровно тремя вариантами, и
// TypeScript не даст прочитать `data`, пока не проверено, что status === 'ready'.
export type TAsyncState<TData, TError = string> =
  | { status: 'loading' }
  | { status: 'ready'; data: TData }
  | { status: 'error'; error: TError };
