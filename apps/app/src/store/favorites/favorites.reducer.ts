import { PayloadAction } from '@reduxjs/toolkit';

import { FavoriteState } from './favorites.model';

export const favoritesReducer = {
  setFavoritesError: (state: FavoriteState, action: PayloadAction<string | null>) => {
    state.favoritesError = action.payload;
  },
  setFavoritesSuccess: (state: FavoriteState, action: PayloadAction<string | null>) => {
    state.favoritesSuccess = action.payload;
  },
};