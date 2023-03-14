import { createAsyncThunk } from '@reduxjs/toolkit';
import { ForgotPasswordRequest, RegistrationRequest, ResetPasswordRequest, SignInRequest } from '@scheduler/shared';
import axios from 'axios';

import { apiGetCurrentUser, apiRequestPasswordReset, apiResetPassword, apiSignIn, apiSignOut, apiSignUp } from '../../api/auth.api';

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

export const signOut = createAsyncThunk('auth/signOut', async () => {
  return await apiSignOut();
});

export const getCurrentUser = createAsyncThunk('auth/getCurrentUser', async () => {
  return await apiGetCurrentUser();
});

export const requestPasswordReset = createAsyncThunk('auth/requestPasswordReset', async (data: ForgotPasswordRequest) => {
  return await apiRequestPasswordReset(data);
});

export const resetPassword = createAsyncThunk('auth/resetPassword', async (data: ResetPasswordRequest) => {
  return await apiResetPassword(data);
});