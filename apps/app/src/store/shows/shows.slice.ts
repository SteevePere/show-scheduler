import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { EpisodeObject, ShowObject } from '@scheduler/shared';
import { createFavorite, deleteFavorite } from 'store/favorites/favorites.thunks';

import { RootState } from '../store';
import { showsInitialState } from './shows.initial-state';
import { ShowState } from './shows.model';
import { showsReducer } from './shows.reducer';
import { findSeasonEpisodes, findShow, searchShows, setEpisodeWatched } from './shows.thunks';

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

const updateEpisode = (state: ShowState, action: PayloadAction<EpisodeObject>) => {
  const episodeData = action.payload;
  const episodeId = episodeData.externalId;
  const episodes = state.episodes.episodes.map<EpisodeObject>((episode: EpisodeObject) => {
    if (episode.externalId === episodeId) {
      return {
        ...episode,
        ...episodeData,
      };
    }
    return episode;
  });

  state.episodes.episodes = episodes;
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

    builder.addCase(setEpisodeWatched.pending, (state, action) => {
      state.toggleWatchedLoading = {
        state: true,
        episodeExternalId: action.meta.arg.externalId || null,
      };
    })
    .addCase(setEpisodeWatched.fulfilled, (state, action) => {
      const externalId = action.meta.arg.externalId;
      const isWatchedByUser = action.meta.arg.isWatched;
      if (externalId) {
        updateEpisode(state, action);
      }
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
  }
});

export const {
  setLoading,
  resetShowsState,
  setShowsError,
  setShowsSuccess,
  setEpWatchedError,
  setEpWatchedSuccess,
  setEpisodes,
} = showsSlice.actions;

export const selectShows = (state: RootState) => state.shows;

export default showsSlice.reducer;