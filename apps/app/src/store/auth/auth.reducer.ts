import { PayloadAction } from '@reduxjs/toolkit';

import { AuthState } from './auth.model';

export const authReducer = {
  reset(state: AuthState) {
    state.isLoggedIn = localStorage.getItem('is-logged-in') === 'true' ? true : false;
    state.loading = false;
    state.signInError = null;
    state.signUpError = null;
    state.forgotPassError = null;
    state.updateUserSuccess = null;
    state.updateUserError = null;
    state.success = false;
  },
  resetAuthErrors(state: AuthState) {
    state.signInError = null;
    state.signUpError = null;
    state.forgotPassError = null;
  },
  setUpdateUserSuccess: (state: AuthState, action: PayloadAction<string | null>) => {
    state.updateUserSuccess = action.payload;
  },
  setUpdateUserError: (state: AuthState, action: PayloadAction<string | null>) => {
    state.updateUserError = action.payload;
  },
};