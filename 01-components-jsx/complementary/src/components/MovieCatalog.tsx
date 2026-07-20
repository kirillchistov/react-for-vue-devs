import type { CatalogStatus, Movie } from '../types';
import { MovieCard } from './MovieCard';

interface MovieCatalogProps {
  movies: Movie[];
  status: CatalogStatus;
}

export function MovieCatalog({ movies, status }: MovieCatalogProps) {
  if (status === 'loading') {
    return <p role="status">Загружаем афишу…</p>;
  }

  if (movies.length === 0) {
    return <p role="status">Сегодня в прокате пусто.</p>;
  }

  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <li key={movie.id}>
          <MovieCard movie={movie} />
        </li>
      ))}
    </ul>
  );
}
