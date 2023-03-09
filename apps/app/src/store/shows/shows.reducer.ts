import { PayloadAction } from '@reduxjs/toolkit';

import { Show, ShowState } from './shows.model';

export const showsReducer = {
  setLoading: (state: ShowState) => {
    state.loading = true;
  },
  setSuccess: (state: ShowState, action: PayloadAction<Show[]>) => {
    state.loading = false;
    state.error = null;
    state.data = action.payload;
  },
  setFailure: (state: ShowState, action: PayloadAction<string>) => {
    state.loading = false;
    state.error = action.payload;
    state.data = [];
  },
};