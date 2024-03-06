import {
  ToggleEpisodeWatchedRequest,
  ToggleEpisodeWatchedResponse,
  UserObject,
} from '@scheduler/shared';

export class ToggleEpisodeWatchedData extends ToggleEpisodeWatchedRequest {
  currentUser: UserObject;
  fetchSeason?: boolean;
}

export class ToggleEpisodeWatchedResult extends ToggleEpisodeWatchedResponse {}
