import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';
import type { JSX } from '@emotion/react/jsx-runtime';

interface ProtectedRouteProps {
  children: JSX.Element;
  roles?: Array<'Administrador' | 'Colaborador'>;
}

export function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const { user } = useAuth();
  const loc = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: loc }} replace />;
  }
  if (roles && !roles.includes(user.roleName as any)) {
    return <Navigate to="/login" state={{ from: loc }} replace />;
  }
  return children;
}