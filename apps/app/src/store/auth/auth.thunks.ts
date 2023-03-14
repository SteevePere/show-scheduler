import { createAsyncThunk } from '@reduxjs/toolkit';
import { ForgotPasswordRequest, RegistrationRequest, ResetPasswordRequest, SignInRequest, UpdateUserRequest } from '@scheduler/shared';
import axios from 'axios';

import { apiGetCurrentUser, apiRequestPasswordReset, apiResetPassword, apiSignIn, apiSignOut, apiSignUp } from '../../api/auth.api';
import { apiUpdateUser } from '../../api/users.api';
import { WithId } from '../../utils/with-id.util';

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

export const updateUser = createAsyncThunk('auth/updateUser', async (data: WithId<UpdateUserRequest>) => {
  const { id, ...rest } = data;
  return await apiUpdateUser(id, rest);
});