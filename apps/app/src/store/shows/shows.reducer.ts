import { PayloadAction } from '@reduxjs/toolkit';
import { ShowObject } from '@scheduler/shared';

import { ShowState } from './shows.model';

export const showsReducer = {
  setLoading: (state: ShowState) => {
    state.loading = true;
  },
  setSuccess: (state: ShowState, action: PayloadAction<ShowObject[]>) => {
    state.loading = false;
    state.error = null;
    state.shows = action.payload;
  },
  setFailure: (state: ShowState, action: PayloadAction<string>) => {
    state.loading = false;
    state.error = action.payload;
    state.shows = [];
  },
};