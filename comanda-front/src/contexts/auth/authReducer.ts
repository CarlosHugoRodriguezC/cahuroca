import { AuthState } from './AuthProvider';

type AuthActionTypes =
  | { type: '[Auth] - Login'; payload: any }
  | { type: '[Auth] - Logout' };

export const authReducer = (
  state: AuthState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case '[Auth] - Login':
      return { ...state, isLoggedIn: true, user: action.payload };
    case '[Auth] - Logout':
      return { ...state, isLoggedIn: false, user: undefined };
    default:
      return state;
  }
};
