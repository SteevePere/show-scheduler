import { FindOptionsWhere } from 'typeorm';
import { EpisodeEntity } from '../entities/episode.entity';

export class FindEpisodesData {
  where?: FindOptionsWhere<EpisodeEntity>[];
  relations?: [keyof EpisodeEntity];
}

export class FindEpisodesResult {
  episodes: EpisodeEntity[];
}
