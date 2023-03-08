import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { authInitialState } from './auth.initial-state';
import { authReducer } from './auth.reducer';

export const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: authReducer,
});

export const { setLoading, setSuccess, setFailure } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth;

export default authSlice.reducer;