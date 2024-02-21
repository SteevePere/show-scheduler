import { UserObject } from '@scheduler/shared';

export class isEpisodeWatchedData {
  episodeExternalId: number;
  currentUser: UserObject;
}

export class isEpisodeWatchedResult {
  isWatchedByUser: boolean;
}
