import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  hasAccess: boolean;
  children: ReactNode;
}

export function PrivateRoute({ hasAccess, children }: PrivateRouteProps) {
  if (!hasAccess) {
    return <Navigate to="/checkpoint" replace />;
  }

  return <>{children}</>;
}
