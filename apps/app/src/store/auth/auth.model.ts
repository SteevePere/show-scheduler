import { UserObject } from '@scheduler/shared';
  
export interface AuthState {
  currentUser: UserObject | null;
  isLoggedIn: boolean;
  loading: boolean;
  signInError: string | null;
  signUpError: string | null;
  forgotPassError: string | null;
  updateUserError: string | null;
  success: boolean;
}