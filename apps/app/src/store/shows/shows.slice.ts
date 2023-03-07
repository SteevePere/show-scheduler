import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { showsInitialState } from './shows.initial-state';
import { showsReducer } from './shows.reducer';

export const showsSlice = createSlice({
  name: 'shows',
  initialState: showsInitialState,
  reducers: showsReducer,
});

export const { setLoading, setSuccess, setFailure } = showsSlice.actions;

export const selectshows = (state: RootState) => state.shows;

export default showsSlice.reducer;