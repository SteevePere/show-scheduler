import { PayloadAction } from '@reduxjs/toolkit';

import { authInitialState } from './auth.initial-state';
import { AuthState } from './auth.model';

export const authReducer = {
  reset() {
    return authInitialState;
  },
  setSuccess(state: AuthState, action: PayloadAction<boolean>) {
    state.success = action.payload;
  }
};