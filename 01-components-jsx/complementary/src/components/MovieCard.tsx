import type { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <article className="movie-card">
      <span className="movie-card__poster">{movie.poster}</span>
      <p>{movie.title}</p>
      <p>★ {movie.rating}</p>
    </article>
  );
}
