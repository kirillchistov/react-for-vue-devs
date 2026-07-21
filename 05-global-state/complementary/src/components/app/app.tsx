import { ThemeProvider } from '@/contexts/theme-context';
import { ThemeToggle } from '../theme-toggle/theme-toggle';
import { StatusCard } from '../status-card/status-card';
import './app.css';

export function App() {
  return (
    <ThemeProvider>
      <main className="app">
        <h1>Тема через Context</h1>
        <ThemeToggle />
        <StatusCard />
      </main>
    </ThemeProvider>
  );
}
