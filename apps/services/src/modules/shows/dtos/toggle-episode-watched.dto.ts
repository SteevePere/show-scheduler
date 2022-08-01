import {
  ToggleEpisodeWatchedRequest,
  ToggleEpisodeWatchedResponse,
  UserObject,
} from '@scheduler/shared';

export class ToggleEpisodeWatchedData extends ToggleEpisodeWatchedRequest {
  currentUser: UserObject;
}

export class ToggleEpisodeWatchedResult extends ToggleEpisodeWatchedResponse {}
