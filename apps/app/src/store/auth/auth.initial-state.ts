import { AuthState } from './auth.model';

export const authInitialState: AuthState = {
  currentUser: null,
  isLoggedIn: localStorage.getItem('is-logged-in') === 'true' ? true : false,
  loading: false,
  signInError: null,
  signUpError: null,
  forgotPassError: null,
  updateUserError: null,
  success: false,
};