import { EpisodeObject, ShowObject } from '@scheduler/shared';

export interface EpisodeState {
  seasonExternalId: number | null;
  episodes: EpisodeObject[];
}

export interface ShowState {
  loading: boolean;
  episodesLoading: {
    state: boolean; 
    seasonExternalId: number | null;
  };
  toggleWatchedLoading: {
    state: boolean; 
    episodeExternalId: number | null;
  };
  searched: boolean;
  showsError: string | null;
  showsSuccess: string | null;
  epWatchedSuccess: string | null;
  epWatchedError: string | null;
  shows: ShowObject[];
  episodes: EpisodeState;
  show: ShowObject | null;
}