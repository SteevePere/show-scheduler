import { createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { authInitialState } from './auth.initial-state';
import { authReducer } from './auth.reducer';
import { getCurrentUser, requestPasswordReset, resetPassword, signIn, signOut, signUp, updateUser } from './auth.thunks';

export const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: authReducer,
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
      state.signUpError = null;
    })
    .addCase(signUp.fulfilled, (state, action) => {
      state.currentUser = action.payload.user;
      state.isLoggedIn = true;
      state.loading = false;
      state.signUpError = null;
      localStorage.setItem('is-logged-in', 'true');
    })
    .addCase(signUp.rejected, (state, action) => {
      if ((action.payload as AxiosResponse).data.statusCode === 409) {
        state.signUpError = 'This username is already in use!';
      } else {
        state.signUpError = 'An error occured';
      }
      state.currentUser = null;
      state.isLoggedIn = false;
      state.loading = false;
      localStorage.setItem('is-logged-in', 'false');
    });

    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
      state.signInError = null;
    })
    .addCase(signIn.fulfilled, (state, action) => {
      state.currentUser = action.payload.user;
      state.isLoggedIn = true;
      state.loading = false;
      state.signInError = null;
      localStorage.setItem('is-logged-in', 'true');
    })
    .addCase(signIn.rejected, (state, action) => {
      state.currentUser = null;
      state.isLoggedIn = false;
      state.loading = false;
      state.signInError = action.error.message || null;
      localStorage.setItem('is-logged-in', 'false');
    });

    builder.addCase(signOut.fulfilled, (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
      localStorage.setItem('is-logged-in', 'false');
    });

    builder.addCase(getCurrentUser.pending, (state) => {
      state.loadingCurrentUser = true;
    })
    .addCase(getCurrentUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
      state.loadingCurrentUser = false;
      localStorage.setItem('is-logged-in', 'true');
    })
    .addCase(getCurrentUser.rejected, (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
      state.loadingCurrentUser = false;
      localStorage.setItem('is-logged-in', 'false');
    });

    builder.addCase(requestPasswordReset.pending, (state) => {
      state.loading = true;
      state.forgotPassError = null;
      state.success = false;
    })
    .addCase(requestPasswordReset.fulfilled, (state) => {
      state.loading = false;
      state.forgotPassError = null;
      state.success = true;
    })
    .addCase(requestPasswordReset.rejected, (state) => {
      state.loading = false;
      state.forgotPassError = 'An error occured';
      state.success = false;
    });

    builder.addCase(resetPassword.pending, (state) => {
      state.loading = true;
      state.forgotPassError = null;
      state.success = false;
    })
    .addCase(resetPassword.fulfilled, (state) => {
      state.loading = false;
      state.forgotPassError = null;
      state.success = true;
    })
    .addCase(resetPassword.rejected, (state) => {
      state.loading = false;
      state.forgotPassError = 'An error occured';
      state.success = false;
    });

    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.updateUserSuccess = null;
      state.updateUserError = null;
      state.success = false;
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      state.currentUser = action.payload.user;
      state.loading = false;
      state.updateUserSuccess = 'Your profile is up-to-date!';
      state.updateUserError = null;
    })
    .addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.updateUserError = action.error?.message || 'Something went wrong!';
    });
  },
});

export const { reset, setUpdateUserSuccess, setUpdateUserError, resetAuthErrors } = authSlice.actions;

export default authSlice.reducer;