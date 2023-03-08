import { UserObject } from "@scheduler/shared";
  
export interface AuthState {
  currentUser: UserObject | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}