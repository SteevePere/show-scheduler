import { UserObject } from '@scheduler/shared';
  
export interface AuthState {
  currentUser: UserObject | null;
  isLoggedIn: boolean;
  loading: boolean;
  loadingCurrentUser: boolean;
  signInError: string | null;
  signUpError: string | null;
  forgotPassError: string | null;
  updateUserSuccess: string | null;
  updateUserError: string | null;
  success: boolean;
}