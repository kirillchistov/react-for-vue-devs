import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks/use-app-selector';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useAppSelector((state) => state.auth.user);

  // TODO: если user === null, верните <Navigate to="/login" replace />
  // (replace — чтобы кнопка "назад" в браузере не возвращала обратно на
  // защищённую страницу, с которой пользователя только что увели)

  return <>{children}</>;
}
