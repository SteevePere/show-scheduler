import { FavoriteCategoryObject, FavoriteObject } from '@scheduler/shared';
import { createFromClass } from 'src/core/utils/transformers.util';
import { UserFavoriteCategoryEntity } from '../entities/user-favorite-category.entity';
import { createFavoriteObjectFromEntity } from './favorite-object.transformer';

interface IFavoriteCategoryTransformerData {
  favoriteCategoryEntity: UserFavoriteCategoryEntity;
  favorites?: FavoriteObject[];
}

export function createFavoriteCategoryObjectFromEntity(
  data: IFavoriteCategoryTransformerData,
) {
  const {
    favoriteCategoryEntity: { id, userId, parentId, name, favorites },
    favorites: favoriteObjects,
  } = data;

  return createFromClass(FavoriteCategoryObject, {
    id,
    userId,
    parentId,
    name,
    favorites: favoriteObjects
      ? favoriteObjects
      : favorites.map((favorite) =>
          createFavoriteObjectFromEntity({ favoriteEntity: favorite }),
        ),
  });
}
