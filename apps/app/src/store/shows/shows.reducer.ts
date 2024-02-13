import { PayloadAction } from '@reduxjs/toolkit';

import { ShowState } from './shows.model';

export const showsReducer = {
  setLoading: (state: ShowState) => {
    state.loading = true;
  },
  setShowsError: (state: ShowState, action: PayloadAction<string | null>) => {
    state.showsError = action.payload;
  },
  setShowsSuccess: (state: ShowState, action: PayloadAction<string | null>) => {
    state.showsSuccess = action.payload;
  },
  resetShowsState: (state: ShowState) => {
    state.loading = false;
    state.searched = false;
    state.showsError = null;
    state.showsSuccess = null;
    state.shows = [];
    state.show = null;
  },
};