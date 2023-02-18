import { FC, PropsWithChildren, useReducer } from 'react';
import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';

export interface AuthState {
  isLoggedIn: boolean;
  user?: any;
}

const INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

export const AuthProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

  const loginUser = (email: string, password: string) => {};
  const registerUser = (user: any) => {};
  const logoutUser = () => {};

  return (
    <AuthContext.Provider
      value={{ ...state, loginUser, registerUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
