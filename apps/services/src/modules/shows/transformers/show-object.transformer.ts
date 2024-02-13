import { ShowObject } from '@scheduler/shared';
import { createFromClass } from 'src/core/utils/transformers.util';
import { GenreEntity } from '../entities/genre.entity';
import { ShowEntity } from '../entities/show.entity';
import { createSeasonObjectFromEntity } from './season-object.transformer';

interface IShowTransformerData {
  showEntity: ShowEntity;
  imageUrl?: string | null;
  isFavoritedByUser?: boolean;
}

export function createShowObjectFromEntity(data: IShowTransformerData) {
  const {
    showEntity: {
      id,
      externalId,
      name,
      summary,
      language,
      rating,
      image,
      genres,
      seasons,
      lastFavoritedAt,
      createdAt,
      updatedAt,
    },
    imageUrl,
    isFavoritedByUser = false,
  } = data;

  return createFromClass(ShowObject, {
    id,
    externalId,
    name,
    summary,
    language,
    rating,
    imageUrl: imageUrl || image?.filePath || null,
    genres: genres.map((genre: GenreEntity) => genre.name),
    seasons: seasons?.map((season) =>
      createSeasonObjectFromEntity({ seasonEntity: season }),
    ),
    isFavoritedByUser,
    lastFavoritedAt,
    createdAt,
    updatedAt,
  });
}
