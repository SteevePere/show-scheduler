import { PayloadAction } from '@reduxjs/toolkit';
import { EpisodeObject } from '@scheduler/shared';

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
  setEpWatchedError: (state: ShowState, action: PayloadAction<string | null>) => {
    state.epWatchedError = action.payload;
  },
  setEpWatchedSuccess: (state: ShowState, action: PayloadAction<string | null>) => {
    state.epWatchedSuccess = action.payload;
  },
  setEpisodes: (state: ShowState, action: PayloadAction<EpisodeObject[]>) => {
    state.episodes = action.payload;
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