import {
  EpisodeObject,
  FindEpisodesRequest,
  UserObject,
} from '@scheduler/shared';

export class FindEpisodesData extends FindEpisodesRequest {
  currentUser: UserObject;
}

export class FindEpisodesResult {
  episodes: EpisodeObject[];
  count: number;
}
