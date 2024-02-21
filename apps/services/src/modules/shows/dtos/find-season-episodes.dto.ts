import {
  FindSeasonEpisodesRequest,
  FindSeasonEpisodesResponse,
  UserObject,
} from '@scheduler/shared';

export class FindSeasonEpisodesData extends FindSeasonEpisodesRequest {
  currentUser?: UserObject;
}

export class FindSeasonEpisodesResult extends FindSeasonEpisodesResponse {}
