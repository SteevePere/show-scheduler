import { PayloadAction } from '@reduxjs/toolkit';
import { ShowObject } from '@scheduler/shared';

import { FavoriteState } from './favorites.model';

export const favoritesReducer = {
  setLoading: (state: FavoriteState) => {
    state.loading = true;
  },
  setSuccess: (state: FavoriteState, action: PayloadAction<ShowObject>) => {
    state.loading = false;
    state.error = null;
    state.favorite = action.payload;
  },
  setFailure: (state: FavoriteState, action: PayloadAction<string>) => {
    state.loading = false;
    state.error = action.payload;
    state.favorite = null;
  },
};