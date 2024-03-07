import { createSlice } from '@reduxjs/toolkit';
import { SeasonObject } from '@scheduler/shared';
import { createFavorite, deleteFavorite } from 'store/favorites/favorites.thunks';

import { RootState } from '../store';
import { showsInitialState } from './shows.initial-state';
import { showsReducer } from './shows.reducer';
import { findSeasonEpisodes, findShow, searchShows, setEpisodeWatched, setSeasonWatched } from './shows.thunks';

export const showsSlice = createSlice({
  name: 'shows',
  initialState: showsInitialState,
  reducers: showsReducer,
  extraReducers: (builder) => {
    // searchShows
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

    // findShow
    builder.addCase(findShow.pending, (state) => {
      state.loading = true;
      state.showsError = null;
      state.seasons = {
        showExternalId: null,
        seasons: [],
      };
    })
    .addCase(findShow.fulfilled, (state, action) => {
      const { payload: show } = action;
      state.loading = false;
      state.showsError = null;
      state.show = show;
      state.seasons = {
        showExternalId: show.externalId,
        seasons: show.seasons || [],
      };
    })
    .addCase(findShow.rejected, (state) => {
      state.showsError = 'Unable to find this Show!';
      state.loading = false;
    });

    // findSeasonEpisodes
    builder.addCase(findSeasonEpisodes.pending, (state, action) => {
      state.episodes = {
        seasonExternalId: null,
        episodes: [],
      };
      state.episodesLoading = {
        state: true,
        seasonExternalId: action.meta.arg.seasonExternalId,
      };
      state.showsError = null;
    })
    .addCase(findSeasonEpisodes.fulfilled, (state, action) => {
      state.episodesLoading = {
        state: false,
        seasonExternalId: null,
      };
      state.showsError = null;
      state.episodes = {
        seasonExternalId: action.meta.arg.seasonExternalId,
        episodes: action.payload,
      };
    })
    .addCase(findSeasonEpisodes.rejected, (state) => {
      state.showsError = 'Unable to find Season Episodes!';
      state.episodesLoading = {
        state: false,
        seasonExternalId: null,
      };
    });

    // setEpisodeWatched
    builder.addCase(setEpisodeWatched.pending, (state, action) => {
      state.toggleWatchedLoading = {
        state: true,
        episodeExternalId: action.meta.arg.externalId || null,
      };
    })
    .addCase(setEpisodeWatched.fulfilled, (state, action) => {
      const externalId = action.meta.arg.externalId;
      const isWatchedByUser = action.meta.arg.isWatched;
      const epSeason = action.payload.season;

      if (externalId) {
        showsSlice.caseReducers.updateEpisode(state, action);
      }

      state.seasons.seasons = state.seasons.seasons.map((season: SeasonObject) => {
        return epSeason?.externalId === season.externalId ?
          { ...season, isWatchedByUser: epSeason?.isWatchedByUser || false } : season;
      });

      state.toggleWatchedLoading = {
        state: false,
        episodeExternalId: null,
      };
      state.epWatchedSuccess = isWatchedByUser ? 
        'Episode marked as watched!' : 'Episode removed from watched Episodes!';
    })
    .addCase(setEpisodeWatched.rejected, (state, action) => {
      const isWatchedByUser = action.meta.arg.isWatched;
      state.toggleWatchedLoading = {
        state: false,
        episodeExternalId: null,
      };
      state.epWatchedError = isWatchedByUser ? 
        'Unable to add to watched Episodes!' : 'Unable to remove from watched Episodes!';
    });

    // setSeasonWatched
    builder.addCase(setSeasonWatched.pending, (state, action) => {
      state.toggleWatchedLoading = {
        state: true,
        seasonExternalId: action.meta.arg.externalId || null,
      };
    })
    .addCase(setSeasonWatched.fulfilled, (state, action) => {
      const externalId = action.meta.arg.externalId;
      const isWatchedByUser = action.meta.arg.isWatched;
      state.seasons.seasons = state.seasons.seasons.map((season: SeasonObject) => {
        return externalId === season.externalId ? { ...season, isWatchedByUser } : season;
      });

      if (state.episodes.seasonExternalId === externalId) {
        showsSlice.caseReducers.updateAllEpisodes(state, { payload: { isWatchedByUser }, type: '' });
      }

      state.toggleWatchedLoading = {
        state: false,
        seasonExternalId: null,
      };
      state.seasonWatchedSuccess = isWatchedByUser ? 
        'Season marked as watched!' : 'Season removed from watched Seasons!';
    })
    .addCase(setSeasonWatched.rejected, (state, action) => {
      const isWatchedByUser = action.meta.arg.isWatched;
      state.toggleWatchedLoading = {
        state: false,
        seasonExternalId: null,
      };
      state.seasonWatchedError = isWatchedByUser ? 
        'Unable to add to watched Seasons!' : 'Unable to remove from watched Seasons!';
    });

    // createFavorite
    builder.addCase(createFavorite.fulfilled, (state, action) => {
      showsSlice.caseReducers.updateShow(state, action);
    });

    // deleteFavorite
    builder.addCase(deleteFavorite.fulfilled, (state, action) => {
      showsSlice.caseReducers.updateShow(state, action);
    });
  }
});

export const {
  setLoading,
  resetShowsState,
  setShowsError,
  setShowsSuccess,
  setEpWatchedError,
  setEpWatchedSuccess,
  setSeasonWatchedSuccess,
  setSeasonWatchedError,
  setEpisodes,
  updateShow,
  updateEpisode,
  updateAllEpisodes,
} = showsSlice.actions;

export const selectShows = (state: RootState) => state.shows;

export default showsSlice.reducer;