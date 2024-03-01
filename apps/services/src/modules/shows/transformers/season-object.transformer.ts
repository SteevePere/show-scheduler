import { SeasonObject } from '@scheduler/shared';
import { createFromClass } from 'src/core/utils/transformers.util';
import { SeasonEntity } from '../entities/season.entity';

interface ISeasonTransformerData {
  seasonEntity: SeasonEntity;
  imageUrl?: string | null;
  isWatchedByUser?: boolean;
}

export function createSeasonObjectFromEntity(data: ISeasonTransformerData) {
  const {
    seasonEntity: {
      id,
      showId,
      externalId,
      number,
      name,
      summary,
      image,
      premiereDate,
      endDate,
      createdAt,
      updatedAt,
    },
    imageUrl,
    isWatchedByUser,
  } = data;

  return createFromClass(SeasonObject, {
    id,
    showId,
    externalId,
    number,
    name,
    summary,
    imageUrl: imageUrl || image?.filePath || null,
    premiereDate,
    endDate,
    isWatchedByUser,
    createdAt,
    updatedAt,
  });
}
