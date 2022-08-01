import { EpisodeObject } from '@scheduler/shared';

export class FindEpisodeData {
  id?: string;
  externalId?: number;
  ignoreNotFound?: boolean;
  relations?: string[];
}

export class FindEpisodeResult {
  episode: EpisodeObject;
}
