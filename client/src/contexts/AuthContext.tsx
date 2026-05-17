import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface AuthState {
  isAuthenticated: boolean;
  user: { email: string } | null;
}

type AuthAction =
  | { type: 'LOGIN'; payload: { email: string } }
  | { type: 'LOGOUT' };

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN':
      return {
        isAuthenticated: true,
        user: { email: action.payload.email },
      };
    case 'LOGOUT':
      return {
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [storedAuth, setStoredAuth] = useLocalStorage<AuthState>(
    'taskboard_auth',
    { isAuthenticated: false, user: null }
  );

  const [state, dispatch] = useReducer(authReducer, storedAuth);

  const login = (email: string, password: string) => {
    // Mock authentication - in real app, validate against backend
    if (email && password) {
      dispatch({ type: 'LOGIN', payload: { email } });
      setStoredAuth({ isAuthenticated: true, user: { email } });
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    setStoredAuth({ isAuthenticated: false, user: null });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
