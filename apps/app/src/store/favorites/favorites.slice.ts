import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { favoritesInitialState } from './favorites.initial-state';
import { favoritesReducer } from './favorites.reducer';
import { createFavorite, deleteFavorite } from './favorites.thunks';

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: favoritesInitialState,
  reducers: favoritesReducer,
  extraReducers: (builder) => {
    builder.addCase(createFavorite.pending, (state, action) => {
      state.loading = {
        state: true,
        showExtId: action.meta.arg.showExternalId,
      };
      state.favoritesError = null;
    })
    .addCase(createFavorite.fulfilled, (state, action) => {
      state.loading = {
        state: false,
        showExtId: null,
      };
      state.favoritesError = null;
      state.favoritesSuccess = `${action.payload.name || 'This Show'} has been added to your Favorites!`;
      state.favorite = action.payload || null;
    })
    .addCase(createFavorite.rejected, (state, action) => {
      state.favoritesError = action.payload === 409 ? 'This Show is already in your Favorites!' : 'Unable to add Show to Favorites!';
      state.loading = {
        state: false,
        showExtId: null,
      };
    });

    builder.addCase(deleteFavorite.pending, (state, action) => {
      state.loading = {
        state: true,
        showId: action.meta.arg.showId,
      };
      state.favoritesError = null;
    })
    .addCase(deleteFavorite.fulfilled, (state, action) => {
      state.loading = {
        state: false,
        showId: null,
      };
      state.favoritesError = null;
      state.favoritesSuccess = `${action.payload.name || 'This Show'} has been removed from your Favorites!`;
      state.favorite = action.payload || null;
    })
    .addCase(deleteFavorite.rejected, (state) => {
      state.favoritesError = 'Unable to remove this Show from your Favorites!';
      state.loading = {
        state: false,
        showId: null,
      };
    });
  }
});

export const {
  setFavoritesSuccess,
  setFavoritesError,
} = favoritesSlice.actions;

export const selectFavorite = (state: RootState) => state.shows;

export default favoritesSlice.reducer;