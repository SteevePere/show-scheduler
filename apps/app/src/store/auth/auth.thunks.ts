import { createAsyncThunk } from '@reduxjs/toolkit';
import { RegistrationRequest, SignInRequest } from '@scheduler/shared';

import { apiGetCurrentUser, apiSignIn, apiSignOut, apiSignUp } from '../../api/auth.api';

export const signUp = createAsyncThunk('auth/signUp', async (data: RegistrationRequest) => {
  return await apiSignUp(data);
});

export const signIn = createAsyncThunk('auth/signIn', async (data: SignInRequest) => {
  return await apiSignIn(data);
});

export const signOut = createAsyncThunk('auth/signout', async () => {
  return await apiSignOut();
});

export const getCurrentUser = createAsyncThunk('auth/getCurrentUser', async () => {
  return await apiGetCurrentUser();
});