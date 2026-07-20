import { MovieCatalog } from './components/MovieCatalog';
import { movies } from './data/movies';
import './App.css';

export function App() {
  return (
    <main className="app">
      <h1>Афиша на сегодня</h1>
      <MovieCatalog movies={movies} status="ready" />
    </main>
  );
}
