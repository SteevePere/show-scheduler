import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { showsInitialState } from './shows.initial-state';
import { showsReducer } from './shows.reducer';
import { findShow, searchShows } from './shows.thunks';

export const showsSlice = createSlice({
  name: 'shows',
  initialState: showsInitialState,
  reducers: showsReducer,
  extraReducers: (builder) => {
    builder.addCase(searchShows.pending, (state) => {
      state.loading = true;
      state.showsError = null;
      state.searched = true;
    })
    .addCase(searchShows.fulfilled, (state, action) => {
      state.loading = false;
      state.showsError = null;
      state.shows = action.payload;
    })
    .addCase(searchShows.rejected, (state) => {
      state.showsError = 'Unable to find the requested Show(s)!';
      state.loading = false;
    });

    builder.addCase(findShow.pending, (state) => {
      state.loading = true;
      state.showsError = null;
    })
    .addCase(findShow.fulfilled, (state, action) => {
      state.loading = false;
      state.showsError = null;
      state.show = action.payload;
    })
    .addCase(findShow.rejected, (state) => {
      state.showsError = 'Unable to find this Show!';
      state.loading = false;
    });
  }
});

export const { setLoading, resetShowsState, setShowsError, setShowsSuccess } = showsSlice.actions;

export const selectShows = (state: RootState) => state.shows;

export default showsSlice.reducer;