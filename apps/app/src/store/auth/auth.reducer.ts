import { PayloadAction } from '@reduxjs/toolkit';
import { UserObject } from '@scheduler/shared';

import { AuthState } from './auth.model';

export const authReducer = {
  setLoading: (state: AuthState) => {
	state.loading = true;
  },
  setSuccess: (state: AuthState, action: PayloadAction<UserObject>) => {
	state.loading = false;
	state.error = null;
	state.currentUser = action.payload;
  },
  setFailure: (state: AuthState, action: PayloadAction<string>) => {
	state.loading = false;
	state.error = action.payload;
	state.currentUser = null;
  },
};