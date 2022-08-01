import {
  ToggleSeasonWatchedRequest,
  ToggleSeasonWatchedResponse,
  UserObject,
} from '@scheduler/shared';

export class ToggleSeasonWatchedData extends ToggleSeasonWatchedRequest {
  currentUser: UserObject;
}

export class ToggleSeasonWatchedResult extends ToggleSeasonWatchedResponse {}
