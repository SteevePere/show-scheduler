import { PayloadAction } from '@reduxjs/toolkit';

import { AuthState } from './auth.model';

export const authReducer = {
  reset(state: AuthState) {
    state.currentUser = null;
    state.isLoggedIn = localStorage.getItem('is-logged-in') === 'true' ? true : false;
    state.loading = false;
    state.signInError = null;
    state.signUpError = null;
    state.forgotPassError = null;
    state.success = false;
  },
  setSuccess(state: AuthState, action: PayloadAction<boolean>) {
    state.success = action.payload;
  }
};