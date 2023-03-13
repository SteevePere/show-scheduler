import { createAsyncThunk } from '@reduxjs/toolkit';
import { RegistrationRequest, SignInRequest } from '@scheduler/shared';
import axios from 'axios';

import { apiGetCurrentUser, apiSignIn, apiSignOut, apiSignUp } from '../../api/auth.api';

export const signUp = createAsyncThunk('auth/signUp', async (data: RegistrationRequest,  { rejectWithValue }) => {
  try {
    return await apiSignUp(data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response);
    }
    throw error;
  }
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