import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateFavoriteRequest } from '@scheduler/shared';
import { apiSaveFavorite } from 'api/favorites.api';

export const createFavorite = createAsyncThunk('shows/createFavorite', async (data: CreateFavoriteRequest) => {
  return await apiSaveFavorite(data);
});