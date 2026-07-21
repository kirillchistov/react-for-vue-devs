import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks/use-app-selector';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useAppSelector((state) => state.auth.user);

  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
