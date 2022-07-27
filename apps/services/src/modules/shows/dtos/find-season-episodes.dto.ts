import { EpisodeObject } from '@scheduler/shared';

export class FindSeasonEpisodesData {
  seasonExternalId: number;
}

export class FindSeasonEpisodesResult {
  episodes: EpisodeObject[];
}
