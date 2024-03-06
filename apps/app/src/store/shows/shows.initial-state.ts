import { ShowState } from './shows.model';

export const showsInitialState: ShowState = {
  loading: false,
  episodesLoading: {
    state: false, 
    seasonExternalId: null,
  },
  toggleWatchedLoading: {
    state: false, 
    episodeExternalId: null,
    seasonExternalId: null,
  },
  searched: false,
  showsError: null,
  showsSuccess: null,
  seasonWatchedSuccess: null,
  seasonWatchedError: null,
  epWatchedSuccess: null,
  epWatchedError: null,
  shows: [],
  show: null,
  seasons: {
    showExternalId: null,
    seasons: [],
  },
  episodes: {
    seasonExternalId: null,
    episodes: [],
  },
};