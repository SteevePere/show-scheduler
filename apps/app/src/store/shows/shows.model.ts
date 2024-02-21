import { EpisodeObject, ShowObject } from '@scheduler/shared';

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
  episodes: EpisodeObject[];
  show: ShowObject | null;
}