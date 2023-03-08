import { AuthState } from './auth.model';

export const authInitialState: AuthState = {
  currentUser: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};