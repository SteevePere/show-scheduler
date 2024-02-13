import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateFavoriteRequest, RemoveFavoriteRequest } from '@scheduler/shared';
import { apiDeleteFavorite, apiSaveFavorite } from 'api/favorites.api';
import axios from 'axios';

export const createFavorite = createAsyncThunk('shows/createFavorite', async (data: CreateFavoriteRequest, { rejectWithValue }) => {
  try {
    return await apiSaveFavorite(data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.statusCode);    
    }
    return rejectWithValue(error); 
  }
});

export const deleteFavorite = createAsyncThunk('shows/deleteFavorite', async (data: RemoveFavoriteRequest) => {
  return await apiDeleteFavorite(data);
});