import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ShowObject } from '@scheduler/shared';
import { createFavorite, deleteFavorite } from 'store/favorites/favorites.thunks';

import { RootState } from '../store';
import { showsInitialState } from './shows.initial-state';
import { ShowState } from './shows.model';
import { showsReducer } from './shows.reducer';
import { findShow, searchShows } from './shows.thunks';

const updateIsFavorited = (state: ShowState, action: PayloadAction<ShowObject>) => {
  if (state.show && state.show.id === action.payload.id) {
    state.show.isFavoritedByUser = action.payload.isFavoritedByUser;
  }
  if (state.shows) {
    const shows = state.shows.map<ShowObject>((show: ShowObject) => {
      if (show.externalId === action.payload.externalId) {
        return {
          ...show,
          isFavoritedByUser: action.payload.isFavoritedByUser,
        };
      }
      return show;
    });
    state.shows = shows;
  }
};

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

    builder.addCase(createFavorite.fulfilled, (state, action) => {
      updateIsFavorited(state, action);
    });
    builder.addCase(deleteFavorite.fulfilled, (state, action) => {
      updateIsFavorited(state, action);
    });
  }
});

export const { setLoading, resetShowsState, setShowsError, setShowsSuccess } = showsSlice.actions;

export const selectShows = (state: RootState) => state.shows;

export default showsSlice.reducer;