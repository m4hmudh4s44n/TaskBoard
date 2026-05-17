import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { useEffect } from 'react';

interface PrivateRouteProps {
  children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { state } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!state.isAuthenticated) {
      setLocation('/login');
    }
  }, [state.isAuthenticated, setLocation]);

  if (!state.isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
