import { FindOptionsOrder, FindOptionsWhere } from 'typeorm';
import { EpisodeEntity } from '../entities/episode.entity';

export class FindEpisodesData {
  where?: FindOptionsWhere<EpisodeEntity>[];
  relations?: [keyof EpisodeEntity];
  order?: FindOptionsOrder<EpisodeEntity>;
}

export class FindEpisodesResult {
  episodes: EpisodeEntity[];
}
