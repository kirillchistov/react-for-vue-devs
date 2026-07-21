import { Route, Routes } from 'react-router-dom';
import { Nav } from '../nav/nav';
import { HomePage } from '@/pages/home';
import { PostPage } from '@/pages/post';
import { AboutPage } from '@/pages/about';
import './app.css';

export function App() {
  return (
    <main className="app">
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts/:slug" element={<PostPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </main>
  );
}
