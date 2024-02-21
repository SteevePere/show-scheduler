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
  },
  searched: false,
  showsError: null,
  showsSuccess: null,
  epWatchedSuccess: null,
  epWatchedError: null,
  shows: [],
  episodes: [],
  show: null,
};