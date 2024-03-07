import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { EpisodeObject, SeasonObject, ShowObject } from '@scheduler/shared';
import { createFavorite, deleteFavorite } from 'store/favorites/favorites.thunks';

import { RootState } from '../store';
import { showsInitialState } from './shows.initial-state';
import { ShowState } from './shows.model';
import { showsReducer } from './shows.reducer';
import { findSeasonEpisodes, findShow, searchShows, setEpisodeWatched, setSeasonWatched } from './shows.thunks';

const updateShow = (state: ShowState, action: PayloadAction<ShowObject>) => {
  if (state.show && (state.show.id === action.payload.id || !state.show.id)) {
    state.show.id = action.payload.id;
    state.show.isFavoritedByUser = action.payload.isFavoritedByUser;
  }
  if (state.shows) {
    const shows = state.shows.map<ShowObject>((show: ShowObject) => {
      if (show.externalId === action.payload.externalId) {
        return {
          ...show,
          id: action.payload.id,
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

const updateEpisodes = (episodes: EpisodeObject[], data: Partial<EpisodeObject>) => {
  return episodes.map<EpisodeObject>((episode: EpisodeObject) => {
    return {
      ...episode,
      ...data,
    };
  });
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
      state.seasons = {
        showExternalId: null,
        seasons: [],
      };
    })
    .addCase(findShow.fulfilled, (state, action) => {
      const show = action.payload;
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

    builder.addCase(createFavorite.fulfilled, (state, action) => {
      updateShow(state, action);
    });
    builder.addCase(deleteFavorite.fulfilled, (state, action) => {
      updateShow(state, action);
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
      const epSeason = action.payload.season;

      if (externalId) {
        updateEpisode(state, action);
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
        const updatedEps = updateEpisodes(state.episodes.episodes, { isWatchedByUser });
        state.episodes.episodes = updatedEps;
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
} = showsSlice.actions;

export const selectShows = (state: RootState) => state.shows;

export default showsSlice.reducer;