import { EpisodeObject } from '@scheduler/shared';

export class FindEpisodeData {
  id?: string;
  externalId?: number;
  ignoreNotFound?: boolean;
}

export class FindEpisodeResult {
  episode: EpisodeObject;
}
