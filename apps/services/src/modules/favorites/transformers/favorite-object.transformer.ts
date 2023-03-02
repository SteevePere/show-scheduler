import { FavoriteObject } from '@scheduler/shared';
import { createFromClass } from 'src/core/utils/transformers.util';
import { createShowObjectFromEntity } from 'src/modules/shows/transformers/show-object.transformer';
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
      show,
      createdAt,
      updatedAt,
    },
  } = data;

  return createFromClass(FavoriteObject, {
    id,
    isNotificationEnabled,
    userId,
    showId,
    show: show && createShowObjectFromEntity({ showEntity: show }),
    createdAt,
    updatedAt,
  });
}
