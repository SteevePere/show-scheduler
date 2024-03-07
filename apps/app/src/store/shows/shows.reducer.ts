import { PayloadAction } from '@reduxjs/toolkit';
import { EpisodeObject, ShowObject } from '@scheduler/shared';

import { EpisodeState, ShowState } from './shows.model';

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
  setSeasonWatchedSuccess: (state: ShowState, action: PayloadAction<string | null>) => {
    state.seasonWatchedSuccess = action.payload;
  },
  setSeasonWatchedError: (state: ShowState, action: PayloadAction<string | null>) => {
    state.seasonWatchedError = action.payload;
  },
  setEpWatchedSuccess: (state: ShowState, action: PayloadAction<string | null>) => {
    state.epWatchedSuccess = action.payload;
  },
  setEpWatchedError: (state: ShowState, action: PayloadAction<string | null>) => {
    state.epWatchedError = action.payload;
  },
  setEpisodes: (state: ShowState, action: PayloadAction<EpisodeState>) => {
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
  updateShow: (state: ShowState, action: PayloadAction<ShowObject>) => {
    if (state.show && (state.show.id === action.payload.id || !state.show.id)) {
      state.show.id = action.payload.id;
      state.show.isFavoritedByUser = action.payload.isFavoritedByUser;
    }
    if (state.shows) {
      const shows = state.shows.map((show) => {
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
  },
  updateEpisode: (state: ShowState, action: PayloadAction<EpisodeObject>) => {
    const episodeData = action.payload;
    const episodeId = episodeData.externalId;
    state.episodes.episodes = state.episodes.episodes.map((episode) => {
      if (episode.externalId === episodeId) {
        return {
          ...episode,
          ...episodeData,
        };
      }
      return episode;
    });
  },
  updateAllEpisodes: (state: ShowState, action: PayloadAction<Partial<EpisodeObject>>) => {
    state.episodes.episodes = state.episodes.episodes.map((episode) => {
      return {
        ...episode,
        ...action.payload,
      };
    });
  },
};