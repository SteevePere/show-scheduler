import { AuthState } from './auth.model';

export const authInitialState: AuthState = {
  currentUser: null,
  isLoggedIn: localStorage.getItem('is-logged-in') === 'true' ? true : false,
  loading: false,
  error: null,
};