import { FavoriteObject } from '@scheduler/shared';
import { createFromClass } from 'src/core/utils/transformers.util';
import { UserFavoriteShowEntity } from '../entities/user-favorite-show.entity';

interface IFavoriteTransformerData {
  favoriteEntity: UserFavoriteShowEntity;
}

export function createFavoriteObjectFromEntity(data: IFavoriteTransformerData) {
  const {
    favoriteEntity: {
      id,
      isNotificationEnabled,
      userId,
      showId,
      createdAt,
      updatedAt,
    },
  } = data;

  return createFromClass(FavoriteObject, {
    id,
    isNotificationEnabled,
    userId,
    showId,
    createdAt,
    updatedAt,
  });
}
