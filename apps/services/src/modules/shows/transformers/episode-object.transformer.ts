import { EpisodeObject } from '@scheduler/shared';
import { createFromClass } from 'src/core/utils/transformers.util';
import { EpisodeEntity } from '../entities/episode.entity';

interface IEpisodeTransformerData {
  episodeEntity: EpisodeEntity;
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
    createdAt,
    updatedAt,
  });
}
