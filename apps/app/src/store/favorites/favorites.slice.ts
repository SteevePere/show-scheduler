import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { favoritesInitialState } from './favorites.initial-state';
import { favoritesReducer } from './favorites.reducer';
import { createFavorite } from './favorites.thunks';

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: favoritesInitialState,
  reducers: favoritesReducer,
  extraReducers: (builder) => {
    builder.addCase(createFavorite.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createFavorite.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.favorite = action.payload;
    })
    .addCase(createFavorite.rejected, (state) => {
      state.error = 'Unable to save Show';
      state.loading = false;
    });
  }
});

export const { setLoading, setSuccess, setFailure } = favoritesSlice.actions;

export const selectFavorite = (state: RootState) => state.shows;

export default favoritesSlice.reducer;