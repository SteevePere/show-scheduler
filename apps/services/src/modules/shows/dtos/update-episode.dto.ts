import { EpisodeObject } from '@scheduler/shared';
import { DeepPartial } from 'typeorm';
import { EpisodeEntity } from '../entities/episode.entity';

export class UpdateEpisodeData {
  id: string;
  data: DeepPartial<EpisodeEntity>;
}

export class UpdateEpisodeResult {
  episode: EpisodeObject;
}
