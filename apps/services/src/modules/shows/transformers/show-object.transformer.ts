import { ShowObject } from '@scheduler/shared';
import { createFromClass } from 'src/core/utils/transformers.util';
import { GenreEntity } from '../entities/genre.entity';
import { ShowEntity } from '../entities/show.entity';

interface IShowTransformerData {
  showEntity: ShowEntity;
  imageUrl?: string;
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
      createdAt,
      updatedAt,
    },
    imageUrl,
  } = data;

  return createFromClass(ShowObject, {
    id,
    externalId,
    name,
    summary,
    language,
    rating,
    imageUrl: imageUrl || image.filePath,
    genres: genres.map((genre: GenreEntity) => genre.name),
    createdAt,
    updatedAt,
  });
}
