import { UserObject } from '@scheduler/shared';
import { EpisodeEntity } from '../entities/episode.entity';

export class isEpisodeWatchedData {
  episodeEntity: EpisodeEntity;
  currentUser: UserObject | undefined;
}

export class isEpisodeWatchedResult {
  isWatchedByUser: boolean;
}
