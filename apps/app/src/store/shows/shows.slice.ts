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
      state.error = null;
      state.searched = true;
    })
    .addCase(searchShows.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.shows = action.payload;
    })
    .addCase(searchShows.rejected, (state) => {
      state.error = 'An error occured';
      state.loading = false;
    });

    builder.addCase(findShow.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(findShow.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.show = action.payload;
    })
    .addCase(findShow.rejected, (state) => {
      state.error = 'An error occured';
      state.loading = false;
    });
  }
});

export const { setLoading, setSuccess, setFailure } = showsSlice.actions;

export const selectShows = (state: RootState) => state.shows;

export default showsSlice.reducer;