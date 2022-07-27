import { EpisodeObject } from '@scheduler/shared';

export class SaveSeasonEpisodesData {
  seasonId: string;
  seasonExternalId: number;
}

export class SaveSeasonEpisodesResult {
  episodes: EpisodeObject[];
}
