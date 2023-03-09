import { createSlice } from '@reduxjs/toolkit';

import { authInitialState } from './auth.initial-state';
import { authReducer } from './auth.reducer';
import { getCurrentUser, signIn, signOut } from './auth.thunks';

export const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: authReducer,
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
    })
    .addCase(signIn.fulfilled, (state, action) => {
      state.currentUser = action.payload.user;
      state.isLoggedIn = true;
      state.loading = false;
      state.error = null;
      localStorage.setItem('is-logged-in', 'true');
    })
    .addCase(signIn.rejected, (state, action) => {
      state.currentUser = null;
      state.isLoggedIn = false;
      state.loading = false;
      state.error = action.error.message || null;
      localStorage.setItem('is-logged-in', 'false');
    });

    builder.addCase(signOut.fulfilled, (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
      localStorage.setItem('is-logged-in', 'false');
    });

    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem('is-logged-in', 'true');
    })
    .addCase(getCurrentUser.rejected, (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
      localStorage.setItem('is-logged-in', 'false');
    });
  },
});

export default authSlice.reducer;