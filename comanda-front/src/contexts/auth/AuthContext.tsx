import { createContext } from 'react';

export interface AuthContextState {
  isLoggedIn: boolean;
  user?: any;
  loginUser: (email: string, password: string) => void;
  registerUser: (user: any) => void;
  logoutUser: () => void;
}

export const AuthContext = createContext<AuthContextState>(
  {} as AuthContextState
);
