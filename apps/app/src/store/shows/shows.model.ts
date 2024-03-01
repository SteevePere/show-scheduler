import { EpisodeObject, SeasonObject, ShowObject } from '@scheduler/shared';

export interface SeasonState {
  showExternalId: number | null;
  seasons: SeasonObject[];
}

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
    episodeExternalId?: number | null;
    seasonExternalId?: number | null;
  };
  searched: boolean;
  showsError: string | null;
  showsSuccess: string | null;
  epWatchedSuccess: string | null;
  epWatchedError: string | null;
  shows: ShowObject[];
  show: ShowObject | null;
  seasons: SeasonState;
  episodes: EpisodeState;
}