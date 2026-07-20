export interface Movie {
  id: string;
  title: string;
  rating: number;
  poster: string;
}

export type CatalogStatus = 'loading' | 'ready';
