import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { showsInitialState } from './shows.initial-state';
import { showsReducer } from './shows.reducer';
import { searchShows } from './shows.thunks';

export const showsSlice = createSlice({
  name: 'shows',
  initialState: showsInitialState,
  reducers: showsReducer,
  extraReducers: (builder) => {
    builder.addCase(searchShows.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(searchShows.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    })
    .addCase(searchShows.rejected, (state) => {
      state.error = 'An error occured';
      state.loading = false;
    });
  }
});

export const { setLoading, setSuccess, setFailure } = showsSlice.actions;

export const selectshows = (state: RootState) => state.shows;

export default showsSlice.reducer;