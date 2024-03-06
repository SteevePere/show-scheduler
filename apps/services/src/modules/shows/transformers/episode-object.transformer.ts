import { EpisodeObject, SeasonObject } from '@scheduler/shared';
import { createFromClass } from 'src/core/utils/transformers.util';
import { EpisodeEntity } from '../entities/episode.entity';

interface IEpisodeTransformerData {
  episodeEntity: EpisodeEntity;
  season?: SeasonObject;
  imageUrl?: string | null;
}

export function createEpisodeObjectFromEntity(data: IEpisodeTransformerData) {
  const {
    episodeEntity: {
      id,
      seasonId,
      externalId,
      number,
      name,
      summary,
      image,
      airDate,
      createdAt,
      updatedAt,
    },
    season,
    imageUrl,
  } = data;

  return createFromClass(EpisodeObject, {
    id,
    seasonId,
    externalId,
    number,
    name,
    summary,
    imageUrl: imageUrl || image?.filePath || null,
    airDate,
    season,
    createdAt,
    updatedAt,
  });
}
